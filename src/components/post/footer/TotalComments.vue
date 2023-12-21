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
        @mouseover="getUsers"
        @click.prevent="showCommentModel"
      >
        {{ commentsCount }}
      </span>
      <div class="dropdown-menu">
        <div class="dropdown-item text-center" v-if="loading">
          <img
            :src="require('@/assets/images/gif/page-load-loader.gif')"
            alt="loader"
            style="height: 50px"
          />
        </div>
        <router-link
          v-for="user in users"
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
        <p class="dropdown-item p-0 m-0 ms-2 mb-2" v-if="moreUsersText">
          {{ moreUsersText }}
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
  inject: ["post", "showCommentModel"],
  data() {
    return {
      users: [],
      totalUsers: 0,
      loading: false,
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
    moreUsersText() {
      const remainder = this.totalUsers - this.users.length;
      const moreText = remainder === 1 ? "آخر" : "آخرين";
      return remainder > 0 ? `و +${remainder} ${moreText}` : "";
    },
  },
  methods: {
    /**
     * @description: get comments users to display them in the comment dropdown
     * @returns {void}
     */
    async getUsers() {
      if (this.post.comments_count <= 0 || this.loading) {
        return;
      }

      this.loading = true;
      try {
        const response = await commentService.getPostCommentsUsers(
          this.post.id
        );

        if (response.statusCode !== 200) {
          helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
        }

        this.users = response.data.users;
        this.totalUsers = response.data.count;
      } catch (error) {
        helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
