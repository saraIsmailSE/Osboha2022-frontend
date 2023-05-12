<template>
  <li class="row d-flex align-items-center p-3">
    <div class="row">
      <div class="col">
        <BaseAvatar
          :profileImg="exception.user.user_profile.profile_picture"
          :profile_id="exception.user.user_profile.id"
          :title="exception.user.name"
          :gender="exception.user.gender"
          avatarClass="rounded-circle avatar-40"
        >
          <h6 class="d-inline-block ms-3">
            <strong>{{ exception.user.name }} </strong>
          </h6>
        </BaseAvatar>
      </div>
    </div>
    <div class="row mt-2 m-auto">
      <div class="col">
        <h5>نوع الاعفاء: {{ exception.type.type }}</h5>
      </div>
    </div>
    <div class="row mt-2 m-auto">
      <div class="col d-flex text-center">
        <i :class="`material-symbols-outlined`">bolt</i>
        <h5>{{ exception.reason }}</h5>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "Achievement Pages",
  props: {
    exception: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
