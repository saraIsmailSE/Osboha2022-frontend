<template>
  <div class="card card-block card-stretch card-height blog">
    <div class="card-body">
      <div class="accordion-item mb-3">
        <QuestionHeader />
        <div
          :id="'collapse' + question.id"
          class="accordion-collapse collapse"
          aria-labelledby="heading1"
          data-bs-parent="#questions-accordion"
        >
          <div class="accordion-body">
            <QuestionMedia />

            <Answers />

            <QuestionStat :onTimerEnd="onTimerEnd" />

            <QuestionActions />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QuestionHeader from "@/components/conversation/QuestionHeader.vue";
import QuestionStat from "@/components/conversation/QuestionStat.vue";
import QuestionMedia from "@/components/conversation/QuestionMedia.vue";
import QuestionActions from "@/components/conversation/QuestionActions.vue";
import Answers from "@/components/conversation/Answers.vue";
import helper from "@/utilities/helper";

export default {
  name: "Question",
  components: {
    QuestionStat,
    Answers,
    QuestionMedia,
    QuestionActions,
    QuestionHeader,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  provide() {
    return {
      question: this.question,
    };
  },
};
</script>
<style scoped>
.rtl {
  direction: rtl;
  text-align: start;
}
</style>
