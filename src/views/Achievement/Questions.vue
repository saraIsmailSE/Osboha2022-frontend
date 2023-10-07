<template>
  <div class="row">
    <div class="col-sm-12">
      <iq-card>
        <div class="iq-card-body profile-page p-0">
          <div class="profile-header">
            <div class="cover-container">
              <img src="../../assets/images/book-banner.png" alt="profile-bg" class="rounded img-fluid" />
            </div>
            <div class="user-detail text-center mb-3">
              <div class="profile-img">
                <img src="../../assets/images/reader.png" alt="profile-img" class="avatar-130 img-fluid" />
              </div>
              <div class="profile-detail mt-1">
                <br />
                <h3 class="" v-if="book">
                  {{ book.name }} - قسم الأسئلة العامة
                </h3>
              </div>
            </div>
          </div>
        </div>
      </iq-card>
      <iq-card class="iq-card">
        <div class="iq-card-body p-0">
          <div class="user-tabing">
            <tab-nav :pills="true" id="pills-tab"
              class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
              <tab-nav-items class="w-100 p-0" :active="true" id="pills-feed-tab" href="#questions_container"
                ariaControls="pills-home" role="tab" :ariaSelected="true" title="المرحلة الثالثة - الاسئلة المعرفية" />
            </tab-nav>
          </div>
        </div>
      </iq-card>
    </div>
    <div class="col-sm-12">
      <div class="tab-content">
        <!-- START QUESTIONS -->
        <tab-content-item :active="true" id="questions_container" aria-labelled-by="pills-feed-tab">
          <div class="iq-card-body p-0">
            <div class="row">
              <div class="col-12">
                <div id="post-modal-data" class="iq-card">
                  <div>
                    <iq-card id="post-modal-data" v-if="(questions.length < 12 && auditable) ||
                      (questions.length == 0 || questions.length < 5)
                      " body-class="iq-card iq-card-block iq-card-stretch iq-card-height">
                      <template v-slot:headerTitle>
                        <h4 class="card-title">إضافة الأسئلة المعرفية وإجاباتها</h4>
                      </template>
                      <template v-slot:body>
                        <div class="d-flex align-items-center">
                          <div class="d-flex align-items-center mt-3 w-100">
                            <form v-if="book" @submit.prevent="submitQuestionForm" class="post-text ml-3 w-100 row">
                              <div class="form-group col-12">
                                <small style="color: red">
                                  * فضلاً يتوجب عليك إرفاق عدد (5) من الأسئلة التي يجيب عنها الكتاب كحد أدنى. تذكر أن
                                  سؤالك يجب أن لا يكون مركبًا. (مثال مرفوض 🚫 كيف ومتى تحدث ظاهرة المد والجزر؟)
                                </small>
                              </div>
                              <div class="form-group col-6">
                                <select v-model="v$.questionForm.starting_page.$model" class="form-select" data-trigger
                                  name="choices-single-default" id="choices-single-default">
                                  <option value="">اختر صفحة البداية</option>
                                  <option v-for="(i, index) in book.end_page" :key="index" :value="i">
                                    {{ i }}
                                  </option>
                                </select>
                                <small style="color: red" v-if="v$.questionForm.starting_page.$error">{{
                                  pageError
                                  ? pageError
                                  : "الرجاء قم بادخال صفحة البداية"
                                }}</small>
                              </div>
                              <div class="form-group col-6">
                                <select class="form-select" v-model="v$.questionForm.ending_page.$model" data-trigger
                                  name="choices-single-default" id="choices-single-default">
                                  <option value="">اختر صفحة النهاية</option>
                                  <option v-for="(i, index) in book.end_page" :key="index" :value="i">
                                    {{ i }}
                                  </option>
                                </select>
                                <small style="color: red" v-if="v$.questionForm.ending_page.$error">{{
                                  pageError
                                  ? pageError
                                  : ` الرجاء قم بادخال صفحة
                                  النهاية`
                                }}</small>
                              </div>
                              <div class="form-group">
                                <textarea rows="5"
                                  placeholder=" اكتب سؤالًا  عدد حروفه بين 10 و 250 تجيب عنه الصفحات التي حددتها أعلاه، سنبحث عن إجابة السؤال ضمن هذه الصفحات فقط لتوثيق قراءتك"
                                  class="rounded form-control" id="bookQuestion" @change="resetInsertSuccessfully()"
                                  v-model="v$.questionForm.question.$model"></textarea>
                                <small style="color: red" v-if="v$.questionForm.question.$error">
                                  لطفًا قم بكتابة سؤال عدد حروفه بين 10 و 250 خالي من الرموز التعبيرية (emojis)
                                </small>
                              </div>
                              <div></div>
                              <div class="form-group">
                                <h4 class="card-title"> إجاباتها بأسلوبك</h4>
                                <small style="color: red">
                                  * فضلًا يتوجب عليك إرفاق عدد (1) من الاجابات كحد أقصى تجيب فيه عن السؤال بأسلوبك.
                                </small>

                                <div class="form-group row" v-for="(v, index) in questionForm.quotes" :key="index">
                                  <textarea rows="5"
                                    placeholder="اكتب لنا إجابة السؤال الذي ذكرت أعلاه بأسلوبك عدد حروفها لا يزيد عن 250، سنقوم بتفقد الصفحات المحددة أعلاه لنراجع مدى دقة الإجابة التي قدمت للسؤال"
                                    class="rounded form-control mt-2" id="bookQuote" v-model="v.text" style="width: 90%">
                                  </textarea>
                                </div>
                                <small style="color: red" v-if="v$.questionForm.quotes.$error">
                                  قم بادخال إجابة واحدة على الاقل عدد حروفها لا يزيد عن 250 خالية من الرموز التعبيرية
                                  (emojis)
                                </small>
                              </div>
                              <input type="submit" value="أضافة" href="javascript:void(0);"
                                class="btn btn-primary d-block mt-3" />
                            </form>
                          </div>
                        </div>
                        <hr />
                      </template>
                    </iq-card>
                  </div>
                </div>
                <alert v-if="insertSuccessful" variant="primary" className="d-flex align-items-center text-center">
                  <template v-slot>
                    <div>
                      <h5 class="card-title">تمت الاضافة بنجاح</h5>
                    </div>
                  </template>
                </alert>

                <iq-card v-if="questions.length > 0">
                  <template v-slot:headerTitle>
                    <h4 class="card-title">الأسئلة</h4>
                  </template>
                  <template v-slot:body>
                    <form id="form-wizard1" class="text-center mt-3">
                      <ul id="top-tab-list" class="p-0 row list-inline">
                        <li v-for="(question, index) in questions" :key="index" :class="checkActive(index, index + 1)"
                          class="col-2 mb-2 text-start" @click="changeTab(index + 1)" id="account">
                          <a href="javascript:void(0);">
                            <span> {{ index + 1 }}</span>
                          </a>
                        </li>
                      </ul>
                      <!-- fieldsets -->
                      <fieldset v-for="(question, index) in questions" :key="index"
                        :class="current == index + 1 ? 'd-block' : 'd-none'">
                        <ListQuestion :question="question" :index="index" :book="book" :user_book="user_book" />
                      </fieldset>
                    </form>
                  </template>
                </iq-card>

                <div class="col-lg-12">
                  <iq-card>
                    <template v-slot:body>
                      <button class="btn btn-primary d-block w-100 mb-3" @click="reviewQuestions"
                        v-if="questions.length >= 5 && auditable">
                        اعتماد
                      </button>
                      <button class="btn btn-success d-block w-100" @click="back()">
                        عودة لصفحة الانجاز
                      </button>
                    </template>
                  </iq-card>
                </div>
              </div>
            </div>
          </div>
        </tab-content-item>
        <!-- END QUESTIONS -->
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import ListQuestion from "../../components/Questions/ListQuestion.vue";
import questionServices from "../../api/questionServices";

