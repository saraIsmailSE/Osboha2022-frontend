<template>
  <li class="nav-item static-item">
    <a class="nav-link static-item disabled" tabindex="-1">
      <span class="default-icon">التحويل العام</span>
      <span
        class="mini-icon"
        data-bs-toggle="tooltip"
        title="Social"
        data-bs-placement="right"
        >-</span
      >
    </a>
  </li>
  <li class="nav-item">
    <router-link
      :class="
        checkActive('general-conversation.index')
          ? 'active nav-link'
          : 'nav-link'
      "
      aria-current="page"
      :to="{
        name: 'general-conversation.index',
      }"
    >
      <i class="icon material-symbols-outlined"> live_help </i>
      <span class="item-name">التحويل العام</span>
    </router-link>
  </li>
  <li class="nav-item" v-if="advisorAndAbove">
    <router-link
      :class="
        checkActive('general-conversation.statistics')
          ? 'active nav-link'
          : 'nav-link'
      "
      aria-current="page"
      :to="{
        name: 'general-conversation.statistics',
      }"
    >
      <i class="icon material-symbols-outlined"> stacked_bar_chart </i>
      <span class="item-name">إحصائيات التحويل العام</span>
    </router-link>
  </li>

  <li class="nav-item" v-if="advisorAndAbove">
    <router-link
      :class="
        checkActive('general-conversation.workingHours')
          ? 'active nav-link'
          : 'nav-link'
      "
      aria-current="page"
      :to="{
        name: 'general-conversation.workingHours',
      }"
    >
      <i class="icon material-symbols-outlined"> more_time </i>
      <span class="item-name">إضافة ساعات العمل</span>
    </router-link>
  </li>
  <li class="nav-item" v-if="isAdmin">
    <router-link
      :class="
        checkActive('general-conversation.workingHoursStats')
          ? 'active nav-link'
          : 'nav-link'
      "
      aria-current="page"
      :to="{
        name: 'general-conversation.workingHoursStats',
      }"
    >
      <i class="icon material-symbols-outlined"> hourglass_top </i>
      <span class="item-name">إحصائيات ساعات العمل</span>
    </router-link>
  </li>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import UserInfoService from "@/Services/userInfoService";

export default {
  name: "DefaultSidebar",
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
    },
    advisorAndAbove() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
      ]);
    },
    consultantAndAbove() {
      return UserInfoService.hasRoles(this.user, ["consultant", "admin"]);
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
          sidebarType.value.filter((item) => item !== "sidebar-mini"),
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
  methods: {
    checkActive(route) {
      if (this.$route.name === route) {
        return true;
      }
    },
  },
};
</script>
