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
                  <select class="form-select" v-model="selectedMonth">
                    <option value="" selected>اختر الشهر</option>
                    <option
                      v-for="month in objectToArray(monthsOptions)"
                      :key="month.key"
                      :value="month.key"
                    >
                      {{ month.value }}
                    </option>
                  </select>
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
                            <table class="table w-100">
                              <thead>
                                <tr>
                                  <th scope="col">الاسم</th>
                                  <th scope="col">مجموع الساعات</th>
                                </tr>
                              </thead>
                              <tbody>
                                <template
                                  v-for="role in objectToArray(workHour)"
                                  :key="role.key"
                                >
                                  <tr>
                                    <td
                                      colspan="3"
                                      class="text-center bold text-primary py-3"
                                    >
                                      {{ role.key }}
                                    </td>
                                  </tr>

                                  <tr
                                    v-for="user in role.value"
                                    :key="user.user.id"
                                  >
                                    <td>{{ user.user.name }}</td>
                                    <td>
                                      {{
                                        user.minutes
                                          ? minutesToHoursAndMinutes(
                                              user.minutes,
                                            )
                                          : 0
                                      }}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td class="bold">المجموع</td>
                                    <td class="bold">
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
    console.log(this.monthsOptions);
  },

  data() {
    return {
      lastWeek: null,
      workingHours: [],
      selectedMonth: new Date().getMonth() + 1,
      minutesOfSelectedMonth: 0,
      loading: false,
      currentMonth: new Date().getMonth() + 1,
    };
  },
  computed: {
    monthTitle() {
      return MONTHS_NUMBERS[this.selectedMonth];
    },
    monthsOptions() {
      // return MONTHS_NUMBERS that are less than current month or equal to it as object
      const newObject = {};

      for (let i = 1; i <= this.currentMonth; i++) {
        newObject[i] = MONTHS_NUMBERS[i];
      }

      return newObject;
    },
  },
  watch: {
    selectedMonth() {
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
            this.selectedMonth,
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

    objectToArray(object) {
      return Object.entries(object).map(([key, value]) => ({
        key,
        value,
      }));
    },

    calculateTotalMinutes(values) {
      return values.reduce((acc, curr) => acc + curr.minutes, 0);
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
