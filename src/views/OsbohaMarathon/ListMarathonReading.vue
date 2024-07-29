<template>
  <div>
    <div class="col-sm-12 mt-3">
      <iq-card class="iq-card" v-if="mark">
        <div class="iq-card-body p-3">

          <!-- SUMMURY -->
          <MarathonAchievementCard :mark="mark" :group="group" />

          <!-- POINTS -->
          <div class="p-2">
            <div class="card-header">
              <h2>النقاط</h2>
            </div>
            <h4 class="mt-2">
              نقاط الاسبوع - {{ mark.week.title }}
              <p class="display-6" style="direction: rtl;">{{ points }} - نقطة</p>
            </h4>
          </div>

          <div class=" d-flex justify-content-end" v-if="current_marathon">
            <router-link :to="{
              name: 'marathon.points-detail',
              params: { user_id: this.$route.params.ambassador_id, marathon_id: current_marathon.id },
            }" class="btn btn-primary">
              عرض التفاصيل
            </router-link>
          </div>

          <!-- THESES -->
          <div class="d-flex align-items-center mt-3">
            <marathon_check :theses="theses" :can_edit="can_edit" />
          </div>

          <div class="d-flex align-items-center mt-3 row" v-if="can_edit">
            <div class="d-inline-block w-100 text-center col-12">
              <router-link v-if="group && week" :to="{
                name: 'group.ambassadors-reading',
                params: { group_id: group.id, week_id: week.id },
              }" class="d-block mt-3 mb-3 w-75 mx-auto">
                <span>إنجازات الفريق</span>
                <span class="align-middle material-symbols-outlined">
                  keyboard_return
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </iq-card>
    </div>
  </div>
</template>
<script>
import MarathonAchievementCard from "@/components/book/theses/marathon-achievement-card.vue";
import marathon_check from "@/components/book/theses/marathon_check.vue";
import MarkService from "@/API/services/marks.service";
import helper from "@/utilities/helper";
import OsbohaMarathon from "@/API/MarathonServices/osboha-marathon.service";
import MarathonPoints from "@/API/MarathonServices/marathon-points.service";

export default {
  name: "List Marathon Reading",
  components: {
    marathon_check,
    MarathonAchievementCard,
  },
  data() {
    return {
      theses: [],
      group: null,
      week: null,
      mark: null,
      loader: false,
      message: null,
      date: null,
      now: null,
      can_edit: true,
      points: null,
    };
  },
  async created() {
    try {
      this.current_marathon = await OsbohaMarathon.getCurrentMarathon();
      if (this.current_marathon) {
        this.points = await MarathonPoints.getSpecificMarathonWeekPoints(this.$route.params.ambassador_id, this.current_marathon.id, this.$route.params.week_id)
      }

      const response = await MarkService.marathonAmbassadorMark(
        this.$route.params.ambassador_id,
        this.$route.params.week_id,
      );

      this.mark = response.mark;

      this.theses = response.theses.reduce((groupByDay, item) => {
        const dayOfWeek = this.getDayOfWeek(item.created_at);

        const day = groupByDay[dayOfWeek] || [];
        day["day_title"] = item.book.name;
        day.push(item);
        groupByDay[dayOfWeek] = day;
        return groupByDay;
      }, {});
      this.group = response.group;
      this.week = response.currentWeek;
      this.can_edit = response.can_edit;

    } catch (error) {
      const res = error.response.data;
      if (res.statusCode === 401) {
        this.$router.push({ name: "NotAuthorized" });
      } else if (res.statusCode === 404) {
        this.$router.push({ name: "NotFound" });
      } else {
        helper.toggleToast("حدث خطأ ما", "error");
      }
    }
  },
  methods: {
    getDayOfWeek(dateString) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const date = new Date(dateString);
      return days[date.getDay()];
    }

  },
};
</script>