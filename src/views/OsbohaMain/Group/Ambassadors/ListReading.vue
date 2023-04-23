<template>
  <div>
    <div class="col-sm-12 mt-3">
      <iq-card class="iq-card">
        <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
          <h3
            class="text-center mt-3 mb-3"
            style="direction: rtl"
            v-if="mark && week"
          >
            {{ mark.user.name }} - الأسبوع {{ week.title }}
          </h3>
        </div>
        <div class="iq-card-body p-3">
          <AchievementCard v-if="mark" :mark="mark" :group="group" />
          <div class="d-flex align-items-center mt-3">
            <Check :theses="theses" />
          </div>

          <count-down v-if="week" :week="week" :timer_type="'main_timer'" />

          <div class="d-flex align-items-center mt-3 row">
            <!-- <div class="alert alert-danger text-center" role="alert">
              لا يمكنك الاعتماد لأن الأسبوع انتهى
            </div> -->
            <div class="d-flex align-items-center mt-3 row">
              <div class="d-inline-block w-100 text-center col-12">
                <a
                  role="button"
                  @click="$router.go(-1)"
                  class="d-block mt-3 mb-3 w-75 mx-auto"
                >
                  <span>عودة</span>
                  <span class="align-middle material-symbols-outlined">
                    keyboard_return
                  </span>
                </a>
              </div>
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

export default {
  name: "List Reading",
  async created() {
    try {
      const response = await MarkService.ambassadorMark(
        this.$route.params.ambassador_id
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
    } catch (error) {
      console.log(error);
    }
  },

  components: {
    Check,
    AchievementCard,
    CountDown,
  },

  data() {
    return {
      theses: [],
      group: null,
      week: null,
      mark: null,
    };
  },
};
</script>
