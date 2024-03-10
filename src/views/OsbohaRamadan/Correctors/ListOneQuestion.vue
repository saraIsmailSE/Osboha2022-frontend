<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3" v-if="answer">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card"
                    v-if="answer.ramadan_question">

                    <h1 class="text-center mt-3 mb-3" v-if="answer.ramadan_question.category == 'التثقيف بالفيديو'">
                        {{ answer.ramadan_question.title }}
                    </h1>
                    <h1 class="text-center mt-3 mb-3" v-else>
                        سؤال الـ{{ answer.ramadan_question.category }}
                        {{ answer.ramadan_question.title }}
                    </h1>

                </div>
                <h6 class=" h5 text-center mt-2" style="direction: rtl;">
                    <small class="badge" :class="`${categoryClasses[answer.ramadan_question.category]}`">
                        {{ answer.ramadan_question.category }}
                    </small>
                    {{ answer.ramadan_question.question }}
                </h6>
                <div class="form-group d-flex justify-content-center mt-3"
                    v-if="answer.ramadan_question.category == 'التثقيف بالفيديو'">
                    <iframe width="420" height="345" :src="`${answer.ramadan_question.link}`" frameborder="0"
                        allowfullscreen>
                    </iframe>

                </div>

                <hr />

                <div class="col-12 pt-2">
                    <h4 class="mb-2 p-2">
                        {{ answer.user.name }}
                        <small class="badge bg-warning">{{ ACTIVITIES_STATUS[answer.status] }}</small>

                    </h4>
                    <h6 class="mb-2 p-2">
                        {{ answer.answer }}
                    </h6>

                </div>

                <template v-slot:headerTitle v-if="answer.reviewer">
                    <h4 class="card-title">تم التصحيح </h4>
                </template>

                <template v-slot:body v-if="answer.reviewer">
                    <TimeLine :items="[
            {
                color: 'primary',
                title: `${ACTIVITIES_STATUS[answer.status]}  ~ ${answer.reviewer.name}`,
                description: `${answer.reviews}`,
                child: {
                    type: 'img',
                    items: [
                    ]
                }
            },

        ]" />
                </template>

                <div class="sign-in-from">
                    <form class="mt-2" @submit.prevent="onSubmit()" v-if="answer.status == 'pending'">
                        <div class="form-group">
                            <label for="status">الاجراء</label>
                            <select v-model="v$.form.status.$model" class="form-select" data-trigger name="status"
                                id="status">
                                <option value="" selected>اختر الاجراء</option>
                                <option value="accepted">مقبول</option>
                                <option value="rejected">مرفوض</option>
                            </select>
                            <small style="color: red" v-if="v$.form.status.$error">
                                الاجراء مطلوبة
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="reviwes">ملاحظاتك</label>
                            <textarea name="hadith_1" class="form-control" id="hadith_1" rows="5" required="required"
                                v-model="form.reviews"></textarea>
                            <small style="color: red" v-if="v$.form.reviews.$error">
                                ملاحظتك مطلوبة
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



                <div class="d-inline-block w-100 text-center col-12">
                    <router-link :to="{ name: 'ramadan.correctors-questions-list', }"
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
import QuestionAnswersService from "@/API/RamadanServices/questionAnswers.service";
import { ACTIVITIES_STATUS } from "@/utilities/constants";
import helper from "@/utilities/helper";

export default {
    name: "Ramadan Night Prayer",
    setup() {
        return { v$: useVuelidate() };
    },
    components: {
        ramadanHeader,
    },

    async created() {
        this.answer = await QuestionAnswersService.show(this.$route.params.question_answer_id);
    },
    data() {
        return {
            loader: false,
            answer: null,
            ACTIVITIES_STATUS,
            form: {
                answer_id: this.$route.params.question_answer_id,
                status: '',
                reviews: '',
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
                status: {
                    required,
                },
                reviews: {
                    required,
                },
            },
        };
    },
    watch: {
    },
    methods: {

        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {
                    const response = await QuestionAnswersService.correct(this.form);
                    this.answer = response;
                    helper.toggleToast(
                        "تم التصحيح",
                        "success"
                    );
                    this.v$.form.$reset();
                } catch (error) {
                    helper.toggleToast(
                        "حدث خطأ أثناء التحديث, حاول مرة أخرى",
                        "error"
                    );
                    console.log(error);
                } finally {
                    this.loader = false;
                }
            }
        },
    },
};
</script>

<style>
@import '../css/ramadan.css';
</style>

<style scoped>
.material-symbols-outlined {
    color: #471809;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}
</style>