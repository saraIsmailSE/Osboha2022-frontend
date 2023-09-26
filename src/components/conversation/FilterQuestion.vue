<template>
  <div class="my-2 d-flex align-content-start flex-wrap">
    <button
      class="bg-primary rounded badge text-white border-0 ms-1 me-1"
      @click="filterQuestions('all')"
    >
      الكل
    </button>

    <button
      class="bg-dark rounded badge text-white border-0 ms-1 me-1"
      @click="filterQuestions('my-questions')"
    >
      أسئلتي
    </button>

    <button
      class="bg-danger rounded badge text-white border-0 ms-1 me-1"
      @click="filterQuestions('assigned-to-me')"
    >
      معينة لي
    </button>
  </div>
</template>
<script>
export default {
  name: "FilterQuestion",
  props: {
    filterQuestions: {
      type: Function,
      required: true,
    },
  },
};
</script>
