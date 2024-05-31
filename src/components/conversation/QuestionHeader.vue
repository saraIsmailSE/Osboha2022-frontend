<template lang="">
  <div class="mt-3 d-flex align-items-center justify-content-start w-100">
    <BaseAvatar
      :profileImg="question.user.profile.profile_picture"
      :profile_id="question.user.profile.id"
      :title="question.user.name"
      :gender="question.user.gender"
      avatarClass="rounded-circle avatar-40"
    />
    <div class="ms-3">
      <h6>{{ question.user.name + " " + question.user.last_name }}</h6>
    </div>
  </div>
  <h2 class="accordion-header" id="heading1">
    <button
      class="accordion-button collapsed align-items-start"
      type="button"
      data-bs-toggle="collapse"
      :data-bs-target="'#collapse' + question.id"
      aria-expanded="true"
      :aria-controls="'collapse' + question.id"
    >
      <span
        class="ms-2"
        style="white-space: pre-wrap; direction: rtl; width: 100%"
        v-html="styleUrlsAndHashtags(question.question)"
      />
    </button>
  </h2>
</template>
<script>
import helper from "@/utilities/helper";
export default {
  name: "QuestionHeader",
  inject: ["question"],
  methods: {
    ...helper,
  },
};
</script>
<style lang=""></style>
