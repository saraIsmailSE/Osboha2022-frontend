<template>
    <div class="row" v-if="certificates.length > 0">
        <div class="col-lg-12">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">طلبات الشهادات</h4>
                </template>
                <template v-slot:body>
                    <div class="d-grid gap-3 d-grid-template-1fr-19">
                        <div class="card mb-0" v-for="certificate in certificates" :key="certificate.id">
                            <div class="row align-items-center">

                                <div class="col-12">
                                    <div class="blog-description p-2 text-center">
                                        <div class="image-block text-center">
                                            <img src="@/assets/images/main/finished.png" class="img-fluid rounded w-50"
                                                alt="blog-img">
                                        </div>

                                        <h4 class="mb-2 text-center" style="direction: inherit;"> اسم السفير:
                                            {{ certificate.user.user_profile.first_name_ar }}
                                            {{ certificate.user.user_profile.middle_name_ar }}
                                            {{ certificate.user.user_profile.last_name_ar }}
                                        </h4>
                                        <h4 class="mb-2 text-center" style="direction: inherit;">اسم الكتاب:{{
                                            certificate.book.name }}</h4>
                                        <h4 class="mb-2 text-center" style="direction: inherit;">رقم التوثيق:{{
                                            certificate.id }}</h4>
                                        <span role="button"
                                            class="  btn-primary material-symbols-outlined fs-3 p-1 me-2"
                                            @click="acceptCertificate(certificate.id)">
                                            verified
                                        </span>
                                        <span role="button" class="  btn-danger material-symbols-outlined fs-3 p-1 me-2"
                                            @click="rejectCertificate(certificate.id)">
                                            dangerous
                                        </span>
                                        <!-- <span role="button" class="  btn-warning material-symbols-outlined fs-3 p-1 me-2">
                                            swipe_left
                                        </span> -->
                                        <span role="button" class=" btn-light material-symbols-outlined fs-3 p-1 me-2"
                                            @click="listCertificate(certificate.id)">
                                            visibility
                                        </span>
                                        <router-link role="button" target='_blank'
                                            class=" btn-info material-symbols-outlined fs-3 p-1 me-2"
                                            :to="{ name: 'chat.index', query: { user_id: certificate.user.id } }">
                                            forum
                                        </router-link>

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
                    <h4 class="card-title">طلبات الشهادات</h4>
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
import userBookServices from '@/API/EligibleServices/userBookServices'
import certificateServices from '@/API/EligibleServices/certificateServices'

export default {
    name: 'acceptCertificates',
    components: {},
    created() {
        this.getCertificates()
    },

    data() {
        return {
            certificates: [],
        }
    },
    methods: {
        getCertificates() {
            userBookServices.getByStatus('audited')
                .then(response => {
                    this.certificates = response
                })
                .catch(error => {

                })
        },
        listCertificate(id) {
            window.open(`https://platform.osboha180.com/backend/public/api/v1/eligible-certificates/generate-pdf/${id}`, '_blank');
        },
        rejectCertificate(id) {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg',
                    cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'هل أنت متأكد؟',
                text: "موافقتك تعني رفض",
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
                        userBookServices.changeStatus("rejected", id)
                            .then(response => {
                                swalWithBootstrapButtons.fire({
                                    title: 'تم الرفض',
                                    text: 'تم رفض التوثيق',
                                    icon: 'success',
                                    showClass: {
                                        popup: 'animate__animated animate__zoomIn'
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__zoomOut'
                                    }
                                })
                                this.getCertificates()
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
                text: "موافقتك تعني قبول هذا التوثيق وانشاء شهادة له",
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
                        certificateServices.createCertificate(id)
                            .then(response => {
                                swalWithBootstrapButtons.fire({
                                    title: 'تم القبول',
                                    text: 'تم قبول التوثيق وانشاء الشهادة',
                                    icon: 'success',
                                    showClass: {
                                        popup: 'animate__animated animate__zoomIn'
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__zoomOut'
                                    }
                                })
                                this.getCertificates()
                            })
                            .catch(error => {
                                console.log(error)
                            })


                    }
                })
        },
    }
}
</script>
<style scoped>
.material-symbols-outlined {
    border-radius: 5px;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}
</style>