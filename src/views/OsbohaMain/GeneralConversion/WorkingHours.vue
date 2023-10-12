<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div
        class="iq-card-header-toolbar d-flex text-center align-items-center flex-column mx-auto"
      >
        <h1 class="text-center mt-3 mb-3">إدخال ساعات العمل</h1>
        <div class="alert alert-warning">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" size="xl" />
          <span>
            سيتم حفظ الساعات المدخلة في اليوم الواحد بشكل تراكمي, لذلك يرجى
            الإدخال بشكل دقيق
          </span>
        </div>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img
            src="@/assets/images/main/left-timer.png"
            class="img-fluid rounded w-75"
            alt="blog-img"
          />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <form class="mt-2" @submit.prevent="submit">
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label for="hours">الساعات</label>
                  <input
                    v-model="v$.form.hours.$model"
                    type="number"
                    min="0"
                    max="24"
                    class="form-control mb-0"
                    id="hours"
                    placeholder="ادخل عدد الساعات"
                    :disabled="loader"
                  />
                  <template v-if="v$.form.hours.$error">
                    <small
                      style="color: red"
                      v-if="v$.form.hours.requiredIf.$invalid"
                    >
                      عدد الساعات مطلوب</small
                    >
                    <small style="color: red" v-if="v$.form.hours.min.$invalid">
                      عدد الساعات يجب ان يكون اكبر من صفر</small
                    >

                    <small style="color: red" v-if="v$.form.hours.max.$invalid">
                      عدد الساعات يجب ان يكون اقل من 24</small
                    >
                  </template>
                </div>
              </div>

              <div class="col-6">
                <div class="form-group">
                  <label for="minutes">الدقائق</label>
                  <input
                    v-model="v$.form.minutes.$model"
                    type="number"
                    min="0"
                    max="60"
                    class="form-control mb-0"
                    id="minutes"
                    placeholder="ادخل عدد الدقائق"
                    :disabled="loader"
                  />
                  <template v-if="v$.form.minutes.$error">
                    <small
                      style="color: red"
                      v-if="v$.form.minutes.requiredIf.$invalid"
                    >
                      عدد الدقائق مطلوب</small
                    >
                    <small
                      style="color: red"
                      v-if="v$.form.minutes.min.$invalid"
                    >
                      عدد الدقائق يجب ان يكون اكبر من صفر</small
                    >

                    <small
                      style="color: red"
                      v-if="v$.form.minutes.max.$invalid"
                    >
                      عدد الدقائق يجب ان يكون اقل من 60</small
                    >
                  </template>
                </div>
              </div>
            </div>

            <div class="form-group text-center" v-if="message">
              <small :class="`text-${variant}`">
                {{ message }}
              </small>
            </div>
            <div class="col-sm-12 text-center float-end" v-if="loader">
              <img
                src="@/assets/images/gif/page-load-loader.gif"
                alt="loader"
                style="height: 100px"
              />
            </div>
            <div class="d-inline-block w-100" v-else>
              <button
                type="submit"
                class="btn btn-primary float-end"
                :disabled="loader"
              >
                إدخال
              </button>
            </div>
          </form>
        </div>
      </div>
    </iq-card>

    <WorkingHoursList :workingHours="workingHours" :loading="loadingStats" />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { requiredIf, maxValue, minValue } from "@vuelidate/validators";
import GeneralConversationService from "@/API/services/general-conversation.service";
import WorkingHoursList from "@/components/conversation/WorkingHoursList.vue";
import helper from "@/utilities/helper";

export default {
  name: "WorkingHours",
  components: {
    WorkingHoursList,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  async created() {
    await this.getWorkingHours();
  },
  data() {
    return {
      form: {
        hours: 0,
        minutes: 0,
      },
      message: "",
      variant: "success",
      loader: false,

      workingHours: [],
      loadingStats: false,
    };
  },
  validations() {
    return {
      form: {
        hours: {
          requiredIf: requiredIf(() => !this.form.minutes),
          min: this.form.minutes ? minValue(0) : minValue(1),
          max: maxValue(24),
        },
        minutes: {
          requiredIf: requiredIf(() => !this.form.hours),
          min: this.form.hours ? minValue(0) : minValue(1),
          max: maxValue(60),
        },
      },
    };
  },
  watch: {
    message() {
      setTimeout(() => {
        this.message = "";
      }, 3000);
    },
  },
  methods: {
    async submit() {
      this.message = "";
      this.v$.$touch();
      if (!this.v$.form.$invalid) {
        this.loader = true;
        const { hours, minutes } = this.form;

        const overAllMinutes = parseInt(hours) * 60 + parseInt(minutes);

        try {
          const response =
            await GeneralConversationService.addWorkingHours(overAllMinutes);

          this.message = "تم إدخال الساعات بنجاح";
          this.variant = "success";

          this.form.hours = 0;
          this.form.minutes = 0;
          this.v$.form.$reset();

          this.updateWorkingHours(response);
        } catch (error) {
          this.message = "حدث خطأ أثناء إدخال الساعات";
          this.variant = "danger";
        } finally {
          this.loader = false;
        }
      }
    },

    updateWorkingHours(response) {
      const { data } = response;
      const workingHoursId = data.id;

      const isFound = this.workingHours.find(
        (item) => item.id === workingHoursId,
      );

      if (!isFound) {
        this.workingHours.push(data);
      } else {
        this.workingHours = this.workingHours.map((item) => {
          if (item.id === workingHoursId) {
            return data;
          }
          return item;
        });
      }
    },

    async getWorkingHours() {
      if (this.loading) return;

      this.empty = false;
      this.loadingStats = true;
      try {
        const response = await GeneralConversationService.getWorkingHours();

        this.workingHours = response.data;
      } catch (error) {
        console.log("error", error);
        helper.toggleErrorToast();
      } finally {
        this.loadingStats = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
