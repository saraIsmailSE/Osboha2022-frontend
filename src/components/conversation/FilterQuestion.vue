<template>
  <div class="my-2 d-flex align-content-start flex-wrap gap-2">
    <button
      class="bg-primary rounded badge text-white border-0"
      @click="filterQuestions('my-questions')"
    >
      تحويلاتي
    </button>

    <button
      class="bg-dark rounded badge text-white border-0"
      @click="filterQuestions('my-active-questions')"
    >
      تحويلاتي فعالة
    </button>

    <button
      class="bg-danger rounded badge text-white border-0"
      @click="filterQuestions('my-late-questions')"
    >
      تحويلات متأخرة
    </button>

    <button
      v-if="consultantAndAbove"
      class="bg-info rounded badge text-white border-0"
      @click="filterQuestions('discussion-questions')"
    >
      نقاش إداري
    </button>

    <button
      v-if="advisorAndAbove"
      class="bg-warning rounded badge text-white border-0"
      @click="filterQuestions('all')"
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
  computed: {
    auth() {
      return this.$store.getters.getUser;
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
