<template>
  <div class="iq-media-group me-3 col-6 d-flex align-items-center" v-if="members.length > 0">
    <router-link class="iq-media" :to="{ name: 'group.group-members', params: { group_id: group_id } }">
      <img src="@/assets/images/main/more_users.png" alt="profile-img" class="img-fluid avatar-40 rounded-circle"
        :title="`عرض الكل`" />
    </router-link>
    <router-link class="iq-media" v-for="member in members.slice(0, 5)" :key="member.id"
      :to="{ name: 'user.profile', params: { user_id: member.id } }">
      <BaseAvatar :profileImg="member.user_profile.profile_picture" :profile_id="member.user_profile.id"
        :title="member.name" :gender="member.gender" avatarClass="rounded-circle avatar-40 img-fluid" />
    </router-link>
  </div>
  <div class="iq-media-group me-3 col-6" v-else>
    <p>لا يوجد أعضاء</p>
  </div>
</template>
<script>

export default {
  name: "Members List",
  props: {
    members: {
      type: [Object],
      required: true,
    },
  },
  created() {
  },
  data() {
    return {
      show: false,
      group_id: this.$route.params.group_id,
    };
  },
};
</script>
