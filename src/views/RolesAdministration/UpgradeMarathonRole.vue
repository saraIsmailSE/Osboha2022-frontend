<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto">
                <h1 class="text-center mt-3 mb-3">ترقية</h1>
            </div>
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/marathon.png" class="img-fluid rounded w-75" alt="blog-img" />
                </div>
            </div>
            <div class="col-12 bg-white pt-2">
                <div class="sign-in-from">
                    <form class="mt-2" @submit.prevent="onSubmit()">
                        <div class="form-group">
                            <label for="role">الترقية</label>
                            <select v-model="v$.form.role_id.$model" class="form-select" data-trigger name="role" id="role">
                                <option value="0" selected>ترقية إلى</option>
                                <option v-for="(role, index) in roles" :key="index" :value="role.id">
                                    {{ ARABIC_ROLES[role.name] }}
                                </option>
                            </select>
                            <small style="color: red" v-if="v$.form.role_id.$error">
                                يرجى اختيار نوع الترقية
                            </small>
                        </div>

                        <div class="form-group">
                            <label for="user">المستخدم</label>
                            <input v-model="v$.form.user.$model" type="email" class="form-control mb-0" id="user"
                                placeholder="ادخل بريد المستخدم" />
                            <template v-if="v$.form.user.$error">
                                <small style="color: red" v-if="v$.form.user.required.$invalid">البريد الالكتروني للمستخدم
                                    مطلوب</small>
                                <small style="color: red" v-if="v$.form.user.email.$invalid">البريد الالكتروني للمستخدم غير
                                    صحيح</small>
                            </template>
                        </div>
                        <div class="form-group text-center" v-if="message">
                            <small :style="{
                                color: messageVariant === 'success' ? 'green' : 'red',
                            }">
                                {{ message }}
                            </small>
                        </div>
                        <div class="col-sm-12 text-center" v-if="loader">
                            <p class="text-center">جاري الترقية</p>
                            <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                        </div>
                        <div class="d-inline-block w-100" v-else>
                            <button type="submit" class="btn btn-primary float-end" :disabled="loader">
                                ترقية
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
import { required, email, maxLength } from "@vuelidate/validators";
import { ARABIC_ROLES } from "@/utilities/constants";

import rolesService from "@/API/services/roles.service";
const greaterThanZero = (value) => value > 0;

export default {
    name: "Upgrade Marathon Role",
    setup() {
        return { v$: useVuelidate() };
    },
    async created() {
        this.roles= await rolesService.getMarathonRoles();
    },
    data() {
        return {
            loader: false,
            ARABIC_ROLES,
            form: {
                user: "",
                role_id: 0,
            },
            roles: [],
            message: "",
            messageVariant: "",
        };
    },
    validations() {
        return {
            form: {
                user: { required, email },
                role_id: {
                    required,
                    maxValue: greaterThanZero,
                },
            },
        };
    },
    watch: {
        message: function (val) {
            if (val) {
                setTimeout(
                    () => {
                        this.message = "";
                    },
                    this.messageVariant === "success" ? 2000 : 5000,
                );
            }
        },
    },
    methods: {
        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {
                    this.message = "";
                    const response = await rolesService.assignRoleV2(this.form);
                    this.message = response;
                    this.messageVariant = "success";

                    this.v$.form.$reset();
                    this.form = {
                        user: "",
                        role_id: 0,
                    };
                } catch (error) {
                    console.log(error.response.data);
                    if (error?.response?.data?.data) {
                        this.message = error.response.data.data;
                    } else {
                        this.message = "حدث خطأ, يرجى المحاولة لاحقاً";
                    }
                    this.messageVariant = "danger";
                } finally {
                    this.loader = false;
                }
            }
        },
    },
};
</script>