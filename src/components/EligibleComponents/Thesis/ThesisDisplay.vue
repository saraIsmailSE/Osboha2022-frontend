<template>
    <div class="col-sm-12">
        <div class="card card-block card-stretch card-height">
            <div class="card-body">
                <div class="user-post-data">
                    <div class="d-flex justify-content-between">
                        <div class="w-100">
                            <div class="d-flex justify-content-between">
                                <div class="w-100 text-start">
                                    <h5 class="mb-0 d-inline-block"> {{ title }} {{ number + 1 }}</h5>
                                    <p class="mb-0 text-primary" v-if="thesis.degree">التقييم || {{ thesis.degree }}</p>
                                    <div class="alert alert-success w-100 mt-2" v-if="thesis.reviews">
                                        {{ thesis.reviews }}
                                    </div>
                                </div>
                                <div class="card-post-toolbar" v-if="thesis.status == null || thesis.status == 'retard'">
                                    <div class="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown"
                                        aria-expanded="false" role="button" @click="show = !show">
                                        <span class="material-symbols-outlined">
                                            edit_note
                                        </span>
                                    </div>
                                    <div :class="`dropdown-menu dropdown-menu-right ${show ? 'show' : ''}`"
                                        aria-labelledby="dropdownMenuButton" style="">
                                        <a class="dropdown-item d-flex align-items-center" @click="UpdateThesis(thesis.id)">
                                            <span class="material-symbols-outlined me-2 md-18">
                                                edit
                                            </span>
                                            تعديل
                                        </a>
                                        <a class="dropdown-item d-flex align-items-center" @click="deleteThesis(thesis.id)">
                                            <span class="material-symbols-outlined me-2 md-18">
                                                delete
                                            </span>
                                            حذف
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-6 form-group">
                        <label class="form-label">صفحة البداية</label>
                        <label class="form-control-plaintext">{{ thesis.starting_page }}</label>
                    </div>
                    <div class="col-6 form-group">
                        <label class="form-label">صفحة النهاية</label>
                        <label class="form-control-plaintext">{{ thesis.ending_page }}</label>
                    </div>
                </div>

                <div class="mt-3">
                    <p>
                        {{ thesis.thesis_text }}
                    </p>
                </div>
                <div class="user-post" v-if="thesis.photos">
                    <div class=" d-grid grid-rows-2 grid-flow-col gap-3">
                        <div class="row-span-2 row-span-md-1 text-center" v-for="image in thesis.photos" :key="image.id">
                            <img style="cursor:pointer;" @click="openPhoto(image)" :src="resolve_img_url(image)"
                                alt="post-image" class="img-fluid rounded w-50" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
<script>
import thesisServices from "@/API/EligibleServices/thesisServices";

export default {
    name: 'ThesisDisplay',
    components: {
    },
    props: {
        thesis: {
            type: [Object],
            required: true,
        },
        number: {
            type: [Number],
            required: true,
        },
        title: {
            type: [String],
            required: true,
        },
        book: {
            type: [Object],
            required: true,
        },

    },

    data() {
        return {
            show: false,

        }
    },
    methods: {
        resolve_img_url: function (image) {
            const url = `https://www.eligible.osboha180.com/api/api/thesises/image?path=${image.path}`
 
            return url;
        },
        deleteThesis(id) {
            this.show = !this.show;
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg',
                    cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'هل أنت متأكد؟',
                text: "موافقتك تعني حذف هذه الأطروحة ",
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
                        thesisServices.deleteThesis(id)
                            .then(response => {
                                swalWithBootstrapButtons.fire({
                                    title: 'تم الحذف',
                                    text: 'تم حذف الأطروحة',
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
        UpdateThesis(id) {
            this.show = !this.show;
            this.$router.push({ path: `/thesis-review/update/${id}` })
 
        },openPhoto(image){
              const url = `https://www.eligible.osboha180.com/api/api/thesises/image?path=${image.path}`
 
            window.open(url, '_blank')
        }

    },
}
</script>

<style>
.dropdown-item {
    color: #212529 !important;
}

.dropdown-menu .dropdown-item:focus,
.dropdown-menu .dropdown-item:hover {
    background: transparent;
    color: var(--iq-primary) !important;
}
</style>
