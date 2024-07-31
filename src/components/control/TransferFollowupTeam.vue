<template>

    <div class="sign-in-from">
        <form class="mt-2" @submit.prevent="onSubmit()">

            <div class="form-group">
                <label for="leader_email">القائد الجديد</label>
                <input v-model="v$.form.leader_email.$model" type="email" class="form-control mb-0" id="leader_email"
                    placeholder="ادخل بريد القائد الجديد" />
                <template v-if="v$.form.leader_email.$error">
                    <small style="color: red" v-if="v$.form.leader_email.required.$invalid">البريد الالكتروني
                        للقائد الجديد
                        مطلوب</small>
                    <small style="color: red" v-if="v$.form.leader_email.email.$invalid">البريد الالكتروني
                        للقائد الجديد غير
                        صحيح</small>
                </template>
            </div>
            <div class="form-group">
                <label for="supervisor_email">المراقب الجديد</label>
                <input v-model="v$.form.supervisor_email.$model" type="email" class="form-control mb-0"
                    id="supervisor_email" placeholder="ادخل بريد المراقب الجديد" />
                <template v-if="v$.form.supervisor_email.$error">
                    <small style="color: red" v-if="v$.form.supervisor_email.required.$invalid">البريد الالكتروني
                        للقائد الجديد
                        مطلوب</small>
                    <small style="color: red" v-if="v$.form.supervisor_email.email.$invalid">البريد الالكتروني
                        للقائد الجديد غير
                        صحيح</small>
                </template>
            </div>

            <div class="form-group text-center" v-if="message">
                <small style="color: red">
                    {{ message }}
                </small>
            </div>


            <div class="col-sm-12 text-center" v-if="loader">
                <p class="text-center">جاري التعيين</p>
                <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
            </div>
            <div class="d-inline-block w-100" v-else>
                <button type="submit" class="btn btn-primary float-end" :disabled="loader">
                    تعيين
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import RolesService from "@/API/services/roles.service";

export default {
    name: "Transfer Followup Team",
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            loader: false,
            form: {
                supervisor_email: '',
                leader_email: '',
            },
            message: "",
            not_exists: [],

        };
    },
    validations() {
        return {
            form: {
                leader_email: { required, email },
                supervisor_email: { required, email },
            },
        };
    },
    methods: {


        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {
                    this.message = "";
                    const response = await RolesService.transferAmbassador(this.form);
                    this.not_exists = response.not_exists;
                    this.message = response.message;

                    this.resetForm();

                    setTimeout(() => {
                        this.message = "";
                    }, 3000);

                    this.$emit('team_transferred')

                } catch (error) {
                    this.message = "حدث خطأ, يرجى المحاولة لاحقاً";
                } finally {
                    this.loader = false;
                }
            }
        },

        resetForm() {
            this.v$.form.$reset();
            this.form = {
                ambassador_email: "",
                leader_email: "",
            };

        },
    },
};
</script>