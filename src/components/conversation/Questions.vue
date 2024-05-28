<template>
  <div class="accordion" id="questions-accordion">
    <div class="cols" v-for="question in questions" :key="question.id">
      <Question :question="question" />
    </div>
  </div>
</template>
<script>
import Question from "@/components/conversation/Question.vue";

export default {
  name: "Questions",
  components: {
    Question,
  },
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
.rtl {
  direction: rtl;
  text-align: start;
}
</style>
