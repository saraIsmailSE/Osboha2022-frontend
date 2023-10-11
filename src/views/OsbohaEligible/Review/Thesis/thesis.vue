<template>
    <div class="form-card text-start">
        <form>
            <div class="row setup-content" id="user-detail">
                <div class="col-sm-12" v-if="thesis.status">
                    <div class="col-md-12 p-0">
                        <h3 class="mb-0 d-inline-block"> الأطروحة {{ index + 1 }} </h3>
                        <div class="row">
                            <div class="col-6 form-group">
                                <label for="uname" class="form-label">صفحة البداية</label>
                                <label class="form-control-plaintext">{{ thesis.starting_page }}</label>
                            </div>
                            <div class="col-6 form-group">
                                <label for="emailid" class="form-label">صفحة النهاية</label>
                                <label class="form-control-plaintext">{{ thesis.ending_page }}</label>
                            </div>
                            <hr>

                            <div class="col-md-12 form-group">
                                <div class="col-md-12 form-group">
                                    <label for="emailid" class="form-label"> الاطروحة</label>
                                    <p class="form-control-plaintext">{{ thesis.thesis_text }}</p>
                                </div>
                            </div>
                            <div v-if="reviewStage">
                                <div class="col-md-12 mb-3 form-group"
                                    v-if="(thesis.status == 'audit' && (role == 'auditor' || role == 'admin'))">
                                    <label for="address" class="form-label">* ملاحظات المراجع </label>
                                    <textarea name="address" class="form-control" id="address" rows="5" required="required"
                                        v-model="reviweNote"></textarea>
                                    <small style="color: red" v-if="v$.reviweNote.$error">
                                        {{ 'ملاحظاتك مطلوبة' }}
                                    </small>

                                </div>

                                <div v-if="(thesis.status == 'audit' && (role == 'auditor' || role == 'admin'))">
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
                                                @click="addDegree(thesis.id)" :disabled='!rule3' />
                                        </div>
                                    </div>

                                </div>
                                <iq-card v-if="(thesis.status == 'review' && (role == 'reviewer' || role == 'admin'))">
                                    <template v-slot:headerTitle>
                                    </template>
                                    <template v-slot:body>
                                        <div>
                                            <div
                                                class="form-check form-check-inline form-checkbox form-checkbox-color me-2">
                                                <input type="checkbox" class="form-check-input" id="rule1" ref="rule1"
                                                    :checked="rule1" @change="setRule1()">
                                                <label class="form-check-label" for="rule1">تم التحقق أن الأطروحة حصرية
                                                    لكاتبها.</label>
                                            </div>
                                            <!-- <div
                                            class="form-check form-check-inline form-checkbox form-checkbox-color me-2">
                                            <input type="checkbox" class="form-check-input" id="rule2" ref="rule2"
                                                :checked="rule2" @change="setRule2()">
                                            <label class="form-check-label" for="rule2">تم التأكد من وجود الأطروحة في
                                                مجموعة سفراء أصبوحة.</label>
                                        </div> -->

                                            <!-- ACCEPT -->
                                            <input type="button" value="قبول" class="btn btn-primary d-block w-100 mt-3 "
                                                @click="accept(thesis.id)" v-if="(role == 'reviewer' || role == 'admin')"
                                                :disabled='!isAcceptable' />
                                            <!-- END ACCEPT -->

                                            <!-- RETARD -->
                                            <input type="button" value="اعادة" class="btn btn-warning d-block mt-3 w-100"
                                                v-if="!retard" @click="setRetard()" :disabled='isAcceptable' />
                                            <div class="col-md-12 mb-3 form-group mt-2" v-if="retard">
                                                <label for="retardNote" class="form-label">سبب الاعادة *</label>
                                                <textarea name="retardNote" class="form-control" id="retardNote" rows="5"
                                                    v-model=retardNote></textarea>
                                                <small style="color: red" v-if="v$.retardNote.$error">
                                                    {{ 'سبب الاعادة مطلوب' }}
                                                </small>
                                                <div class="d-inline-block w-100 text-center">
                                                    <div class="col-sm-12 text-center" v-if="loader">
                                                        <img src="@/assets/images/gif/loader-3.gif"
                                                            alt="loader" style="height: 100px;">
                                                    </div>
                                                </div>

                                                <input type="button" value="اعادة"
                                                    class="btn btn-warning d-block mt-3 w-100"
                                                    @click="retardThesis(thesis.id)" :disabled='isAcceptable' />
                                            </div>
                                            <!-- END RETARD -->


                                        </div>
                                    </template>
                                </iq-card>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12" v-if="thesis.status == 'review'">
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
                <div class="col-lg-12" v-if="thesis.status == 'retard'">
                    <iq-card>
                        <template v-slot:headerTitle>
                            <h4 class="card-title">تم الاعادة </h4>
                        </template>
                        <template v-slot:body>
                            <TimeLine :items="[
                                {
                                    color: 'primary',
                                    title: `بحاجة لتعديل ~ ${thesis.reviewer.name}`,
                                    description: thesis.reviews,
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
                <div class="col-lg-12" v-if="thesis.status == 'accept'">
                    <iq-card>
                        <template v-slot:headerTitle>
                            <h4 class="card-title">تم القبول </h4>
                        </template>
                        <template v-slot:body>
                            <TimeLine :items="[
                                {
                                    color: 'primary',
                                    title: 'مقبول',
                                    description: thesis.reviewer.name,
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
                <div class="col-lg-12" v-if="thesis.status == 'audite'">
                    <iq-card>
                        <template v-slot:headerTitle>
                            <h4 class="card-title">تم الاعتماد </h4>
                        </template>
                        <template v-slot:body>
                            <TimeLine :items="[
                                {
                                    color: 'primary',
                                    title: 'معتمد - قابل للتقييم',
                                    description: thesis.reviewer.name,
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
                <div class="col-lg-12" v-if="thesis.status == 'audited'">
                    <iq-card>
                        <template v-slot:headerTitle>
                            <h4 class="card-title">تم التقييم</h4>
                        </template>
                        <template v-slot:body>
                            <TimeLine :items="[
                                {
                                    color: 'primary',
                                    title: `تم التقييم ~ ${thesis.auditor.name}`,
                                    description: thesis.reviews,
                                    child: {
                                        type: 'img',
                                        items: [
                                        ]
                                    }
                                },
                                {
                                    color: 'primary',
                                    title: `تم المراجعة ~ ${thesis.reviewer.name}`,
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
                <div class="col-lg-12" v-if="thesis.status == 'rejected'">
                    <iq-card>
                        <template v-slot:headerTitle>
                            <h4 class="card-title">تم الرفض </h4>
                        </template>
                        <template v-slot:body>
                            <TimeLine :items="[
                                {
                                    color: 'primary',
                                    title: `مرفوض ~ ${thesis.reviewer.name} ${thesis.auditor.name}`,
                                    description: thesis.reviews,
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
import UserInfo from '@/Services/userInfoService'
import thesisServices from '@/API/EligibleServices/thesisServices'
import useVuelidate from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import helper from "@/utilities/helper";

export default {
    name: 'Thesis',
    created() {
        this.role = UserInfo.getRole()[0]
    },
    setup() {
        return { v$: useVuelidate() };
    },
    props: {
        thesis: {
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
            retard: false,
            retardNote: '',
            reviweNote: '',
            mark: 0,
            degree: '',
            markCondition: true,
            isAcceptable: false,
            rule1: false,
            rule2: true,
            rule3: false,
            loader: false,

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
            },
            degree: {
                required
            },
        };
    },
    methods: {
        setRule1() {
            this.rule1 = !this.rule1;
            this.checkAcceptable()
        },
        setRule2() {
            this.rule2 = !this.rule2;
            this.checkAcceptable()
        },
        setRule3() {
            this.rule3 = !this.rule3;
        },
        checkAcceptable() {
            if (this.rule1 && this.rule2)
                this.isAcceptable = true
            else
                this.isAcceptable = false
        },
        changeTab(value) {
            this.$emit('onNext', value)
        },
        setDegree(e) {
            this.mark = e.target.value

        },
        addDegree(id) {
            this.v$.$touch();
            if (!this.v$.reviweNote.$invalid && !this.v$.degree.$invalid && this.rule3) {
                const swalWithBootstrapButtons = this.$swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary btn-lg',
                        cancelButton: 'btn btn-outline-primary btn-lg ms-2'
                    },
                    buttonsStyling: false
                })
                swalWithBootstrapButtons.fire({
                    title: 'هل أنت متأكد؟',
                    text: "موافقتك تعني أن هذه الأطروحة تمت مراجعتها",
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
                            thesisServices.addDegree(id, this.reviweNote, this.degree)
                                .then(response => {
                                    this.$emit('status-updated');
                                    helper.toggleToast(`تمت مراجعة الأطروحة`, "success");
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        }
                    })
            }
        },
        setRetard() {
            this.retard = true;
        },
        retardThesis(id) {
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
                    text: "موافقتك تعني اعادة هذه الأطروحة ",
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
                            thesisServices.rejectRetardThesis(id, this.retardNote, 'retard')
                                .then(response => {
                                    this.loader = false
                                    this.$emit('status-updated');
                                    helper.toggleToast(`تمت اعادة الأطروحة`, "success");
                                })
                                .catch(error => {
                                    console.log(error)
                                })

                        }
                    })
            }
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
                text: "موافقتك تعني قبول هذه الأطروحة",
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
                        thesisServices.acceptThesis(id, 'accept')
                            .then(response => {
                                this.$emit('status-updated');
                                helper.toggleToast(`تمت قبول الأطروحة`, "success");
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
