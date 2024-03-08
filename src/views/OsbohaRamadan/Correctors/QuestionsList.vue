<template>
    <div>
        <ramadanHeader />
        <div class="col-12">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">أسئلة بحاجة لتصحيح</h4>
                </template>

                <template v-slot:body>
                    <div class="table-responsive" v-if="answers.length > 0">
                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>السؤال </th>
                                    <th>فئة السؤال </th>
                                    <th>اسم المشارك </th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="answer in answers" :key="answer.id">
                                    <td>
                                        {{ answer.ramadan_question.title }}
                                    </td>
                                    <td class="text-center">
                                        <small class="badge"
                                            :class="`${categoryClasses[answer.ramadan_question.category]}`">
                                            {{ answer.ramadan_question.category }}
                                        </small>
                                    </td>
                                    <td>
                                        {{ answer.user.name }}
                                    </td>
                                    <td>
                                        <router-link
                                            :to="{ name: 'ramadan.correct-question', params: { question_answer_id: answer.id }, }">
                                            <i role="button" class="material-symbols-outlined md-18 me-1 text-primary">
                                                visibility
                                            </i>
                                        </router-link>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div class="table-responsive" v-else>
                        <h4 class="text-center"> لا يوجد اسئلة </h4>
                    </div>

                </template>
            </iq-card>
        </div>

    </div>
</template>

<script>
import UserInfoService from "@/Services/userInfoService";
import ramadanHeader from "@/components/ramadan/ramadan-header";
import QuestionAnswersService from "@/API/RamadanServices/questionAnswers.service";

export default {
    name: 'Ramadan Index',
    components: {
        ramadanHeader,
    },
    async created() {
        this.answers = await QuestionAnswersService.getPending(this.category);
    },
    data() {
        return {
            answers: [],
            categoryClasses: {
                'التثقيف بالفيديو': 'bg-success',
                'فقه': 'bg-warning',
                'تفسير': 'bg-info',

            }
        };
    },
    methods: {
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        category() {
            if (UserInfoService.hasRoles(this.user, [
                "admin",
                "ramadan_coordinator",
            ])
            ) {
                return 'all'
            }
            else if (UserInfoService.hasRole(this.user, "ramadan_fiqh_corrector")) {
                return 'فقه'
            }
            else if (UserInfoService.hasRole(this.user, "ramadan_tafseer_corrector")) {
                return 'تفسير'
            }
            else if (UserInfoService.hasRole(this.user, "ramadan_vedio_corrector")) {
                return 'التثقيف بالفيديو'
            }
            return '';

        }
    },
};

</script>

<style>
@import '../css/ramadan.css';
</style>

<style scoped>
table {
    display: inline-table;
}

.material-symbols-outlined {
    color: #471809;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}
</style>