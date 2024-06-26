<template>
  <CommentHeader :comment="comment" @triggerEditBox="triggerEditBox" />
  <div class="blog-description">
    <div class="row">
      <div class="row" v-if="comment.thesis">
        <div class="col-6 form-group">
          <label class="form-control-plaintext">صفحة البداية: {{ comment.thesis.start_page }}</label>
        </div>
        <div class="col-6 form-group">
          <label class="form-control-plaintext">صفحة النهاية: {{ comment.thesis.end_page }}</label>
        </div>
      </div>
    </div>
    <h6 v-if="totalThesisPages > 0">
      الصفحات المنجزة: {{ totalThesisPages }}
      <span class="text-muted text-sm ms-1" style="font-size: 0.7rem" v-if="!comment.body && !comment.media">قراءة
        فقط</span>
    </h6>
    <!-- <h6>
      <rate :rate="5" />
    </h6> -->
    <CreateComment v-if="showEditBox" :isEdit="true" ref="commentEditRef" :comment="comment" @editComment="editComment"
      @cancelEdit="cancelEdit" />
    <template v-else>
      <div class="mt-3" v-if="comment.body">
        <p style="white-space: pre-wrap; direction: rtl;" v-html="processText(briefBody)"></p>
        <a class="load-btn" href="#" v-if="comment.body.length > briefBody.length"
          @click.prevent="briefBody = comment.body">عرض المزيد</a>
      </div>

      <div class="image-block mt-3 mb-3" v-if="comment.media" data-bs-toggle="modal"
        :data-bs-target="`#imgModal-${comment.id}`">
        <BaseImage :mediaID="comment.media.id" classes="img-fluid rounded w-50 comment-image" alt="blog-img" />
      </div>
      <!-- <imgModal :propSrc="'https://www.w3schools.com/howto/img_snow.jpg'" /> -->
      <div class="d-flex flex-wrap align-items-center comment-activity">
        <tooltip tag="span" class="text-muted small" tooltipPlacement="bottom" data-bs-toggle="tooltip"
          :title="formatFullDate(comment.created_at)">{{ formatDateToWritten(comment.created_at) }}</tooltip>
        &nbsp;&nbsp;
        <a href="javascript:void();">
          <span class="me-1" v-if="comment.reactions_count > 0">
            {{ comment.reactions_count }}
          </span>
          <span :style="{
            color:
              selectedReaction.type === 'like'
                ? comment.is_liked
                  ? selectedReaction.text_color
                  : '#555770'
                : selectedReaction.text_color,
          }" @click.prevent="reactOnComment(selectedReaction.id)">
            {{ selectedReaction.title }}
          </span>
        </a>
        <a href="javascript:void();" v-on:click="showReply" style="color: #555770" v-if="allowComment">
          {{ showReplyBox ? "إخفاء" : "رد" }}
        </a>
      </div>
      <!--display a button to hide replies-->
      <a role="button" class="load-btn" v-on:click="toggleShowReplies" v-if="hasReplies">
        {{
          showReplies
            ? `إخفاء ${totalReplies} من الردود`
            : `عرض ${totalReplies} من الردود`
        }}
      </a>
    </template>
  </div>
  <div class="comment-list" v-if="comment.replies && showReplies">
    <ul class="post-comments list-inline p-0 m-0">
      <li class="mb-2" v-for="cmnt in comment.replies" :key="cmnt.id">
        <Comment :allowComment="allowComment" :comment="cmnt" @addComment="addComment" @editComment="editComment"
          @reactToComment="reactToComment" />
      </li>
    </ul>
  </div>
  <CreateComment v-if="showReplyBox" ref="commentReplyRef" :comment="comment" :type="'reply'"
    @addComment="addComment" />

  <modal :id="`imgModal-${comment.id}`" dialogClass="modal-dialog-centered modal-lg" tabindex="-1"
    aria-labelledby="displayImageLabel" :aria-hidden="false">
    <model-header>
      <a href="javascript:void(0);" class="lh-1" data-bs-dismiss="modal">
        <span class="material-symbols-outlined">close</span>
      </a>
    </model-header>
    <model-body>
      <BaseImage v-if="comment.media" :mediaID="comment.media.id" class="img-fluid rounded w-100" alt="blog-img" />
    </model-body>
  </modal>
</template>
<script>
import rate from "@/components/book/rate/rate.vue";
import CreateComment from "@/components/comment/CreateComment.vue";
import imgModal from "@/components/modal/image.vue";
import CommentHeader from "@/components/comment/CommentHeader.vue";
import helper from "@/utilities/helper";
import ReactionService from "@/API/services/reaction.service";
import { processText } from "@/utilities/formatText";

export default {
  name: "Comment",
  components: {
    CreateComment,
    CommentHeader,
    // rate,
    //imgModal,
  },
  emits: ["addComment", "editComment", "reactToComment"],
  props: {
    comment: {
      type: Object,
      required: true,
    },
    totalThesisPages: {
      type: Number,
      required: false,
    },
    allowComment: {
      type: [Boolean, Number],
      default: true,
    },
  },
  data() {
    return {
      showReplies: false,
      showReplyBox: false,
      showEditBox: false,
      selectedReaction: {
        id: 1,
        title: "إعجاب",
        type: "like",
        text_color: "#278036",
      },
      pendingRequest: false,
      briefBody: "",
    };
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
      return calculateReplies(this.comment?.replies);
    },
  },
  created() {
    this.briefBody = this.comment.body
      ? this.comment.body.length > 200
        ? this.comment.body.substring(0, 200) + "..."
        : this.comment.body
      : "";
  },
  methods: {
    ...helper,
    processText,
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
    triggerEditBox() {
      if (!this.showEditBox) {
        this.showEditBox = true;

        this.$nextTick(() => {
          this.$refs.commentEditRef.focusInput();
        });
      }
    },
    async editComment(comment) {
      this.$emit("editComment", comment);
      this.showEditBox = false;
    },
    cancelEdit() {
      this.showEditBox = false;
    },
    reactToComment(comment_id, status) {
      this.$emit("reactToComment", comment_id, status);
    },
    async reactOnComment(reactionId) {
      if (this.pendingRequest) return;

      this.pendingRequest = true;
      try {
        const response = await ReactionService.reactOnComment(
          this.comment.id,
          reactionId,
        );

        if (response.statusCode !== 200) {
          helper.toggleToast("حدث خطأ ما, يرجى المحاولة لاحقاً", "error");
          return;
        }

        this.$emit("reactToComment", this.comment.id, response.data);
      } catch (e) {
        console.log("[comment reaction error]", e.response);
        helper.toggleToast("حدث خطأ ما, يرجى المحاولة لاحقاً", "error");
      } finally {
        this.pendingRequest = false;
      }
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

.post-comments>li {
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