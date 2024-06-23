<template lang="">
  <div
    class="mt-3 d-flex align-content-start flex-wrap"
    style="position: relative"
  >
    <span
      role="button"
      @click="showUserInfo = !showUserInfo"
      class="align-middle material-symbols-outlined text-danger"
      v-click-outside="onClickOutside"
    >
      info
    </span>

    <div
      :class="`dropdown-menu dropdown-menu-right ${showUserInfo ? 'show' : ''}`"
      aria-labelledby="user-info-menu"
      style="top: 30px"
    >
      <div
        class="d-flex gap-1 align-items-center p-2"
        v-for="parent in question.user_parents"
        :key="parent.role"
      >
        <span>
          <strong> {{ parent.role }} </strong>
        </span>

        <span>
          {{ parent.name + " " + parent.last_name }}
        </span>
      </div>
    </div>

    <button
      v-if="
        (question.user.id === auth.id || advisorAndAbove) &&
        question.status === 'open'
      "
      class="bg-primary rounded badge text-white border-0 ms-1 me-1"
      @click="solveQuestion"
      :disabled="loadingSolve"
    >
      <img
        v-if="loadingSolve"
        :src="require('@/assets/images/gif/page-load-loader.gif')"
        alt="loader"
        style="height: 20px"
      />
      <span v-else> انتهاء </span>
    </button>
    <button
      v-if="
        question.assignee.id === auth.id &&
        !isAssigneeAdmin &&
        question.status === 'open'
      "
      class="bg-dark rounded badge text-white border-0 ms-1 me-1"
      @click="assignToParent"
    >
      <img
        v-if="loadingAssign"
        :src="require('@/assets/images/gif/page-load-loader.gif')"
        alt="loader"
        style="height: 20px"
      />
      <span v-else> رفع إلى المسؤول </span>
    </button>

    <tooltip
      tag="span"
      class="text-muted small"
      tooltipPlacement="bottom"
      data-bs-toggle="tooltip"
      title="بين المؤسس وجميع المستشارين والموجهين"
    >
      <button
        v-if="consultantAndAbove && question.status === 'open'"
        class="bg-info rounded badge text-white border-0 ms-1 me-1"
        @click="moveToDiscussion('public')"
        :disabled="loadingDiscussion"
      >
        <img
          v-if="loadingDiscussion"
          :src="require('@/assets/images/gif/page-load-loader.gif')"
          alt="loader"
          style="height: 20px"
        />
        <span v-else> نقاش عام </span>
      </button>
    </tooltip>

    <tooltip
      tag="span"
      class="text-muted small"
      tooltipPlacement="bottom"
      data-bs-toggle="tooltip"
      title="بين المستشار وموجهيه"
    >
      <button
        v-if="consultantAndAbove && question.status === 'open'"
        class="bg-black rounded badge text-white border-0 ms-1 me-1"
        @click="moveToDiscussion('private')"
        :disabled="loadingDiscussion"
      >
        <img
          v-if="loadingDiscussion"
          :src="require('@/assets/images/gif/page-load-loader.gif')"
          alt="loader"
          style="height: 20px"
        />
        <span v-else> نقاش خاص </span>
      </button>
    </tooltip>

    <tooltip
      tag="span"
      class="text-muted small"
      tooltipPlacement="bottom"
      data-bs-toggle="tooltip"
      title="بين المؤسس وجميع المستشارين"
    >
      <button
        v-if="consultantAndAbove && question.status === 'open'"
        class="bg-gray rounded badge text-white border-0 ms-1 me-1"
        @click="moveToDiscussion('administrative')"
        :disabled="loadingDiscussion"
      >
        <img
          v-if="loadingDiscussion"
          :src="require('@/assets/images/gif/page-load-loader.gif')"
          alt="loader"
          style="height: 20px"
        />
        <span v-else> نقاش إداري </span>
      </button>
    </tooltip>

    <button
      v-if="consultantAndAbove && question.status === 'discussion'"
      class="bg-info rounded badge text-white border-0 ms-1 me-1"
      @click="moveToQuestions"
      :disabled="loadingDiscussion"
    >
      <img
        v-if="loadingDiscussion"
        :src="require('@/assets/images/gif/page-load-loader.gif')"
        alt="loader"
        style="height: 20px"
      />
      <span v-else> إعادة </span>
    </button>
  </div>
</template>
<script>
import GeneralConversationService from "@/API/services/general-conversation.service";
import vClickOutside from "click-outside-vue3";
import userInfoService from "@/Services/userInfoService";
import helper from "@/utilities/helper";
import { getErrorMessage } from "@/utilities/errors";

export default {
  name: "QuestionActions",
  data() {
    return {
      loadingSolve: false,
      loadingClose: false,
      loadingAssign: false,
      loadingDiscussion: false,
      showUserInfo: false,
    };
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  inject: ["question", "updateQueryParams"],
  computed: {
    auth() {
      return this.$store.getters.getUser;
    },
    isAuthAdmin() {
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
    isAssigneeAdmin() {
      return userInfoService.hasRole(this.question.assignee, "admin");
    },
  },
  methods: {
    ...helper,
    onClickOutside() {
      this.showUserInfo = false;
    },

    async solveQuestion() {
      if (this.loadingSolve) {
        return;
      }
      this.loadingSolve = true;
      try {
        await GeneralConversationService.solveQuestion(this.question.id);
        this.toggleToast("تم إغلاق التحويل", "success");

        //reload the window
        setTimeout(() => {
          location.reload();
        }, 1000);
      } catch (error) {
        this.toggleToast(getErrorMessage(error), "error");
      } finally {
        this.loadingSolve = false;
      }
    },

    async assignToParent() {
      if (this.loadingAssign) {
        return;
      }
      this.loadingAssign = true;
      try {
        await GeneralConversationService.assignToParent(this.question.id);

        this.toggleToast("تم تعيين التحويل للمشرف", "success");

        setTimeout(() => {
          this.updateQueryParams({
            keyword: "my-assigned-to-parent-questions",
          });
        }, 1000);
      } catch (error) {
        this.toggleToast(getErrorMessage(error), "error");
      } finally {
        this.loadingAssign = false;
      }
    },

    async moveToDiscussion(type) {
      if (this.loadingDiscussion) {
        return;
      }
      this.loadingDiscussion = true;

      const types = {
        public: "نقاش العام",
        private: "نقاش الخاص",
        administrative: "نقاش الإداري",
      };

      try {
        await GeneralConversationService.moveToDiscussion(
          this.question.id,
          type,
        );
        this.toggleToast("تم نقل التحويل لل" + types[type], "success");

        setTimeout(() => {
          this.updateQueryParams({
            keyword: "discussion-questions",
            discussion_type: type,
          });
        }, 1000);
      } catch (error) {
        this.toggleToast(getErrorMessage(error), "error");
      } finally {
        this.loadingDiscussion = false;
      }
    },

    async moveToQuestions() {
      if (this.loadingDiscussion) {
        return;
      }
      this.loadingDiscussion = true;
      try {
        await GeneralConversationService.moveToQuestions(this.question.id);
        this.toggleToast("تم نقل التحويل للأسئلة", "success");

        setTimeout(() => {
          this.updateQueryParams({ keyword: "my-questions" });
        }, 1000);
      } catch (error) {
        this.toggleToast(getErrorMessage(error), "error");
      } finally {
        this.loadingDiscussion = false;
      }
    },
  },
};
</script>
<style lang=""></style>
