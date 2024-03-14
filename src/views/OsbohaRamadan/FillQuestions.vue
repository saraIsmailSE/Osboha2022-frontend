<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">أسئلة اليوم</h1>
                </div>
                <h2 class="text-center mt-1 mb-3" v-if="questions.length > 0"> {{ questions[0].ramadan_day_id }} ~رمضان
                </h2>

                <div class=" col-12 pt-2 text-center">
                    <div class="row d-flex justify-content-center mb-3" v-if="questions.length > 0">
                        <div class="col-6 col-md-6 col-lg-6" v-for="( question, index ) in  questions "
                            :key="question.id">
                            <router-link :to="{ name: 'ramadan.listQuestion', params: { id: question.id } }"
                                :class="` ${!isQuestionActive(question) ? 'disabled-link' : ''}`">
                                <img :src="imagePath(question)" alt="ramadan-footer" class="img-fluid" />

                                <h4 v-if="countdowns[index] != -1 && WithinCurrentDay" class="text-center">
                                    {{ countdowns[index] }}
                                </h4>
                                <h4 class="text-center" v-else>السؤال {{ header[index] }}</h4>

                            </router-link>
                        </div>

                    </div>
                </div>

                <div class="alert alert-danger p-1 m-2 text-center" role="alert"
                    v-if="questions.length > 0 && !WithinCurrentDay">
                    <h6 class="text-center">
                        هذا الأسئلة غير مُتاحة الأن
                    </h6>
                </div>

                <div class="d-inline-block w-100 text-center col-12">
                    <router-link :to="{ name: 'ramadan.questions' }" class="d-block mt-3 mb-3 w-75 mx-auto">
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
                        <h4 class="text-center" v-for="( question, index ) in  questions " :key="question.id">
                            اجابتك للسؤال {{ header[index] }}
                            <span class="material-symbols-outlined align-middle accepted"
                                v-if="question.answers && question.answers.length > 0 && question.answers[0].status == 'accepted'">
                                verified
                            </span>
                            <span class="material-symbols-outlined align-middle rejected"
                                v-else-if="question.answers && question.answers.length > 0 && question.answers[0].status == 'rejected'">
                                dangerous
                            </span>

                            <span class="material-symbols-outlined align-middle"
                                v-else-if="question.answers && question.answers.length > 0 && question.answers[0].status == 'pending'">
                                pending
                            </span>
                            <span class="material-symbols-outlined align-middle" v-else>
                                notification_important
                            </span>
                            <p class=" ramada-p text-center" v-if="question.answers && question.answers.length > 0">
                                {{ question.answers[0].answer }}
                            </p>
                            <p class=" ramada-p text-center" v-else> لا يوجد اجابة</p>
                        </h4>
                        <hr>
                        <h5 class="text-center" v-if="questions.length > 0">
                            نقاطك لـ ({{ questions[0].ramadan_day_id }}) رمضان
                            <p class=" ramada-p text-center display-3"> {{ authPoints ? authPoints : 0 }}</p>
                        </h5>
                    </div>
                </div>
            </iq-card>
        </div>

    </div>
</template>

<script>
import ramadanHeader from "@/components/ramadan/ramadan-header";
import statisticsHeader from "@/components/ramadan/statistics-header";
import QuestionsService from "@/API/RamadanServices/questions.service";
import ramadanDaysService from "@/API/RamadanServices/ramadanDays.service";

export default {
    name: "Ramadan Quran",
    components: {
        ramadanHeader,
        statisticsHeader,
    },

    async created() {
        this.current_day = await ramadanDaysService.current();
        this.questions = await QuestionsService.getQuestionsByDay(this.$route.params.day);

        // Initialize countdown timers
        this.updateCountdowns();
        setInterval(this.updateCountdowns, 1000); // Update every second

    },
    data() {
        return {
            loader: false,
            current_day: null,
            questions: [],
            header: [
                'الأول',
                'الثاني',
                'الثالث',
                'الرابع',
                'الخامس',
            ],
            countdowns: []
        };
    },
    methods: {
        updateCountdowns() {
            // Calculate countdown for each question
            this.countdowns = this.questions.map(question => {
                // Calculate the time difference between the current time and the question time
                const now = new Date();
                const localTime = now.toLocaleString("en-US", { timeZone: "Asia/Riyadh" });
                const currentTime = new Date(localTime);
                const targetDateTime = new Date(question.time_to_publish);
                let difference = targetDateTime - currentTime;

                // Convert the time difference to hours, minutes, and seconds
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                if (difference < 0) {
                    return -1;
                }

                // Format the countdown string
                return `${hours}h ${minutes}m ${seconds}s`;
            });
        },
        isQuestionActive(question) {
            const now = new Date();
            const localTime = now.toLocaleString("en-US", { timeZone: "Asia/Riyadh" });
            const currentTime = new Date(localTime);
            const targetTime = new Date(question.time_to_publish);

            // Compare ramadan_day_id of the question with current_day id
            // Compare the current time with the question time
            if (question.ramadan_day_id === this.current_day.id &&
                currentTime >= targetTime) {
                return true; // Question is active
            } else {
                return false; // Question is not active
            }
        },
        imagePath(question) {
            const imageName = this.isQuestionActive(question) ? 'question_on.png' : 'question_off.png';
            return require(`@/assets/images/ramadan/${imageName}`);
        }
    },
    computed: {
        WithinCurrentDay() {
            if (this.questions.length > 0) {
                return (this.questions[0].ramadan_day_id === this.current_day.id)
            }
            return false;
        },
        authPoints() {
            let points = 0;
            if (this.questions.length > 0) {

                this.questions.forEach(question => {
                    if (question.answers && question.answers.length > 0) {
                        points += question.answers[0].points;
                    }
                });
            }
            return points;
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
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}
</style>