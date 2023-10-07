<template>
    <div class="form-card text-start">
        <form>
            <div class="row setup-content" id="user-detail">
                <div class="col-sm-12" v-if="question.status">
                    <div class="col-md-12 p-0">
                        <h3 class="mb-0 d-inline-block"> السؤال {{ index + 1 }} </h3>
                        <div class="row">
                            <div class="col-6 form-group">
                                <label for="uname" class="form-label">صفحة البداية</label>
                                <label class="form-control-plaintext">{{ question.starting_page }}</label>
                            </div>
                            <div class="col-6 form-group">
                                <label for="emailid" class="form-label">صفحة النهاية</label>
                                <label class="form-control-plaintext">{{ question.ending_page }}</label>
                            </div>
                            <hr>

                            <div class="col-md-12 form-group">
                                <div class="col-md-12 form-group">
                                    <label for="emailid" class="form-label"> السؤال</label>
                                    <p class="form-control-plaintext">{{ question.question }}</p>
                                </div>
                                <div class="user-post">
                                    <div class="col-md-12 form-group">
                                        <label for="emailid" class="form-label"> الاقتباسات</label>
                                        <ul v-if="question.quotation.length > 0">
                                            <li v-for="qoute in question.quotation" :key="qoute.id" class="mt-3">
                                                <p>
                                                    {{ qoute.text }}
                                                </p>
                                            </li>
                                        </ul>
                                        <p v-else> لا يوجد اقتباسات</p>
                                    </div>
                                </div>
                                <div class="col-md-12 form-group">
                                </div>
                            </div>
                            <div v-if="reviewStage">

                                <div class="col-md-12 mb-3 form-group"
                                    v-if="(question.status == 'audit' && (role == 'auditor' || role == 'admin'))">
                                    <label for="address" class="form-label">ملاحظات المراجع *</label>
                                    <textarea name="address" class="form-control" id="address" rows="5" required="required"
                                        v-model="reviweNote"></textarea>
                                    <small style="color: red" v-if="v$.reviweNote.$error">
                                        {{ 'ملاحظاتك مطلوبة' }}
                                    </small>

                                </div>

                                <div v-if="(question.status == 'audit' && (role == 'auditor' || role == 'admin'))">
                                    <div class="row form-group">
                                        <label for="address" class="form-label"> * التقييم المناسب </label>
                                        <select class="form-select" data-trigger name="degree" id="degree" v-model="degree"
                                            @change="setDegree($event)">
                                            <option value="">اختر التقييم المناسب</option>
                                            <option value="96">امتياز</option>
                                            <option value="91">ممتاز</option>
                                            <option value="86">جيد جدًا</option>
                                            <option value="81">جيد </option>
                                            <option value="71">مقبول</option>
                                        </select>
                                        <small style="color: red" v-if="v$.degree.$error">
                                            {{ 'اختر التقييم المناسب' }}
                                        </small>
                                        <div class="form-check form-check-inline form-checkbox form-checkbox-color mt-4">
                                            <input type="checkbox" class="form-check-input" id="rule3" ref="rule3"
                                                :checked="rule1" @change="setRule3()">
                                            <label class="form-check-label" for="rule3">
                                                تم التحقق من تطابق الأفكار المكتوبة هنا
                                                مع أفكار الكتاب وذلك دليل قراءة القارئ للكتاب.</label>
                                        </div>

                                        <div class="col-md-3 form-group mt-3">
                                            <input type="button" value="إضافة" class="btn btn-primary d-block w-100 mt-3 "
                                                @click="addDegree(question.id)" :disabled='!rule3' />
                                        </div>
                                    </div>
                                </div>
                                <iq-card v-if="(question.status == 'review' && (role == 'reviewer' || role == 'admin'))">
                                    <template v-slot:headerTitle>
                                        <h4 class="card-title">عنوان</h4>
                                    </template>
                                    <template v-slot:body>
                                        <div>

                                            <!-- ACCEPT -->
                                            <input type="button" value="قبول" class="btn btn-primary d-block w-100 mt-3 "
                                                @click="accept(question.id)"
                                                v-if="(role == 'reviewer' || role == 'admin')" />
                                            <!-- END ACCEPT -->

                                            <!-- RETARD -->
                                            <input type="button" value="اعادة" class="btn btn-warning d-block mt-3 w-100"
                                                v-if="!retard" @click="setRetard()" />
                                            <div class="col-md-12 mb-3 form-group mt-2" v-if="retard">
                                                <label for="retardNote" class="form-label">سبب الاعادة *</label>
                                                <textarea name="retardNote" class="form-control" id="retardNote" rows="5"
                                                    v-model=retardNote></textarea>
                                                <small style="color: red" v-if="v$.retardNote.$error">
                                                    {{ 'سبب الاعادة مطلوب' }}
                                                </small>
                                                <div class="d-inline-block w-100 text-center">
                                                    <div class="col-sm-12 text-center" v-if="loader">
                                                        <img src="../../../assets/images/page-img/page-load-loader.gif"
                                                            alt="loader" style="height: 100px;">
                                                    </div>
                                                </div>
                                                <input type="button" value="اعادة"
                                                    class="btn btn-warning d-block mt-3 w-100"
                                                    @click="retardQuestion(question.id)" />
                                            </div>
                                            <!-- END RETARD -->
                                        </div>
                                    </template>
                                </iq-card>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12" v-if="question.status == 'review'">
                    <iq-card>
                        <template v-slot:headerTitle>
                            <h4 class="card-title">بحاجة لمراجعة</h4>
                        </template>
                        <template v-slot:body>
                            <TimeLine :items="[
                                {
                                    color: 'primary',
                                    title: `لا يوجد مراجع `,
                                    description: '',
                                    child: {
                                        type: 'img',
                                        items: [
                                        ]
                                    }
                                },

                            ]" />
                        </template>
                    </iq-card>
                </div>

                <div class="col-lg-12" v-if="question.status == 'retard'">
                    <iq-card>
                        <template v-slot:headerTitle>
                            <h4 class="card-title">تم الاعادة </h4>
                        </template>
                        <template v-slot:body>
                            <TimeLine :items="[
                                {
                                    color: 'primary',
                                    title: `بحاجة لتعديل ~ ${question.reviewer.name}`,
                                    description: question.reviews,
                                    child: {
                                        type: 'img',
                                        items: [
                                        ]
                                    }
                                },

                            ]" />
                        </template>
                    </iq-card>
                </div>
                <div class="col-lg-12" v-if="question.status == 'accept'">
                    <iq-card>
                        <template v-slot:headerTitle>
                            <h4 class="card-title">تم القبول </h4>
                        </template>
                        <template v-slot:body>
                            <TimeLine :items="[
                                {
                                    color: 'primary',
                                    title: 'مقبول',
                                    description: question.reviewer.name,
                                    child: {
                                        type: 'img',
                                        items: [
                                        ]
                                    }
                                },

                            ]" />
                        </template>
                    </iq-card>
                </div>
                <div class="col-lg-12" v-if="question.status == 'audite'">
                    <iq-card>
                        <template v-slot:headerTitle>
                            <h4 class="card-title">تم الاعتماد </h4>
                        </template>
                        <template v-slot:body>
                            <TimeLine :items="[
                                {
                                    color: 'primary',
                                    title: 'معتمد - قابل للتقييم',
                                    description: question.reviewer.name,
                                    child: {
                                        type: 'img',
                                        items: [
                                        ]
                                    }
                                },

                            ]" />
                        </template>
                    </iq-card>
                </div>
                <div class="col-lg-12" v-if="question.status == 'audited'">
                    <iq-card>
                        <template v-slot:headerTitle>
                            <h4 class="card-title">تم التقييم</h4>
                        </template>
                        <template v-slot:body>
                            <TimeLine :items="[
                                {
                                    color: 'primary',
                                    title: `تم التقييم ~ ${question.auditor.name}`,
                                    description: question.reviews,
                                    child: {
                                        type: 'img',
                                        items: [
                                        ]
                                    }
                                },
                                {
                                    color: 'primary',
                                    title: `تم المراجعة ~ ${question.reviewer.name}`,
                                    description: '',
                                    child: {
                                        type: 'img',
                                        items: [
                                        ]
                                    }
                                },

                            ]" />
                        </template>
                    </iq-card>
                </div>
                <div class="col-lg-12" v-if="question.status == 'rejected'">
                    <iq-card>
                        <template v-slot:headerTitle>
                            <h4 class="card-title">تم الرفض </h4>
                        </template>
                        <template v-slot:body>
                            <TimeLine :items="[
                                {
                                    color: 'primary',
                                    title: `مرفوض ~ ${question.reviewer.name} ${question.auditor.name}`,
                                    description: question.reviews,
                                    child: {
                                        type: 'img',
                                        items: [
                                        ]
                                    }
                                },

                            ]" />
                        </template>
                    </iq-card>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import questionServices from '../../../api/questionServices'
