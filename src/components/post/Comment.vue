<template>
  <CommentUser :user="comment.user" />
  <div class="blog-description">
    <h6 v-if="totalThesisPages > 0">الصفحات المنجزة: {{ totalThesisPages }}</h6>
    <h6>
      <!-- <rate :rate="comment.rate" /> -->
      <rate :rate="5" />
    </h6>
    <p v-if="comment.body">{{ comment.body }}</p>
    <div class="image-block mt-3 mb-3">
      <img
        v-if="comment.media"
        :src="comment.media.path"
        class="img-fluid rounded w-25 comment-image"
        alt="blog-img"
      />
    </div>
    <div class="d-flex flex-wrap align-items-center comment-activity">
      <span
        class="text-muted small"
        data-bs-toggle="tooltip"
        data-bs-placement="bottomleft"
        :title="formatFullDate(comment.created_at)"
      >
        {{ formatDateToWritten(comment.created_at) }}
      </span>
      &nbsp;&nbsp;
      <a href="javascript:void();" :class="{ liked: liked }"> أعجبني </a>
      <a href="javascript:void();" v-on:click="showReply">
        {{ showReplyBox ? "إخفاء" : "رد" }}
      </a>
    </div>
    <!--display a button to hide replies-->
    <a
      role="button"
      class="load-btn"
      v-on:click="toggleShowReplies"
      v-if="hasReplies"
    >
      {{
        showReplies
          ? `إخفاء ${totalReplies} من الردود`
          : `عرض ${totalReplies} من الردود`
      }}
    </a>
  </div>
  <div class="comment-list" v-if="comment.replies && showReplies">
    <ul class="post-comments list-inline p-0 m-0">
      <li class="mb-2" v-for="cmnt in comment.replies" :key="cmnt.id">
        <Comment :comment="cmnt" @addComment="addComment" />
      </li>
    </ul>
  </div>
  <CreateComment
    v-if="showReplyBox"
    ref="commentReplyRef"
    :comment_id="comment.id"
    :type="'reply'"
    :post_id="comment.post_id"
    @addComment="addComment"
  />
</template>
<script>
import rate from "../book/rate/rate.vue";
import CreateComment from "./CreateComment.vue";
import CommentUser from "./CommentUser.vue";
import helper from "@/utilities/helper";
export default {
  name: "Comment",
  components: {
    CreateComment,
    CommentUser,
    rate,
  },
  emits: ["addComment"],
  props: {
    comment: {
      type: Object,
      required: true,
    },
    totalThesisPages: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      showReplies: false,
      showReplyBox: false,
      liked: false,
    };
  },
  methods: {
    ...helper,
    toggleShowReplies() {
      this.showReplies = !this.showReplies;
    },
    showReply() {
      this.showReplyBox = !this.showReplyBox;

      //focus the input
      if (this.showReplyBox) {
        this.$nextTick(() => {
          this.$refs.commentReplyRef.focusInput();
        });
      }
    },
    addComment(reply, comment_id) {
      this.$emit("addComment", reply, comment_id);
      this.showReplies = true;
      this.showReplyBox = false;
    },
  },
  computed: {
    hasReplies() {
      return this.comment?.replies && this.comment?.replies.length > 0;
    },
    totalReplies() {
      //calculate recursively the total replies
      const calculateReplies = (replies, total) => {
        total = total || 0;
        if (replies.length > 0) {
          total += replies.length;
          replies.forEach((reply) => {
            if (reply.replies.length > 0) {
              total = calculateReplies(reply.replies, total);
            }
          });
        }
        return total;
      };
      return calculateReplies(this.comment.replies);
    },
  },
};
</script>
<style scoped>
.reply-container {
  margin-right: 30px;
}

.comment-list {
  margin-top: 15px;
}
.post-comments > li {
  border-right: 2px solid #ddd;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 15px;
  padding-right: 15px;
}

.comment-image {
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 20px !important;
}
</style>
