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
            <AddPost @add-post="addPost" :type="'normal'" :timeline_id="1" />
          </tab-content-item>
        </tab-content>
      </div>
      <tab-content id="pills-tabContent-2">
        <tab-content-item
          :active="true"
          id="profile-feed"
          aria-labelled-by="pills-feed-tab"
        >
          <LazyLoadedPosts :isMain="true" />
          <!-- <Post v-for="post in posts" :key="post.id" :post="post" /> -->
        </tab-content-item>
      </tab-content>
    </div>

    <!-- ##### <AddPost /> ##### -->

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

      <iq-card>
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
      </iq-card>
      <!-- ##### End Articles ##### -->

      <!-- ##### Infographic ##### -->

      <iq-card>
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
      </iq-card>
      <!-- ##### End Infographic ##### -->
      <!-- ##### Videos ##### -->

      <iq-card>
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
      </iq-card>
      <!-- ##### End Videos ##### -->
    </div>
  </div>
</template>
<script>
import AddPost from "@/components/post/AddPost";
import LazyLoadedPosts from "@/components/post/LazyLoadedPosts.vue";

export default {
  name: "SocialApp",
  components: { AddPost, LazyLoadedPosts },
  mounted() {
    // socialvue.index()
  },
  data() {
    return {
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
      posts: [
        {
          id: 1,
          images: ["profile-bg9.jpg"],
          author: "USER",
          author_image: "avatar-01.jpg",
          created_at: "12-06-2019",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus",
          comments: [
            {
              id: 1,
              user: {
                id: 110,
                name: "Larue Waelchi",
                profile: {
                  profile_picture:
                    "http://127.0.0.1:8000/assets/images/540f80245b62f9177a9e8460b756a644.png",
                  cover_picture:
                    "http://127.0.0.1:8000/assets/images/4f2ff761d7a0729756b249e1067d637b.png",
                },
                roles: ["ambassador"],
              },
              body: "Quos velit et incidunt et. Qui ut quae consectetur iusto delectus unde possimus blanditiis. Qui quod praesentium et aut et enim deleniti. Quidem non vel hic.",
              type: "normal",
              replies: [
                {
                  id: 17,
                  user: {
                    id: 126,
                    name: "Bill Littel Sr.",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/258b3046efcd6651f4d0a36a3bc3fb61.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/6db2f6a5693227b2a5d13db8f6674d9d.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Et aliquid iste corrupti tempora doloribus aperiam. Sint libero repudiandae perferendis neque autem. Vel amet cum maxime. Possimus enim molestiae exercitationem similique a nihil.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
                {
                  id: 18,
                  user: {
                    id: 126,
                    name: "Bill Littel Sr.",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/258b3046efcd6651f4d0a36a3bc3fb61.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/6db2f6a5693227b2a5d13db8f6674d9d.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Aspernatur vero corrupti esse laboriosam non. Dolore a sed impedit aut. Placeat aperiam ea itaque ipsum rerum.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
                {
                  id: 19,
                  user: {
                    id: 126,
                    name: "Bill Littel Sr.",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/258b3046efcd6651f4d0a36a3bc3fb61.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/6db2f6a5693227b2a5d13db8f6674d9d.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Reiciendis labore corrupti est consectetur similique tenetur aliquid. Odit sapiente vero reiciendis aliquid.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
                {
                  id: 20,
                  user: {
                    id: 126,
                    name: "Bill Littel Sr.",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/258b3046efcd6651f4d0a36a3bc3fb61.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/6db2f6a5693227b2a5d13db8f6674d9d.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Quos esse enim expedita exercitationem odit ab voluptatibus. Maiores corporis eius laudantium quaerat. Debitis fugiat et dolorem perferendis.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
                {
                  id: 21,
                  user: {
                    id: 126,
                    name: "Bill Littel Sr.",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/258b3046efcd6651f4d0a36a3bc3fb61.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/6db2f6a5693227b2a5d13db8f6674d9d.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Ratione est odit dicta consequatur est voluptatem voluptates. Porro reiciendis omnis nihil accusamus ipsam accusantium placeat magnam. Perferendis quo ducimus in. A aliquam nihil quae voluptates odio.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
              ],
              media: null,
              created_at: "2023-03-17T17:27:34.000000Z",
            },
            {
              id: 2,
              user: {
                id: 110,
                name: "Larue Waelchi",
                profile: {
                  profile_picture:
                    "http://127.0.0.1:8000/assets/images/540f80245b62f9177a9e8460b756a644.png",
                  cover_picture:
                    "http://127.0.0.1:8000/assets/images/4f2ff761d7a0729756b249e1067d637b.png",
                },
                roles: ["ambassador"],
              },
              body: "Necessitatibus molestiae at et temporibus sunt. At explicabo voluptas iure qui quod ut. Quibusdam aliquam sunt quo enim qui.",
              type: "normal",
              replies: [
                {
                  id: 22,
                  user: {
                    id: 97,
                    name: "Dr. Petra Mante",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/0c28f8f11471dacafdd516bf9490204f.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/c12a032a72d45ffc23116164badf5433.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Ut quae et voluptatibus. Aut eius eveniet exercitationem laborum molestias beatae et. Sint non quae quaerat. Quibusdam doloribus est autem ex.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
                {
                  id: 23,
                  user: {
                    id: 97,
                    name: "Dr. Petra Mante",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/0c28f8f11471dacafdd516bf9490204f.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/c12a032a72d45ffc23116164badf5433.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Commodi atque quam facilis quis. Molestias consequatur dolor qui et illo. Cumque et occaecati suscipit dolorum id. Aut temporibus dolor adipisci consequatur culpa. Blanditiis quia dolores vel quos et iste.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
                {
                  id: 24,
                  user: {
                    id: 97,
                    name: "Dr. Petra Mante",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/0c28f8f11471dacafdd516bf9490204f.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/c12a032a72d45ffc23116164badf5433.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Rerum sit quisquam rem nesciunt. Eius quaerat porro et facilis sed facilis voluptatem.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
              ],
              media: null,
              created_at: "2023-03-17T17:27:34.000000Z",
            },
          ],
        },
        {
          id: 2,
          author: "USER 2",
          author_image: "avatar-01.jpg",
          created_at: "12-06-2019",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus",
          comments: [
            {
              id: 1,
              user: {
                id: 110,
                name: "Larue Waelchi",
                profile: {
                  profile_picture:
                    "http://127.0.0.1:8000/assets/images/540f80245b62f9177a9e8460b756a644.png",
                  cover_picture:
                    "http://127.0.0.1:8000/assets/images/4f2ff761d7a0729756b249e1067d637b.png",
                },
                roles: ["ambassador"],
              },
              body: "Quos velit et incidunt et. Qui ut quae consectetur iusto delectus unde possimus blanditiis. Qui quod praesentium et aut et enim deleniti. Quidem non vel hic.",
              type: "normal",
              replies: [
                {
                  id: 17,
                  user: {
                    id: 126,
                    name: "Bill Littel Sr.",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/258b3046efcd6651f4d0a36a3bc3fb61.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/6db2f6a5693227b2a5d13db8f6674d9d.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Et aliquid iste corrupti tempora doloribus aperiam. Sint libero repudiandae perferendis neque autem. Vel amet cum maxime. Possimus enim molestiae exercitationem similique a nihil.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
                {
                  id: 18,
                  user: {
                    id: 126,
                    name: "Bill Littel Sr.",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/258b3046efcd6651f4d0a36a3bc3fb61.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/6db2f6a5693227b2a5d13db8f6674d9d.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Aspernatur vero corrupti esse laboriosam non. Dolore a sed impedit aut. Placeat aperiam ea itaque ipsum rerum.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
                {
                  id: 19,
                  user: {
                    id: 126,
                    name: "Bill Littel Sr.",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/258b3046efcd6651f4d0a36a3bc3fb61.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/6db2f6a5693227b2a5d13db8f6674d9d.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Reiciendis labore corrupti est consectetur similique tenetur aliquid. Odit sapiente vero reiciendis aliquid.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
                {
                  id: 20,
                  user: {
                    id: 126,
                    name: "Bill Littel Sr.",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/258b3046efcd6651f4d0a36a3bc3fb61.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/6db2f6a5693227b2a5d13db8f6674d9d.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Quos esse enim expedita exercitationem odit ab voluptatibus. Maiores corporis eius laudantium quaerat. Debitis fugiat et dolorem perferendis.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
                {
                  id: 21,
                  user: {
                    id: 126,
                    name: "Bill Littel Sr.",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/258b3046efcd6651f4d0a36a3bc3fb61.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/6db2f6a5693227b2a5d13db8f6674d9d.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Ratione est odit dicta consequatur est voluptatem voluptates. Porro reiciendis omnis nihil accusamus ipsam accusantium placeat magnam. Perferendis quo ducimus in. A aliquam nihil quae voluptates odio.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
              ],
              media: null,
              created_at: "2023-03-17T17:27:34.000000Z",
            },
            {
              id: 2,
              user: {
                id: 110,
                name: "Larue Waelchi",
                profile: {
                  profile_picture:
                    "http://127.0.0.1:8000/assets/images/540f80245b62f9177a9e8460b756a644.png",
                  cover_picture:
                    "http://127.0.0.1:8000/assets/images/4f2ff761d7a0729756b249e1067d637b.png",
                },
                roles: ["ambassador"],
              },
              body: "Necessitatibus molestiae at et temporibus sunt. At explicabo voluptas iure qui quod ut. Quibusdam aliquam sunt quo enim qui.",
              type: "normal",
              replies: [
                {
                  id: 22,
                  user: {
                    id: 97,
                    name: "Dr. Petra Mante",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/0c28f8f11471dacafdd516bf9490204f.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/c12a032a72d45ffc23116164badf5433.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Ut quae et voluptatibus. Aut eius eveniet exercitationem laborum molestias beatae et. Sint non quae quaerat. Quibusdam doloribus est autem ex.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
                {
                  id: 23,
                  user: {
                    id: 97,
                    name: "Dr. Petra Mante",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/0c28f8f11471dacafdd516bf9490204f.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/c12a032a72d45ffc23116164badf5433.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Commodi atque quam facilis quis. Molestias consequatur dolor qui et illo. Cumque et occaecati suscipit dolorum id. Aut temporibus dolor adipisci consequatur culpa. Blanditiis quia dolores vel quos et iste.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
                {
                  id: 24,
                  user: {
                    id: 97,
                    name: "Dr. Petra Mante",
                    profile: {
                      profile_picture:
                        "http://127.0.0.1:8000/assets/images/0c28f8f11471dacafdd516bf9490204f.png",
                      cover_picture:
                        "http://127.0.0.1:8000/assets/images/c12a032a72d45ffc23116164badf5433.png",
                    },
                    roles: ["ambassador"],
                  },
                  body: "Rerum sit quisquam rem nesciunt. Eius quaerat porro et facilis sed facilis voluptatem.",
                  type: "replay",
                  replies: [],
                  media: null,
                  created_at: "2023-03-17T17:27:34.000000Z",
                },
              ],
              media: null,
              created_at: "2023-03-17T17:27:34.000000Z",
            },
          ],
        },
        {
          id: 3,
          images: ["p1.jpg", "p2.jpg"],
          author: "USER 3",
          author_image: "avatar-01.jpg",
          created_at: "12-06-2019",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus",
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
  methods: {
    addPost(post) {
      this.posts.unshift(post);
    },
  },
};
</script>
