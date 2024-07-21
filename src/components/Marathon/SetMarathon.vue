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
          <h2 class="text-center" v-if="current_marathon"> المارثون الحالي - {{ current_marathon.title }} </h2>
          <h2 class="text-center" v-else> المارثون الحالي - لا يوجد </h2>
          <hr />
          <form class="mt-2 p-2" @submit.prevent="onSubmit()">
            <div class="form-group" v-if="!current_marathon">
              <h3 class="mb-2"> حدد عنوان المارثون الجديد </h3>
              <input type="text" class="form-control mb-0" id="newMarathonTitle" placeholder=" عنوان المارثون"
                v-model="v$.setMarathonForm.marathon_title.$model" />
              <small style="color: red" v-if="v$.setMarathonForm.marathon_title.$error">عنوان المارثون مطلوب</small>

            </div>


            <h3 class="mb-2"> قم بتحديد أسابيع المارثون </h3>
            <div class="form-group" v-for="(week, index) in next_weeks" :key="index">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" :id="'flexSwitchCheckDefault' + index" :value="week"
                  @change="updateWeeks(week, $event.target.checked)">
                <h4 class="form-check-label" :for="'flexSwitchCheckDefault' + index">{{ week }}</h4>
              </div>
            </div>
            <p class="text-center my-2" style="color: red" v-if="message">
              {{ message }}
            </p>
            <div class="col-sm-12 text-center" v-if="loading">
              <p class="text-center">جاري الاعتماد</p>
              <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
            </div>
            <div class="d-inline-block w-100" v-else>
              <button type="submit" class="btn btn-primary float-end" :disabled="loading">
                اعتماد
              </button>
            </div>
          </form>

          <hr />
          <div class="d-inline-block w-100 mb-3">
            <button type="submit" class="btn btn-primary float-end" :disabled="loading">
              فتح مارثون جديد
            </button>
            <button type="submit" class="btn btn-danger float-end me-2" :disabled="loading">
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
import GroupService from "@/API/services/group.service";
import OsbohaMarathon from "@/API/MarathonServices/osboha-marathon.service";
import WeekService from "@/API/services/week.service";
import { GROUP_TYPE } from "@/utilities/constants";

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
    this.next_weeks = await WeekService.getNextWeekTitles(5);

  },

  data() {
    return {
      current_marathon: null,
      next_weeks: [],
      GROUP_TYPE,
      setMarathonForm: {
        marathon_title: "",
        marathon_id: 0,
        weeks: [],
      },
      message: "",
      group_id: null,
      loading: false,
    };
  },
  methods: {
    updateWeeks(week, isChecked) {
      if (isChecked) {
        this.setMarathonForm.weeks.push(week);
      } else {
        const index = this.setMarathonForm.weeks.indexOf(week);
        if (index !== -1) {
          this.setMarathonForm.weeks.splice(index, 1);
        }
      }
    },
    async onSubmit() {
      this.v$.$touch();
      if (!this.v$.setMarathonForm.$invalid) {
        this.loading = true;
        try {
          const group = await GroupService.createGroup(this.setMarathonForm);
          this.message = "تم الاعتماد";
          this.group_id = group.id;

          this.v$.setMarathonForm.$reset();
          this.setMarathonForm = {
            name: "",
            type_id: 0,
            description: "",
          };
          setTimeout(() => {
            this.message = "";
          }, 1800);
        } catch (error) {
          this.message = "حصل خطأ - لم يتم الاعتماد!";
          console.log(error.response.data);
        } finally {
          this.loading = false;
        }
      }
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
        weeks: {
          required,
        },
      },
    };
  },
};
</script>