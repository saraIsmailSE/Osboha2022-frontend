<template>
  <div>
    <div class="d-flex align-items-center w-100 row">
      <!-- نوع الأطروحة -->
      <div class="row">
        <div class="form-group">
          <h5 class="form-label">نوع الأطروحة</h5>
        </div>
        <div class="form-group">
          <select
            class="form-select w-100"
            name="choices-single-default"
            id="choices-single-default"
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
      <!-- <div class="form-check custom-radio  form-group col-lg-2 col-sm-6">
                                    <input type="radio" id="customRadio6" name="customRadio-1" class="form-check-input" @change="noThesisAndScreenshots()">
                                <label class="form-check-label" for="customRadio6"> قراءة </label>

                                </div>
                                <div class="form-check custom-radio  form-group col-lg-2 col-sm-6">
                                    <input type="radio" id="customRadio7" name="customRadio-1" class="form-check-input"
                                        checked @change="showAddThesis()">
                                    <label class="form-check-label" for="customRadio7"> كتابة </label>
                                </div>
                                <div class="form-check custom-radio form-check-inline form-group col-lg-2 col-sm-6">
                                    <input type="radio" id="customRadio8" name="customRadio-1" class="form-check-input"
                                        @change="showAddScreenshots()">
                                    <label class="form-check-label" for="customRadio8"> اقتباسات </label>
                                </div>
                                <div class="form-check custom-radio form-check-inline form-group col-lg-2 col-sm-6">
                                    <input type="radio" id="customRadio8" name="customRadio-1" class="form-check-input"
                                        @change="thesisAndScreenshots()">
                                    <label class="form-check-label" for="customRadio8"> كتابة واقتباسات </label>
                                </div> -->

      <!-- الصفحات -->
      <div class="row mt-2">
        <div class="form-group">
          <h5 class="form-label">الصفحات</h5>
        </div>
      </div>
      <div class="form-group col-6">
        <select
          class="form-select"
          data-trigger
          name="choices-single-default"
          id="choices-single-default"
        >
          <option value="">صفحة البداية</option>
          <option value="Choice 1">Choice 1</option>
          <option value="Choice 2">Choice 2</option>
          <option value="Choice 3">Choice 3</option>
        </select>
      </div>
      <div class="form-group col-6">
        <select
          class="form-select"
          data-trigger
          name="choices-single-default"
          id="choices-single-default"
        >
          <option value="">صفحة النهاية</option>
          <option value="Choice 1">Choice 1</option>
          <option value="Choice 2">Choice 2</option>
          <option value="Choice 3">Choice 3</option>
        </select>
      </div>
      <div class="form-group" v-if="thesis">
        <label class="form-label" for="thesisBody">الأطروحة</label>
        <textarea
          rows="5"
          placeholder="... اكتب أطروحتك"
          class="rounded form-control"
          id="thesisBody"
        ></textarea>
      </div>

      <div class="form-group" v-if="screenshots">
        <label class="form-label" for="customFile"> اضافة اقتباس</label>
        <input
          class="form-control"
          type="file"
          id="customFile"
          multiple
          accept="image/jpeg, image/png, image/jpg, image/gif, image/svg"
          @change="previewImages"
        />
        <!--preview-->
        <div class="preview-images">
          <div
            class="image-container"
            v-for="(previewUrl, index) in previewUrls"
            :key="index"
          >
            <a href="javascript:void(0);" @click="removeImage(index)"> x </a>
            <img :src="previewUrl" />
          </div>
        </div>
      </div>
      <hr />
      <a href="javascript:void(0);" class="btn btn-primary d-block mt-3"
        >إضافة</a
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "CreateThesis",
  props: ["pages", "user_book_id"],
  data() {
    return {
      newThesis: "",
      thesis: true,
      screenshots: false,
      startEnd: true,
      total: false,
      selectedImages: [],
      previewUrls: [],
    };
  },
  methods: {
    addNewthesis(thesis) {},
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
      this.thesis = true;
    },
    showStartEnd() {
      this.startEnd = true;
      this.total = false;
    },
    showTotal() {
      this.total = true;
      this.startEnd = false;
    },
    changeTypeOfThesis(type) {
      if (type == "read") {
        this.noThesisAndScreenshots();
      } else if (type == "readAndWrite" || type == "") {
        this.showAddThesis();
      } else if (type == "screenshots") {
        this.showAddScreenshots();
      } else if (type == "screenshotsAndWrite") {
        this.thesisAndScreenshots();
      }
    },
    previewImages(event) {
      this.selectedFiles = event.target.files;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrls.push(reader.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    },
    removeImage(index) {
      this.previewUrls.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.preview-images {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.image-container {
  margin-right: 10px;
  margin-bottom: 10px;
  height: 60px;
  position: relative;
}

.image-container img {
  width: 100px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.image-container a {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  background: #fff;
  border-radius: 0 0 0 10px;
  padding: 5px 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
