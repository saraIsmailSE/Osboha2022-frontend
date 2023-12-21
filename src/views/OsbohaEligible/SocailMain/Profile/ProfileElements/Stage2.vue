<template>
  <div class="row">
    <div class="col-md-2">
      <tab-nav
        :pills="true"
        id="tab"
        class="nav nav-pills basic-info-items list-inline d-block p-0 m-0"
      >
        <tab-nav-items
          :active="true"
          id="go-to-general-idea"
          href="#general-idea"
          ariaControls="general-idea"
          role="tab"
          :ariaSelected="true"
          title="تلخيص الفكرة العامة والسؤال العام"
        />

        <tab-nav-items
          :active="false"
          id="go-to-questions"
          href="#questions"
          ariaControls="questions"
          role="tab"
          :ariaSelected="true"
          title="أسئلة معرفية "
        />
      </tab-nav>
    </div>

    <div class="col-md-1"></div>
    <div class="col-md-9">
      <div class="tab-content">
        <!-- START GENERAL IDEA -->
        <tab-content-item
          :active="true"
          id="general-idea"
          aria-labelled-by="general-idea"
        >
          <h4>كيف اكتب المخلص العام، وكيف أحدد السؤال العام</h4>
          <hr />
          <div class="row">
            <div class="col-12">
              <p>
                لكل مادة مقروءة (كتاب) هناك سؤالًا عامًا يسعى الكتاب لنقاشه،
                ومنه يتفرع الكتاب على شكل فصول أساسية ومن ثم مباحث داخل كل فصل.
                عند شروعك في قراءة الكتاب، عليك المرور على مقدمة المؤلف ومحاولة
                معرفة (السؤال العام) الذي يسعى الكتاب للإجابة عنه.
                <br />
                أمثلة 👇🏻
                <br />
                كتاب أغنى رجل في بابل = يدور السؤال العام حول كيفية صناعة الثروة
                المالية للفرد ✅
                <br />
                كتاب سيكولوجية الجماهير = يدور السؤال العام في الكتاب حول قدرة
                المسؤول على التحكم في الجماهير والشعوب من الناحية السكولوجية ✅
                <br />

                ومن جانب آخر، لكل مادة مقروءة (كتاب) هناك تلخيص عام للأفكار
                العامة والمحاور الأساسية التي يدور حولها الكتاب. فيجب على القارئ
                أن يستطيع دائمًا تقديم ملخص من الكتاب، ويستحسن استخدام أفكار
                الكاتب والفاظه باغتضاب لصناعة الملخص، لا تقم بإضافة أفكارك
                واعتقاداتك على المخلص، ستفعل ذلك حين تكتب الأطروحة حين تمزج ملخص
                الكاتب مع أفكارك وإسقاطاتك الفكرية ومخزونك المعرفي ومقارنته مع
                الكتاب.
              </p>
            </div>
          </div>
          <div
            v-if="generalInformations"
            class="d-flex align-items-center mt-3"
          >
            <div class="post-text ml-3 w-100 row">
              <div class="row">
                <div class="w-100">
                  <p
                    class="mb-0 text-primary"
                    v-if="generalInformations.degree"
                  >
                    التقييم || {{ generalInformations.degree }}
                  </p>
                  <div
                    class="alert alert-success w-100"
                    v-if="generalInformations.reviews"
                  >
                    {{ generalInformations.reviews }}
                  </div>
                </div>

                <div class="col-md-12 form-group">
                  <div
                    class="card-post-toolbar text-end"
                    v-if="
                      generalInformations.status == null ||
                      generalInformations.status == 'rejected'
                    "
                  >
                    <div
                      class="dropdown-toggle"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      role="button"
                      @click="show = !show"
                    >
                      <span class="material-symbols-outlined">
                        more_horiz
                      </span>
                    </div>
                    <div
                      :class="`dropdown-menu dropdown-menu-right ${
                        show ? 'show' : ''
                      }`"
                      aria-labelledby="dropdownMenuButton"
                      style=""
                    >
                      <a
                        class="dropdown-item d-flex align-items-center"
                        @click="
                          updateGeneralInformation(generalInformations.id)
                        "
                      >
                        <span class="material-symbols-outlined me-2 md-18">
                          edit
                        </span>
                        تعديل
                      </a>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        @click="
                          deleteGeneralInformation(generalInformations.id)
                        "
                      >
                        <span class="material-symbols-outlined me-2 md-18">
                          delete
                        </span>
                        حذف
                      </a>
                    </div>
                  </div>
                  <div class="col-md-12 form-group">
                    <h4 class="form-label">التلخيص العام</h4>
                    <p class="form-control-plaintext">
                      {{ generalInformations.summary }}
                    </p>
                  </div>
                </div>
                <div class="col-md-12 form-group">
                  <div class="col-md-12 form-group">
                    <h4 class="form-label">السؤال العام</h4>
                    <p class="form-control-plaintext">
                      {{ generalInformations.general_question }}
                    </p>
                  </div>
                </div>

                <iq-card
                  v-if="
                    generalInformations.status == null ||
                    generalInformations.status == 'rejected'
                  "
                >
                  <template v-slot:body>
                    <button
                      class="btn btn-primary d-block w-100"
                      @click="reviewGeneralInformation"
                    >
                      طلب تدقيق
                    </button>
                  </template>
                </iq-card>
              </div>
            </div>
          </div>

          <div v-else class="d-flex align-items-center mt-3">
            <form
              @submit.prevent="submitGenralInformationsForm"
              class="post-text ml-3 w-100 row"
            >
              <div class="form-group">
                <label class="form-label" for="bookGeneralIdea"
                  >الفكرة العامة</label
                >
                <textarea
                  v-model="v$.generalInfromationsform.summary.$model"
                  rows="5"
                  placeholder="... اكتب فكرة عامة"
                  class="rounded form-control"
                  id="bookGeneralIdea"
                ></textarea>
                <small
                  style="color: red"
                  v-if="v$.generalInfromationsform.summary.$error"
                >
                  {{
                    summaryError
                      ? summaryError
                      : "    لطفًا قم بكتابة تلخيص عدد حروفه بين 350 و 1800"
                  }}
                </small>
              </div>
              <div class="form-group">
                <label class="form-label" for="bookGeneralQuestion"
                  >سؤال عام
                </label>
                <textarea
                  v-model="v$.generalInfromationsform.general_question.$model"
                  rows="5"
                  placeholder="... اكتب سؤالًا عاماً"
                  class="rounded form-control"
                  id="bookGeneralQuestion"
                ></textarea>
                <small
                  style="color: red"
                  v-if="v$.generalInfromationsform.general_question.$error"
                >
                  {{
                    generalQuestionError
                      ? generalQuestionError
                      : " قم بكتابة سؤال عام لا يزيد عدد حروفة عن 250"
                  }}
                </small>
              </div>

              <input
                type="submit"
                value="أضافة"
                href="javascript:void(0);"
                class="btn btn-primary d-block mt-3"
              />
            </form>
          </div>
        </tab-content-item>
        <!-- END GENERAL IDEA -->

        <!-- START QUESTIONS -->
        <tab-content-item
          :active="false"
          id="questions"
          aria-labelled-by="questions"
        >
          <h4>كيف اكتب سؤالًا معرفيا</h4>
          <hr />
          <div class="row">
            <div class="col-12">
              <p>
                بعد تحديدك للسؤال العام الذي يسعى الكاتب للإجابة عنه من خلال
                كتابه، فإنك لابد قد لاحظت وجود أسئلة فرعية داخل كل فصل من فصول
                الكتاب. هذه الأسئلة يجيب عنها الفصل المحدد، وحين تجتمع هذه
                الأسئلة بأجوبتها فإنها تقودك للإجابة على السؤال العام وصناعة
                المخلص العام للكتاب.
              </p>
            </div>
          </div>
          <div
            v-if="
              (questions.length < 12 && status == 'stage_two' && auditable) ||
              questions.length == 0
            "
            class="d-flex align-items-center mt-3"
          >
            <form
              @submit.prevent="submitQuestionForm"
              class="post-text ml-3 w-100 row"
            >
              <div class="form-group col-6">
                <select
                  v-model="v$.questionForm.starting_page.$model"
                  class="form-select"
                  data-trigger
                  name="choices-single-default"
                  id="choices-single-default"
                >
                  <option value="">اختر صفحة البداية</option>
                  <option
                    v-for="(i, index) in book.end_page"
                    :key="index"
                    :value="i"
                  >
                    {{ i }}
                  </option>
                </select>
                <small
                  style="color: red"
                  v-if="v$.questionForm.starting_page.$error"
                  >{{
                    pageError ? pageError : " الرجاء قم بادخال صفحة البداية"
                  }}</small
                >
              </div>
              <div class="form-group col-6">
                <select
                  class="form-select"
                  v-model="v$.questionForm.ending_page.$model"
                  data-trigger
                  name="choices-single-default"
                  id="choices-single-default"
                >
                  <option value="">اختر صفحة النهاية</option>
                  <option
                    v-for="(i, index) in book.end_page"
                    :key="index"
                    :value="i"
                  >
                    {{ i }}
                  </option>
                </select>
                <small
                  style="color: red"
                  v-if="v$.questionForm.ending_page.$error"
                  >{{
                    pageError ? pageError : " الرجاء قم بادخال صفحة النهاية"
                  }}</small
                >
              </div>

              <div class="form-group">
                <textarea
                  rows="5"
                  placeholder="... اكتب سؤالًا "
                  class="rounded form-control"
                  id="bookQuestion"
                  v-model="v$.questionForm.question.$model"
                ></textarea>
                <small
                  style="color: red"
                  v-if="v$.questionForm.question.$error"
                >
                  {{
                    questionError
                      ? questionError
                      : "        لطفًا قم بكتابة سؤال عدد حروفه بين 100 و 250"
                  }}
                </small>
              </div>
              <div>
                <h4>كيف أحدد الاقتباسات</h4>
                <hr />
                <div class="col-12">
                  <p>
                    يعتبر الاقتباس من المحسنات اللفظية، وهو حفظك للأقوال
                    المأثورة عن الشخصيات المعروفة وأقوالهم، وخلال الكتاب ستجد أن
                    هناك جمل مهمة جدا تلخص أفكارًا أساسية في الكتاب. قم بتحديد
                    أهم الاقتباسات داخل هذا الكتاب لتقوم بحفظها فهي تساعدك على
                    إجابة الأسئلة المعرفية وتعينك على الاستشهاد بها لإثبات وجهة
                    نظر الكاتب
                  </p>
                </div>
              </div>
              <div class="form-group">
                <textarea
                  rows="5"
                  placeholder="... اكتب اقتباسًا "
                  v-for="(v, index) in questionForm.quotes"
                  :key="index"
                  class="rounded form-control mt-2"
                  id="bookQuote"
                  v-model="v.text"
                >
                </textarea>
                <small
                  style="color: red"
                  v-if="v$.questionForm.question.$error"
                >
                  {{
                    quotesError
                      ? quotesError
                      : "قم بادخال اقتباس واحد على الاقل عدد حروفه لا يزيد عن 250"
                  }}
                </small>
                <hr />
                <a
                  class="btn btn-primary rounded-pill mb-3 me-1"
                  @click="addField(textarea, questionForm.quotes)"
                >
                  اضافة اقتباس
                </a>
                <a
                  class="btn btn-danger rounded-pill mb-3 me-1"
                  v-show="questionForm.quotes && questionForm.quotes.length > 1"
                  @click="removeField(index, questionForm.quotes)"
                >
                  حذف اقتباس
                </a>
              </div>
              <input
                type="submit"
                value="أضافة"
                href="javascript:void(0);"
                class="btn btn-primary d-block mt-3"
              />
            </form>
          </div>
          <hr />
          <div v-for="(question, index) in questions" :key="question.id">
            <ListQuestion
              :question="question"
              :index="index"
              :book="book"
              :user_book="user_book"
            />
          </div>
          <iq-card
            v-if="questions.length >= 5 && auditable && status != 'finished'"
          >
            <template v-slot:body>
              <button
                class="btn btn-primary d-block w-100"
                @click="reviewQuestions"
              >
                طلب تدقيق
              </button>
            </template>
          </iq-card>
        </tab-content-item>
        <!-- END QUESTIONS -->
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import ListQuestion from "@/components/EligibleComponents/Questions/ListQuestion.vue";
import { required, minLength, maxLength } from "@vuelidate/validators";
import generalInformationsServices from "@/API/EligibleServices/generalInformationsServices";
import questionServices from "@/API/EligibleServices/questionServices";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "Stage2",
  mounted() {
    this.getInformations();
    this.getQuestions();
  },
  components: {
    ListQuestion,
  },
  props: {
    book: {
      type: [Object],
      required: true,
    },
    status: {
      required: true,
    },
    user_book: {
      type: [Object],
      required: true,
    },
  },
  validations() {
    return {
      generalInfromationsform: {
        general_question: {
          required,
          validateText: this.validateGeneralQuestionText,
          minLength: minLength(100),
          maxLength: maxLength(250),
        },
        summary: {
          required,
          validate: this.validateGeneralSummaryText,
          minLength: minLength(350),
          maxLength: maxLength(1800),
        },
      },
      questionForm: {
        question: {
          required,
          validate: this.validateQuestionText,
          minLength: minLength(100),
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
          validate: this.validateQouteText,
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
  data() {
    return {
      auditable: false,
      pageError: "",
      questionError: "",
      quotesError: "",
      generalQuestionError: "",
      summaryError: "",
      questionForm: {
        question: "",
        starting_page: "",
        ending_page: "",
        user_book_id: this.user_book.id,
        quotes: [{ text: "" }],
      },
      generalInfromationsform: {
        general_question: "",
        summary: "",
        user_book_id: this.user_book.id,
      },
      generalInformations: [],
      questions: [],
      show: false,
    };
  },
  methods: {
    addField(value, fieldType) {
      fieldType.push({ text: "" });
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },
    validateGeneralSummaryText() {
      /* eslint-disable */ let pattern =
        /* eslint-disable */ /^[a-zA-Z\u0600-\u06FF,\(\)?:;'"!.\s\d][\s\d\a-zA-Z\u0600-\u06FF,\(\)?:;'"!.][a-zA-Z\u0600-\u06FF,\(\)?:;'"!.\s\d][\s\d\a-zA-Z\u0600-\u06FF,\(\)?:;'"!.]*$/i;
      let result = this.generalInfromationsform.summary.match(pattern) != null;
      console.log(result);
      if (!result) {
        this.summaryError = "يجب ان يكون الادخال حروفا  او ارقاما فقط";
      } else this.emojiError = "";
      return result;
    },
    validateGeneralQuestionText() {
      /* eslint-disable */ let pattern =
        /* eslint-disable */ /^[a-zA-Z\u0600-\u06FF,\(\)?:;'"!.\s\d][\s\d\a-zA-Z\u0600-\u06FF,\(\)?:;'"!.][a-zA-Z\u0600-\u06FF,\(\)?:;'"!.\s\d][\s\d\a-zA-Z\u0600-\u06FF,\(\)?:;'"!.]*$/i;
      let result =
        this.generalInfromationsform.general_question.match(pattern) != null;
      console.log(result);
      if (!result) {
        this.generalQuestionError = "يجب ان يكون الادخال حروفا  او ارقاما فقط";
      } else this.emojiError = "";
      return result;
    },
    validateQuestionText() {
      /* eslint-disable */ let pattern =
        /* eslint-disable */ /^[a-zA-Z\u0600-\u06FF,\(\)?:;'"!.\s\d][\s\d\a-zA-Z\u0600-\u06FF,\(\)?:;'"!.][a-zA-Z\u0600-\u06FF,\(\)?:;'"!.\s\d][\s\d\a-zA-Z\u0600-\u06FF,\(\)?:;'"!.]*$/i;
      let result = this.questionForm.question.match(pattern) != null;
      console.log(result);
      if (!result) {
        this.questionError = "يجب ان يكون الادخال حروفا  او ارقاما فقط";
      } else this.emojiError = "";
      return result;
    },
    validateQouteText() {
      /* eslint-disable */ let pattern =
        /* eslint-disable */ /^[a-zA-Z\u0600-\u06FF,\(\)?:;'"!.\s\d][\s\d\a-zA-Z\u0600-\u06FF,\(\)?:;'"!.][a-zA-Z\u0600-\u06FF,\(\)?:;'"!.\s\d][\s\d\a-zA-Z\u0600-\u06FF,\(\)?:;'"!.]*$/i;
      let result = this.questionForm.quotes.match(pattern) != null;
      console.log(result);
      if (!result) {
        this.quotes = "يجب ان يكون الادخال حروفا  او ارقاما فقط";
      } else this.emojiError = "";
      return result;
    },
    async submitGenralInformationsForm() {
      this.v$.$touch();
      if (!this.v$.generalInfromationsform.$invalid) {
        this.generalInformations =
          await generalInformationsServices.addGeneralInformations(
            this.generalInfromationsform
          );
        this.v$.generalInfromationsform.general_question.$reset();
        this.v$.generalInfromationsform.summary.$reset();
      }
    },
    async submitQuestionForm() {
      this.v$.$touch();

      if (!this.v$.questionForm.$invalid) {
        const question = await questionServices.addQuestion(this.questionForm);
        this.questionForm.question = "";
        this.questionForm.starting_page = "";
        this.questionForm.ending_page = "";
        this.questionForm.quotes = [{ text: "" }];
        this.v$.questionForm.$reset();
        this.questions.push(question);
      }
    },
    async getInformations() {
      this.generalInformations =
        await generalInformationsServices.getGeneralInformations(
          this.user_book.id
        );
    },
    async getQuestions() {
      this.questions = await questionServices.getQuestions(this.user_book.id);
      this.auditable = this.questions.some((element) => {
        if (element.status === "rejected" || element.status === null) {
          return true;
        }
        return false;
      });
    },
    deleteGeneralInformation(id) {
      this.show = !this.show;
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
          text: "موافقتك تعني حذف هذا السؤال ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم قم بالحذف",
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
            generalInformationsServices
              .deleteGeneralInformation(id)
              .then((response) => {
                swalWithBootstrapButtons.fire({
                  title: "تم الحذف",
                  text: "تم حذف السؤال",
                  icon: "success",
                  showClass: {
                    popup: "animate__animated animate__zoomIn",
                  },
                  hideClass: {
                    popup: "animate__animated animate__zoomOut",
                  },
                });
                location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
    updateGeneralInformation(id) {
      this.show = !this.show;
      this.$router.push({ path: `/general/update/${id}` });
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
          text: "في حال طلبك للتدقيق لن يمكنك اضافة سؤال جديد أو التعديل على الأسئلة التي كتبتها ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم قم بطلب تدقيق",
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
                  text: "تم ارسال طلبك للتدقيق",
                  icon: "success",
                  showClass: {
                    popup: "animate__animated animate__zoomIn",
                  },
                  hideClass: {
                    popup: "animate__animated animate__zoomOut",
                  },
                });
                this.auditable = false;
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
    async reviewGeneralInformation() {
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
          text: "في حال طلبك للتدقيق لن يمكنك اضافة سؤال جديد أو التعديل على التلخيص الذي كتبته ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم قم بطلب تدقيق",
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
            generalInformationsServices
              .reviewGeneralInformation(this.user_book.id)
              .then((response) => {
                swalWithBootstrapButtons.fire({
                  title: "تم الارسال",
                  text: "تم ارسال طلبك للتدقيق",
                  icon: "success",
                  showClass: {
                    popup: "animate__animated animate__zoomIn",
                  },
                  hideClass: {
                    popup: "animate__animated animate__zoomOut",
                  },
                });
                location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
  },
};
</script>
