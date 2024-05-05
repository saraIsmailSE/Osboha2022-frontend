<template>
    <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
            <span class="default-icon"> إحصائيات الجرد </span>
            <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
    </li>


    <!-- ###### User Tree ###### -->
    <li class="nav-item" v-if="isAdmin">
        <router-link :class="checkActive('user.retrieve-nested-users')
        ? 'active nav-link'
        : 'nav-link'
        " aria-current="page" :to="{
        name: 'user.retrieve-nested-users',
        params: {
            parent_id: user?.id,
        },

    }">
            <i class="icon material-symbols-outlined"> supervisor_account </i>
            <span class="item-name">المسؤول عنهم  </span>
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

    <!-- ###### SUPERVISOR statistics ###### -->
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