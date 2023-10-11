<template>
  <div class="col-sm-12 mt-3 text-center">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
        <h3 class="text-center mt-3 mb-3">
          تعديل التلخيص العام
        </h3>
      </div>
      <div class="iq-card-body p-3">
        <div class="image-block text-center">
          <img src="@/assets/images/main/update-forms.png" class="img-fluid rounded w-50" alt="blog-img">
        </div>

        <div class="d-flex align-items-center mt-3"
          v-if="generalInfortmationToUpdate.status == null || generalInfortmationToUpdate.status == 'retard'">
          <form @submit.prevent="submitGenralInformationsUpdate" class="post-text ml-3 w-100 row">
            <div class="form-group">
              <label class="form-label" for="bookGeneralIdea">الفكرة العامة</label>
              <textarea v-model="v$.generalInfromationsUpdateform.summary.$model" rows="5"
              placeholder="... اكتب الملخص العام عدد حروفه بين 350 و 4800" class="rounded form-control"
                id="bookGeneralIdea"></textarea>
              <small style="color:red;" v-if="v$.generalInfromationsUpdateform.summary.$error">
                لطفًا قم بكتابة تلخيص عدد حروفه بين 350 و 4800 خالي من الرموز التعبيرية (emojis)
              </small>
            </div>
            <div class="form-group">
              <label class="form-label" for="bookGeneralQuestion">سؤال عام </label>
              <textarea v-model="v$.generalInfromationsUpdateform.general_question.$model" rows="5"
              placeholder="...  اكتب هنا السؤال العام الذي يسعى هذا الكتاب لإجابته لا يزيد عدد حروفة عن 250" class="rounded form-control"
                id="bookGeneralQuestion"></textarea>
              <small style="color:red;" v-if="v$.generalInfromationsUpdateform.general_question.$error">
                قم بكتابة سؤال عام لا يزيد عدد حروفة عن 250 خالي من الرموز التعبيرية (emojis)
              </small>

            </div>

            <hr>
            <div class="col-sm-12 text-center" v-if="loader">
              <img src="@/assets/images/gif/loader-3.gif" alt="loader" style="height: 100px;">
            </div>
            <h4 class="text-center mt-3 mb-3" v-if="message"> {{ message }}</h4>
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
          <h4 class="text-center mt-3 mb-3 col-12"> لا يمكنك تعديل السؤال لأنه في حالة التقييم أو تم تقييمه</h4>
          <div class="d-inline-block w-100 text-center col-12">
            <button type="" @click="back()" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
              عودة لصفحة الأنجاز
            </button>

          </div>
        </div>
      </div>
    </iq-card>
  </div>
</template>
<script>
import generalInformationsServices from '@/API/EligibleServices/generalInformationsServices'
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
export default {
  name: "UpdateGeneralInformation",
  async created() {
    this.generalInfortmationToUpdate = await generalInformationsServices.getById(this.$route.params.id)
    this.generalInfromationsUpdateform.general_question = this.generalInfortmationToUpdate.general_question
    this.generalInfromationsUpdateform.summary = this.generalInfortmationToUpdate.summary
    this.generalInfromationsUpdateform.user_book_id = this.generalInfortmationToUpdate.user_book_id
  },
  components: {
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      loader: false,
      message: null,
      generalInfromationsUpdateform: {
        general_question: '',
        summary: '',
        user_book_id: 0,
      },
      generalInfortmationToUpdate: [],
    };
  },
  validations() {
    return {
      generalInfromationsUpdateform: {
        general_question: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(250)
        },
        summary: {
          required,
          minLength: minLength(350),
          maxLength: maxLength(4800)

        },
      },
    };
  },
  methods: {
    removeEmojis(text) {
      var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      return text.replace(regex, '');
    },

    async submitGenralInformationsUpdate() {
      this.generalInfromationsUpdateform.general_question = this.removeEmojis(this.generalInfromationsUpdateform.general_question)
      this.generalInfromationsUpdateform.summary = this.removeEmojis(this.generalInfromationsUpdateform.summary)

      this.v$.$touch();
      if (!this.v$.generalInfromationsUpdateform.$invalid) {
        this.message = "";
        this.loader = true;
        this.generalInformations = await generalInformationsServices.updateGeneralInformations(this.generalInfromationsUpdateform, this.generalInfortmationToUpdate.id);
        this.generalInfromationsUpdateform.general_question = this.generalInformations.general_question
        this.generalInfromationsUpdateform.summary = this.generalInformations.summary
        this.v$.generalInfromationsUpdateform.general_question.$reset()
        this.v$.generalInfromationsUpdateform.summary.$reset()
      }
      this.loader = false;
      this.message = "تم التعديل بنجاح"

    },
    back() {
      this.$router.push({ name: 'achievement.general_summary', params: { id: this.generalInfortmationToUpdate.user_book.book.id } })

    }
  },
};
</script>
