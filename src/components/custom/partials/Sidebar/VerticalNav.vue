<template>
  <!-- Sidebar Menu Start -->
  <ul class="navbar-nav iq-main-menu " id="sidebar-menu">
    <li class="nav-item static-item">
      <a class="nav-link static-item disabled" tabindex="-1">
        <span class="default-icon">القائمة الرئيسية</span>
        <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
      </a>
    </li>
    <li class="nav-item">
      <router-link :class="checkActive('osboha.list') ? 'active nav-link' : 'nav-link'" aria-current="page"
        :to="{ name: 'osboha.list' }">
        <i class="icon material-symbols-outlined"> newspaper </i>
        <span class="item-name">الرئيسية</span>
      </router-link>
    </li>
    <!-- ###### Profile ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('user.profile') ? 'active nav-link' : 'nav-link'" :to="{
          name: 'user.profile',
          params: {
            user_id: user.id,
          },
        }">
        <i class="icon material-symbols-outlined"> person </i>
        <span class="user.profile">الملف الشخصي</span>
      </router-link>
    </li>
    <!-- ###### group ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('osboha.group') ? 'active nav-link' : 'nav-link'" aria-current="page"
        :to="{ name: 'osboha.group' }">
        <i class="icon material-symbols-outlined"> groups </i>
        <span class="item-name">المجموعات </span>
      </router-link>
    </li>
    <!-- ###### Books ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('osboha.book') ? 'active nav-link' : 'nav-link'" aria-current="page"
        :to="{ name: 'osboha.book' }">
        <i class="icon material-symbols-outlined"> book </i>
        <span class="item-name">الكتب</span>
      </router-link>
    </li>
    <!-- ###### Announcements ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('osboha.announcement') ? 'active nav-link' : 'nav-link'
        " aria-current="page" :to="{ name: 'osboha.announcement' }">
        <i class="icon material-symbols-outlined"> announcement </i>
        <span class="item-name">الإعلانات</span>
      </router-link>
    </li>
    <!-- ###### Support ###### -->
    <li class="nav-item">
      <router-link
        :class="checkActive('osboha.support') ? 'active nav-link' : 'nav-link'"
        aria-current="page"
        :to="{ name: 'osboha.support' }"
      >
        <i class="icon material-symbols-outlined"> heart_plus </i>
        <span class="item-name">الدعم</span>
      </router-link>
    </li>

    <li class="nav-item static-item">
      <a class="nav-link static-item disabled" tabindex="-1">
        <span class="default-icon">تدقيق العلامات</span>
        <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
      </a>
    </li>
    <!-- ###### Groups Audit ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('group.groupsAudit') ? 'active nav-link' : 'nav-link'
        " aria-current="page" :to="{
      name: 'group.groupsAudit',
      params: {
        supervisor_id: user.id,
      },
    }">
        <i class="icon material-symbols-outlined"> rule </i>
        <span class="item-name">تدقيق المجموعات</span>
      </router-link>
    </li>

    <!-- ###### Advisor Audit ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('group.AdvisorAudit') ? 'active nav-link' : 'nav-link'
        " aria-current="page" :to="{
      name: 'group.AdvisorAudit',
      params: {
        advisor_id: user.id,
      },
    }">
        <i class="icon material-symbols-outlined"> rule </i>
        <span class="item-name">تدقيق المراقبين</span>
      </router-link>
    </li>

    <li class="nav-item static-item">
      <a class="nav-link static-item disabled" tabindex="-1">
        <span class="default-icon">التحكم بالمجموعات</span>
        <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
      </a>
    </li>
    <!-- ###### List All Groups ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('osboha.groupsList') ? 'active nav-link' : 'nav-link'
        " aria-current="page" :to="{
      name: 'osboha.groupsList',
    }">
        <i class="icon material-symbols-outlined"> list_alt </i>
        <span class="item-name">عرض المجموعات</span>
      </router-link>
    </li>

    <!-- ###### Add Group ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('group.addGroup') ? 'active nav-link' : 'nav-link'
        " aria-current="page" :to="{
      name: 'group.addGroup',
    }">
        <i class="icon material-symbols-outlined"> list_alt_add </i>
        <span class="item-name">اضافة مجموعة</span>
      </router-link>
    </li>
    <!-- ###### Asign Roles ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('user.assignRole') ? 'active nav-link' : 'nav-link'
        " aria-current="page" :to="{
      name: 'user.assignRole',
    }">
        <i class="icon material-symbols-outlined"> assignment_ind </i>
        <span class="item-name">ترقية </span>
      </router-link>
    </li>
  </ul>
  <!-- Sidebar Menu End -->
</template>
<script>
import UserInfo from "@/Services/userInfoService";

export default {
  name: "DefaultSidebar",
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    checkActive(route) {
      if (this.$route.name === route) {
        return true;
      }
      // if (route.includes(this.$route.name)) {
      //   return true;
      // }
    },
  },
};
</script>
