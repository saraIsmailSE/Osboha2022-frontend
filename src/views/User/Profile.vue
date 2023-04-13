<template>
  <div class="row" v-if="profile">
    <div class="col-sm-12">

      <!-- START MAIN INFORMATION -->
      <MainInfo :auth="auth" :friendWithAuth="friendWithAuth" :user="profile.user" :roles="profile.roles" :readingInfo="readingInfo" :profile="profile.info"/>
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
        <ProfileFeed :isAuth="isAuth" :posts="posts" :friends="profile.friends" :exceptions="profile.exceptions"
          :profile_media="profile_media" />
        <!-- ########## END PROFILE FEED ########## -->

        <!-- ########## START ABOUT ########## -->
        <tab-content-item :active="false" id="profile-about" aria-labelled-by="pills-about-tab">
          <iq-card>
            <template v-slot:body>
              <About :user_about="profile.info" :user="profile.user" :social_media="profile.social_media" />
            </template>
          </iq-card>
        </tab-content-item>
        <!-- ########## End ABOUT ########## -->


        <!-- ########## START Books ########## -->
        <tab-content-item :active="false" id="profile-books" aria-labelled-by="pills-book-tab">
          <Books :isAuth="isAuth" :books="profile.books" />
        </tab-content-item>
        <!-- ########## END Books ########## -->

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
import About from './Sections/About.vue'
import Books from './Sections/Books.vue'
import MainInfo from './Sections/MainInfo.vue'
import ProfileFeed from './Sections/ProfileFeed.vue'
import Statistics from './Sections/Statistics.vue'
import UserInfo from '@/Services/userInfoService'

import UserProfile from '@/API/services/user-profile.service'


export default {
  name: 'Profile',
  components: {
    MainInfo,
    ProfileFeed,
    About,
    Books,
    Statistics
  },
  async created() {
    const user_data = await UserInfo.getUser();
    this.auth = user_data.user;
    this.profile = await UserProfile.getUserProfileById(this.$route.params.user_id);
    this.readingInfo[0].value = this.profile.reading_Info.books;
    this.readingInfo[1].value = this.profile.reading_Info.thesis;
    this.friendWithAuth=this.profile.friendWithAuth

  },
  data() {
    return {
      auth:0,
      profile: null,
      friendWithAuth:false,
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
      posts: null,
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
    }
  },
  methods: {
  },
}
</script>
