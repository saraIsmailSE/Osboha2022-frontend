<template>
    <div class="row">
        <div class="col-sm-12">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">طلبات الصداقة</h4>
                </template>
                <template v-slot:body>
                    <ul class="request-request request-inline m-0 p-0">
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
                                    <a href="#" class="me-3 btn btn-primary rounde d-flex align-items-center">
                                        <span class="material-symbols-outlined md-18 me-1">
                                            person_add
                                        </span>
                                        قبول
                                    </a>
                                    <a href="@/app/profile.html" class="me-3 btn btn-primary rounded request-btn"
                                        style="display: none;"></a>
                                </div>
                                <a href="#" class="btn btn-secondary rounded" data-extra-toggle="delete"
                                    data-closest-elem=".item" @click="deleterequest">حذف</a>
                            </div>
                        </li>
                        <li class="d-block text-center mb-0 pb-0" v-if="friendRequest.length > length">
                            <a class="me-3 btn" role="button" @click="loadMore()">عرض المزيد</a>
                        </li>
                    </ul>
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
        this.friendRequest = await FriendServices.getFriendsRequests(this.user_id);
        console.log(this.friendRequest)
    },
    data() {
        return {
            user_id: this.$route.params.user_id,
            friendRequest: [],
            length: 10,

        }
    },
    methods: {
        deleterequest() {
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
                showClass: {
                    popup: 'animate__animated animate__zoomIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__zoomOut'
                }
            })
                .then((willDelete) => {
                    if (willDelete.isConfirmed) {
                        FriendServices.deleteFriendshipById(this.user_id);
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
                    } else {
                        swalWithBootstrapButtons.fire({
                            title: 'Your Request is safe!',
                            showClass: {
                                popup: 'animate__animated animate__zoomIn'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__zoomOut'
                            }
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
  