<template>
    <div class="row">
        <div class="col-sm-12">
            <iq-card>
                <div class="iq-card-body profile-page p-0">
                    <div class="p-0 text-center">
                        <h3 class="text-center mt-3">
                            <strong> عنوان </strong>
                        </h3>
                        <video class="w-75" controls preload="metadata">
                            <source src="@/assets/videos/eligible_videos/general_informations.mp4#t=5.0" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="user-detail text-center mb-3">
                        <div class="profile-img">
                            <img src="@/assets/images/main/reader.png" alt="profile-img" class="avatar-130 img-fluid" />
                        </div>
                        <div class="profile-detail mt-1">
                            <br />
                            <h3 class="" v-if="book">{{ book.name }} - قسم التلخيص والفكرة العامة</h3>
                        </div>
                    </div>
                </div>
            </iq-card>
            <iq-card class="iq-card">
                <div class="iq-card-body p-0">
                    <div class="user-tabing">
                        <tab-nav :pills="true" id="pills-tab"
                            class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                            <tab-nav-items class="w-100 p-0" :active="true" id="pills-feed-tab" href="#theses_container"
                                ariaControls="pills-home" role="tab" :ariaSelected="true"
                                title="المرحلة الثانية - التلخيص والفكرة العامة" />
                        </tab-nav>
                    </div>
                </div>
            </iq-card>
        </div>
        <div class="col-sm-12">
            <div class="tab-content">
                <!-- START STAGE ONE -->
                <tab-content-item :active="true" id="theses_container" aria-labelled-by="pills-feed-tab">
                    <div class="iq-card-body p-0">
                        <div class="row">
                            <div class="col-lg-4">
                            </div>
                            <div class="col-12">
                                <div v-if="generalInformations">
                                    <div class="col-sm-12">
                                        <div class="card card-block card-stretch card-height">
                                            <div class="card-body">
                                                <div class="user-post-data">
                                                    <div class="d-flex justify-content-between">
                                                        <div class="w-100">
                                                            <div class="d-flex justify-content-between">
                                                                <div class="w-100">
                                                                    <p class="mb-0 text-primary"
                                                                        v-if="generalInformations.degree">التقييم || {{
                                                                            generalInformations.degree }}</p>
                                                                    <div class="alert alert-success w-100"
                                                                        v-if="generalInformations.reviews">
                                                                        {{ generalInformations.reviews }}
                                                                    </div>
                                                                </div>
                                                                <div class="card-post-toolbar text-end"
                                                                    v-if="generalInformations.status == null || generalInformations.status == 'retard'">
                                                                    <div class="dropdown-toggle" id="dropdownMenuButton"
                                                                        data-bs-toggle="dropdown" aria-expanded="false"
                                                                        role="button" @click="show = !show">
                                                                        <span class="material-symbols-outlined">
                                                                            edit_note
                                                                        </span>
                                                                    </div>
                                                                    <div :class="`dropdown-menu dropdown-menu-right ${show ? 'show' : ''}`"
                                                                        aria-labelledby="dropdownMenuButton" style="">
                                                                        <a class="dropdown-item d-flex align-items-center"
                                                                            @click="updateGeneralInformation(generalInformations.id)">
                                                                            <span
                                                                                class="material-symbols-outlined me-2 md-18">
                                                                                edit
                                                                            </span>
                                                                            تعديل
                                                                        </a>
                                                                        <a class="dropdown-item d-flex align-items-center"
                                                                            @click="deleteGeneralInformation(generalInformations.id)">
                                                                            <span
                                                                                class="material-symbols-outlined me-2 md-18">
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
                                                <div class="col-md-12 form-group">
                                                    <h4 class="form-label"> التلخيص العام</h4>
                                                    <p class="form-control-plaintext">{{ generalInformations.summary }}
                                                    </p>
                                                </div>
                                                <hr />
                                                <div class="col-md-12 form-group">
                                                    <div class="col-md-12 form-group">
                                                        <h4 class="form-label"> السؤال العام </h4>
                                                        <p class="form-control-plaintext">{{
                                                            generalInformations.general_question }}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <iq-card>
                                            <template v-slot:body>
                                                <button class="btn btn-primary d-block w-100 mb-3"
                                                    v-if="generalInformations.status == null || generalInformations.status == 'retard'"
                                                    @click="reviewGeneralInformation"> اعتماد
                                                </button>
                                                <button class="btn btn-success d-block w-100" @click="back()">
                                                    عودة لصفحة الانجاز
                                                </button>
                                            </template>
                                        </iq-card>

                                    </div>
                                </div>

                                <div v-else id="post-modal-data" class="iq-card">
                                    <div>
                                        <iq-card id="post-modal-data"
                                            body-class="iq-card iq-card-block iq-card-stretch iq-card-height">
                                            <template v-slot:headerTitle>
                                                <h4 class="card-title">إضافة التلخيص والفكرة العامة</h4>
                                            </template>
                                            <template v-slot:body>
                                                <div class="d-flex align-items-center">
                                                    <form @submit.prevent="submitGenralInformationsForm"
                                                        class="post-text ml-3 w-100 row">
                                                        <div class="form-group">
                                                            <label class="form-label" for="bookGeneralIdea">الفكرة
                                                                العامة</label>
                                                            <textarea v-model="v$.generalInfromationsform.summary.$model"
                                                                rows="5"
                                                                placeholder="... اكتب الملخص العام عدد حروفه بين 350 و 4800"
                                                                class="rounded form-control"
                                                                id="bookGeneralIdea"></textarea>
                                                            <small style="color:red;"
                                                                v-if="v$.generalInfromationsform.summary.$error">
                                                                لطفًا قم بكتابة تلخيص عدد حروفه بين 350 و 4800 خالي من
                                                                الرموز التعبيرية (emojis)
                                                            </small>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="form-label" for="bookGeneralQuestion">سؤال عام
                                                            </label>
                                                            <textarea
                                                                v-model="v$.generalInfromationsform.general_question.$model"
                                                                rows="5"
                                                                placeholder="...  اكتب هنا السؤال العام الذي يسعى هذا الكتاب لإجابته لا يزيد عدد حروفة عن 250"
                                                                class="rounded form-control"
                                                                id="bookGeneralQuestion"></textarea>
                                                            <small style="color:red;"
                                                                v-if="v$.generalInfromationsform.general_question.$error">
                                                                قم بكتابة سؤال عام لا يزيد عدد حروفة عن 250
                                                            </small>
                                                        </div>

                                                        <input type="submit" value="اضافة" href="javascript:void(0);"
                                                            class="btn btn-primary d-block mt-3 mb-3" />
                                                    </form>
                                                </div>
                                                <hr />
                                            </template>
                                        </iq-card>
                                        <iq-card>
                                            <template v-slot:body>
                                                <button class="btn btn-success d-block w-100" @click="back()">
                                                    عودة لصفحة الانجاز
                                                </button>
                                            </template>
                                        </iq-card>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </tab-content-item>
                <!-- END STAGE ONE -->
            </div>
        </div>
    </div>
