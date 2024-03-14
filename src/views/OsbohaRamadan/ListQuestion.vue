<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card" v-if="question">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3" v-if="question.category == 'التثقيف بالفيديو'">{{ question.title
                        }}</h1>
                    <h1 class="text-center mt-3 mb-3" v-else> سؤال الـ{{ question.category }} {{ question.title }}</h1>
                </div>
                <h2 class="text-center mt-1 mb-3">{{ question.ramadan_day.day }} ~ رمضان </h2>

                <div class="col-12 pt-2">
                    <div class="sign-in-from" v-if="isQuestionActive">
                        <form class="mt-2" @submit.prevent="onSubmit()">
                            <div class="form-group d-flex justify-content-center">
                                <iframe v-if="question.category == 'التثقيف بالفيديو'" width="420" height="345"
                                    :src="`${question.link}`" frameborder="0" allowfullscreen>
                                </iframe>

                            </div>
                            <div class="form-group">
                                <h4 class="mb-2" style="direction:  rtl;">
                                    <small class="badge" :class="`${categoryClasses[question.category]}`">
                                        {{ question.category }}
                                    </small>

                                    {{ question.question }}
                                </h4>

                                <div class="alert alert-danger p-1 m-2 text-center" role="alert" v-if="answered">
                                    <h6 class="text-center">
                                        أجبت مسبقاً عن هذا السؤال
                                    </h6>
                                </div>

                                <textarea name="answer" class="form-control" id="answer" rows="5" required="required"
                                    v-model="form.answer" v-else></textarea>
                                <small style="color: red" v-if="v$.form.answer.$error">
                                    الاجابة مطلوبة
                                </small>
                            </div>
                            <div class="col-sm-12 text-center" v-if="loader">
                                <img src="@/assets/images/gif/page-load-loader.gif" alt="loader"
                                    style="height: 100px" />
                            </div>
                            <div class="d-inline-block w-100" v-else>
                                <button type="submit" class="btn ramadan-btn float-end" v-if="!answered"
                                    :disabled="loader">
                                    اعتماد
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="alert alert-danger p-1 m-2 text-center" role="alert" v-else>
                        <h6 class="text-center">
                            هذا السؤال غير مُتاح الأن
                        </h6>
                    </div>

                </div>

                <hr />
                <h4 class="mb-2 p-2" v-if="answer.length > 0" style="direction: rtl;">
                    <p class="text-center display-4">نقاطك {{ answer[0].points }}</p>
                    <small class="badge bg-success">
                        {{ ACTIVITIES_STATUS[answer[0].status] }}
                    </small>

                    {{ answer[0].answer }}
                </h4>
                <h4 class="p-2" v-if="answer.length > 0 && answer[0].reviews">
                    :الملاحظات
                    <p class="display-6">{{ answer[0].reviews }}</p>
                </h4>

                <div class="d-inline-block w-100 text-center col-12">
                    <router-link :to="{ name: 'ramadan.fill-questions', params: { day: question.ramadan_day_id } }"
                        class="d-block mt-3 mb-3 w-75 mx-auto">
                        <span class="back-btn display-6">عودة</span>
                        <span class="align-middle material-symbols-outlined display-6">
                            keyboard_return
                        </span>
                    </router-link>
                </div>

            </iq-card>
        </div>

    </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import ramadanHeader from "@/components/ramadan/ramadan-header";
import QuestionsService from "@/API/RamadanServices/questions.service";
import ramadanDaysService from "@/API/RamadanServices/ramadanDays.service";
import QuestionAnswersService from "@/API/RamadanServices/questionAnswers.service";
import helper from "@/utilities/helper";
import { ACTIVITIES_STATUS } from "@/utilities/constants";
import { question } from "fontawesome";

export default {
    name: "List One Question",
    setup() {
        return { v$: useVuelidate() };
    },
    components: {
        ramadanHeader,
    },

    async created() {
        this.current_day = await ramadanDaysService.current();
        this.setQuestion();
    },
    data() {
        return {
            loader: false,
            current_day: null,
            question: null,
            ACTIVITIES_STATUS,
            answer: [],
            form: {
                question_id: 0,
                answer: '',
            },
            categoryClasses: {
                'التثقيف بالفيديو': 'bg-success',
                'فقه': 'bg-warning',
                'تفسير': 'bg-info',

            }
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
    methods: {
        async setQuestion() {
            this.question = await QuestionsService.show(this.$route.params.id)
            this.form.question_id = this.question.id;
            this.answer = this.question.answers;
            if (this.answer.length > 0) {
                this.form.answer = this.answer[0].answer;
            }
        },
        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {
                    const response = await QuestionAnswersService.store(this.form);
                    this.setQuestion();
                    helper.toggleToast(
                        "تم الاعتماد",
                        "success"
                    );
                    this.v$.form.$reset();
                } catch (error) {
                    helper.toggleToast(
                        "حدث خطأ أثناء الاعتماد, حاول مرة أخرى",
                        "error"
                    );
                    console.log(error);
                } finally {
                    this.loader = false;
                }
            }
        },
    },
    computed: {
        isQuestionActive() {
            if (this.question) {
                const now = new Date();
                const localTime = now.toLocaleString("en-US", { timeZone: "Asia/Riyadh" });
                const currentTime = new Date(localTime);
                const targetTime = new Date(this.question.time_to_publish);

                // Compare ramadan_day_id of the question with current_day id
                // Compare the current time with the question time
                if (this.question.ramadan_day_id === this.current_day.id &&
                    currentTime >= targetTime) {
                    return true; // Question is active
                } else {
                    return false; // Question is not active
                }
            }
            return false;
        },
        answered() {
            if (this.answer.length > 0) {
                return (this.answer[0].status != 'pending');
            }
            else {
                return false;
            }
        },


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