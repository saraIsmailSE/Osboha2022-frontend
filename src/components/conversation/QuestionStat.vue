<template>
  <div class="mt-3 d-flex align-content-start flex-wrap">
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
      <span class="align-middle material-symbols-outlined"> forum </span>
      {{
        question.answers.length > 0
          ? `${question.answers.length} إجابات`
          : "لا يوجد إجابات"
      }}
    </small>
    <small
      class="ms-2 me-2"
      v-for="parent in question.user_parents"
      :key="parent.role"
    >
      <span class="align-middle material-symbols-outlined"> person_check </span>
      <span style="font-weight: bold">{{ `${parent.role}:` }}</span>
      {{ parent.name }}
    </small>
  </div>
</template>
<script>
import helper from "@/utilities/helper";
export default {
  name: "QuestionStat",
  data() {
    return {
      isWarning: false,
    };
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getStatusText() {
      switch (this.question?.status) {
        case "open": {
          const { hours } = helper.getDifferenceBetweenDates(
            this.question.created_at,
            new Date(),
          );

          if (hours >= 48) {
            this.isWarning = true;
            return "مفتوح لأكثر من يومين";
          }

          return "لم يتم الحل";
        }
        case "closed":
          // return "مغلق بسبب عدم الاستجابة";
          return "مغلق";
        case "solved": {
          this.isWarning = false;
          const { hours } = helper.getDifferenceBetweenDates(
            this.question.created_at,
            this.question.updated_at,
          );

          if (hours <= 12) {
            return "تم الحل خلال 12 ساعة";
          }
          return "تم الحل بعد أكثر من 12 ساعة";
        }
        default:
          return "غير معروف";
      }
    },
  },
};
</script>
