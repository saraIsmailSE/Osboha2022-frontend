<template>
  <form @submit.prevent="submit">
    <div class="d-flex align-items-center w-100 row">
      <!-- نوع الأطروحة -->
      <div class="row">
        <div class="form-group">
          <h5 class="form-label">نوع الأطروحة</h5>
        </div>
        <div class="form-group">
          <select class="form-select w-100" name="type_of_thesis" id="type_of_thesis"
            v-model="v$.thesisForm.typeOfThesis.$model" v-on:change="
              changeTypeOfThesis(
                $event.target.options[$event.target.options.selectedIndex]
                  .value,
              )
              ">
            <option value="">اختر نوع الأطروحة</option>
            <option value="read">قراءة</option>
            <option value="readAndWrite">كتابة أطروحة</option>
            <option value="screenshots" :disabled="screenshotsDisabled">
              اقتباسات
              <span v-if="screenshotsDisabled">
                -
                <small> (مغلق اليوم) </small>
              </span>
            </option>
            <option value="screenshotsAndWrite" :disabled="screenshotsDisabled">
              كتابة واقتباسات
              <span v-if="screenshotsDisabled">
                -
                <small> (مغلق اليوم) </small>
              </span>
            </option>
          </select>
        </div>
      </div>
      <!-- الصفحات -->
      <div class="row mt-2" v-if="showPages">
        <div class="form-group">
          <h5 class="form-label" :class="{ 'text-primary': pages.length === 0 && !startOver }">
            {{
              pages.length === 0 && !startOver ? "لقد أنهيت الكتاب" : "الصفحات"
            }}
          </h5>
        </div>
      </div>
      <div class="row" v-if="showPages">
        <button class="btn btn-primary me-2 d-flex align-content-center justify-content-center"
          @click.prevent="startBookOver" v-if="pages.length === 0 && !startOver">
          <span class="material-symbols-outlined md-18"> refresh </span>
          إعادة قراءة الكتاب
        </button>

        <template v-else>
          <small style="color: red" v-if="numberOfPages < 3">* الحد الأدنى 3 صفحات</small>

          <div class="form-group col-6">
            <select class="form-select" data-trigger name="start_page" id="start_page"
              v-model="v$.thesisForm.start_page.$model">
              <option value="">صفحة البداية</option>
              <option v-for="page in pages" :value="page" :key="page">
                {{ page }}
              </option>
            </select>

            <div class="help-block" v-if="v$.thesisForm.start_page.$error">
              <small style="color: red" v-if="v$.thesisForm.start_page.required.$invalid">الرجاء اختيار صفحة
                البداية</small>
              <small style="color: red" v-if="!v$.thesisForm.start_page.required.$invalid &&
                v$.thesisForm.start_page.between.$invalid
                ">البداية يجب ان تكون اقل من النهاية</small>
            </div>
          </div>
          <div class="form-group col-6">
            <select class="form-select" data-trigger name="end_page" id="end_page"
              v-model="v$.thesisForm.end_page.$model">
              <option value="">صفحة النهاية</option>
              <option v-for="page in bookPagesEnd" :value="page" :key="page">
                {{ page }}
              </option>
            </select>
            <div class="help-block" v-if="v$.thesisForm.end_page.$error">
              <small style="color: red" v-if="v$.thesisForm.end_page.required.$invalid">الرجاء اختيار صفحة النهاية</small>
              <small style="color: red" v-if="!v$.thesisForm.end_page.required.$invalid &&
                v$.thesisForm.end_page.between.$invalid
                ">النهاية يجب ان تكون اكبر من البداية</small>
            </div>
          </div>
        </template>
      </div>
      <div class="form-group" v-if="thesis">
        <label class="form-label" for="thesisBody">الأطروحة</label>
        <textarea rows="5" placeholder="... اكتب أطروحتك" class="rounded form-control" id="thesisBody" name="thesisBody"
          v-model.trim="v$.thesisForm.body.$model" style="direction: rtl"></textarea>
        <p style="direction: rtl">
          <span> {{ v$.thesisForm.body.$model.length }}/400 حرف</span>
          <span> - </span>
          <span style="color: red" class="text-center" v-if="v$.thesisForm.body.$model.length < 400">أطروحة غير شاملة
            <span class="material-symbols-outlined font-small">error</span>
          </span>
          <span style="color: green" v-else>أطروحة شاملة
            <span class="material-symbols-outlined font-small">check_circle</span>
          </span>
        </p>
        <div class="help-block" v-if="v$.thesisForm.body.$error">
          <small style="color: red" v-if="v$.thesisForm.body.requiredIf.$invalid">الرجاء ادخال الأطروحة</small>
        </div>
      </div>

      <div class="form-group" v-if="screenshots">
        <label class="form-label" for="customFile"> اضافة اقتباس</label>
        <input class="form-control" type="file" id="customFile" multiple
          accept="image/jpeg, image/png, image/jpg, image/gif, image/svg" ref="screenShots" @change="previewImages" />
        <div class="help-block" v-if="v$.thesisForm.screenShots.$error">
          <small style="color: red" v-if="v$.thesisForm.screenShots.requiredIf.$invalid">الرجاء ادخال اقتباس واحد على
            الاقل</small>
        </div>
        <div class="help-block" v-if="filesLimitError">
          <small style="color: red">{{ filesLimitError }}</small>
        </div>
        <ImagePreviewer v-if="thesisForm.screenShots.length" :media="thesisForm.screenShots" @remove-media="removeImage"
          ref="imagePreviewer" />
        <small  class="text-center mt-2 text-danger"> ⚠️ إن الاقتباسات المصورة لا يتم الاحتفاظ بها على المنصة. لأجل ذلك نحثك
          على كتابة الأطروحة أو التلخيص لتحفظ أفكارك التي انتفعت بها من الكتاب.</small>

      </div>
      <hr />
      <!--Success and error messages-->

      <small class="text-danger text-center" v-if="errorMessage">
        {{ errorMessage }}
      </small>
      <small class="text-danger text-center" v-if="mediaNoteText && thesisToEdit">
        {{ mediaNoteText }}
      </small>
      <div class="col-sm-12 text-center" v-if="loader">
        <img :src="require('@/assets/images/page-img/page-load-loader.gif')" alt="loader" style="height: 100px" />
      </div>
      <button type="submit" class="btn btn-primary d-block mt-3" v-if="!loader" :disabled="v$.thesisForm.$invalid">
        إضافة
      </button>
    </div>
  </form>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, requiredIf, maxLength } from "@vuelidate/validators";
