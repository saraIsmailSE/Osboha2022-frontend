<template>
    <div class="row">
        <div class="col-12">
            <iq-card body-class="p-0">
                <template v-slot:body>
                    <GroupTitle :group_id:="group.id" :group_name="group.name" :group_users="group_users" />
                    <h4 v-if="week" class="ms-3"> الأسبوع || {{ week.title }}</h4>
                    
                    <ul class="todo-task-lists m-0 p-0" v-if="achievementsLoaded && achievementsLoaded.length > 0">
                        <template v-for="(ambassador, index) in achievementsLoaded" :key="index">

                            <AchievementProgress :ambassador="ambassador" :week_id="week_id" :route_to="'group.listOneMarathonReading'"/>

                        </template>
                        <li class="d-block text-center mb-0 pb-0" v-if="ambassadors_achievement.length > length">
                            <a class="me-3 btn" role="button" @click="loadMore()">عرض المزيد</a>
                        </li>

                    </ul>
                    <iq-card class="iq-card" v-else>
                        <div class="iq-card-body p-0">
                            <div class="image-block text-center">
                                <img src="@/assets/images/main/reader.png" class="img-fluid rounded w-75 mt-3" alt="no-amb">
                            </div>
                            <h4 class="text-center mt-3 mb-3">لا يوجد انجاز لهذا الاسبوع</h4>
                        </div>
                    </iq-card>

                </template>
            </iq-card>
        </div>
    </div>
</template>
<script>
import AchievementProgress from "@/components/group/AchievementProgress.vue";
import GroupService from "@/API/services/group.service";

export default {
    name: "Marathon Reading",
    async created() {
        try {
            const response = await GroupService.MarathonReading(
                this.group_id,
                this.week_id,
            );
            this.group = response.group;
            this.group_users = response.group_users;
            this.ambassadors_achievement = response.ambassadors_achievement
        } catch (error) {
            console.log(error);
        }
    },

    components: { AchievementProgress },
    data() {
        return {
            group_id: this.$route.params.group_id,
            week_id: this.$route.params.week_id,
            group: [],
            group_users: 0,
            ambassadors_achievement: [],
            length: 10,
        };
    },
    methods: {
        loadMore() {
            if (this.length > this.ambassadors_achievement.length) return;
            this.length = this.length + 10;
        },
    },
    computed: {
        achievementsLoaded() {
            return this.ambassadors_achievement.slice(0, this.length);
        },
    },

};
</script>