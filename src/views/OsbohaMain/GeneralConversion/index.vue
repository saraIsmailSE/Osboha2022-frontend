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

    <AddQuestion @add-question="addNewQuestion" />

    <div class="col-12">
      <div class="card card-block card-stretch card-height blog">
        <div class="card-header">
          <h2>{{ title }}</h2>
        </div>
        <div class="card-body">
          <div class="blog-description">
            <div class="col-lg-12 mb-3">
              <FilterQuestion :filterQuestions="filterQuestions" />
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
  name: "GeneralConversion",
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
    await this.closeOverdueQuestions();
    await this.getQuestions();
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
  },
  watch: {
    keyword: function (val) {
      this.emptyMessage = "";
      this.page = 1;
      this.hasMore = false;
      this.questions = [];
      this.getQuestions();
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
        if (this.keyword === "all" || this.keyword === "") {
          //get all questions
          response = await GeneralConversationService.getQuestions(this.page);
        } else if (this.keyword === "my-questions") {
          //get my questions
          response = await GeneralConversationService.getMyQuestions(this.page);
        } else if (this.keyword === "assigned-to-me") {
          //get assigned to me questions
          response = await GeneralConversationService.getAssignedToMeQuestions(
            this.page
          );
        }

        if (response.data.length === 0) {
          this.emptyMessage = response.message;
          return;
        }

        this.questions = [...this.questions, ...response.data.questions];
        this.hasMore = response.data.has_more_pages;

        console.log(response);
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
