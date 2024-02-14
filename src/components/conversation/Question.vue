<template>
  <div class="card card-block card-stretch card-height blog">
    <div class="card-body">
      <div class="accordion-item mb-3">
        <div class="mt-3 d-flex align-items-center justify-content-start w-100">
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
        <div
          :id="'collapse' + question.id"
          class="accordion-collapse collapse"
          aria-labelledby="heading1"
          data-bs-parent="#questions-accordion"
        >
          <div class="accordion-body">
            <div
              class="col-12 row justify-content-start"
              v-if="question.media?.length > 0"
            >
              <div
                class="col-lg-3 col-md-6 col-sm-12 mb-2"
                v-for="(mediaFile, index) in question.media"
                :key="index"
              >
                <a :href="`${mediaFile.path}`" target="_blank">
                  <img
                    class="img-fluid rounded w-100 h-100"
                    :src="`${mediaFile.path}`"
                    alt="question media"
                    style="object-fit: cover; border: 1px solid #e5e5e5"
                  />
                </a>
              </div>
            </div>

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
                  answer.id !== question.answers[question.answers.length - 1].id
                "
              />
            </div>

            <div class="my-2">
              <AddAnswer
                v-if="question.status !== 'solved'"
                :question_id="question.id"
                :status="question.status"
              />
            </div>

            <QuestionStat :question="question" :onTimerEnd="onTimerEnd" />

            <div
              class="mt-3 d-flex align-content-start flex-wrap"
              style="position: relative"
            >
              <span
                role="button"
                @click="showUserInfo = !showUserInfo"
                class="align-middle material-symbols-outlined text-danger"
                v-click-outside="onClickOutside"
              >
                info
              </span>

              <div
                :class="`dropdown-menu dropdown-menu-right ${
                  showUserInfo ? 'show' : ''
                }`"
                aria-labelledby="user-info-menu"
                style="top: 30px"
              >
                <div
                  class="d-flex gap-1 align-items-center p-2"
                  v-for="parent in question.user_parents"
                  :key="parent.role"
                >
                  <span>
                    <strong> {{ parent.role }} </strong>
                  </span>

                  <span>
                    {{ parent.name }}
                  </span>
                </div>
              </div>

              <button
                v-if="
                  (question.user.id === auth.id || isAuthAdmin) &&
                  question.status === 'open'
                "
                class="bg-primary rounded badge text-white border-0 ms-1 me-1"
                @click="solveQuestion"
                :disabled="loadingSolve"
              >
                <img
                  v-if="loadingSolve"
                  :src="require('@/assets/images/gif/page-load-loader.gif')"
                  alt="loader"
                  style="height: 20px"
                />
                <span v-else> انتهاء </span>
              </button>

              <button
                v-if="
                  question.assignee.id === auth.id &&
                  !isAssigneeAdmin &&
                  question.status === 'open'
                "
                class="bg-dark rounded badge text-white border-0 ms-1 me-1"
                @click="assignToParent"
              >
                <img
                  v-if="loadingAssign"
                  :src="require('@/assets/images/gif/page-load-loader.gif')"
                  alt="loader"
                  style="height: 20px"
                />
                <span v-else> رفع إلى المسؤول </span>
              </button>

              <button
                v-if="consultantAndAbove && question.status === 'open'"
                class="bg-info rounded badge text-white border-0 ms-1 me-1"
                @click="moveToDiscussion"
              >
                <img
                  v-if="loadingDiscussion"
                  :src="require('@/assets/images/gif/page-load-loader.gif')"
                  alt="loader"
                  style="height: 20px"
                />
                <span v-else> نقاش </span>
              </button>

              <button
                v-if="consultantAndAbove && question.status === 'discussion'"
                class="bg-info rounded badge text-white border-0 ms-1 me-1"
                @click="moveToQuestions"
              >
                <img
                  v-if="loadingDiscussion"
                  :src="require('@/assets/images/gif/page-load-loader.gif')"
                  alt="loader"
                  style="height: 20px"
                />
                <span v-else> إعادة </span>
              </button>
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
import vClickOutside from "click-outside-vue3";

export default {
  name: "Question",
  components: {
    QuestionStat,
    AddAnswer,
  },

  data() {
    return {
      loadingSolve: false,
      loadingClose: false,
      loadingAssign: false,
      loadingDiscussion: false,
      countdown: "00:00:00",
      startTime: null,
      showUserInfo: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  computed: {
    auth() {
      return this.$store.getters.getUser;
    },
    isAuthAdmin() {
      return userInfoService.hasRole(this.auth, "admin");
    },
    consultantAndAbove() {
      return userInfoService.hasRoles(this.auth, ["admin", "consultant"]);
    },
    isAssigneeAdmin() {
      return userInfoService.hasRole(this.question.assignee, "admin");
    },
  },
  methods: {
    ...helper,
    pad(value) {
      return value < 10 ? `0${value}` : value;
    },

    canEdit() {
      return (
        this.question.user.id === this.auth.id ||
        this.question.assignee.id === this.auth.id ||
        userInfoService.hasRole(this.auth, "admin")
      );
    },

    async solveQuestion() {
      if (this.loadingSolve) {
        return;
      }
      this.loadingSolve = true;
      try {
        await GeneralConversationService.solveQuestion(this.question.id);
        this.toggleToast("تم إغلاق التحويل", "success");

        //reload the window
        setTimeout(() => {
          location.reload();
        }, 1000);
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loadingSolve = false;
      }
    },

    async assignToParent() {
      if (this.loadingAssign) {
        return;
      }
      this.loadingAssign = true;
      try {
        const response = await GeneralConversationService.assignToParent(
          this.question.id,
        );

        this.toggleToast("تم تعيين التحويل للمشرف", "success");

        setTimeout(() => {
          location.reload();
        }, 1000);
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loadingAssign = false;
      }
    },

    async moveToDiscussion() {
      if (this.loadingDiscussion) {
        return;
      }
      this.loadingDiscussion = true;
      try {
        await GeneralConversationService.moveToDiscussion(this.question.id);
        this.toggleToast("تم نقل التحويل للنقاش", "success");

        setTimeout(() => {
          this.$router.push({ query: { keyword: "discussion-questions" } });
          location.reload();
        }, 1000);
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loadingDiscussion = false;
      }
    },

    async moveToQuestions() {
      if (this.loadingDiscussion) {
        return;
      }
      this.loadingDiscussion = true;
      try {
        await GeneralConversationService.moveToQuestions(this.question.id);
        this.toggleToast("تم نقل التحويل للأسئلة", "success");

        setTimeout(() => {
          this.$router.replace({ query: { keyword: "my-questions" } });
          location.reload();
        }, 1000);
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loadingDiscussion = false;
      }
    },

    async onTimerEnd() {
      if (this.question.status === "open") {
        await this.assignToParent();
      }
    },

    onClickOutside() {
      this.showUserInfo = false;
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
