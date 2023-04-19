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

    <div class="col-lg-4">
      <!-- ##### Books ##### -->
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">أخر الكتب المضافة</h4>
        </template>
        <template v-slot:body>
          <ul class="media-story m-0 p-0">
            <li
              v-for="(item, index) in books"
              :key="index"
              class="d-flex align-items-center"
              :class="item.isActive + ' ' + item.class"
            >
              <img
                :src="item.image"
                alt="story-img"
                class="rounded-circle img-fluid"
              />
              <div class="stories-data ms-3">
                <h5>{{ item.title }}</h5>
                <p class="mb-0">{{ item.section }}</p>
              </div>
            </li>
          </ul>
          <a href="javascript:void(0);" class="btn btn-primary d-block mt-3"
            >مشاهدة الكل</a
          >
        </template>
      </iq-card>
      <!-- ##### End Books ##### -->

      <!-- ##### Articles ##### -->

      <!-- <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">أخر المقالات</h4>
        </template>
        <template v-slot:body>
          <ul class="suggestions-lists m-0 p-0">
            <li
              v-for="(item, index) in articles"
              :key="index"
              class="d-flex mb-4 align-items-center"
            >
              <div class="user-img img-fluid">
                <img
                  :src="item.image"
                  alt="story-img"
                  rounded="circle"
                  class="rounded-circle img-fluid"
                />
              </div>
              <div class="media-support-info ms-3">
                <h6>{{ item.title }}</h6>
                <p class="mb-0">{{ item.created_at }}</p>
              </div>
            </li>
          </ul>
        </template>
      </iq-card> -->
      <!-- ##### End Articles ##### -->

      <!-- ##### Infographic ##### -->

      <!-- <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">أخر الانفوجرافيك المضافة</h4>
        </template>
        <template v-slot:body>
          <ul class="suggested-page-story m-0 p-0 list-inline">
            <li
              class="mb-3"
              v-for="(post, index) in suggestionEvent"
              :key="index"
            >
              <div class="d-flex align-items-center mb-3">
                <img
                  :src="post.img"
                  alt="story-img"
                  class="rounded-circle img-fluid avatar-50"
                />
                <div class="stories-data ms-3">
                  <h5>{{ post.title }}</h5>
                  <p class="mb-0">{{ post.des }}</p>
                </div>
              </div>
              <img
                :src="post.otherImg"
                class="img-fluid rounded"
                alt="Responsive image"
              />
            </li>
          </ul>
        </template>
      </iq-card> -->
      <!-- ##### End Infographic ##### -->
      <!-- ##### Videos ##### -->

      <!-- <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">أخر الفيديوهات المضافة</h4>
        </template>
        <template v-slot:body>
          <ul class="suggested-page-story m-0 p-0 list-inline">
            <li
              class="mb-3"
              v-for="(post, index) in suggestionEvent"
              :key="index"
            >
              <div class="d-flex align-items-center mb-3">
                <img
                  :src="post.img"
                  alt="story-img"
                  class="rounded-circle img-fluid avatar-50"
                />
                <div class="stories-data ms-3">
                  <h5>{{ post.title }}</h5>
                  <p class="mb-0">{{ post.des }}</p>
                </div>
              </div>
              <img
                :src="post.otherImg"
                class="img-fluid rounded"
                alt="Responsive image"
              />
            </li>
          </ul>
        </template>
      </iq-card> -->
      <!-- ##### End Videos ##### -->
    </div>
  </div>
</template>
<script>
import AddPost from "@/components/post/add/AddPost";
import LazyLoadedPosts from "@/components/post/LazyLoadedPosts.vue";
import userInfoService from "@/Services/userInfoService";

export default {
  name: "SocialApp",
  components: { AddPost, LazyLoadedPosts },
  data() {
    return {
      timeline_id: null,
      books: [
        {
          title: "كتاب 1 ",
          section: "فئة 1",
          image: require("../../../assets/images/page-img/s2.jpg"),
          class: "mb-4",
          isActive: "active",
        },
        {
          title: "كتاب 2",
          section: "فئة 2",
          image: require("../../../assets/images/page-img/s3.jpg"),
          class: "mb-4",
          isActive: "",
        },
        {
          title: "كتاب 3",
          section: "فئة 3",
          image: require("../../../assets/images/page-img/s1.jpg"),
          class: "",
          isActive: "",
        },
      ],
      articles: [
        {
          title: "Anna Sthesia",
          created_at: "04/13/2019",
          image: require("../../../assets/images/user/01.jpg"),
        },
        {
          title: "Paul Molive",
          created_at: "04/13/2019",
          image: require("../../../assets/images/user/02.jpg"),
        },
      ],
      suggestionEvent: [
        {
          img: require("../../../assets/images/page-img/42.png"),
          title: "Iqonic Studio",
          des: "Lorem Ipsum",
          otherImg: require("../../../assets/images/small/img-1.jpg"),
        },
        {
          img: require("../../../assets/images/page-img/43.png"),
          title: "Cakes & Bakes ",
          des: "Lorem Ipsum",
          otherImg: require("../../../assets/images/small/img-2.jpg"),
        },
      ],
    };
  },
  async created() {
    const userProfile = await userInfoService.getUserProfile();
    this.timeline_id = parseInt(userProfile.timeline_id);
  },
  methods: {
    addPost(post) {
      this.$refs.lazyLoadedPostsRef.addNewPost(post);
    },
  },
};
</script>
