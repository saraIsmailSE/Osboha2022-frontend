<template>
  <iq-card>
    <div class="iq-card-body profile-page p-0">
      <div class="profile-header">
        <div class="cover-container">
          <img :src="resolve_porfile_img('1300x325', profile.cover_picture, profile.id)
            " alt="profile-bg" class="rounded img-fluid" v-if="profile && profile.cover_picture" />
          <img src="@/assets/images/main/book-banner.png" alt="profile-bg" class="rounded img-fluid" v-else />
        </div>
        <div class="user-detail text-center mb-3">
          <BaseAvatar :profileImg="profile.profile_picture" :profile_id="profile.id" :title="user.gender"
            :gender="user.gender" avatarClass="avatar-130 img-fluid rounded-circle" containerClass="profile-img"
            :imageStyle="{ border: '4px solid #1d1a55' }" dimensions="150x150" />
          <div class="profile-detail mt-1">
            <h3 class="">{{ user.name + " " + user.last_name }}</h3>
            <div class="social-links">
              <ul class="social-data-block align-items-center justify-content-center list-inline p-0 m-0"
                style="display: flex !important">
                <li v-if="getHighestRole(roles)" class="text-center pe-2">
                  <span class="rounded-pill badge bg-primary px-2">{{
                    ARABIC_ROLES[getHighestRole(roles)]
                    }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
          <div class="social-links">
            <ul style="list-style-type: none" class="d-flex justify-content-center" v-if="isAuth">
              <li>
                <a role="button" class="bg-info text-white rounded-circle d-flex p-1 me-1" @click="updateProfile()">
                  <span class="material-symbols-outlined"> edit </span>
                </a>
              </li>
            </ul>
            <ul style="list-style-type: none" class="d-flex justify-content-center gap-2" v-else>
              <li v-if="authFriendship.friendRequestByAuth">
                <a role="button" class="bg-danger text-white rounded-circle d-flex p-2"
                  @click="deleteFriendship(auth.id, user.id)">
                  <span class="material-symbols-outlined"> close </span>
                </a>
              </li>
              <li v-else-if="authFriendship.friendRequestByFriend">
                <a role="button" class="bg-success text-white rounded-circle d-flex p-2"
                  @click="acceptFriendship(authFriendship.friendship_id)">
                  <span class="material-symbols-outlined"> check </span>
                </a>
              </li>
              <li v-else-if="authFriendship.friendWithAuth">
                <a role="button" class="bg-danger text-white rounded-circle d-flex p-2"
                  @click="deleteFriendship(auth.id, user.id)">
                  <span class="material-symbols-outlined"> person_remove </span>
                </a>
              </li>
              <li v-else>
                <a role="button" class="bg-primary text-white rounded-circle d-flex p-2"
                  @click="createFriendship(user.id)">
                  <span class="material-symbols-outlined"> person_add </span>
                </a>
              </li>
              <li>
                <router-link role="button" class="bg-info text-white rounded d-flex align-items-center p-2"
                  :to="{ name: 'chat.index', query: { user_id: user.id } }">
                  <span class="material-symbols-outlined"> forum </span>
                  <span> إرسال رسالة </span>
                </router-link>
              </li>
            </ul>
          </div>

          <div class="social-info">
            <ul class="social-data-block d-flex align-items-center justify-content-center list-inline p-0 m-0">
              <li v-for="(i, index) in readingInfo" :key="index" class="text-center ps-2 pe-2">
                <h4 class="text-center">{{ i.value }}</h4>
                <p class="mb-0">{{ i.title }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3 mb-3"></div>
  </iq-card>
</template>
<script>
import profileImagesService from "@/API/services/profile.images.service";
import FriendServices from "@/API/services/friend.service";
import helper from "@/utilities/helper";
import { ARABIC_ROLES } from "@/utilities/constants";
import { getHighestRole } from "@/utilities/commonFunctions";

export default {
  name: "MainInfo",
  emits: ["editAuthFriendship"],
  props: {
    authFriendship: {
      type: Object,
      default: () => { },
    },
    profile: {
      type: [Object],
    },
    user: {
      type: [Object],
      required: true,
    },
    roles: {
      type: [Object],
      required: true,
    },
    readingInfo: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {
      ARABIC_ROLES,
    };
  },
  methods: {
    getHighestRole,
    updateProfile() {
      this.$router.push({
        name: "user.profileUpdate",
        params: { user_id: this.$route.params.user_id },
      });
    },
    /**
     * get profile picture or cover.
     *  @param  image size, image name, profile id
     * @return image url
     */

    resolve_porfile_img(size, imageName, profile_id) {
      return profileImagesService.resolve_porfile_img(
        size,
        imageName,
        profile_id,
      );
    },

    deleteFriendship(user_id, friend_id) {
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
        .then((willDelete) => {
          if (willDelete.isConfirmed) {
            FriendServices.delete(user_id, friend_id)
              .then((response) => {
                this.$emit("editAuthFriendship", {
                  friendRequestByAuth: false,
                  friendWithAuth: false,
                });
              })
              .catch((error) => {
                helper.toggleErrorToast();
              });
          }
        });
    },

    async createFriendship(friend_id) {
      try {
        const response = await FriendServices.create(friend_id);
        this.$emit("editAuthFriendship", {
          friendRequestByAuth: true,
        });
      } catch (error) {
        helper.toggleErrorToast();
      }
    },

    acceptFriendship(id) {
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
          confirmButtonText: "نعم، قم بالقبول",
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
            await FriendServices.accept(id)
              .then((response) => {
                this.$emit("editAuthFriendship", {
                  friendWithAuth: true,
                  friendRequestByFriend: false,
                });
              })
              .catch((error) => {
                helper.toggleErrorToast();
              });
          }
        });
    },
  },
  computed: {
    auth() {
      return this.$store.getters.getUser;
    },
    isAuth() {
      return this.auth.id == this.$route.params.user_id;
    },
  },
};
</script>