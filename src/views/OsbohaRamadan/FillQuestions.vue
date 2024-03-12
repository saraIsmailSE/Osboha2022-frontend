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
                'الخامص',
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
                const targetDateTime = this.createDateWithGivenTime(question.time_to_publish);
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
        createDateWithGivenTime(timeString) {
            // Split the time string into hours, minutes, and seconds
            const [hours, minutes, seconds] = timeString.split(':').map(Number);

            // Get the current date
            const currentDate = new Date();

            // Set the hours, minutes, and seconds to the current date
            currentDate.setHours(hours);
            currentDate.setMinutes(minutes);
            currentDate.setSeconds(seconds);

            // Return the date object
            return currentDate;
        },
        isQuestionActive(question) {
            const now = new Date();
            const localTime = now.toLocaleString("en-US", { timeZone: "Asia/Riyadh" });
            const currentTime = new Date(localTime).getHours();
            const targetTime = parseInt(question.time_to_publish.split(':')[0]);

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

<style>
@import './css/ramadan.css';
</style>

<style scoped>
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}
</style>