<template>
    <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
            <span class="default-icon">دعم أصبوحة</span>
            <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
    </li>
    <li class="nav-item">
        <router-link :class="checkActive('user.search') ? 'active nav-link' : 'nav-link'" aria-current="page" :to="{
            name: 'user.search',
        }">
            <i class="icon material-symbols-outlined"> alternate_email </i>
            <span class="item-name">بحث بالايميل</span>
        </router-link>
    </li>

    <li class="nav-item">
        <router-link :class="checkActive('user.search-by-name') ? 'active nav-link' : 'nav-link'" aria-current="page"
            :to="{
                name: 'user.search-by-name',
            }">
            <i class="icon material-symbols-outlined"> id_card </i>
            <span class="item-name">بحث بالاسم</span>
        </router-link>
    </li>
    <li class="nav-item">
        <router-link :class="checkActive('user.exception-search') ? 'active nav-link' : 'nav-link'" aria-current="page"
            :to="{
                name: 'user.exception-search',
            }">
            <i class="icon material-symbols-outlined"> do_not_disturb_on </i>
            <span class="item-name">اعفائات السفير</span>
        </router-link>
    </li>
    <li class="nav-item">
        <router-link :class="checkActive('user.in-charge-of-search') ? 'active nav-link' : 'nav-link'"
            aria-current="page" :to="{
                name: 'user.in-charge-of-search',
            }">
            <i class="icon material-symbols-outlined"> supervisor_account </i>
            <span class="item-name"> المسؤول عنهم</span>
        </router-link>
    </li>
    <li class="nav-item" v-if="isTeamCoordinator">
        <router-link :class="checkActive('roles.rolesControl') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
                name: 'roles.rolesControl',
                params: {
                    type: 'osbohaSupport',
                },
            }">
            <i class="icon material-symbols-outlined"> digital_wellbeing </i>
            <span class="item-name">تحكم العضويات</span>
        </router-link>
    </li>
</template>
<script>
import UserInfoService from "@/Services/userInfoService";

export default {
    name: "Osboha Books",
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
        isTeamCoordinator() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                'osboha_support_coordinator',
            ]);
        },
    },
};
</script>