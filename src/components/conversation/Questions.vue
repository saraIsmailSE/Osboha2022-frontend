<template>
  <div class="accordion" id="questions-accordion">
    <div class="cols" v-for="question in questions" :key="question.id">
      <div class="card card-block card-stretch card-height blog">
        <div class="card-body">
          <div class="accordion-item mb-3">
            <div
              class="mt-3 d-flex align-items-center justify-content-start w-100"
            >
              <BaseAvatar
                :profileImg="question.user.profile.profile_picture"
                :profile_id="question.user.profile.id"
                :title="question.user.name"
                :gender="question.user.gender"
                avatarClass="rounded-circle avatar-40"
              />
              <div class="ms-3">
                <h6>{{ question.user.name }}</h6>
              </div>
            </div>
            <h2 class="accordion-header" id="heading1">
              <button
                class="rtl accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapse' + question.id"
                aria-expanded="true"
                :aria-controls="'collapse' + question.id"
              >
                {{ question.question }}
              </button>
            </h2>
            <div
              :id="'collapse' + question.id"
              class="accordion-collapse collapse"
              aria-labelledby="heading1"
              data-bs-parent="#questions-accordion"
            >
              <div class="accordion-body">
                <p v-if="question.answers.length === 0">لا يوجد إجابات</p>

                <h3 v-else>الإجابات</h3>

                <div
                  class="mt-3 w-100"
                  v-for="answer in question.answers"
                  :key="answer.id"
                >
                  <div
                    class="d-flex align-items-center justify-content-start w-100 mb-2"
                  >
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
                    <p class="">
                      {{ answer.answer }}
                    </p>
                    <div
                      class="d-flex flex-wrap align-items-center comment-activity"
                    >
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
                  <hr
                    v-if="
                      answer.id !==
                      question.answers[question.answers.length - 1].id
                    "
                  />
                </div>

                <div class="my-2">
                  <AddAnswer
                    v-if="question.status === 'open'"
                    :question_id="question.id"
                  />
                </div>

                <QuestionStat :question="question" />

                <div
                  class="mt-3 d-flex align-content-start flex-wrap"
                  v-if="question.status === 'open'"
                >
                  <template v-if="canEdit(question)">
                    <button
                      class="bg-primary rounded badge text-white border-0 ms-1 me-1"
                      @click="solveQuestion(question)"
                      :disabled="loadingSolve"
                    >
                      <img
                        v-if="loadingSolve"
                        :src="
                          require('@/assets/images/page-img/page-load-loader.gif')
                        "
                        alt="loader"
                        style="height: 20px"
                      />
                      <span v-else> تم الحل </span>
                    </button>

                    <button
                      class="bg-danger rounded badge text-white border-0 ms-1 me-1"
                      @click="closeQuestion(question)"
                      :disabled="loadingClose"
                    >
                      <img
                        v-if="loadingClose"
                        :src="
                          require('@/assets/images/page-img/page-load-loader.gif')
                        "
                        alt="loader"
                        style="height: 20px"
                      />
                      <span v-else> إغلاق </span>
                    </button>
                  </template>

                  <button
                    v-if="
                      question.assignee.id === auth.id &&
                      !isAssigneeAdmin(question.assignee)
                    "
                    class="bg-dark rounded badge text-white border-0 ms-1 me-1"
                    @click="assignToParent(question)"
                  >
                    <img
                      v-if="loadingAssign"
                      :src="
                        require('@/assets/images/page-img/page-load-loader.gif')
                      "
                      alt="loader"
                      style="height: 20px"
                    />
                    <span v-else> تعيين إلى اسم المسؤول </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddAnswer from "@/components/conversation/AddAnswer.vue";
import QuestionStat from "@/components/conversation/QuestionStat.vue";
import helper from "@/utilities/helper";
import userInfoService from "@/Services/userInfoService";
import GeneralConversationService from "@/API/services/general-conversation.service";

export default {
  name: "Questions",
  components: {
    QuestionStat,
    AddAnswer,
  },
  data() {
    return {
      loadingSolve: false,
      loadingClose: false,
      loadingAssign: false,
    };
  },
  emits: ["updateKey"],
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    auth() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    ...helper,
    canEdit(question) {
      return (
        question.user.id === this.auth.id ||
        question.assignee.id === this.auth.id ||
        userInfoService.hasRole(this.auth, "admin")
      );
    },
    async solveQuestion(question) {
      if (this.loadingSolve) {
        return;
      }
      this.loadingSolve = true;
      try {
        const response = await GeneralConversationService.solveQuestion(
          question.id
        );
        this.$emit("updateKey", question, "status", response.data.status);
        this.$emit(
          "updateKey",
          question,
          "updated_at",
          response.data.updated_at
        );
        this.toggleToast("تم حل السؤال", "success");
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loadingSolve = false;
      }
    },

    async closeQuestion(question) {
      if (this.loadingClose) {
        return;
      }
      this.loadingClose = true;
      try {
        const response = await GeneralConversationService.closeQuestion(
          question.id
        );

        this.$emit("updateKey", question, "status", response.data.status);
        this.$emit(
          "updateKey",
          question,
          "updated_at",
          response.data.updated_at
        );

        this.toggleToast("تم إغلاق السؤال", "success");
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loadingClose = false;
      }
    },

    async assignToParent(question) {
      if (this.loadingAssign) {
        return;
      }
      this.loadingAssign = true;
      try {
        const response = await GeneralConversationService.assignToParent(
          question.id
        );

        this.$emit("updateKey", question, "assignee", response.data.assignee);
        this.toggleToast("تم تعيين السؤال للمشرف", "success");
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loadingAssign = false;
      }
    },
    isAssigneeAdmin(question) {
      return userInfoService.hasRole(question.assignee, "admin");
    },
  },
};
</script>
<style scoped>
.rtl {
  direction: rtl;
  text-align: start;
}
</style>
