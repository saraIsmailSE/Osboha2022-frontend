<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <div class="header-title">
                <h4 class="card-title">الوصول السريع</h4>
            </div>
        </div>
        <div class="card-body row d-flex justify-content-center">
            <router-link :to="{ name: 'group.group-members', params: { group_id: group_id } }"
                class="btn btn-primary d-block mt-3 col-5 me-1 ">
                المشاركون
            </router-link>
            <router-link :to="{
                name: 'group.marathon-ambassadors-reading',
                params: { group_id: group_id, week_id: week.id },
            }" class="btn btn-primary d-block mt-3 col-5 me-1"
                v-if="(authInGroup && authInGroup.user_type != 'marathon_ambassador') || isAdmin">
                انجاز الأسبوع الحالي
            </router-link>
            <router-link :to="{
                name: 'group.marathon-ambassadors-reading',
                params: { group_id: group_id, week_id: previous_week.id },
            }" class="btn btn-primary d-block mt-3 col-5 me-1"
                v-if="((authInGroup && authInGroup.user_type != 'marathon_ambassador') || isAdmin) && previous_week">
                انجاز الأسبوع السابق
            </router-link>
            <router-link :to="{
                name: 'group.marathon-points',
                params: { group_id: group_id },
            }" class="btn btn-primary d-block mt-3 col-5 me-1"
                v-if="((authInGroup && authInGroup.user_type != 'marathon_ambassador') || isAdmin)">
                نقاط المجموعة
            </router-link>
        </div>
    </div>
</template>
<script>
import UserInfoService from "@/Services/userInfoService";

export default {
    name: "Main Quick Access",
    props: {
        group: {
            type: [Object],
            required: true,
        },
        previous_week: {
            type: [Object],
            required: true,
        },
        week: {
            type: [Object],
            required: true,
        },
        authInGroup: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            group_id: this.$route.params.group_id,
        };
    },

    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        isAdmin() {
            return UserInfoService.hasRole(this.user, "admin");
        },
    }
};
</script>