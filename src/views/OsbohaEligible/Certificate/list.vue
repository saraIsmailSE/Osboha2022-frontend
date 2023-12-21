<template>
    <div class="row" v-if="certificates.length>0">
        <div class="col-lg-12" v-for="certificate in certificates" :key="certificate.id">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">عرض الشهادات</h4>
                </template>
                <template v-slot:body>

                    <div class="card card-block card-stretch card-height blog-list">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-md-6 text-center">
                                    <div class="image-block">
                                        <img src="@/assets/images/main/registration-review.png" class="img-fluid rounded w-50"
                                            alt="blog-img" >
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="blog-description p-2 text-center">
                                        <h3 class="mb-2 text-center">اسم المستخدم</h3>
                                        <h3 class="mb-2 text-center">الكتاب  </h3>
                                        <button @click="acceptCertificate(1)" type="submit"
                                            class="btn btn-primary d-block w-100">قبول </button>
                                            <button @click="deleteCertificate(1)" type="submit"
                                            class="btn btn-primary d-block w-100 mt-3">رفض </button>
                                            <button @click="acceptCertificate(1)" type="submit"
                                            class="btn btn-primary d-block w-100 mt-3">عرض </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </iq-card>
        </div>
    </div>
    <div class="row" v-else>
        <div class="col-sm-12">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title"> عرض الشهادات</h4>
                </template>
                <template v-slot:body>

                    <h4>
                        لا يوجد شهادات
                    </h4>
                </template>
            </iq-card>
        </div>
    </div>

</template>
<script>
import { socialvue } from '../../config/pluginInit'
import userServices from '@/API/EligibleServices/userServices'

export default {
    name: 'listCertificate',
    components: {},
    mounted() {
        socialvue.index()
    },
    created() {
    },

    data() {
        return {
            certificates: [1],
        }
    },
    methods: {
        deleteCertificate(id) {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg',
                    cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: 'هل أنت متأكد؟',
                text: "موافقتك تعني رفض هذه الشهادة",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم قم بالرفض',
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
                                    title: 'تم الرفض',
                                    text: 'تم رفض الشهادة ',
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
        acceptCertificate(id) {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg',
                    cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: 'هل أنت متأكد؟',
                text: "موافقتك تعني قبول هذه الشهادة",
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
                                    text: 'تم قبول الشهادة',
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

    }
}
</script>