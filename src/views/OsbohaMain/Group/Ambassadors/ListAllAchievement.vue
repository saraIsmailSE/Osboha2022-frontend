<template>
    <div class="row">
        <div class="col-12">
            <iq-card body-class="p-0">
                <template v-slot:body>
                    <GroupTitle :group_id:="group.id" :group_name="group.name" :group_users="group_users"/> 
                    <ul class="todo-task-lists m-0 p-0" v-if="achievementsLoaded && achievementsLoaded.length > 0">
                        <div class="dropdown w-100 p-3">
                            <select class="form-select" @change="listByWeek()" v-model="weekFilter">
                                <option class="dropdown-item" value="current" selected>هذا الأسبوع</option>
                                <option class="dropdown-item" value="previous">الاسبوع السابق</option>
                            </select>
                        </div>
                        <template v-for="(ambassador, index) in achievementsLoaded" :key="index">
                            <li class="d-flex align-items-center p-3">
                                <div class="user-img img-fluid">
                                    <img :src="require('@/assets/images/user/03.jpg')" alt="story-img"
                                        class="rounded-circle avatar-40">
                                </div>
                                <div class="d-flex align-items-center w-100 row">
                                    <div class="col-lg-3 col-md-3 col-sm-12 ms-3">
                                        <h6 class="d-inline-block">
                                            <strong>{{ ambassador.user.name }} </strong>
                                        </h6>
                                    </div>
                                    <div class="col-lg-5 col-md-5 col-sm-12 form-check mt-2">
                                        <div class="d-block w-100">
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-striped bg-primary" role="progressbar"
                                                    aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"
                                                    :style="`width: ${ambassador.out_of_100}%;`"></div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-12 text-center">
                                        <router-link
                                            :to="{ name: 'group.listOneAmbassadorReading', params: { ambassador_id: ambassador.user_id } }">
                                            <span class="badge bg-primary ms-0 ms-md-3 my-1 my-md-0 w-75 text-center"
                                                role="button">عرض </span>
                                        </router-link>
                                    </div>
                                </div>
                            </li>
                        </template>
                        <li class="d-block text-center mb-0 pb-0" v-if="ambassadorsAchievement.length > length">
                            <a class="me-3 btn" role="button" @click="loadMore()">عرض المزيد</a>
                        </li>

                    </ul>
                </template>
            </iq-card>
        </div>
    </div>
</template>
  
<script>
import GroupService from '@/API/services/group.service';
import GroupTitle from '@/components/group/GroupTitle.vue'
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
    components:{
        GroupTitle,
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
        async listByWeek() {
            const response = await GroupService.AllAchievements(this.group_id, this.weekFilter)
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
