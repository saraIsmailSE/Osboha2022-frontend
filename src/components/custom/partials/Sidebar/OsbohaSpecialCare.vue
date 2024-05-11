<template>
    <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
            <span class="default-icon">Special Care</span>
            <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
    </li>
    <!-- ###### ADD MEMBERS  ###### -->
    <li class="nav-item">
        <router-link :class="checkActive('roles.upgradeSpecialCareRole') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
                name: 'roles.upgradeSpecialCareRole',
            }">
            <i class="icon material-symbols-outlined"> digital_wellbeing </i>
            <span class="item-name">تحكم العضويات</span>
        </router-link>
    </li>

    <!-- ###### LIST ALL GROUPS  ###### -->
    <li class="nav-item">
        <router-link :class="checkActive('group.listSpecialCareGroups') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
                name: 'group.listSpecialCareGroups',
            }">
            <i class="icon material-symbols-outlined"> diversity_4 </i>
            <span class="item-name">أفرقة الرعاية</span>
        </router-link>
    </li>
    <li class="nav-item">
        <router-link :class="checkActive('ambassadors-request.list-requests') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
                name: 'ambassadors-request.list-requests',
            }">
            <i class="icon material-symbols-outlined"> group </i>
            <span class="item-name">الطلبات</span>
        </router-link>
    </li>
    <li class="nav-item">
        <router-link :class="checkActive('ambassadors-request.statistics') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
                name: 'ambassadors-request.statistics',
            }">
            <i class="icon material-symbols-outlined"> monitoring </i>
            <span class="item-name">احصائيات</span>
        </router-link>
    </li>
</template>
<script>
export default {
    name: "Special Care",
    methods: {
        checkActive(route) {
            if (this.$route.name === route) {
                return true;
            }
        },
    },
};
</script>