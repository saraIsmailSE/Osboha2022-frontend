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

                                        <h4 class="mb-2 text-center" style="direction: inherit;"> اسم السفير: {{ certificate.user.name }}</h4>
                                        <h4 class="mb-2 text-center" style="direction: inherit;">اسم الكتاب:{{ certificate.book.name }}</h4>
                                        <h4 class="mb-2 text-center" style="direction: inherit;">رقم التوثيق:{{ certificate.id }}</h4>
                                        <button @click="acceptrequest(certificate.id)" type="submit"
                                            class="btn btn-primary d-block w-100">قبول </button>

                                        <button @click="deleterequest(certificate.id)" type="submit"
                                            class="btn btn-primary d-block w-100 mt-3">رفض </button>

                                        <button @click="listCertificate(certificate.id)"
                                            type="submit" class="btn btn-primary d-block w-100 mt-3">عرض الشهادة
                                        </button>
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
import { socialvue } from '@/config/pluginInit'
import userBookServices from '@/API/EligibleServices/userBookServices'
import certificateServices from '@/API/EligibleServices/certificateServices'

export default {
    name: 'acceptCertificates',
    components: {},
    mounted() {
        socialvue.index()
    },
    created() {
        userBookServices.getByStatus('audited')
            .then(response => {
                this.certificates = response
            })
            .catch(error => {

            })
    },

    data() {
        return {
            certificates: [],
        }
    },
    methods: {
        listCertificate(id){
            window.open(`https://www.eligible.osboha180.com/api/api/certificates/generate-pdf/${id}`, '_blank');
        },
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
                text: "موافقتك تعني قبول هذا التوثيق",
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
                                location.reload()
                            })
                            .catch(error => {
                                console.log(error)
                            })


                    }
                })
        },
        resolve_img_url: function (image) {

            const url = `https://www.eligible.osboha180.com/api/api/certificates/image?path=${image}`

            return url;
        },

    }
}
</script>