<template>
  <div class="accordion" id="questions-accordion">
    <div class="cols" v-for="question in questions" :key="question.id">
      <Question :question="question" />
    </div>
  </div>
</template>
<script>
import AddAnswer from "@/components/conversation/AddAnswer.vue";
import QuestionStat from "@/components/conversation/QuestionStat.vue";
import Question from "@/components/conversation/Question.vue";
import helper from "@/utilities/helper";
import userInfoService from "@/Services/userInfoService";
import GeneralConversationService from "@/API/services/general-conversation.service";

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
