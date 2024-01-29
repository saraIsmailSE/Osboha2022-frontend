<template>
    <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
            <span class="default-icon">رمضان</span>
            <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
    </li>
    <!-- ###### ADD MEMBERS  ###### -->
    <li class="nav-item">
        <router-link :class="checkActive('book.ramadan') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'book.ramadan',
    }">
            <i class="icon material-symbols-outlined"> book_5 </i>
            <span class="item-name">الكتب</span>
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
        isMarathonCoordinator() {
            return UserInfoService.hasRole(this.user, "marathon_coordinator");
        },
        isAdmin() {
            return UserInfoService.hasRole(this.user, "admin");
        },
        isMarathonAdministrator() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "marathon_coordinator",
                'marathon_verification_supervisor',
                "marathon_supervisor",
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