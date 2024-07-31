<template>
    <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
            <form class="mt-2" @submit.prevent="onSubmit()">
                <div class="form-group">
                    <label for="reason">سبب التفريغ</label>
                    <select v-model="v$.dischargeForm.reason.$model" class="form-select" data-trigger name="reason"
                        id="reason">
                        <option value="" selected>اختر سبب التفريغ</option>
                        <option value="سحب مهام">سحب مهام</option>
                        <option value="أسباب ادارية" selected>أسباب ادارية</option>
                        <option value="انسحاب" selected>انسحاب</option>
                    </select>
                    <small style="color: red" v-if="v$.dischargeForm.reason.$error">سبب التفريغ مطلوب</small>
                </div>
                <div class="form-group">
                    <label for="current_to">المراقب الحالي إلى</label>
                    <select v-model="v$.dischargeForm.current_to.$model" class="form-select" data-trigger
                        name="current_to" id="current_to" @change="followupTeamTo()">
                        <option value="" selected>اختر الحالي إلى</option>
                        <option value="ambassador">سفير</option>
                        <option value="withdrawn">منسحب</option>
                        <option value="leader">قائد</option>
                    </select>
                    <small style="color: red" v-if="v$.dischargeForm.current_to.$error">هذا الاجراء مطلوب
                        مطلوب</small>
                </div>

                <!-- Handel FollowupTeam -->
                <div class="form-group"
                    v-if="dischargeForm.current_to == 'ambassador' || dischargeForm.current_to == 'withdrawn'">
                    <label for="current_to">فريق المتابعة</label>

                    <div class="mt-2 mb-3">
                        <input class="form-check-input me-2" type="radio" name="followup_team_to" value="discharge"
                            id="discharge_team"
                            @click="() => { dischargeForm.followup_team_to = 'discharge'; getAmbassadors() }" />
                        <label class="form-check-label" for="discharge_team">
                            تفريغ الفريق
                        </label>
                    </div>
                    <div class=" mt-2 mb-3">
                        <input class="form-check-input me-2" type="radio" name="followup_team_to" value="transfer"
                            id="transfer_team" @click="dischargeForm.followup_team_to = 'transfer'" />
                        <label class="form-check-label" for="transfer_team">
                            نقل الفريق
                        </label>
                    </div>

                    <div class="form-group" v-if="dischargeForm.followup_team_to == 'discharge'">
                        <h5>نقل السفراء</h5>
                        <transfer-ambassadors v-if="ambassadorsToMove.length > 0"
                            :selectedAmbassadors="ambassadorsToMove" @ambassadors_transferred="setGroupInfo" />
                    </div>

                    <div class="form-group" v-if="dischargeForm.followup_team_to == 'transfer'">
                        <h5>نقل فريق المتابعة</h5>
                        <transfer-followup-team />
                    </div>

                </div>



                <div class="form-group" v-if="dischargeForm.current_to != 'withdrawn'">
                    <!-- Current Supervior To Ambassador -->
                    <div class="form-group" v-if="dischargeForm.current_to == 'ambassador'">
                        <label for="leader_email">القائد الجديد</label>
                        <input v-model="v$.dischargeForm.leader_email.$model" type="email" class="form-control mb-0"
                            id="leader_email" placeholder="ادخل بريد القائد الجديد" />
                        <template v-if="v$.dischargeForm.leader_email.$error">
                            <small style="color: red" v-if="v$.dischargeForm.leader_email.required.$invalid">البريد
                                الالكتروني
                                للقائد الجديد
                                مطلوب</small>
                            <small style="color: red" v-if="v$.dischargeForm.leader_email.email.$invalid">البريد
                                الالكتروني
                                للقائد الجديد غير
                                صحيح</small>
                        </template>
                    </div>
                    <!-- Current Supervior To Leader -->
                    <div class="form-group" v-if="dischargeForm.current_to == 'leader'">
                        <label for="supervisor_email">المراقب الجديد</label>
                        <input v-model="v$.dischargeForm.supervisor_email.$model" type="email" class="form-control mb-0"
                            id="supervisor_email" placeholder="ادخل بريد المراقب الجديد" />
                        <template v-if="v$.dischargeForm.supervisor_email.$error">
                            <small style="color: red" v-if="v$.dischargeForm.supervisor_email.required.$invalid">البريد
                                الالكتروني
                                للمراقب الجديد
                                مطلوب</small>
                            <small style="color: red" v-if="v$.dischargeForm.leader_email.email.$invalid">البريد
                                الالكتروني
                                للمراقب الجديد غير
                                صحيح</small>
                        </template>
                    </div>
                </div>


                <div class="form-group">
                    <label for="note">ملاحظات</label>
                    <textarea type="text" v-model="v$.dischargeForm.note.$model" class="form-control mb-0" id="note"
                        placeholder="ملاحظات حول التفريغ " />
                    <small style="color: red" v-if="v$.dischargeForm.note.$error">ملاحظاتك مطلوبة مطلوب</small>
                </div>
                <p class="text-center my-2" style="color: red" v-if="message">
                    {{ message }}
                </p>
                <div class="col-sm-12 text-center" v-if="loading">
                    <p class="text-center">جاري التفريغ</p>
                    <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                </div>
                <div class="d-inline-block w-100" v-else>
                    <button type="submit" class="btn btn-primary float-end" :disabled="loading || !allowToDischarge">
                        تفريغ
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, requiredIf, email } from "@vuelidate/validators";
import TeamsDischargeService from "@/API/services/teams-discharge.service";
import TransferAmbassadors from '@/components/control/TransferAmbassadors';
import TransferFollowupTeam from '@/components/control/TransferFollowupTeam';


