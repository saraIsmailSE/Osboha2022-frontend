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
                <div class="col-12 col-md-12 col-lg-12">
                  <div class="card">
                    <div class="card-title pt-2">
                      <h3 class="text-center">
                        {{ `الأسبوع الحالي: ${weeks[0]?.title}` }}
                      </h3>
                    </div>
                    <div class="card-body">
                      <div
                        class="d-flex align-items-center justify-content-center"
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
                      </div>
                      <div class="mt-4">
                        <h4 class="text-center rtl">
                          {{ minutesOfCurrentWeek ?? 0 }}
                        </h4>
                        <p class="mb-0 text-center">مجموع الدقائق</p>
                      </div>
                    </div>
                  </div>
                </div>

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
                      <!-- <input
                        type="month"
                        class="form-control"
                        id="inputMonth"
                        v-model="selectedMonthYear"
                      /> -->
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

                      <div class="mt-4">
                        <div class="p-2">
                          <span class="me-2"> ✅ = أكمل 60 دقيقة </span> |
                          <span class="me-2"> ✖️ = لم يكمل 60 دقيقة </span> |
                          <span> ❌ = ليس هناك أي دقائق </span>
                        </div>

                        <div class="blog-description">
                          <table class="table w-100 table-bordered">
                            <thead>
                              <tr class="py-3">
                                <th scope="col">الاسم</th>
                                <th scope="col">الأحد</th>
                                <th scope="col">الاثنين</th>
                                <th scope="col">الثلاثاء</th>
                                <th scope="col">الأربعاء</th>
                                <th scope="col">الخميس</th>
                                <th scope="col">الجمعة</th>
                                <th scope="col">السبت</th>
                                <th scope="col">مجموع الدقائق</th>
                                <th scope="col">النقاط الإضافية</th>
                              </tr>
                            </thead>
                            <tbody>
                              <template v-if="workingHours?.length">
                                <tr
                                  v-for="workingHour in workingHours"
                                  :key="workingHour.user.id"
                                >
                                  <td>{{ workingHour.user.name }}</td>

                                  <!-- print minutes of each day for each user -->
                                  <td
                                    v-for="day in 7"
                                    :key="day"
                                    class="text-center"
                                  >
                                    {{
                                      !workingHour.days[day]
                                        ? "❌"
                                        : isMoreThanOneHour(
                                              workingHour.days[day],
                                            )
                                          ? "✅"
                                          : "✖️"
                                    }}
                                  </td>

                                  <!-- print total minutes of each user -->
                                  <td>
                                    {{ workingHour.minutes ?? 0 }}
                                  </td>

                                  <!-- print days that user worked less than one hour -->
                                  <td>
                                    {{ calculateBonus(workingHour.minutes) }}
                                  </td>
                                </tr>

                                <!-- print total of minutes in minutes format-->
                                <tr>
                                  <td class="bold">المجموع الكلي بالدقائق</td>
                                  <td class="bold" :colspan="columns - 1">
                                    {{ totalMinutesOfAllUsers }}
                                  </td>
                                </tr>

                                <!-- print total of minutes in hours format-->
                                <tr>
                                  <td class="bold">المجموع الكلي بالساعات</td>
                                  <td class="bold" :colspan="columns - 1">
                                    {{
                                      totalMinutesOfAllUsers > 0
                                        ? minutesToHoursAndMinutes(
                                            totalMinutesOfAllUsers,
                                          )
                                        : 0
                                    }}
                                  </td>
                                </tr>
                              </template>
                              <template v-else>
                                <tr>
                                  <td
                                    class="bold text-center"
                                    :colspan="columns"
                                  >
                                    لا يوجد ساعات عمل
                                  </td>
                                </tr>
                              </template>
                            </tbody>
                          </table>
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
    </div>
  </div>
</template>
<script>
import GeneralConversationService from "@/API/services/general-conversation.service";
import helper from "@/utilities/helper";

export default {
  name: "WorkingHoursStats",
  async created() {
    await this.getStatistics();
  },
  data() {
    return {
      minutesOfCurrentWeek: 0,
      workingHours: [],
      minutesOfSelectedMonth: 0,
      loading: false,
      columns: 10,
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

      this.workingHours?.forEach((element) => {
        total += element.minutes;
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
        const response =
          await GeneralConversationService.getWorkingHoursStatistics(
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
        this.workingHours = data.workingHours;
        this.minutesOfSelectedMonth = data.minutesOfSelectedMonth;
        this.monthTitle = data.monthTitle;
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loading = false;
      }
    },

    isMoreThanOneHour(minutes) {
      return minutes >= 60;
    },

    calculateBonus(minutes) {
      //360-419 min => 1pt
      //420-479 min => 2pts
      // >= 480 => 3pts

      if (minutes >= 360 && minutes <= 419) {
        return 1;
      } else if (minutes >= 420 && minutes <= 479) {
        return 2;
      } else if (minutes >= 480) {
        return 3;
      } else {
        return 0;
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
