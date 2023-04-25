<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto">
                <h1 class="text-center mt-3 mb-3">
                    حساب جديد
                </h1>
            </div>
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/reader.png" class="img-fluid rounded w-25" alt="blog-img">
                </div>
            </div>
            <div class="col-12 bg-white pt-2">
                <div class="sign-in-from">
                    <h1 class="mb-0">انشاء حساب</h1>
                    <form class="mt-2" @submit.prevent="onSubmit()">
                        <div class="form-group">
                            <label for="name">الاسم</label>
                            <input type="text" v-model="v$.form.name.$model" class="form-control mb-0" id="name"
                                placeholder="ادخل الاسم هنا" />
                            <small style="color: red" v-if="v$.form.name.$error">
                                الاسم مطلوب
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="email">الايميل</label>
                            <input v-model="v$.form.email.$model" type="email" class="form-control mb-0" id="email"
                                placeholder="ادخل الايميل هنا" />
                            <small style="color: red" v-if="v$.form.email.$error">البريد الالكتروني غير صحيح</small>
                        </div>

                        <div class="form-group">
                            <label for="gender">الجنس</label>
                            <select v-model="v$.form.gender.$model" class="form-select" data-trigger name="gender"
                                id="gender">
                                <option value='' selected>اختر الجنس </option>
                                <option value="male">
                                    ذكر
                                </option>
                                <option value="female">
                                    انثى
                                </option>
                            </select>
                            <small style="color: red" v-if="v$.form.gender.$error">اختر جنسك</small>

                        </div>

                        <div class="form-group">
                            <label for="password">كلمة المرور</label>
                            <input v-model="v$.form.password.$model" type="password" class="form-control mb-0" id="password"
                                placeholder="ادخل الرمز السري هنا" />
                            <small style="color: red" v-if="v$.form.password.$error">يجب ادخل كلمة مرور صالحة لا تقل عن 8
                                أحرف</small>
                        </div>


                        <div class="form-group" v-if="regError">
                            <small style="color: red">
                                {{ regError }}
                            </small>
                        </div>
                        <div class="col-sm-12 text-center" v-if="loader">
                            <p class="text-center">يتم تجهيز حسابك</p>
                            <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;" />
                        </div>

                        <div class="d-inline-block w-100">
                            <button type="submit" class="btn btn-primary float-end" :disabled="loader">
                                انشاء حساب
                            </button>
                        </div>


                        <div class="sign-info">
                            <span class="dark-color d-inline-block line-height-2">
                                تملك حساب؟
                                <router-link :to="{ name: 'auth.sign-in' }">
                                    تسجيل الدخول
                                </router-link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </iq-card>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, requiredIf } from "@vuelidate/validators";

export default {
    name: "SignUp",
    setup() {
        return { v$: useVuelidate() };
    },

    data() {
        return {
            loader: false,
            form: {
                name: "",
                password: "",
                email: "",
                gender: ''

            },
            regError: '',
        };
    },
    methods: {

        async onSubmit() {
            this.v$.$touch();
            if (!this.v$.form.$invalid) {
                try {

                    this.loader = true;
                    this.regError='';
                    await this.$store
                        .dispatch("register", {
                            email: this.form.email,
                            password: this.form.password,
                            name: this.form.name,
                            gender: this.form.gender,
                        })

                    this.loader = false;
                    this.$router.push({ name: 'osboha' })
                }
                catch (error) {
                    this.loader = false;
                    if (error.response.data.data.email && (error.response.data.data.email == 'The email has already been taken.')) {
                        this.regError = ' البريد الالكتروني موجود مسبقاً، قم بتسجيل الدخول';
                    }
                    else {
                        console.log(error)
                    }
                }
            }
        },
    },
    validations() {
        return {
            form: {
                email: {
                    required,
                    email,
                },
                password: {
                    required,
                    min: minLength(8),
                },
                name: {
                    required,
                },
                gender: {
                    required
                },
            },
        };
    },
};
</script>
    
