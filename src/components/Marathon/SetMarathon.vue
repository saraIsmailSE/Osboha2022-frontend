<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img class="img-fluid rounded w-50" src="@/assets/images/main/marathon.png" alt="تحديد أسابيع المارثون" />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <h2 class="text-center" style="direction: rtl;" v-if="current_marathon"> المارثون الحالي - {{
            current_marathon.title }} </h2>
          <h2 class="text-center" v-else> المارثون الحالي - لا يوجد </h2>
          <hr />
          <form class="mt-2 p-2" @submit.prevent="onSubmit()">
            <div class="form-group" v-if="!current_marathon">
              <h3 class="mb-2"> حدد عنوان المارثون الجديد </h3>
              <input type="text" class="form-control mb-0" id="newMarathonTitle" placeholder=" عنوان المارثون"
                v-model="v$.setMarathonForm.marathon_title.$model" />
              <small style="color: red" v-if="v$.setMarathonForm.marathon_title.$error">عنوان المارثون مطلوب</small>

            </div>

            <div v-if="next_weeks.length > 0">

              <h3 class="mb-2"> أسابيع المارثون </h3>
              <div class="form-group" v-for="(week, index) in next_weeks" :key="index">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" :id="'flexSwitchCheckDefault' + index"
                    :value="week.week_key" @change="updateWeeks(week, $event.target.checked)"
                    :checked="inMarathonWeeks(week.week_key)">
                  <h4 class="form-check-label" :for="'flexSwitchCheckDefault' + index">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                      v-if="inMarathonAndActive(week.week_key)" class="align-middle" fill="#278036">
                      <path
                        d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z" />
                    </svg>
                    {{ week.title }}
                  </h4>

                </div>
                <small style="color: red" v-if="v$.setMarathonForm.weeks_key.$error">الأسابيع مطلوبة</small>
              </div>
              <p class="text-center my-2" style="color: red" v-if="message">
                {{ message }}
              </p>
              <div class="col-sm-12 text-center" v-if="loading">
                <p class="text-center">جاري التعديل</p>
                <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
              </div>
              <div class="d-inline-block w-100" v-else>
                <button type="submit" class="btn btn-primary float-end" :disabled="loading">
                  تعديل
                </button>
              </div>
            </div>
          </form>

          <div class="d-inline-block w-100 mb-3" v-if="current_marathon && current_marathon.is_active">
            <hr />
            <button type="submit" class="btn btn-danger float-end me-2" :disabled="loading"
              @click="endMarathon(current_marathon.id)">
              انهاء المارثون الحالي
            </button>
          </div>

        </div>
      </div>
    </iq-card>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import helper from "@/utilities/helper";
import OsbohaMarathon from "@/API/MarathonServices/osboha-marathon.service";
import WeekService from "@/API/services/week.service";

const greaterThanZero = (value) => value > 0;

export default {
  name: "Set Marathon Weeks",
  setup() {
    return { v$: useVuelidate() };
  },

  async created() {
    this.current_marathon = await OsbohaMarathon.getCurrentMarathon();
    if (this.current_marathon) {
      this.setMarathonForm.marathon_id = this.current_marathon.id
    }
    this.next_weeks = await WeekService.getNextWeekTitles(6);

  },

  data() {
    return {
      current_marathon: null,
      next_weeks: [],
      setMarathonForm: {
        marathon_title: "",
        marathon_id: null,
        weeks_key: [],
      },
      message: "",
      loading: false,
    };
  },
  computed: {
    current_marathon_weeks() {
      if (this.current_marathon) {
        return this.current_marathon.marathon_weeks
      }
      return null
    }
  },
  methods: {
    inMarathonWeeks(key) {
      if (this.current_marathon_weeks) {
        const isInMarathonWeeks = this.current_marathon_weeks.some(
          current_marathon_week => current_marathon_week.week_key === key
        );

        if (isInMarathonWeeks) {
          this.setMarathonForm.weeks_key.push(key);
        }
        return isInMarathonWeeks;

      }
      return false;
    },
    inMarathonAndActive(key) {
      if (this.current_marathon_weeks) {
        return this.current_marathon_weeks.some(
          current_marathon_week => current_marathon_week.week_key === key && current_marathon_week.is_active == 1
        );
      }
      return false;
    },
    updateWeeks(week, isChecked) {
      if (isChecked) {
        this.setMarathonForm.weeks_key.push(week.week_key);
      } else {
        const index = this.setMarathonForm.weeks_key.indexOf(week.week_key);
        if (index !== -1) {
          this.setMarathonForm.weeks_key.splice(index, 1);
        }
      }
    },
    async onSubmit() {
      this.v$.$touch();
      if (!this.v$.setMarathonForm.$invalid) {
        this.loading = true;
        try {
          const marathon = await OsbohaMarathon.createMarthon(this.setMarathonForm);
          this.current_marathon = marathon
          this.message = "تم التعديل";
          this.v$.setMarathonForm.$reset();
          this.setMarathonForm = {
            name: "",
            title: '',
            weeks_key: [],
          };
          helper.toggleToast(
            "تم التعديل",
            "success",
          );

          setTimeout(() => {
            this.message = "";
          }, 3000);
        } catch (error) {
          this.message = "حصل خطأ - لم يتم التعديل!";
          helper.toggleToast(
            "حصل خطأ - لم يتم التعديل!",
            "danger",
          );

          console.log(error.response.data);
        } finally {
          this.loading = false;
        }
      }
    },
    endMarathon(marathon_id) {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-primary btn-lg ms-2",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "هل انت متأكد؟",
          text: "سيتم انهاء المارثون الحالي",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "انهاء",
          cancelButtonText: "تراجع",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        })
        .then(async (willDelete) => {
          if (willDelete.isConfirmed) {
            const response = await OsbohaMarathon
              .endMarathon(marathon_id)
              .then(async (response) => {
                this.current_marathon = response;
                helper.toggleToast(
                  "تم الانهاء",
                  "success",
                );
              })
              .catch((error) => {
                helper.toggleToast("حصل خطأ - لم يتم الانهاء!", "danger");
                console.log(error);
              });
          }
        });
    },
  },
  validations() {
    return {
      setMarathonForm: {
        marathon_title: {
          required: requiredIf(function () {
            return this.setMarathonForm.marathon_id == 0;
          }),
        },
        marathon_id: {
          required: requiredIf(function () {
            return this.setMarathonForm.marathon_title == "";
          }),
        },
        weeks_key: {
          required,
        },
      },
    };
  },
};
</script>