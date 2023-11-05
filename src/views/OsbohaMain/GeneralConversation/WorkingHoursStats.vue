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
                      <h3 class="text-center">{{ lastWeek?.title }}</h3>
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
                          {{
                            lastWeek?.minutes
                              ? minutesToHoursAndMinutes(lastWeek?.minutes)
                              : 0
                          }}
                        </h4>
                        <p class="mb-0 text-center">مجموع الساعات</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group col-12">
                  <input
                    type="month"
                    class="form-control"
                    id="inputMonth"
                    v-model="selectedMonthYear"
                  />
                </div>

                <div class="col-12 col-md-12 col-lg-12">
                  <div class="card">
                    <div class="card-title pt-2">
                      <h3 class="text-center">شهر {{ monthTitle }}</h3>
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
                            {{ minutesOfSelectedMonth }}
                          </h4>
                          <p class="mb-0 text-center">مجموع الساعات</p>
                        </div>
                      </div>

                      <div
                        class="card mt-4"
                        v-for="(workHour, index) in workingHours"
                        :key="index"
                      >
                        <div
                          class="card-title pt-2 px-2 d-flex align-items-center"
                        >
                          <span class="material-symbols-outlined"> atr </span>
                          <h5>{{ index }}</h5>
                        </div>
                        <div class="card-body">
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
                                  <th scope="col">مجموع الساعات</th>
                                  <th scope="col">أيام التقصير</th>
                                </tr>
                              </thead>
                              <tbody>
                                <template
                                  v-for="role in objectToArray(workHour)"
                                  :key="role.key"
                                >
                                  <tr>
                                    <td
                                      :colspan="columns"
                                      class="table-info text-center bold py-2"
                                    >
                                      {{ role.key }}
                                    </td>
                                  </tr>

                                  <tr
                                    v-for="user in role.value"
                                    :key="user.user.id"
                                  >
                                    <td>{{ user.user.name }}</td>

                                    <!-- print minutes of each day for each user -->
                                    <td
                                      v-for="day in 7"
                                      :key="day"
                                      class="text-white text-center"
                                      :class="{
                                        'bg-primary': isMoreThanOneHour(
                                          user.days[day] ?? 0,
                                        ),

                                        'bg-danger': !isMoreThanOneHour(
                                          user.days[day] ?? 0,
                                        ),
                                      }"
                                    >
                                      {{
                                        user.days[day]
                                          ? minutesToHoursAndMinutes(
                                              user.days[day],
                                            )
                                          : 0
                                      }}
                                    </td>

                                    <!-- print total minutes of each user -->
                                    <td>
                                      {{
                                        user.minutes
                                          ? minutesToHoursAndMinutes(
                                              user.minutes,
                                            )
                                          : 0
                                      }}
                                    </td>

                                    <!-- print days that user worked less than one hour -->
                                    <td>
                                      {{
                                        calculateDaysLessThanOneHour(user.days)
                                      }}
                                    </td>
                                  </tr>

                                  <!-- print total of minutes in minutes format-->
                                  <tr>
                                    <td class="bold">المجموع بالدقائق</td>
                                    <td class="bold" :colspan="columns - 1">
                                      {{
                                        role.value
                                          ? calculateTotalMinutes(role.value) +
                                            " دقيقة"
                                          : 0
                                      }}
                                    </td>
                                  </tr>

                                  <!-- print total of minutes in hours format-->
                                  <tr>
                                    <td class="bold">المجموع بالساعات</td>
                                    <td class="bold" :colspan="columns - 1">
                                      {{
                                        role.value
                                          ? minutesToHoursAndMinutes(
                                              calculateTotalMinutes(role.value),
                                            )
                                          : 0
                                      }}
                                    </td>
                                  </tr>
                                </template>
                              </tbody>
                            </table>
                            <hr />
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
  </div>
</template>
<script>
import GeneralConversationService from "@/API/services/general-conversation.service";
import helper from "@/utilities/helper";
import { MONTHS_NUMBERS } from "@/utilities/constants";

export default {
  name: "WorkingHoursStats",
  async created() {
    await this.getStatistics();
  },
  mounted() {
    const date = new Date();
    const { year, month } = helper.getMonthAndYear(date);
    const monthYear = `${year}-${month}`;

    this.selectedMonthYear = monthYear;
  },
  data() {
    return {
      lastWeek: null,
      workingHours: [],
      selectedMonth: new Date().getMonth() + 1,
      minutesOfSelectedMonth: 0,
      loading: false,
      columns: 10,
      selectedMonthYear: "",
    };
  },
  computed: {
    monthTitle() {
      const { month } = helper.getMonthAndYear(this.selectedMonthYear);

      return MONTHS_NUMBERS[month];
    },
  },
  watch: {
    selectedMonthYear() {
      this.getStatistics();
    },
  },
  methods: {
    ...helper,
    async getStatistics() {
      this.loading = true;

      try {
        const response =
          await GeneralConversationService.getWorkingHoursStatistics(
            this.selectedMonthYear,
          );

        const data = response.data;
        this.lastWeek = data.lastWeek;
        this.workingHours = data.workingHours;
        this.minutesOfSelectedMonth = data.minutesOfSelectedMonth
          ? this.minutesToHoursAndMinutes(data.minutesOfSelectedMonth)
          : 0;
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loading = false;
      }
    },

    calculateTotalMinutes(values) {
      return values.reduce((acc, curr) => acc + curr.minutes, 0);
    },

    isMoreThanOneHour(minutes) {
      return minutes >= 60;
    },

    calculateDaysLessThanOneHour(days) {
      //skip the  first day if it is less than one hour

      let daysLessThanOneHour = 0;

      for (let i = 1; i <= 7; i++) {
        if (!days[`0${i}`] || (days[`0${i}`] && days[`0${i}`] < 60)) {
          daysLessThanOneHour++;
        }
      }

      return --daysLessThanOneHour;
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
