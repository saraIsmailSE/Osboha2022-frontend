<template>
    <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
            <span class="default-icon">رمضان</span>
            <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
    </li>
    <!-- ###### ADD COORRECTORS  ###### -->
    <li class="nav-item">
        <router-link :class="checkActive('roles.upgradeRamadanRole') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'roles.upgradeRamadanRole',
    }" v-if="isRamadanCoordinator || isAdmin">
            <i class="icon material-symbols-outlined"> manage_accounts </i>
            <span class="item-name">تحكم العضويات</span>
        </router-link>
    </li>
    <!-- ###### ADD COORRECTORS  ###### -->
    <li class="nav-item">
        <router-link :class="checkActive('ramadan.correctors-index') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'ramadan.correctors-index',
    }" v-if="isRamadanCorrector">
            <i class="icon material-symbols-outlined"> rule </i>
            <span class="item-name">تصحيح الفعاليات</span>
        </router-link>
    </li>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import UserInfoService from "@/Services/userInfoService";
export default {
    name: "Ramadan",
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        isRamadanCoordinator() {
            return UserInfoService.hasRole(this.user, "ramadan_coordinator");
        },
        isAdmin() {
            return UserInfoService.hasRole(this.user, "admin");
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