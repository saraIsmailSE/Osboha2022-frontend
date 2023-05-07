<template>
  <div ref="listContainer" v-if="posts.length > 0">
    <PendingPost v-for="post in posts" :key="post.id" :post="post" />
  </div>
  <div class="col-sm-12" v-else>
    <iq-card class="iq-card">
      <div class="iq-card-body p-0">
        <div class="image-block text-center">
          <img
            src="@/assets/images/main/approve-post.png"
            class="img-fluid rounded w-50"
            alt="blog-img"
          />
        </div>
        <h4 class="text-center mt-3 mb-3">لا يوجد منشورات معلقة</h4>
      </div>
    </iq-card>
  </div>
</template>

<script>
import PostService from "@/API/services/post.service";
import PendingPost from "@/components/post/PendingPost.vue";

export default {
  name: "PendingPostsView",
  components: {
    PendingPost,
  },
  provide() {
    return {
      postAction: this.postAction,
    };
  },
  data() {
    return {
      posts: [],
      page: 1,
      totalPages: 1,
      loading: false,
    };
  },
  created() {
    this.loadPosts();
  },
  watch: {
    $route(to, from) {
      this.loadPosts();
    },
  },
  methods: {
    async loadPosts() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const response = await PostService.getPendingPosts(
        this.$route.params.timeline_id,
        // this.page,
        this.$route.params.post_id ?? ""
      );
      //   this.posts = [...this.posts, ...response.data.data];
      this.posts = response.data ? response.data.posts : [];
      //   this.totalPages = response.data.last_page;
      //   this.page++;
      this.loading = false;

      console.log("[pending posts]", this.posts);
    },

    postAction(post_id) {
      this.posts = this.posts.filter((post) => post.id !== post_id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
