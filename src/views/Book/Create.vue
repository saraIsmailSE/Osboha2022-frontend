<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto">
        <h1 class="text-center mt-3 mb-3">اضافة كتاب</h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center mt-3">
          <img class="img-fluid rounded w-75" src="@/assets/images/main/reading_list.png" alt="add-group" />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <form class="mt-2" @submit.prevent="onSubmit()">
            <small style="color: red">
              * الحقل مطلوب</small>

            <!-- Name -->
            <div class="form-group">
              <label for="bookName">* اسم الكتاب</label>
              <input type="text" v-model="v$.bookForm.name.$model" class="form-control mb-0" id="bookName"
                placeholder=" اسم الكتاب" @change="checkIsBookExist()" />
              <small style="color: red" v-if="v$.bookForm.name.$error">
                اسم الكتاب مطلوب</small>
            </div>

            <available-books :availableBooks="availableBooks" />

            <!-- Brief -->
            <div class="form-group">
              <label for="bookDescription">
                <span v-if="shouldfFill">*</span> وصف الكتاب</label>
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
              <label for="bookAuther">
                <span v-if="shouldfFill">*</span> الكاتب</label>
              <input type="text" v-model="v$.bookForm.writer.$model" class="form-control mb-0" id="bookAuther"
                placeholder="اسم الكاتب " />
              <small style="color: red" v-if="v$.bookForm.writer.$error">اسم الكاتب مطلوب</small>
            </div>

            <!-- Publisher -->
            <div class="form-group">
              <label for="bookPublisher">
                <span v-if="shouldfFill">*</span> دار النشر</label>
              <input type="text" v-model="v$.bookForm.publisher.$model" class="form-control mb-0" id="bookPublisher"
                placeholder="دار النشر " />
              <small style="color: red" v-if="v$.bookForm.publisher.$error">دار النشر مطلوبة</small>
            </div>

            <div class="form-group">
              <label for="bookLink">
                <span v-if="shouldfFill">*</span> رابط الكتاب</label>
              <input type="text" v-model="v$.bookForm.link.$model" class="form-control mb-0" id="bookLink"
                placeholder="رابط الكتاب " />
              <small style="color: red" v-if="v$.bookForm.link.$error">رابط الكتاب مطلوب</small>
            </div>

            <!-- Start Page -->
            <div class="form-group">
              <label for="bookStartPage">* صفحة البداية</label>
              <input type="number" v-model="v$.bookForm.start_page.$model" class="form-control mb-0" id="bookStartPage"
                placeholder="صفحة البداية " />
              <small style="color: red" v-if="v$.bookForm.start_page.$error">صفحة البداية مطلوبة</small>
            </div>

            <!-- End Page -->
            <div class="form-group">
              <label for="bookEndPage">* صفحة النهاية</label>
              <input type="number" v-model="v$.bookForm.end_page.$model" class="form-control mb-0" id="bookEndPage"
                placeholder="صفحة النهاية " />
              <small style="color: red" v-if="v$.bookForm.end_page.$error">صفحة النهاية مطلوبة</small>
            </div>

            <!-- Book Type -->
            <div class="form-group">
              <label for="bookType">
                <span v-if="shouldfFill">*</span> نوع الكتاب</label>
              <select v-model="v$.bookForm.type_id.$model" class="form-select" data-trigger
                name="choices-single-default" id="choices-single-default" v-if="shouldfFill">
                <option value="0" selected>اختر نوع الكتاب</option>
                <option v-for="(type, index) in types" :key="index" :value="type.id">
                  {{ BOOK_TYPES[type.type] }}
                </option>
              </select>
              <select v-model="v$.bookForm.type_id.$model" class="form-select" data-trigger
                name="choices-single-default" id="choices-single-default" v-else disabled>
                <option value="0" selected>كتاب حر</option>
              </select>
              <small style="color: red" v-if="v$.bookForm.type_id.$error">نوع الكتاب مطلوب</small>
            </div>

            <!-- Book Level -->
            <div class="form-group">
              <label for="bookLevel">
                <span v-if="shouldfFill">*</span> مستوى الكتاب</label>
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
              <h4> قسم الكتاب

                <span v-if="shouldfFill">*</span>
              </h4>
              <select class="form-select mt-2" data-trigger name="section" id="section"
                v-model="v$.bookForm.section_id.$model">
                <option value="0" selected>اختر قسم الكتاب</option>
                <option v-for="section in sections" :key="section.id" :value="section.id">
                  {{ section.section }}
                </option>
              </select>
              <small style="color: red" v-if="v$.bookForm.section_id.$error">قسم الكتاب مطلوب</small>
            </div>

            <!-- Book Language -->
            <div class="form-group col-12">
              <h4>
                لغة الكتاب
                <span v-if="shouldfFill">*</span>
              </h4>
              <select class="form-select mt-2" data-trigger name="section" id="section"
                v-model="v$.bookForm.language_id.$model">
                <option value="0" selected>اختر لغة الكتاب</option>
                <option v-for="language in languages" :key="language.id" :value="language.id">
                  {{ LANUAGES[language.language] }}
                </option>
              </select>
              <small style="color: red" v-if="v$.bookForm.language_id.$error">لغة الكتاب مطلوبة</small>

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
              params: { book_id: book_id },
            }" v-if="book_id">
              عرض الكتاب
              <span class="align-middle material-symbols-outlined">
                keyboard_return
              </span>
            </router-link>
            <div class="col-sm-12 text-center" v-if="loading">
              <p class="text-center">جاري الاضافة</p>
              <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
            </div>
            <div class="d-inline-block w-100" v-else>
              <button type="submit" class="btn btn-primary float-end" :disabled="loading">
                اضافة
              </button>
            </div>
          </form>
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
import AvailableBooks from '@/components/book/AvailableBooks.vue';


const greaterThanZero = (value) => value > 0;

export default {
  name: "Create Book",
  components: { AvailableBooks },
  setup() {
    return { v$: useVuelidate() };
  },

  async created() {
    this.bookLevels = await bookLevel.getAll();
    this.sections = await sections.getAll();
    this.sections = this.sections.data;
    this.languages = await languages.getAll();
    this.types = await bookType.getAllBookTypes();
  },
  watch: {
    bookBrief() {
      this.$refs.bodyRef.style.height = "auto";
      this.$nextTick(() => {
        this.$refs.bodyRef.style.height =
          this.$refs.bodyRef.scrollHeight + "px";
      });
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
        'book_quality_supervisor',
      ]);
    },
    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
    },
  },

  data() {
    return {
      availableBooks: [],
      types: [],
      bookLevels: [],
      sections: [],
      languages: [],
      LANUAGES,
      BOOK_TYPES,
      bookForm: {
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
        is_free: 0,
      },
      message: "",
      loading: false,
      currentMedia: null,
      book_id: 0,
    };
  },
  validations() {
    return {
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
    async checkIsBookExist() {
      this.availableBooks = await bookService.isBookExist(this.bookForm.name)
    },
    selectItem(value) {
      if (this.isAdmin || this.inBooksTeam) {
        return value > 0;
      }
      else {
        return true;
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
          const newBook = await bookService.create(this.bookForm);
          this.book_id = newBook.id
          this.message = " تم لاضافة - سيتم تحويلك لصفحة الكتاب";
          setTimeout(() => {
            this.$router.push({ name: 'book.book-details', params: { book_id: this.book_id } })
          }, 3000);
        } catch (error) {
          this.message = "حصل خطأ - لم يتم الاضافة!";
          console.log(error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>