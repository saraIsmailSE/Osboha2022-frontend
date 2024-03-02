<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">السؤال الأول</h1>
                </div>
                <h2 class="text-center mt-1 mb-3">1 ~ رمضان </h2>

                <div class="col-12 pt-2">
                    <div class="sign-in-from">

                        <form class="mt-2" @submit.prevent="onSubmit()">
                            <div class="form-group">
                                <h4 class="mb-2">

                                    السؤال
                                    <small class="badge bg-success">فئة السؤال</small>
                                </h4>
                                <textarea name="answer" class="form-control" id="answer" rows="5" required="required"
                                    v-model="form.answer"></textarea>
                                <small style="color: red" v-if="v$.form.answer.$error">
                                    الاجابة مطلوبة
                                </small>
                            </div>
                            <div class="form-group text-center" v-if="message">
                                <small :style="{
                                    color: messageVariant === 'success' ? 'green' : 'red',
                                }">
                                    {{ message }}
                                </small>
                            </div>
                            <div class="col-sm-12 text-center" v-if="loader">
                                <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                            </div>
                            <div class="d-inline-block w-100" v-else>
                                <button type="submit" class="btn ramadan-btn float-end" :disabled="loader">
                                    اعتماد
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </iq-card>
        </div>

    </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import ramadanHeader from "@/components/ramadan/ramadan-header";

export default {
    name: "List One Question",
    setup() {
        return { v$: useVuelidate() };
    },
    components: {
        ramadanHeader,
    },

    async created() {
    },
    data() {
        return {
            loader: false,
            form: {
                answer: '',
            },
            message: "",
            messageVariant: "",
        };
    },
    validations() {
        return {
            form: {
                answer: {
                    required,
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
                } catch (error) {
                    this.message = "حدث خطأ, يرجى المحاولة لاحقاً";
                    this.messageVariant = "danger";
                } finally {
                    this.loader = false;
                }
            }
        },
    },
};
</script>

<style scoped>
@font-face {
    font-family: HacenSamra;
    src: url('@/assets/fonts/HacenSamra.ttf');
}

h1,
h2,
h4,
h5,
p {
    font-family: HacenSamra, Arial, sans-serif;
    color: #471809;
}

.ramadan-card {
    background: #f8f9fa;
}

.ramadan-btn {
    background: #b17658;
    color: #f8f9fa;

}
</style>