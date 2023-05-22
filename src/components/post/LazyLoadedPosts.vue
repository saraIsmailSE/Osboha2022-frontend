<template>
  <div ref="listContainer">
    <div
      class="d-flex align-items-center justify-content-center"
      v-if="emptyMessage && displayEmpty"
    >
      <div class="me-2">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" size="xl" />
      </div>
      <div>{{ emptyMessage }}</div>
    </div>
    <Post
      v-for="post in announcements"
      :key="post.id"
      :post="post"
      :showPin="showPin"
    />
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :showPin="showPin"
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
import helper from "@/utilities/helper";
import axios from "axios";

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
    type: {
      type: String,
      default: null,
    },
    showPin: {
      type: Boolean,
      default: false,
    },
    displayEmpty: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      incrementCommentsCount: this.incrementCommentsCount,
      decrementCommentsCount: this.decrementCommentsCount,
      postDelete: this.deletePost,
      voteOnPost: this.voteOnPost,
      closePostComments: this.closePostComments,
      pinPost: this.pinPost,
      reactToPost: this.reactToPost,
      cancelToken: this.cancelToken,
    };
  },
  emits: {},
  data() {
    return {
      posts: [],
      announcements: [],
      page: 1,
      totalPages: 1,
      loading: false,
      pendingRequest: false,
      hasMore: true,
      emptyMessage: "",
      cancelToken: axios.CancelToken.source(),
    };
  },
  computed: {
    hasMoreToLoad() {
      return this.page <= this.totalPages && this.hasMore;
    },
  },
  async created() {},
  async mounted() {
    this.loadPosts();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.cancelToken.cancel();
  },
  methods: {
    /**
     * @description Load posts from the API
     * 1-check if there is pending posts (posts still being fetched)
     * 2-set loading = true
     * 3-check if the timeline is main
     * 3.1-if it is main, get the posts for the main page
     * 3.1.1-if it is the first page, get the announcements
     * 3.2-if it is not main, get the posts for specific timeline
     * 4-set the posts to the posts array
     * 5-set the total pages
     * 6-increment the page
     * 7-set loading = false
     * 8-set pendingRequest = false
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
          response = await PostService.getPostsForMainPage(
            this.page,
            this.cancelToken
          );
        } else {
          if (this.type === "announcement")
            response = await PostService.getAnnouncements(this.page);
          else if (this.type === "support") {
            response = await PostService.getSupportPosts(this.page);
          } else
            response = await PostService.postsByTimelineId(
              this.timeline_id,
              this.page
            );
        }
        if (response.statusCode !== 200) {
          helper.toggleToast(
            "حدث خطأ أثناء تحميل المنشورات, حاول مرة أخرى",
            "error"
          );
          return;
        }

        if (response.statusCode === 200 && !response.data) {
          this.emptyMessage = "لا يوجد منشورات";
          this.hasMore = false;
          return;
        }

        if (this.isMain && this.page === 1) {
          this.announcements = response.data?.announcements ?? [];
        }

        this.posts = [...this.posts, ...response.data.posts];
        this.totalPages = response.data?.last_page ?? 1;
        this.page++;
      } catch (error) {
        if (
          error.response.status !== 400 &&
          error.response.status !== 401 &&
          error.response.status !== 401
        )
          helper.toggleToast(
            "حدث خطأ أثناء تحميل المنشورات, حاول مرة أخرى",
            "error"
          );
      } finally {
        this.loading = false;
        this.pendingRequest = false;
      }
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
     * @param {int} post_id
     */
    incrementCommentsCount(post_id) {
      let post;
      post = this.posts.find((post) => post.id == post_id);
      if (!post) post = this.announcements.find((post) => post.id == post_id);
      post.comments_count++;
    },

    /**
     * Decrement the comments count of a post
     * @param {int} post_id
     */
    decrementCommentsCount(post_id) {
      let post;
      post = this.posts.find((post) => post.id == post_id);
      if (!post) post = this.announcements.find((post) => post.id == post_id);
      post.comments_count--;
    },

    /**
     * Add a new post to the posts array
     * @param {object} post
     */
    addNewPost(post) {
      this.posts.unshift(post);
    },
    /**
     * Delete a post from the posts array
     * @param {int} post_id
     */
    deletePost(post_id) {
      this.posts = this.posts.filter((post) => post.id != post_id);
      this.announcements = this.announcements.filter(
        (post) => post.id != post_id
      );
    },
    /**
     * Vote on a post
     * @param {object} data
     */
    voteOnPost(data) {
      const { option_id, post_id, old_option_id, status } = data;

      let post;
      post = this.posts.find((post) => post.id == post_id);
      if (!post) post = this.announcements.find((post) => post.id == post_id);

      const newOption = post.pollOptions.find(
        (option) => option.id === option_id
      );
      const oldOption = post.pollOptions.find(
        (option) => option.id === old_option_id
      );

      if (status === "created") {
        post.votes_count++;
      } else if (status === "updated") {
        oldOption.votes_count--;
        oldOption.selected_by_user = false;
      }
      newOption.votes_count++;
      newOption.selected_by_user = true;
    },
    /**
     * Close the comments creation form
     * @param {int} post_id
     */
    closePostComments(post_id) {
      const post = this.posts.find((item) => item.id === post_id);
      post.allow_comments = !post.allow_comments;
    },
    /**
     * Allow the user to pin a post to the top of the page
     * Only one post can be pinned at a time
     * Only in the timelines ['announcement', 'group', 'profile'] a post can be pinned
     * @param {int} post_id
     * @param {boolean} is_pinned
     */
    pinPost(post_id, is_pinned) {
      let post;
      if (is_pinned) {
        post = this.posts.find((item) => item.id === post_id);

        //get the fisrt post
        let pinnedPost = this.posts[0];
        //if the first post is pinned, remove it from the array
        if (pinnedPost.is_pinned)
          this.posts.splice(this.posts.indexOf(pinnedPost), 1);

        //if there is a pinned post, remove the is_pinned property from it
        pinnedPost = this.posts.find((item) => item.is_pinned);
        if (pinnedPost) pinnedPost.is_pinned = false;

        //add the ne pinned post to the top of the array
        this.posts.unshift(post);
      } else {
        post = this.posts.find((item) => item.id === post_id && item.is_pinned);
        this.posts.splice(this.posts.indexOf(post), 1);
      }
      post.is_pinned = is_pinned;
    },

    /**
     * React to a post either by creating a new reaction or updating an existing one
     * @param {int} post_id
     * @param {boolean} status
     */
    reactToPost(post_id, status) {
      let post;
      post = this.posts.find((post) => post.id == post_id);
      if (!post) post = this.announcements.find((post) => post.id == post_id);

      if (status) {
        post.reactions_count++;
        post.reacted_by_user = true;
      } else {
        post.reactions_count--;
        post.reacted_by_user = false;
      }
    },
  },
};
</script>
