<template>
  <div class="row">
    <div class="col-sm-12">
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">طلبات الصداقة</h4>
        </template>
        <template v-slot:body>
          <ul class="request-request request-inline m-0 p-0" v-if="requestsLoaded.length > 0">
            <span role="button" class="btn btn-primary mb-3" style="direction: rtl !important" @click="acceptAll()">
              <i role="button" class="material-symbols-outlined align-middle">
                done
              </i>
              قبول الكل
            </span>
            <span role="button" class="btn btn-danger ms-2 mb-3" style="direction: rtl !important"
              @click="deleteAllUnAccepted()">
              <i role="button" class="material-symbols-outlined align-middle">
                delete
              </i>
              رفض الكل
            </span>

            <li class="d-flex align-items-center justify-content-between flex-wrap"
              v-for="(request, index1) in requestsLoaded" :key="index1">
              <BaseAvatar :profileImg="request.user.user_profile.profile_picture"
                :profile_id="request.user.user_profile.id" :title="request.user.name" :gender="request.user.gender"
                avatarClass="rounded-circle avatar-40" containerClass="flex-shrink-0" />
              <div class="flex-grow-1 ms-2">
                <router-link :to="{
                  name: 'user.profile',
                  params: { user_id: request.user.id },
                }">
                  <h6>{{ request.user.name }}</h6>
                  <small>{{ formatDateToWritten(request.created_at) }}</small>
                </router-link>
                <div class="d-flex align-items-center mt-2 mt-md-0">
                  <span role="button" class="btn btn-primary ms-2 mb-3" style="direction: rtl !important"
                    @click="acceptrequest(request.id)">
                    قبول
                  </span>
                  <span role="button" class="btn btn-secondary ms-2 mb-3" style="direction: rtl !important"
                    @click="deleterequest(request.user_id, request.friend_id)">
                    رفض
                  </span>
                </div>
              </div>
            </li>
            <li class="d-block text-center mb-0 pb-0" v-if="friendRequest.length > length">
              <a class="me-3 btn" role="button" @click="loadMore()">عرض المزيد</a>
            </li>
          </ul>
          <div class="col-sm-12" v-else>
            <iq-card class="iq-card">
              <div class="iq-card-body p-0">
                <div class="image-block text-center">
                  <img src="@/assets/images/main/no-friend-req.png" class="img-fluid rounded w-50" alt="blog-img" />
                </div>
                <h4 class="text-center mt-3 mb-3">لا يوجد طلبات صداقة</h4>
              </div>
            </iq-card>
          </div>
        </template>
      </iq-card>
    </div>
  </div>
</template>

<script>
import FriendServices from "@/API/services/friend.service";
import helper from "@/utilities/helper";

export default {
  name: "FriendRequest",
  async created() {
    this.friendRequest = await FriendServices.getFriendsRequests();
  },
  data() {
    return {
      friendRequest: [],
      length: 10,
    };
  },
  methods: {
    ...helper,
    /**
     * acceot friend request.
     *  @param  request id
     */
    acceptrequest(id) {
      FriendServices.accept(id)
        .then(async (response) => {
          helper.toggleToast(
            "تم قبول الطلب",
            "success"
          );
          this.friendRequest = await FriendServices.getFriendsRequests();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /**
     * delete friend request.
     *  @param  user id, friend id
     */
    deleterequest(user_id, friend_id) {
      FriendServices.delete(user_id, friend_id)
        .then(async (response) => {
          helper.toggleToast(
            "تم الحذف",
            "success"
          );
          this.friendRequest = await FriendServices.getFriendsRequests();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * load more request.
     */
    loadMore() {
      if (this.length > this.friendRequest.length) return;
      this.length = this.length + 10;
    },
    /**
     * accept All unaccepted request for auth user.
     */
    acceptAll() {
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
        .then((willDelete) => {
          if (willDelete.isConfirmed) {
            FriendServices.acceptAll()
              .then(async (response) => {
                helper.toggleToast(
                  "تم قبول جميع الطلبات",
                  "success"
                );
                this.friendRequest = await FriendServices.getFriendsRequests();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    /**
     * Delete All unaccepted request for auth user.
     */
    deleteAllUnAccepted() {
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
            FriendServices.deleteAllUnAccepted()
              .then(async (response) => {
                helper.toggleToast(
                  "تم حذف جميع الطلبات",
                  "success"
                );
                this.friendRequest = await FriendServices.getFriendsRequests();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

  },
  computed: {
    requestsLoaded() {
      return this.friendRequest.slice(0, this.length);
    },
  },
};
</script>
