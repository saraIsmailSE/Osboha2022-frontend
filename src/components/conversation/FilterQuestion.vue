<template>
  <div class="my-2 d-flex align-content-start flex-wrap gap-2">
    <button
      class="bg-primary rounded badge text-white border-0"
      @click="filterQuestions('my-questions')"
      :disabled="loadingQuestions"
    >
      تحويلاتي
    </button>

    <button
      class="bg-dark rounded badge text-white border-0"
      @click="filterQuestions('my-active-questions')"
      :disabled="loadingQuestions"
    >
      تحويلاتي فعالة
    </button>

    <button
      class="bg-secondary rounded badge text-white border-0"
      @click="filterQuestions('my-assigned-to-parent-questions')"
      :disabled="loadingQuestions"
      v-if="!isAdmin"
    >
      تحويلاتي مرفوعة
    </button>

    <button
      class="bg-danger rounded badge text-white border-0"
      @click="filterQuestions('my-late-questions')"
      :disabled="loadingQuestions"
    >
      تحويلات متأخرة
    </button>

    <button
      v-if="consultantAndAbove"
      class="bg-info rounded badge text-white border-0"
      @click="filterQuestions('discussion-questions')"
      :disabled="loadingQuestions"
    >
      نقاش إداري
    </button>

    <button
      v-if="advisorAndAbove"
      class="bg-warning rounded badge text-white border-0"
      @click="filterQuestions('all')"
      :disabled="loadingQuestions"
    >
      كافة التحويل العام
    </button>
  </div>
</template>
<script>
import userInfoService from "@/Services/userInfoService";

export default {
  name: "FilterQuestion",
  inject: ["filterQuestions"],
  props: {
    loadingQuestions: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    auth() {
      return this.$store.getters.getUser;
    },
    isAdmin() {
      return userInfoService.hasRole(this.auth, "admin");
    },
    consultantAndAbove() {
      return userInfoService.hasRoles(this.auth, ["admin", "consultant"]);
    },
    advisorAndAbove() {
      return userInfoService.hasRoles(this.auth, [
        "admin",
        "consultant",
        "advisor",
      ]);
    },
  },
};
</script>
<style scoped>
button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
