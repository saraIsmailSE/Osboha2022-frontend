<template>
  <div class="mt-3 d-flex align-content-start flex-wrap gap-2">
    <small v-if="timer > 0 || question.is_answered_late">
      <span class="align-middle material-symbols-outlined"> timer </span>
      <vue-countdown
        v-if="timer > 0"
        :time="timer"
        v-slot="{ hours, minutes, seconds }"
      >
        <span class="align-middle text-danger">
          {{ pad(hours) }}:{{ pad(minutes) }}:{{ pad(seconds) }}
        </span>
      </vue-countdown>
      <span v-else class="align-middle text-danger">متأخر</span>
    </small>

    <small>
      <span class="align-middle material-symbols-outlined">
        calendar_month
      </span>
      {{ formatFullDate(question.created_at) }}
    </small>
    <small>
      <span
        class="align-middle material-symbols-outlined"
        :class="isWarning ? 'text-warning' : 'text-success'"
      >
        {{ isWarning ? "warning" : "task_alt" }}
      </span>
      {{ statusText }}
    </small>
    <small>
      <span class="align-middle material-symbols-outlined"> person_check </span>
      <span style="font-weight: bold">المسؤول</span>
      {{ question.assignee.name }}
    </small>

    <template v-if="question.management_teams">
      <small
        class="bg-danger rounded-pill badge"
        v-if="question.management_teams.leaderTeam"
      >
        <span style="font-weight: bold">
          {{ question.management_teams.leaderTeam.title }}</span
        >
        {{ question.management_teams.leaderTeam.name }}
      </small>
      <small
        class="bg-primary rounded-pill badge"
        v-if="question.management_teams.ambassadorTeam"
      >
        <span style="font-weight: bold">
          {{ question.management_teams.ambassadorTeam.title }}</span
        >
        {{ question.management_teams.ambassadorTeam.name }}
      </small>
    </template>
  </div>
</template>
<script>
import helper from "@/utilities/helper";
import VueCountdown from "@chenfengyuan/vue-countdown";

export default {
  name: "QuestionStat",
  components: {
    VueCountdown,
  },
  data() {
    return {
      isWarning: false,
      startTime: null,
    };
  },
  created() {
    this.startTime = new Date(this.question?.current_assignee_created_at);
    //add 12 hours to the start time
    this.startTime.setHours(this.startTime.getHours() + 12);

    const riyadh = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Riyadh",
    });
    this.now = new Date(riyadh);
  },
  inject: ["question"],
  props: {
    is_late: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    timer() {
      if (this.question.status === "solved") {
        return 0;
      }
      return this.startTime - this.now;
    },
    statusText() {
      switch (this.question?.status) {
        case "open": {
          return "لم يتم الحل";
        }
        case "solved": 
          return this.formatFullDate(this.question.closed_at);
        case "discussion": {
          return "مفتوح للنقاش";
        }
        default:
          return "غير معروف";
      }
    },
  },
  methods: {
    ...helper,
    pad(value) {
      return value < 10 ? `0${value}` : value;
    },
  },
};
</script>
