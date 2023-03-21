<template>
  <form @submit.prevent="submitAddThesisForm">
    <div class="d-flex align-items-center w-100 row">
      <!-- نوع الأطروحة -->
      <div class="row">
        <div class="form-group">
          <h5 class="form-label">نوع الأطروحة</h5>
        </div>
        <div class="form-group">
          <select
            class="form-select w-100"
            name="type_of_thesis"
            id="type_of_thesis"
            v-model="v$.thesisForm.typeOfThesis.$model"
            v-on:change="
              changeTypeOfThesis(
                $event.target.options[$event.target.options.selectedIndex].value
              )
            "
          >
            <option value="">اختر نوع الأطروحة</option>
            <option value="read">قراءة</option>
            <option value="readAndWrite">كتابة أطروحة</option>
            <option value="screenshots">اقتباسات</option>
            <option value="screenshotsAndWrite">كتابة واقتباسات</option>
          </select>
        </div>
      </div>
      <!-- الصفحات -->
      <div class="row mt-2" v-if="showPages">
        <div class="form-group">
          <h5 class="form-label">الصفحات</h5>
        </div>
      </div>
      <div class="row" v-if="showPages">
        <div class="form-group col-6">
          <select
            class="form-select"
            data-trigger
            name="start_page"
            id="start_page"
            v-model="v$.thesisForm.start_page.$model"
          >
            <option value="">صفحة البداية</option>
            <option v-for="page in pages" :value="page" :key="page">
              {{ page }}
            </option>
          </select>

          <div class="help-block" v-if="v$.thesisForm.start_page.$error">
            <small
              style="color: red"
              v-if="v$.thesisForm.start_page.required.$invalid"
              >الرجاء اختيار صفحة البداية</small
            >
            <small
              style="color: red"
              v-if="
                !v$.thesisForm.start_page.required.$invalid &&
                v$.thesisForm.start_page.between.$invalid
              "
              >البداية يجب ان تكون اقل من النهاية</small
            >
          </div>
        </div>
        <div class="form-group col-6">
          <select
            class="form-select"
            data-trigger
            name="end_page"
            id="end_page"
            v-model="v$.thesisForm.end_page.$model"
          >
            <option value="">صفحة النهاية</option>
            <option v-for="page in pages" :value="page" :key="page">
              {{ page }}
            </option>
          </select>
          <div class="help-block" v-if="v$.thesisForm.end_page.$error">
            <small
              style="color: red"
              v-if="v$.thesisForm.end_page.required.$invalid"
              >الرجاء اختيار صفحة النهاية</small
            >
            <small
              style="color: red"
              v-if="
                !v$.thesisForm.end_page.required.$invalid &&
                v$.thesisForm.end_page.between.$invalid
              "
              >النهاية يجب ان تكون اكبر من البداية</small
            >
          </div>
        </div>
      </div>
      <div class="form-group" v-if="thesis">
        <label class="form-label" for="thesisBody">الأطروحة</label>
        <textarea
          rows="5"
          placeholder="... اكتب أطروحتك"
          class="rounded form-control"
          id="thesisBody"
          name="thesisBody"
          v-model.trim="v$.thesisForm.body.$model"
        ></textarea>
        <div class="help-block" v-if="v$.thesisForm.body.$error">
          <small
            style="color: red"
            v-if="v$.thesisForm.body.requiredIf.$invalid"
            >الرجاء ادخال الأطروحة</small
          >
        </div>
      </div>

      <div class="form-group" v-if="screenshots">
        <label class="form-label" for="customFile"> اضافة اقتباس</label>
        <input
          class="form-control"
          type="file"
          id="customFile"
          multiple
          accept="image/jpeg, image/png, image/jpg, image/gif, image/svg"
          ref="screenShots"
          @change="previewImages"
        />
        <div class="help-block" v-if="v$.thesisForm.screenShots.$error">
          <small
            style="color: red"
            v-if="v$.thesisForm.screenShots.requiredIf.$invalid"
            >الرجاء ادخال اقتباس واحد على الاقل</small
          >
        </div>
        <!--preview-->
        <!-- <div class="preview-images">
          <div
            class="image-container"
            v-for="(previewUrl, index) in previewUrls"
            :key="index"
          >
            <div class="delete-image" @click="removeImage(index)">
              <span> x </span>
            </div>
            <img :src="previewUrl" />
          </div>
        </div> -->
        <ImagePreviewer
          v-if="thesisForm.screenShots.length"
          :media="thesisForm.screenShots"
          @remove-media="removeImage"
          ref="imagePreviewer"
        />
      </div>
      <hr />
      <!--Success and error messages-->

      <small class="text-primary text-center" v-if="successMessage">
        {{ successMessage }}
      </small>
      <small class="text-danger text-center" v-if="errorMessage">
        {{ errorMessage }}
      </small>
      <div class="col-sm-12 text-center" v-if="loader">
        <img
          :src="require('@/assets/images/page-img/page-load-loader.gif')"
          alt="loader"
          style="height: 100px"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary d-block mt-3"
        v-if="!loader"
        :disabled="v$.thesisForm.$invalid"
      >
        إضافة
      </button>
    </div>
  </form>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import commentService from "../../../API/services/comment.service";
