<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">قيام الليل</h1>
                </div>
                <h2 class="text-center mt-1 mb-3">{{ form.ramadan_day_id }} ~ رمضان </h2>
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
                                <label for="no_of_rakaat">كم عدد ركعات قيام الليل التي قمت بها لهذا اليوم</label>
                                <select v-model="v$.form.no_of_rakaat.$model" class="form-select" data-trigger
                                    name="no_of_rakaat" id="no_of_rakaat" :disabled="isDisabled">
                                    <option value="" selected>يرجى التحديد</option>
                                    <option value="3">ركعتان</option>
                                    <option value="5">أربع ركعات أو اكثر</option>
                                    <option value="0">لم أصلي</option>
                                </select>
                                <small style="color: red" v-if="v$.form.no_of_rakaat.$error">
                                    يرجى اختيار عدد الركعات
                                </small>
                            </div>
                            <div class="form-group">
                                <label for="night_pray">هل استطعت القيام بالتهجد ؟</label>
                                <select v-model="v$.form.night_pray.$model" class="form-select" data-trigger
                                    name="night_pray" id="night_pray" :disabled="isDisabled">
                                    <option value="" selected>يرجى التحديد</option>
                                    <option value="2">نعم</option>
                                    <option value="0">لا</option>
                                </select>
                                <small style="color: red" v-if="v$.form.night_pray.$error">
                                    يرجى التحديد
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
                            عدد الذين أتموا عدد (5) أيام قيام الليل معنا حتى اللحظة
                            <p class=" ramada-p text-center display-3"> {{ statistics.distinct_users_5_night }}</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا عدد (10) أيام قيام الليل معنا حتى اللحظة
                            <p class=" ramada-p text-center display-3"> {{ statistics.distinct_users_10_night }}</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا عدد (20) أيام قيام الليل معنا حتى اللحظة
                            <p class=" ramada-p text-center display-3"> {{ statistics.distinct_users_20_night }}</p>
                        </h4>
                        <hr>
                        <div class="row">
                            <h5 class="text-center col-6">
                                نقاطك لـ ({{ form.ramadan_day_id }}) رمضان
                                <p class=" ramada-p text-center display-3">
                                    {{ statistics.auth_specific_ramadan_day_points }}</p>
                            </h5>
                            <h5 class="text-center col-6">
                                أتممت قيام
                                <p class=" ramada-p text-center display-3"> {{ statistics.auth_complete_nights }}</p>
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
import ramadanDaysService from "@/API/RamadanServices/ramadanDays.service";
import nightPrayerServices from "@/API/RamadanServices/nightPrayer.service";
import helper from "@/utilities/helper";

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
        this.current_day = await ramadanDaysService.current();
        const response = await nightPrayerServices.show(this.form.ramadan_day_id);
        this.setForm(response);
    },
    data() {
        return {
            current_day: null,
            loader: false,
            statistics: [],
            form: {
                ramadan_day_id: this.$route.params.day,
                no_of_rakaat: '',
                night_pray: '',
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
                },
                night_pray: {
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
        async setForm(night_pray) {
            if (night_pray) {
                this.form.no_of_rakaat = night_pray.no_of_rakaat ? night_pray.no_of_rakaat : 0;
                this.form.night_pray = night_pray.night_pray ? night_pray.night_pray : 0;

            }

            //get new statistics
            this.statistics = await nightPrayerServices.statistics(this.form.ramadan_day_id);

        },

        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {

                    const response = await nightPrayerServices.store(this.form);
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