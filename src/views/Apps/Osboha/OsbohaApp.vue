<template>
  <div class="row">

    <!-- story starts -->
    <div :style="`background-image: url(${knowAboutOsboha});`" class="story">
    </div>
    <!-- story ends -->

    <!-- story starts -->
    <div :style="`background-image: url(${latestBook});`" class="story" v-if="latest_book">
      <h5>
        {{ latest_book.name }}

        <br>
        <small class="h6 badge bg-info">{{ latest_book.section.section }}</small>

      </h5>
    </div>
    <!-- story ends -->

    <div class="col-12 row m-0 p-0 mt-2">
      <div class="col-sm-12">
        <tab-content id="pills-tabContent-2">
          <tab-content-item :active="true" id="profile-feed" aria-labelled-by="pills-feed-tab">
            <!-- ##### <AddPost> ##### -->
            <AddPost @add-post="addPost" type="normal" :timeline_id="timeline_id" />
            <!-- ##### <AddPost /> ##### -->
          </tab-content-item>
        </tab-content>
      </div>
      <tab-content id="pills-tabContent-2">
        <tab-content-item :active="true" id="profile-feed" aria-labelled-by="pills-feed-tab">
          <LazyLoadedPosts :isMain="true" ref="lazyLoadedPostsRef" />
        </tab-content-item>
      </tab-content>
    </div>
  </div>
</template>
<script>
import AddPost from "@/components/post/add/AddPost";
import LazyLoadedPosts from "@/components/post/LazyLoadedPosts.vue";
import bookService from "@/API/services/book.service";
import knowAboutOsboha from '@/assets/images/main/know-about-osboha-2.png'
import latestBook from '@/assets/images/main/latest-book.png'

export default {
  name: "Osboha App",
  components: { AddPost, LazyLoadedPosts },
  data() {
    return {
      latest_book: null,
      knowAboutOsboha,
      latestBook
    };
  },
  async created() {
    this.latest_book = await bookService.latestBooks();
  },
  methods: {
    addPost(post) {
      this.$refs.lazyLoadedPostsRef.addNewPost(post);
    },
  },
  computed: {
    timeline_id() {
      return this.$store.getters.getUserProfile.timeline_id;
    },
  },
};
</script>

<style scoped>
/* story */
.story {
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  width: 120px;
  height: 200px;
  box-shadow: 0px 5px 17px -7px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  margin-right: 10px;
  transition: transform 100ms ease-in;
  cursor: pointer;
}

.story:hover {
  transform: scale(1.07);
}

.story h5 {
  position: absolute;
  top: 35%;
  color: #192e35;
}
</style>