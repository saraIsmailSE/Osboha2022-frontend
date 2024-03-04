<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">أسئلة اليوم</h1>
                </div>
                <h2 class="text-center mt-1 mb-3">1 ~ رمضان </h2>

                <div class="col-12 pt-2 text-center">
                    <div class="row">
                        <div class="col-6 col-md-6 col-lg-6">
                            <router-link :to="{ name: 'ramadan.listQuestion', params: { id: 1 } }">
                                <img src="@/assets/images/ramadan/question_on.png" alt="ramadan-footer"
                                    class="img-fluid" />
                                <h4 class="text-center">السؤال الأول</h4>

                            </router-link>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6">
                            <router-link :to="{ name: 'ramadan.listQuestion', params: { id: 2 } }">
                                <img src="@/assets/images/ramadan/question_on.png" alt="ramadan-footer"
                                    class="img-fluid" />
                                <h4 class="text-center">السؤال الثاني</h4>

                            </router-link>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6">
                            <router-link :to="{ name: 'ramadan.quran', }">
                                <img src="@/assets/images/ramadan/question_off.png" alt="ramadan-footer"
                                    class="img-fluid" />
                                <h4 class="text-center">السؤال الثالث</h4>

                            </router-link>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6">
                            <router-link :to="{ name: 'ramadan.quran', }">
                                <img src="@/assets/images/ramadan/question_off.png" alt="ramadan-footer"
                                    class="img-fluid" />
                                <h4 class="text-center">السؤال الرابع</h4>

                            </router-link>
                        </div>
                        <div class="col-12 col-md-12 col-lg-12">
                            <router-link :to="{ name: 'ramadan.quran', }">
                                <img src="@/assets/images/ramadan/question_off.png" alt="ramadan-footer"
                                    class="img-fluid" />
                                <h4 class="text-center">السؤال الخامس</h4>

                            </router-link>
                        </div>


                    </div>
                </div>
            </iq-card>

            <statisticsHeader />

            <iq-card class="iq-card statistics-card">
                <div class="col-12 pt-2">
                    <div class="sign-in-from">
                        <h4 class="text-center">
                            اجابتك للسؤال الأول
                            <span class="material-symbols-outlined align-middle accepted">verified</span>

                            <p class=" ramada-p text-center"> الاجابة </p>
                        </h4>

                        <h4 class="text-center">
                            اجابتك للسؤال الثاني
                            <span class="material-symbols-outlined align-middle rejected">dangerous</span>

                            <p class=" ramada-p text-center"> الاجابة </p>
                        </h4>
                        <hr>
                        <h5 class="text-center">
                            نقاطك لـ (1) رمضان
                            <p class=" ramada-p text-center display-3"> 1</p>
                        </h5>
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
import statisticsHeader from "@/components/ramadan/statistics-header";
const greaterThanZero = (value) => value > 0;

export default {
    name: "Ramadan Quran",
    setup() {
        return { v$: useVuelidate() };
    },
    components: {
        ramadanHeader,
        statisticsHeader,
    },

    async created() {
    },
    data() {
        return {
            loader: false,
            form: {
                no_of_parts: 0,
            },
            message: "",
            messageVariant: "",
        };
    },
    validations() {
        return {
            form: {
                no_of_parts: {
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

<style>
@import './css/ramadan.css';
</style>

<style scoped>
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}

</style>