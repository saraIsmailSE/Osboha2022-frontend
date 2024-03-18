<template>
  <div>
    <ramadanHeader />

    <div class="col-sm-12 mt-3" v-if="hadith">
      <iq-card class="iq-card ramadan-card">
        <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
          <h1 class="text-center mt-3 mb-3">
            الحديث {{ hadith.hadith_title }}
          </h1>
        </div>
        <h2 class="text-center mt-1 mb-3">
          {{ hadith.ramadan_day.day }} ~ رمضان
        </h2>
        <div v-if="isHadithActive" class="text-center">
          <img :src="imagePath(hadith.image)" alt="ramadan-footer" class="img-fluid p-2" v-if="(!form.hadith_1 && !form.hadith_2) ||
      (!form.hadith_redo && (hadith.memorization.length > 0 && !hadith.memorization.status == 'pending')) ||
      isAccepted
      " />
          <img src="@/assets/images/ramadan/night-prayer.png" alt="ramadan-footer" class="img-fluid" v-else />

          <p class="ramada-p h5 text-center mt-2 p-2" v-if="(!form.hadith_1 && !form.hadith_2) ||
      (!form.hadith_redo && (hadith.memorization.length > 0 && !hadith.memorization.status == 'pending')) ||
      isAccepted
      ">
            {{ hadith.hadith }}
          </p>
          <div class="col-12 pt-2">
            <div class="sign-in-from">
              <form class="mt-2" @submit.prevent="onSubmit()">
                <div class="form-group">
                  <label for="role">المرة الأولى</label>
                  <textarea name="hadith_1" class="form-control" id="hadith_1" rows="5" required="required"
                    v-model="form.hadith_1" @paste="handlePaste" :disabled="isDisabled"></textarea>
                  <small style="color: red" v-if="v$.form.hadith_1.$error">
                    الاجابة مطلوبة
                  </small>
                </div>
                <div class="form-group">
                  <label for="role">المرة الثانية</label>
                  <textarea name="hadith_2" class="form-control" id="hadith_2" rows="5" required="required"
                    v-model="form.hadith_2" @paste="handlePaste" :disabled="isDisabled"></textarea>

                  <div v-if="v$.form.hadith_2.$error">
                    <small style="color: red" v-if="v$.form.hadith_2.required.$invalid">
                      الاجابة مطلوبة
                    </small>
                    <br />
                    <small style="color: red" v-if="v$.form.hadith_2.sameAsHadith1.$invalid">
                      يجب أن تكون الاجابة مطابقة لكتابتك للحديث الأول
                    </small>
                  </div>
                </div>
                <div class="col-sm-12 text-center" v-if="loader && submitType == 'normal'">
                  <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                </div>
                <div class="alert alert-danger p-1 m-2 text-center" role="alert" v-if="isDisabled">
                  <h6 class="text-center">قمت بتسليم هذا الحديث</h6>
                </div>
                <div class="d-inline-block w-100" v-else>
                  <button type="submit" class="btn ramadan-btn float-end" :disabled="loader">
                    وثق حفظك
                  </button>
                </div>
              </form>
            </div>
            <hr />
            <h4 class="mb-2 p-2" v-if="hadith.memorization.length > 0">
              <p class="text-center display-4">
                نقاطك {{ hadith.memorization[0].points }}
              </p>
              <p>حالة اجابتك</p>
              {{ hadith.memorization[0].reviews }}
              <small class="badge bg-success">{{
      ACTIVITIES_STATUS[hadith.memorization[0].status]
    }}</small>

              <form class="mt-2" @submit.prevent="onSubmit()" v-if="hadith.memorization[0].status == 'redo'">
                <div class="form-group">
                  <label for="role">أعد كتابة الحديث هنا</label>
                  <textarea name="hadith_redo" class="form-control" id="hadith_redo" rows="5" required="required"
                    v-model="form.hadith_redo" @paste="handlePaste"></textarea>
                  <small style="color: red" v-if="v$.form.hadith_redo.$error">
                    الاجابة مطلوبة
                  </small>
                </div>
                <div class="col-sm-12 text-center" v-if="loader && submitType == 'redo'">
                  <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                </div>
                <div class="d-inline-block w-100" v-else>
                  <button type="submit" class="btn ramadan-btn float-end" :disabled="loader">
                    وثق اعادة حفظك
                  </button>
                </div>
              </form>
            </h4>
          </div>
        </div>

        <div class="alert alert-danger p-1 m-2 text-center" role="alert" v-else>
          <h6 class="text-center">هذا الحديث غير مُتاح الأن</h6>
        </div>

        <div class="d-inline-block w-100 text-center col-12">
          <router-link :to="{ name: 'ramadan.hadith' }" class="d-block mt-3 mb-3 w-75 mx-auto">
            <span class="back-btn display-6">عودة</span>
            <span class="align-middle material-symbols-outlined diplay-6">
              keyboard_return
            </span>
          </router-link>
        </div>

      </iq-card>

      <statisticsHeader />

      <iq-card class="iq-card statistics-card">
        <div class="col-12 pt-2">
          <div class="sign-in-from">
            <h4 class="text-center">
              عدد الذين يقومون بحفظ الأحاديث معنا في شهر رمضان
              <p class="ramada-p text-center display-3">
                {{ statistics.usersCount ? statistics.usersCount : 0 }}
              </p>
            </h4>

            <h4 class="text-center">
              عدد الذين أتموا حفظ (5) من أحاديث النبيﷺ حتى اللحظة
              <p class="ramada-p text-center display-3">
                {{ statistics.usersCount5 ? statistics.usersCount5 : 0 }}
              </p>
            </h4>

            <h4 class="text-center">
              عدد الذين أتموا حفظ (15) من أحاديث النبي ﷺ حتى اللحظة
              <p class="ramada-p text-center display-3">
                {{ statistics.usersCount15 ? statistics.usersCount15 : 0 }}
              </p>
            </h4>
            <h4 class="text-center">
              عدد الذين أتموا حفظ (25) من أحاديث النبي ﷺ حتى اللحظة
              <p class="ramada-p text-center display-3">
                {{ statistics.usersCount25 ? statistics.usersCount25 : 0 }}
              </p>
            </h4>

            <hr />
            <div class="row">
              <h5 class="text-center col-6">
                نقاطك ل، ({{ hadith.ramadan_day.day }}) رمضان
                <p class="ramada-p text-center display-3">
                  {{ statistics.userPoints ? statistics.userPoints : 0 }}
                </p>
              </h5>
              <h5 class="text-center col-6">
                أتممت حفظ
                <p class="ramada-p text-center display-3">
                  {{ statistics.memorizedHadithsCount ? statistics.memorizedHadithsCount : 0 }}
                </p>
              </h5>
            </div>

            <p class="ramada-p text-center h5">
              من أهم أبواب الدفاع عن النبي صلى الله عليه وسلم، هو حفظ سنته في
              الصدور لا تجعل الآخرين يسبقونك إلى الدفاع عن نبيك صلى الله عليه
              وسلم
            </p>
          </div>
        </div>
      </iq-card>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, requiredIf, sameAs } from "@vuelidate/validators";
