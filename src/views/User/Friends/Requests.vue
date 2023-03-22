<template>
    <div class="row">
        <div class="col-sm-12">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">طلبات الصداقة</h4>
                </template>
                <template v-slot:body>
                    <ul class="request-request request-inline m-0 p-0" v-if="requestsLoaded.length > 0">
                        <li class="d-flex align-items-center  justify-content-between flex-wrap"
                            v-for="(request, index1) in requestsLoaded" :key="index1">
                            <div class="user-img img-fluid flex-shrink-0">
                                <img src="@/assets/images/user/12.jpg" alt="story-img" class="rounded-circle avatar-40">
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <router-link :to="{ name: 'user.profile', params: { user_id: request.id } }">
                                    <h6>{{ request.name }}</h6>
                                </router-link>
                            </div>
                            <div class="d-flex align-items-center mt-2 mt-md-0">
                                <div class="confirm-click-btn">
                                    <a role="button" class="me-3 btn btn-primary rounde d-flex align-items-center" @click="acceptrequest(request.pivot)">
                                        <span class="material-symbols-outlined md-18 me-1">
                                            person_add
                                        </span>
                                        قبول
                                    </a>
                                    <a href="@/app/profile.html" class="me-3 btn btn-primary rounded request-btn"
                                        style="display: none;"></a>
                                </div>
                                <a role="button" class="btn btn-secondary rounded" data-extra-toggle="delete"
                                    data-closest-elem=".item" @click="deleterequest(request.pivot)">حذف</a>
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
                                <img src="@/assets/images/main/no-friend-req.png" class="img-fluid rounded w-50"
                                    alt="blog-img">
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
import FriendServices from '@/API/services/friend.service'

export default {
    name: 'FriendRequest',
    async created() {
        this.friendRequest = await FriendServices.getFriendsRequests();
    },
    data() {
        return {
            friendRequest: [],
            length: 10,

        }
    },
    methods: {
        acceptrequest(pivot) {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg',
                    cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'هل أنت متأكد؟',
                text: "لا يمكنك التراجع عن هذا الاجراء",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم، قم بالقبول',
                cancelButtonText: 'تراجع  ',
                showClass: {
                    popup: 'animate__animated animate__zoomIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__zoomOut'
                }
            })
                .then((willDelete) => {
                    if (willDelete.isConfirmed) {
                        FriendServices.accept(pivot)
                            .then(response => {
                                swalWithBootstrapButtons.fire({
                                    title: 'تم القبول',
                                    text: 'تم قبول طلب الصداقة',
                                    icon: 'success',
                                    showClass: {
                                        popup: 'animate__animated animate__zoomIn'
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__zoomOut'
                                    }
                                })
                                setTimeout(function () {
                                    location.reload(true);
                                }, 2000);
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                })
        },
        deleterequest(pivot) {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg',
                    cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'هل أنت متأكد؟',
                text: "لا يمكنك التراجع عن هذا الاجراء",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم، قم بالحذف',
                cancelButtonText: 'تراجع  ',
                showClass: {
                    popup: 'animate__animated animate__zoomIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__zoomOut'
                }
            })
                .then((willDelete) => {
                    if (willDelete.isConfirmed) {
                        FriendServices.delete(pivot)
                            .then(response => {
                                swalWithBootstrapButtons.fire({
                                    title: 'تم الحذف',
                                    text: 'تم حذف طلب الصداقة',
                                    icon: 'success',
                                    showClass: {
                                        popup: 'animate__animated animate__zoomIn'
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__zoomOut'
                                    }
                                })
                                setTimeout(function () {
                                    location.reload(true);
                                }, 2000);
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                })
        },
        loadMore() {
            if (this.length > this.friendRequest.length) return;
            this.length = this.length + 10;
        },
    },
    computed: {
        requestsLoaded() {
            return this.friendRequest.slice(0, this.length);
        },
    },

}
</script>
  