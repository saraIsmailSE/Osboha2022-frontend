<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <div class="header-title">
                <h4 class="card-title">الوصول السريع</h4>
            </div>
        </div>
        <div class="card-body row d-flex justify-content-center">
            <router-link :to="{
                name: 'group.group-statistics',
                params: { group_id: group_id, week_id: week.id },
            }" class="btn btn-primary d-block mt-3 col-5 me-1">احصائيات الاسبوع الحالي
            </router-link>
            <router-link :to="{
                name: 'group.group-statistics',
                params: { group_id: group_id, week_id: previous_week.id },
            }" class="btn btn-primary d-block mt-3 col-5 me-1">احصائيات الاسبوع السابق
            </router-link>
            <router-link :to="{
                name: 'group.ambassadors-reading',
                params: { group_id: group_id, week_id: week.id },
            }" class="btn btn-primary d-block mt-3 col-5 me-1"
                v-if="authInGroup && authInGroup.user_type != 'ambassador'">
                انجاز الأسبوع الحالي
            </router-link>
            <router-link :to="{
                name: 'group.ambassadors-reading',
                params: { group_id: group_id, week_id: previous_week.id },
            }" class="btn btn-primary d-block mt-3 col-5 me-1"
                v-if="authInGroup && authInGroup.user_type != 'ambassador' && previous_week">
                انجاز الأسبوع السابق
            </router-link>

            <router-link :to="{
                name: 'group.group-exceptions',
                params: { group_id: group_id },
            }" class="btn btn-primary d-block mt-3 col-5 me-1"
                v-if="authInGroup && authInGroup.user_type != 'ambassador'">الاجازات
            </router-link>

            <router-link :to="{ name: 'group.auditMarks', params: { group_id: group_id } }"
                class="btn btn-primary d-block mt-3 col-5 me-1" v-if="authInGroup &&
                    authInGroup.user_type != 'ambassador' &&
                    group.type.type == 'followup'
                    ">
                تدقيق العلامات
            </router-link>

            <router-link :to="{
                name: 'statistics.Leaders',
                params: {
                    supervisor_id: supervisorOfTheGroup.id,
                },
            }" class="btn btn-primary d-block mt-3 col-5 me-1" v-if="authInGroup &&
    authInGroup.user_type != 'ambassador' &&
    group.type.type == 'supervising' &&
    supervisorOfTheGroup
    ">
                احصائيات القادة
            </router-link>

            <router-link :to="{
                name: 'osboha.pendingPosts',
                params: { timeline_id: group.timeline_id },
            }" class="btn btn-primary d-block mt-3 col-5 me-1"
                v-if="authInGroup && authInGroup.user_type != 'ambassador'">
                المنشورات المعلقة
            </router-link>
            <router-link :to="{ name: 'group.group-books', params: { group_id: group_id } }"
                class="btn btn-primary d-block mt-3 col-5 me-1">كتب يقرؤها الأعضاء
            </router-link>

        </div>
    </div>
</template>
<script>

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
    methods: {
        searchByPivotType(type) {
            return this.group.group_administrators.find((item) => {
                return item.pivot && item.pivot.user_type === type;
            });
        },
    },
    computed: {
        supervisorOfTheGroup() {
            return this.searchByPivotType("supervisor");
        },
        groupSupportLeader() {
            return this.searchByPivotType("support_leader");
        },
    },
};
</script>