import commentService from "@/API/services/comment.service";
import ImagePreviewer from "@/components/media/ImagePreviewer.vue";
import helper from "@/utilities/helper";

export default {
  name: "CreateThesis",
  components: {
    ImagePreviewer,
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
      startOver: false,
      thesisForm: {
        typeOfThesis: "",
        start_page: "",
        end_page: "",
        body: "",
        screenShots: [],
        type: "thesis",
        book_id: null,
        u_comment_id: null,
      },
      mediaNoteText: "",
      errorMessage: "",
      filesLimitError: "",
      screenshotsDisabled: false,
      currentTime: new Date(),
      timer: null,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

    this.informUserAboutClosingScreenShots();
  },
  beforeUnmount() {
    clearInterval(this.timer);
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
    pages() {
      let allPages = [];
      let start = null;

      //if user has a book in progress, start pages from the last thesis end page and add 1 to it
      if (
        this.book.userBooks.length &&
        this.book.userBooks[0].status === "in progress"
      ) {
        start = this.lastThesis
          ? this.lastThesis?.end_page + 1
          : this.book.start_page;
      }
      //if user has no book/ or the book is in the favorites shelf, so this is the first thesis, start pages from the book start page
      else if (
        (!this.book.userBooks.length && !this.lastThesis) ||
        (this.book.userBooks.length &&
          this.book.userBooks[0].status === "later")
      ) {
        start = this.book.start_page;
      }

      //if user is editting the thesis, start pages from the book start page
      if (this.thesisToEdit) {
        start = this.book.start_page;
      }

      //if start null, it means the user has finished the book

      //if start over button is not clicked, return empty array
      if (start === null && !this.startOver) {
        return [];
      }

      //if start over button is clicked, start pages from the book start page
      if (start === null && this.startOver) {
        start = this.book.start_page;
      }
      //add all pages to the array from the start page to the book end page
      for (let i = start; i <= this.book.end_page; i++) {
        allPages.push(i);
      }
      return allPages;
    },
    bookPagesEnd() {
      return this.pages.filter((page) => page > this.thesisForm.start_page);
    },
    isTimeValid() {
      //disable screenshots on saturday after 09:00 pm Asia/Riyadh
      const convertedDate = helper.convertTZ(this.currentTime, "Asia/Riyadh");
      const day = convertedDate.getDay();
      const hour = convertedDate.getHours();
      const minutes = convertedDate.getMinutes();

      if (
        day === 6 &&
        hour >= 21
        // &&
        // (hour < 14 || (hour === 14 && minutes <= 59))
      ) {
        return true;
      }
      return false;
    },
  },
  watch: {
    book() {
      this.thesisForm.book_id = this.book.id;
    },
    // currentTime() {
    //   if (this.isTimeValid) {
    //     this.screenshotsDisabled = true;
    //   } else {
    //     this.screenshotsDisabled = false;
    //   }
    // },
    // screenshotsDisabled() {
    //   if (this.screenshotsDisabled) {
    //     this.screenshots = false;
    //     this.thesisForm.screenShots = [];
    //     this.informUserAboutClosingScreenShots();
    //   }
    // },
  },
  created() {
    if (this.thesisToEdit) {
      this.thesisForm.u_comment_id = parseInt(this.thesisToEdit.id);
      this.thesisForm.body = this.thesisToEdit.body
        ? this.thesisToEdit.body
        : "";
      this.thesisForm.start_page = this.thesisToEdit.thesis.start_page;
      this.thesisForm.end_page = this.thesisToEdit.thesis.end_page;
      this.thesisForm.screenShots.old = this.thesisToEdit.media ?? [];
      this.showPages = true;

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
    previewImages(event) {
      const { files } = event.target;

      if (files.length > 5) {
        this.filesLimitError = "لا يمكنك رفع أكثر من 5 اقتباسات";
        return;
      }
      this.filesLimitError = "";
      this.thesisForm.screenShots = files;
    },
    removeImage(index) {
      const files = [...this.thesisForm.screenShots];
      files.splice(index, 1);
      this.thesisForm.screenShots = files;

      if (this.thesisForm.screenShots.length == 0) {
        this.$refs.screenShots.value = null;
      }
    },
    async submit() {
      this.v$.$touch();
      if (!this.v$.thesisForm.$invalid && this.numberOfPages >= 3) {
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
    startBookOver() {
      this.startOver = true;
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

    informUserAboutClosingScreenShots() {
      if (this.isTimeValid) {
        if (!this.$cookies.get("show-closing-screenshots-alert")) {
          const swal = this.$swal.mixin({
            customClass: {
              confirmButton: "btn btn-primary btn-lg",
            },
            buttonsStyling: false,
          });

          let html =
            "<p class='text-center'>بسبب كثرة القراء الذين يدخلون تصويت القراءة الآن</p>";
          html +=
            "<p class='text-center'>لا يتحمل السيرفر <b class='text-danger'>تحميل الصور</b></p>";
          html +=
            "<p class='text-center'>فضلا ادخل أطروحتك أو اقتباساتك بشكل <b>مكتوب</b></p>";
          html +=
            "<p class='text-center'>يتاح رفع الصور <span class='text-primary'><b>من الأحد إلى الساعة التاسعة من يوم السبت</b></span> أسبوعياً</p>";

          swal
            .fire({
              title: "لا يمكنك وضع اقتباسات مؤقتًا",
              html,
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
            .then((result) => {
              if (result.isConfirmed) {
                this.$cookies.set("show-closing-screenshots-alert", true, "1d");
              }
            });
        }
      }
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
        },
        screenShots: {
          requiredIf: requiredIf(
            () =>
              this.thesisForm.typeOfThesis == "screenshots" ||
              this.thesisForm.typeOfThesis == "screenshotsAndWrite",
          ),
        },
      },
    };
  },
};
</script>
<style scoped>
.font-small {
  font-size: 0.8rem;
}

.text-danger {
  color: #c50714 !important;
}
</style>
