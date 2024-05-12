<template >
    <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
            <span class="default-icon">التحكم بالمجموعات</span>
            <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
    </li>

    <!-- ###### Control Groups ###### -->
    <li class="nav-item">
        <router-link :class="checkActive('control.groups') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'control.groups',
    }">
            <i class="icon material-symbols-outlined"> list_alt </i>
            <span class="item-name">التحكم بالمجموعات</span>
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
        isAdvisor() {
            return UserInfoService.hasRole(this.user, "advisor");
        },
        isConsultant() {
            return UserInfoService.hasRole(this.user, "consultant");
        },
        isSupervisor() {
            return UserInfoService.hasRole(this.user, "supervisor");
        },
        isAdmin() {
            return UserInfoService.hasRole(this.user, "admin");
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
