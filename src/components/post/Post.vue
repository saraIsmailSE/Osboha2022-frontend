<template>
  <div class="col-sm-12">
    <div class="card card-block card-stretch card-height">
      <div class="card-body">
        <!--Post header-->
        <PostHeader :showPin="showPin" />

        <!--Post Body-->
        <PostBody />

        <!--Post Media section-->
        <PostMedia />

        <!--Support Checkbox-->
        <SupportSection />

        <!--Post Footer-->
        <PostFooter />
      </div>
    </div>
  </div>

  <!--Comments modal-->
  <CommentsModal ref="commentModal" v-if="!focusComment" />
</template>

<script>
import PostHeader from "@/components/post/header/PostHeader.vue";
import PostBody from "@/components/post/body/PostBody.vue";
import PostFooter from "@/components/post/footer/PostFooter.vue";
import PostMedia from "@/components/post/body/PostMedia.vue";
import SupportSection from "@/components/post/body/SupportSection.vue";
import CommentsModal from "@/components/post/modals/CommentsModal.vue";
import helper from "@/utilities/helper";

export default {
  name: "Post",
  components: {
    PostHeader,
    PostBody,
    CommentsModal,
    PostMedia,
    PostFooter,
    SupportSection,
  },
  provide() {
    return {
      post: this.post,
      showCommentModel: this.showCommentModel,
    };
  },
  inject: {
    focusComment: {
      default: () => {},
    },
  },
  props: {
    post: { type: Object, required: true },
    showPin: {
      type: Boolean,
      default: false,
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
      if (this.post.type.toLowerCase() === "support") {
        const pledge = JSON.parse(localStorage.getItem("pledges"));
        const supported = pledge
          ? pledge[this.post.id] === this.$store.getters.getUser.id
            ? true
            : false
          : false;
        if (!supported) {
          helper.toggleToast(
            "يجب أن تتعهد بأنك قرأت المنشور كاملاً",
            "warning"
          );
          return;
        }
      }
      if (!this.focusComment) {
        this.$refs.commentModal.showCommentModel();
      } else {
        this.focusComment();
      }
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
