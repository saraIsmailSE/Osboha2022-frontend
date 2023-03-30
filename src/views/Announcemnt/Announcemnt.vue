<template>
  <div class="row">
    <div class="col-lg-8 row m-0 p-0">
      <div class="col-sm-12">
        <!-- ##### <AddPost> ##### -->
        <AddPost @add-post="addPost" :type="'announcement'" :timeline_id="1" />
      </div>
    </div>
  </div>
</template>

<script>
import AddPost from "@/components/post/AddPost.vue";
export default {
  name: "Announcemnt",
  components: {
    AddPost,
  },

  data() {
    return {};
  },
  methods: {
    addPost(post) {
      console.log(post);
    },
  },
};
</script>

<style scoped></style>
