<template>
  <div id="loading">
    <loader />
  </div>
  <!-- loader END -->
  <!-- Wrapper Start -->
  <DefaultSidebar />
  <DefaultHeader :image="logoimage" />
  <div class="main-content">
    <div class="position-relative">
      <template v-for="(option, index) in breadcrumboptions" :key="index">
        <breadcrumb :img="option.img" :title="option.title" v-show="this.$route.meta.name === option.title" />
      </template>
    </div>
    <div id="content-page" class="content-page">
      <div class="container">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <!-- Wrapper End-->
    <DefaultFooter />
    <!-- <DefaultRightSidebar/> -->

    <div v-if="sessionData">
      <CurrentReading :book_in_progress="sessionData.book_in_progress" :progress="sessionData.progress" />
      <ReadingTeam :reading_team="sessionData.reading_team"/>
      <Timer :timer="sessionData.timer" />
    </div>

</div>
</template>
<script>
import DefaultSidebar from '../components/custom/partials/Sidebar/DefaultSidebar'
import DefaultHeader from '../components/custom/partials/Header/DefaultHeader'
import DefaultFooter from '../components/custom/partials/Footer/DefaultFooter'
import CurrentReading from '@/components/custom/partials/Sidebar/LeftSidebar/CurrentReading'
import ReadingTeam from '@/components/custom/partials/Sidebar/LeftSidebar/ReadingTeam'
import Timer from '../components/custom/partials/Sidebar/LeftSidebar/Timer.vue'
import Breadcrumb from '../components/custom/Breadcrumb/Breadcrumb'
import logo from '../assets/images/logo.png'
import authService from "@/API/services/auth.service";


const fslightbox = () => import('../plugins/fslightbox/fslightbox')
export default {
  name: 'Default',
  async created() {
    if (sessionStorage.getItem("AuthSessionData")) {
      this.sessionData = JSON.parse(sessionStorage.getItem("AuthSessionData"));
    } else {
      const response = await authService.sessionData();
      sessionStorage.setItem("AuthSessionData", JSON.stringify(response));
      this.sessionData = response
    }
  },
  mounted() {
    fslightbox()
  },
  components: {
    DefaultSidebar,
    DefaultHeader,
    DefaultFooter,
    Timer,
    CurrentReading,
    ReadingTeam,
    Breadcrumb
  },
  data() {
    return {
      sessionData: null,
      breadcrumboptions: [
        {
          img: require('@/assets/images/page-img/profile-bg2.jpg'),
          title: 'Weather'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Group'
        },
        {
          img: require('@/assets/images/main/book-banner.png'),
          title: 'Group detail'
        },
        {
          img: require('@/assets/images/page-img/profile-bg4.jpg'),
          title: 'Birthday'
        },
        {
          img: require('@/assets/images/page-img/profile-bg5.jpg'),
          title: 'Profile Image'
        },
        {
          img: require('@/assets/images/page-img/profile-bg9.jpg'),
          title: 'Profile Video'
        },
        {
          img: require('@/assets/images/page-img/profile-bg3.jpg'),
          title: 'Friend List'
        },
        {
          img: require('@/assets/images/page-img/profile-bg6.jpg'),
          title: 'Profile Event'
        },
        {
          img: require('@/assets/images/page-img/profile-bg8.jpg'),
          title: 'Music'
        },
        {
          img: require('@/assets/images/page-img/profile-bg6.jpg'),
          title: 'Calendar'
        },
        {
          img: require('@/assets/images/page-img/profile-bg7.jpg'),
          title: 'Store Category'
        },
        {
          img: require('@/assets/images/page-img/profile-bg7.jpg'),
          title: 'Category List'
        },
        {
          img: require('@/assets/images/page-img/profile-bg7.jpg'),
          title: 'Store'
        },
        {
          img: require('@/assets/images/page-img/profile-bg7.jpg'),
          title: 'Store Checkout'
        },
        {
          img: require('@/assets/images/books/book-banner.png'),
          title: 'Book'
        },
        {
          img: require('@/assets/images/profile-bg.jpg'),
          title: 'Infographic'
        }
      ],
      logoimage: logo
    }
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
