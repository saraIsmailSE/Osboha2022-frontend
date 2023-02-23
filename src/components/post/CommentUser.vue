<template>
  <div class="d-flex align-items-center">
    <div class="user-image mb-3">
      <img
        class="avatar-50 rounded-circle"
        :src="resolve_img_url(user?.profile.profile_picture)"
        alt="profile picture"
        data-original-title=""
        title=""
      />
    </div>
    <div class="ms-3">
      <h5>{{ user?.name }}</h5>
      <span
        class="badge bg-primary rounded-pill"
        v-for="role in user?.roles"
        :key="role"
      >
        &nbsp; {{ role }} &nbsp;</span
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "CommentUser",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    resolve_img_url(path) {
      return path ? path : require("@/assets/images/avatar/avatar-01.jpg");
    },
  },
};
</script>
