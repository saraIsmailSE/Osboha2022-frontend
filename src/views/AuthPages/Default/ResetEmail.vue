<template>
    <div class="col-sm-12 mt-3 text-center">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                <h4 class="text-center mt-3 mb-3">
                    اعادة تعيين البريد الالكتروني
                </h4>
            </div>
            <div class="iq-card-body p-0">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/no-friend-req.png" class="img-fluid rounded w-25" alt="blog-img">
                </div>
                <form class="mt-4" @submit.prevent="resetEmail">
                    <div class="form-group">
                        <label class="form-label" for="email">ادخل بريدك الالكتروني الجديد</label>
                        <input type="email" class="form-control mb-0 w-75 mx-auto" id="email"
                            placeholder="  ادخل بريدك الالكتروني " v-model="v$.form.email.$model">
                        <p class="p-2 text-center" style="color:red" v-if="v$.form.email.$error">قم بادخال بريدك الالكتروني</p>
                    </div>
                    <div class="col-sm-12 text-center" v-if="loader">
                        <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;">
                    </div>
                    <h4 class="text-center mt-3 mb-3" v-if="message"> {{ message }}</h4>
                    <div class="d-inline-block w-100 text-center">
                        <button type="submit" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                            تعيين
                        </button>
                    </div>
                </form>
            </div>
            <a href="javascript:void(0);" class="d-flex align-items-center m-3" @click="logout">
            <i class="material-symbols-outlined">logout</i>
            <span class="mobile-text d-lg-none ms-3">تسجيل خروج</span>
        </a>
        </iq-card>

    </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import Auth from '@/API/services/auth.service'

export default {
    name: "resetEmail",
    setup() {
        return { v$: useVuelidate() }
    },
    components: {},
    data() {
        return {
            loader: false,
            message: '',
            form: {
                email: '',
            },
            error: '',
            submitStatus: null,
        }
    },

    methods: {
        async resetEmail() {
            this.v$.$touch()
            if (!this.v$.form.$invalid) {
                this.message = "";
                this.loader = true;
                const response = await Auth.resetEmail(this.form.email)
                console.log(response)
                if (response == 'Reset Successfully!') {
                    this.message = " تم التعيين - تفقد بريدك الالكتروني وقم بتسجيل الدخول مرة أخرى"
                    setTimeout(this.logout, 10000);
                }
                else {
                    this.message = " حدث خطأ"
                }
                this.loader = false;
            }
        },
        logout() {
            this.$store.dispatch('logout');
            this.$router.push({ name: 'osboha' })
        }

    },
    validations() {
        return {
            form: {
                email: {
                    required,
                    email
                },
            },
        }
    },
}
</script>