import UserInfo from '../../../services/userInfo.service'
import useVuelidate from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";

export default {
    name: 'question',
    created() {
        this.role = UserInfo.getRole()[0]
    },
    setup() {
        return { v$: useVuelidate() };
    },
    props: {
        question: {
            type: [Object],
            required: true,
        },
        userBook: {
            type: [Object],
            required: true,
        },
        index: {
            required: true
        },
        reviewStage: {
            required: true
        },

    },
    data() {
        return {
            role: '',
            reviweNote: '',
            mark: 0,
            degree: '',
            markCondition: true,
            retard: false,
            retardNote: '',
            loader: false,
            rule3: false,


        }
    },
    validations() {
        return {
            retardNote: {
                required: requiredIf(function (nestedModel) {
                    return this.retard == true;
                }),
            },
            reviweNote: {
                required
            }, degree: {
                required
            },

        };
    },
    methods: {

        changeTab(value) {
            this.$emit('onNext', value)
        },
        setRetard() {
            this.retard = true;
        },
        retardQuestion(id) {
            this.v$.$touch();
            if (!this.v$.retardNote.$invalid) {
                const swalWithBootstrapButtons = this.$swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary btn-lg',
                        cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                    },
                    buttonsStyling: false
                })
                swalWithBootstrapButtons.fire({
                    title: 'هل أنت متأكد؟',
                    text: "موافقتك تعني اعادة هذا السؤال  ",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'نعم قم بالاعادة',
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
                            this.loader = true
                            questionServices.rejectRetardThesis(id, this.retardNote, 'retard')
                                .then(response => {
                                    swalWithBootstrapButtons.fire({
                                        title: 'تمت الاعادة',
                                        text: 'تم اعادة السؤال',
                                        icon: 'success',
                                        showClass: {
                                            popup: 'animate__animated animate__zoomIn'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__zoomOut'
                                        }
                                    })
                                    this.loader = false
                                    this.retard = false
                                    //location.reload()
                                })
                                .catch(error => {
                                    console.log(error)
                                })

                        }
                    })
            }
        },
        setRule3() {
            this.rule3 = !this.rule3;
        },
        accept(id) {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg',
                    cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: 'هل أنت متأكد؟',
                text: "موافقتك تعني قبول هذا السؤال",
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
                        questionServices.acceptQuestion(id, 'accept')
                            .then(response => {
                                swalWithBootstrapButtons.fire({
                                    title: 'تم القبول',
                                    text: 'تم قبول السؤال',
                                    icon: 'success',
                                    showClass: {
                                        popup: 'animate__animated animate__zoomIn'
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__zoomOut'
                                    }
                                });
                                location.reload()
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                })
        },
        setDegree(e) {
            this.mark = e.target.value

        },
        addDegree(id) {
            this.v$.$touch();
            if (!this.v$.reviweNote.$invalid && !this.v$.degree.$invalid) {
                const swalWithBootstrapButtons = this.$swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary btn-lg',
                        cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                    },
                    buttonsStyling: false
                })
                swalWithBootstrapButtons.fire({
                    title: 'هل أنت متأكد؟',
                    text: "موافقتك تعني أن هذاالسؤال  تمت مراجعتها",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'تمت المراجعة  ',
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
                            questionServices.addDegree(id, this.reviweNote, this.mark)
                                .then(response => {
                                    swalWithBootstrapButtons.fire({
                                        title: 'تمت المراجعة',
                                        text: 'تم مراجعة السؤال',
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
            }
        }
    }
}
</script>
