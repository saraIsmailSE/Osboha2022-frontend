<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar text-center align-items-center mx-auto">
                <h1 class="text-center mt-3">نقل سفير</h1>
                <h4 class="text-center mt-1 mb-3">إلى فريق متابعة جديدة</h4>
            </div>
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/transfer-ambassador.png" class="img-fluid rounded w-75" alt="blog-img" />
                </div>
            </div>

            <div class="col-12 bg-white pt-2">

                <div class="sign-in-from">
                    <form class="mt-2" @submit.prevent="onSubmit()">
                        <div class="form-group">

                            <label for="ambassador_email">السفير المراد نقله</label>
                            <input v-model="v$.form.ambassador_email.$model" type="email" class="form-control mb-0"
                                id="ambassador_email" placeholder="ادخل بريد السفير السفير" />
                            <template v-if="v$.form.ambassador_email.$error">
                                <small style="color: red" v-if="v$.form.ambassador_email.required.$invalid">البريد
                                    الالكتروني
                                    للسفير
                                    مطلوب</small>
                                <small style="color: red" v-if="v$.form.ambassador_email.email.$invalid">البريد الالكتروني
                                    للسفير غير
                                    صحيح</small>
                            </template>
                        </div>

                        <div class="form-group">
                            <label for="leader_email">القائد الجديد</label>
                            <input v-model="v$.form.leader_email.$model" type="email" class="form-control mb-0"
                                id="leader_email" placeholder="ادخل بريد القائد الجديد" />
                            <template v-if="v$.form.leader_email.$error">
                                <small style="color: red" v-if="v$.form.leader_email.required.$invalid">البريد الالكتروني
                                    للقائد الجديد
                                    مطلوب</small>
                                <small style="color: red" v-if="v$.form.leader_email.email.$invalid">البريد الالكتروني
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
                            <p class="text-center">جاري النقل</p>
                            <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px" />
                        </div>
                        <div class="d-inline-block w-100" v-else>
                            <button type="submit" class="btn btn-primary float-end" :disabled="loader">
                                نقل
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </iq-card>
    </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import RolesService from "@/API/services/roles.service";

export default {
    name: "Assign Administrator",
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            loader: false,
            form: {
                ambassador_email: "",
                leader_email: '',
            },
            message: "",

        };
    },
    validations() {
        return {
            form: {
                ambassador_email: { required, email },
                leader_email: { required, email },
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

                    this.message = response;

                    this.resetForm();

                    setTimeout(() => {
                        this.message = "";
                    }, 1800);
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
