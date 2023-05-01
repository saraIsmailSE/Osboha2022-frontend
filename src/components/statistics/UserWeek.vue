<template>
  <!-- ########## START THSES AND QUOTES  ########## -->
  <div class="col-12">
    <div class="card card-block card-stretch card-height">
      <div class="card-header">
        <div class="d-flex justify-content-between flex-wrap">
          <h4 class="card-title">الأطروحات والاقتباسات</h4>
          <div class="dropdown w-100">
            <select
              class="form-select"
              @change="userWeekAchievement()"
              v-model="weekAchievementFilter"
            >
              <option class="dropdown-item" value="current" selected>
                هذا الأسبوع
              </option>
              <option class="dropdown-item" value="previous">
                الاسبوع السابق
              </option>
              <option class="dropdown-item" value="in_a_month">
                خلال الشهر
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="card-body">
        <PieChart :data="pie_data" :options="pie_options" v-if="week_mark" />
        <div class="d-flex justify-content-center align-items-center" v-else>
          <h4 class="text-muted">
            لا يوجد أطروحات لهذا
            <span v-if="weekAchievementFilter == 'in_a_month'">الشهر</span>
            <span v-else>الأسبوع</span>
          </h4>
        </div>
      </div>
    </div>
  </div>
  <!-- ########## END THSES AND QUOTES  ########## -->
</template>

<script>
import PieChart from "../Charts/PieChart.vue";
import Marks from "@/API/services/marks.service";

export default {
  name: "UserWeekStatistics",
  created() {
    //week mark
    this.week_mark = this.weekMark;
  },
  props: {
    weekMark: {
      type: [Object],
      required: true,
    },
  },
  components: {
    PieChart,
  },
  data() {
    return {
      week_mark: null,
      weekAchievementFilter: "current",
      pie_options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    /**
     * get user week Achievement.
     * @return week Achievement
     */
    async userWeekAchievement() {
      try {
        const response = await Marks.userWeekAchievement(
          this.$route.params.user_id,
          this.weekAchievementFilter
        );
        console.log(
          "[UserWeek.vue] userWeekAchievement() response: ",
          response
        );
        this.week_mark = response ? response.week_mark : null;
      } catch (e) {
        console.log("[UserWeek.vue] userWeekAchievement() error: ", e);
      }
    },
  },
  computed: {
    week_title() {
      return this.statistics.week.title;
    },
    pie_data() {
      let data = {
        labels: ["الأطروحات", "الاقتباسات"],
        datasets: [
          {
            backgroundColor: ["#278036", "#1D1A55"],
            data: [],
          },
        ],
      };
      //Pie Chart [for theses and qoutes]

      if (this.week_mark) {
        data.datasets[0].data[0] = this.week_mark.total_thesis;
        data.datasets[0].data[1] = this.week_mark.total_screenshot;
      }

      return data;
    },
  },
};
</script>
