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

                <div class="d-inline-block w-100 text-center col-12">
                    <router-link :to="{ name: 'ramadan.night-prayer' }" class="d-block mt-3 mb-3 w-75 mx-auto">
                        <span class="back-btn display-6">عودة</span>
                        <span class="align-middle material-symbols-outlined diplay-6">
                            keyboard_return
                        </span>
                    </router-link>
                </div>

            </iq-card>

            <statisticsHeader />

            <iq-card class="iq-card statistics-card">
                <div class="col-12 pt-2">
                    <div class="sign-in-from">
                        <h4 class="text-center">
                            عدد الذين أتموا عدد (5) أيام قيام الليل معنا حتى اللحظة
                            <p class=" ramada-p text-center display-3"> {{ statistics.distinct_users_5_night ?
                    statistics.distinct_users_5_night : 0 }}</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا عدد (10) أيام قيام الليل معنا حتى اللحظة
                            <p class=" ramada-p text-center display-3"> {{ statistics.distinct_users_10_night ?
                    statistics.distinct_users_10_night : 0 }}</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا عدد (20) أيام قيام الليل معنا حتى اللحظة
                            <p class=" ramada-p text-center display-3"> {{ statistics.distinct_users_20_night ?
                    statistics.distinct_users_20_night : 0 }}</p>
                        </h4>
                        <hr>
                        <div class="row">
                            <h5 class="text-center col-6">
                                نقاطك لـ ({{ form.ramadan_day_id }}) رمضان
                                <p class=" ramada-p text-center display-3">
                                    {{ statistics.auth_specific_ramadan_day_points ?
                    statistics.auth_specific_ramadan_day_points : 0 }}</p>
                            </h5>
                            <h5 class="text-center col-6">
                                أتممت قيام
                                <p class=" ramada-p text-center display-3"> {{ statistics.auth_complete_nights ?
                    statistics.auth_complete_nights : 0 }}</p>
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

.ramada-p {
    font-family: HacenSamra, Arial, sans-serif;
    color: #471809;
}

.ramadan-card {
    background: #f8f9fa;
}

.disabled-link {
    color: #ccc;
    /* Set the color to a muted or grayed-out color */
    pointer-events: none;
    /* Disable pointer events to prevent clicking */
    text-decoration: none;
    /* Remove underline or other decorations */
}

.statistics-card {
    background: #FDEEEC;
    border-top: none;
    border-right: solid #471809;
    border-bottom: solid #471809;
    border-left: solid #471809;
}

.ramadan-btn {
    background: #b17658;
    color: #f8f9fa;

}

.back-btn {
    font-family: HacenSamra, Arial, sans-serif;
    color: #471809;
}

.accepted {
    color: #3e9069;
}

.rejected {
    color: darkred;
}


/*form styles*/
#msform {
    position: relative;
    margin-top: 20px;
}

#msform fieldset .form-card {
    background: white;
    border: 0 none;
    border-radius: 0px;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
    padding: 20px 40px 30px 40px;
    box-sizing: border-box;
    width: 94%;
    margin: 0 3% 20px 3%;

    /*stacking fieldsets above each other*/
    position: relative;
}

#msform fieldset {
    background: white;
    border: 0 none;
    border-radius: 0.5rem;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding-bottom: 20px;

    /*stacking fieldsets above each other*/
    position: relative;
}

/*Hide all except first fieldset*/
#msform fieldset:not(:first-of-type) {
    display: none;
}

#msform fieldset .form-card {
    text-align: left;
    color: #9E9E9E;
}

#msform input,
#msform textarea {
    padding: 0px 8px 4px 8px;
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0px;
    margin-bottom: 25px;
    margin-top: 2px;
    width: 100%;
    box-sizing: border-box;
    font-family: montserrat;
    color: #2C3E50;
    font-size: 16px;
    letter-spacing: 1px;
}

#msform input:focus,
#msform textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: none;
    font-weight: bold;
    border-bottom: 2px solid #596D13;
    outline-width: 0;
}


/*Dropdown List Exp Date*/
select.list-dt {
    border: none;
    outline: 0;
    border-bottom: 1px solid #ccc;
    padding: 2px 5px 3px 5px;
    margin: 2px;
}

select.list-dt:focus {
    border-bottom: 2px solid #596D13;
}

/*The background card*/
.card {
    z-index: 0;
    border: none;
    border-radius: 0.5rem;
    position: relative;
}

/*FieldSet headings*/
.fs-title {
    font-size: 25px;
    color: #2C3E50;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: left;
}

/*progressbar*/
#progressbar {
    margin-bottom: 30px;
    overflow: hidden;
    color: lightgrey;
}

#progressbar .active {
    color: #471809;
}

#progressbar li {
    list-style-type: none;
    font-size: 12px;
    width: 33%;
    float: left;
    position: relative;
}

/*ProgressBar before any progress*/
#progressbar li:before {
    width: 50px;
    height: 50px;
    line-height: 45px;
    display: block;
    font-size: 18px;
    color: #ffffff;
    background: lightgray;
    border-radius: 50%;
    margin: 0 auto 10px auto;
    padding: 2px;
}

/*ProgressBar connectors*/
#progressbar li:after {
    content: '';
    width: 100%;
    height: 2px;
    background: lightgray;
    position: absolute;
    left: 0;
    top: 25px;
    z-index: -1;
}

/*Color number of the step and the connector before it*/
#progressbar li.active:before,
#progressbar li.active:after {
    background: #596D13;
}

/*Imaged Radio Buttons*/
.radio-group {
    position: relative;
    margin-bottom: 25px;
}

.radio {
    display: inline-block;
    width: 204;
    height: 104;
    border-radius: 0;
    background: lightblue;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    cursor: pointer;
    margin: 8px 2px;
}

.previous {
    background: #448e9e;
    color: white;
}

.radio:hover {
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
}

.radio.selected {
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
}

/*Fit image in bootstrap div*/
.fit-image {
    width: 100%;
    object-fit: cover;
}

/* Define your transitions and other styles here */
.step-enter-active,
.step-leave-active {
    transition: opacity 0.5s;
}

.step-enter-from,
.step-leave-to {
    opacity: 0;
}

.tag-input-container .form-control {
    min-height: 45px;
    cursor: text;
}

.tag-input-container input {
    border: none;
    outline: none;
    flex-grow: 1;
    padding: 0;
}
</style>