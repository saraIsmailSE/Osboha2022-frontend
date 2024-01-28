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
        <breadcrumb
          :img="option.img"
          :title="option.title"
          v-show="this.$route.meta.name === option.title"
        />
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
      <CurrentReading
        :book_in_progress="sessionData.book_in_progress"
        :progress="sessionData.progress"
      />
      <ReadingTeam :reading_team="sessionData.reading_team" />
      <Timer :timer="sessionData.timer" />
      <LastException :lastException="sessionData.last_exception" v-if="sessionData.last_exception" />
    </div>
  </div>
</template>
<script>
import DefaultSidebar from "../components/custom/partials/Sidebar/DefaultSidebar";
import DefaultHeader from "../components/custom/partials/Header/DefaultHeader";
import DefaultFooter from "../components/custom/partials/Footer/DefaultFooter";
import CurrentReading from "@/components/custom/partials/Sidebar/LeftSidebar/CurrentReading";
import ReadingTeam from "@/components/custom/partials/Sidebar/LeftSidebar/ReadingTeam";
import Timer from "@/components/custom/partials/Sidebar/LeftSidebar/Timer.vue";
import LastException from "@/components/custom/partials/Sidebar/LeftSidebar/LastException";
import Breadcrumb from "../components/custom/Breadcrumb/Breadcrumb";
import logo from "../assets/images/logo.png";
import authService from "@/API/services/auth.service";

const fslightbox = () => import("../plugins/fslightbox/fslightbox");
export default {
  name: "Default",
  async created() {
    this.getSessionData();
  },
  mounted() {
    fslightbox();
  },
  components: {
    DefaultSidebar,
    DefaultHeader,
    DefaultFooter,
    Timer,
    LastException,
    CurrentReading,
    ReadingTeam,
    Breadcrumb,
  },
  data() {
    return {
      sessionData: null,
      breadcrumboptions: [
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Weather",
        },
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Group",
        },
        {
          img: require("@/assets/images/main/book-banner.png"),
          title: "Group detail",
        },
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Birthday",
        },
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Profile Image",
        },
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Profile Video",
        },
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Friend List",
        },
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Profile Event",
        },
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Music",
        },
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Calendar",
        },
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Store Category",
        },
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Category List",
        },
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Store",
        },
        {
          img: require("@/assets/images/main/book-banner-2.png"),
          title: "Store Checkout",
        },
        {
          img: require("@/assets/images/books/book-banner.png"),
          title: "Book",
        },
        {
          img: require("@/assets/images/main/book-banner.png"),
          title: "Infographic",
        },
      ],
      logoimage: logo,
    };
  },
  watch: {
    $route(to, from) {
      this.getSessionData();
    },
  },
  methods: {
    async getSessionData() {
      const session = JSON.parse(sessionStorage.getItem("AuthSessionData"));
      const sessionExpiry = sessionStorage.getItem("AuthSessionExpiry");
      if (session && sessionExpiry && sessionExpiry > Date.now()) {
        this.sessionData = session;
      } else {
        try {
          const response = await authService.sessionData();
          //set expiry to 2 hours
          const expiry = Date.now() + 2 * 60 * 60 * 1000;
          sessionStorage.setItem("AuthSessionData", JSON.stringify(response));
          sessionStorage.setItem("AuthSessionExpiry", expiry);
          this.sessionData = response;
        } catch (error) {
          console.log(error);
        }
      }

      this.$store.commit("SET_MAIN_TIMER", this.sessionData?.timer?.main_timer);
      this.$store.commit(
        "SET_WEEK_START_DATE",
        this.sessionData?.timer?.created_at,
      );
      this.$store.commit("SET_WEEK_TITLE", this.sessionData?.timer?.title);
    },
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
