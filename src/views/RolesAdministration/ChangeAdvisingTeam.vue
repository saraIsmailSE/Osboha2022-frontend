<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto">
                <h1 class="text-center mt-3 mb-3">نقل فريق رقابي</h1>
            </div>
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/change-advising-team.png" class="img-fluid rounded w-75" alt="blog-img" />
                </div>
            </div>
            <div class="col-12 bg-white pt-2">
                <div class="sign-in-from">
                    <form class="mt-2" @submit.prevent="onSubmit()">
                        <div class="form-group">
                            <label for="supervisor">المراقب</label>
                            <input v-model="v$.form.supervisor.$model" type="email" class="form-control mb-0" id="supervisor"
                                placeholder="ادخل بريد المراقب" />
                            <template v-if="v$.form.supervisor.$error">
                                <small style="color: red" v-if="v$.form.supervisor.required.$invalid">البريد الالكتروني للمراقب
                                    مطلوب</small>
                                <small style="color: red" v-if="v$.form.supervisor.email.$invalid">البريد الالكتروني للمراقب غير
                                    صحيح</small>
                            </template>
                        </div>
                        <div class="form-group">
                            <label for="new_advisor"> الموجه المسؤول عنه</label>
                            <input v-model="v$.form.new_advisor.$model" type="email" class="form-control mb-0" id="new_advisor"
                                placeholder="ادخل بريد الموجه المسؤول عنه" />
                            <template v-if="v$.form.new_advisor.$error">
                                <small style="color: red" v-if="v$.form.new_advisor.required.$invalid">
                                    البريد الالكتروني للموجه مطلوب</small>
                                <small style="color: red" v-if="v$.form.new_advisor.email.$invalid">
                                    البريد الالكتروني للموجه غير صحيح</small>
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

import rolesService from "@/API/services/roles.service";

export default {
    name: "Change Advising Team",
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            loader: false,
            form: {
                supervisor: "",
                new_advisor: "",
            },
            message: "",
        };
    },
    validations() {
        return {
            form: {
                supervisor: { required, email },
                new_advisor: { required, email },
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
                    const response = await rolesService.ChangeAdvisingTeam(this.form);
                    this.message = response;

                    // this.v$.form.$reset();
                    // this.form = {
                    //     supervisor: "",
                    //     new_advisor: "",
                    //     role_id: 0,
                    // };

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
    },
};
</script>
