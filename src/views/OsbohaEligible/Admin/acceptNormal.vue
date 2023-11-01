<template>
    <div class="row" v-if="users.length > 0">
        <div class="col-sm-12">
            <div class="card position-relative inner-page-bg bg-primary" style="height: 150px;">
                <div class="inner-page-title">
                    <h3 class="text-white">طلبات المستخدمين</h3>
                    <p class="text-white">عدد الطلبات {{ users.length }}</p>
                </div>
            </div>
        </div>

        <div class="col-lg-12" v-for="(user, index) in users" :key="index">
            <iq-card>
                <template v-slot:body>

                    <div class="card card-block card-stretch card-height blog-list">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-md-6 text-center">
                                    <div class="image-block">
                                        <img style="cursor:pointer;" :src="getOfficialDoc(user.id)"
                                            class="img-fluid rounded w-50" alt="blog-img" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="blog-description p-2 text-center">
                                        <h5 class="mb-2 text-center">{{ user.user_profile.first_name_ar }}
                                            {{ user.user_profile.middle_name_ar }} {{ user.user_profile.last_name_ar }}</h5>
                                        <button @click="acceptrequest(user.id)" type="submit"
                                            class="btn btn-primary d-block w-100">قبول </button>

                                        <button @click="setReject(index)" type="submit" v-if="!reject[index]"
                                            class="btn btn-danger d-block w-100 mt-3">رفض </button>

                                        <div class="col-md-12 mb-3 form-group mt-2" v-if="reject[index]">
                                            <label for="rejectNote" class="form-label">سبب الرفض *</label>
                                            <textarea name="rejectNote" class="form-control" id="rejectNote" rows="5"
                                                required="required" v-model=rejectNote></textarea>
                                            <small style="color: red" v-if="v$.rejectNote.$error">
                                                {{ 'سبب الرفض مطلوب' }}
                                            </small>
                                            <div class="d-inline-block w-100 text-center">
                                                <div class="col-sm-12 text-center" v-if="loader">
                                                    <img src="@/assets/images/gif/loader-3.gif" alt="loader"
                                                        style="height: 100px;">
                                                </div>
                                            </div>

                                            <button @click="deleterequest(user.id)" type="submit"
                                                class="btn btn-danger d-block w-100 mt-3">رفض </button>
                                        </div>

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
                    <h4 class="card-title">طلبات المستخدمين</h4>
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
import userServices from '@/API/services/user.service'
import profileImagesService from "@/API/services/profile.images.service";
import useVuelidate from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";

export default {
    name: 'acceptNormal',
    components: {},
    setup() {
        return { v$: useVuelidate() };
    },
    async created() {
        this.listUnAllowedToEligible()
    },

    data() {
        return {
            users: [],
            reject: [],
            rejectNote: '',
            loader: false,

        }
    },
    validations() {
        return {
            rejectNote: {
                required: requiredIf(function (nestedModel) {
                    return this.reject == true;
                }),
            },
        };
    },
    methods: {
        async listUnAllowedToEligible() {
            await userServices.listUnAllowedToEligible()
                .then(response => {
                    this.users = response
                })
                .catch(error => {
                })
            this.reject = new Array(this.users.length).fill(false)
        },
        setReject(index) {
            this.reject[index] = true;
        },
        deleterequest(id) {
            this.v$.$touch();
            if (!this.v$.rejectNote.$invalid) {
                this.loader = true;
                const swalWithBootstrapButtons = this.$swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary btn-lg',
                        cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'هل أنت متأكد؟',
                    text: "موافقتك تعني رفض هذا المستخدم",
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
                            userServices.deActiveUser(id, this.rejectNote)
                                .then(response => {
                                    swalWithBootstrapButtons.fire({
                                        title: 'تم الرفض',
                                        text: 'تم رفض المستخدم',
                                        icon: 'success',
                                        showClass: {
                                            popup: 'animate__animated animate__zoomIn'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__zoomOut'
                                        }
                                    })
                                    this.listUnAllowedToEligible()
                                })
                                .catch(error => {
                                    (error)
                                })


                        }
                    })
            }
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
                        userServices.acceptEligibleUser(id)
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
                                this.listUnAllowedToEligible()
                            })
                            .catch(error => {
                                (error)
                            })


                    }
                })
        },
        /**
         * get gOfficial Doc.
         *  @param  user id
         * @return image url
         */
        getOfficialDoc(user_id) {
            return profileImagesService.getOfficialDoc(user_id);
        },


    },

}
</script>