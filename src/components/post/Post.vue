<template>
  <div class="col-sm-12">
    <div class="card card-block card-stretch card-height">
      <div class="card-body">
        <!--Post header-->
        <PostHeader :post="post" :byAuth="byAuth" :showPin="showPin" />

        <!--Post Body-->
        <PostBody :post="post" />

        <!--Post Media section-->
        <PostMedia :post="post" @showPostMedia="showPostMedia" />

        <!--Post Footer-->
        <div class="comment-area mt-3">
          <div
            class="d-flex justify-content-between align-items-center flex-wrap"
          >
            <div class="like-block position-relative d-flex align-items-center">
              <!--Likes-->
              <TotalLikes :post="post" />

              <!--Total comments with dropdown of users who commented on this post-->
              <TotalComments
                :post="post"
                @showCommentModel="showCommentModel"
              />

              <div
                class="total-votes-block ms-3"
                v-if="post.pollOptions.length > 0"
              >
                <span role="button">
                  {{ votesCountText }}
                </span>
              </div>
            </div>
          </div>
          <hr />
          <!--Post Action buttons (like - comment - share)-->
          <ActionButtons
            :isLiked="isLiked"
            @likePost="isLiked = true"
            @unlikePost="isLiked = false"
            @showCommentModel="showCommentModel"
          />
        </div>
      </div>
    </div>
  </div>

  <!--Post media modal-->
  <PostMediaModal :post="post" ref="postMediaModal" />

  <!--Comments modal-->
  <CommentsModal :post="post" ref="commentModal" />

  <!--Delete post confirmation modal-->
  <ConfirmationModal
    title="تأكيد الحذف"
    :post_id="post.id"
    text="هل أنت متأكد من حذف هذا المنشور؟"
    ref="deletePostRef"
  />
</template>

<script>
import PostHeader from "@/components/post/header/PostHeader.vue";
import PostBody from "@/components/post/body/PostBody.vue";
import PostMedia from "@/components/post/body/PostMedia.vue";
import ConfirmationModal from "@/components/post/modals/ConfirmationModal.vue";
import CommentsModal from "@/components/post/modals/CommentsModal.vue";
import PostMediaModal from "@/components/post/modals/PostMediaModal.vue";
import TotalComments from "@/components/post/footer/TotalComments.vue";
import TotalLikes from "@/components/post/footer/TotalLikes.vue";
import ActionButtons from "@/components/post/footer/ActionButtons.vue";

export default {
  name: "Post",
  components: {
    PostHeader,
    PostBody,
    ConfirmationModal,
    CommentsModal,
    PostMediaModal,
    PostMedia,
    TotalComments,
    ActionButtons,
    TotalLikes,
  },
  props: {
    post: { type: Object },
    byAuth: {
      type: Boolean,
      default: false,
    },
    showPin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userRole: "",
      isLiked: false,
      errorMessage: "",
      deletePostLoading: false,
    };
  },
  computed: {
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
    resolve_img_url: function (path) {
      let images = require.context(
        "../../assets/images/",
        false,
        /\.png$|\.jpg$/
      );
      return images("./" + path);
    },
    showCommentModel() {
      this.$refs.commentModal.showCommentModel();
    },
    /**
     * @description: show the gallery modal
     * @param index: the index of the media to show
     * @returns {void}
     */
    showPostMedia(index) {
      this.$refs.postMediaModal.showPostMedia(index);
    },
  },
};
</script>

<style>
.dropdown-item {
  color: #ddd !important;
}

.dropdown-menu {
  background-color: rgba(25, 24, 24, 0.8) !important;
}

.dropdown-menu .dropdown-item:focus,
.dropdown-menu .dropdown-item:hover {
  background-color: transparent !important;
  color: #fff !important;
}

.card-post-toolbar .dropdown-menu {
  background-color: #fff !important;
}

.card-post-toolbar .dropdown-menu .dropdown-item,
.card-post-toolbar .dropdown-menu .dropdown-item:focus,
.card-post-toolbar .dropdown-menu .dropdown-item:hover {
  color: #000 !important;
}

.bold-600 {
  font-weight: 600;
}
</style>
