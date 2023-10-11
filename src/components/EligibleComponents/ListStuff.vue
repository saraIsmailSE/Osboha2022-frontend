<template>
    <div class="col-sm-12">
        <div class="card card-block card-stretch card-height">
            <div class="card-body">
                <div class="user-post-data">
                    <div class="d-flex justify-content-between">
                        <div class="w-100">
                            <div class="d-flex justify-content-between">
                                <div class="">
                                    <h5 class="mb-0 d-inline-block"> {{title}} {{number+1}}</h5>
                                    <p class="mb-0 text-primary" v-if="stuff.degree">التقييم || {{ stuff.degree }}</p>
                                </div>
                                <div class="card-post-toolbar" v-if="stuff.status == null">
                                    <div class="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown"
                                        aria-expanded="false" role="button" @click="show = !show">
                                        <span class="material-symbols-outlined">
                                            more_horiz
                                        </span>
                                    </div>
                                    <div :class="`dropdown-menu dropdown-menu-right ${show ? 'show' : ''}`"
                                        aria-labelledby="dropdownMenuButton" style="">
                                        <a class="dropdown-item d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#modals" @click="show = !show">
                                            <span class="material-symbols-outlined me-2 md-18">
                                                edit
                                            </span>
                                            Edit
                                        </a>
                                        <a class="dropdown-item d-flex align-items-center" @click="deleteThesis(stuff.id)">
                                            <span
                                                class="material-symbols-outlined me-2 md-18">
                                                delete
                                            </span>
                                            Delete
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <p>
                        {{ stuff.thesis_text }}
                        {{ stuff.stuff }}
                    </p>
                </div>
                <div class="user-post" v-if="stuff.photos">
                    <div class=" d-grid grid-rows-2 grid-flow-col gap-3">
                        <div class="row-span-2 row-span-md-1" v-for="image in stuff.photos" :key="image.id">
                            <img :src="resolve_img_url(image)" alt="post-image" class="img-fluid rounded w-100" />
                        </div>
                    </div>
                </div>
                <div class="user-post" v-if="stuff.qoutes">
                    <h5 class="mb-0 d-inline-block"> اقتباسات</h5>
                    <ul>
                        <li v-for="qoute in stuff.qoutes" :key="qoute.id" class="mt-3">

                            <p>
                                {{ qoute }}
                            </p>
                        </li>
                    </ul>
                </div>
                <modal id="modals" dialogClass="modal-fullscreen-sm-down" tabindex="-1" title="Create Post"
                    aria-labelledby="modalsLabel" aria-hidden="true">
                    <model-header>
                        <h5 class="modal-title" id="modalsLabel">تعديل الأطروحة</h5>
                        <a href="javascript:void(0);" class="lh-1" data-bs-dismiss="modal">
                            <span class="material-symbols-outlined">close</span>
                        </a>
                    </model-header>
                    <model-body>
                        <UpdateThesis :thesis='stuff' :book="book" :noOfthesis="number"/>
                    </model-body>
                </modal>

            </div>
        </div>
    </div>
</template>
<script>
import { socialvue } from '../../config/pluginInit'
import UpdateThesis from "../   thesis/UpdateThesis.vue";
import thesisServices from "@/API/EligibleServices/thesisServices";

export default {
    name: 'Liststuff',
    mounted() {
        socialvue.index()
    },
    components:{
        UpdateThesis,
    },
    props: {
        stuff: {
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
            show: false
        }
    },
    methods: {
        resolve_img_url: function (path) {
              const url = `https://www.eligible.osboha180.com/api/api/thesises/image?path=${image.path}`
              console.log(url)
         
            return url;
        },
        deleteThesis(id) {
            this.show = ! this.show;
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
