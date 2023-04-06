<template>
  <div class="user-img">
    <img
      class="avatar-50 rounded-circle"
      :src="profile_picture"
      alt="user profile"
    />
  </div>
  <div class="mx-2 flex-grow-1">
    <div class="author-friends p-0 m-0">
      <span class="author-name">{{ user?.name }}</span>
      <span v-if="friends.length" class="mx-1"> مع </span>
      <span v-for="(friend, index) in slicedTaggedFriends" :key="friend.id">
        <span class="author-name hover-undelined" role="button">{{
          friend.name
        }}</span>
        <span
          class="mx-1"
          v-if="
            index !== slicedTaggedFriends.length - 1 ||
            friends.length > slicedTaggedFriends.length
          "
          >و</span
        >
        <span v-if="index === slicedTaggedFriends.length - 1">
          <span
            v-if="friends.length > slicedTaggedFriends.length"
            class="author-name hover-undelined"
            role="button"
            @click.prevent="getFriends"
            >{{ friends.length - slicedTaggedFriends.length }} أكثر</span
          >
        </span>
      </span>
    </div>
    <slot name="date"></slot>
  </div>
</template>

<script>
export default {
  name: "TaggedFriends",
  props: {
    user: {
      type: Object,
      required: true,
    },
    friends: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    slicedTaggedFriends() {
      return this.friends.slice(0, 3);
    },
    profile_picture() {
      const femaleAvatar = require("@/assets/images/avatar/avatar-04.jpg");
      const maleAvatar = require("@/assets/images/avatar/avatar-05.jpg");
      // const profilePic = this.auth.user_profile.profile_picture;
      const authGender = this.user?.gender?.toLowerCase();

      //to be used after adding the profile picture
      // return (
      //   profilePic ?? (authGender === "female" ? femaleAvatar : maleAvatar)
      // );
      return authGender === "female" ? femaleAvatar : maleAvatar;
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
