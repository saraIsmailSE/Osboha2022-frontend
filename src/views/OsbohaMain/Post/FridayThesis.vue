<template>
  <div class="row">
    <div class="col-lg-8 row m-0 p-0">

      <!-- ##### <AddPost> ##### -->
      <div class="col-sm-12" v-if="isAuthorized && !lastFridayThesisPost">
        <AddPost @add-post="addPost" type="friday-thesis" :timeline_id="1" />
      </div>
      <!-- ##### Display Posts ##### -->
      <LazyLoadedPosts ref="lazyLoadedPostsRef" type="friday-thesis" :displayEmpty="true" />
    </div>
  </div>
</template>

<script>
import AddPost from "@/components/post/add/AddPost.vue";
import LazyLoadedPosts from "@/components/post/LazyLoadedPosts.vue";
import UserInfoService from "@/Services/userInfoService";
import PostService from "@/API/services/post.service";


export default {
  name: "Friday Thesis",
  components: {
    AddPost,
    LazyLoadedPosts,
  },
  data() {
    return {
      lastFridayThesisPost: {},
      showReason: false,
      loader: false,
      message: null,
    };
  },
  computed: {
    isAuthorized() {
      const user = this.$store.getters.getUser;
      return UserInfoService.hasRoles(user, ["admin", "consultant"]);
    },
  },
  created() {
    PostService.getLastFridayThesisPost()
      .then((response) => {
        this.lastFridayThesisPost = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    addPost(post) {
      this.$refs.lazyLoadedPostsRef.addNewPost(post);
    },
  },
};
</script>
