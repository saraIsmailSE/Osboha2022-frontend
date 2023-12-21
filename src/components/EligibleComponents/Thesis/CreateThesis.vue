<template>
  <div>
    <iq-card id="post-modal-data" body-class="iq-card iq-card-block iq-card-stretch iq-card-height">
      <template v-slot:headerTitle>
        <h4 class="card-title">إضافة الأطروحة {{ noOfthesis + 1 }}</h4>
      </template>
      <template v-slot:body>
        <div class="d-flex align-items-center">
          <form @submit.prevent="submit" class="post-text ml-3 w-100 row" v-if="book">
            <div class="form-group col-6">
              <select class="form-select" data-trigger name="choices-single-default" id="choices-single-default"
                v-model="v$.thesis.pageStart.$model">
                <option value="">اختر صفحة البداية</option>
                <option v-for="(i, index) in bookPages" :key="index" :value="i">
                  {{ i + pagesStartingRange }}
                </option>
              </select>
              <small style="color: red" v-if="v$.thesis.pageStart.$error"> قم بادخال صفحة البداية</small>
            </div>
            <div class="form-group col-6">
              <select class="form-select" data-trigger name="choices-single-default" id="choices-single-default"
                v-model="v$.thesis.pageEnd.$model">
                <option value="">اختر صفحة النهاية</option>
                <option v-for="(i, index) in bookPages" :key="index" :value="i">
                  {{ i + pagesStartingRange }}
                </option>
              </select>
              <small style="color: red" v-if="v$.thesis.pageEnd.$error">{{
                pageError ? pageError : " قم بادخال صفحة النهاية"
              }}</small>
            </div>
            <div class="form-group">
              <label class="form-label" for="thesisBody">الأطروحة</label>
              <textarea rows="5" placeholder="... اكتب أطروحة عدد حروفها بين 500 و 1800" class="rounded form-control" id="thesisBody"
                v-model="v$.thesis.text.$model"></textarea>
              <p style="color: red" v-if="v$.thesis.text.$error">
                لطفًا قم بكتابة اطروحة عدد حروفها بين 500 و 1800 خالية من الرموز
                التعبيرية (emojis)
              </p>
            </div>

            <div class="form-group">
              <label class="form-label">

                ✅ تذكر أن عليك أن تكون منتجًا، اكتب أطروحة تحتوي على مقدمة وفكرة وخاتمة. تناقش فيها ما انتفعت به في هذه
                الصفحات. استخدامك للكثير من الاقتباسات و السعي لتلخيص الأفكار فقط سيعرض أطروحتك للرفض من فريق التدقيق
                والتقييم. ليبدع قلمك هنا في ترجمة أفكارك. مساحتك هنا من (8-12) أطروحة.
              </label>
            </div>
            <input type="submit" value="إضافة" href="javascript:void(0);" class="btn btn-primary d-block mt-3" />
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
  helpers,
  requiredIf,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import thesisServices from "@/API/EligibleServices/thesisServices";

export default {
  name: "CreateThesis",
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    pagesStartingRange: {
      type: [Number],
      required: true,
    },
    book: {
      type: [Object],
      required: true,
    },
    user_book_id: {
      type: [Number],
      required: true,
    },
    noOfthesis: {
      type: [Number],
      required: true,
    },
  },
  data() {
    return {
      thesis: {
        text: "",
        pageStart: "",
        pageEnd: "",
        pages: 0,
      },
      bookPages: this.book.end_page,
      pageError: "",
      emojiError: "",
    };
  },
  validations() {
    return {
      thesis: {
        text: {
          required,
          minLength: minLength(500),
          maxLength: maxLength(1800),
          //validationEmoji: this.validateText,
        },
        pageStart: {
          required,
        },
        pageEnd: {
          required,
          valdiatePages: this.validatePages,
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
    async submit() {
      this.thesis.text = this.removeEmojis(this.thesis.text);
      this.v$.$touch();
      if (!this.v$.thesis.$invalid) {
        this.thesis.pageStart = this.thesis.pageStart + this.pagesStartingRange;
        this.thesis.pageEnd = this.thesis.pageEnd + this.pagesStartingRange;
        const thesis = await thesisServices.createThesis(
          this.thesis,
          this.user_book_id
        );
        this.thesis.text = "";
        this.thesis.pageEnd = "";
        this.thesis.pageStart = "";
        this.v$.thesis.$reset();

        this.$emit("addThesis", thesis.data.data);
      }
    },
    removeEmojis(thesis) {
      var regex =
        /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      return thesis.replace(regex, "");
    },
  },
};
</script>
