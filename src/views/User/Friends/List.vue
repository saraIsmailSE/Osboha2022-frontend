<template>
    <div class="row">
        <iq-card>
            <template v-slot:headerTitle>
                <h4 class="card-title"> قائمة الأصدقاء</h4>
            </template>
            <template v-slot:body>
                <ul class="request-list list-inline m-0 p-0">
                    <li class="d-flex align-items-center  justify-content-between flex-wrap"
                        v-for="(friend, index) in friendsLoaded" :key="index">
                        <div class="user-img img-fluid flex-shrink-0">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                alt="story-img" class="rounded-circle avatar-40">
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h5>{{ friend.name }}</h5>
                        </div>
                        <div class="d-flex justify-content-end flex-grow-1 ms-3">
                            <span role="button" @click="showList(index)" class="material-symbols-outlined">
                                more_horiz
                            </span>
                            <div :class="`dropdown-menu dropdown-menu-right ${controlList[index] ? 'show' : ''}`"
                                aria-labelledby="dropdownMenuButton" style="">
                                <router-link :to="{ name: 'user.profile', params: { user_id: friend.id } }">
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
                                <a class="dropdown-item d-flex align-items-center" v-if="user_id == auth.id"
                                    @click="deleteFriendship(friend.id)">
                                    <span class="material-symbols-outlined me-2 md-18">
                                        person_remove
                                    </span>
                                    الغاء الصداقة
                                </a>
                                <a class="dropdown-item d-flex align-items-center" v-else
                                    @click="createFriendship(friend.id)">
                                    <span class="material-symbols-outlined me-2 md-18">
                                        group_add
                                    </span>
                                    اضافة
                                </a>
                            </div>

                        </div>
                    </li>
                    <li class="d-block text-center mb-0 pb-0" v-if="friends.length > length">
                        <a class="me-3 btn" role="button" @click="loadMore()">عرض المزيد</a>
                    </li>
                </ul>
            </template>
        </iq-card>
    </div>
</template>
<script>
import UserInfo from '@/Services/userInfoService'
import FriendServices from '@/API/services/friend.service'

export default {
    name: 'FriendList',
    async created() {
        const user_data = await UserInfo.getUser();
        this.auth = user_data.user;
        this.friends = await FriendServices.getAllFriends(this.user_id);
    },

    data() {
        return {
            controlList: [],
            friends: [
            ],
            length:10,
            auth: null,
            user_id: this.$route.params.user_id,
        }
    },
    methods: {
        showList(index) {
            this.controlList.fill(false)
            this.controlList[index] = true;
        },
        deleteFriendship() {

        },
        async createFriendship(friend_id) {
            const response = await FriendServices.create(friend_id);
        },
        loadMore() {
            if (this.length > this.friends.length) return;
            this.length = this.length + 10;
        },
    },
    computed: {
        friendsLoaded() {
            return this.friends.slice(0, this.length);
        },
    },

}

</script>
