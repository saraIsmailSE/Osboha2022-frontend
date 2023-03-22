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
                            <label for="exampleInputEmail1">الاسم</label>
                            <input type="text" v-model="v$.form.name.$model" class="form-control mb-0"
                                id="exampleInputEmail1" placeholder="ادخال الاسم هنا" />
                            <small style="color: red" v-if="v$.form.name.$error">الرجاء قم بادخال اسمك كما هو في المستند
                                الرسمي</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail2">الايميل</label>
                            <input v-model="v$.form.email.$model" type="email" class="form-control mb-0"
                                id="exampleInputEmail2" placeholder="ادخال الايميل هنا" />
                            <small style="color: red" v-if="v$.form.email.$error">الرجاء قم بادخال بريدك الاكتروني</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">كلمة المرور</label>
                            <input v-model="v$.form.password.$model" type="password" class="form-control mb-0"
                                id="exampleInputPassword1" placeholder="ادخال ارمز السري هنا" />
                            <small style="color: red" v-if="v$.form.password.$error">يجب ادخال كلمة مرور صالحة لا تقل عن 8
                                أحرف</small>
                        </div>

                        <div class="form-group">
                            <select class="form-select" data-trigger name="choices-single-default"
                                id="choices-single-default" v-model="v$.form.role.$model">
                                <option value="">التسجيل كـ</option>
                                <option value="reviewer">
                                    سفير </option>
                                <option value="auditor">
                                    قائد
                                </option>
                                <option value="auditor">
                                    مراقب
                                </option>
                                <option value="auditor">
                                    موجه
                                </option>
                            </select>
                            <small style="color:red;" v-if="v$.form.role.$error">الرجاء قم بادخال دورك</small>
                        </div>
                        <div class="form-group">
                            <select class="form-select" data-trigger name="choices-single-default"
                                id="choices-single-default" v-model="v$.form.role.$model">
                                <option value="">اختر فريقك</option>
                                <option value="reviewer">
                                    A </option>
                                <option value="auditor">
                                    B
                                </option>
                                <option value="auditor">
                                    C
                                </option>
                                <option value="auditor">
                                    D
                                </option>
                            </select>
                            <small style="color:red;" v-if="v$.form.role.$error">الرجاء قم بادخال دورك</small>
                        </div>
                        <div class="form-group" v-if="regError">
                            <small style="color: red">
                                {{ regError }}
                            </small>
                        </div>

                        <div class="d-inline-block w-100">
                            <button type="submit" class="btn btn-primary float-end">
                                انشاء حساب
                            </button>
                        </div>


                        <div class="sign-info">
                            <span class="dark-color d-inline-block line-height-2">
                                تملك حساب؟
                                <!-- <router-link :to="{ name: 'auth.sign-in1' }"> -->
                                    تسجيل الدخول
                                <!-- </router-link> -->
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
            options: {
                centeredSlides: false,
                loop: false,
                slidesPerView: 1,
                autoplay: {
                    delay: 3000,
                },
                spaceBetween: 15,
                pagination: {
                    el: ".swiper-pagination",
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },

                // And if we need scrollbar
                scrollbar: {
                    el: ".swiper-scrollbar",
                },
            },
            form: {
                name: "",
                password: "",
                email: "",
                role: "",
                fb_name: ''
            },
            regError: '',
        };
    },
    methods: {

        async onSubmit() {
            this.v$.$touch();
            if (!this.v$.form.$invalid) {

                this.loader = true;
                try {
                    await this.$store

                        .dispatch("registerAdmin", {
                            email: this.form.email,
                            password: this.form.password,
                            name: this.form.name,
                            role: this.form.role,
                            fb_name: this.form.fb_name
                        })

                    this.loader = false;
                    this.$router.push({ name: 'social.book' })
                }
                catch (error) {
                    this.loader = false;

                    if (error.response.data.data == 'User already exist') {
                        this.regError = ' البريد الالكتروني موجود مسبقاً، قم بتسجيل الدخول';
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
                }, fb_name: {
                    required,
                }, role: {
                    required
                }

            },
        };
    },
};
</script>
    
<style lang="scss" scoped>
h1,
h4,
p,
title,
form {
    direction: rtl;
}

.form-check {
    float: left;
}

a.float-end {
    margin-top: 10px;
}
</style>
    