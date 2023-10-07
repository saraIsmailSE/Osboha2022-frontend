<template>
  <div>
    <div class="col-sm-12 mt-3">
      <iq-card class="iq-card">
        <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
          <h3 class="text-center mt-3 mb-3">تعديل الاطروحة</h3>
        </div>
        <div class="iq-card-body p-3">
          <div class="image-block text-center">
            <img src="@/assets/images/update-forms.png" class="img-fluid rounded w-50" alt="blog-img" />
          </div>

          <div class="d-flex align-items-center mt-3" v-if="thesisToupdate.status == null || thesisToupdate.status == 'retard'
            ">
            <form @submit.prevent="submit" class="post-text ml-3 w-100 row">
              <div class="form-group col-6">
                <select class="form-select" data-trigger name="choices-single-default" id="choices-single-default"
                  v-model="v$.thesis.starting_page.$model">
                  <option value="">اختر صفحة البداية</option>
                  <option v-for="(i, index) in book.end_page" :key="index" :value="i">
                    {{ i }}
                  </option>
                </select>
                <small style="color: red" v-if="v$.thesis.starting_page.$error">{{
                  pageError ? pageError : " الرجاء قم بادخال صفحة البداية"
                }}</small>
              </div>
              <div class="form-group col-6">
                <select class="form-select" data-trigger name="choices-single-default" id="choices-single-default"
                  v-model="v$.thesis.ending_page.$model">
                  <option value="">اختر صفحة النهاية</option>
                  <option v-for="(i, index) in book.end_page" :key="index" :value="i">
                    {{ i }}
                  </option>
                </select>
                <small style="color: red" v-if="v$.thesis.ending_page.$error">{{
                  pageError ? pageError : " الرجاء قم بادخال صفحة النهاية"
                }}</small>
              </div>
              <div class="form-group">
                <label class="form-label" for="thesisBody">الأطروحة</label>
                <textarea rows="5" placeholder="... اكتب أطروحة عدد حروفها بين 500 و 1800" class="rounded form-control" id="thesisBody"
                  v-model="v$.thesis.text.$model"></textarea>
                <p style="color: red" v-if="v$.thesis.text.$error">
                  لطفًا قم بكتابة اطروحة عدد حروفها بين 500 و 1800 خالية من الرموز التعبيرية (emojis)
                </p>
              </div>

              <div class="col-sm-12 text-center" v-if="loader">
                <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px" />
              </div>
              <h4 class="text-center mt-3 mb-3" v-if="message">{{ message }}</h4>
              <div class="d-inline-block w-100 text-center">
                <button type="" @click="back()" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto" v-if="message">
                  عودة لصفحة الأنجاز
                </button>
                <input type="submit" value="تعديل" href="javascript:void(0);" class="btn btn-primary d-block mt-3 w-100"
                  v-else />
              </div>
            </form>
          </div>

          <div class="d-flex align-items-center mt-3 row" v-else>
            <h4 class="text-center mt-3 mb-3 col-12">
              لا يمكنك تعديل الاطروحه لأنه في حالة التقييم أو تم تقييمه
            </h4>
            <div class="d-inline-block w-100 text-center col-12">
              <button type="" @click="back()" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                عودة لصفحة الأنجاز
              </button>
            </div>
          </div>
        </div>
      </iq-card>
    </div>
  </div>
</template>
<script>
import thesisServices from "@/api/thesisServices";
import useVuelidate from "@vuelidate/core";
import { minLength, maxLength, required, integer, requiredIf } from "@vuelidate/validators";
import IqCard from "@/components/custom/cards/iq-card.vue";
export default {
  name: "UpdateQuestion",
  async created() {
    this.thesisToupdate = await thesisServices.getById(this.$route.params.id);
    this.user_book_id = this.thesisToupdate.user_book.id;
    this.book = this.thesisToupdate.user_book.book;
    this.thesis.text = this.thesisToupdate.thesis_text;
    this.thesis.ending_page = this.thesisToupdate.ending_page;
    this.thesis.starting_page = this.thesisToupdate.starting_page;
    this.thesis.photos = this.thesisToupdate.photos;
  },
  components: { IqCard },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      user_book_id: 0,
      loader: false,
      thesis: {
        text: "",
        starting_page: "",
        ending_page: "",
      },
      book: [],
      message: "",
      thesisToupdate: [],
      errors: [false, false, false],
      pageError: "",
    };
  },
  validations() {
    return {
      thesis: {
        text: {
          required,
          minLength: minLength(500),
          maxLength: maxLength(1800),
        },
        starting_page: {
          required,
          valdiatePages: this.validatePages,
        },
        ending_page: {
          required,
          valdiatePages: this.validatePages,
        },
      },
    };
  },
  methods: {
    validatePages() {
      const error =
        parseInt(this.thesis.starting_page) < parseInt(this.thesis.ending_page);

      if (!error)
        this.pageError = "يجب ان تكون صفحة البداية اقل من صفحة النهاية";
      else this.pageError = "";
      return error;
    },

    removeEmojis(thesis) {
      var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      return thesis.replace(regex, '');
    },

    async submit() {
      this.thesis.text = this.removeEmojis(this.thesis.text)
      this.v$.$touch();
      if (!this.v$.thesis.$invalid) {
        this.message = "";
        this.loader = true;
        const thesis = await thesisServices.updateThesis(
          this.thesis,
          this.$route.params.id
        );

        this.loader = false;
        this.message = "تم التعديل بنجاح";
      }
    },
    back() {
      this.$router.push({
        name: "achievement.theses",
        params: { id: this.thesisToupdate.user_book.book.id },
      });
    },
  },
};
</script>
