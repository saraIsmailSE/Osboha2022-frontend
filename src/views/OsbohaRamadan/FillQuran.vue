<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">ورد القرآن الكريم</h1>
                </div>
                <h2 class="text-center mt-1 mb-3">1 ~ رمضان </h2>

                <div class="col-12 pt-2">
                    <div class="alert alert-warning p-1 m-2 text-center" role="alert">
                        <h6>
                            توضيحات هامة للمهمة
                            <span class="material-symbols-outlined align-middle">
                                report
                            </span>

                        </h6>
                        <small>
                            الحد الأعلى من التلاوة اليوم في موقعنا هي (١٢) جزءً من كتاب الله وذلك للحث على تخصيص وقت
                            للتدبر والتفسير
                        </small>


                    </div>

                    <div class="sign-in-from">
                        <form class="mt-2" @submit.prevent="onSubmit()">
                            <div class="form-group">
                                <select v-model="v$.form.no_of_parts.$model" class="form-select" data-trigger
                                    name="no_of_parts" id="no_of_parts" :disabled="isDisabled">
                                    <option value="0" selected>عدد الأجزاء المقروءة</option>
                                    <option v-for="index in 12" :key="index" :value="index">
                                        {{ index }}
                                    </option>
                                </select>
                                <small style="color: red" v-if="v$.form.no_of_parts.$error">
                                    يرجى اختيار عدد الأجزاء
                                </small>
                            </div>
                            <div class="col-sm-12 text-center" v-if="loader">
                                <img src="@/assets/images/gif/page-load-loader.gif" alt="loader"
                                    style="height: 100px" />
                            </div>

                            <div class="alert alert-danger p-1 m-2 text-center" role="alert" v-if="isDisabled">
                                <h6 class="text-center">
                                    المهمة غير متاحة
                                </h6>
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

            <statisticsHeader />

            <iq-card class="iq-card statistics-card">
                <div class="col-12 pt-2">
                    <div class="sign-in-from">
                        <h4 class="text-center">
                            عدد الذين أتموا جزءًا واحدًا خلال يوم (1) رمضان

                            <p class="text-center display-3"> 1</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا أكثر من جزء واحدً خلال يوم (1) رمضان
                            <p class="text-center display-3"> 1</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا خمسة أجزاء فأكثر خلال يوم (1) رمضان
                            <p class="text-center display-3"> 1</p>
                        </h4>
                        <hr>
                        <h5 class="text-center">
                            نقاطك لـ (1) رمضان
                            <p class="text-center display-3"> 1</p>
                        </h5>

                        <p class="text-center h5">
                            لكل قارئ للقرآن حسنة في كل حرف، والحسنة بعشرة أمثالها إلى سبعمائة ضعف، فلا تقبل أن يسبقك
                            الآخرين
                            في الأجر والطاعة
                        </p>
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
import ramadanDaysService from "@/API/RamadanServices/ramadanDays.service";
import quranWirdServicesServices from "@/API/RamadanServices/quranWird.service";
import helper from "@/utilities/helper";
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
        this.current_day = await ramadanDaysService.current();
        const response = await quranWirdServicesServices.show(this.form.ramadan_day_id);
        this.setForm(response);
    },
    data() {
        return {
            current_day: null,
            loader: false,
            statistics: [],
            form: {
                ramadan_day_id: this.$route.params.day,
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
        async setForm(quran_wird) {
            if (quran_wird) {
                this.form.no_of_parts = quran_wird.no_of_parts ? quran_wird.no_of_parts : 0;
            }
        },

        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {

                    const response = await quranWirdServicesServices.store(this.form);
                    this.setForm(response);
                    helper.toggleToast(
                        "تم الاعتماد",
                        "success"
                    );
                } catch (error) {
                    helper.toggleToast(
                        "حدث خطأ أثناء التحديث, حاول مرة أخرى",
                        "error"
                    );
                } finally {
                    this.loader = false;
                }
            }
        },
    },
    computed: {
        isDisabled() {
            if (this.current_day) {
                return this.form.ramadan_day_id != this.current_day.day
            }
            else {
                return false;
            }
        }
    }

};
</script>

<style>
@import './css/ramadan.css';
</style>