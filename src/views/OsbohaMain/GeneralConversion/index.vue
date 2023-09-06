<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card position-relative inner-page-bg bg-primary" style="height: 80px;">
                <div class="inner-page-title">
                    <h2 class="text-white">التحويل العام</h2>
                </div>
            </div>
        </div>

        <div class="timer-container">
            <div class="container">
                <span class="title">ثانية</span>
                <div>
                    <div>
                        <span class="single-digit">{{
                            stopwatch.seconds
                        }}</span>
                    </div>
                </div>
            </div>

            <span class="separator-container">
                <span class="separator"></span>
            </span>
            <div class="container">
                <span class="title">دقيقة</span>
                <div>
                    <div>
                        <span class="single-digit">{{
                            stopwatch.minutes
                        }}</span>
                    </div>
                </div>
            </div>
            <span class="separator-container">
                <span class="separator"></span>
            </span>
            <div class="container">
                <span class="title">ساعة</span>
                <div>
                    <span class="single-digit">{{
                        stopwatch.hours
                    }}</span>
                </div>
            </div>
        </div>

        <!-- <button @click="getTime" >get time</button> -->
        <div class="col-lg-12">
            <div class="mt-3 d-flex align-content-start flex-wrap">
                <p class="ms-1 me-1">
                    <span class="bg-primary rounded badge text-white">الكل</span>
                </p>
                <p class="ms-1 me-1">
                    <span class="bg-dark rounded badge text-white">my questions</span>
                </p>
                <p class="ms-1 me-1">
                    <span class="bg-danger rounded badge text-white">assigned to me</span>
                </p>
            </div>

            <div class="accordion" id="accordionExample">
                <div class="accordion-item mb-3" v-for="(question, index) in questions" :key="index">
                    <div class="mt-3 d-flex align-items-center justify-content-start w-100">
                        <BaseAvatar :profileImg="null" :profile_id="1" :title="'name'" :gender="'female'"
                            avatarClass="rounded-circle avatar-40" />
                        <div class="ms-3">
                            <h6>user name</h6>
                        </div>
                    </div>
                    <h2 class="accordion-header " id="heading1">
                        <button class="rtl accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#collapse' + index" aria-expanded="true" :aria-controls="'collapse' + index">
                            {{ question.title }}
                        </button>
                    </h2>
                    <div :id="'collapse' + index" class="accordion-collapse collapse " aria-labelledby="heading1"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>{{ question.description }}</p>

                            <div class="d-flex align-content-start flex-wrap">
                                <small class="ms-2 me-2">
                                    <span class="align-middle material-symbols-outlined">
                                        task_alt
                                    </span>
                                    تم الحل خلال 12 ساعة
                                </small>
                                <small class="ms-2 me-2">
                                    <span class="align-middle material-symbols-outlined">
                                        person_check
                                    </span>
                                    اسم المسؤول
                                </small>
                            </div>

                            <div class="mt-3 d-flex align-content-start flex-wrap">
                                <small class="ms-1 me-1">
                                    <span class="bg-primary rounded badge text-white">الحالة</span>
                                </small>
                                <small class="ms-1 me-1">
                                    <span class="bg-dark rounded badge text-white">الحالة</span>
                                </small>
                                <small class="ms-1 me-1">
                                    <span class="bg-danger rounded badge text-white">تعيين إلى اسم المسؤول</span>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from "vue";
import { useStopwatch } from 'vue-timer-hook';

export default {
    name: 'index',
    setup() {
        const autoStart = true;
        const stopwatch = useStopwatch(autoStart);
        return { stopwatch };
    },
    data() {
        return {
            questions: [
                {
                    title: 'تم تطوير هذا النص بمرور الوقت ليتناسب مع احتياجات الطباعة الحديثة.',
                    description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy.'
                },
                {
                    title: 'Distracted by the readable content of a page whent?',
                    description: 'It has survived not only five centuries, but also the leap into electronic typesetting. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.'
                },
            ]
        }
    },
    methods: {
        getTime() {
            console.log(this.stopwatch.seconds.value)
        }
    }
}
</script>

<style scoped>
.rtl {
    direction: rtl;
    text-align: start;
}

.timer-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.digital-container {
    display: flex;
    flex-direction: row;
    padding: 0;
}

.single-digit {
    position: relative;
    display: flex;
    flex: 0 1 25%;
    font-size: 30px;
    background-color: #404549;
    border-radius: 5px;
    padding: 10px 12px;
    color: #fff;
}

.separator-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-end;
    margin: 0 0 10px;
}

.separator {
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #404549;
    border-radius: 6px;
    margin: 1px 0;
}

.title {
    font-size: 12px;
    margin-bottom: 5px;
}
</style>