</template>
<script>


import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import generalInformationsServices from '@/API/EligibleServices/generalInformationsServices'

export default {
    setup() {
        return { v$: useVuelidate() };
    },
    name: 'GeneralSummary',
    mounted() {
        this.getInformations();
    },
    validations() {
        return {
            generalInfromationsform: {
                general_question: {
                    required,
                    minLength: minLength(10),
                    maxLength: maxLength(500)
                },
                summary: {
                    required,
                    minLength: minLength(350),
                    maxLength: maxLength(4800)

                },
            },
        };
    },
    data() {
        return {
            auditable: false,
            book: null,
            generalInfromationsform: {
                general_question: '',
                summary: '',
                eligible_user_books_id: null,
            },
            generalInformations: [],
            show: false,
        }
    },
    methods: {
        removeEmojis(text) {
            var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            return text.replace(regex, '');
        },

        async submitGenralInformationsForm() {
            this.generalInfromationsform.general_question = this.removeEmojis(this.generalInfromationsform.general_question)
            this.generalInfromationsform.summary = this.removeEmojis(this.generalInfromationsform.summary)

            this.v$.$touch();
            if (!this.v$.generalInfromationsform.$invalid) {
                this.generalInformations = await generalInformationsServices.addGeneralInformations(this.generalInfromationsform);
                this.v$.generalInfromationsform.general_question.$reset();
                this.v$.generalInfromationsform.summary.$reset();

            }
        },
        async getInformations() {
            const response = await generalInformationsServices.getByBook(this.$route.params.id);
            this.generalInformations = response.general_informations
            this.generalInfromationsform.eligible_user_books_id = response.user_book.id;
            this.book = response.user_book.book;
            if (this.generalInformations && (this.generalInformations.status === "retard" || this.generalInformations.status === null)) {
                this.auditable = true;
            }
        },
        deleteGeneralInformation(id) {
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
                text: "موافقتك تعني حذف هذا السؤال ",
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
                        generalInformationsServices.deleteGeneralInformation(id)
                            .then(response => {
                                swalWithBootstrapButtons.fire({
                                    title: 'تم الحذف',
                                    text: 'تم حذف السؤال',
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
        updateGeneralInformation(id) {
            this.show = !this.show;
            this.$router.push({ path: `/general/update/${id}` })
        },
        async reviewGeneralInformation() {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg',
                    cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: 'هل أنت متأكد؟',
                text: "في حال الاعتماد لن يمكنك اضافة سؤال جديد أو التعديل على التلخيص الذي كتبته ",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم قم بالاعتماد',
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
                        generalInformationsServices.reviewGeneralInformation(this.generalInformations.eligible_user_books_id)
                            .then(response => {
                                swalWithBootstrapButtons.fire({
                                    title: 'تم الاعتماد',
                                    text: 'تم اعتماد طلبك',
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
        back() {
            this.$router.push({ name: `achievement.steps`, params: { id: this.$route.params.id } })
        },

    },
}
</script>