export default {
  name: "Questions",
  async created() {
    await this.getQuestions();
  },
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    ListQuestion,
  },
  data() {
    return {
      auditable: false,
      book: null,
      user_book: null,
      status: "",
      pageError: "",
      quotesError: "",
      questionError: "",
      questionForm: {
        question: "",
        starting_page: "",
        ending_page: "",
        user_book_id: null,
        quotes: [{ text: "" }],
      },
      questions: [],
      show: "",
      current: 1,
      insertSuccessful: false,
    };
  },
  validations() {
    return {
      questionForm: {
        question: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(250),
        },
        starting_page: {
          required,
        },
        ending_page: {
          required,
          valdiatePages: this.validatePages,
        },
        quotes: {
          required,
          minLength: minLength(1),
          $each: {
            text: {
              minLength: minLength(250),
            },
          },
        },
      },
    };
  },
  methods: {
    async getQuestions() {
      const response = await questionServices.getByBook(this.$route.params.id);
      this.book = response.user_book.book;
      this.questions = response.questions;
      this.user_book = response.user_book;
      this.questionForm.user_book_id = response.user_book.id;
      this.status = this.user_book.status;
      this.auditable = this.questions.some((element) => {
        if (element.status === "retard" || element.status === null) {
          return true;
        }
        return false;
      });
    },
    resetInsertSuccessfully() {
      this.insertSuccessful = false;
    },

    removeEmojis(text) {
      var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      return text.replace(regex, '');
    },

    async submitQuestionForm() {
      this.questionForm.question = this.removeEmojis(this.questionForm.question)
      for (let i = 0; i < this.questionForm.quotes.length; i++) {
        this.questionForm.quotes[i].text = this.removeEmojis(this.questionForm.quotes[i].text);
      }


      this.v$.$touch();

      if (!this.v$.questionForm.$invalid) {
        this.insertSuccessful = false;
        const question = await questionServices.addQuestion(this.questionForm);
        this.questionForm.question = "";
        this.questionForm.starting_page = "";
        this.questionForm.ending_page = "";
        this.questionForm.quotes = [{ text: "" }];
        this.v$.questionForm.$reset();
        this.questions.push(question);
        this.auditable = true;
        this.insertSuccessful = true;
      }
    },
    validatePages() {
      const error =
        parseInt(this.questionForm.starting_page) <
        parseInt(this.questionForm.ending_page);
      if (!error)
        this.pageError = "يجب ان تكون صفحة البداية اقل من صفحة النهاية";
      else this.pageError = "";
      return error;
    },
    async reviewQuestions() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-primary btn-lg ms-2",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "هل أنت متأكد؟",
          text: "في حال الاعتماد لن يمكنك اضافة سؤال جديد أو التعديل على الأسئلة التي كتبتها ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم قم بالاعتماد ",
          cancelButtonText: "تراجع  ",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        })
        .then((willDelete) => {
          if (willDelete.isConfirmed) {
            questionServices
              .reviewQuestion(this.user_book.id)
              .then((response) => {
                swalWithBootstrapButtons.fire({
                  title: "تم الارسال",
                  text: "تم اعتماد الأسئلة",
                  icon: "success",
                  showClass: {
                    popup: "animate__animated animate__zoomIn",
                  },
                  hideClass: {
                    popup: "animate__animated animate__zoomOut",
                  },
                });
                this.auditable = false;
                this.insertSuccessful = false;
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
    back() {
      this.$router.push({
        name: `achievement.steps`,
        params: { id: this.$route.params.id },
      });
    },
    changeTab(tab) {
      this.current = tab;
      window.scrollTo({ behavior: "smooth" });
    },
    checkActive(item, active) {
      let className = "";
      if (this.current > item) {
        className = "active";
      }
      if (this.current > active) {
        className = className + " done";
      }
      return className;
    },
  },
};
</script>
