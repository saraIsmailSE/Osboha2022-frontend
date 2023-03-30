<template>
    <div class="row">
        <div class="col-12">
            <iq-card>
                <template v-slot:body>
                    <GroupTitle :group_id:="group.id" :group_name="group.name" :group_users="group_users" />
                    <div class="iq-todo-right">
                        <div class="iq-todo-friendlist mt-3">
                            <ul class="todo-task-lists m-0 p-0" v-if="achievementsLoaded && achievementsLoaded.length > 0">
                                <div class="dropdown w-100 p-3">
                                    <select class="form-select" @change="listByWeek()" v-model="weekFilter">
                                        <option class="dropdown-item" value="current" selected>هذا الأسبوع</option>
                                        <option class="dropdown-item" value="previous">الاسبوع السابق</option>
                                    </select>
                                </div>

                                <li class="d-flex mb-4 align-items-center" v-for="(record, index) in achievementsLoaded"
                                    :key=index>
                                    <div class="user-img img-fluid">
                                        <img :src="require('@/assets/images/user/03.jpg')" alt="story-img"
                                            class="rounded-circle avatar-40">
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between w-100">
                                        <div class="ms-3">
                                            <h6>{{ record.user.name }}</h6>
                                            <p class="mb-0">عدد الصفحات: {{ record.total_pages }}</p>
                                        </div>
                                        <div class="card-header-toolbar d-flex align-items-center">
                                            <router-link
                                                :to="{ name: 'group.listOneAmbassadorReading', params: { ambassador_id: record.user_id } }">
                                                <i class="material-symbols-outlined md-18 me-1 text-primary">
                                                    visibility
                                                </i>
                                            </router-link>
                                        </div>
                                    </div>
                                </li>
                                <li class="d-block text-center mb-0 pb-0" v-if="ambassadorsAchievement.length > length">
                                    <a class="me-3 btn" role="button" @click="loadMore()">عرض المزيد</a>
                                </li>
                            </ul>
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

export default {
    name: 'Achievement As Pages',
    components: {
        GroupTitle
    },
    async created() {

        try {
            const response = await GroupService.AchievementAsPages(this.group_id, this.weekFilter);
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

        }
    },
    computed: {
        achievementsLoaded() {
            return this.ambassadorsAchievement.slice(0, this.length);
        },
    },
}
</script>
