<template>
  <div class="mt-3 d-flex align-content-start flex-wrap">
    <small class="ms-2 me-2">
      <span class="align-middle material-symbols-outlined"> timer </span>
      <vue-countdown
        v-if="timer > 0"
        :time="timer"
        v-slot="{ hours, minutes, seconds }"
        @end="onTimerEnd"
      >
        <span class="align-middle text-danger">
          {{ pad(hours) }}:{{ pad(minutes) }}:{{ pad(seconds) }}
        </span>
      </vue-countdown>
      <span v-else class="align-middle text-danger">متأخر</span>
    </small>

    <small class="ms-2 me-2">
      <span class="align-middle material-symbols-outlined">
        calendar_month
      </span>
      {{ formatFullDate(question.created_at) }}
    </small>
    <small class="ms-2 me-2">
      <span
        class="align-middle material-symbols-outlined"
        :class="isWarning ? 'text-warning' : 'text-success'"
      >
        {{ isWarning ? "warning" : "task_alt" }}
      </span>
      {{ getStatusText() }}
    </small>
    <small class="ms-2 me-2">
      <span class="align-middle material-symbols-outlined"> person_check </span>
      <span style="font-weight: bold">المسؤول</span>
      {{ question.assignee.name }}
    </small>

    <small class="ms-2 me-2">
      <span class="align-middle material-symbols-outlined"> diversity_4 </span>
      <span style="font-weight: bold">الفريق الإداري</span>
      {{ question.management_team.group.name }}
    </small>
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
    this.startTime = new Date(this.question?.created_at);
    //add 12 hours to the start time
    this.startTime.setHours(this.startTime.getHours() + 12);
    console.log(this.startTime);

    const riyadh = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Riyadh",
    });
    this.now = new Date(riyadh);
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
    onTimerEnd: {
      type: Function,
      required: true,
    },
  },
  computed: {
    timer() {
      return this.startTime - this.now;
    },
  },
  methods: {
    ...helper,
    getStatusText() {
      switch (this.question?.status) {
        case "open": {
          return "لم يتم الحل";
        }
        case "solved":
          return "تم الحل في: " + this.formatFullDate(this.question.closed_at);
        case "discussion": {
          return "مفتوح للنقاش";
        }
        default:
          return "غير معروف";
      }
    },

    pad(value) {
      return value < 10 ? `0${value}` : value;
    },
  },
};
</script>
