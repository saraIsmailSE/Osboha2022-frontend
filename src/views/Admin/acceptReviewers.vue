<template>
    <div class="row" v-if="users.length>0">
        <div class="col-sm-12" v-for="(item, index) in ReviewersRequests" :key="index">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">{{ item.title }}</h4>
                </template>
                <template v-slot:body>
                    <ul class="request-reviewers reviewers-inline m-0 p-0">
                        <li class="d-flex align-items-center  justify-content-between flex-wrap mt-3"
                            v-for="(user, index1) in users" :key="index1">
                            <div class="user-img img-fluid flex-shrink-0">
                                <img src="@/assets/images/user/user_profile.png" alt="story-img"
                                    class="rounded-circle avatar-40">
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h6>{{ user.name }} || {{ user.roles[0].name }}</h6>
                                <p class="mb-0">{{ user.email }}</p>

                            </div>
                            <div class="d-flex align-items-center mt-2 mt-md-0">
                                <div class="confirm-click-btn">
                                    <a href="#" class="me-3 btn btn-primary rounde d-flex align-items-center"
                                        data-extra-toggle="accept" data-closest-elem=".item"
                                        @click="acceptrequest(user.id)">
                                        <span class="material-symbols-outlined md-18 me-1">
                                            {{ item.iconName }}
                                        </span>
                                        {{ item.btn1 }}</a>
                                </div>
                                <a href="#" class="btn btn-secondary rounded" data-extra-toggle="delete"
                                    data-closest-elem=".item" @click="deleterequest(user.id)">{{ item.btn2 }}</a>
                            </div>
                        </li>
                    </ul>
                </template>
            </iq-card>
        </div>
    </div>
    <div class="row" v-else>
        <div class="col-sm-12">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">طلبات المراجعين والمدققين</h4>
                </template>
                <template v-slot:body>

            <h4>
                لا يوجد طلبات
            </h4>
            </template>
            </iq-card>
        </div>
    </div>
</template>
<script>
import { socialvue } from '../../config/pluginInit'
import userServices from '../../api/userServices'

export default {
    name: 'ReviewersRequests',
    mounted() {
        socialvue.index()
    },
    created() {
        userServices.getUnactiveReviwers()
            .then(response => {
                this.users = response.data.data
            })
            .catch(error => {
                   (error)
            })
    },

    data() {
        return {
            users: [],
            ReviewersRequests: [
                {
                    title: 'طلبات المراجعين والمدققين',
                    btn1: 'قبول',
                    btn2: 'رفض',
                },

            ]
        }
    },
    methods: {
        deleterequest(id) {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg',
                    cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'هل أنت متأكد؟',
                text: "موافقتك تعني حذف هذا المستخدم",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم قم بالحذف',
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
                        userServices.deleteUser(id)
                            .then(response => {
                                swalWithBootstrapButtons.fire({
                                    title: 'تم الحذف',
                                    text: 'تم حذف المستخدم',
                                    icon: 'success',
                                    showClass: {
                                        popup: 'animate__animated animate__zoomIn'
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__zoomOut'
                                    }
                                })
                                location.reload()
                            })
                            .catch(error => {
                                   (error)
                            })


                    }
                })
        },
        acceptrequest(id) {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg',
                    cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: 'هل أنت متأكد؟',
                text: "موافقتك تعني قبول هذا المستخدم",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم قم بالقبول',
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
                        userServices.acceptUser(id)
                            .then(response => {
                                swalWithBootstrapButtons.fire({
                                    title: 'تم القبول',
                                    text: 'تم قبول المستخدم',
                                    icon: 'success',
                                    showClass: {
                                        popup: 'animate__animated animate__zoomIn'
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__zoomOut'
                                    }
                                })
                                location.reload()
                            })
                            .catch(error => {
                                   (error)
                            })


                    }
                })
        }
    }
}
</script>
