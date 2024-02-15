<template>
    <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
            <span class="default-icon">الاعفاءات</span>
            <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
    </li>
    <!-- ###### Exceptional Freez  ###### -->
    <li class="nav-item" v-if="isAdvisor">
        <router-link :class="checkActive('exceptions.listByAdvisor','exceptional_freez') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'exceptions.listByAdvisor',
        params: {
            exception_type:'exceptional_freez',
            advisor_id: user?.id,
        },
    }">
            <i class="icon material-symbols-outlined"> do_not_disturb_on </i>
            <span class="item-name">التجميد الاستثنائي</span>
        </router-link>
    </li>
    <!-- ###### Exceptional Freez  ###### -->
    <li class="nav-item" v-if="isAdvisor">
        <router-link :class="checkActive('exceptions.listByAdvisor','withdrawn') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
        name: 'exceptions.listByAdvisor',
        params: {
            exception_type:'withdrawn',
            advisor_id: user?.id,
        },
    }">
            <i class="icon material-symbols-outlined"> waving_hand </i>
            <span class="item-name">انسحاب مؤقت</span>
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
        checkActive(route , params) {
            if (this.$route.name === route && this.$route.params.exception_type === params) {
                return true;
            }
        },
    },
};
</script>