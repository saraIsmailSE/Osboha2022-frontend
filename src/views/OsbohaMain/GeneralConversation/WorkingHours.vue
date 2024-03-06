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
            سيتم حفظ الساعات المدخلة في اليوم الواحد كما هي بدون زيادة تراكمية,
            لذلك يرجى الإدخال بشكل دقيق
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
      <div class="col-12 bg-white pt-2" v-if="weekDays?.length > 0">
        <div class="sign-in-from">
          <form class="mt-2" @submit.prevent="submit()">
            <div
              class="row"
              v-for="(day, index) in weekDays"
              :key="day.date"
              :id="day.date"
            >
              <input type="hidden" v-model="day.week_id" />
              <div class="col-12" v-if="startWeekTitle !== day.week_title">
                <h4 class="text-center bg-primary my-2 text-white py-1">
                  {{ (startWeekTitle = day.week_title) }}
                </h4>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-group">
                  <label
                    for="hours"
                    class="d-block mb-1"
                    style="font-weight: bold"
                    >اليوم/التاريخ</label
                  >
                  <div class="input-group">
                    <span class="text-primary me-2" style="font-weight: bold">{{
                      day.name
                    }}</span>
                    <input
                      type="string"
                      v-model="day.date"
                      :disabled="true"
                      class="form-control mb-0"
                      id="date"
                      placeholder="ادخل التاريخ"
                    />
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group">
                  <label
                    class="d-block mb-1"
                    for="minutes"
                    style="font-weight: bold"
                    >الدقائق</label
                  >
                  <input
                    :value="day.minutes"
                    type="number"
                    class="form-control mb-0"
                    id="minutes"
                    placeholder="ادخل عدد الدقائق"
                    :disabled="loader"
                    @change="changeMinutes(index, $event.target.value)"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 d-flex justify-content-end align-items-center">
                <button
                  type="submit"
                  class="btn btn-primary me-2"
                  style="height: fit-content"
                  :disabled="loader"
                >
                  حفظ
                </button>
              </div>
            </div>

            <div class="form-group text-center" v-if="message">
              <small :class="`text-${variant}`">
                {{ message }}
              </small>
            </div>
            <hr />
          </form>
        </div>
      </div>
    </iq-card>

    <WorkingHoursList :workingHours="workingHours" :loading="loadingStats" />
  </div>
</template>

<script>
import WorkingHourService from "@/API/services/working-hour.service";
import WorkingHoursList from "@/components/conversation/workHours/WorkingHoursList.vue";
import helper from "@/utilities/helper";

export default {
  name: "WorkingHours",
  components: {
    WorkingHoursList,
  },
  async created() {
    await this.getWorkingHours();
    // this.fillWeekDays();
  },

  data() {
    return {
      message: "",
      variant: "success",
      loader: false,
      workingHours: [],
      loadingStats: false,
      weekDays: [],
      days: [],
      startWeekTitle: "",
    };
  },
  watch: {
    message() {
      setTimeout(
        () => {
          this.message = "";
        },
        this.variant === "success" ? 3000 : 5000,
      );
    },
    days() {
      this.fillWeekDays();
    },
  },
  methods: {
    ...helper,
    async submit() {
      this.messages = "";

      this.loader = true;

      try {
        await WorkingHourService.addWorkingHours(this.weekDays);

        this.message = "تم إدخال الدقائق بنجاح";
        this.variant = "success";

        this.weekDays = [];
        this.getWorkingHours();
      } catch (error) {
        this.message = "حدث خطأ أثناء إدخال الدقائق";
        this.variant = "danger";
      } finally {
        this.loader = false;
      }
    },

    async getWorkingHours() {
      if (this.loadingStats) return;

      this.loadingStats = true;
      try {
        const response = await WorkingHourService.getWorkingHours();

        this.workingHours = this.objectToArray(response.data?.workingHoursList);
        this.days = response.data?.days || [];
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loadingStats = false;
      }
    },

    fillWeekDays() {
      const arabicWeekDays = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ];

      this.days?.forEach((day) => {
        const date = new Date(day.date);
        const dayName = arabicWeekDays[date.getDay()];

        this.weekDays.push({
          name: dayName,
          ...day,
        });
      });
    },

    changeMinutes(index, value) {
      this.weekDays = this.weekDays.map((day, i) => {
        if (i === index) {
          return { ...day, minutes: value };
        }
        return day;
      });
    },
  },
};
</script>
