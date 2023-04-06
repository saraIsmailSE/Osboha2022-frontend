<template>
    <div class="row">
        <iq-card>
            <template v-slot:headerTitle>
                <h4 class="card-title"> قائمة الأعضاء</h4>
            </template>
            <template v-slot:body>
                <ul class="request-list list-inline m-0 p-0" v-if="usersLoaded.length > 0">
                    <!-- <form class="mb-3">
                        <div class="input-group w-100 m-auto p-2">
                            <input type="search" class="form-control rounded" placeholder="ابحث عن سفير" aria-label="Search"
                                aria-describedby="search-addon" @input="searchForAmbassador()"
                                v-model="ambassador_name" />
                            <button type="button" class="btn btn-outline-primary"><span
                                    class="material-symbols-outlined lh-1">
                                    search
                                </span></button>
                        </div>
                    </form> -->

                    <li class="d-flex align-items-center  justify-content-between flex-wrap"
                        v-for="(user, index) in usersLoaded" :key="index">
                        <div class="user-img img-fluid flex-shrink-0">
                            <img v-if="user.user_profile.profile_picture"
                                :src="resolve_porfile_img('60x60', user.user_profile.profile_picture, user.user_profile.id)"
                                alt="profile-img" class="rounded-circle avatar-40" :title="user.name" />

                            <img v-else
                                :src="resolve_porfile_img('60x60', 'ananimous_' + user.gender + '.png', 'ananimous')"
                                alt="profile-img" :title="user.name" class="rounded-circle avatar-40">
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <router-link :to="{ name: 'user.profile', params: { user_id: user.id } }">
                                <h5>{{ user.name }}</h5>
                            </router-link>
                            <span class="rounded-pill badge lh-1 bg-primary">{{ user.pivot.user_type }}</span>
                        </div>
                        <div class="d-flex justify-content-end flex-grow-1 ms-3">
                            <span role="button" @click="showList(index)" class="material-symbols-outlined">
                                more_horiz
                            </span>
                            <div v-click-outside="hideList"
                                :class="`dropdown-menu dropdown-menu-right ${controlList[index] ? 'show' : ''}`"
                                aria-labelledby="dropdownMenuButton">
                                <router-link :to="{ name: 'user.profile', params: { user_id: user.id } }">
                                    <a class="dropdown-item d-flex align-items-center">
                                        <span class="material-symbols-outlined me-2 md-18">
                                            person
                                        </span>
                                        الملف الشخصي
                                    </a>
                                </router-link>
                                <a class="dropdown-item d-flex align-items-center">
                                    <span class="material-symbols-outlined me-2 md-18">
                                        forum
                                    </span>
                                    مراسلة
                                </a>
                                <a class="dropdown-item d-flex align-items-center" @click="createFriendship(user.id)">
                                    <span class="material-symbols-outlined me-2 md-18">
                                        group_add
                                    </span>
                                    اضافة
                                </a>
                            </div>

                        </div>
                    </li>
                    <li class="d-block text-center mb-0 pb-0" v-if="users.length > length">
                        <a class="me-3 btn" role="button" @click="loadMore()">عرض المزيد</a>
                    </li>
                </ul>
                <div class="col-sm-12" v-else>
                    <iq-card class="iq-card">
                        <div class="iq-card-body p-0">
                            <div class="image-block text-center">
                                <img src="@/assets/images/main/no-friends.png" class="img-fluid rounded w-50"
                                    alt="blog-img">
                            </div>
                            <h4 class="text-center mt-3 mb-3">لا يوجد أعضاء</h4>
                        </div>
                    </iq-card>
                </div>
            </template>
        </iq-card>
    </div>
</template>
<script>
import UserInfo from '@/Services/userInfoService'
import FriendServices from '@/API/services/friend.service'
import UserGroup from '@/API/services/user-group.service'
import vClickOutside from "click-outside-vue3"
import profileImagesService from '@/API/services/profile.images.service'
import GroupService from '@/API/services/group.service';

export default {
    name: 'FriendList',
    directives: {
        clickOutside: vClickOutside.directive
    },
    async created() {
        const user_data = await UserInfo.getUser();
        this.auth = user_data.user;
        const response = await UserGroup.usersByGroupId(this.$route.params.group_id);
        this.users = response.users
    },

    data() {
        return {
            controlList: [],
            users: [],
            length: 10,
            auth: null,
            ambassador_name:"",
        }
    },
    methods: {
        showList(index) {
            this.controlList.fill(false)
            this.controlList[index] = true;
        },
        hideList() {
            this.controlList.fill(false)
        },
        async createFriendship(friend_id) {
            const response = await FriendServices.create(friend_id);
        },
        loadMore() {
            if (this.length > this.users.length) return;
            this.length = this.length + 10;
        },
        /**
        * get profile picture or cover.
        *  @param  image size, image name, profile id
        * @return image url
        */
        resolve_porfile_img(size, imageName, profile_id) {
            return profileImagesService.resolve_porfile_img(size, imageName, profile_id);
        },
        /**
         * search for ambassador
         * @param  ambassador_name, group_id 
         * @return ambassador
         */
        async searchForAmbassador() {
            const response = await GroupService.searchForAmbassador(this.ambassador_name, this.$route.params.group_id);
            this.users = response.users
        }

    },
    computed: {
        usersLoaded() {
            return this.users.slice(0, this.length);
        },
    },

}

</script>
