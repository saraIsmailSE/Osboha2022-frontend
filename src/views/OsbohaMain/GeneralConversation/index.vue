<template>
  <div class="col-sm-12 text-center" v-if="loadingClose">
    <img
      :src="require('@/assets/images/page-img/page-load-loader.gif')"
      alt="loader"
      style="height: 100px"
    />
  </div>
  <div class="row" v-else>
    <div class="col-sm-12">
      <div
        class="card position-relative inner-page-bg bg-primary mb-2"
        style="height: 80px"
      >
        <div class="inner-page-title">
          <h2 class="text-white">التحويل العام</h2>
        </div>
      </div>
    </div>

    <AddQuestion @add-question="addNewQuestion" v-if="!questionId" />

    <div class="col-12 my-2" v-if="!questionId && showFollowupButton">
      <button class="btn btn-info" @click="addFollowupAction">
        <div class="col-sm-12 text-center" v-if="loadingFollowupAddition">
          <img
            :src="require('@/assets/images/page-img/page-load-loader.gif')"
            alt="loader"
            style="height: 30px"
          />
        </div>
        <span v-else>
          {{ counterText }}
        </span>
      </button>
    </div>

    <div class="col-12">
      <div class="card card-block card-stretch card-height blog">
        <div class="card-header" v-if="!questionId">
          <h2>{{ title }}</h2>
        </div>
        <div class="card-body">
          <div class="blog-description">
            <div class="col-lg-12 mb-3">
              <FilterQuestion
                :filterQuestions="filterQuestions"
                v-if="!questionId"
              />
              <button
                v-else
                class="bg-primary rounded badge text-white border-0 ms-1 me-1"
                @click="backToQuestions"
              >
                الكل
              </button>
            </div>
            <div
              class="d-flex align-items-center justify-content-start"
              v-if="emptyMessage"
            >
              <div class="me-2">
                <font-awesome-icon
                  :icon="['fas', 'circle-exclamation']"
                  size="xl"
                />
              </div>
              <div>{{ emptyMessage }}</div>
            </div>

            <Questions v-else :questions="questions" @updateKey="updateKey" />

            <div class="col-sm-12 text-center" v-if="loading">
              <img
                :src="require('@/assets/images/page-img/page-load-loader.gif')"
                alt="loader"
                style="height: 100px"
              />
            </div>

            <div class="col-12" v-if="hasMore && questions.length > 0">
              <div class="card card-block card-stretch card-height blog">
                <button
                  type="button"
                  class="btn btn-primary d-block w-100"
                  @click="loadMore"
                  :disabled="loading"
                >
                  تحميل المزيد من الأسئلة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userInfoService from "@/Services/userInfoService";
import AddQuestion from "@/components/conversation/AddQuestion.vue";
import GeneralConversationService from "@/API/services/general-conversation.service";
import Questions from "@/components/conversation/Questions.vue";
import FilterQuestion from "@/components/conversation/FilterQuestion.vue";
import helper from "@/utilities/helper";

