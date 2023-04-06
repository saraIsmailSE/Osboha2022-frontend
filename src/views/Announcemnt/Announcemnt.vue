<template>
  <div class="row">
    <div class="col-lg-8 row m-0 p-0">
      <!-- ##### <AddPost> ##### -->
      <div class="col-sm-12" v-if="isAuthorized">
        <AddPost @add-post="addPost" type="announcement" :timeline_id="1" />
      </div>
      <!-- ##### Display Posts ##### -->
      <LazyLoadedPosts
        ref="lazyLoadedPostsRef"
        type="announcement"
        :showPin="true"
      />
    </div>
  </div>
</template>

<script>
import AddPost from "@/components/post/add/AddPost.vue";
import LazyLoadedPosts from "@/components/post/LazyLoadedPosts.vue";
import userInfoService from "@/Services/userInfoService";

export default {
  name: "Announcemnt",
  components: {
    AddPost,
    LazyLoadedPosts,
  },
  data() {
    return {
      roles: [],
    };
  },
  computed: {
    isAuthorized() {
      return (
        this.roles.includes("admin") ||
        this.roles.includes("advisor") ||
        this.roles.includes("supervisor")
      );
    },
  },
  async mounted() {
    this.roles = await userInfoService.getRoles().map((role) => role.name);
  },
  methods: {
    addPost(post) {
      this.$refs.lazyLoadedPostsRef.addNewPost(post);
    },
  },
};
</script>

<style scoped></style>
