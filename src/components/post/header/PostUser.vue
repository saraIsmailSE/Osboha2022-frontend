<template>
  <BaseAvatar
    :profileImg="userProfile?.profile_picture"
    :profile_id="userProfile?.id"
    :title="post.user?.name"
    :gender="post.user?.gender"
    avatarClass="avatar-50 rounded-circle"
  />
  <!-- <div class="user-img">
    <img
      class="avatar-50 rounded-circle"
      :src="profile_picture"
      alt="user profile"
    />
  </div> -->
  <div class="mx-2 flex-grow-1">
    <div class="author-friends p-0 m-0">
      <span
        class="author-name"
        :class="{ 'hover-undelined': authUser.id != post.user?.id }"
        role="button"
        @click.prevent="
          authUser.id != post.user?.id ? sendToProfile(post.user?.id) : null
        "
        >{{ post.user?.name }}</span
      >
      <template
        v-if="
          post.timeline &&
          ((post.timeline.user && post.timeline.user.id != post.user?.id) ||
            post.timeline.group)
        "
      >
        <span class="mx-1">
          {{ post.timeline.user ? "عند" : "في" }}
        </span>
        <span
          v-if="post.timeline.user && post.timeline.user.id != post.user?.id"
          class="author-name hover-undelined"
          role="button"
          @click.prevent="sendToProfile(post.timeline?.user?.id)"
          >{{ post.timeline.user.name ?? "" }}</span
        >
        <span
          v-else-if="post.timeline.group"
          class="author-name hover-undelined"
          role="button"
          @click.prevent="sendToGroup(post.timeline.group.id)"
          >{{ post.timeline.group.name ?? "" }}</span
        >
      </template>

      <template v-if="post.taggedUsers?.length">
        <span class="mx-1"> مع </span>
        <span v-for="(friend, index) in slicedTaggedFriends" :key="friend.id">
          <span
            class="author-name hover-undelined"
            role="button"
            @click.prevent="sendToProfile(friend.user.id)"
            >{{ friend.user?.name ?? "" }}</span
          >
          <span
            class="mx-1"
            v-if="
              index !== slicedTaggedFriends.length - 1 ||
              post.taggedUsers?.length > slicedTaggedFriends.length
            "
            >و</span
          >
          <span v-if="index === slicedTaggedFriends.length - 1">
            <span
              v-if="post.taggedUsers?.length > slicedTaggedFriends.length"
              class="author-name hover-undelined"
              role="button"
              @click.prevent="getFriends"
              >{{
                post.taggedUsers?.length - slicedTaggedFriends.length
              }}
              أكثر</span
            >
          </span>
        </span>
      </template>
    </div>
    <slot name="date"></slot>
  </div>
</template>

<script>
export default {
  name: "PostUser",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    slicedTaggedFriends() {
      return this.post.taggedUsers?.slice(0, 3);
    },
    profile_picture() {
      const femaleAvatar = require("@/assets/images/avatar/avatar-04.jpg");
      const maleAvatar = require("@/assets/images/avatar/avatar-05.jpg");
      // const profilePic = this.auth.user_profile.profile_picture;
      const authGender = this.post.user?.gender?.toLowerCase();

      //to be used after adding the profile picture
      // return (
      //   profilePic ?? (authGender === "female" ? femaleAvatar : maleAvatar)
      // );
      return authGender === "female" ? femaleAvatar : maleAvatar;
    },
    authUser() {
      return this.$store.getters.getUser;
    },
    userProfile() {
      return this.post?.user?.profile ?? this.post?.user?.user_profile;
    },
  },
  methods: {
    sendToProfile(user_id) {
      this.$router.push({
        name: "user.profile",
        params: { user_id },
      });
    },
    sendToGroup(group_id) {
      this.$router.push({
        name: "group.group-detail",
        params: { group_id },
      });
    },
  },
};
</script>

<style scoped>
.author-name {
  font-size: 1rem;
  font-weight: 600;
}
.hover-undelined:hover {
  text-decoration: underline;
}
</style>
