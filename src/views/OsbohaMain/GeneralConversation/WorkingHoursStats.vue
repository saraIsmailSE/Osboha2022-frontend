<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <div class="header-title">
              <h4
                class="card-title bg-primary text-white text-center px-2 py-3"
              >
                إحصائيات ساعات العمل
              </h4>
            </div>
          </div>
          <div class="card-body">
            <div class="col-sm-12 text-center" v-if="loading">
              <img src="@/assets/images/gif/loader-3.gif" alt="loader" />
            </div>

            <div class="col-12" v-else>
              <div class="row">
                <StatsHeader
                  :weeks="weeks"
                  :minutesOfCurrentWeek="minutesOfCurrentWeek"
                />

                <div class="col-12 row">
                  <div class="col-sm-12 col-md-6">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="type"
                        id="by_week"
                        value="week"
                        v-model="type"
                      />
                      <label class="form-check-label" for="by_week"
                        >حسب الأسبوع</label
                      >
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="type"
                        id="by_month"
                        value="month"
                        v-model="type"
                      />
                      <label class="form-check-label" for="by_month"
                        >حسب الشهر</label
                      >
                    </div>
                  </div>
                </div>

                <div class="col-12 row mt-3 ms-3" v-if="type">
                  <template v-if="type == 'week'">
                    <div
                      class="col-sm-12 col-md-6"
                      v-for="week in weeks"
                      :key="week.id"
                    >
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="date"
                          :id="week.id"
                          :value="week.id"
                          v-model="selectedWeek"
                        />
                        <label class="form-check-label" :for="week.id">
                          {{ week.title }}
                        </label>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="type == 'month'">
                    <div class="form-group col-12">
                      <select class="form-select" v-model="selectedMonthYear">
                        <option value="">اختر شهر</option>
                        <option
                          v-for="month in months"
                          :key="month.date"
                          :value="month.date"
                        >
                          {{ month.title }}
                        </option>
                      </select>
                    </div>
                  </template>
                </div>

                <div class="col-12 col-md-12 col-lg-12 mt-3">
                  <div class="card">
                    <div class="card-title pt-3">
                      <h3 class="text-center">
                        {{ monthTitle ?? selectedWeekData?.title }}
                      </h3>
                    </div>
                    <div class="card-body">
                      <div
                        class="d-flex align-items-center justify-content-around"
                      >
                        <div
                          class="border rounded avatar-55 d-flex align-items-center justify-content-center"
                        >
                          <img
                            class="img-fluid"
                            src="@/assets/images/gif/chart.gif"
                            alt=""
                          />
                        </div>
                        <div>
                          <h4 class="text-center rtl">
                            {{
                              monthTitle
                                ? minutesOfSelectedMonth
                                : totalMinutesOfAllUsers
                            }}
                          </h4>
                          <p class="mb-0 text-center">مجموع الدقائق</p>
                        </div>
                      </div>

                      <StatsIndicators />

                      <StatsTables :workingHours="workingHours" :type="type" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WorkingHourService from "@/API/services/working-hour.service";
import helper from "@/utilities/helper";
import StatsHeader from "@/components/conversation/workHours/StatsHeader.vue";
import StatsIndicators from "@/components/conversation/workHours/StatsIndicators.vue";
import StatsTables from "@/components/conversation/workHours/StatsTables.vue";

export default {
  name: "WorkingHoursStats",
  components: { StatsHeader, StatsIndicators, StatsTables },
  async created() {
    await this.getStatistics();

    console.log("working hours", this.objectToArray(this.workingHours));
  },
  data() {
    return {
      minutesOfCurrentWeek: 0,
      workingHours: [],
      minutesOfSelectedMonth: 0,
      loading: false,
      selectedMonthYear: "",
      selectedWeek: "",
      weeks: [],
      months: [],
      type: "week",
      monthTitle: null,
    };
  },
  computed: {
    totalMinutesOfAllUsers() {
      let total = 0;

      this.workingHours?.forEach((week) => {
        week.value?.forEach((user) => {
          total += user.minutes;
        });
      });

      return total;
    },
    selectedWeekData() {
      return this.weeks?.find((week) => week.id === Number(this.selectedWeek));
    },
  },
  watch: {
    selectedMonthYear() {
      this.getStatistics();
    },
    selectedWeek() {
      this.getStatistics();
    },
    type() {
      if (this.type == "week") {
        this.selectedMonthYear = "";
        this.selectedWeek = this.weeks[0]?.id ?? "";
      } else {
        this.selectedWeek = "";
        this.selectedMonthYear = this.months[0]?.date ?? "";
      }
    },
  },
  methods: {
    ...helper,
    async getStatistics() {
      if (this.loading) return;
      this.loading = true;

      try {
        const response = await WorkingHourService.getWorkingHoursStatistics(
          this.type,
          this.type === "week" ? this.selectedWeek : this.selectedMonthYear,
        );

        const data = response.data;
        this.weeks = data.weeks;
        this.months = data.months;
        this.type = data.selectedType;
        this.selectedWeek = this.type === "week" ? data.selectedDate : "";
        this.selectedMonthYear = this.type === "month" ? data.selectedDate : "";
        this.minutesOfCurrentWeek = data.minutesOfCurrentWeek;
        this.workingHours = this.objectToArray(data.workingHours);
        this.minutesOfSelectedMonth = data.minutesOfSelectedMonth;
        this.monthTitle = data.monthTitle;
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
.rtl {
  direction: rtl;
}

.bold {
  font-weight: bold;
}
</style>