import ImagePreviewer from "../../custom/image-previewer/ImagePreviewer.vue";

export default {
  name: "CreateThesis",
  components: {
    ImagePreviewer,
  },
  props: ["start_page", "end_page", "book_id"],
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      newThesis: "",
      thesis: false,
      screenshots: false,
      showPages: false,
      previewUrls: [],
      loader: false,
      thesisForm: {
        typeOfThesis: "",
        start_page: "",
        end_page: "",
        body: "",
        screenShots: [],
        type: "thesis",
        book_id: this.book_id,
      },
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    showAddThesis() {
      this.thesis = true;
      this.screenshots = false;
      this.thesisForm.screenShots = [];
    },
    showAddScreenshots() {
      this.screenshots = true;
      this.thesis = false;
    },
    noThesisAndScreenshots() {
      this.thesis = false;
      this.screenshots = false;
      this.thesisForm.screenShots = [];
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
    onChangeStartPage(page) {
      this.selectedStartPage = page;
    },
    onChangeEndPage(page) {
      this.selectedEndPage = page;
    },
    previewImages(event) {
      this.thesisForm.screenShots = event.target.files;
    },
    removeImage(index) {
      const files = [...this.thesisForm.screenShots];
      files.splice(index, 1);
      this.thesisForm.screenShots = files;

      if (this.thesisForm.screenShots.length == 0) {
        this.$refs.screenShots.value = null;
      }
    },
    async submitAddThesisForm() {
      this.v$.$touch();
      if (!this.v$.thesisForm.$invalid) {
        this.loader = true;
        try {
          const response = await commentService.create(this.thesisForm);
          this.$emit("addThesis", response.data);
          //reset form
          this.thesisForm = {
            ...this.thesisForm,
            start_page: "",
            end_page: "",
            body: "",
            screenShots: [],
          };

          this.v$.thesisForm.$reset();
          this.changeTypeOfThesis("");

          this.loader = false;
          this.errorMessage = "";
          this.successMessage = "تم اضافة الأطروحة بنجاح";

          //timer to close the modal
          setTimeout(() => {
            this.successMessage = "";
            this.$emit("closeModel");
          }, 2000);
        } catch (error) {
          this.loader = false;
          this.successMessage = "";
          this.errorMessage = "حدث خطأ ما الرجاء المحاولة مرة اخرى!";
        }
      } else {
        this.errorMessage = "الرجاء ادخال جميع البيانات المطلوبة";
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
              this.thesisForm.typeOfThesis == "screenshotsAndWrite"
          ),
        },
        screenShots: {
          requiredIf: requiredIf(
            () =>
              this.thesisForm.typeOfThesis == "screenshots" ||
              this.thesisForm.typeOfThesis == "screenshotsAndWrite"
          ),
        },
      },
    };
  },
  computed: {
    pages() {
      let pages = [];
      for (let i = this.start_page; i <= this.end_page; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
};
</script>
