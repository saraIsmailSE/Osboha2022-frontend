<template>
    <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
            <span class="default-icon">تدقيق العلامات</span>
            <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
    </li>
    <!-- ###### Groups Audit ###### -->
    <li class="nav-item" v-if="isSupervisor">
        <router-link :class="checkActive('group.groupsAudit') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'group.groupsAudit',
        params: {
            supervisor_id: user?.id,
        },
    }">
            <i class="icon material-symbols-outlined"> rule </i>
            <span class="item-name">تدقيق المجموعات</span>
        </router-link>
    </li>

    <li class="nav-item" v-if="isSupervisor">
        <router-link :class="checkActive('control.pending-theses') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'control.pending-theses',
        params: {
            supervisor_id: user?.id,
        },
    }">
            <i class="icon material-symbols-outlined"> dangerous </i>
            <span class="item-name">لم يعتمد</span>
        </router-link>
    </li>

    <!-- ###### Advisor Audit ###### -->

    <li class="nav-item" v-if="isAdvisor">
        <router-link :class="checkActive('group.AdvisorAudit') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'group.AdvisorAudit',
        params: {
            advisor_id: user?.id,
        },
    }">
            <i class="icon material-symbols-outlined"> rule </i>
            <span class="item-name">تدقيق المراقبين</span>
        </router-link>
    </li>
    <li class="nav-item" v-if="isAdvisor">
        <router-link :class="checkActive('group.AdvisorMainAudit') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'group.AdvisorMainAudit',
        params: {
            advisor_id: user?.id,
        },
    }">
            <i class="icon material-symbols-outlined"> rule </i>
            <span class="item-name">تدقيق الموجه</span>
        </router-link>
    </li>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import UserInfoService from "@/Services/userInfoService";
export default {
    name: "Audit Marks",
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        isAdvisor() {
            return UserInfoService.hasRole(this.user, "advisor");
        },
        isSupervisor() {
            return UserInfoService.hasRole(this.user, "supervisor");
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
  