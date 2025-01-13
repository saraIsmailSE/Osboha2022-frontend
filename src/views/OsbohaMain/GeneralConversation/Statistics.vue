<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <div class="header-title rounded">
              <h4
                class="card-title bg-primary text-white text-center px-2 py-3 rounded"
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
                <div class="masonary-menu filter-button-group">
                  <StatsFilterType :type="type" @changeType="changeType" />

                  <StatsDateFilter
                    v-if="type"
                    :selectedWeek="selectedWeek"
                    v-model:monthYear="selectedMonthYear"
                    :weeks="weeks"
                    :months="months"
                    :type="type"
                    @changeWeek="changeWeek"
                  />
                </div>

                <div class="col-12 col-md-12 col-lg-12 mt-3">
                  <div class="card">
                    <!-- <div class="card-title pt-3">
                      <h3 class="text-center">
                        {{ monthTitle ?? selectedWeekData?.title }}
                      </h3>
                    </div> -->
                    <div class="card-body">
                      <div class="mt-2" v-if="!statistics?.length">
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
                        <!-- <div class="card-body"> -->
                        <div class="blog-description">
                          <template v-if="isAdmin">
                            <h3 class="mb-2 bold">المسؤول</h3>
                            <StatsTable
                              :statistics="adminStatistics"
                              :showTotals="false"
                              appendClass="mb-4"
                            />
                          </template>

                          <h3 class="mb-2 bold" v-if="isAdmin">المستشارين</h3>
                          <StatsTable :statistics="statistics" />

                          <template v-if="isAdmin">
                            <h3 class="mb-2 mt-4 bold">الموجهين</h3>
                            <StatsTable :statistics="advisorsStatistics" />
                          </template>
                        </div>
                        <!-- </div> -->
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
import userInfoService from "@/Services/userInfoService";
import StatsFilterType from "@/components/conversation/statistics/StatsFilterType.vue";
import StatsDateFilter from "@/components/conversation/statistics/StatsDateFilter.vue";
import StatsTable from "@/components/conversation/statistics/StatsTable.vue";

export default {
  name: "GeneralConversationStatistics",
  components: {
    StatsFilterType,
    StatsDateFilter,
    StatsTable,
  },
  async created() {
    const queryParams = this.$route.query;

    //fill type, week, monthYear
    if (!queryParams.type) {
      this.type = "week";
    } else {
      this.type = queryParams.type;
    }

    if (queryParams.week) {
      this.selectedWeek = queryParams.week;
    }

    if (queryParams.monthYear) {
      this.selectedMonthYear = queryParams.monthYear;
    }
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
      advisorsStatistics: [],
      adminStatistics: [],
    };
  },
  computed: {
    selectedWeekData() {
      return this.weeks?.find((week) => week.id === Number(this.selectedWeek));
    },

    totals() {
      return this.getTotals(this.statistics);
    },

    advisorsTotals() {
      return this.getTotals(this.advisorsStatistics);
    },

    auth() {
      return this.$store.getters.getUser;
    },

    isAdmin() {
      return userInfoService.hasRole(this.auth, "admin");
    },
  },
  watch: {
    selectedMonthYear() {
      this.getStatistics();
      this.$router.push({
        query: {
          week: this.selectedWeek,
          monthYear: this.selectedMonthYear,
          type: this.type,
        },
      });
    },
    selectedWeek() {
      this.getStatistics();
      this.$router.push({
        query: {
          week: this.selectedWeek,
          monthYear: this.selectedMonthYear,
          type: this.type,
        },
      });
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
        this.advisorsStatistics = data.advisorsStatistics;
        this.adminStatistics = data.adminStatistics;
        this.monthTitle = data.monthTitle;
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loading = false;
      }
    },

    getTotals(statistics) {
      const totals = {
        total_questions: 0,
        total_active_questions: 0,
        total_late_questions: 0,
        total_solved_questions: 0,
        total_questions_assigned_to_parent: 0,
      };

      if (!statistics || statistics.length == 0) return totals;

      statistics.forEach((stats) => {
        totals.total_questions += stats.total_questions;
        totals.total_active_questions += stats.total_active_questions;
        totals.total_late_questions += stats.total_late_questions;
        totals.total_solved_questions += stats.total_solved_questions;
        totals.total_questions_assigned_to_parent +=
          stats.total_questions_assigned_to_parent;
      });

      return totals;
    },

    changeType(type) {
      this.type = type;
    },

    changeWeek(week) {
      this.selectedWeek = week;
    },
  },
};
</script>
<style scoped>
.bold {
  font-weight: bold;
}
</style>
