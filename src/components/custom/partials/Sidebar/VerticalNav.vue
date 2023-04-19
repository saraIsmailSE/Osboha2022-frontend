<template>
  <!-- Sidebar Menu Start -->
  <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
    <li class="nav-item static-item">
      <a class="nav-link static-item disabled" href="#" tabindex="-1">
        <span class="default-icon">Social</span>
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
        :class="checkActive('osboha.list') ? 'active nav-link' : 'nav-link'"
        aria-current="page"
        :to="{ name: 'osboha.list' }"
      >
        <i class="icon material-symbols-outlined"> newspaper </i>
        <span class="item-name">الرئيسية</span>
      </router-link>
    </li>
    <!-- ###### Profile ###### -->
    <li class="nav-item">
      <router-link
        :class="checkActive('user.profile') ? 'active nav-link' : 'nav-link'"
        :to="{
          name: 'user.profile',
          params: {
            user_id: user.id,
          },
        }"
      >
        <i class="icon material-symbols-outlined"> person </i>
        <span class="user.profile">الملف الشخصي</span>
      </router-link>
    </li>
    <!-- ###### group ###### -->
    <li class="nav-item">
      <router-link
        :class="checkActive('osboha.group') ? 'active nav-link' : 'nav-link'"
        aria-current="page"
        :to="{ name: 'osboha.group' }"
      >
        <i class="icon material-symbols-outlined"> groups </i>
        <span class="item-name">المجموعات </span>
      </router-link>
    </li>
    <!-- ###### Books ###### -->
    <li class="nav-item">
      <router-link
        :class="checkActive('osboha.book') ? 'active nav-link' : 'nav-link'"
        aria-current="page"
        :to="{ name: 'osboha.book' }"
      >
        <i class="icon material-symbols-outlined"> book </i>
        <span class="item-name">الكتب</span>
      </router-link>
    </li>
    <!-- ###### Announcements ###### -->
    <li class="nav-item">
      <router-link
        :class="
          checkActive('osboha.announcement') ? 'active nav-link' : 'nav-link'
        "
        aria-current="page"
        :to="{ name: 'osboha.announcement' }"
      >
        <i class="icon material-symbols-outlined"> announcement </i>
        <span class="item-name">الإعلانات</span>
      </router-link>
    </li>
    <!-- ###### Groups Audit ###### -->
    <li class="nav-item">
      <router-link
        :class="
          checkActive('group.groupsAudit') ? 'active nav-link' : 'nav-link'
        "
        aria-current="page"
        :to="{ name: 'group.groupsAudit',
        params: {
            supervisor_id: user.id,
          },
        }"
      >
        <i class="icon material-symbols-outlined"> rule </i>
        <span class="item-name">تدقيق المجموعات</span>
      </router-link>
    </li>

        <!-- ###### Advisor Audit ###### -->
        <li class="nav-item">
      <router-link
        :class="
          checkActive('group.AdvisorAudit') ? 'active nav-link' : 'nav-link'
        "
        aria-current="page"
        :to="{ name: 'group.AdvisorAudit' }"
      >
        <i class="icon material-symbols-outlined"> rule </i>
        <span class="item-name">تدقيق المراقبين</span>
      </router-link>
    </li>


    <li class="nav-item static-item">
      <a class="nav-link static-item disabled" href="#" tabindex="-1">
        <span class="default-icon">Latest</span>
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
        :class="checkActive('app.chat') ? 'active nav-link' : 'nav-link'"
        aria-current="page"
        :to="{ name: 'app.chat' }"
      >
        <i class="icon material-symbols-outlined"> message </i>
        <span class="item-name">الرسائل</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        :class="
          checkActive('osboha.infographic') ? 'active nav-link' : 'nav-link'
        "
        aria-current="page"
        :to="{ name: 'osboha.infographic' }"
      >
        <i class="icon material-symbols-outlined"> extension </i>
        <span class="item-name">انفوجرافيك</span>
      </router-link>
    </li>

    <li class="nav-item">
      <router-link
        :class="checkActive('osboha.articles') ? 'active nav-link' : 'nav-link'"
        aria-current="page"
        :to="{ name: 'osboha.articles' }"
      >
        <i class="icon material-symbols-outlined"> article </i>
        <span class="item-name">مقالات</span>
      </router-link>
    </li>
  </ul>
  <!-- Sidebar Menu End -->
</template>
<script>
import UserInfo from "@/Services/userInfoService";

export default {
  name: "DefaultSidebar",
  created() {
    const user_data = UserInfo.getUser();
    this.user = user_data.user;
  },

  data() {
    return {
      user: null,
    };
  },
  methods: {
    checkActive(route) {
      if (this.$route.name === route) {
        return true;
      }
      if (route.includes(this.$route.name)) {
        return true;
      }
    },
  },
};
</script>
