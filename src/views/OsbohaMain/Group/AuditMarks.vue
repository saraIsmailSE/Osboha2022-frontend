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
                    <ul class="todo-task-lists m-2 p-0" v-if="achievementsLoaded && achievementsLoaded.length > 0">
                        <div class="card position-relative" style=" background-color: #208040; height: 60px;">
                            <div class="d-flex align-items-center justify-content-between w-100">
                                <div class="inner-page-title">
                                    <h3 class="text-light d-flex justify-content-between">
                                        انجاز كامل
                                        <span v-if="!show_full_mark" class="display-6 text-light material-symbols-outlined"
                                            @click="show_full_mark = !show_full_mark">
                                            expand_more
                                        </span>
                                        <span v-if="show_full_mark" class="display-6 text-light material-symbols-outlined"
                                            @click="show_full_mark = !show_full_mark">
                                            expand_less
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div v-show="show_full_mark">

                            <template v-for="(ambassador, index) in achievementsLoaded" :key="index">
                                <li class="d-flex align-items-center p-3">
                                    <div class="user-img img-fluid">
                                        <img v-if="ambassador.user.user_profile.profile_picture"
                                            :src="resolve_porfile_img('60x60', ambassador.user.user_profile.profile_picture, ambassador.user.user_profile.id)"
                                            alt="profile-img" class="rounded-circle avatar-40"
                                            :title="ambassador.user.name" />

                                        <img v-else
                                            :src="resolve_porfile_img('60x60', 'ananimous_' + ambassador.user.gender + '.png', 'ananimous')"
                                            alt="profile-img" :title="ambassador.user.name"
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
                                                    <div class="progress-bar progress-bar-striped bg-primary"
                                                        role="progressbar" aria-valuenow="90" aria-valuemin="0"
                                                        aria-valuemax="100" :style="`width: ${ambassador.out_of_100}%;`">
                                                    </div>
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
                        </div>
                    </ul>

                    <ul class="todo-task-lists m-2 p-0" v-if="achievementsLoaded && achievementsLoaded.length > 0">
                        <div class="card position-relative" style=" background-color: #831018; height: 60px;">
                            <div class="inner-page-title">
                                <h3 class="text-light d-flex justify-content-between">

                                    انجاز ناقص

                                    <span v-if="!show_incomplete" class="display-6 text-light material-symbols-outlined"
                                        @click="show_incomplete = !show_incomplete">
                                        expand_more
                                    </span>
                                    <span v-if="show_incomplete" class="display-6 text-light material-symbols-outlined"
                                        @click="show_incomplete = !show_incomplete">
                                        expand_less
                                    </span>

                                </h3>
                            </div>
                        </div>
                        <div v-show="show_incomplete">

                            <template v-for="(ambassador, index) in achievementsLoaded" :key="index">
                                <li class="d-flex align-items-center p-3">
                                    <div class="user-img img-fluid">
                                        <img v-if="ambassador.user.user_profile.profile_picture"
                                            :src="resolve_porfile_img('60x60', ambassador.user.user_profile.profile_picture, ambassador.user.user_profile.id)"
                                            alt="profile-img" class="rounded-circle avatar-40"
                                            :title="ambassador.user.name" />

                                        <img v-else
                                            :src="resolve_porfile_img('60x60', 'ananimous_' + ambassador.user.gender + '.png', 'ananimous')"
                                            alt="profile-img" :title="ambassador.user.name"
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
                                                    <div class="progress-bar progress-bar-striped bg-primary"
                                                        role="progressbar" aria-valuenow="90" aria-valuemin="0"
                                                        aria-valuemax="100" :style="`width: ${ambassador.out_of_100}%;`">
                                                    </div>
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
                        </div>

                    </ul>
                </template>
            </iq-card>
            <iq-card body-class="p-0">
                <template v-slot:body>

                    <!-- START NOTES -->
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header" style="background:#cae0cd;">
                                <h4 class="card-title"> ملاحظات حول التدقيق </h4>
                            </div>
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="row rounded-lg overflow-hidden shadow">
                                        <!-- Chat Box-->
                                        <div class="col-12 px-0">
                                            <div class="px-4 py-5 chat-box bg-white">

                                                <!-- Sender Message-->
                                                <!-- Reciever Message-->

                                                <div class="media w-auto mb-3" dir='ltr'>
                                                    <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                                                        alt="user" width="50" class="rounded-circle">
                                                    <div class="media-body ml-3">
                                                        <div class="bg-recipient rounded py-2 px-3 mb-2">
                                                            <p class="text-small mb-0 text-muted">Test which is a new
                                                                approach
                                                                all solutions</p>
                                                        </div>
                                                        <p class="small text-muted">12:00 PM | Aug 13</p>
                                                    </div>
                                                </div>

                                                <!-- Sender Message-->
                                                <div class="media w-auto ml-auto mb-3">
                                                    <div class="media-body">
                                                        <div class="bg-sender rounded py-2 px-3 mb-2">
                                                            <p class="text-small mb-0 text-muted">Apollo University, Delhi,
                                                                India Test</p>
                                                        </div>
                                                        <p class="small text-muted">12:00 PM | Aug 13</p>
                                                    </div>
                                                </div>
                                                <!-- Reciever Message-->

                                                <div class="media w-auto mb-3" dir='ltr'>
                                                    <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                                                        alt="user" width="50" class="rounded-circle">
                                                    <div class="media-body ml-3">
                                                        <div class="bg-recipient rounded py-2 px-3 mb-2">
                                                            <p class="text-small mb-0 text-muted">Test which is a new
                                                                approach
                                                                all solutions</p>
                                                        </div>
                                                        <p class="small text-muted">12:00 PM | Aug 13</p>
                                                    </div>
                                                </div>

                                                <!-- Sender Message-->
                                                <div class="media w-auto ml-auto mb-3">
                                                    <div class="media-body">
                                                        <div class="bg-sender rounded py-2 px-3 mb-2">
                                                            <p class="text-small mb-0 text-muted">Apollo University, Delhi,
                                                                India Test</p>
                                                        </div>
                                                        <p class="small text-muted">12:00 PM | Aug 13</p>
                                                    </div>
                                                </div>

                                            </div>

                                            <!-- Typing area -->
                                            <form action="#" class="bg-sender mt-2">
                                                <div class="input-group">
                                                    <div class="input-group-append">
                                                        <button id="button-addon2" type="submit" class="btn btn-link">
                                                            <span class="display-5 text-dark material-symbols-outlined">
                                                                send
                                                            </span>

                                                        </button>
                                                    </div>
                                                    <input type="text" placeholder="اكتب ملاحظة"
                                                        aria-describedby="button-addon2"
                                                        class="border-bottom form-control rounded-0 border-0 py-4 bg-sender">
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </iq-card>
            <iq-card class="iq-card">
                        <div class="iq-card-body p-0">
                            <div class="image-block text-center">
                                <img src="@/assets/images/main/reader.png" class="img-fluid rounded w-75 mt-3" alt="no-amb">
                            </div>
                            <h4 class="text-center mt-3 mb-3">لا يوجد تدقيق لهذا الاسبوع</h4>
                        </div>
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
            weekFilter: 'current',
            show_full_mark: false,
            show_incomplete: false,
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
<style scoped>
.validation-alert {
    display: none;
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    width: 5px;
    background: #f5f5f5;
}

::-webkit-scrollbar-thumb {
    width: 1em;
    background-color: #ddd;
    outline: 1px solid slategrey;
    border-radius: 1rem;
}

.text-small {
    font-size: 0.9rem;
}

.messages-box,
.chat-box {
    height: 510px;
    overflow-y: scroll;
}

.rounded-lg {
    border-radius: 0.5rem;
}

input::placeholder {
    font-size: 0.9rem;
    color: #999;
}

.bg-sender {
    background-color: #e3ebe4
}

.bg-recipient {
    background-color: #cae0cd
}
</style>