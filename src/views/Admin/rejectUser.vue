<template>
    <div class="col-sm-12 mt-3 text-center">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                <h3 class="text-center mt-3 mb-3">
                    رفض مستخدم
                </h3>
            </div>
            <div class="iq-card-body p-3">
                <div class="image-block text-center">
                    <!-- //  DISPLAY USER IMAGE -->
                    <img src="@/assets/images/update-forms.png" class="img-fluid rounded w-50" alt="blog-img">
                </div>

                <div class="d-flex align-items-center mt-3">
                    <form @submit.prevent="rejectUser" class="post-text ml-3 w-100 row">
                        <div class="col-md-12 mb-3 form-group mt-2">
                            <label for="rejectNote" class="form-label">سبب الرفض *</label>
                            <textarea name="rejectNote" class="form-control" id="rejectNote" rows="5"
                                required="required" v-model=rejectNote></textarea>
                            <small style="color: red" v-if="v$.rejectNote.$error">
                                {{ 'سبب الرفض مطلوب' }}
                            </small>
                        </div>

                        <hr>
                        <div class="col-sm-12 text-center" v-if="loader">
                            <img src="../../assets/images/page-img/page-load-loader.gif" alt="loader"
                                style="height: 100px;">
                        </div>
                        <h4 class="text-center mt-3 mb-3" v-if="message"> {{ message }}</h4>
                        <button @click="deleterequest(user.id)" type="submit" class="btn btn-danger d-block w-100 mt-3">
                                رفض 
                        </button>
                    </form>

                </div>
                <div class="d-flex align-items-center mt-3 row">
                    <div class="d-inline-block w-100 text-center col-12">
                        <button type="" @click="back()" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                            تراجع
                        </button>

                    </div>
                </div>
            </div>
        </iq-card>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
export default {
    name: "RejectUser",
    async created() {
    // get user info

    },
    components: {
    },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            loader: false,
            message: null,
            rejectNote: '',
            user:null,
        };
    },
    validations() {
        return {
            rejectNote: {
                required,
        
            },
        };
    },
    methods: {

        async rejectUser() {
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
                                    location.reload()
                                })
                                .catch(error => {
                                    (error)
                                })


                        }
                    })
            }
            this.loader = false;
            this.message = "تم التعديل بنجاح"

        },
        back() {
            this.$router.push({ name: 'achievement.general_summary', params: { id: this.generalInfortmationToUpdate.user_book.book.id } })

        }
    },
};
</script>
