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
        <!--if no comments found-->
        <div class="cols" v-if="commentEmptyMessage && !comments.length">
          <div class="text-center text-primary m-auto">
            <font-awesome-icon
              :icon="[
                'fas',
                `${post.allow_comments ? 'pen' : 'circle-exclamation'}`,
              ]"
              size="sm"
            />
            <span class="ms-1">{{ commentEmptyMessage }}</span>
          </div>
        </div>

        <!--If error occured during fetching the comments-->
        <div class="cols" v-if="errorMessage">
          <div class="text-center m-auto" style="color: red">
            <font-awesome-icon
              :icon="['fas', 'circle-exclamation']"
              size="sm"
            />
            <span class="ms-1">{{ errorMessage }}</span>
          </div>
        </div>

        <div>
          <div class="cols" v-for="comment in comments" :key="comment.id">
            <div class="card card-block card-stretch card-height blog">
              <div class="card-body">
                <Comment
                  :comment="comment"
                  @addComment="addComment"
                  @editComment="editComment"
                  @reactToComment="reactToComment"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="cols text-center" v-if="commentsLoading">
          <img
            :src="require('@/assets/images/page-img/page-load-loader.gif')"
            alt="loader"
            style="height: 100px"
          />
        </div>

        <button
          v-if="
            hasMoreComments &&
            !commentsLoading &&
            commentsTotalPages > commentsPage
          "
          class="w-100 p-2 bold-600 text-primary border-0 bg-transparent my-2"
          @click.prevent="loadComments"
        >
          تحميل المزيد من التعليقات
        </button>
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
import commentService from "@/API/services/comment.service";
import Comment from "@/components/comment/Comment.vue";
import CreateComment from "@/components/comment/CreateComment.vue";
import helper from "@/utilities/helper";

export default {
  name: "CommentsModal",
  components: {
    CreateComment,
    Comment,
  },
  provide() {
    return {
      deleteComment: this.deleteComment,
    };
  },
  inject: ["incrementCommentsCount", "decrementCommentsCount"],
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      commentModal: null,
      comments: [],
      commentsPage: 1,
      commentsTotalPages: 1,
      commentsLoading: false,
      commentEmptyMessage: "",
      errorMessage: "",
    };
  },
  computed: {
    /**
     * @description checks if the post has more comments to load
     * @returns {boolean}
     */
    hasMoreComments() {
      return this.commentsPage <= this.commentsTotalPages;
    },
  },
  mounted() {
    this.commentModal = new Modal(this.$refs.commentModalRef.$el);
  },
  methods: {
    /**
     * @description: show the comment modal
     * reset the commentsPage to 1
     * reset the commentsTotalPages to 1
     * reset the comments array
     * reset the commentEmptyMessage to empty string
     * reset the errorMessage to empty string
     * show the comment modal
     * load the comments
     * @returns {void}
     */
    showCommentModel() {
      this.commentsPage = 1;
      this.commentsTotalPages = 1;
      this.comments = [];
      this.commentEmptyMessage = "";
      this.errorMessage = "";
      this.commentModal.show();
      this.loadComments();
    },
    /**
     * @description: Load the comments of the post
     * 1- check if the comments are already loading
     * 2- set the commentsLoading to true
     * 3- try to get the comments
     * 4- if the comments are found
     * 4.1- add the comments to the comments array
     * 4.2- set the commentsTotalPages to the last_page
     * 4.3- increment the commentsPage
     * 5- if the comments are not found
     * 5.1- set the commentEmptyMessage to "قم بكتابة تعليقك الأول"
     * 6- if there is an error
     * 6.1- set the errorMessage to "حدث خطأ ما، حاول مرة أخرى"
     * 7- set the commentsLoading to false
     * @returns {void}
     */
    async loadComments() {
      if (this.commentsLoading) {
        return;
      }
      this.commentsLoading = true;
      try {
        const response = await commentService.getPostComments(
          this.post.id,
          this.commentsPage
        );

        if (response.statusCode !== 200) {
          helper.toggleToast(response.message, "error");
          return;
        }

        if (response.data.comments) {
          this.comments = [...this.comments, ...response.data.comments];
          this.commentsTotalPages = response.data.last_page;
          this.commentsPage++;
        } else {
          this.commentEmptyMessage = this.post.allow_comments
            ? "قم بكتابة تعليقك الأول"
            : "لا يوجد تعليقات";
        }
      } catch (error) {
        helper.toggleToast("حدث خطأ ما، حاول مرة أخرى", "error");
      } finally {
        this.commentsLoading = false;
      }
    },
    /**
     * @description: find the comment by the comment_id among the comments and replies recursively
     * @param comments: array of comments
     * @param comment_id: the id of the comment
     * @returns {Object} the comment if found, otherwise return null
     */
    findComment(comments, comment_id) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === comment_id) {
          return comments[i];
        } else if (comments[i].replies.length > 0) {
          const comment = this.findComment(comments[i].replies, comment_id);
          if (comment) {
            return comment;
          }
        }
      }
    },
    /**
     * @description add the comment to the comments array
     * if the comment_id is not provided, add the comment to the comments array
     * otherwise, add the comment to the replies array of the comment
     * emit the incrementCommentsCount event to increment the comments count of the post
     * scroll to the bottom of the modal body
     * @param comment: the comment object
     * @param comment_id: the id of the comment
     */
    addComment(comment, comment_id) {
      if (!comment_id) {
        this.comments.push(comment);
        this.$nextTick(() => {
          const commentModal = this.$refs.commentModalRef.$el;
          const modalBody = commentModal.querySelector(".modal-body");
          modalBody.scrollTop = modalBody.scrollHeight;
        });
      } else {
        let commentToUpdate = this.findComment(this.comments, comment_id);
        commentToUpdate.replies.push(comment);
        console.log("[added comment at post]", comment);
      }
      this.incrementCommentsCount(this.post.id);
    },

    /**
     * @description delete the comment from the comments array
     *
     * @param {int} comment_id: the id of the comment
     * @returns {void}
     *
     */
    deleteComment(comment_id) {
      for (let i = 0; i < this.comments.length; i++) {
        if (this.comments[i].id === comment_id) {
          this.comments.splice(i, 1);
          this.decrementCommentsCount(this.post.id);
          return;
        } else if (this.comments[i].replies.length > 0) {
          for (let j = 0; j < this.comments[i].replies.length; j++) {
            if (this.comments[i].replies[j].id === comment_id) {
              this.comments[i].replies.splice(j, 1);
              this.decrementCommentsCount(this.post.id);
              return;
            }
          }
        }
      }
    },

    /**
     * @description edit the comment
     * @param {Object} comment: the comment object
     * @returns {void}
     */
    editComment(comment) {
      let commentToEdit = this.findComment(this.comments, comment.id);
      commentToEdit.body = comment.body;
      commentToEdit.media = comment.media;
    },
    reactToComment(comment_id, status) {
      let comment = this.findComment(this.comments, comment_id);
      if (status) {
        comment.reactions_count++;
        comment.reacted_by_user = true;
      } else {
        comment.reactions_count--;
        comment.reacted_by_user = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
