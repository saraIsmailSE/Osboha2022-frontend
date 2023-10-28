<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto">
                <h1 class="text-center mt-3 mb-3">تعيين مسؤول عنه</h1>
            </div>
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/assign-administrator.png" class="img-fluid rounded w-75"
                        alt="blog-img" />
                </div>
            </div>
            <div class="col-12 bg-white pt-2">
                <div class="sign-in-from">
                    <form class="mt-2" @submit.prevent="onSubmit()">
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
                        <div class="form-group">
                            <label for="head_user"> المسؤول عنه</label>
                            <input v-model="v$.form.head_user.$model" type="email" class="form-control mb-0" id="head_user"
                                placeholder="ادخل بريد المسؤول عنه" />
                            <template v-if="v$.form.head_user.$error">
                                <small style="color: red" v-if="v$.form.head_user.required.$invalid">
                                    البريد الالكتروني للمسؤول مطلوب</small>
                                <small style="color: red" v-if="v$.form.head_user.email.$invalid">
                                    البريد الالكتروني للمسؤول غير صحيح</small>
                            </template>
                        </div>

                        <div class="form-group text-center" v-if="message">
                            <small style="color: red">
                                {{ message }}
                            </small>
                        </div>
                        <div class="col-sm-12 text-center" v-if="loader">
                            <p class="text-center">جاري التعيين</p>
                            <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px" />
                        </div>
                        <div class="d-inline-block w-100" v-else>
                            <button type="submit" class="btn btn-primary float-end" :disabled="loader">
                                تعيين
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
import UserService from "@/API/services/user.service";

export default {
    name: "Assign To Parent",
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            loader: false,
            form: {
                user: "",
                head_user: "",
            },
            message: "",
        };
    },
    validations() {
        return {
            form: {
                user: { required, email },
                head_user: { required, email },
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
                    const response = await UserService.assignToParent(this.form);
                    this.message = response;

                    this.v$.form.$reset();
                    this.form = {
                        user: "",
                        head_user: "",
                    };

                    setTimeout(() => {
                        this.message = "";
                    }, 5000);
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
