<template>
  <form @submit.prevent="submit">
    <div class="d-flex align-items-center w-100 row">
      <small
        class="mb-2"
        style="color: red"
        v-if="isRamadanBook || isTafseerBook"
      >
        * الورد الرمضاني مخفف لتقليل التعقيد والتركيز على العبادات
      </small>
      <!-- نوع الأطروحة -->
      <ThesisType
        @changeTypeOfThesis="changeTypeOfThesis"
        :book="book"
        v-model="v$.thesisForm.typeOfThesis.$model"
      />

      <!-- الصفحات -->
      <ThesisPages
        v-if="showPages"
        :book="book"
        :thesisToEdit="thesisToEdit"
        :lastThesis="lastThesis"
        v-model:startPage="v$.thesisForm.start_page.$model"
        v-model:endPage="v$.thesisForm.end_page.$model"
      />

      <!-- الأطروحة -->
      <ThesisBody v-if="thesis" v-model="v$.thesisForm.body.$model" />

      <!-- الاقتباسات -->
      <ThesisScreenshots
        v-if="screenshots"
        :thesisForm="thesisForm"
        @updateThesisFormByKey="updateThesisFormByKey"
      />

      <hr />

      <!--Success and error messages-->
      <small class="text-danger text-center" v-if="errorMessage">
        {{ errorMessage }}
      </small>
      <small
        class="text-danger text-center"
        v-if="mediaNoteText && thesisToEdit"
      >
        {{ mediaNoteText }}
      </small>
      <div class="col-sm-12 text-center" v-if="loader">
        <img
          :src="require('@/assets/images/gif/page-load-loader.gif')"
          alt="loader"
          style="height: 100px"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary d-block mt-3"
        v-else
        :disabled="v$.thesisForm.$invalid"
      >
        إضافة
      </button>
    </div>
  </form>
