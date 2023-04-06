<template>
  <div class="total-comment-block">
    <div
      :class="{
        dropdown: post.comments_count > 0,
      }"
    >
      <span
        class="dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        role="button"
        @mouseover="getCommentsUsers"
        @click.prevent="$emit('showCommentModel')"
      >
        {{ commentsCount }}
      </span>
      <div class="dropdown-menu">
        <div class="dropdown-item text-center" v-if="commentsUsersLoading">
          <img
            :src="require('@/assets/images/page-img/page-load-loader.gif')"
            alt="loader"
            style="height: 50px"
          />
        </div>
        <router-link
          v-for="user in commentsUsers"
          :key="user.id"
          class="dropdown-item"
          :to="{
            name: 'user.profile',
            params: {
              user_id: user.id,
            },
          }"
          >{{ user.name }}</router-link
        >
        <p class="dropdown-item p-0 m-0 ms-2 mb-2" v-if="moreCommentsUsersText">
          {{ moreCommentsUsersText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import commentService from "@/API/services/comment.service";
import helper from "@/utilities/helper";

export default {
  name: "TotalComments",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  emits: ["showCommentModel"],
  data() {
    return {
      commentsUsers: [],
      totalCommentsUsers: 0,
      commentsUsersLoading: false,
    };
  },
  computed: {
    /**
     * @description returns the comments count with the correct plural form
     * @returns {string}
     */
    commentsCount() {
      return this.post.comments_count == 0
        ? "لا يوجد تعليقات"
        : this.post.comments_count +
            " " +
            (this.post.comments_count <= 10 && this.post.comments_count > 2
              ? "تعليقات"
              : "تعليق");
    },

    /**
     * @description returns the rest comments users count text
     * @returns {string}
     */
    moreCommentsUsersText() {
      const remainder = this.totalCommentsUsers - this.commentsUsers.length;
      const moreText = remainder === 1 ? "آخر" : "آخرين";
      return remainder > 0 ? `و +${remainder} ${moreText}` : "";
    },
  },
  methods: {
    /**
     * @description: get comments users to display them in the comment dropdown
     * @returns {void}
     */
    async getCommentsUsers() {
      if (this.post.comments_count <= 0) {
        return;
      }

      this.commentsUsersLoading = true;
      try {
        const response = await commentService.getPostCommentsUsers(
          this.post.id
        );

        if (response.statusCode !== 200) {
          helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
          return;
        }

        this.commentsUsers = response.data.users;
        this.totalCommentsUsers = response.data.count;
      } catch (error) {
        helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
      }

      this.commentsUsersLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
