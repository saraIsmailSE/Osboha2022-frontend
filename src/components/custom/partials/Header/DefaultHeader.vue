<template>
  <div class="iq-top-navbar" v-if="user">
    <nav class="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0">
      <div class="container-fluid p-auto">
        <div class="d-flex align-items-center gap-3">
          <router-link :to="{ name: 'osboha.list' }" class="d-flex align-items-center gap-2 iq-header-logo">
            <!-- logo -->
          </router-link>
          <h3 class="logo-title d-none d-sm-block" data-setting="app_name">
            أصبوحة 180
          </h3>
          <a id="sidebar-toggle" class="sidebar-toggle" @click="toggleSidebar" data-toggle="sidebar" data-active="true">
            <div class="icon material-symbols-outlined iq-burger-menu" id="toggelBtn">
              menu
            </div>
          </a>
        </div>
        <div class="social-media">
          <p class="mb-0 d-flex">
            <i role="button" @click="logout"
              class="d-flex align-items-center justify-content-center ms-2 me-2 position-relative material-symbols-outlined"
              style="-webkit-transform: scaleX(-1); transform: scaleX(-1)">
              logout
            </i>
            <ThemeScheme />

            <router-link :to="{
              name: 'user.friendsRequests',
              params: {
                user_id: user.id,
              },
            }" class="d-flex align-items-center justify-content-center ms-2 me-2 position-relative">
              <i class="material-symbols-outlined">group</i>
              <span v-if="friendRequest.length > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                {{ friendRequest.length }}
              </span>
            </router-link>
            <router-link :to="{ name: 'osboha.notification' }"
              class="d-flex align-items-center justify-content-center ms-2 me-2 position-relative">
              <i class="material-symbols-outlined">notifications</i>
              <span v-if="unread > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                {{ unread }}
                <span class="visually-hidden">unread messages</span>
              </span>
            </router-link>
            <router-link v-if="LeaderAndAbove" :to="{
              name: 'chat.index',
            }" class="d-flex align-items-center justify-content-center ms-2 me-2 position-relative">
              <i class="material-symbols-outlined">forum</i>
              <span v-if="unreadMessages"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                {{ unreadMessages }}
              </span>
            </router-link>

            <router-link :to="{ name: 'osboha.list' }"
              class="d-flex align-items-center justify-content-center ms-2 me-2">
              <i class="material-symbols-outlined">home</i>
            </router-link>
          </p>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Pusher from "pusher-js";
import notificationsServices from "@/API/services/notifications.service";
import {connectToServer} from "@/utilities/websocket";
import FriendServices from "@/API/services/friend.service";
import MessageService from "@/API/services/messages.service";
import UserInfoService from "@/Services/userInfoService";
import ThemeScheme from "../../setting/sections/ThemeScheme.vue";

export default {
  name: "DefaultHeader",
  props: {
    image: {
      type: String,
      default: require("@/assets/images/logo.png"),
    },
  },
  components: {
    // Style Components
    ThemeScheme,
  },

  setup() {
    const store = useStore();
    const sidebarType = computed(() => store.getters["setting/sidebar_type"]);
    const toggleSidebar = () => {
      // Code Here
      if (sidebarType.value.includes("sidebar-mini")) {
        store.dispatch(
          "setting/sidebar_type",
          sidebarType.value.filter((item) => item !== "sidebar-mini")
        );
      } else {
        store.dispatch("setting/sidebar_type", [
          ...sidebarType.value,
          "sidebar-mini",
        ]);
      }
    };
    return {
      store,
      sidebarType,
      toggleSidebar,
    };
  },
  async created() {
    this.friendRequest = await FriendServices.getFriendsRequests();
    this.unreadMessages = await MessageService.unreadMessages();
    this.unread_notifications = await notificationsServices.listUnreadNotification();


    window.Pusher = require('pusher-js');

    window.Echo = this.connectToServer();

    const channel = window.Echo.channel('rooms-channel.' + this.user.id);

    channel.listen('.new-messages', (data) => {
      if (data) {
        this.unreadMessages = data.unreadMessages;
      }
    });
  },
  data() {
    return {
      unreadMessages: 0,
      notifications: [],
      unread_notifications: 0,
      friendRequest: [],
      deferredPrompt: "test",
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    unread() {
      //by asmaa
      //return this.$store.state.unreadNotifications;
      return this.unread_notifications.length;
    },
    LeaderAndAbove() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
        "leader",
      ]);
    },
  },
  mounted() {
    window.addEventListener("beforeinstallprompt", this.handelinstall);
  },
  beforeUnmount() {
    window.removeEventListener("beforeinstallprompt", this.handelinstall);
  },

  methods: {
    connectToServer,
    logout() {
      this.$store.dispatch("logout");
    },
    handelinstall(event) {
      event.preventDefault();
      if (!this.$cookies.get("add-to-home-screen")) {
        const swalWithBootstrapButtons = this.$swal.mixin({
          customClass: {
            confirmButton: "btn btn-primary btn-lg",
            cancelButton: "btn btn-outline-primary btn-lg ms-2",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "تطبيق مصغر بانتظارك",
            text: `بإمكانك الان تحميل تطبيق (أصبوحة 180) على هاتفك المحمول لتكون تجربتك في استخدامه دائما سهلة وميسرة`,
            imageUrl: require("@/assets/images/main/signup.png"),
            showCancelButton: true,
            confirmButtonText: "تحميل",
            cancelButtonText: "لاحقًا  ",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
          })
          .then((willDelete) => {
            if (willDelete.isConfirmed) {
              event.prompt();
            } else {
              this.$cookies.set("add-to-home-screen", "later", { expires: 5 });
            }
          });
      }
    },
  },
};
</script>
<style>
.iq-top-navbar {
  padding: 1%;
  min-height: 4.563rem;
  line-height: unset;
}
</style>