<template>
  <div class="row">
    <div class="col-lg-8 row m-0 p-0">
      <!-- ##### Display Posts ##### -->
      <div
        class="d-flex align-items-center justify-content-center"
        v-if="emptyMessage"
      >
        <div class="me-2">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" size="xl" />
        </div>
        <div>{{ emptyMessage }}</div>
      </div>
      <div class="col-sm-12 text-center" v-else-if="loading">
        <img
          :src="require('@/assets/images/page-img/page-load-loader.gif')"
          alt="loader"
          style="height: 100px"
        />
      </div>
      <template v-else>
        <Post :post="post" />
        <div class="col-sm-12">
          <div
            class="card card-block card-stretch card-height blog user-comment"
          >
            <div class="card-header d-flex justify-content-between">
              <div class="header-title">
                <h4 class="card-title">التعليقات</h4>
              </div>
            </div>
            <div class="card-body" ref="commentsSectionBody">
              <div class="row">
                <!-- display comments -->
                <LazyLoadedComments
                  :post="post"
                  :userId="
                    $route.params.user_id
                      ? parseInt($route.params.user_id)
                      : null
                  "
                  ref="lazyLoadedCommentsRef"
                />
                <CreateComment
                  ref="SinglePostCreateComment"
                  v-if="post.allow_comments"
                  type="comment"
                  class="flex-grow-1"
                  :post_id="post.id"
                  @addComment="addComment"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import PostService from "@/API/services/post.service";
import Post from "@/components/post/Post.vue";
import CreateComment from "@/components/comment/CreateComment.vue";
import LazyLoadedComments from "@/components/comment/LazyLoadedComments.vue";
import helper from "@/utilities/helper";
export default {
  name: "PostView",
  components: {
    Post,
    CreateComment,
    LazyLoadedComments,
  },
  provide() {
    return {
      focusComment: this.focusComment,
      incrementCommentsCount: () => {
        this.post.comments_count++;
      },
      decrementCommentsCount: () => {
        this.post.comments_count--;
      },
      reactToPost: this.reactToPost,
    };
  },
  data() {
    return {
      post: null,
      loading: false,
      emptyMessage: "",
    };
  },
  async created() {
    await this.getPost();
  },
  mounted() {},
  methods: {
    async getPost() {
      if (this.loading) return;

      this.loading = true;
      try {
        const response = await PostService.getPostById(
          this.$route.params.post_id
        );
        this.post = response.data;
      } catch (error) {
        console.log(error);
        helper.handleError(
          "حدث خطأ أثناء تحميل المنشور, الرجاء المحاولة مرة أخرى",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },
    focusComment() {
      //scroll to bottom of commentsSectionBody
      this.$refs.commentsSectionBody.scrollTop =
        this.$refs.commentsSectionBody.scrollHeight;
      this.$refs.SinglePostCreateComment.focusInput();
    },
    addComment(comment, comment_id) {
      this.$refs.lazyLoadedCommentsRef.addComment(comment, comment_id);
      if (!comment_id) {
        this.$nextTick(() => {
          //scroll to bottom of page
          window.scrollTo(0, document.body.scrollHeight);
        });
      }
    },
    reactToPost(post_id, status) {
      if (status) {
        this.post.reactions_count++;
        this.post.reacted_by_user = true;
      } else {
        this.post.reactions_count--;
        this.post.reacted_by_user = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
