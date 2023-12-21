<template>
    <loader />
    <!-- loader END -->
    <!-- Wrapper Start -->
    <div class="wrapper">
       <DefaultHeader :image="logoimage"/>
       <DefaultRightSidebar/>
       <template v-for="(option,index) in breadcrumboptions" :key="index">
          <breadcrumb :img="option.img" :title="option.title" v-show="this.$route.meta.name === option.title"/>
       </template>
       <div id="content-page" class="content-page">
         <div class="container">
          <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
          </router-view>
         </div>
      </div>
    </div>
    <!-- Wrapper End-->
    <DefaultFooter/>
</template>
<script>
import DefaultHeader from '../components/custom/partials/Header/DefaultHeader'
import DefaultFooter from '../components/custom/partials/Footer/DefaultFooter'
import DefaultRightSidebar from '../components/custom/partials/Sidebar/RightSidebar/DefaultRightSidebar'
import Breadcrumb from '../components/custom/Breadcrumb/Breadcrumb'
import logo from '../assets/images/logo.png'
export default {
  name: 'WithoutLeftside',
  components: {
    DefaultHeader,
    DefaultFooter,
    DefaultRightSidebar,
    Breadcrumb
  },
  data () {
    return {
      breadcrumboptions: [
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Weather'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Group'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Group detail'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Birthday'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Profile Image'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Profile Video'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Friend List'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Profile Event'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Music'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Calendar'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Store Category'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Category List'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Store'
        },
        {
          img: require('@/assets/images/main/book-banner-2.png'),
          title: 'Store Checkout'
        }
      ],
      logoimage: logo
    }
  }
}
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>
