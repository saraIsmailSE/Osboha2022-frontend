<template>
  <div class="row">
    <div class="col-lg-8 row m-0 p-0">
      <div class="col-sm-12">
        <tab-content id="pills-tabContent-2">
          <tab-content-item
            :active="true"
            id="profile-feed"
            aria-labelled-by="pills-feed-tab"
          >
            <!-- ##### <AddPost> ##### -->
            <AddPost
              @add-post="addPost"
              type="normal"
              :timeline_id="timeline_id"
            />
            <!-- ##### <AddPost /> ##### -->
          </tab-content-item>
        </tab-content>
      </div>
      <tab-content id="pills-tabContent-2">
        <tab-content-item
          :active="true"
          id="profile-feed"
          aria-labelled-by="pills-feed-tab"
        >
          <LazyLoadedPosts :isMain="true" ref="lazyLoadedPostsRef" />
        </tab-content-item>
      </tab-content>
    </div>
    <div class="col-lg-4" v-show="!isMobile">
      <!-- ##### Books ##### -->
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">أخر الكتب المضافة</h4>
        </template>
        <template v-slot:body>
          <ul class="media-story m-0 p-0">
            <li
              v-for="(book, index) in books"
              :key="index"
              class="d-flex align-items-center active"
            >
              <img
                src="@/assets/images/main/book.png"
                alt="story-img"
                class="rounded-circle img-fluid"
              />
              <div class="stories-data ms-3">
                <router-link
                  :to="{
                    name: 'book.book-details',
                    params: { book_id: book.id },
                  }"
                >
                  <h5 class="font-weight-bold">{{ book.name }}</h5>
                </router-link>
                <p class="mb-0">{{ book.section.section }}</p>
              </div>
            </li>
          </ul>
          <router-link :to="{ name: 'osboha.book' }">
            <button class="btn btn-primary d-block mt-3 w-100">
              مشاهدة الكل
            </button>
          </router-link>
        </template>
      </iq-card>
      <!-- ##### End Books ##### -->
    </div>
  </div>
</template>
<script>
import AddPost from "@/components/post/add/AddPost";
import LazyLoadedPosts from "@/components/post/LazyLoadedPosts.vue";
import bookService from "@/API/services/book.service";

export default {
  name: "Osboha App",
  components: { AddPost, LazyLoadedPosts },
  data() {
    return {
      books: [],
    };
  },
  async created() {
    if (!this.isMobile) {
      this.books = await bookService.latestBooks();
    }
  },
  watch: {
    async isMobile(newVal, oldVal) {
      if (!newVal) {
        this.books = await bookService.latestBooks();
      }
    },
  },
  methods: {
    addPost(post) {
      this.$refs.lazyLoadedPostsRef.addNewPost(post);
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.display.mobile;
    },
    timeline_id() {
      return this.$store.getters.getUserProfile.timeline_id;
    },
  },
};
</script>
