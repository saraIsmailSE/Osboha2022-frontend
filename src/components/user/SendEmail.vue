<template>
    <form @submit.prevent="sendEmail" class="post-text ml-3 w-100 row">
        <div class="form-group row">
            <textarea rows="3" placeholder="اكتب رسالتك هنا" class="rounded form-control mt-2 col-12" id="email_body"
                v-model="v$.emailForm.email_body.$model" name="email_body" dir="rtl">
                </textarea>
            <span v-if="v$.emailForm.email_body.$model"> {{ v$.emailForm.email_body.$model.length }}/600
                حرف</span>
        </div>
        <small style="color: red" v-if="v$.emailForm.email_body.$error">
            قم بادخال رسالة بين [10 - 5000] حرف
        </small>

        <div class="form-group">
            <button type="submit" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                ارسال
            </button>
        </div>

        <div class="col-sm-12 text-center" v-if="loader">
            <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
        </div>
        <h4 class="text-center mt-3 mb-3" v-if="message">{{ message }}</h4>
    </form>

</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import ContactsWithWithdrawn from "@/API/services/contacts-with-withdrawn.service";

export default {
    name: "send email",
    setup() {
        return { v$: useVuelidate() };
    },
    created() {
        this.emailForm.user_id = this.user_id
    },
    props: {
        user_id: {
            type: [Number],
            required: true,
        },
    },

    data() {
        return {
            emailForm: {
                email_body: '',
                user_id: null
            },
            loader: false,
            message: '',
        };
    },
    validations() {
        return {
            emailForm: {
                email_body: {
                    required,
                    minLength: minLength(10),
                    maxLength: maxLength(5000),
                },
            },
        };
    },

    methods: {
        async sendEmail() {
            this.v$.$touch();
            if (!this.v$.emailForm.$invalid) {
                this.message = "";
                this.loader = true;
                try {
                    const response = await ContactsWithWithdrawn.sendEmail(this.emailForm);
                    this.loader = false;
                    this.message = 'تم الارسال بنجاح';
                    this.v$.emailForm.$reset();
                } catch (error) {
                    console.log(error);
                }
            }

        },
    },

};
</script>