<template>
    <div class="row">
        <div class="col-12">
            <iq-card body-class="p-0">
                <template v-slot:body>
                    <div class="card position-relative inner-page-bg" style=" background-color: #cae0cd; height: 100px;">
                        <div class="inner-page-title">
                            <h3 class="text-dark">تدقيق العلامات || {{ group.name }}</h3>
                        </div>
                    </div>
                    <ul class="todo-task-lists m-0 p-0" v-if="achievementsLoaded && achievementsLoaded.length > 0">
                        <div class="card position-relative" style=" background-color: #208040; height: 60px;">
                            <div class="inner-page-title">
                                <h3 class="text-light">انجاز كامل</h3>
                            </div>
                        </div>
                        <template v-for="(ambassador, index) in achievementsLoaded" :key="index">
                            <li class="d-flex align-items-center p-3">
                                <div class="user-img img-fluid">
                                    <img v-if="ambassador.user.user_profile.profile_picture"
                                        :src="resolve_porfile_img('60x60', ambassador.user.user_profile.profile_picture, ambassador.user.user_profile.id)"
                                        alt="profile-img" class="rounded-circle avatar-40" :title="ambassador.user.name" />

                                    <img v-else
                                        :src="resolve_porfile_img('60x60', 'ananimous_' + ambassador.user.gender + '.png', 'ananimous')"
                                        alt="profile-img" :title="ambassador.user.name" class="rounded-circle avatar-40">
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

                    
                    <ul class="todo-task-lists m-0 p-0" v-if="achievementsLoaded && achievementsLoaded.length > 0">
                        <div class="card position-relative" style=" background-color: #831018; height: 60px;">
                            <div class="inner-page-title">
                                <h3 class="text-light">انجاز ناقص</h3>
                            </div>
                        </div>
                        <template v-for="(ambassador, index) in achievementsLoaded" :key="index">
                            <li class="d-flex align-items-center p-3">
                                <div class="user-img img-fluid">
                                    <img v-if="ambassador.user.user_profile.profile_picture"
                                        :src="resolve_porfile_img('60x60', ambassador.user.user_profile.profile_picture, ambassador.user.user_profile.id)"
                                        alt="profile-img" class="rounded-circle avatar-40" :title="ambassador.user.name" />

                                    <img v-else
                                        :src="resolve_porfile_img('60x60', 'ananimous_' + ambassador.user.gender + '.png', 'ananimous')"
                                        alt="profile-img" :title="ambassador.user.name" class="rounded-circle avatar-40">
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
import profileImagesService from '@/API/services/profile.images.service'

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

        },
        /**
        * get profile picture or cover.
        *  @param  image size, image name, profile id
        * @return image url
        */
        resolve_porfile_img(size, imageName, profile_id) {
            return profileImagesService.resolve_porfile_img(size, imageName, profile_id);
        },

    },
    computed: {
        achievementsLoaded() {
            return this.ambassadorsAchievement.slice(0, this.length);
        },
    },

}
</script>
