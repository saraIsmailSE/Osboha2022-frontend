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
                        <span class="back-btn">عودة</span>
                        <span class="align-middle material-symbols-outlined ">
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
                const currentTime = new Date(localTime).getHours();
                const targetTime = parseInt(this.question.time_to_publish.split(':')[0]);

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

<style>
@import './css/ramadan.css';
</style>