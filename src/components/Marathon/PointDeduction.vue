<template>
    <div class="col-12 bg-white pt-2">
        <table class="table table-striped" style="margin-top: 1rem;"
            v-if="marathon_violations && marathon_violations.length > 0">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">نوع المخالفة</th>
                    <th scope="col">النقاط</th>
                    <th scope="col">الاسبوع</th>
                    <th scope="col">المراجع</th>
                    <th scope="col">ملاحظات</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user_violation, index) in marathon_violations" :key="user_violation.id">
                    <td>{{ index }}</td>
                    <td> {{ user_violation.reason.reason }}</td>
                    <td> {{ user_violation.reason.points }}</td>
                    <td> {{ user_violation.week.title }}</td>
                    <td> {{ user_violation.reviewer.name + " " + user_violation.reviewer.last_name }} </td>
                    <td> {{ user_violation.reviewer_note }}</td>
                    <td v-if="isMarathonAdministrator">
                        <span class="material-symbols-outlined align-middle" role="button"
                            @click="undoPointsDeduction(user_violation.id)">
                            undo
                        </span>
                    </td>

                </tr>
            </tbody>
        </table>

        <div class="sign-in-from">
            <form class="mt-2" @submit.prevent="onSubmit()" v-if="current_marathon">
                <div class="form-group">
                    <select class="form-select" data-trigger name="choices-single-default" id="choices-single-default"
                        v-model="deductionForm.reason_id" >
                        <option value="" selected>اختر نوع المخالفة ... </option>
                        <option v-for=" reason in deduction_reasons" :key="reason.id" :value="reason.id">
                            {{ reason.reason }} ( {{ reason.points }} )</option>
                    </select>
                    <small style="color: red" v-if="v$.deductionForm.reason_id.$error">يجب اختيار نوع المخالفة</small>
                </div>
                <div class="form-group" v-if="current_marathon.marathon_weeks && current_marathon.marathon_weeks.length > 0">
                    <select class="form-select" data-trigger name="choices-single-default" id="choices-single-default"
                        v-model="deductionForm.week_key">
                        <option value="" selected>الاسبوع ... </option>
                        <option v-for=" marathon_week in current_marathon.marathon_weeks" :key="marathon_week"
                            :value="marathon_week.week_key">
                            {{ marathon_week.week_title }}
                        </option>
                    </select>
                    <small style="color: red" v-if="v$.deductionForm.week_key.$error">يجب اختيار الاسبوع</small>
                </div>
                <div class="form-group col-12">
                    <label class="form-label" for="reviewer_note">ملاحظاتك</label>
                    <textarea v-model="v$.deductionForm.reviewer_note.$model" rows="5" placeholder="... اكتب ملاحظة"
                        class="rounded form-control" id="reviewer_note"></textarea>
                    <p class="text-end" style="direction: rtl">
                        <span> {{ v$.deductionForm.reviewer_note.$model.length }}/250 حرف</span>
                    </p>

                    <small style="color: red" v-if="v$.deductionForm.reviewer_note.$error">
                        * ملاحظاتك مطلوبة
                    </small>
                </div>



                <p class="text-center my-2" style="color: red" v-if="message">
                    {{ message }}
                </p>
                <div class="col-sm-12 text-center" v-if="loading">
                    <p class="text-center">جاري الخصم</p>
                    <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                </div>
                <div class="d-inline-block w-100" v-else>
                    <button type="submit" class="btn btn-danger float-end" :disabled="loading">
                        خصم
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import helper from "@/utilities/helper";
import MarathonPoints from "@/API/MarathonServices/marathon-points.service";
import OsbohaMarathon from "@/API/MarathonServices/osboha-marathon.service";
import UserInfoService from "@/Services/userInfoService";

export default {
    name: "Add Extra Points",
    setup() {
        return { v$: useVuelidate() };
    },
    async created() {
        this.deduction_reasons = await MarathonPoints.getDeductionReasons();
        this.marathon_violations = await MarathonPoints.getMarathonViolations(this.$route.params.user_id, this.$route.params.marathon_id);
    },
    props: {
        current_marathon: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            deduction_reasons: [],
            marathon_violations: null,
            deductionForm: {
                osboha_marthon_id: this.$route.params.marathon_id,
                user_id: this.$route.params.user_id,
                week_key: "",
                reason_id: '',
                reviewer_note: "",
            },
            message: "",
            loading: false,
        };
    },
    methods: {

        async onSubmit() {
            this.v$.$touch();
            if (!this.v$.deductionForm.$invalid) {
                this.loading = true;
                try {
                    const response = await MarathonPoints.pointsDeduction(this.deductionForm);
                    this.marathon_violations = response;
                    this.message = "تم الخصم";
                    this.v$.deductionForm.$reset();
                    this.deductionForm = {
                        osboha_marthon_id: this.$route.params.marathon_id,
                        user_id: this.$route.params.user_id,
                        week_key: '',
                        reason_id: '',
                        reviewer_note: "",
                    };

                    helper.toggleToast(
                        "تم الخصم",
                        "success",
                    );
                    this.$emit('points-deducted')

                } catch (error) {
                    this.message = "حصل خطأ - لم يتم الخصم!";
                    helper.toggleToast(
                        "حصل خطأ - لم يتم الخصم!",
                        "danger",
                    );

                    console.log(error.response.data);
                } finally {
                    this.loading = false;
                    setTimeout(() => {
                        this.message = "";
                    }, 3000);

                }
            }
        },
        async undoPointsDeduction(violation_id) {
            try {
                const response = await MarathonPoints.undoPointsDeduction(violation_id);
                this.marathon_violations = response;
                helper.toggleToast(
                    "تم التراجع",
                    "success",
                );
                this.$emit('points-deducted')

                setTimeout(() => {
                    this.message = "";
                }, 3000);
            } catch (error) {
                this.message = "حصل خطأ - لم يتم التراجع!";
                helper.toggleToast(
                    "حصل خطأ - لم يتم التراجع!",
                    "danger",
                );

                console.log(error.response.data);
            }

        },


    },
    validations() {
        return {
            deductionForm: {
                week_key: {
                    required,
                },
                reason_id: {
                    required,
                },
                reviewer_note: {
                    required,
                    minLength: minLength(10),
                    maxLength: maxLength(250),
                }
            },
        };
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        isMarathonAdministrator() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "marathon_coordinator",
                'marathon_verification_supervisor',
            ]);
        },
    },
};
</script>