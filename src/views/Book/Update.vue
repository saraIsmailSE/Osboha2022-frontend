<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto">
        <h1 class="text-center mt-3 mb-3">تعديل كتاب</h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center mt-3">
          <img :src="currentMedia.path" class="img-fluid rounded w-25" alt="blog-img" v-if="currentMedia" />
          <img v-else class="img-fluid rounded w-75" src="@/assets/images/main/reading_list.png" alt="add-group" />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <h3 class="text-center mb-3">{{ bookForm.name }}</h3>
        <div class="sign-in-from" v-if="is_active">
          <form class="mt-2" @submit.prevent="onSubmit()">
            <!-- Name -->
            <div class="form-group">
              <label for="bookName">اسم الكتاب</label>
              <input type="text" v-model="v$.bookForm.name.$model" class="form-control mb-0" id="bookName"
                placeholder=" اسم الكتاب" />
              <small style="color: red" v-if="v$.bookForm.name.$error">
                اسم الكتاب مطلوب</small>
            </div>

            <!-- Brief -->
            <div class="form-group">
              <label for="bookDescription">وصف الكتاب</label>
              <textarea type="text" v-model="v$.bookForm.brief.$model" class="form-control mb-0" id="bookDescription"
                placeholder="وصف الكتاب " :style="{
                  'padding-right': '1rem !important',
                }" style="
                  direction: rtl;
                  max-height: 120px;
                  resize: none;
                  overflow: auto;
                " :rows="1" ref="bodyRef" />
              <small style="color: red" v-if="v$.bookForm.brief.$error">وصف الكتاب مطلوب</small>
            </div>

            <!-- Writer -->
            <div class="form-group">
              <label for="bookAuther">الكاتب</label>
              <input type="text" v-model="v$.bookForm.writer.$model" class="form-control mb-0" id="bookAuther"
                placeholder="اسم الكاتب " />
              <small style="color: red" v-if="v$.bookForm.writer.$error">اسم الكاتب مطلوب</small>
            </div>

            <!-- Publisher -->
            <div class="form-group">
              <label for="bookPublisher">دار النشر</label>
              <input type="text" v-model="v$.bookForm.publisher.$model" class="form-control mb-0" id="bookPublisher"
                placeholder="دار النشر " />
              <small style="color: red" v-if="v$.bookForm.publisher.$error">دار النشر مطلوبة</small>
            </div>

            <div class="form-group">
              <label for="bookLink">رابط الكتاب</label>
              <input type="text" v-model="v$.bookForm.link.$model" class="form-control mb-0" id="bookLink"
                placeholder="رابط الكتاب " />
              <small style="color: red" v-if="v$.bookForm.link.$error">رابط الكتاب مطلوب</small>
            </div>

            <!-- Start Page -->
            <div class="form-group">
              <label for="bookStartPage">صفحة البداية</label>
              <input type="text" v-model="v$.bookForm.start_page.$model" class="form-control mb-0" id="bookStartPage"
                placeholder="صفحة البداية " />
              <small style="color: red" v-if="v$.bookForm.start_page.$error">صفحة البداية مطلوبة</small>
            </div>

            <!-- End Page -->
            <div class="form-group">
              <label for="bookEndPage">صفحة النهاية</label>
              <input type="number" v-model="v$.bookForm.end_page.$model" class="form-control mb-0" id="bookEndPage"
                placeholder="صفحة النهاية " />
              <small style="color: red" v-if="v$.bookForm.end_page.$error">صفحة النهاية مطلوبة</small>
            </div>

            <!-- Book Type -->
            <div class="form-group">
              <label for="bookType">نوع الكتاب</label>
              <select v-model="v$.bookForm.type_id.$model" class="form-select" data-trigger
                name="choices-single-default" id="choices-single-default" :disabled="!shouldfFill">
                <option value="0" selected>اختر نوع الكتاب</option>
                <option v-for="(type, index) in types" :key="index" :value="type.id">
                  {{ BOOK_TYPES[type.type] }}
                </option>
              </select>
              <small style="color: red" v-if="v$.bookForm.type_id.$error">نوع الكتاب مطلوب</small>
            </div>

            <!-- Book Level -->
            <div class="form-group">
              <label for="bookLevel">مستوى الكتاب</label>
              <select v-model="v$.bookForm.level_id.$model" class="form-select" data-trigger
                name="choices-single-default" id="choices-single-default">
                <option value="0" selected>اختر مستوى الكتاب</option>
                <option v-for="(level, index) in bookLevels" :key="index" :value="level.id">
                  {{ level.arabic_level }}
                </option>
              </select>
              <small style="color: red" v-if="v$.bookForm.level_id.$error">مستوى الكتاب مطلوب</small>
            </div>

            <!-- Book Section -->
            <div class="form-group col-12">
              <h4>قسم الكتاب</h4>
              <select class="form-select mt-2" data-trigger name="section" id="section"
                v-model="v$.bookForm.section_id.$model">
                <option value="" selected>اختر قسم الكتاب</option>
                <option v-for="section in sections" :key="section.id" :value="section.id">
                  {{ section.section }}
                </option>
              </select>
              <small style="color: red" v-if="v$.bookForm.section_id.$error">قسم الكتاب مطلوب</small>
            </div>

            <!-- Book Language -->
            <div class="form-group col-12">
              <h4>لغة الكتاب</h4>
              <select class="form-select mt-2" data-trigger name="section" id="section"
                v-model="v$.bookForm.language_id.$model">
                <option value="0" selected>اختر لغة الكتاب</option>
                <option v-for="language in languages" :key="language.id" :value="language.id">
                  {{ LANUAGES[language.language] }}
                </option>
              </select>
            </div>

            <!-- Book Media -->
            <div class="form-group col-12">
              <h4>صورة الكتاب</h4>
              <input class="form-control mt-2" type="file" name="book_media" id="book_media" ref="book_media"
                accept="image/*" @change="uploadFile" />
            </div>

            <p class="text-center my-2" style="color: red" v-if="message">
              {{ message }}
            </p>
            <router-link class="mb-3 text-center d-block w-100" :to="{
              name: 'book.book-details',
              params: { book_id: this.$route.params.book_id },
            }">
              عرض الكتاب
              <span class="align-middle material-symbols-outlined">
                keyboard_return
              </span>
            </router-link>
            <div class="col-sm-12 text-center" v-if="loading">
              <p class="text-center">جاري التعديل</p>
              <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
            </div>
            <div class="d-inline-block w-100" v-else>
              <button type="submit" class="btn btn-primary float-end" :disabled="loading">
                تعديل
              </button>
            </div>
            <hr />
            <div class="border border-danger w-100 mt-2 mb-3 text-center p-3"
              v-if="isTeamCoordinator && is_active && type != 'free'">
              <p class="text-center" v-if="removeMsg">{{ removeMsg }}</p>
              <button type="button" class="btn btn-danger w-75" :disabled="removeMsg" @click="removeBook()">
                سحب من المنهج
              </button>
            </div>
          </form>
        </div>
        <div class="border border-danger w-75 m-auto mt-2 mb-3 text-center p-2" v-else>
          <h1 class="bg-danger text-center p-3 text-white">هذا الكتاب تم حذفه من المنهج</h1>
        </div>
      </div>
    </iq-card>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, requiredIf, minLength, maxLength } from "@vuelidate/validators";
