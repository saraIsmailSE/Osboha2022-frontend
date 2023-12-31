<template>
    <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
            <span class="default-icon">توثيق الكتب</span>
            <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
    </li>
    <li class="nav-item">
        <router-link :class="checkActive('book.eligible') ? 'active nav-link' : 'nav-link'" aria-current="page"
            :to="{ name: 'book.eligible' }">
            <img src="@/assets/images/main/eligible_logo.png" class="img-fluid rounded w-25" alt="blog-img" />
            <!-- <i class="icon material-symbols-outlined"> contract_edit </i> -->
            <span class="item-name">توثيق كتاب</span>
        </router-link>
    </li>
    <li class="nav-item" v-if="eligibleTeam">
        <router-link :class="checkActive('book.eligible-controle') ? 'active nav-link' : 'nav-link'" aria-current="page"
            :to="{ name: 'book.eligible-controle' }">
            <i class="icon material-symbols-outlined"> contract_edit </i>
            <span class="item-name">تحكم - توثيق الكتب</span>
        </router-link>
    </li>
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

<style></style>