import ramadanHeader from "@/components/ramadan/ramadan-header";
import helper from "@/utilities/helper";
import statisticsHeader from "@/components/ramadan/statistics-header";
import { ACTIVITIES_STATUS } from "@/utilities/constants";
import HadithServices from "@/API/RamadanServices/hadith.service";
import HadithMemorizationServices from "@/API/RamadanServices/hadithMemorization.service";
import ramadanDaysService from "@/API/RamadanServices/ramadanDays.service";
import hadithMemorizationService from "../../API/RamadanServices/hadithMemorization.service";


// Function to remove Arabic diacritics
function removeArabicDiacritics(str) {
  var replacedStr = str.replace(/^\s+|\s+$|\s+(?=\s)/g, "");

  return replacedStr.replace(
    /([\u064B-\u0652])/g,
    ''
  );
}
export default {
  name: "Ramadan Fill Hadith",
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    ramadanHeader,
    statisticsHeader,
  },

  async created() {
    this.current_day = await ramadanDaysService.current();
    this.hadith = await HadithServices.show(this.$route.params.hadith_id);
    this.setHadithForm(this.hadith);
  },
  data() {
    return {
      loader: false,
      ACTIVITIES_STATUS,
      statistics: [],
      current_day: null,
      hadith: null,
      form: {
        ramadan_hadiths_id: this.$route.params.hadith_id,
        hadith_1: "",
        hadith_2: "",
        hadith_redo: "",
      },
    };
  },
  validations() {
    return {
      form: {
        hadith_1: {
          required: requiredIf(function () {
            return !this.hadith || this.hadith.status == "pending";
          }),
        },
        hadith_2: {
          required: requiredIf(function () {
            return !this.hadith || this.hadith.status == "pending";
          }),
        },
        hadith_redo: {
          required: requiredIf(function () {
            return this.hadith && this.hadith.status == "redo";
          }),
        },
      },
    };
  },
  methods: {
    handlePaste(event) {
      // Prevent the default paste behavior
      event.preventDefault();
    },
    imagePath(imageName) {
      return require(`@/assets/images/ramadan/${imageName}`);
    },
    async setHadithForm(hadith) {
      if (hadith.memorization.length > 0) {
        this.form.hadith_1 = hadith.memorization[0].hadith_memorize;
        this.form.hadith_2 = hadith.memorization[0].hadith_memorize_2;
      }

      //get new statistics
      this.statistics = await hadithMemorizationService.statistics(this.hadith.ramadan_day_id);
    },
    async onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.loader = true;
        try {
          const response = await HadithMemorizationServices.store(
            this.form,
            this.submitType,
          );
          this.hadith.memorization[0] = response;

          helper.toggleToast("تم التوثيق", "success");
          this.v$.form.$reset();
        } catch (error) {
          helper.toggleToast("حدث خطأ أثناء التوثيق, حاول مرة أخرى", "error");
          console.log(error);
        } finally {
          this.loader = false;
        }
      }
    },
  },
  computed: {
    isHadithActive() {
      const now = new Date();
      const localTime = now.toLocaleString("en-US", {
        timeZone: "Asia/Riyadh",
      });
      const currentDateTime = new Date(localTime);
      const targetDateTime = new Date(this.hadith.ramadan_day.created_at);

      // Check if current_day.is_active is 1
      // Check if ramadan_day.id of the hadith is less than or equal to current_day.id
      // Check if the time associated with the hadith is greater than 10 am KSA time
      if (
        this.current_day.is_active &&
        this.hadith.ramadan_day.id <= this.current_day.id &&
        currentDateTime >= targetDateTime
      ) {
        // Extracting hours from time and comparing
        return true;
      } else {
        return false;
      }
    },
    isDisabled() {
      if (this.hadith.memorization.length > 0) {
        return this.hadith.memorization[0].status != "pending";
      } else {
        return false;
      }
    },
    isAccepted() {
      if (this.hadith.memorization.length > 0) {
        return this.hadith.memorization[0].status == "accepted";
      } else {
        return false;
      }
    },
    submitType() {
      if (
        this.hadith.memorization.length > 0 &&
        this.hadith.memorization[0].status == "redo"
      ) {
        return "redo";
      } else {
        return "normal";
      }
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: HacenSamra;
  src: url('@/assets/fonts/HacenSamra.ttf');
}

h1,
h2,
h4,
h5,
p {
  font-family: HacenSamra, Arial, sans-serif;
  color: #471809;
}

.ramada-p {
  font-size: 25px;
  line-height: 40px;
  font-family: HacenSamra, Arial, sans-serif;
  color: #471809;
}

.ramadan-card {
  background: #f8f9fa;
}

.disabled-link {
  color: #ccc;
  /* Set the color to a muted or grayed-out color */
  pointer-events: none;
  /* Disable pointer events to prevent clicking */
  text-decoration: none;
  /* Remove underline or other decorations */
}

.statistics-card {
  background: #FDEEEC;
  border-top: none;
  border-right: solid #471809;
  border-bottom: solid #471809;
  border-left: solid #471809;
}

.ramadan-btn {
  background: #b17658;
  color: #f8f9fa;

}

.back-btn {
  font-family: HacenSamra, Arial, sans-serif;
  color: #471809;
}

.accepted {
  color: #3e9069;
}

.rejected {
  color: darkred;
}


/*form styles*/
#msform {
  position: relative;
  margin-top: 20px;
}

