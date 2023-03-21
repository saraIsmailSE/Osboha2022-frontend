<template>
  <div class="row">
    <div class="col-lg-12">
      <div
        class="d-flex align-items-center justify-content-between mb-3 flex-wrap"
      >
        <div class="group-info d-flex align-items-center">
          <div class="me-3">
            <img
              class="rounded-circle img-fluid avatar-100"
              src="@/assets/images/main/current_book.png"
              alt=""
            />
          </div>
          <div class="info">
            <h4>{{ groupInfo.name }}</h4>
            <p class="mb-0">
              <i class="ri-lock-fill pe-2"></i>{{ groupInfo.type }} .
              {{ groupInfo.members }} سفير
            </p>
          </div>
        </div>
        <listMembers :members="members" />
      </div>
    </div>
    <div class="col-lg-4">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">عن المجموعة</h4>
          </div>
        </div>
        <div class="card-body">
          <ul class="list-inline p-0 m-0">
            <li class="mb-3">
              <h3 class="mb-0">{{ groupInfo.name }}</h3>
            </li>
            <li class="mb-3">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <i class="material-symbols-outlined">group</i>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h4>رسالة المجموعة المجموعة</h4>
                  <p class="mb-0">
                    لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة المتمثلة
                    في إدانة السرور ومدح الألم ، وسأقدم لك وصفًا كاملاً للنظام ،
                    وأشرح التعاليم الفعلية للمستكشف العظيم للحقيقة ، الباني
                    البارع. السعادة البشرية
                  </p>
                </div>
              </div>
            </li>
            <li class="mb-3">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <i class="material-symbols-outlined">group</i>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h4>قائد المجموعة</h4>
                  <p class="mb-0">{{ groupInfo.leader }}</p>
                </div>
              </div>
            </li>
            <li class="mb-3">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <i class="material-symbols-outlined">group</i>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h4>مراقب المجموعة</h4>
                  <p class="mb-0">{{ groupInfo.supervispr }}</p>
                </div>
              </div>
            </li>

            <li class="mb-3">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <i class="material-symbols-outlined">group</i>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h4>موجه المجموعة</h4>
                  <p class="mb-0">{{ groupInfo.supervispr }}</p>
                </div>
              </div>
            </li>

            <li class="mb-3">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <i class="material-symbols-outlined">trending_up</i>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h4>{{ groupInfo.avg }}</h4>
                  <p class="mb-0">معدل الأسبوع الرابع</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">الوصول السريع</h4>
          </div>
        </div>
        <div class="card-body row d-flex justify-content-center">
          <router-link to="/" class="btn btn-primary d-block mt-3 col-5 me-1"
            >احصائيات المجموعة
          </router-link>
          <router-link to="/" class="btn btn-primary d-block mt-3 col-5 me-1"
            >كتب يقرأوها الأعضاء
          </router-link>
          <router-link to="/" class="btn btn-primary d-block mt-3 col-5 me-1"
            >الاجازات</router-link
          >
          <router-link to="/" class="btn btn-primary d-block mt-3 col-5 me-1"
            >التحديات</router-link
          >
          <router-link
            to="/ambassadors-reading"
            class="btn btn-primary d-block mt-3 col-5 me-1"
            >انجاز السفراء
          </router-link>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div id="post-modal-data" class="card">
        <!-- ##### <AddPost /> ##### -->
        <AddPost @addPost="addPost"></AddPost>
        <!-- ##### <AddPost /> ##### -->
      </div>
      <div class="card">
        <div class="card-body">
          <!-- ##### LIST POSTS ##### -->
          <Post v-for="post in posts" :key="post.id" :post="post" />
          <!-- ##### END LIST POSTS ##### -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import listMembers from "../../../components/group/members.vue";
import Post from "../../../components/post/Post.vue";
import AddPost from "../../../components/post/AddPost";

export default {
  name: "Group-detail",
  components: {
    listMembers,
    Post,
    AddPost,
  },
  data() {
    return {
      header2: [
        require("../../../assets/images/user/05.jpg"),
        require("../../../assets/images/user/06.jpg"),
        require("../../../assets/images/user/07.jpg"),
        require("../../../assets/images/user/08.jpg"),
        require("../../../assets/images/user/09.jpg"),
        require("../../../assets/images/user/10.jpg"),
        require("../../../assets/images/user/11.jpg"),
        require("../../../assets/images/user/12.jpg"),
      ],
      groupInfo: {
        name: "مجموعة القراءة",
        members: 30,
        type: "فريق المتابعة",
        leader: "Leader 1",
        supervispr: "Supervisor 1",
        avg: 80.54,
      },
      header1: [
        {
          b1: "Invite",
        },
      ],
      members: [
        {
          name: "group user",
          image: "03.jpg",
          profile: "profile",
        },
        {
          name: "group user",
          image: "03.jpg",
          profile: "profile",
        },
        {
          name: "group user",
          image: "03.jpg",
          profile: "profile",
        },
        {
          name: "group user",
          image: "03.jpg",
          profile: "profile",
        },
        {
          name: "group user",
          image: "03.jpg",
          profile: "profile",
        },
        {
          name: "group user",
          image: "03.jpg",
          profile: "profile",
        },
        {
          name: "group user",
          image: "03.jpg",
          profile: "profile",
        },
        {
          name: "group user",
          image: "03.jpg",
          profile: "profile",
        },
      ],
      posts: [
        {
          id: 1,
          images: ["150x150-3.jpg"],
          author: "USER",
          author_image: "avatar-02.jpg",
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
          author_image: "avatar-02.jpg",
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
          images: ["150x150-3.jpg", "150x150-3.jpg"],
          author: "USER 3",
          author_image: "avatar-02.jpg",
          created_at: "12-06-2019",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus",
        },
      ],
    };
  },
};
</script>
