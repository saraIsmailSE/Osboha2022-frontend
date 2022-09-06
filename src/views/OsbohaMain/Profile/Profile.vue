<template>
  <div class="row">
    <div class="col-sm-12">
      <iq-card>
        <div class="iq-card-body profile-page p-0">
          <div class="profile-header">
            <div class="cover-container">
              <img src="../../../assets/images/profile-bg.jpg" alt="profile-bg" class="rounded img-fluid">
              <ul class="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0">
                <li><a href="#" class="material-symbols-outlined">
                    edit
                  </a>
                </li>
                <li><a href="#" class="material-symbols-outlined">
                    settings
                  </a>
                </li>
              </ul>
            </div>
            <div class="user-detail text-center mb-3">
              <div class="profile-img">
                <img src="../../../assets/images/profile-img.jpg" alt="profile-img" class="avatar-130 img-fluid" />
              </div>
              <div class="profile-detail">
                <h3 class="">مستخدم أصبوحي</h3>
              </div>
            </div>
            <div class="profile-info p-4 d-flex align-items-center justify-content-between position-relative">
              <div class="social-links">
                <ul class="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                  <li v-for="(item, index) in social" :key="index" class="text-center pe-3">
                    <a href="javasctipt:void(0)"><img :src="item" class="img-fluid rounded" alt="facebook"></a>
                  </li>
                </ul>
              </div>
              <div class="social-info">
                <ul class="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                  <li v-for="(i, index) in soicalInfo" :key="index" class="text-center ps-3">
                    <h6>{{ i.name }}</h6>
                    <p class="mb-0">{{ i.value }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </iq-card>
      <iq-card class="iq-card">
        <div class="iq-card-body p-0">
          <div class="user-tabing">
            <tab-nav :pills="true" id="pills-tab"
              class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
              <tab-nav-items class="col-sm-3 p-0" :active="true" id="pills-feed-tab" href="#profile-feed"
                ariaControls="pills-home" role="tab" :ariaSelected="true" title="الرئيسية" />
              <tab-nav-items class="col-sm-3 p-0" :active="false" id="pills-bout-tab" href="#profile-about"
                ariaControls="pills-profile" role="tab" :ariaSelected="false" title="معلومات المستخدم" />
              <tab-nav-items class="col-sm-3 p-0" :active="false" id="pills-group-tab" href="#profile-group"
                ariaControls="pills-contact" role="tab" :ariaSelected="false" title="المجموعات" />
              <tab-nav-items class="col-sm-3 p-0" :active="false" id="pills-statistics-tab" href="#profile-statistics"
                ariaControls="pills-contact" role="tab" :ariaSelected="false" title="احصائيات" />
            </tab-nav>
          </div>
        </div>
      </iq-card>
    </div>
    <div class="col-sm-12">
      <div class="tab-content">

        <tab-content-item :active="true" id="profile-feed" aria-labelled-by="pills-feed-tab">
          <div class="iq-card-body p-0">
            <div class="row">
              <div class="col-lg-4">

                <!-- ########## START CURRENT READING ########## -->
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">كتب أقرأها</h4>
                  </template>
                  <template v-slot:headerAction>
                    <p class="m-0"><a href="#"> عرض الكل </a></p>
                  </template>
                  <template v-slot:body>
                    <div class="row">
                      <div class="col-sm-12" v-for="(book, index) in currentBooks" :key="index">
                        <div class="book-post position-relative">
                          <a href="#">
                            <img :src="book.img" alt="gallary-image" class="img-fluid rounded"></a>
                          <div class="job-icon-position">
                            <div
                              class="job-icon bg-primary p-2 d-inline-block rounded-circle material-symbols-outlined text-white">
                              auto_stories
                            </div>
                          </div>
                          <div class="iq-card-body text-center p-2">
                            <h5 class="text-center">{{ book.heading }}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </iq-card>
                <!-- ########## END CURRENT READING ########## -->

                <!-- ########## START PHOTOS ########## -->
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">صور</h4>
                  </template>
                  <template v-slot:headerAction>
                    <p class="m-0"><a href="#">مشاهدة الكل </a></p>
                  </template>
                  <template v-slot:body>
                    <ul class="profile-img-gallary p-0 m-0 list-unstyled">
                      <li v-for="(photo, index) in phtoes" :key="index">
                        <a data-fslightbox="gallery" :href="photo"><img :src="photo" alt="gallary-image"
                            class="img-fluid" /></a>
                      </li>
                    </ul>
                  </template>
                </iq-card>
                <!-- ########## END PHOTOS ########## -->

                <!-- ########## START FRIENDS ########## -->
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">الأصدقاء</h4>
                  </template>
                  <template v-slot:headerAction>
                    <p class="m-0"><a href="javacsript:void();">مشاهدة الكل</a></p>
                  </template>
                  <template v-slot:body>
                    <ul class="profile-img-gallary p-0 m-0 list-unstyled">
                      <li v-for="(friend, index) in friends" :key="index">
                        <a href="require('../../../assets/images/gallery/grid/60x60.jpg')">
                          <img :src="friend.img" alt="gallary-image" class="img-fluid" /></a>
                        <h6 class="mt-2 text-center">{{ friend.name }}</h6>
                      </li>
                    </ul>
                  </template>
                </iq-card>
                <!-- ########## END FRIENDS ########## -->

              </div>
              <div class="col-lg-8">
                <div id="post-modal-data" class="iq-card">
                  <!-- ##### <AddPost /> ##### -->
                  <AddPost @addPost="addPost"></AddPost>
                  <!-- ##### <AddPost /> ##### -->

                  <!-- ##### LIST POSTS ##### -->
                  <Post v-for="post in posts" :key="post.id" :post="post" />
                  <!-- ##### END LIST POSTS ##### -->

                </div>
              </div>
            </div>
          </div>
        </tab-content-item>

        <tab-content-item :active="false" id="profile-about" aria-labelled-by="pills-about-tab">
          <iq-card>
            <template v-slot:body>
              <About />
            </template>
          </iq-card>
        </tab-content-item>

        <!-- ########## START GROUPS ########## -->
        <tab-content-item :active="false" id="profile-group" aria-labelled-by="pills-group-tab">
          <iq-card>
            <template v-slot:body>
              <h2>المجموعات</h2>
              <div v-if="!groups.length">لا يوجد مجموعات</div>
              <ListGroups :groups="groups" />
            </template>
          </iq-card>
        </tab-content-item>
        <!-- ########## END GROUPS ########## -->
        
        <!-- ########## START STATISTICS ########## -->
        <tab-content-item :active="false" id="profile-statistics" aria-labelled-by="pills-statistics-tab">
          <iq-card>
            <template v-slot:body>
              <h2>احصائيات</h2>
              <div class="tab-content">
                <tab-content-item :active="true" id="photo-you" aria-labelled-by="pills-photo-you-tab">
                  <Marks />
                </tab-content-item>
              </div>
            </template>
          </iq-card>
        </tab-content-item>
        <!-- ########## END STATISTICS ########## -->

      </div>
    </div>
    <div class="col-sm-12 text-center">
      <img src="../../../assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;">
    </div>
  </div>
</template>
<script>
import { socialvue } from '../../../config/pluginInit'
import ListGroups from '../../../components/group/ListView1.vue'
import About from './ProfileFriends/About'
import Post from '../../../components/post/Post.vue'
import AddPost from '../../../components/post/AddPost'
import Marks from '../../../components/statistics/Marks.vue'

export default {
  name: 'Profile',
  mounted() {
    socialvue.index()
  },
  components: {
    ListGroups,
    AddPost,
    Post,
    About,
    Marks
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          images: ['1900-475.jpg'],
          author: 'USER',
          author_image: '60x60.jpg',
          created_at: '12-06-2019',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
          comments: [
            {
              author: 'USER',
              author_image: '60x60.jpg',
              created_at: '12-06-2019',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
            },
            {
              image: '1900-475.jpg',
              author: 'USER',
              author_image: '60x60.jpg',
              created_at: '12-06-2019',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
            },
          ]
        },
        {
          id: 2,
          author: 'USER 2',
          author_image: '60x60.jpg',
          created_at: '12-06-2019',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
          comments: [
            {
              author: 'USER',
              author_image: '60x60.jpg',
              created_at: '12-06-2019',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
            },
            {
              image: ['1900-475.jpg'],
              author: 'USER',
              author_image: '60x60.jpg',
              created_at: '12-06-2019',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
            },
            {
              author: 'USER',
              author_image: '60x60.jpg',
              created_at: '12-06-2019',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
            },
            {
              image: 'profile-bg9.jpg',
              author: 'USER',
              author_image: '60x60.jpg',
              created_at: '12-06-2019',
              body: 'Lorem ipsum dolor sit amet, aucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
            },
          ]
        },
        {
          id: 3,
          images: ['710-950.jpg', '710-450.jpg'],
          author: 'USER 3',
          author_image: '60x60.jpg',
          created_at: '12-06-2019',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',

        },
      ],
      social: [
        require('../../../assets/images/icon/08.png'),
        require('../../../assets/images/icon/09.png'),
        require('../../../assets/images/icon/10.png'),
        require('../../../assets/images/icon/11.png'),
        require('../../../assets/images/icon/12.png'),
        require('../../../assets/images/icon/13.png')
      ],
      currentBooks: [
        {
          img: require('../../../assets/images/800x533.jpg'),
          heading: 'كتاب 1',
        },
        {
          img: require('../../../assets/images/800x533-2.jpg'),
          heading: 'كتاب 2',
        }
      ],
      friends: [
        {
          img: require('../../../assets/images/150x150.jpg'),
          name: 'Anna Rexia'
        },
        {
          img: require('../../../assets/images/150x150.jpg'),
          name: 'Tara Zona'
        },
        {
          img: require('../../../assets/images/150x150-2.jpg'),
          name: 'Polly Tech'
        },
        {
          img: require('../../../assets/images/150x150.jpg'),
          name: 'Bill Emia'
        },
        {
          img: require('../../../assets/images/150x150-2.jpg'),
          name: 'Moe Fugga'
        },
       
      ],
      soicalInfo: [
        {
          name: 'عدد الكتب المقروءة',
          value: 90
        },
        {
          name: 'عدد الاطروحات',
          value: 130
        },
        {
          name: 'عدد الاقتباسات',
          value: 100
        }
      ],
      phtoes: [
        require('../../../assets/images/600x600.jpg'),
        require('../../../assets/images/600x600.jpg'),
        require('../../../assets/images/600x600.jpg'),
        require('../../../assets/images/600x600.jpg'),
        require('../../../assets/images/600x600-2.jpg'),
        require('../../../assets/images/600x600.jpg'),
        require('../../../assets/images/600x600-2.jpg'),
        require('../../../assets/images/600x600-2.jpg'),
        require('../../../assets/images/600x600.jpg')
      ],

      profileImages: [
        {
          img: require('../../../assets/images/page-img/51.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 10
            },
            {
              class: 'chat_bubble_outline',
              value: 2

            },
            {
              class: 'forward',
              value: 1
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/52.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 10
            },
            {
              class: 'chat_bubble_outline',
              value: 2

            },
            {
              class: 'forward',
              value: 1
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/53.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 120
            },
            {
              class: 'chat_bubble_outline',
              value: 21

            },
            {
              class: 'forward',
              value: 10
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/54.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 100
            },
            {
              class: 'chat_bubble_outline',
              value: 20

            },
            {
              class: 'forward',
              value: 120
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/55.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 107
            },
            {
              class: 'chat_bubble_outline',
              value: 20

            },
            {
              class: 'forward',
              value: 101
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/56.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 105
            },
            {
              class: 'chat_bubble_outline',
              value: 25

            },
            {
              class: 'forward',
              value: 15
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/57.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 107
            },
            {
              class: 'chat_bubble_outline',
              value: 27

            },
            {
              class: 'forward',
              value: 17
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/58.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 106
            },
            {
              class: 'chat_bubble_outline',
              value: 26

            },
            {
              class: 'forward',
              value: 14
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/59.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 10
            },
            {
              class: 'chat_bubble_outline',
              value: 24

            },
            {
              class: 'forward',
              value: 14
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/60.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 10
            },
            {
              class: 'chat_bubble_outline',
              value: 24

            },
            {
              class: 'forward',
              value: 1
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/61.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 60
            },
            {
              class: 'chat_bubble_outline',
              value: 30

            },
            {
              class: 'forward',
              value: 10
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/62.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 60
            },
            {
              class: 'chat_bubble_outline',
              value: 24

            },
            {
              class: 'forward',
              value: 10
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/63.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 60
            },
            {
              class: 'chat_bubble_outline',
              value: 30

            },
            {
              class: 'forward',
              value: 10
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/64.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 60
            },
            {
              class: 'chat_bubble_outline',
              value: 30

            },
            {
              class: 'forward',
              value: 10
            }
          ]
        },
        {
          img: require('../../../assets/images/page-img/65.jpg'),
          otherInfo: [
            {
              class: 'thumb_up',
              value: 60
            },
            {
              class: 'chat_bubble_outline',
              value: 30

            },
            {
              class: 'forward',
              value: 10
            }
          ]
        }
      ],

      groups: [
        {
          image: require('../../../assets/images/150x150-3.jpg'),
          name: 'مجموعة 1',
          date: '24-02-2000'
        },
        {
          image: require('../../../assets/images/150x150-2.jpg'),
          name: 'مجموعة 2',
          date: '24-02-2000'
        },
        {
          image: require('../../../assets/images/150x150-3.jpg'),
          name: 'مجموعة 3',
          date: '24-02-2000'
        },
        {
          image: require('../../../assets/images/150x150.jpg'),
          name: 'مجموعة 4',
          date: '24-02-2000'
        },
        {
          image: require('../../../assets/images/150x150.jpg'),
          name: 'مجموعة 5',
          date: '24-02-2000'
        },
      ],
    }
  },
  methods: {
    addPost() {
      this.socialPosts.unshift()
    }
  }
}
</script>
