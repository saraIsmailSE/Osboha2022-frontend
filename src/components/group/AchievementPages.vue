<template>
  <BaseAvatar
    :profileImg="record.user.user_profile.profile_picture"
    :profile_id="record.user.user_profile.id"
    :title="record.user.name"
    :gender="record.user.gender"
    avatarClass="rounded-circle avatar-40"
  />
  <div class="d-flex align-items-center justify-content-between w-100">
    <div class="ms-3">
      <h6>{{ record.user.name }}</h6>
      <p class="mb-0">عدد الصفحات: {{ record.total_pages }}</p>
    </div>
    <div class="card-header-toolbar d-flex align-items-center">
      <router-link
        :to="{
          name: 'group.listOneAmbassadorReading',
          params: { ambassador_id: record.user_id },
        }"
      >
        <i class="material-symbols-outlined md-18 me-1 text-primary">
          visibility
        </i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Achievement Pages",
  props: {
    record: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
