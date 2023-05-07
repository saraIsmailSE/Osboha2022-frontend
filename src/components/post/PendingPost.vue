<template>
  <div class="col-sm-12">
    <div class="card card-block card-stretch card-height">
      <div class="card-body">
        <!--Post header-->
        <PostHeader />

        <!--Post Body-->
        <PostBody />

        <!--Post Media section-->
        <PostMedia />

        <hr />
        <!-- Post Accept/Reject actions-->
        <AcceptReject />
      </div>
    </div>
  </div>
</template>

<script>
import PostHeader from "@/components/post/header/PostHeader.vue";
import PostBody from "@/components/post/body/PostBody.vue";
import AcceptReject from "@/components/post/footer/AcceptReject.vue";
import PostMedia from "@/components/post/body/PostMedia.vue";

export default {
  name: "PendingPost",
  components: {
    PostHeader,
    PostBody,
    PostMedia,
    AcceptReject,
  },
  provide() {
    return {
      post: this.post,
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log("[pending post]", this.post);
  },
};
</script>

<style lang="scss" scoped></style>
