<template>
  <div ref="listContainer">
    <Post
      v-for="post in announcements"
      :key="post.id"
      :post="post"
      @incrementCommentsCount="incrementCommentsCount"
      :byAuth="auth_id === post.user.id"
    />
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @incrementCommentsCount="incrementCommentsCount"
      :byAuth="auth_id === post.user.id"
    />
    <div class="col-sm-12 text-center" v-if="loading">
      <img
        :src="require('@/assets/images/page-img/page-load-loader.gif')"
        alt="loader"
        style="height: 100px"
      />
    </div>
  </div>
</template>

<script>
import Post from "@/components/post/Post.vue";
import PostService from "@/API/services/post.service";
import userInfoService from "@/Services/userInfoService";

export default {
  name: "LazyLoadedPosts",
  components: {
    Post,
  },
  props: {
    timeline_id: {
      type: Number,
      default: null,
    },
    isMain: {
      type: Boolean,
      default: false,
    },
  },
  emits: {},
  data() {
    return {
      auth_id: null,
      posts: [],
      announcements: [],
      page: 1,
      totalPages: 1,
      loading: false,
      pendingRequest: false,
      errorMessage: "",
    };
  },
  computed: {
    hasMoreToLoad() {
      return this.page <= this.totalPages;
    },
  },
  async created() {},
  async mounted() {
    this.loadPosts();
    window.addEventListener("scroll", this.handleScroll);

    const userInfo = await userInfoService.getUser();
    this.auth_id = userInfo.user.id;

    console.log("[LazyLoadedPosts] mounted", this.auth_id);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    /**
     * Load posts from the API
     * @returns {Promise<void>}
     */
    async loadPosts() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;
      this.loading = true;

      try {
        let response;
        if (this.isMain) {
          response = await PostService.getPostsForMainPage(this.page);
          if (this.page == 1) {
            this.announcements = response.data.announcements;
          }
        } else {
          response = await PostService.postsByTimelineId(
            this.timeline_id,
            this.page
          );
        }
        this.posts = [...this.posts, ...response.data.posts];
        this.totalPages = response.data.last_page;
        this.page++;
      } catch (error) {
        console.log(error);
        this.errorMessage = "Something went wrong. Please try again later.";
      }

      this.loading = false;
      this.pendingRequest = false;
    },
    /**
     * Check if the user has scrolled to the bottom of the page
     * @returns {boolean}
     */
    isAtBottomOfPage() {
      const containerRect = this.$refs.listContainer.getBoundingClientRect();
      const containerBottom = containerRect.bottom;
      const windowHeight = window.innerHeight;
      return containerBottom <= windowHeight;
    },
    /*
     * Load more posts when the user scrolls to the bottom of the page
     */
    handleScroll() {
      if (this.hasMoreToLoad && this.isAtBottomOfPage()) {
        this.loadPosts();
      }
    },

    /**
     * Increment the comments count of a post
     * @param post_id
     */
    incrementCommentsCount(post_id) {
      let post;
      post = this.posts.find((post) => post.id == post_id);
      if (!post) post = this.announcements.find((post) => post.id == post_id);
      post.comments_count++;
    },
  },
};
</script>
