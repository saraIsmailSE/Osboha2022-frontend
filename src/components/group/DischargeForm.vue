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
                    <label for="current_to">القائد الحالي إلى</label>
                    <select v-model="v$.dischargeForm.current_to.$model" class="form-select" data-trigger
                        name="current_to" id="current_to">
                        <option value="" selected>اختر الحالي إلى</option>
                        <option value="ambassador">سفير</option>
                        <option value="withdrawn">منسحب</option>
                    </select>
                    <small style="color: red" v-if="v$.dischargeForm.current_to.$error">هذا الاجراء مطلوب
                        مطلوب</small>
                </div>
                <div class="form-group" v-if="dischargeForm.current_to == 'ambassador'">
                    <label for="leader_email">القائد الجديد</label>
                    <input v-model="v$.dischargeForm.leader_email.$model" type="email" class="form-control mb-0"
                        id="leader_email" placeholder="ادخل بريد القائد الجديد" />
                    <template v-if="v$.dischargeForm.leader_email.$error">
                        <small style="color: red" v-if="v$.dischargeForm.leader_email.required.$invalid">البريد
                            الالكتروني
                            للقائد الجديد
                            مطلوب</small>
                        <small style="color: red" v-if="v$.dischargeForm.leader_email.email.$invalid">البريد الالكتروني
                            للقائد الجديد غير
                            صحيح</small>
                    </template>
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
                    <button type="submit" class="btn btn-primary float-end" :disabled="loading">
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


export default {
    name: "Discharge Group",
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            dischargeForm: {
                group_id: this.$route.params.group_id,
                reason: '',
                current_to: "",
                note: "",
                leader_email: null,
            },
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
    },
};
</script>