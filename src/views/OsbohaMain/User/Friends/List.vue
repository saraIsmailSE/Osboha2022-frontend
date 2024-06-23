<template>
  <div class="row">
    <iq-card>
      <template v-slot:headerTitle>
        <h4 class="card-title">قائمة الأصدقاء</h4>
      </template>
      <template v-slot:body>
        <ul class="request-list list-inline m-0 p-0" v-if="friendsLoaded.length > 0" v-click-outside="onClickOutside">
          <li class="d-flex align-items-center justify-content-between flex-wrap"
            v-for="(friend, index) in friendsLoaded" :key="index">
            <BaseAvatar :profileImg="friend.profile.profile_picture" :profile_id="friend.profile.id"
              :title="friend.name" :gender="friend.gender" avatarClass="rounded-circle avatar-40"
              containerClass="flex-shrink-0" />
            <div class="flex-grow-1 ms-3">
              <h5>{{ friend.name + " " + friend.last_name }}</h5>
            </div>
            <div class="d-flex justify-content-end flex-grow-1 ms-3">
              <span role="button" @click="showList(index)" class="material-symbols-outlined">
                more_horiz
              </span>
              <div :class="`dropdown-menu dropdown-menu-right ${controlList[index] ? 'show' : ''
                }`" aria-labelledby="dropdownMenuButton">
                <router-link :to="{ name: 'user.profile', params: { user_id: friend.id } }">
                  <a class="dropdown-item d-flex align-items-center">
                    <span class="material-symbols-outlined me-2 md-18">
                      person
                    </span>
                    الملف الشخصي
                  </a>
                </router-link>
                <!-- <a class="dropdown-item d-flex align-items-center">
                                    <span class="material-symbols-outlined me-2 md-18">
                                        forum
                                    </span>
                                    مراسلة
                                </a> -->
                <a class="dropdown-item d-flex align-items-center" v-if="user_id == auth.id"
                  @click="deleteFriendship(auth.id, friend.id)">
                  <span class="material-symbols-outlined me-2 md-18">
                    person_remove
                  </span>
                  الغاء الصداقة
                </a>
                <a class="dropdown-item d-flex align-items-center" v-else-if="checkNotFriendsOfAuth(friend.id)"
                  @click="createFriendship(friend.id)">
                  <span class="material-symbols-outlined me-2 md-18">
                    person_remove
                  </span>
                  الغاء طلب الصداقة
                </a>
                <a class="dropdown-item d-flex align-items-center" v-else-if="!checkFriendsOfAuth(friend.id)"
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
        <div class="col-sm-12" v-else>
          <iq-card class="iq-card">
            <div class="iq-card-body p-0">
              <div class="image-block text-center">
                <img src="@/assets/images/main/no-friends.png" class="img-fluid rounded w-50" alt="blog-img" />
              </div>
              <h4 class="text-center mt-3 mb-3">لا يوجد أصدقاء</h4>
            </div>
          </iq-card>
        </div>
      </template>
    </iq-card>
  </div>
</template>
<script>
import FriendServices from "@/API/services/friend.service";
import vClickOutside from "click-outside-vue3";

export default {
  name: "FriendList",
  async created() {
    const response = await FriendServices.getAllFriends(this.user_id);
    this.friends = response.allFriends;
    this.friendsOfAuth = response.friendsOfAuth;
    this.notFriendsOfAuth = response.notFriendsOfAuth;
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      controlList: [],
      friends: [],
      friendsOfAuth: [],
      notFriendsOfAuth: [],
      length: 10,
      user_id: this.$route.params.user_id,
    };
  },
  methods: {
    /**
     * show specific control list.
     *  @param  index
     */
    showList(index) {
      this.controlList.fill(false);
      this.controlList[index] = true;
    },

    /**
     * hide all control lists.
     */
    onClickOutside() {
      this.controlList.fill(false);
    },

    /**
     * delete Friendship between 2 users.
     *  @param  user id, friend id
     */
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
                swalWithBootstrapButtons.fire({
                  title: "تم الحذف",
                  text: "تم حذف طلب الصداقة",
                  icon: "success",
                  showClass: {
                    popup: "animate__animated animate__zoomIn",
                  },
                  hideClass: {
                    popup: "animate__animated animate__zoomOut",
                  },
                });
                setTimeout(function () {
                  location.reload(true);
                }, 2000);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    /**
     * create Friendship between auth and another user.
     *  @param friend id
     */
    async createFriendship(friend_id) {
      try {
        const response = await FriendServices.create(friend_id);
        this.notFriendsOfAuth.push(friend_id);
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
      } catch (error) {
        console.log(error);
      }
      //setTimeout(location.reload(), 30000);
    },

    /**
     * load more friends.
     */
    loadMore() {
      if (this.length > this.friends.length) return;
      this.length = this.length + 10;
    },

    /**
     * check if user is friend with auth or not.
     *  @param user id
     */
    checkFriendsOfAuth(user_id) {
      return this.friendsOfAuth.includes(user_id);
    },

    /**
     * check if user is NOT friend with auth or not.
     *  @param user id
     */
    checkNotFriendsOfAuth(user_id) {
      return this.notFriendsOfAuth.includes(user_id);
    },
  },
  computed: {
    friendsLoaded() {
      return this.friends.slice(0, this.length);
    },
    auth() {
      return this.$store.getters.getUser;
    },
  },
};
</script>