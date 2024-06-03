<template>
  <div>
    <div class="col-sm-12 mt-3">
      <count-down v-if="week && can_edit" :week="week" :timer_type="'modify_timer'" />
      <iq-card class="iq-card" v-if="mark">
        <div class="iq-card-body p-3">
          <AchievementCard :mark="mark" :group="group" />
          <div class="d-flex align-items-center mt-3">
            <Check :theses="theses" :can_edit="can_edit" />
          </div>

          <!--Support-->
          <Support :expired="expired" :support="support" :supportMark="mark?.support" :week="week" :can_edit="can_edit"
            @updateSupportMark="updateSupportMark" />

          <!--Activities-->
          <Activities :expired="expired" :activities="activities" :graded="graded" :week="week" :can_edit="can_edit"
            @updateMark="updateMark" />

          <div class="col-12" v-if="!expired && can_edit">
            <div class="card card-block card-stretch card-height blog">
              <div class="card-header">
                <h2>اجراءات أخرى</h2>
              </div>
              <OtherActions :user="mark.user" />
            </div>
          </div>

          <Note :mark_id="mark.id" v-if="mark" />

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
import AchievementCard from "@/components/book/theses/achievement-card.vue";
import Check from "@/components/book/theses/check.vue";
import MarkService from "@/API/services/marks.service";
import CountDown from "@/components/timer/Countdown.vue";
import Support from "@/components/book/support/Support.vue";
import Activities from "@/components/book/activities/Activities";
import OtherActions from "@/components/group/OtherActions";
import Note from "@/components/user/Achievement/Note";
import helper from "@/utilities/helper";
import UserInfoService from "@/Services/userInfoService";

export default {
  name: "List Reading",
  components: {
    Check,
    AchievementCard,
    CountDown,
    Support,
    Activities,
    OtherActions,
    Note,
  },
  data() {
    return {
      theses: [],
      support: null,
      activities: null,
      graded: false,
      group: null,
      week: null,
      mark: null,
      loader: false,
      message: null,
      date: null,
      now: null,
      expired: true,
      can_edit: true,
    };
  },
  created() {
    this.initMark();

  },
  methods: {
    async initMark() {
      try {
        const response = await MarkService.ambassadorMark(
          this.$route.params.ambassador_id,
          this.$route.params.week_id,
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
        this.activities = response.activities.activities_post;
        this.graded = response.activities.graded;
        this.can_edit = response.can_edit;

        const riyadh = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Riyadh",
        });
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
    updateSupportMark(mark) {
      this.mark.support = mark;
    },
    updateMark() {
      this.initMark();
    }
  },
  computed: {
    time() {
      return this.date - this.now;
    },
    user() {
      return this.$store.getters.getUser;
    },
    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
    },
    SupervisorAndAbove() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
        "supervisor",
      ]);
    },
  },
};
</script>