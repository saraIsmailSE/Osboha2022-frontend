<template>
  <div>
    <iq-card
      id="post-modal-data"
      body-class="iq-card iq-card-block iq-card-stretch iq-card-height"
    >
      <template v-slot:body>
        <div class="d-flex align-items-center">
          <form
            @submit.prevent="submitUpdate"
            class="post-text ml-3 w-100 row"
            v-if="book"
          >
            <div class="form-group col-6">
              <select
                class="form-select"
                data-trigger
                name="choices-single-default"
                id="choices-single-default"
                v-model="v$.updateForm.pageStart.$model"
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
              <small style="color: red" v-if="v$.updateForm.pageStart.$error"
                >الرجاء قم بادخال صفحة البداية</small
              >
            </div>
            <div class="form-group col-6">
              <select
                class="form-select"
                data-trigger
                name="choices-single-default"
                id="choices-single-default"
                v-model="v$.updateForm.pageEnd.$error"
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
              <small style="color: red" v-if="v$.updateForm.pageEnd.$error">{{
                pageError ? pageError : " الرجاء قم بادخال صفحة النهاية"
              }}</small>
            </div>
            <div class="form-group">
              <label class="form-label" for="thesisBody">الأطروحة</label>
              <textarea
                rows="5"
                placeholder="... اكتب أطروحتك"
                class="rounded form-control"
                id="thesisBody"
                v-model="v$.updateForm.text.$model"
              ></textarea>
              <p style="color: red" v-if="v$.updateForm.text.$error">
                لطفًا قم بكتابة اطروحة عدد حروفها بين 500 و 1800 خالية من الرموز
                التعبيرية (emojis)
              </p>
            </div>

            <div class="form-group">
              <label class="form-label" for="customFile"
                >صورة من مجموعة السفراء</label
              >
              <input
                class="form-control"
                type="file"
                id="customFile"
                ref="file"
                @change="uploadFile"
                multiple
              />
              <small style="color: red" v-if="v$.updateForm.file.$error"
                >الرجاء قم برفع صورة او صورتين</small
              >
            </div>
            <input
              type="submit"
              value="تعديل"
              href="javascript:void(0);"
              class="btn btn-primary d-block mt-3"
            />
          </form>
        </div>
        <hr />
      </template>
    </iq-card>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  integer,
  requiredIf,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import thesisServices from "../../api/thesisServices";
export default {
  name: "UpdateThesis",
  created() {
    this.getThesis();

    this.updateForm.text = this.thesisToupdate.thesis_text;
    this.updateForm.pageStart = this.thesisToupdate.starting_page;
    this.updateForm.pageEnd = this.thesisToupdate.ending_page;
  },

  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    book: {
      type: [Object],
      required: true,
    },
    noOfThesis: {
      type: [Number],
      required: true,
    },
    thesisToupdate: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {
      thesisToupdate: {},
      updateForm: {
        text: "",
        pageStart: "",
        pageEnd: "",
        pages: 0,
      },
      pageError: "",
    };
  },
  validations() {
    return {
      updateForm: {
        text: {
          required,
          minLength: minLength(500),
          maxLength: maxLength(1800),
        },
        pageStart: {
          required,
        },
        pageEnd: {
          required,
          valdiatePages: this.validatePages,
        },
        file: {
          required: requiredIf(function (nestedModel) {
            return this.updateForm.file.length == 0; // New changes
          }),
        },
      },
    };
  },
  methods: {
    validatePages() {
      const error =
        parseInt(this.thesis.pageStart) < parseInt(this.thesis.pageEnd);
      
      if (!error)
        this.pageError = "يجب ان تكون صفحة البداية اقل من صفحة النهاية";
      else this.pageError = "";
      return error;
    },
    removeEmojis(thesis) {
      var regex =
        /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      return thesis.replace(regex, "");
    },
    async submitUpdate() {
      this.v$.$touch();
      console.log(!this.v$.updateForm.$invalid)
      console.log(this.updateForm)
      if (!this.v$.updateForm.$invalid) {
        this.thesis.text = this.removeEmojis(this.updateForm.text);
        const thesis = await thesisServices.updateThesis(
          this.updateForm,
          this.$route.params.id
        );
      }
    },
    uploadFile() {
      console.log(this.$refs);
      // this.updateForm.file = this.$refs.file.files;
    },
    async getThesis() {
      const thesis = await thesisServices.getById(this.$route.params.id);
      this.thesisToupdate = thesis;
    },
  },
};
</script>
