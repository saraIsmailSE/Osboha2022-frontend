<template>
  <!-- Sidebar Menu Start -->
  <ul class="navbar-nav iq-main-menu" id="sidebar-menu" @click="toggleSidebar">
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
          user_id: user?.id,
        },
      }">
        <i class="icon material-symbols-outlined"> person </i>
        <span class="user.profile">الملف الشخصي</span>
      </router-link>
    </li>
    <!-- ###### Friends Requests ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('user.friendsRequests') ? 'active nav-link' : 'nav-link'
        " :to="{
    name: 'user.friendsRequests',
    params: {
      user_id: user?.id,
    },
  }">
        <i class="icon material-symbols-outlined"> diversity_1 </i>
        <span class="user.profile">طلبات الصداقة</span>
      </router-link>
    </li>
    <!-- ###### Statistics ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('statistics.byWeek') ? 'active nav-link' : 'nav-link'
        " aria-current="page" :to="{ name: 'statistics.byWeek', params: { week_id: 1 } }">
        <i class="icon material-symbols-outlined"> monitoring </i>
        <span class="item-name">احصائيات الأسبوع</span>
      </router-link>
    </li>
    <!-- ###### ADMIN statistics ###### -->
    <li class="nav-item" v-if="isAdmin">
      <router-link :class="checkActive('statistics.consultants')
        ? 'active nav-link'
        : 'nav-link'
        " aria-current="page" :to="{
    name: 'statistics.consultants',
    params: {
      admin_id: user?.id,
    },

  }">
        <i class="icon material-symbols-outlined"> monitoring </i>
        <span class="item-name">احصائية فريق الادارة </span>
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
        <i class="icon material-symbols-outlined"> auto_stories </i>
        <span class="item-name">الكتب</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :class="checkActive('book.free-book') ? 'active nav-link' : 'nav-link'" aria-current="page" :to="{
        name: 'book.free-book',
        params: {
          user_id: user?.id,
        },
      }">
        <i class="icon material-symbols-outlined"> local_library </i>
        <span class="item-name">الكتاب الحر</span>
      </router-link>
    </li>
    <li class="nav-item" v-if="isAdmin || inBooksTeam">
      <router-link :class="checkActive('book.create') ? 'active nav-link' : 'nav-link'" aria-current="page"
        :to="{ name: 'book.create' }">
        <i class="icon material-symbols-outlined"> book </i>
        <span class="item-name">اضافة كتاب</span>
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
      <router-link :class="checkActive('osboha.support') ? 'active nav-link' : 'nav-link'" aria-current="page"
        :to="{ name: 'osboha.support' }">
        <i class="icon material-symbols-outlined"> heart_plus </i>
        <span class="item-name">اعرف مشروعك</span>
      </router-link>
    </li>

    <!-- ###### Osboha Eligible ###### -->
    <li class="nav-item" v-if="advisorAndAbove || eligibleTeam">
      <router-link :class="checkActive('book.eligible') ? 'active nav-link' : 'nav-link'" aria-current="page"
        :to="{ name: 'book.eligible' }">
        <i class="icon material-symbols-outlined"> contract_edit </i>
        <span class="item-name">توثيق كتاب</span>
      </router-link>
    </li>
    <li class="nav-item" v-if="advisorAndAbove || eligibleTeam">
      <router-link :class="checkActive('book.eligible-controle') ? 'active nav-link' : 'nav-link'" aria-current="page"
        :to="{ name: 'book.eligible-controle' }">
        <i class="icon material-symbols-outlined"> contract_edit </i>
        <span class="item-name">تحكم - توثيق الكتب</span>
      </router-link>
    </li>


    <li class="nav-item static-item" v-if="isAdvisor || isSupervisor">
      <a class="nav-link static-item disabled" tabindex="-1">
        <span class="default-icon">تدقيق العلامات</span>
        <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
      </a>
    </li>
    <!-- ###### Groups Audit ###### -->
    <li class="nav-item" v-if="isSupervisor">
      <router-link :class="checkActive('group.groupsAudit') ? 'active nav-link' : 'nav-link'
        " aria-current="page" :to="{
    name: 'group.groupsAudit',
    params: {
      supervisor_id: user?.id,
    },
  }">
        <i class="icon material-symbols-outlined"> rule </i>
        <span class="item-name">تدقيق المجموعات</span>
      </router-link>
    </li>

    <li class="nav-item" v-if="isSupervisor">
      <router-link :class="checkActive('control.pending-theses') ? 'active nav-link' : 'nav-link'
        " aria-current="page" :to="{
    name: 'control.pending-theses',
    params: {
      supervisor_id: user?.id,
    },
  }">
        <i class="icon material-symbols-outlined"> dangerous </i>
        <span class="item-name">لم يعتمد</span>
      </router-link>
    </li>
    <li class="nav-item" v-if="isSupervisor">
      <router-link :class="checkActive('statistics.Leaders')
        ? 'active nav-link'
        : 'nav-link'
        " aria-current="page" :to="{
    name: 'statistics.Leaders',
    params: {
      supervisor_id: user?.id,
    },
  }">
        <i class="icon material-symbols-outlined"> monitoring </i>
        <span class="item-name">احصائية الفريق الرقابي</span>
      </router-link>
    </li>

    <!-- ###### Advisor Audit ###### -->
    <li class="nav-item" v-if="isAdvisor">
      <router-link :class="checkActive('statistics.supervisors')
        ? 'active nav-link'
        : 'nav-link'
        " aria-current="page" :to="{
    name: 'statistics.supervisors',
    params: {
      advisor_id: user?.id,
    },

  }">
        <i class="icon material-symbols-outlined"> monitoring </i>
        <span class="item-name">احصائية فريق التوجيه </span>
      </router-link>
    </li>

    <li class="nav-item" v-if="isAdvisor">
      <router-link :class="checkActive('group.AdvisorAudit') ? 'active nav-link' : 'nav-link'
        " aria-current="page" :to="{
    name: 'group.AdvisorAudit',
    params: {
      advisor_id: user?.id,
    },
  }">
        <i class="icon material-symbols-outlined"> rule </i>
        <span class="item-name">تدقيق المراقبين</span>
      </router-link>
    </li>
    <li class="nav-item" v-if="isAdvisor">
      <router-link :class="checkActive('group.AdvisorMainAudit') ? 'active nav-link' : 'nav-link'
        " aria-current="page" :to="{
    name: 'group.AdvisorMainAudit',
    params: {
      advisor_id: user?.id,
    },
  }">
        <i class="icon material-symbols-outlined"> rule </i>
        <span class="item-name">تدقيق الموجه</span>
      </router-link>
    </li>


    <li class="nav-item static-item" v-if="isAdvisor || isSupervisor">
      <a class="nav-link static-item disabled" tabindex="-1">
        <span class="default-icon">تدقيق العلامات</span>
        <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
      </a>
    </li>

    <!-- ###### consultant statistics ###### -->
    <li class="nav-item" v-if="isConsultant">
      <router-link :class="checkActive('statistics.advisors')
        ? 'active nav-link'
        : 'nav-link'
        " aria-current="page" :to="{
    name: 'statistics.advisors',
    params: {
      consultant_id: user?.id,
    },

  }">
        <i class="icon material-symbols-outlined"> monitoring </i>
        <span class="item-name">احصائية فريق الاستشارة </span>
      </router-link>
    </li>


    <!-- ###### General Conversation ###### -->

    <template v-if="leaderAndAbove">
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
      <li class="nav-item" v-if="consultantAndAbove">
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
        <router-link :class="checkActive('general-conversation.workingHours')
          ? 'active nav-link'
          : 'nav-link'
          " aria-current="page" :to="{
    name: 'general-conversation.workingHours',
  }">
          <i class="icon material-symbols-outlined"> more_time </i>
          <span class="item-name">إضافة ساعات العمل</span>
        </router-link>
      </li>
      <li class="nav-item" v-if="isAdmin">
        <router-link :class="checkActive('general-conversation.followupStatistics')
          ? 'active nav-link'
          : 'nav-link'
          " aria-current="page" :to="{
    name: 'general-conversation.followupStatistics',
  }">
          <i class="icon material-symbols-outlined"> browse_activity </i>
          <span class="item-name">إحصائيات تفقد التحويل العام</span>
        </router-link>
      </li>
      <li class="nav-item" v-if="isAdmin">
        <router-link :class="checkActive('general-conversation.workingHoursStats')
          ? 'active nav-link'
          : 'nav-link'
          " aria-current="page" :to="{
    name: 'general-conversation.workingHoursStats',
  }">
          <i class="icon material-symbols-outlined"> hourglass_top </i>
          <span class="item-name">إحصائيات ساعات العمل</span>
        </router-link>
      </li>
    </template>

    <template v-if="advisorAndAbove">
      <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
          <span class="default-icon">التحكم بالمجموعات</span>
          <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
      </li>

      <!-- ###### Control Groups ###### -->
      <li class="nav-item last-element">
        <router-link :class="checkActive('control.groups') ? 'active nav-link' : 'nav-link'
          " aria-current="page" :to="{
    name: 'control.groups',
  }">
          <i class="icon material-symbols-outlined"> list_alt </i>
          <span class="item-name">التحكم بالمجموعات</span>
        </router-link>
      </li>
    </template>
  </ul>
  <!-- Sidebar Menu End -->
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
    isAdvisor() {
      return UserInfoService.hasRole(this.user, "advisor");
    },
    isConsultant() {
      return UserInfoService.hasRole(this.user, "consultant");
    },
    isSupervisor() {
      return UserInfoService.hasRole(this.user, "supervisor");
    },
    advisorAndAbove() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
      ]);
    },
    leaderAndAbove() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
        "supervisor",
        "leader",
      ]);
    },
    inBooksTeam() {
      return UserInfoService.hasRole(this.user, "book_quality_team");
    },
    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
    },
    consultantAndAbove() {
      return UserInfoService.hasRoles(this.user, ["consultant", "admin"]);
    },
    eligibleTeam() {
      return UserInfoService.hasRoles(this.user, [
        'reviewer',
        'auditor',
        'user_accept',
        'super_auditer',
        'super_reviewer'
      ]);
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

<style>
.last-element {
  margin-bottom: 50%;
}
</style>
