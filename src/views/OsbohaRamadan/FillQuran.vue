<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">ورد القرآن الكريم</h1>
                </div>
                <h2 class="text-center mt-1 mb-3" v-if="ramadan_day">{{ ramadan_day.day }} ~ رمضان </h2>

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
                <div class="d-inline-block w-100 text-center col-12">
                    <router-link :to="{ name: 'ramadan.quran' }" class="d-block mt-3 mb-3 w-75 mx-auto">
                        <span class="back-btn display-6">عودة</span>
                        <span class="align-middle material-symbols-outlined diplay-6">
                            keyboard_return
                        </span>
                    </router-link>
                </div>

            </iq-card>

            <statisticsHeader />

            <iq-card class="iq-card statistics-card" v-if="ramadan_day">
                <div class="col-12 pt-2">
                    <div class="sign-in-from">
                        <h4 class="text-center">
                            عدد الذين أتموا جزءًا واحدًا خلال يوم ({{ ramadan_day.day }}) رمضان

                            <p class="text-center display-3"> {{ statistics.num_users_read_one_juzu }}</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا أكثر من جزء واحدً خلال يوم ({{ ramadan_day.day }}) رمضان
                            <p class="text-center display-3"> {{ statistics.num_users_read_more_than_one_juzu }}</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا خمسة أجزاء فأكثر خلال يوم ({{ ramadan_day.day }}) رمضان
                            <p class="text-center display-3"> {{ statistics.num_users_read_five_juzu_or_more }}</p>
                        </h4>
                        <hr>
                        <div class="row">
                            <h5 class="text-center col-6">
                                نقاطك لـ ({{ ramadan_day.day }}) رمضان
                                <p class="text-center display-3"> {{ authPoints }}</p>
                            </h5>
                            <h5 class="text-center col-6">
                                أتممت
                                <p class="text-center display-6" style="direction: rtl;"> {{ totalParts }}</p>
                            </h5>

                        </div>

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
        this.ramadan_day = await ramadanDaysService.dayById(this.form.ramadan_day_id)
        const response = await quranWirdServicesServices.show(this.form.ramadan_day_id);
        this.setForm(response);
    },
    data() {
        return {
            current_day: null,
            ramadan_day: null,
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
            //get new statistics
            this.statistics = await quranWirdServicesServices.statistics(this.ramadan_day.id);

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
        },
        authPoints() {
            let points = 0;
            if (this.statistics.auth_specific_ramadan_day_wird) {
                points += 2
                if (this.statistics.auth_specific_ramadan_day_wird.no_of_parts == 2 || this.statistics.auth_specific_ramadan_day_wird.no_of_parts == 3) {
                    points += 2
                }
                else if (this.statistics.auth_specific_ramadan_day_wird.no_of_parts > 3) {
                    points += 4
                }

            }
            return points;
        },
        totalParts() {
            const totalParts = this.statistics.auth_total_no_of_parts
            const khutmaCount = Math.floor(totalParts / 30);
            const remainingParts = totalParts % 30;
            console.log("🚀 ~ totalParts ~ remainingParts:", remainingParts)

            if (khutmaCount === 0) {
                return `${totalParts} جزء`;
            } else if (remainingParts === 0) {
                return `${khutmaCount} ختمة`;
            } else {
                return `${khutmaCount} ختمة و ${remainingParts} اجزاء`;
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