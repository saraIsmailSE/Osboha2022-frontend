<template>
    <div class="row">
        <div class="col-12">
            <iq-card body-class="p-0">
                <template v-slot:body>
                    <GroupTitle :group_id:="group.id" :group_name="group.name" :group_users="group_users" />
                    <div class="dropdown w-100 p-3">
                        <select class="form-select" @change="listByWeek()" v-model="weekFilter">
                            <option class="dropdown-item" value="current" selected>هذا الأسبوع</option>
                            <option class="dropdown-item" value="previous">الاسبوع السابق</option>
                        </select>
                    </div>
                    <ul class="todo-task-lists m-0 p-0" v-if="achievementsLoaded && achievementsLoaded.length > 0">
                        <template v-for="(ambassador, index) in achievementsLoaded" :key="index">

                            <AchievementProgress :ambassador="ambassador" />

                        </template>
                        <li class="d-block text-center mb-0 pb-0" v-if="ambassadorsAchievement.length > length">
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
import GroupService from '@/API/services/group.service';
import GroupTitle from '@/components/group/GroupTitle.vue';
import AchievementProgress from '@/components/group/AchievementProgress.vue'

export default {
    name: 'List All Group Ambassadors Achievement',
    async created() {

        try {
            const response = await GroupService.AllAchievements(this.group_id, this.weekFilter);
            this.group = response.group
            this.group_users = response.group_users
            this.ambassadorsAchievement = response.ambassadors_achievement
        }
        catch (error) {
            console.log(error);
        }
    },
    components: {
        GroupTitle,
        AchievementProgress,
    },
    data() {
        return {
            group_id: this.$route.params.group_id,
            group: [],
            group_users: 0,
            ambassadorsAchievement: [],
            length: 10,
            weekFilter: 'current'
        }
    },
    methods: {
        loadMore() {
            if (this.length > this.ambassadorsAchievement.length) return;
            this.length = this.length + 10;
        },
        /**
        * Filter ambassadorsAchievement by week.
        * @return Filtered ambassadorsAchievement
        */
        async listByWeek() {
            const response = await GroupService.AllAchievements(this.group_id, this.weekFilter)
            this.group_users = response.group_users
            this.ambassadorsAchievement = response.ambassadors_achievement

        },

    },
    computed: {
        achievementsLoaded() {
            return this.ambassadorsAchievement.slice(0, this.length);
        },
    },

}
</script>
