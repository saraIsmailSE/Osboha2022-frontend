<template>
    <div class="col-sm-12 mt-3 text-center">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                <h4 class="text-center mt-3 mb-3">
                    اعادة تعيين كلمة المرور
                </h4>
            </div>
            <div class="iq-card-body p-0">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/reset-password.png" class="img-fluid rounded w-25" alt="blog-img">
                </div>
                <form class="mt-4" @submit.prevent="resetPassword">
                    <div class="form-group">
                        <label class="form-label" for="exampleInputEmail1">ادخل بريدك الالكتروني</label>
                        <input type="email" class="form-control mb-0 w-75 mx-auto" id="exampleInputEmail1"
                            placeholder="  ادخل بريدك الالكتروني " v-model="v$.form.email.$model">
                        <p style="color:red" v-if="v$.form.email.$error">قم بادخال بريدك الالكتروني</p>
                    </div>
                    <div class="form-group">
                        <label class="form-label text-right" for="exampleInputPassword">ادخل كلمة المرور الجيدة</label>
                        <input type="password" class="form-control mb-0 w-75 mx-auto" id="exampleInputPassword"
                            placeholder="  ادخل كلمة المرور الجديدة " v-model="v$.form.password.$model">
                        <p style="color:red" v-if="v$.form.password.$error">قم بادخال كلمة المرور الجديدة </p>
                    </div>
                    <div class="col-sm-12 text-center" v-if="loader">
                        <img src="../../../assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;">
                    </div>
                    <h4 class="text-center mt-3 mb-3" v-if="message"> {{ message }}</h4>
                    <div class="d-inline-block w-100 text-center">
                        <button type="submit" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                            تعيين
                        </button>
                    </div>
                </form>
            </div>
        </iq-card>

    </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import Auth from '@/API/services/auth.service'

export default {
    name: "ResetPassword",
    setup() {
        return { v$: useVuelidate() }
    },
    components: {},
    data() {
        return {
            loader: false,
            message: '',
            form: {
                password: '',
                email: '',
            },
            error: '',
            submitStatus: null,
        }
    },

    methods: {
        async resetPassword() {
            this.v$.$touch()
            if (!this.v$.form.$invalid) {
                this.message = "";
                this.loader = true;
                const response = await Auth.resetPassword(this.form.password, this.form.email, this.$route.params.token)
                if (response.success) {
                    this.$router.push({ name: 'social' })
                }
                else {
                    this.message = " حدث خطأ"
                }
                this.loader = false;
            }
        }
    },
    validations() {
        return {
            form: {
                password: {
                    required,
                    min: minLength(8)
                },
                email: {
                    required,
                    email
                },
            },
        }
    },
}
</script>