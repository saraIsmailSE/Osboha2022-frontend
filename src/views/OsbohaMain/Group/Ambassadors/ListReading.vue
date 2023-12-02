<template>
  <div>
    <div class="col-sm-12 mt-3">
      <count-down v-if="week" :week="week" :timer_type="'modify_timer'" />
      <iq-card class="iq-card" v-if="mark">
        <div class="iq-card-body p-3">
          <AchievementCard :mark="mark" :group="group" />
          <div class="d-flex align-items-center mt-3">
            <Check :theses="theses" />
          </div>

          <!--Support-->
          <Support :expired="expired" :support="support" :supportMark="mark?.support" :week="week"
            @updateSupportMark="updateSupportMark" />


          <div class="col-12" v-if="!expired">
            <div class="card card-block card-stretch card-height blog">
              <div class="card-header">
                <h2>اجراءات أخرى</h2>
              </div>
              <OtherActions :user="user"/>
            </div>
          </div>


          <div class="d-flex align-items-center mt-3 row">
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
import AchievementCard from "@/components/book/theses/achievement-card.vue";
import Check from "@/components/book/theses/check.vue";
import MarkService from "@/API/services/marks.service";
import CountDown from "@/components/timer/Countdown.vue";
import Support from "@/components/book/support/Support.vue";
import OtherActions from "@/components/group/OtherActions";
import helper from "@/utilities/helper";

export default {
  name: "List Reading",
  components: {
    Check,
    AchievementCard,
    CountDown,
    Support,
    OtherActions
  },
  data() {
    return {
      theses: [],
      support: null,
      group: null,
      week: null,
      mark: null,
      loader: false,
      message: null,
      date: null,
      now: null,
      expired: true,
    };
  },
  async created() {
    try {
      const response = await MarkService.ambassadorMark(
        this.$route.params.ambassador_id, this.$route.params.week_id
      );

      this.mark = response.mark;
      this.theses = response.theses.reduce((groupByBook, item) => {
        const group = groupByBook[item.book.name] || [];
        group["title"] = item.book.name;
        group.push(item);
        groupByBook[item.book.name] = group;
        return groupByBook;
      }, {});
      this.group = response.group;
      this.week = response.currentWeek;
      this.support = response.support;

      const riyadh = new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" });
      this.now = new Date(riyadh);
      this.date = new Date(this.week.modify_timer);
      this.expired = this.time < 0;

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
    updateSupportMark(mark) {
      this.mark.support = mark;
    },
  },
  computed: {
    time() {
      return this.date - this.now;
    },

  },
};
</script>
