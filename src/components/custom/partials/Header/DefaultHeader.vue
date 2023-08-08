<template>
  <div class="iq-top-navbar">
    <nav class="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0">
      <div class="container-fluid p-auto">
        <div class="d-flex align-items-center gap-3">
          <router-link :to="{ name: 'osboha.list' }" class="d-flex align-items-center gap-2 iq-header-logo">
            <!-- logo -->
          </router-link>
          <h3 class="logo-title d-none d-sm-block" data-setting="app_name">
            أصبوحة 180
          </h3>
          <a class="sidebar-toggle" @click="toggleSidebar" data-toggle="sidebar" data-active="true">
            <div class="icon material-symbols-outlined iq-burger-menu">
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
            <router-link v-if="advisorAndAbove" :to="{
              name: 'chat.index',
            }" class="d-flex align-items-center justify-content-center ms-2 me-2 position-relative">
              <i class="material-symbols-outlined">forum</i>
              <span v-if="unreadMessages"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                {{ unreadMessages }}
              </span>

            </router-link>

            <router-link :to="{ name: 'osboha.list' }" class="d-flex align-items-center justify-content-center ms-2 me-2">
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
import helper from "@/utilities/helper";
import FriendServices from "@/API/services/friend.service";
import MessageService from "@/API/services/messages.service";
import UserInfoService from "@/Services/userInfoService";

export default {
  name: "DefaultHeader",
  props: {
    image: {
      type: String,
      default: require("@/assets/images/logo.png"),
    },
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

    // Initialize Pusher
    const pusher = new Pusher('0098112dc7c6ed8e4777', {
      cluster: 'ap2',
      encrypted: true,
    });

    const channel = pusher.subscribe('rooms-channel.' + this.user.id);
    // Listen for 'new-message' events
    channel.bind('new-messages', (response) => {
      if (response) {
        this.unreadMessages = response.unreadMessages;
      }

    });

  },
  data() {
    return {
      unreadMessages: 0,
      notifications: [],
      un_read_notifications: 0,
      friendRequest: [],

    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    unread() {
      //by asmaa
      return this.$store.state.unreadNotifications;
    },
    advisorAndAbove() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
      ]);
    },

  },
  mounted() {
    // Pusher.logToConsole = true;
    // var pusher = new Pusher('0098112dc7c6ed8e4777', {
    //   cluster: 'ap2'
    // });

    // var channel = pusher.subscribe('my-channel');
    // channel.bind('my-event', function(data) {
    //   alert(data);
    // });
    // var privateChannel = pusher.subscribe("message-channel." + 4);
    // console.log("🚀 privateChannel:", privateChannel)
    // privateChannel.bind('new-message', function (data) {
    //   alert(data);
    // });

  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
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
