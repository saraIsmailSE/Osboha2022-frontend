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
                إحصائيات التحويل العام
              </h4>
            </div>
          </div>
          <div class="card-body">
            <div class="col-sm-12 text-center" v-if="loading">
              <img src="@/assets/images/gif/loader-3.gif" alt="loader" />
            </div>

            <div class="col-12" v-else>
              <div class="row">
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
                      <div class="mt-2" v-if="!statistics.length">
                        <div
                          class="p-3 d-flex align-items-center justify-content-center"
                        >
                          <h5>
                            لا يوجد إحصائيات في هذا
                            {{ type == "week" ? "الأسبوع" : "الشهر" }}
                          </h5>
                        </div>
                      </div>
                      <div class="mt-2">
                        <div class="card-body">
                          <div class="blog-description">
                            <table class="table w-100 table-bordered">
                              <thead>
                                <tr class="py-3">
                                  <th scope="col">الاسم</th>
                                  <th scope="col">التحويلات</th>
                                  <th scope="col">التحويلات الفعالة</th>
                                  <th scope="col">التحويلات المجابة بعد 12س</th>
                                  <th scope="col">التحويلات المجابة</th>
                                  <th scope="col">التحويلات المرفوعة</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="statistic in statistics"
                                  :key="statistic.id"
                                >
                                  <td>{{ statistic.user.name }}</td>
                                  <td>{{ statistic.total_questions }}</td>
                                  <td>
                                    {{ statistic.total_active_questions }}
                                  </td>
                                  <td>
                                    {{
                                      statistic.total_solved_questions_after_12_hrs
                                    }}
                                  </td>
                                  <td>
                                    {{ statistic.total_solved_questions }}
                                  </td>
                                  <td>
                                    {{
                                      statistic.total_questions_assigned_to_parent
                                    }}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>المجموع</strong>
                                  </td>
                                  <td>
                                    <strong>
                                      {{ totals.total_questions }}
                                    </strong>
                                  </td>
                                  <td>
                                    <strong>
                                      {{ totals.total_active_questions }}
                                    </strong>
                                  </td>
                                  <td>
                                    <strong>
                                      {{
                                        totals.total_solved_questions_after_12_hrs
                                      }}
                                    </strong>
                                  </td>
                                  <td>
                                    <strong>
                                      {{ totals.total_solved_questions }}
                                    </strong>
                                  </td>
                                  <td>
                                    <strong>
                                      {{
                                        totals.total_questions_assigned_to_parent
                                      }}
                                    </strong>
                                  </td>
                                </tr>
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
  </div>
</template>
<script>
import GeneralConversationService from "@/API/services/general-conversation.service";
import helper from "@/utilities/helper";

export default {
  name: "GeneralConversationStatistics",
  async created() {
    await this.getStatistics();
  },
  data() {
    return {
      statistics: [],
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
    selectedWeekData() {
      return this.weeks?.find((week) => week.id === Number(this.selectedWeek));
    },

    totals() {
      const totals = {
        total_questions: 0,
        total_active_questions: 0,
        total_solved_questions_after_12_hrs: 0,
        total_solved_questions: 0,
        total_questions_assigned_to_parent: 0,
      };

      this.statistics.forEach((statistic) => {
        totals.total_questions += statistic.total_questions;
        totals.total_active_questions += statistic.total_active_questions;
        totals.total_solved_questions_after_12_hrs +=
          statistic.total_solved_questions_after_12_hrs;
        totals.total_solved_questions += statistic.total_solved_questions;
        totals.total_questions_assigned_to_parent +=
          statistic.total_questions_assigned_to_parent;
      });

      return totals;
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
        const response = await GeneralConversationService.getStatistics(
          this.type,
          this.type === "week" ? this.selectedWeek : this.selectedMonthYear,
        );

        const data = response.data;
        this.weeks = data.weeks;
        this.months = data.months;
        this.type = data.selectedType;
        this.selectedWeek = this.type === "week" ? data.selectedDate : "";
        this.selectedMonthYear = this.type === "month" ? data.selectedDate : "";
        this.statistics = data.statistics;
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
