<template>
    <div class="row">
        <div class="col-12">
            <iq-card>
                <template v-slot:body>
                    <GroupTitle :group_id:="group.id" :group_name="group.name" :group_users="group_users" />
                    <div class="iq-todo-right">
                        <div class="iq-todo-friendlist mt-3">
                            <!-- <div class="dropdown w-100 p-3">
                                <select class="form-select" @change="listByWeek()" v-model="weekFilter">
                                    <option class="dropdown-item" value="current" selected>هذا الأسبوع</option>
                                    <option class="dropdown-item" value="previous">الاسبوع السابق</option>
                                </select>
                            </div> -->
                            <ul class="todo-task-lists m-0 p-0" v-if="achievementsLoaded && achievementsLoaded.length > 0">
                                <li class="d-flex mb-4 align-items-center" v-for="(record, index) in achievementsLoaded"
                                    :key=index>
                                    <AchievementPages :record="record" :week_id="week_id" />
                                </li>
                                <li class="d-block text-center mb-0 pb-0" v-if="ambassadorsAchievement.length > length">
                                    <a class="me-3 btn" role="button" @click="loadMore()">عرض المزيد</a>
                                </li>
                            </ul>
                            <iq-card class="iq-card" v-else>
                                <div class="iq-card-body p-0">
                                    <div class="image-block text-center">
                                        <img src="@/assets/images/main/reader.png" class="img-fluid rounded w-75 mt-3"
                                            alt="no-amb">
                                    </div>
                                    <h4 class="text-center mt-3 mb-3">لا يوجد انجاز لهذا الاسبوع</h4>
                                </div>
                            </iq-card>

                        </div>
                    </div>
                </template>
            </iq-card>
        </div>

    </div>
</template>


<script>
import GroupService from '@/API/services/group.service';
import GroupTitle from '@/components/group/GroupTitle.vue'
import AchievementPages from '@/components/group/AchievementPages.vue'

export default {
    name: 'Achievement As Pages',
    components: {
        GroupTitle,
        AchievementPages
    },
    async created() {

        try {
            const response = await GroupService.AchievementAsPages(this.group_id, this.week_id);
            this.group = response.group
            this.group_users = response.group_users
            this.ambassadorsAchievement = response.ambassadors_achievement
        }
        catch (error) {
            console.log(error);
        }
    },

    data() {
        return {
            group: [],
            group_users: 0,
            group_id: this.$route.params.group_id,
            week_id:this.$route.params.week_id,
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
        async listByWeek() {
            const response = await GroupService.AchievementAsPages(this.group_id, this.weekFilter)
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
