<template>

    <div>
        <ul class="request-list list-inline m-0 p-0">

            <li class="d-flex align-items-center justify-content-between flex-wrap" v-for="(member, index) in members"
                :key="index">
                <BaseAvatar :profileImg="member.user.user_profile.profile_picture"
                    :profile_id="member.user.user_profile.id" :title="user?.name" :gender="member.user?.gender"
                    avatarClass="rounded-circle avatar-40" containerClass="flex-shrink-0" />
                <div class="flex-grow-1 ms-3" @click="hideList">
                    <router-link :to="{ name: 'user.profile', params: { user_id: member.user.id } }">
                        <h5>{{ member.user.name + " " + member.user.last_name }}</h5>
                    </router-link>
                    <small>{{ formatDateToWritten(member.updated_at) }}</small>
                    <br>
                    <span class="rounded-pill badge lh-1 bg-primary px-2">{{
                        ARABIC_ROLES[member.user_type]
                        }}</span>
                </div>
                <div v-if="advisorAndAbove" class="d-flex justify-content-end flex-grow-1 ms-3">
                    <span role="button" @click="showList(index)" class="material-symbols-outlined">
                        more_horiz
                    </span>
                    <div :class="`dropdown-menu dropdown-menu-right ${controlList[index] ? 'show' : ''
                        }`" aria-labelledby="dropdownMenuButton">
                        <a v-if="allowedTodelete" role="button" class="dropdown-item d-flex align-items-center"
                            @click="deleteMember(member.id)">
                            <span class="material-symbols-outlined me-2 md-18">
                                delete
                            </span>
                            حذف [مكرر]
                        </a>
                        <a role="button" class="dropdown-item d-flex align-items-center"
                            @click="withdrawnMember(member.id)">
                            <span class="material-symbols-outlined me-2 md-18">
                                directions_run
                            </span>
                            منسحب
                        </a>
                    </div>
                </div>
            </li>
            <li class="d-block text-center mb-0 pb-0" v-if="users?.length > length">
                <a class="me-3 btn" role="button" @click="loadMore()">عرض المزيد</a>
            </li>
        </ul>
    </div>
</template>
<script>
import FriendServices from "@/API/services/friend.service";
import UserGroup from "@/API/services/user-group.service";
import vClickOutside from "click-outside-vue3";
import GroupService from "@/API/services/group.service";
import { ARABIC_ROLES } from "@/utilities/constants";
import helper from "@/utilities/helper";
import UserInfoService from "@/Services/userInfoService";

export default {
    name: "Group New Members",
    directives: {
        clickOutside: vClickOutside.directive,
    },
    props: {
        members: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            controlList: [],
            length: 10,
            ambassador_name: "",
            ARABIC_ROLES,
            currentIndex: -1,
            group: null
        };
    },
    methods: {
        ...helper,
        showList(index) {
            this.controlList.fill(false);
            this.controlList[index] = true;
        },
        hideList() {
            this.controlList.fill(false);
        },
        async createFriendship(friend_id) {
            const response = await FriendServices.create(friend_id);
        },
        async deleteMember(user_group_id) {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: "btn btn-primary btn-lg",
                    cancelButton: "btn btn-outline-primary btn-lg ms-2",
                },
                buttonsStyling: false,
            });

            swalWithBootstrapButtons
                .fire({
                    title: "هل أنت متأكد؟",
                    text: "لا يمكنك التراجع عن هذا الاجراء",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "نعم، قم بالحذف",
                    cancelButtonText: "تراجع  ",
                    showClass: {
                        popup: "animate__animated animate__zoomIn",
                    },
                    hideClass: {
                        popup: "animate__animated animate__zoomOut",
                    },
                })
                .then(async (willDelete) => {
                    if (willDelete.isConfirmed) {
                        const response = await UserGroup.delete(user_group_id)
                            .then(async (response) => {
                                this.getUsers();
                                this.hideList();
                                helper.toggleToast("تم الحذف", "success");
                            })
                            .catch((error) => {
                                helper.toggleToast("حصل خطأ - لم يتم الحذف!", "danger");
                                console.log(error);
                            });
                    }
                });
        },
        withdrawnMember(user_group_id) {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: "btn btn-primary btn-lg",
                    cancelButton: "btn btn-outline-primary btn-lg ms-2",
                },
                buttonsStyling: false,
            });

            swalWithBootstrapButtons
                .fire({
                    title: "هل أنت متأكد؟",
                    text: "لا يمكنك التراجع عن هذا الاجراء",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "نعم، قم بسحب السفير",
                    cancelButtonText: "تراجع  ",
                    showClass: {
                        popup: "animate__animated animate__zoomIn",
                    },
                    hideClass: {
                        popup: "animate__animated animate__zoomOut",
                    },
                })
                .then(async (willDelete) => {
                    if (willDelete.isConfirmed) {
                        const response = await UserGroup.withdrawnMember(user_group_id)
                            .then(async (response) => {
                                this.getUsers();
                                this.hideList();
                                helper.toggleToast("تم سحب السفير", "success");
                            })
                            .catch((error) => {
                                helper.toggleToast("حصل خطأ - لم يتم سحب السفير!", "danger");
                                console.log(error);
                            });
                    }
                });
        },
        async searchForAmbassador() {
            const response = await GroupService.searchForAmbassador(
                this.ambassador_name,
                this.$route.params.group_id
            );
            this.users = response.users;
        },
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        isAdmin() {
            return UserInfoService.hasRole(this.user, "admin");
        },
        consultantAndAbove() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "consultant",
            ]);
        },
        allowedTodelete() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "consultant",
                "advisor",
                "special_care_coordinator",
                "marathon_coordinator"
            ]);
        },
        advisorAndAbove() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "consultant",
                "advisor"
            ]);
        }
    },
};
</script>