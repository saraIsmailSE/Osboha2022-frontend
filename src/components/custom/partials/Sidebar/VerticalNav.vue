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

    <!-- ###### group ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('osboha.group') ? 'active nav-link' : 'nav-link'" aria-current="page"
        :to="{ name: 'osboha.group' }">
        <i class="icon material-symbols-outlined"> groups </i>
        <span class="item-name">المجموعات </span>
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

    <!-- ###### Support ###### -->
    <li class="nav-item">
      <router-link :class="checkActive('osboha.friday-thesis') ? 'active nav-link' : 'nav-link'" aria-current="page"
        :to="{ name: 'osboha.friday-thesis' }">
        <i class="icon material-symbols-outlined"> mosque </i>
        <span class="item-name">أطروحة الجمعة</span>
      </router-link>
    </li>

    <!-- ###### Books ###### -->
    <Books />

    <!-- ###### Osboha Eligible ###### -->
    <OsbohaEligible />

    <!-- ###### Osboha Support ###### -->
    <OsbohaSupport v-if="inSupportTeam" />

    <!-- ###### Osboha Marathon ###### -->
    <OsbohaMarathon v-if="inMarathon" />

    <!-- ###### Osboha Speacial Care ###### -->
    <OsbohaSpecialCare v-if="inSpecialCare" />


    <!-- ###### Osboha  Withdrawn Ambassadors ###### -->
    <OsbohaWithdrawnAmbassadors v-if="inWithdrawnsTeam" />

    <!-- ###### Osboha Ramadan ###### -->
    <!-- <OsbohaRamadan /> -->

    <!-- ###### Audit Marks ###### -->
    <AuditMarks v-if="isAdvisor || isSupervisor" />

    <!-- ###### Audit Marks ###### -->
    <Exceptions v-if="isAdvisor" />

    <!-- ###### Inventory Statistics ###### -->
    <InventoryStatistics v-if="SupervisorAndAbove" />

    <!-- ###### General Conversation ###### -->

    <GeneralConversation v-if="leaderAndAbove" />

    <!-- ###### Group Control ###### -->

    <ControlGroups v-if="advisorAndAbove" />

    <li class="nav-item last-element">
      <img src="@/assets/images/logo.png" class="img-fluid rounded w-50" alt="blog-img" />
    </li>
  </ul>
  <!-- Sidebar Menu End -->
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import UserInfoService from "@/Services/userInfoService";
import ControlGroups from './ControlGroups'
import GeneralConversation from './GeneralConversation';
import OsbohaEligible from './OsbohaEligible'
import InventoryStatistics from './InventoryStatistics'
import AuditMarks from './AuditMarks'
import Exceptions from './Exceptions'
import OsbohaMarathon from './OsbohaMarathon'
import OsbohaSpecialCare from './OsbohaSpecialCare'
import OsbohaWithdrawnAmbassadors from './OsbohaWithdrawnAmbassadors';
import OsbohaSupport from './OsbohaSupport';
import Books from './Books';
// import OsbohaRamadan from "./OsbohaRamadan";
import vClickOutside from "click-outside-vue3";

export default {
  name: "DefaultSidebar",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    ControlGroups,
    GeneralConversation,
    OsbohaEligible,
    InventoryStatistics,
    AuditMarks,
    Exceptions,
    OsbohaMarathon,
    OsbohaSpecialCare,
    OsbohaWithdrawnAmbassadors,
    OsbohaSupport,
    Books,
    // OsbohaRamadan
  },
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
    SupervisorAndAbove() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
        "supervisor",
      ]);
    },
    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
    },
    consultantAndAbove() {
      return UserInfoService.hasRoles(this.user, ["consultant", "admin"]);
    },
    eligibleTeam() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        'eligible_admin',
        'reviewer',
        'auditor',
        'user_accept',
        'super_auditer',
        'super_reviewer'
      ]);
    },
    inMarathon() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "marathon_coordinator",
        'marathon_verification_supervisor',
        "marathon_supervisor",
        "marathon_ambassador",
      ]);
    },
    inSpecialCare() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "special_care_coordinator",
      ]);
    },
    inWithdrawnsTeam() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        'coordinator_of_withdrawns_team',
        'member_of_withdrawns_team',
      ]);
    },
    inSupportTeam() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        'osboha_support_coordinator',
        'osboha_support_member',
      ]);
    },
    isRamadanCorrector() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "ramadan_coordinator",
        "ramadan_hadith_corrector",
        "ramadan_fiqh_corrector",
        'ramadan_tafseer_corrector',
        "ramadan_vedio_corrector",
      ]);
    },
  },
  setup() {
    const store = useStore();
    const sidebarType = computed(() => store.getters["setting/sidebar_type"]);
    // const isSidebarOpen = computed(() => !sidebarType.value.includes("sidebar-mini"));

    const toggleSidebar = () => {
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
      // handleClickOutside,
      // isSidebarOpen,
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
  display: flex;
  justify-content: center;
  opacity: 0.5;
}
</style>