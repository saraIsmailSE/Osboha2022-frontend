<template>
  <!--total likes block-->
  <div class="total-comment-block ms-3" v-if="post.pollOptions.length > 0">
    <div
      :class="{
        dropdown: post.votes_count > 0,
      }"
    >
      <span
        class="dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        @mouseover="getUsers"
        role="button"
      >
        {{ votesCountText }}
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
import VoteService from "@/API/services/vote.service";
import helper from "@/utilities/helper";
export default {
  name: "TotalVotes",
  inject: ["post"],
  data() {
    return {
      users: [],
      totalUsers: 0,
      loading: false,
    };
  },
  computed: {
    /**
     * @description returns the rest votes users count text
     * @returns {string}
     */
    moreUsersText() {
      const remainder = this.totalUsers - this.users.length;
      const moreText = remainder === 1 ? "آخر" : "آخرين";
      return remainder > 0 ? `و +${remainder} ${moreText}` : "";
    },
    votesCountText() {
      return this.post.votes_count == 0
        ? "لا يوجد تصويتات"
        : this.post.votes_count +
            " " +
            (this.post.votes_count <= 10 && this.post.votes_count > 2
              ? "تصويتات"
              : "تصويت");
    },
  },
  methods: {
    /**
     * @description: get votes users to display them in the vote dropdown
     * @returns {void}
     */
    async getUsers() {
      if (this.post.votes_count <= 0 || this.loading) {
        return;
      }

      this.loading = true;
      try {
        const response = await VoteService.getPostVotesUsers(
          this.post.id,
          this.$route.params.user_id ?? ""
        );

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
