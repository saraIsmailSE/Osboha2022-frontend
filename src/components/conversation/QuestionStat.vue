<template>
  <div class="mt-3 d-flex align-content-start flex-wrap">
    <small class="ms-2 me-2">
      <span class="align-middle material-symbols-outlined"> task_alt </span>
      {{
        getStatusText(question.status, question.created_at, question.updated_at)
      }}
    </small>
    <small class="ms-2 me-2">
      <span class="align-middle material-symbols-outlined"> person_check </span>
      {{ question.assignee?.name }}
    </small>
    <small class="ms-2 me-2">
      <span class="align-middle material-symbols-outlined"> forum </span>
      {{
        question.answers.length > 0
          ? `${question.answers.length} إجابات`
          : "لا يوجد إجابات"
      }}
    </small>
  </div>
</template>
<script>
export default {
  name: "QuestionStat",
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getStatusText(status, created_at, updated_at) {
      switch (status) {
        case "open":
          return "لم يتم الحل";
        case "closed":
          return "مغلق بسبب عدم الاستجابة";
        case "solved": {
          const createdDate = new Date(created_at);
          const updatedDate = new Date(updated_at);
          const diffTime = Math.abs(updatedDate - createdDate);
          const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

          if (diffHours <= 12) {
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