export default {
  name: "GeneralConversation",
  components: {
    AddQuestion,
    Questions,
    FilterQuestion,
  },
  provide() {
    return {
      addNewAnswer: this.addNewAnswer,
    };
  },
  async created() {
    await this.checkUserPermission();
    // await this.closeOverdueQuestions(); -- dr. Ahmed asked to remove this feature
    await this.getQuestions();

    this.followupCounter = this.userFollowup ? this.userFollowup.counter : 0;
  },
  data() {
    return {
      questions: [],
      loading: false,
      emptyMessage: "",
      keyword: "all",
      loadingClose: false,
      hasMore: false,
      page: 1,
      questionId: this.$route.params.questionId || null,
      userFollowup: null,
      showFollowupButton: false,
      followupCounter: null,
      loadingFollowupAddition: false,
    };
  },
  computed: {
    auth() {
      return this.$store.getters.getUser;
    },
    title() {
      if (this.keyword === "my-questions") {
        return "أسئلتي";
      } else if (this.keyword === "assigned-to-me") {
        return "الأسئلة المعينة لي";
      }
      return "كل الأسئلة";
    },
    counterText() {
      return this.followupCounter === 0 ? "التفقد الأول" : "التفقد الثاني";
    },
  },
  watch: {
    keyword: function (val) {
      this.emptyMessage = "";
      this.page = 1;
      this.hasMore = false;
      this.questions = [];
      this.getQuestions();
    },

    userFollowup: function (val) {
      if (val?.counter >= 2) {
        this.showFollowupButton = false;
        return;
      }

      if (!val) {
        this.showFollowupButton = true;
        return;
      }

      //check if the last followup was less than 6 hours so we don't show the button
      const now = new Date();
      const followupUpdatedAt = new Date(val?.updated_at);
      const diff = Math.abs(now - followupUpdatedAt);
      const hours = Math.ceil(diff / (1000 * 60 * 60));
      if (hours < 6) {
        this.showFollowupButton = false;
      } else {
        this.showFollowupButton = true;
      }
    },
  },
  methods: {
    ...helper,
    checkUserPermission() {
      if (
        !userInfoService.hasRoles(this.auth, [
          "admin",
          "consultant",
          "advisor",
          "supervisor",
          "leader",
        ])
      ) {
        this.$router.push({ name: "NotFound" });
      }
    },

    addNewQuestion(question) {
      this.questions.unshift(question);
    },

    addNewAnswer(answer) {
      const question = this.questions.find((q) => q.id === answer.question_id);

      if (question) {
        question.answers.push(answer);
      }
    },

    async getQuestions() {
      if (this.loading) {
        return;
      }

      this.loading = true;

      try {
        let response;
        if (this.questionId) {
          response = await GeneralConversationService.getQuestionById(
            this.questionId,
          );

          if (!response.data) {
            this.emptyMessage = response.message;
            return;
          }

          this.questions = [response.data];
          this.hasMore = false;
          return;
        } else {
          if (this.keyword === "all" || this.keyword === "") {
            //get all questions
            response = await GeneralConversationService.getQuestions(this.page);
          } else if (this.keyword === "my-questions") {
            //get my questions
            response = await GeneralConversationService.getMyQuestions(
              this.page,
            );
          } else if (this.keyword === "assigned-to-me") {
            //get assigned to me questions
            response =
              await GeneralConversationService.getAssignedToMeQuestions(
                this.page,
              );
          }

          if (response.data.questions.length === 0) {
            this.emptyMessage = response.message;

            this.userFollowup = response.data.user_followup;
            return;
          }

          this.questions = [...this.questions, ...response.data.questions];
          this.hasMore = response.data.has_more_pages;
          this.userFollowup = response.data.user_followup;
        }
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loading = false;
      }
    },

    async filterQuestions(key) {
      this.keyword = key;
    },

    async loadMore() {
      this.page++;
      await this.getQuestions();
    },

    updateKey(question, key, value) {
      question[key] = value;
    },

    async closeOverdueQuestions() {
      if (this.loadingClose) {
        return;
      }

      this.loadingClose = true;

      try {
        await GeneralConversationService.closeOverdueQuestions();
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loadingClose = false;
      }
    },

    backToQuestions() {
      this.$router.replace({ name: "general-conversation.index" });
      //reset questionId
      this.questionId = null;
      this.questions = [];
      this.getQuestions();
    },

    checkFollowup() {
      //check if the time in the userFollowup (updated_at) is less than 6 hrs
      if (this.userFollowup) {
        const now = new Date();
        const updated_at = new Date(this.userFollowup.updated_at);
        const diff = Math.abs(now - updated_at) / 36e5;
        console.log(this.userFollowup);
        if (diff < 6) {
          this.showFollowupButton = false;
        }
      }
    },

    async addFollowupAction() {
      if (this.loadingFollowupAddition) {
        return;
      }

      if (this.followupCounter >= 2) {
        return;
      } else if (this.followupCounter === 1) {
        await this.addFollowup();
        return;
      } else {
        const swal = this.$swal.mixin({
          customClass: {
            confirmButton: "btn btn-primary btn-lg",
          },
          buttonsStyling: false,
        });

        swal
          .fire({
            title: "تنويه",
            text: "لا يمكنك إدخال التفقد الثاني إلا بعد مرور 6 ساعات على إدخال التفقد الأول",
            showCancelButton: false,
            confirmButtonText: "حسنًا",
            icon: "warning",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await this.addFollowup();
            }
          });
      }
    },

    async addFollowup() {
      this.loadingFollowupAddition = true;

      try {
        const response = await GeneralConversationService.addFollowup();

        setTimeout(() => {
          this.$swal.fire({
            title: "تم إضافة التفقد بنجاح",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "حسنًا",
            customClass: {
              confirmButton: "btn btn-primary btn-lg",
            },
            buttonsStyling: false,
          });

          this.userFollowup = response.data;
        }, 1000);
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loadingFollowupAddition = false;
      }
    },
  },
};
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: start;
}

.timer-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.digital-container {
  display: flex;
  flex-direction: row;
  padding: 0;
}

.single-digit {
  position: relative;
  display: flex;
  flex: 0 1 25%;
  font-size: 30px;
  background-color: #404549;
  border-radius: 5px;
  padding: 10px 12px;
  color: #fff;
}

.separator-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  margin: 0 0 10px;
}

.separator {
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #404549;
  border-radius: 6px;
  margin: 1px 0;
}

.title {
  font-size: 12px;
  margin-bottom: 5px;
}
</style>
