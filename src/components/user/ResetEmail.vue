<template>

    <iq-card class="iq-card">
        <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
            <h3 class="text-center mt-3 mb-3">
                اعادة تعيين البريد الالكتروني
            </h3>
        </div>
        <div class="iq-card-body p-3">
            <div class="image-block text-center">
                <img src="@/assets/images/main/no-friend-req.png" class="img-fluid rounded w-50" alt="profile-img" />
            </div>

            <div class="d-flex align-items-center mt-3">
                <form class="mt-4 w-100" @submit.prevent="resetEmail">
                    <div class="m-auto alert alert-warning w-75 mb-2" role="alert">
                        الايميل المسجل به: {{ user.email }}
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="email">ادخل بريدك الالكتروني الجديد</label>
                        <input type="email" class="form-control mb-0 w-75 mx-auto" id="email"
                            placeholder="  ادخل بريدك الالكتروني " v-model="v$.resetEmailForm.email.$model">
                        <p class="p-2 text-center" style="color:red" v-if="v$.resetEmailForm.email.$error">قم بادخال
                            بريدك
                            الالكتروني</p>
                    </div>
                    <div class="col-sm-12 text-center" v-if="loader">
                        <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px;">
                    </div>
                    <h4 class="text-center mt-3 mb-3" v-if="resetEmailMsg"> {{ resetEmailMsg }}</h4>
                    <div class="d-inline-block w-100 text-center">
                        <button type="submit" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                            تعيين
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </iq-card>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import Auth from '@/API/services/auth.service'


export default {
    name: "reset email",
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            resetEmailForm: {
                email: '',
            },
            message: null,
            resetEmailMsg: '',
        };
    },
    validations() {
        return {
            resetEmailForm: {
                email: {
                    required,
                    email
                },
            },

        };
    },
    methods: {

        async resetEmail() {
            this.v$.$touch()
            if (!this.v$.resetEmailForm.$invalid) {
                this.resetEmailMsg = "";
                this.loader = true;
                const response = await Auth.resetEmail(this.resetEmailForm.email)
                console.log(response)
                if (response == 'Reset Successfully!') {
                    this.resetEmailMsg = " تم التعيين - تفقد بريدك الالكتروني وقم بتسجيل الدخول مرة أخرى"
                    setTimeout(this.logout, 10000);
                }
                else {
                    this.resetEmailMsg = " حدث خطأ"
                }
                this.loader = false;
            }
        },
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
    },
};

</script>