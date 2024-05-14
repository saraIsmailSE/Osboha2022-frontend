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
                <div class="form-group">
                    <label for="notes">ملاحظات</label>
                    <textarea type="text" v-model="v$.dischargeForm.notes.$model" class="form-control mb-0" id="notes"
                        placeholder="ملاحظات حول التفريغ " />
                    <small style="color: red" v-if="v$.dischargeForm.notes.$error">ملاحظاتك مطلوبة مطلوب</small>
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
import { required } from "@vuelidate/validators";
import GroupService from "@/API/services/group.service";


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
                notes: "",
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
                notes: {
                    required,
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
                    await GroupService.update(this.dischargeForm);
                    this.setGroup();
                    this.message = "تم التعديل";
                    setTimeout(() => {
                        this.message = "";
                    }, 1800);
                } catch (error) {
                    this.message = "حصل خطأ - لم يتم التعديل!";
                    //                    console.log(error.response.data);
                    console.log(error);
                } finally {
                    this.loading = false;
                }
            }
        },
    },
};
</script>