</template>
<script>
import { computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import commentService from "@/API/services/comment.service";
import helper from "@/utilities/helper";
import ThesisType from "@/components/book/theses/create/ThesisType.vue";
import ThesisPages from "@/components/book/theses/create/ThesisPages.vue";
import ThesisBody from "@/components/book/theses/create/ThesisBody.vue";
import ThesisScreenshots from "@/components/book/theses/create/ThesisScreenshots.vue";

export default {
  name: "CreateThesis",
  components: {
    ThesisType,
    ThesisPages,
    ThesisBody,
    ThesisScreenshots,
  },
  provide() {
    return {
      v$: computed(() => this.v$),
    };
  },
  props: {
    book: {
      type: Object,
      default: null,
    },
    lastThesis: {
      type: Object,
      default: null,
    },
    thesisToEdit: {
      type: Object,
      default: null,
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      thesis: false,
      screenshots: false,
      showPages: false,
      loader: false,
      thesisForm: {
        typeOfThesis: "",
        start_page: "",
        end_page: "",
        body: "",
        screenShots: [],
        type: "thesis",
        book_id: null,
        u_comment_id: null,
        pagesCount: 0,
      },
      mediaNoteText: "",
      errorMessage: "",
      filesLimitError: "",
    };
  },
  computed: {
    numberOfPages() {
      return this.thesisForm.end_page - this.thesisForm.start_page + 1;
    },
    successMessage() {
      return this.thesisToEdit
        ? "تم تعديل الأطروحة بنجاح"
        : "تم إضافة الأطروحة بنجاح";
    },
    isRamadanBook() {
      return this.book?.type?.type === "ramadan";
    },
    isTafseerBook() {
      return this.book?.type?.type === "tafseer";
    },
  },
  watch: {
    book() {
      this.thesisForm.book_id = this.book.id;
    },
    //update pagesCount when the start and end pages change
    thesisForm: {
      deep: true,
      handler() {
        this.thesisForm.pagesCount = this.numberOfPages;
      },
    },
  },
  created() {
    if (this.thesisToEdit) {
      this.loadThesisToEdit();
    } else {
      this.thesisForm.book_id = this.book?.id;
    }
  },
  methods: {
    showAddThesis() {
      this.thesis = true;
      this.screenshots = false;
    },
    showAddScreenshots() {
      this.screenshots = true;
      this.thesis = false;
    },
    noThesisAndScreenshots() {
      this.thesis = false;
      this.screenshots = false;
    },
    thesisAndScreenshots() {
      this.thesis = true;
      this.screenshots = true;
    },
    changeTypeOfThesis(type) {
      this.showPages = true;
      if (type == "read") {
        this.noThesisAndScreenshots();
      } else if (type == "readAndWrite") {
        this.showAddThesis();
      } else if (type == "screenshots") {
        this.showAddScreenshots();
      } else if (type == "screenshotsAndWrite") {
        this.thesisAndScreenshots();
      } else {
        this.showPages = false;
        this.noThesisAndScreenshots();
      }
    },
    async submit() {
      const result = await this.v$.$validate();
      if (result) {
        this.loader = true;
        try {
          this.updateThesisForm();

          let response;

          if (this.thesisToEdit) {
            response = await commentService.update(this.thesisForm);
          } else {
            response = await commentService.create(this.thesisForm);
          }

          if (response.statusCode !== 200) {
            throw response.data;
          }

          helper.toggleToast(this.successMessage, "success");

          if (!this.thesisToEdit) {
            this.$emit("addThesis", response.data);
            //reset form
            this.thesisForm = {
              ...this.thesisForm,
              typeOfThesis: "",
              start_page: "",
              end_page: "",
              body: "",
              screenShots: [],
              pagesCount: 0,
            };

            this.v$.thesisForm.$reset();
            this.changeTypeOfThesis("");

            //timer to close the modal
            setTimeout(() => {
              this.$emit("closeModel");
            }, 2000);
          } else {
            setTimeout(() => {
              location.reload();
            }, 1800);
          }
        } catch (error) {
          helper.toggleErrorToast();
          console.log(error);
        } finally {
          this.loader = false;
        }
      } else {
        this.errorMessage = "الرجاء ادخال جميع البيانات المطلوبة";
      }
    },
    updateThesisForm() {
      if (this.thesisForm.typeOfThesis == "read") {
        this.thesisForm.body = null;
        this.thesisForm.screenShots = [];
      } else if (this.thesisForm.typeOfThesis == "readAndWrite") {
        this.thesisForm.screenShots = [];
      } else if (this.thesisForm.typeOfThesis == "screenshots") {
        this.thesisForm.body = null;
      }
    },
    checkThesisHasMedia(thesis) {
      let media = 0;

      if (thesis.media) {
        media++;
      }

      if (thesis.replies?.length) {
        thesis.replies.forEach((item) => {
          if (item.type === "screenshot" && item.media) {
            media++;
          }
        });
      }

      return media;
    },
    loadThesisToEdit() {
      this.thesisForm.u_comment_id = parseInt(this.thesisToEdit.id);
      this.thesisForm.body = this.thesisToEdit.body
        ? this.thesisToEdit.body
        : "";
      this.thesisForm.start_page = this.thesisToEdit.thesis.start_page;
      this.thesisForm.end_page = this.thesisToEdit.thesis.end_page;
      this.thesisForm.screenShots.old = this.thesisToEdit.media ?? [];
      this.showPages = true;

      //check the type of the thesis
      if (
        (!this.thesisToEdit.body &&
          this.checkThesisHasMedia(this.thesisToEdit) === 0) ||
        (!this.thesisToEdit.body &&
          this.checkThesisHasMedia(this.thesisToEdit) > 0)
      ) {
        this.thesisForm.typeOfThesis = "read";
      } else if (
        (this.thesisToEdit.body &&
          this.checkThesisHasMedia(this.thesisToEdit) === 0) ||
        (this.thesisToEdit.body &&
          this.checkThesisHasMedia(this.thesisToEdit) > 0)
      ) {
        this.thesisForm.typeOfThesis = "readAndWrite";
      }

      this.changeTypeOfThesis(this.thesisForm.typeOfThesis);

      const mediaCount = this.checkThesisHasMedia(this.thesisToEdit);
      this.mediaNoteText =
        mediaCount > 0
          ? `ملاحظة: سيتم حذف الصور الموجودين بعد تعديل الأطروحة وعددهم: ${mediaCount}`
          : "";
    },
    updateThesisFormByKey({ key, value }) {
      this.thesisForm[key] = value;
    },
    test() {
      console.log(this.book);
    },
  },
  validations() {
    return {
      thesisForm: {
        typeOfThesis: {
          required,
        },
        start_page: {
          required,
          between: (value) =>
            parseInt(value) < parseInt(this.thesisForm.end_page),
        },
        end_page: {
          required,
          between: (value) =>
            parseInt(value) > parseInt(this.thesisForm.start_page),
        },
        body: {
          requiredIf: requiredIf(
            () =>
              this.thesisForm.typeOfThesis == "readAndWrite" ||
              this.thesisForm.typeOfThesis == "screenshotsAndWrite",
          ),
          between: (value) => {
            //check if requiredIf is valid
            if (
              (this.thesisForm.typeOfThesis == "readAndWrite" ||
                this.thesisForm.typeOfThesis == "screenshotsAndWrite") &&
              (this.isRamadanBook || this.isTafseerBook)
            ) {
              return value.length >= 400;
            }
            return true;
          },
        },
        screenShots: {
          requiredIf: requiredIf(
            () =>
              this.thesisForm.typeOfThesis == "screenshots" ||
              this.thesisForm.typeOfThesis == "screenshotsAndWrite",
          ),
        },
        pagesCount: {
          requiredIf: requiredIf(
            () =>
              this.thesisForm.typeOfThesis == "readAndWrite" ||
              this.thesisForm.typeOfThesis == "screenshotsAndWrite",
          ),
          between: (value) => {
            if (this.isRamadanBook) {
              return parseInt(value) >= 10;
            } else if (this.isTafseerBook) {
              return parseInt(value) >= 2;
            } else {
              return parseInt(value) >= 3;
            }
          },
        },
      },
    };
  },
};
</script>
<style scoped>
.text-danger {
  color: #c50714 !important;
}
</style>
