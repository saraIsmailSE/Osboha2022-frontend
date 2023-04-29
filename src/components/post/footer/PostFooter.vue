<template>
  <div class="comment-area mt-3">
    <div class="d-flex justify-content-between align-items-center flex-wrap">
      <div class="like-block position-relative d-flex align-items-center">
        <!--Likes-->
        <TotalLikes />

        <!--Total comments with dropdown of users who commented on this post-->
        <TotalComments />

        <!--Total votes-->
        <TotalVotes />
      </div>
    </div>
    <hr />
    <!--Post Action buttons (like - comment - share)-->
    <ActionButtons />
  </div>
</template>

<script>
import TotalComments from "@/components/post/footer/TotalComments.vue";
import TotalLikes from "@/components/post/footer/TotalLikes.vue";
import ActionButtons from "@/components/post/footer/ActionButtons.vue";
import TotalVotes from "@/components/post/footer/TotalVotes.vue";
export default {
  name: "PostFooter",
  components: {
    TotalComments,
    TotalLikes,
    ActionButtons,
    TotalVotes,
  },
};
</script>

<style lang="scss" scoped></style>
