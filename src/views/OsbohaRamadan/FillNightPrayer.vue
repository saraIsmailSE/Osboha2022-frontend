<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">قيام الليل</h1>
                </div>
                <h2 class="text-center mt-1 mb-3">1 ~ رمضان </h2>
                <img src="@/assets/images/ramadan/night-prayer.png" alt="ramadan-footer" class="img-fluid" />

                <p class="ramada-p h5 text-center">
                    قال رسول الله ﷺ: (مَن قامَ بعَشرِ آياتٍ لم يُكتَبْ مِن الغافِلينَ، ومَن قامَ بمئةِ آيةٍ كُتِبَ
                    مِن القانِتينَ، ومَن قامَ بألْفِ آيةٍ كُتِبَ مِن المُقَنطِرينَ)
                </p>
                <div class="col-12 pt-2">
                    <div class="alert alert-warning p-1 m-2 text-center" role="alert">
                        <h6>
                            توضيحات هامة للمهمة
                            <span class="material-symbols-outlined align-middle">
                                report
                            </span>

                        </h6>
                        <small>
                            التهجد، هي صلاة قيام الليل التي يشترط أن ينام المرء قبلها ثم يستقظ ليصلي قيام الليل
                        </small>

                    </div>

                    <div class="sign-in-from">
                        <form class="mt-2" @submit.prevent="onSubmit()">
                            <div class="form-group">
                                <label for="role">كم عدد ركعات قيام الليل التي قمت بها لهذا اليوم</label>
                                <select v-model="v$.form.no_of_rakaat.$model" class="form-select" data-trigger
                                    name="role" id="role">
                                    <option value="0" selected>ركعات قيام الليل</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="4">أكثر من 4</option>
                                </select>
                                <small style="color: red" v-if="v$.form.no_of_rakaat.$error">
                                    يرجى اختيار عدد الركعات
                                </small>
                            </div>
                            <div class="form-group">
                                <label for="role">هل استطعت القيام بالتهجد ؟</label>
                                <select v-model="v$.form.nigh_pray.$model" class="form-select" data-trigger name="role"
                                    id="role">
                                    <option value="0" selected>يرجى التحديد</option>
                                    <option value="true">نعم</option>
                                    <option value="false">لا</option>
                                </select>
                                <small style="color: red" v-if="v$.form.nigh_pray.$error">
                                    يرجى التحديد
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
                                <img src="@/assets/images/gif/page-load-loader.gif" alt="loader"
                                    style="height: 100px" />
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
                            عدد الذين أتموا عدد (5) أيام قيام الليل معنا حتى اللحظة
                            <p class=" ramada-p text-center display-3"> 1</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا عدد (10) أيام قيام الليل معنا حتى اللحظة
                            <p class=" ramada-p text-center display-3"> 1</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا عدد (20) أيام قيام الليل معنا حتى اللحظة
                            <p class=" ramada-p text-center display-3"> 1</p>
                        </h4>
                        <hr>
                        <div class="row">
                            <h5 class="text-center col-6">
                                نقاطك ل، (1) رمضان
                                <p class=" ramada-p text-center display-3"> 1</p>
                            </h5>
                            <h5 class="text-center col-6">
                                أتممت قيام
                                <p class=" ramada-p text-center display-3"> 1</p>
                            </h5>

                        </div>

                        <p class=" ramada-p text-center h5">
                            قيام الليل شرف المؤمن،
                            وهي باب من أبواب التقرب إلى الله
                            فاحرص على أن لا تسبق في طريق الله
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
const greaterThanZero = (value) => value > 0;

export default {
    name: "Ramadan Night Prayer",
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
                no_of_rakaat: 0,
                nigh_pray: 0,
            },
            message: "",
            messageVariant: "",
        };
    },
    validations() {
        return {
            form: {
                no_of_rakaat: {
                    required,
                    maxValue: greaterThanZero,
                },
                nigh_pray: {
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