<template>
  <iq-card>
    <div class="iq-card-body profile-page p-0">
      <div class="profile-header">
        <div class="cover-container">
          <img
            :src="
              resolve_porfile_img('1300x325', profile.cover_picture, profile.id)
            "
            alt="profile-bg"
            class="rounded img-fluid"
            v-if="profile && profile.cover_picture"
          />
          <img
            src="@/assets/images/main/book-banner.png"
            alt="profile-bg"
            class="rounded img-fluid"
            v-else
          />
        </div>
        <div class="user-detail text-center mb-3">
          <UserAvatar
            :profileImg="profile.profile_picture"
            :profile_id="profile.id"
            :title="user.gender"
            :gender="user.gender"
            avatarClass="avatar-130 img-fluid"
            containerClass="profile-img"
            :imageStyle="{ border: '4px solid #1d1a55' }"
          />
          <div class="profile-detail mt-1">
            <h3 class="">{{ user.name }}</h3>
            <div class="social-links">
              <ul
                class="social-data-block align-items-center justify-content-center list-inline p-0 m-0"
                style="display: flex !important"
              >
                <li
                  v-for="(role, index) in roles"
                  :key="index"
                  class="text-center pe-2"
                >
                  <span class="rounded-pill badge bg-primary">{{ user_role[role] }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="profile-info p-3 d-flex align-items-center justify-content-between position-relative"
        >
          <div class="social-links">
            <ul
              style="list-style-type: none"
              class="d-flex justify-content-center"
              v-if="isAuth"
            >
              <li>
                <a
                  role="button"
                  class="bg-info text-white rounded-circle d-flex p-2"
                  @click="updateProfile()"
                >
                  <span class="material-symbols-outlined"> edit </span>
                </a>
              </li>

              <!-- LATER -->
              <!-- <li><a href="#" class="material-symbols-outlined text-white" style="background-color: #1D1A55;">
                settings
              </a>
            </li> -->
            </ul>
            <ul
              style="list-style-type: none"
              class="d-flex justify-content-center"
              v-else
            >
              <li v-if="authFriendship.friendRequestByAuth">
                <a
                  role="button"
                  class="bg-danger text-white rounded-circle d-flex p-2"
                  @click="deleteFriendship(auth.id, user.id)"
                >
                  <span class="material-symbols-outlined"> close </span>
                </a>
              </li>
              <li v-else-if="authFriendship.friendRequestByFriend">
                <a
                  role="button"
                  class="bg-success text-white rounded-circle d-flex p-2"
                  @click="acceptFriendship(authFriendship.friendship_id)"
                >
                  <span class="material-symbols-outlined"> check </span>
                </a>
              </li>
              <li v-else-if="authFriendship.friendWithAuth">
                <a
                  role="button"
                  class="bg-danger text-white rounded-circle d-flex p-2"
                  @click="deleteFriendship(auth.id, user.id)"
                >
                  <span class="material-symbols-outlined"> person_remove </span>
                </a>
              </li>
              <li v-else>
                <a
                  role="button"
                  class="bg-primary text-white rounded-circle d-flex p-2"
                  @click="createFriendship(user.id)"
                >
                  <span class="material-symbols-outlined"> person_add </span>
                </a>
              </li>
            </ul>
          </div>

          <div class="social-info">
            <ul
              class="social-data-block d-flex align-items-center justify-content-center list-inline p-0 m-0"
            >
              <li
                v-for="(i, index) in readingInfo"
                :key="index"
                class="text-center ps-2 pe-2"
              >
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
import UserAvatar from "@/components/user/UserAvatar.vue";
import helper from "@/utilities/helper";

export default {
  name: "MainInfo",
  components: {
    UserAvatar,
  },
  emits: ["editAuthFriendship"],
  created() {},
  props: {
    authFriendship: {
      type: Object,
      default: () => {},
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
  data(){
    return{
      user_role: {
        ambassador: "سفير",
        leader: "قائد",
        supervisor: "مراقب",
        advisor: "موجه",
        consultant: "مستشار",
        admin: "ادارة",
      },
    }
  },
  methods: {
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
        profile_id
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
                helper.handleSuccessSwal("تم حذف طلب الصداقة");
                this.$emit("editAuthFriendship", {
                  friendRequestByAuth: false,
                  friendWithAuth: false,
                });
              })
              .catch((error) => {
                helper.handleErrorSwal();
              });
          }
        });
    },

    async createFriendship(friend_id) {
      try {
        const response = await FriendServices.create(friend_id);
        const swalWithBootstrapButtons = this.$swal.mixin({
          customClass: {
            confirmButton: "btn btn-primary btn-lg",
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons.fire({
          title: "تم الارسال",
          text: "تم ارسال طلب الصداقة",
          icon: "success",
          confirmButtonText: "حسنا",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        });
        this.$emit("editAuthFriendship", {
          friendRequestByAuth: true,
        });
      } catch (error) {
        helper.handleErrorSwal();
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
                helper.handleSuccessSwal("تم قبول طلب الصداقة");
                this.$emit("editAuthFriendship", {
                  friendWithAuth: true,
                  friendRequestByFriend: false,
                });
              })
              .catch((error) => {
                helper.handleErrorSwal();
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
