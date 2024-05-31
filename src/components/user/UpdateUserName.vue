<template>
    <iq-card class="iq-card">
        <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
            <h3 class="text-center mt-3 ">اسم المستخدم</h3>
        </div>
        <div class="iq-card-body p-3">
            <div class="d-flex align-items-center mt-3">
                <form @submit.prevent="submitUserName" class="post-text ml-3 w-100 row">
                    <h4>
                        يجب أن يتكون اسم حسابك من مقطعين.
                        <mark class="p-0 ps-2 pe-2" style="background: #fcdbe0!important">هذا الاسم سيظهر
                            للمستخدمين الآخرين</mark>
                        <p style="direction: rtl;" class="mt-1">
                            ⚠ لو كان اسمك الحالي من شقين ( مثال أحمد الشمري ) أعد إدخاله هنا كما هو
                        </p>

                    </h4>

                    <div class="form-group row">
                        <input type="text" class="form-control mt-2" name="name" id="name" v-model="userNameForm.name"
                            placeholder="أحمد"
                            @change="() => { userNameForm.name = userNameForm.name.replace(/\s/g, '') }" />
                        <small style="color: red" v-if="v$.userNameForm.name.$error">
                            الاسم الأول مطلوب
                        </small>

                    </div>
                    <div class="form-group row">
                        <input type="text" class="form-control mt-2" name="last_name" id="last_name"
                            v-model="userNameForm.last_name" placeholder="الشمري"
                            @change="() => { userNameForm.name = userNameForm.name.replace(/\s/g, '') }" />
                        <small style="color: red" v-if="v$.userNameForm.name.$error">
                            الاسم الاخير مطلوب
                        </small>
                    </div>
                    <hr />
                    <div class="form-group">
                        <button type="tel" :disabled="loader" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                            تعديل
                        </button>
                    </div>

                    <div class="col-sm-12 text-center" v-if="loader">
                        <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                    </div>
                    <h4 class="text-center mt-3 mb-3" v-if="userNameMessage">
                        {{ userNameMessage }}
                    </h4>
                </form>
            </div>
        </div>
    </iq-card>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, email } from "@vuelidate/validators";
import UserService from "@/API/services/user.service";


export default {
    name: "update user social media",
    async created() {
        const userInfo = await UserService.show(this.user.id);
        if (userInfo) {
            this.userNameForm.name = userInfo.name ? userInfo.name.replace(/\s/g, '') : "";
            this.userNameForm.last_name = userInfo.last_name ? userInfo.last_name.replace(/\s/g, '') : "";
        }
    },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            loader: false,
            userNameForm: {
                name: "",
                last_name: "",
            },
            message: null,
            userNameMessage: "",
        };
    },
    validations() {
        return {
            userNameForm: {
                name: {
                    required,
                },
                last_name: {
                    required,
                },
            },
        };
    },
    methods: {

        /**
         * update profile userName.
         */
        async submitUserName() {
            this.userNameMessage = "";
            this.loader = true;
            try {
                const response = await UserService.updateUserName(this.userNameForm);
                this.loader = false;
                this.userNameMessage = 'تم التعديل';
                setTimeout(() => {
                    this.userNameMessage = "";
                }, 2000);
            } catch (error) {
                console.log(error);
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