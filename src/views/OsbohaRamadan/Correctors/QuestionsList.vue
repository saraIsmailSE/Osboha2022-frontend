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
    font-size: 25px;
    line-height: 40px;
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

.material-symbols-outlined {
    color: #471809;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}

table {
    display: inline-table;
}
</style>