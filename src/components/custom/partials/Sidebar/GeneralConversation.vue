<template>
  <li class="nav-item static-item">
    <a class="nav-link static-item disabled" tabindex="-1">
      <span class="default-icon">التحويل العام</span>
      <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
    </a>
  </li>
  <li class="nav-item">
    <router-link :class="checkActive('general-conversation.index')
        ? 'active nav-link'
        : 'nav-link'
      " aria-current="page" :to="{
        name: 'general-conversation.index',
      }">
      <i class="icon material-symbols-outlined"> live_help </i>
      <span class="item-name">التحويل العام</span>
    </router-link>
  </li>
  <li class="nav-item" v-if="advisorAndAbove">
    <router-link :class="checkActive('general-conversation.statistics')
        ? 'active nav-link'
        : 'nav-link'
      " aria-current="page" :to="{
        name: 'general-conversation.statistics',
      }">
      <i class="icon material-symbols-outlined"> stacked_bar_chart </i>
      <span class="item-name">إحصائيات التحويل العام</span>
    </router-link>
  </li>

  <li class="nav-item" v-if="advisorAndAbove">
    <router-link
      :class="
        checkActive('working-hours.index') ? 'active nav-link' : 'nav-link'
      "
      aria-current="page"
      :to="{
        name: 'working-hours.index',
      }"
    >
      <i class="icon material-symbols-outlined"> more_time </i>
      <span class="item-name">إضافة ساعات العمل</span>
    </router-link>
  </li>
  <li class="nav-item" v-if="advisorAndAbove">
    <router-link
      :class="
        checkActive('working-hours.statistics') ? 'active nav-link' : 'nav-link'
      "
      aria-current="page"
      :to="{
        name: 'working-hours.statistics',
      }"
    >
      <i class="icon material-symbols-outlined"> hourglass_top </i>
      <span class="item-name">إحصائيات ساعات العمل</span>
    </router-link>
  </li>
</template>

<script>
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
  methods: {
    checkActive(route) {
      if (this.$route.name === route) {
        return true;
      }
    },
  },
};
</script>