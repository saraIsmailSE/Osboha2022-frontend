<template>
  <p v-if="question.answers.length === 0">لا يوجد إجابات</p>

  <h3 v-else>الإجابات</h3>

  <div class="mt-3 w-100" v-for="answer in question.answers" :key="answer.id">
    <div class="d-flex align-items-center justify-content-start w-100 mb-2">
      <BaseAvatar
        :profileImg="answer.user?.profile.profile_picture"
        :profile_id="answer.user?.profile.id"
        :title="answer.user?.name"
        :gender="answer.user?.gender"
        avatarClass="rounded-circle avatar-40"
      />
      <div class="ms-3">
        <h6>{{ answer.user.name }}</h6>
      </div>
    </div>
    <div>
      <p style="white-space: pre-wrap; direction: rtl">
        {{ answer.answer }}
      </p>
      <div
        class="col-12 row justify-content-start mt-2"
        v-if="answer.media?.length > 0"
      >
        <div
          class="col-lg-3 col-md-6 col-sm-12 mb-2"
          v-for="(mediaFile, index) in answer.media"
          :key="index"
        >
          <a :href="`${mediaFile.path}`" target="_blank">
            <img
              class="img-fluid rounded w-100 h-100"
              :src="`${mediaFile.path}`"
              alt="answer media"
              style="object-fit: cover; border: 1px solid #e5e5e5"
            />
          </a>
        </div>
      </div>
      <div class="d-flex flex-wrap align-items-center comment-activity">
        <tooltip
          tag="span"
          class="text-muted small"
          tooltipPlacement="bottom"
          data-bs-toggle="tooltip"
          :title="formatFullDate(answer.created_at)"
          >{{ formatDateToWritten(answer.created_at) }}</tooltip
        >
      </div>
    </div>
    <hr v-if="answer.id !== question.answers[question.answers.length - 1].id" />
  </div>

  <div class="my-2">
    <AddAnswer
      v-if="question.status !== 'solved'"
      :question_id="question.id"
      :status="question.status"
    />
  </div>
</template>
<script>
import helper from "@/utilities/helper";
import AddAnswer from "@/components/conversation/AddAnswer.vue";

export default {
  name: "Answers",
  components: {
    AddAnswer,
  },
  inject: ["question"],
  methods: {
    ...helper,
  },
};
</script>
<style lang=""></style>
