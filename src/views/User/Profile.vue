<template>
  <div class="row">
    <div class="col-sm-12">

      <!-- START MAIN INFORMATION -->
      <MainInfo :user_name="'user_name'" :roles="roles" :readingInfo="readingInfo" />
      <!-- END MAIN INFORMATION -->

      <!-- START PROFILE NAVIGATION -->
      <iq-card class="iq-card">
        <div class="iq-card-body p-0">
          <div class="user-tabing">
            <tab-nav :pills="true" id="pills-tab"
              class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
              <tab-nav-items class="col-sm-3 p-0" :active="true" id="pills-feed-tab" href="#profile-feed"
                ariaControls="pills-home" role="tab" :ariaSelected="true" title="الرئيسية" />
              <tab-nav-items class="col-sm-3 p-0" :active="false" id="pills-bout-tab" href="#profile-about"
                ariaControls="pills-profile" role="tab" :ariaSelected="false" title="معلومات المستخدم" />
              <tab-nav-items class="col-sm-3 p-0" :active="false" id="pills-books-tab" href="#profile-books"
                ariaControls="pills-contact" role="tab" :ariaSelected="false" title="الكتب" />
              <tab-nav-items class="col-sm-3 p-0" :active="false" id="pills-statistics-tab" href="#profile-statistics"
                ariaControls="pills-contact" role="tab" :ariaSelected="false" title="احصائيات" />
            </tab-nav>
          </div>
        </div>
      </iq-card>
      <!-- END PROFILE NAVIGATION -->
    </div>


    <div class="col-sm-12">
      <div class="tab-content">

        <!-- ########## START PROFILE FEED ########## -->
        <ProfileFeed :posts="posts" :friends="friends" :exceptions="exceptions" :profile_media="profile_media" />
        <!-- ########## END PROFILE FEED ########## -->

        <!-- ########## START ABOUT ########## -->
        <tab-content-item :active="false" id="profile-about" aria-labelled-by="pills-about-tab">
          <iq-card>
            <template v-slot:body>
              <About :user_about="user_about" />
            </template>
          </iq-card>
        </tab-content-item>
        <!-- ########## End ABOUT ########## -->


        <!-- ########## START GROUPS ########## -->
        <tab-content-item :active="false" id="profile-books" aria-labelled-by="pills-book-tab">
          <Books />
        </tab-content-item>
        <!-- ########## END GROUPS ########## -->

        <!-- ########## START STATISTICS ########## -->
        <tab-content-item :active="false" id="profile-statistics" aria-labelled-by="pills-statistics-tab">
          <Statistics />
        </tab-content-item>
        <!-- ########## END STATISTICS ########## -->

      </div>
    </div>
  </div>
</template>
<script>
import { socialvue } from '@/config/pluginInit'
import About from './Sections/About.vue'
import Books from './Sections/Books.vue'
import MainInfo from './Sections/MainInfo.vue'
import ProfileFeed from './Sections/ProfileFeed.vue'
import Statistics from './Sections/Statistics.vue'

import UserProfile from '@/API/services/user-profile.service'


export default {
  name: 'Profile',
  mounted() {
    socialvue.index()
  },
  components: {
    MainInfo,
    ProfileFeed,
    About,
    Books,
    Statistics
  },
  async created() {
    const profile = await UserProfile.getUserProfileById(this.$route.params.user_id);
    this.readingInfo[0].value = profile.reading_Info.books;
    this.readingInfo[1].value = profile.reading_Info.thesis;
    this.roles = profile.roles;
    this.friends=profile.friends;
    this.exceptions=profile.exceptions;
    this.user_about=profile.info
  },
  data() {
    return {
      roles: null,
      readingInfo: [
        {
          title: 'الكتب المقروءة',
          value: 0
        },
        {
          title: 'الاطروحات',
          value: 0
        },
        //LATER
        // {
        //   title: 'الأنشطة والدورات',
        //   value: 100
        // }
      ],
posts:null,
      // posts: [
      //   {
      //     id: 1,
      //     // images: ['1900-475.jpg'],
      //     author: 'USER',
      //     author_image: 'avatar-02.jpg',
      //     created_at: '12-06-2019',
      //     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
      //     comments: [
      //       {
      //         author: 'USER',
      //         author_image: 'avatar-02.jpg',
      //         created_at: '12-06-2019',
      //         body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
      //       },
      //       {
      //         // image: '1900-475.jpg',
      //         author: 'USER',
      //         author_image: 'avatar-02.jpg',
      //         created_at: '12-06-2019',
      //         body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
      //       },
      //     ]
      //   },
      //   {
      //     id: 2,
      //     author: 'USER 2',
      //     author_image: 'avatar-02.jpg',
      //     created_at: '12-06-2019',
      //     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
      //     comments: [
      //       {
      //         author: 'USER',
      //         author_image: 'avatar-02.jpg',
      //         created_at: '12-06-2019',
      //         body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
      //       },
      //       {
      //         // image: ['1900-475.jpg'],
      //         author: 'USER',
      //         author_image: 'avatar-02.jpg',
      //         created_at: '12-06-2019',
      //         body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
      //       },
      //       {
      //         author: 'USER',
      //         author_image: 'avatar-02.jpg',
      //         created_at: '12-06-2019',
      //         body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
      //       },
      //       {
      //         image: 'profile-bg9.jpg',
      //         author: 'USER',
      //         author_image: 'avatar-02.jpg',
      //         created_at: '12-06-2019',
      //         body: 'Lorem ipsum dolor sit amet, aucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
      //       },
      //     ]
      //   },
      //   {
      //     id: 3,
      //     // images: ['710-950.jpg', '710-450.jpg'],
      //     author: 'USER 3',
      //     author_image: 'avatar-02.jpg',
      //     created_at: '12-06-2019',
      //     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',

      //   },
      // ],
      //LATER
      // certificates: [
      //   {
      //     img: require('../../assets/images/certificates/cer1.png'),
      //     heading: 'دورة كتابة الأطروحة',
      //   },
      // ],
      
      // {
      //     img: require('../../assets/images/150x150.jpg'),
      //     name: 'Anna Rexia'
      //   }
  
      friends: null,
      profile_media: [
        require('../../assets/images/600x600.jpg'),
        require('../../assets/images/600x600.jpg'),
        require('../../assets/images/600x600.jpg'),
        require('../../assets/images/600x600.jpg'),
        require('../../assets/images/600x600-2.jpg'),
        require('../../assets/images/600x600.jpg'),
        require('../../assets/images/600x600-2.jpg'),
        require('../../assets/images/600x600-2.jpg'),
        require('../../assets/images/600x600.jpg')
      ],

      user_about:null,

      exceptions:null,
    }
  },
  methods: {
  }
}
</script>
