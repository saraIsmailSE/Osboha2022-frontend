<template>
  <div class="row">
    <iq-card>
      <template v-slot:headerTitle>
        <h4 class="card-title">قائمة الأعضاء</h4>
      </template>
      <template v-slot:body>
        <ul class="request-list list-inline m-0 p-0" v-if="usersLoaded?.length > 0">

          <li class="d-flex align-items-center justify-content-between flex-wrap" v-for="(user, index) in usersLoaded"
            :key="index">
            <BaseAvatar :profileImg="user.user_profile.profile_picture" :profile_id="user.user_profile.id"
              :title="user?.name" :gender="user?.gender" avatarClass="rounded-circle avatar-40"
              containerClass="flex-shrink-0" />
            <div class="flex-grow-1 ms-3" @click="hideList">
              <router-link :to="{ name: 'user.profile', params: { user_id: user.id } }">
                <h5>{{ user.name + " " + user.last_name }}</h5>
              </router-link>
              <small>{{ formatDateToWritten(user.pivot.updated_at) }}</small>
              <br>
              <span class="rounded-pill badge lh-1 bg-primary px-2">{{
                ARABIC_ROLES[user.pivot.user_type]
              }}</span>
            </div>
            <div v-if="advisorAndAbove" class="d-flex justify-content-end flex-grow-1 ms-3">
              <span role="button" @click="showList(index)" class="material-symbols-outlined">
                more_horiz
              </span>
              <div :class="`dropdown-menu dropdown-menu-right ${controlList[index] ? 'show' : ''
                }`" aria-labelledby="dropdownMenuButton">
                <a v-if="allowedTodelete" role="button" class="dropdown-item d-flex align-items-center"
                  @click="deleteMember(user.pivot.id)">
                  <span class="material-symbols-outlined me-2 md-18">
                    delete
                  </span>
                  حذف [مكرر]
                </a>
                <a role="button" class="dropdown-item d-flex align-items-center" @click="withdrawnMember(user.pivot.id)">
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
        <div class="col-sm-12" v-else>
          <iq-card class="iq-card">
            <div class="iq-card-body p-0">
              <div class="image-block text-center">
                <img src="@/assets/images/main/no-friends.png" class="img-fluid rounded w-50" alt="blog-img" />
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
import FriendServices from "@/API/services/friend.service";
import UserGroup from "@/API/services/user-group.service";
import vClickOutside from "click-outside-vue3";
import GroupService from "@/API/services/group.service";
import { ARABIC_ROLES } from "@/utilities/constants";
import helper from "@/utilities/helper";
import UserInfoService from "@/Services/userInfoService";

export default {
  name: "GroupMembers",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  created() {
    this.getUsers()
  },
  data() {
    return {
      controlList: [],
      users: [],
      length: 10,
      ambassador_name: "",
      ARABIC_ROLES,
      currentIndex: -1,
      group:null
    };
  },
  methods: {
    ...helper,
    async getUsers() {
      const response = await UserGroup.usersByGroupId(
        this.$route.params.group_id
      );
      this.users = response.users;
      this.group = response;
    },
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
    loadMore() {
      if (this.length > this.users?.length) return;
      this.length = this.length + 10;
    },
    /**
     * search for ambassador
     * @param  ambassador_name, group_id
     * @return ambassador
     */
    async searchForAmbassador() {
      const response = await GroupService.searchForAmbassador(
        this.ambassador_name,
        this.$route.params.group_id
      );
      this.users = response.users;
    },
  },
  computed: {
    usersLoaded() {
      return this.users?.slice(0, this.length);
    },
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
