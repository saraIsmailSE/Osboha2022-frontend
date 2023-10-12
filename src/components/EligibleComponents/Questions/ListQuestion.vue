<template>
    <div class="col-sm-12">
        <div class="card card-block card-stretch card-height">
            <div class="card-body">
                <div class="user-post-data">
                    <div class="d-flex justify-content-between">
                        <div class="w-100">
                            <div class="d-flex justify-content-between">
                                <div class="w-100 text-start">
                                    <h5 class="mb-0 d-inline-block"> السؤال {{index + 1}} </h5>
                                    <p class="mb-0 text-primary" v-if="question.degree">التقييم || {{ question.degree }}
                                    </p>
                                    <div class="alert alert-success w-100 mt-2" v-if="question.reviews">
                                        {{ question.reviews }}
                                    </div>
                                </div>
                                <div class="card-post-toolbar"
                                    v-if="question.status == null || question.status == 'retard'">
                                    <div class="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown"
                                        aria-expanded="false" role="button" @click="show = !show">
                                        <span class="material-symbols-outlined">
                                            edit_note
                                        </span>
                                    </div>
                                    <div :class="`dropdown-menu dropdown-menu-right ${show ? 'show' : ''}`"
                                        aria-labelledby="dropdownMenuButton" style="">
                                        <a class="dropdown-item d-flex align-items-center"
                                            @click="UpdateQuestion(question.id)">
                                            <span class="material-symbols-outlined me-2 md-18">
                                                edit
                                            </span>
                                            تعديل
                                        </a>
                                        <a class="dropdown-item d-flex align-items-center"
                                            @click="deleteQuestion(question.id)">
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
                        <label for="uname" class="form-label">صفحة البداية</label>
                        <label class="form-control-plaintext">{{ question.starting_page }}</label>
                    </div>
                    <div class="col-6 form-group">
                        <label for="emailid" class="form-label">صفحة النهاية</label>
                        <label class="form-control-plaintext">{{ question.ending_page }}</label>
                    </div>
                </div>

                <div class="mt-3">
                    <p>
                        {{ question.question }}
                    </p>
                </div>
                <div class="col-md-12 form-group">
                    <div class="col-md-12 form-group  text-start">
                        <label for="emailid" class="form-label"> إجابة السؤال</label>
                        <ul>
                            <li v-for="qoute in question.quotation" :key="qoute.id" class="mt-3">
                                <p>
                                    {{ qoute.text }}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import questionServices from "@/API/EligibleServices/questionServices";
export default {
    name: 'ListQuestion',
    components: {
    },
    props: {
        question: {
            type: [Object],
            required: true,
        },
        index: {
            required: true
        },
        book: {
            type: [Object],
            required: true,
        },
        user_book: {
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
        deleteQuestion(id) {
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
                text: "موافقتك تعني حذف هذه السؤال ",
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
                        questionServices.deleteQuestion(id)
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
        UpdateQuestion(id) {
            this.show = !this.show;
            this.$router.push({ path: `/questions/update/${id}` })
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
    