#msform fieldset .form-card {
  background: white;
  border: 0 none;
  border-radius: 0px;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
  padding: 20px 40px 30px 40px;
  box-sizing: border-box;
  width: 94%;
  margin: 0 3% 20px 3%;

  /*stacking fieldsets above each other*/
  position: relative;
}

#msform fieldset {
  background: white;
  border: 0 none;
  border-radius: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding-bottom: 20px;

  /*stacking fieldsets above each other*/
  position: relative;
}

/*Hide all except first fieldset*/
#msform fieldset:not(:first-of-type) {
  display: none;
}

#msform fieldset .form-card {
  text-align: left;
  color: #9E9E9E;
}

#msform input,
#msform textarea {
  padding: 0px 8px 4px 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0px;
  margin-bottom: 25px;
  margin-top: 2px;
  width: 100%;
  box-sizing: border-box;
  font-family: montserrat;
  color: #2C3E50;
  font-size: 16px;
  letter-spacing: 1px;
}

#msform input:focus,
#msform textarea:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: none;
  font-weight: bold;
  border-bottom: 2px solid #596D13;
  outline-width: 0;
}


/*Dropdown List Exp Date*/
select.list-dt {
  border: none;
  outline: 0;
  border-bottom: 1px solid #ccc;
  padding: 2px 5px 3px 5px;
  margin: 2px;
}