export default {
    name: "Discharge Supervising Group",
    setup() {
        return { v$: useVuelidate() };
    },
    components: { TransferAmbassadors, TransferFollowupTeam, },
    data() {
        return {
            dischargeForm: {
                group_id: this.$route.params.group_id,
                reason: '',
                current_to: "",
                note: "",
                leader_email: null,
                supervisor_email: null,
                followup_team_to: null,
            },
            ambassadorsToMove: [],
            message: "",
            loading: false,
        };
    },

    validations() {
        return {
            dischargeForm: {
                reason: {
                    required,
                },
                current_to: {
                    required,
                },
                note: {
                    required,
                },
                leader_email: {
                    required: requiredIf(function () {
                        if (this.dischargeForm.current_to == 'ambassador')
                            return true;
                        else
                            return false;
                    }),
                    email
                },
                supervisor_email: {
                    required: requiredIf(function () {
                        if (this.dischargeForm.current_to == 'leader')
                            return true;
                        else
                            return false;
                    }),
                    email

                },
            },
        };
    },
    methods: {
        async onSubmit() {
            this.v$.$touch();
            if (!this.v$.dischargeForm.$invalid) {
                this.loading = true;
                try {
                    const response = await TeamsDischargeService.discharge(this.dischargeForm);
                    this.message = response;
                    setTimeout(() => {
                        this.message = "";
                    }, 3000);
                    this.$emit('team-discharged')

                } catch (error) {
                    this.message = "حصل خطأ - لم يتم التفريغ!";
                    console.log(error);
                } finally {
                    this.loading = false;
                }
            }
        },
        followupTeamTo() {
            if (this.dischargeForm.current_to == 'leader') {
                this.dischargeForm.followup_team_to = null;
            }
        },
        getAmbassadors() {
            this.ambassadorsToMove = [
                {
                    ambassador_email: 'test_1@email.com'
                },
                {
                    ambassador_email: 'test_2@email.com',
                }
            ]

        },
    },
    computed: {
        allowToDischarge() {
            if (!this.dischargeForm.followup_team_to) {
                return true;
            }
            return false;
        }
    }
};
</script>