import bookService from "@/API/services/book.service";
import bookType from "@/API/services/book-type.service";
import languages from "@/API/services/language.service";
import bookLevel from "@/API/services/book-level.service";
import sections from "@/API/services/sectionService";
import { LANUAGES, BOOK_TYPES } from "@/utilities/constants";
import UserInfoService from "@/Services/userInfoService";
import helper from "@/utilities/helper";

const greaterThanZero = (value) => value > 0;

export default {
  name: "Update Book",
  setup() {
    return { v$: useVuelidate() };
  },

  async created() {
    this.setBook();
    this.bookLevels = await bookLevel.getAll();
    this.sections = await sections.getAll();
    this.sections = this.sections.data;
    this.languages = await languages.getAll();
    this.types = await bookType.getAllBookTypes();
  },
  watch: {
    bookBrief() {
      if (this.$refs.bodyRef.style.height) {
        this.$refs.bodyRef.style.height = "auto";
        this.$nextTick(() => {
          this.$refs.bodyRef.style.height =
            this.$refs.bodyRef.scrollHeight + "px";
        });
      }
    },
  },
  computed: {
    shouldfFill() {
      return (this.isAdmin || this.inBooksTeam)
    },
    bookBrief() {
      return this.bookForm.brief;
    },
    user() {
      return this.$store.getters.getUser;
    },
    inBooksTeam() {
      return UserInfoService.hasRoles(this.user, [
        'book_quality_team_coordinator',
        'book_quality_team',
      ]);
    },
    isTeamCoordinator() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        'book_quality_team_coordinator',
      ]);
    },
    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
    },
  },

  data() {
    return {
      types: [],
      bookLevels: [],
      sections: [],
      languages: [],
      LANUAGES,
      BOOK_TYPES,
      bookForm: {
        book_id: this.$route.params.book_id,
        book_media: null,
        name: "",
        writer: "",
        publisher: "",
        brief: "",
        link: "",
        start_page: 0,
        end_page: 0,
        section_id: 0,
        level_id: 0,
        type_id: 0,
        language_id: 0,
      },
      message: "",
      loading: false,
      currentMedia: null,
      is_active: 1,
      type: '',
    };
  },

  validations() {
    return {
      removeMsg: '',
      bookForm: {
        name: {
          required,
        },
        writer: {
          required: requiredIf(function () {
            if (this.shouldfFill)
              return true;
            else
              return false;
          }),
        },
        publisher: {
          required: requiredIf(function () {
            if (this.shouldfFill)
              return true;
            else
              return false;
          }),
        },
        brief: {
          required: requiredIf(function () {
            if (this.shouldfFill)
              return true;
            else
              return false;
          }),
        },
        link: {
          required: requiredIf(function () {
            if (this.shouldfFill)
              return true;
            else
              return false;
          }),
        },
        start_page: {
          required,
          maxValue: greaterThanZero,
        },
        end_page: {
          required,
          maxValue: greaterThanZero,
        },
        type_id: {
          required: requiredIf(function () {
            if (this.shouldfFill)
              return true;
            else
              return false;
          }),
          maxValue: this.selectItem,
        },
        level_id: {
          required: requiredIf(function () {
            if (this.shouldfFill)
              return true;
            else
              return false;
          }),
          maxValue: this.selectItem,
        },
        language_id: {
          required: requiredIf(function () {
            if (this.shouldfFill)
              return true;
            else
              return false;
          }),
          maxValue: this.selectItem,
        },
        section_id: {
          required: requiredIf(function () {
            if (this.shouldfFill)
              return true;
            else
              return false;
          }),
          maxValue: this.selectItem,
        },
      },
    };
  },
  methods: {
    removeBook() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-primary btn-lg ms-2",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "ملاحظة هامة",
          text: "حذف الكتاب من المنهج لا يعني حذفه بالكامل من المنصة، وإنما يعني أن السفراء ليس لديهم صلاحيات لكتابة أطروحاتهم وقراءته.  فيما يخص السفراء الذين يقرأون الكتاب حاليًا، سيكون بإمكانهم متابعة القراءة دون أي مشاكل.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "سحب من المنهج",
          cancelButtonText: "إلغاء",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.removeMsg = await bookService.removeBookFromOsboha(this.$route.params.book_id);
            helper.toggleToast(
              "تم سحب الكتاب من المنهج ... سيتم تحويلك إلى صفحة الكتب",
              "success",
            );
            setTimeout(() => {
              this.$router.push({ name: "osboha.book" });
            }, 3000);
          }
        });
    },
    selectItem(value) {
      if (this.isAdmin || this.inBooksTeam) {
        return value > 0;
      }
      else {
        return true;
      }
    },
    async setBook() {
      const book = await bookService.showBasicInfo(this.$route.params.book_id);
      if (book) {
        this.bookForm.name = book.book.name;
        this.bookForm.writer = book.book.writer;
        this.bookForm.publisher = book.book.publisher;
        this.bookForm.brief = book.book.brief;
        this.bookForm.link = book.book.link;
        this.bookForm.start_page = book.book.start_page;
        this.bookForm.end_page = book.book.end_page;
        this.bookForm.level_id = book.book.level.id;
        this.bookForm.language_id = book.book.language.id;
        this.bookForm.section_id = book.book.section.id;
        this.bookForm.type_id = book.book.type.id;
        this.currentMedia = book.book.media;
        this.is_active = book.book.is_active;
        this.type = book.book.type.type
      }
    },
    uploadFile(event) {
      this.bookForm.book_media = event.target.files[0];
    },

    async onSubmit() {
      this.v$.$touch();
      if (!this.v$.bookForm.$invalid) {
        this.loading = true;
        try {
          await bookService.update(this.bookForm);
          this.setBook();
          this.message = "تم التعديل";
          setTimeout(() => {
            this.message = "";
          }, 1800);
        } catch (error) {
          this.message = "حصل خطأ - لم يتم التعديل!";
          console.log(error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>