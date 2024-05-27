<template>
    <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
            <span class="default-icon">التواصل مع المنسحبين</span>
            <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
    </li>
    <!-- ###### ADD MEMBERS  ###### -->
    <li class="nav-item" v-if="isWithdrawnsCoordinator">
        <router-link :class="checkActive('roles.rolesControl') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
                name: 'roles.rolesControl',
                params: {
                    type: 'WithdrawnsTeam',
                },

            }">
            <i class="icon material-symbols-outlined"> digital_wellbeing </i>
            <span class="item-name">تحكم العضويات</span>
        </router-link>
    </li>

    <!-- ###### LIST ALL GROUPS  ###### -->
    <li class="nav-item">
        <router-link :class="checkActive('withdrawns-team.list-ambassadros') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
                name: 'withdrawns-team.list-ambassadros',
            }">
            <i class="icon material-symbols-outlined"> supervisor_account </i>
            <span class="item-name">عرض المنسحبين</span>
        </router-link>
    </li>
</template>
<script>
import UserInfoService from "@/Services/userInfoService";

export default {
    name: "Osboha Withdrawn Ambassadors",
    methods: {
        checkActive(route) {
            if (this.$route.name === route) {
                return true;
            }
        },
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },

        isWithdrawnsCoordinator() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                'coordinator_of_withdrawns_team',
                'member_of_withdrawns_team',
            ]);
        },

    },
};
</script>