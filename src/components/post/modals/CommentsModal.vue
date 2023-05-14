<template>
  <modal
    ref="commentModalRef"
    :id="`commentModal-${post.id}`"
    tabindex="-1"
    :aria-labelledby="`commentModalLabel-${post.id}`"
    :aria-hidden="true"
    dialogClass="modal-lg modal-dialog-centered modal-dialog-scrollable"
  >
    <model-header>
      <h4>التعليقات</h4>
      <a
        href="javascript:void(0);"
        class="lh-1"
        data-bs-dismiss="modal"
        ref="commentModalCloseBtn"
      >
        <span class="material-symbols-outlined">close</span>
      </a>
    </model-header>

    <model-body>
      <div class="row">
        <LazyLoadedComments :post="post" ref="lazyLoadedCommentsRef" />
      </div>
    </model-body>
    <model-footer>
      <CreateComment
        v-if="post.allow_comments"
        type="comment"
        class="flex-grow-1"
        :post_id="post.id"
        @addComment="addComment"
      />
    </model-footer>
  </modal>
</template>

<script>
import { Modal } from "bootstrap";
import CreateComment from "@/components/comment/CreateComment.vue";
import LazyLoadedComments from "@/components/comment/LazyLoadedComments.vue";

export default {
  name: "CommentsModal",
  components: {
    CreateComment,
    LazyLoadedComments,
  },
  inject: ["post"],
  data() {
    return {
      commentModal: null,
    };
  },
  watch: {
    $route(to, from) {
      this.commentModal.hide();
    },
  },
  mounted() {
    this.commentModal = new Modal(this.$refs.commentModalRef.$el);
  },
  methods: {
    /**
     * @description: show the comment modal
     * @returns {void}
     */
    showCommentModel() {
      this.$refs.lazyLoadedCommentsRef.resetData();
      this.commentModal.show();
    },
    addComment(comment, comment_id) {
      this.$refs.lazyLoadedCommentsRef.addComment(comment, comment_id);
      if (!comment_id) {
        this.$nextTick(() => {
          const commentModal = this.$refs.commentModalRef.$el;
          const modalBody = commentModal.querySelector(".modal-body");
          modalBody.scrollTop = modalBody.scrollHeight;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