select.list-dt:focus {
  border-bottom: 2px solid #596D13;
}

/*The background card*/
.card {
  z-index: 0;
  border: none;
  border-radius: 0.5rem;
  position: relative;
}

/*FieldSet headings*/
.fs-title {
  font-size: 25px;
  color: #2C3E50;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
}

/*progressbar*/
#progressbar {
  margin-bottom: 30px;
  overflow: hidden;
  color: lightgrey;
}

#progressbar .active {
  color: #471809;
}

#progressbar li {
  list-style-type: none;
  font-size: 12px;
  width: 33%;
  float: left;
  position: relative;
}

/*ProgressBar before any progress*/
#progressbar li:before {
  width: 50px;
  height: 50px;
  line-height: 45px;
  display: block;
  font-size: 18px;
  color: #ffffff;
  background: lightgray;
  border-radius: 50%;
  margin: 0 auto 10px auto;
  padding: 2px;
}

/*ProgressBar connectors*/
#progressbar li:after {
  content: '';
  width: 100%;
  height: 2px;
  background: lightgray;
  position: absolute;
  left: 0;
  top: 25px;
  z-index: -1;
}

/*Color number of the step and the connector before it*/
#progressbar li.active:before,
#progressbar li.active:after {
  background: #596D13;
}

/*Imaged Radio Buttons*/
.radio-group {
  position: relative;
  margin-bottom: 25px;
}

.radio {
  display: inline-block;
  width: 204;
  height: 104;
  border-radius: 0;
  background: lightblue;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  cursor: pointer;
  margin: 8px 2px;
}

.previous {
  background: #448e9e;
  color: white;
}

.radio:hover {
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
}

.radio.selected {
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
}

/*Fit image in bootstrap div*/
.fit-image {
  width: 100%;
  object-fit: cover;
}

/* Define your transitions and other styles here */
.step-enter-active,
.step-leave-active {
  transition: opacity 0.5s;
}

.step-enter-from,
.step-leave-to {
  opacity: 0;
}

.tag-input-container .form-control {
  min-height: 45px;
  cursor: text;
}

.tag-input-container input {
  border: none;
  outline: none;
  flex-grow: 1;
  padding: 0;
}
</style>