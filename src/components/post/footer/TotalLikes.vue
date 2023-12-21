<template>
  <div class="d-flex align-items-center">
    <!--Users dropdown images that interacted with this post-->
    <div class="like-data">
      <div class="dropdown">
        <!-- <span
          class="dropdown-toggle text-primary"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          role="button"
        > -->
        <span
          class="text-primary"
          aria-haspopup="true"
          aria-expanded="false"
          role="button"
        >
          <font-awesome-icon :icon="['fas', 'thumbs-up']" size="lg" />
        </span>
        <!-- <div class="dropdown-menu py-2">
          <a
            class="ms-2 me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Like"
            ><img src="@/assets/images/icon/01.png" class="img-fluid" alt=""
          /></a>
          <a
            class="me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Love"
            ><img src="@/assets/images/icon/02.png" class="img-fluid" alt=""
          /></a>
          <a
            class="me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Happy"
            ><img src="@/assets/images/icon/03.png" class="img-fluid" alt=""
          /></a>
          <a
            class="me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="HaHa"
            ><img src="@/assets/images/icon/04.png" class="img-fluid" alt=""
          /></a>
          <a
            class="me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Think"
            ><img src="@/assets/images/icon/05.png" class="img-fluid" alt=""
          /></a>
          <a
            class="me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Sade"
            ><img src="@/assets/images/icon/06.png" class="img-fluid" alt=""
          /></a>
          <a
            class="me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Lovely"
            ><img src="@/assets/images/icon/07.png" class="img-fluid" alt=""
          /></a>
        </div> -->
      </div>
    </div>

    <!--total likes block-->
    <div class="total-like-block ms-2 me-3">
      <div
        :class="{
          dropdown: post.reactions_count > 0,
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
          <!-- <span aria-haspopup="true" aria-expanded="false" role="button"> -->
          {{ post.reactions_count }}
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
  </div>
</template>

<script>
import ReactionService from "@/API/services/reaction.service";
import helper from "@/utilities/helper";
export default {
  name: "TotalLikes",
  inject: ["post"],
  data() {
    return {
      reactions: [],
      users: [],
      totalUsers: 0,
      loading: false,
    };
  },
  computed: {
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
      if (this.post.reactions_count <= 0 || this.loading) {
        return;
      }

      this.loading = true;
      try {
        const response = await ReactionService.getPostReactionsUsers(
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
