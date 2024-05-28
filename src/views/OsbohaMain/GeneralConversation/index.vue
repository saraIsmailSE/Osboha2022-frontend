<template>
  <div class="col-sm-12 text-center" v-if="loadingClose">
    <img
      :src="require('@/assets/images/gif/page-load-loader.gif')"
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

    <div class="col-12">
      <div class="card card-block card-stretch card-height blog">
        <div class="card-header">
          <h4 class="card-title">{{ title }}</h4>
        </div>
        <div class="card-body">
          <div class="blog-description">
            <div class="col-lg-12 mb-3">
              <FilterQuestion v-if="!questionId" :loadingQuestions="loading" />
              <button
                v-else
                class="bg-primary rounded badge text-white border-0 ms-1 me-1"
                @click="backToQuestions"
              >
                عودة للتحويل العام
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
            <list-exceptions
              :exception_type="'exceptional_freez'"
              :exceptions="exceptions"
              v-else-if="exceptions.length > 0"
            />

            <Questions v-else :questions="questions" />

            <div class="col-sm-12 text-center" v-if="loading">
              <img
                :src="require('@/assets/images/gif/page-load-loader.gif')"
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
import ListExceptions from "@/components/exceptions/ListExceptions";

export default {
  name: "GeneralConversation",
  components: {
    AddQuestion,
    Questions,
    ListExceptions,
    FilterQuestion,
  },
  provide() {
    return {
      addNewAnswer: this.addNewAnswer,
      filterQuestions: this.filterQuestions,
      updateQueryParams: this.updateQueryParams,
    };
  },
  async created() {
    const queryParams = this.$route.query;

    if (!queryParams.keyword) {
      this.$router.push({ query: this.queryParams });
    } else {
      this.queryParams = { ...this.queryParams, ...queryParams };
    }

    await this.checkUserPermission();
    await this.getQuestions();
  },
  data() {
    return {
      questions: [],
      exceptions: [],
      loading: false,
      emptyMessage: "",
      loadingClose: false,
      hasMore: false,
      page: 1,
      questionId: this.$route.params.questionId || null,
      discussion_type: "",
      queryParams: {
        keyword: "my-questions",
        discussion_type: "",
      },
    };
  },
  computed: {
    auth() {
      return this.$store.getters.getUser;
    },
    title() {
      switch (this.queryParams.keyword) {
        case "my-questions":
        case "":
          return "تحويلاتي";
        case "my-active-questions":
          return "تحويلاتي الفعالة";
        case "my-late-questions":
          return "تحويلات متأخرة";
        case "discussion-questions": {
          if (this.queryParams.discussion_type === "private") {
            return "النقاش الخاص";
          } else if (this.queryParams.discussion_type === "administrative") {
            return "النقاش الإداري";
          }
          return "النقاش العام";
        }
        case "all":
          return "كافة التحويل العام";
        case "exceptional-freez":
          return "التجميد الاستثنائي";

        default:
          return null;
      }
    },
  },
  watch: {
    queryParams: {
      handler(val) {
        this.emptyMessage = "";
        this.page = 1;
        this.hasMore = false;
        this.questions = [];
        this.getQuestions();
        this.$router.push({ query: val });
      },
      deep: true,
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
      //if tab is not my-questions, or my-active-questions, add the question to the top of the list
      //else, navigate to the my-questions tab
      if (
        this.queryParams.keyword === "my-questions" ||
        this.queryParams.keyword === ""
      ) {
        this.questions.unshift(question);
      } else {
        this.queryParams = { ...this.queryParams, keyword: "my-questions" };
      }
    },

    addNewAnswer(answer) {
      const question = this.questions.find((q) => q.id === answer.question_id);

      //update late status if the assignee user respond to the question
      if (question) {
        if (answer.user.id === question.assignee.id) {
          question.is_answered_late = false;
        }
        question.answers.push(answer);
      }
    },

    async getQuestions() {
      if (this.loading) return;

      this.loading = true;
      this.exceptions = [];

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
          const { keyword, discussion_type } = this.queryParams;
          if (keyword === "my-questions" || keyword === "") {
            //get my questions
            response = await GeneralConversationService.getMyQuestions(
              this.page,
            );
          } else if (keyword === "my-active-questions") {
            //get my active questions
            response = await GeneralConversationService.getMyActiveQuestions(
              this.page,
            );
          } else if (keyword === "my-late-questions") {
            //get my late questions
            response = await GeneralConversationService.getMyLateQuestions(
              this.page,
            );
          } else if (keyword === "discussion-questions") {
            //get discussion questions
            response = await GeneralConversationService.getDiscussionQuestions(
              this.page,
              discussion_type,
            );
          } else if (keyword === "all") {
            //get all questions
            response = await GeneralConversationService.getAllQuestions(
              this.page,
            );
          } else if (keyword === "my-assigned-to-parent-questions") {
            //get my assigned to parent questions
            response =
              await GeneralConversationService.getMyAssignedToParentQuestions(
                this.page,
              );
          } else if (keyword === "exceptional-freez") {
            //get exceptional freez assigned to user
            response =
              await GeneralConversationService.getMyAssignedExceptionalFreez(
                this.page,
              );
          } else {
            return;
          }

          if (response.data?.length === 0) {
            this.emptyMessage = response.message;
            return;
          }
          if (response.data.type == "exceptional-freez") {
            this.exceptions = response.data?.exceptions.data;
          } else {
            this.questions = [...this.questions, ...response.data?.questions];
          }
          this.hasMore = response.data.has_more_pages;
        }
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loading = false;
      }
    },

    async filterQuestions(key, type = "") {
      this.queryParams = {
        ...this.queryParams,
        keyword: key,
        discussion_type: type,
      };
    },

    async loadMore() {
      this.page++;
      await this.getQuestions();
    },

    backToQuestions() {
      this.$router.replace({ name: "general-conversation.index" });
      //reset questionId
      this.questionId = null;
      this.questions = [];
      this.getQuestions();
    },

    updateQueryParams(params) {
      this.queryParams = { ...this.queryParams, ...params };
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
