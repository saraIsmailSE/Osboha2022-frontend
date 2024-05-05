<template>
    <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
            <span class="default-icon">Marathon</span>
            <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
    </li>
    <!-- ###### ADD MEMBERS  ###### -->
    <li class="nav-item">
        <router-link :class="checkActive('roles.upgradeMarathonRole') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'roles.upgradeMarathonRole',
    }" v-if="isMarathonCoordinator || isAdmin">
            <i class="icon material-symbols-outlined"> sprint </i>
            <span class="item-name">تحكم العضويات</span>
        </router-link>
    </li>

    <!-- ###### LIST ALL GROUPS  ###### -->
    <li class="nav-item">
        <router-link :class="checkActive('group.listMarathonGroups') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'group.listMarathonGroups',
    }" v-if="isMarathonAdministrator">
            <i class="icon material-symbols-outlined"> groups </i>
            <span class="item-name">أفرقة المارثون</span>
        </router-link>
    </li>
    <li class="nav-item">
        <router-link :class="checkActive('marathon.participants') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'marathon.participants',
    }" v-if="isMarathonAdministrator">
            <i class="icon material-symbols-outlined"> group </i>
            <span class="item-name">المشاركون</span>
        </router-link>
    </li>
</template>
<script>
import UserInfoService from "@/Services/userInfoService";
export default {
    name: "Marathon",
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
    methods: {
        checkActive(route) {
            if (this.$route.name === route) {
                return true;
            }
        },
    },
};
</script>