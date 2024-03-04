<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">اليوم الذهبي</h1>
                </div>
                <h2 class="text-center mt-1 mb-3">1 ~ رمضان </h2>
                <div class="col-12 pt-2">
                    <div class="row justify-content-center mt-0 mb-3 " ref="formContainer">
                        <ul id="progressbar">
                            <li class="text-center" :class="{ active: currentStep >= 2 }" id="payment">
                                <span class="material-symbols-outlined">psychology_alt </span>
                            </li>
                            <li class="text-center" :class="{ active: currentStep >= 1 }" id="personal">
                                <span class="material-symbols-outlined"> accessibility_new </span>
                            </li>
                            <li class="text-center" :class="{ active: currentStep >= 0 }" id="account">
                                <span class="material-symbols-outlined"> mosque </span>
                            </li>

                        </ul>
                        <transition id="msform" name="step" mode="out-in" class="payment-method">
                            <div :key="currentStep" class="ps-3 pe-3">
                                <!-- Step 1 -->
                                <div v-if="currentStep === 0" class="form-card">
                                    <div class="form-card form-group">
                                        <h2 class=" text-center mb-3">
                                            الجانب الديني
                                        </h2>
                                        <hr />
                                        <h6 class="h5 mb-3">
                                            <small style="color: red; text-decoration: underline">
                                                في حالة العذر الشرعي اختر نعم
                                            </small>
                                        </h6>

                                        <!-- السنن الرواتب -->

                                        <h6 class="mb-2 text-start h5">
                                            {{ TASK_ONE[0].head_title }}
                                        </h6>

                                        <TaskNotes :virtue_and_evidence="TASK_ONE[0].virtue_and_evidence"
                                            :important_clarifications="TASK_ONE[0].important_clarifications" />
                                        <h6 class="mb-2 text-start h5">
                                            <small class="badge bg-success" style="direction: rtl;">
                                                {{ TASK_ONE[0].points }}
                                                نقاط</small>
                                            {{ TASK_ONE[0].title }}

                                        </h6>

                                        <div class="radio-group mt-3 d-flex">
                                            <input type="radio" id="yes" :name="TASK_ONE[0].name" class="w-25"
                                                :value="TASK_ONE[0].points" v-model="goldenForm.sunan_al_rawatib"
                                                :disabled="isDisabled" />
                                            <label for="yes">نعم</label>

                                            <input type="radio" id="no" value="0" :name="TASK_ONE[0].name" class="w-25"
                                                v-model="goldenForm.sunan_al_rawatib" :disabled="isDisabled" />
                                            <label for="no">لا</label>
                                            <input type="radio" id="no_by_reason"  :value="TASK_ONE[0].points" :name="TASK_ONE[0].name" class="w-25"
                                                v-model="goldenForm.sunan_al_rawatib" :disabled="isDisabled" />
                                            <label for="no_by_reason">عذر شرعي</label>
                                        </div>

                                        <!-- istighfar -->

                                        <h6 class="mb-2 text-start h5">
                                            {{ TASK_ONE[1].head_title }}
                                        </h6>

                                        <TaskNotes :virtue_and_evidence="TASK_ONE[1].virtue_and_evidence"
                                            :important_clarifications="TASK_ONE[1].important_clarifications" />
                                        <h6 class="mb-2 text-start h5">
                                            <small class="badge bg-success" style="direction: rtl;">
                                                {{ TASK_ONE[1].points }}
                                                نقاط</small>
                                            {{ TASK_ONE[1].title }}

                                        </h6>

                                        <div class="radio-group mt-3 d-flex">
                                            <input type="radio" id="yes" :name="TASK_ONE[1].name" class="w-25"
                                                :value="TASK_ONE[1].points" v-model="goldenForm.istighfar"
                                                :disabled="isDisabled" />
                                            <label for="yes">نعم</label>

                                            <input type="radio" id="no" value="0" :name="TASK_ONE[1].name" class="w-25"
                                                v-model="goldenForm.istighfar" :disabled="isDisabled" />
                                            <label for="no">لا</label>
                                        </div>


                                        <!-- tasbeeh -->

                                        <h6 class="mb-2 text-start h5">
                                            {{ TASK_ONE[2].head_title }}
                                        </h6>

                                        <TaskNotes :virtue_and_evidence="TASK_ONE[2].virtue_and_evidence"
                                            :important_clarifications="TASK_ONE[2].important_clarifications" />
                                        <h6 class="mb-2 text-start h5">
                                            <small class="badge bg-success" style="direction: rtl;">
                                                {{ TASK_ONE[2].points }}
                                                نقاط</small>
                                            {{ TASK_ONE[2].title }}

                                        </h6>

                                        <div class="radio-group mt-3 d-flex">
                                            <input type="radio" id="yes" :name="TASK_ONE[2].name" class="w-25"
                                                :value="TASK_ONE[2].points" v-model="goldenForm.tasbeeh"
                                                :disabled="isDisabled" />
                                            <label for="yes">نعم</label>

                                            <input type="radio" id="no" value="0" :name="TASK_ONE[2].name" class="w-25"
                                                v-model="goldenForm.tasbeeh" :disabled="isDisabled" />
                                            <label for="no">لا</label>
                                        </div>


                                        <!-- duha_prayer -->

                                        <h6 class="mb-2 text-start h5">
                                            {{ TASK_ONE[3].head_title }}
                                        </h6>

                                        <TaskNotes :virtue_and_evidence="TASK_ONE[3].virtue_and_evidence"
                                            :important_clarifications="TASK_ONE[3].important_clarifications" />
                                        <h6 class="mb-2 text-start h5">
                                            <small class="badge bg-success" style="direction: rtl;">
                                                {{ TASK_ONE[3].points }}
                                                نقاط</small>
                                            {{ TASK_ONE[3].title }}

                                        </h6>

                                        <div class="radio-group mt-3 d-flex">
                                            <input type="radio" id="yes" :name="TASK_ONE[3].name" class="w-25"
                                                :value="TASK_ONE[3].points" v-model="goldenForm.duha_prayer"
                                                :disabled="isDisabled" />
                                            <label for="yes">نعم</label>

                                            <input type="radio" id="no" value="0" :name="TASK_ONE[3].name" class="w-25"
                                                v-model="goldenForm.duha_prayer" :disabled="isDisabled" />
                                            <label for="no">لا</label>
                                            <input type="radio" id="no_by_reason"  :value="TASK_ONE[3].points" :name="TASK_ONE[3].name" class="w-25"
                                                v-model="goldenForm.duha_prayer" :disabled="isDisabled" />
                                            <label for="no_by_reason">عذر شرعي</label>

                                        </div>


                                        <!-- morning_evening_dhikr -->

                                        <h6 class="mb-2 text-start h5">
                                            {{ TASK_ONE[4].head_title }}
                                        </h6>

                                        <TaskNotes :virtue_and_evidence="TASK_ONE[4].virtue_and_evidence"
                                            :important_clarifications="TASK_ONE[4].important_clarifications" />
                                        <h6 class="mb-2 text-start h5">
                                            <small class="badge bg-success" style="direction: rtl;">
                                                {{ TASK_ONE[4].points }}
                                                نقاط</small>
                                            {{ TASK_ONE[4].title }}

                                        </h6>

                                        <div class="radio-group mt-3 d-flex">
                                            <input type="radio" id="yes" :name="TASK_ONE[4].name" class="w-25"
                                                :value="TASK_ONE[4].points" v-model="goldenForm.morning_evening_dhikr"
                                                :disabled="isDisabled" />
                                            <label for="yes">نعم</label>

                                            <input type="radio" id="no" value="0" :name="TASK_ONE[4].name" class="w-25"
                                                v-model="goldenForm.morning_evening_dhikr" :disabled="isDisabled" />
                                            <label for="no">لا</label>
                                        </div>



                                        <!-- Shaf_and_witr -->

                                        <h6 class="mb-2 text-start h5">
                                            {{ TASK_ONE[5].head_title }}
                                        </h6>

                                        <TaskNotes :virtue_and_evidence="TASK_ONE[5].virtue_and_evidence"
                                            :important_clarifications="TASK_ONE[5].important_clarifications" />
                                        <h6 class="mb-2 text-start h5">
                                            <small class="badge bg-success" style="direction: rtl;">
                                                {{ TASK_ONE[5].points }}
                                                نقاط</small>
                                            {{ TASK_ONE[5].title }}

                                        </h6>

                                        <div class="radio-group mt-3 d-flex">
                                            <input type="radio" id="yes" :name="TASK_ONE[5].name" class="w-25"
                                                :value="TASK_ONE[5].points" v-model="goldenForm.Shaf_and_witr"
                                                :disabled="isDisabled" />
                                            <label for="yes">الشفع والوتر</label>

                                            <input type="radio" id="only_shaf" :value="TASK_ONE[5].points - 1"
                                                :name="TASK_ONE[5].name" class="w-25" v-model="goldenForm.Shaf_and_witr"
                                                :disabled="isDisabled" />
                                            <label for="only_shaf">الشفع فقط</label>

                                            <input type="radio" id="only_witr" :name="TASK_ONE[5].name" class="w-25"
                                                :value="TASK_ONE[5].points - 1" v-model="goldenForm.Shaf_and_witr"
                                                :disabled="isDisabled" />
                                            <label for="only_witr">الوتر فقط</label>

                                            <input type="radio" id="no" value="0" :name="TASK_ONE[5].name" class="w-25"
                                                v-model="goldenForm.Shaf_and_witr" :disabled="isDisabled" />
                                            <label for="no">لم أصلي</label>

                                            <input type="radio" id="no_by_reason"  :value="TASK_ONE[5].points" :name="TASK_ONE[5].name" class="w-25"
                                                v-model="goldenForm.Shaf_and_witr" :disabled="isDisabled" />
                                            <label for="no_by_reason">عذر شرعي</label>

                                        </div>
                                    </div>
                                    <div class="alert alert-danger" role="alert" v-if="nextStepError">
                                        <small>
                                            {{ nextStepError }}
                                        </small>
                                    </div>
                                    <div class="d-inline-block w-100">
                                        <button type="button" class="btn ramadan-btn float-end" @click="goNext()">
                                            التالي
                                        </button>
                                    </div>
                                </div>
                                <!-- Step 2 -->
                                <div v-if="currentStep === 1" class="form-card">
                                    <div class="form-card form-group">
                                        <h2 class=" text-center mb-3">
                                            الجانب الصحي
                                        </h2>
                                        <hr />

                                        <!-- suhoor -->
                                        <h6 class="mb-2 text-start h5">
                                            {{ TASK_TWO[0].head_title }}
                                        </h6>

                                        <TaskNotes :virtue_and_evidence="TASK_TWO[0].virtue_and_evidence"
                                            :important_clarifications="TASK_TWO[0].important_clarifications" />
                                        <h6 class="mb-2 text-start h5">
                                            <small class="badge bg-success" style="direction: rtl;">
                                                {{ TASK_TWO[0].points }}
                                                نقاط</small>
                                            {{ TASK_TWO[0].title }}

                                        </h6>

                                        <div class="radio-group mt-3 d-flex">
                                            <input type="radio" id="yes" :name="TASK_TWO[0].name" class="w-25"
                                                :value="TASK_TWO[0].points" v-model="goldenForm.suhoor"
                                                :disabled="isDisabled" />
                                            <label for="yes">نعم</label>

                                            <input type="radio" id="no" value="0" :name="TASK_TWO[0].name" class="w-25"
                                                v-model="goldenForm.suhoor" :disabled="isDisabled" />
                                            <label for="no">لا</label>
                                        </div>



                                        <!-- drink_water -->
                                        <h6 class="mb-2 text-start h5">
                                            {{ TASK_TWO[1].head_title }}
                                        </h6>

                                        <TaskNotes :virtue_and_evidence="TASK_TWO[1].virtue_and_evidence"
                                            :important_clarifications="TASK_TWO[1].important_clarifications" />
                                        <h6 class="mb-2 text-start h5">
                                            <small class="badge bg-success" style="direction: rtl;">
                                                {{ TASK_TWO[1].points }}
                                                نقاط</small>
                                            {{ TASK_TWO[1].title }}

                                        </h6>

                                        <div class="radio-group mt-3 d-flex">
                                            <input type="radio" id="yes" :name="TASK_TWO[1].name" class="w-25"
                                                :value="TASK_TWO[1].points" v-model="goldenForm.drink_water"
                                                :disabled="isDisabled" />
                                            <label for="yes">نعم</label>

                                            <input type="radio" id="no" value="0" :name="TASK_TWO[1].name" class="w-25"
                                                v-model="goldenForm.drink_water" :disabled="isDisabled" />
                                            <label for="no">لا</label>
                                        </div>

                                        <!-- sleep_amount -->
                                        <h6 class="mb-2 text-start h5">
                                            {{ TASK_TWO[2].head_title }}
                                        </h6>

                                        <TaskNotes :virtue_and_evidence="TASK_TWO[2].virtue_and_evidence"
                                            :important_clarifications="TASK_TWO[2].important_clarifications" />
                                        <h6 class="mb-2 text-start h5">
                                            <small class="badge bg-success" style="direction: rtl;">
                                                {{ TASK_TWO[2].points }}
                                                نقاط</small>
                                            {{ TASK_TWO[2].title }}

                                        </h6>

                                        <div class="radio-group mt-3 d-flex">
                                            <input type="radio" id="yes" :name="TASK_TWO[2].name" class="w-25"
                                                :value="TASK_TWO[2].points" v-model="goldenForm.sleep_amount"
                                                :disabled="isDisabled" />
                                            <label for="yes">6-8 ساعات</label>

                                            <input type="radio" id="s6" value="0" :name="TASK_TWO[2].name" class="w-25"
                                                v-model="goldenForm.sleep_amount" :disabled="isDisabled" />
                                            <label for="s6">أقل من 6 ساعات</label>

                                            <input type="radio" id="s8" value="0" :name="TASK_TWO[2].name" class="w-25"
                                                v-model="goldenForm.sleep_amount" :disabled="isDisabled" />
                                            <label for="s8">اكثر من 8 ساعات</label>
                                        </div>

                                        <!-- brushing_teeth -->
                                        <h6 class="mb-2 text-start h5">
                                            {{ TASK_TWO[3].head_title }}
                                        </h6>

                                        <TaskNotes :virtue_and_evidence="TASK_TWO[3].virtue_and_evidence"
                                            :important_clarifications="TASK_TWO[3].important_clarifications" />
                                        <h6 class="mb-2 text-start h5">
                                            <small class="badge bg-success" style="direction: rtl;">
                                                {{ TASK_TWO[3].points }}
                                                نقاط</small>
                                            {{ TASK_TWO[3].title }}

                                        </h6>

                                        <div class="radio-group mt-3 d-flex">
                                            <input type="radio" id="yes" :name="TASK_TWO[3].name" class="w-25"
                                                :value="TASK_TWO[3].points" v-model="goldenForm.brushing_teeth"
                                                :disabled="isDisabled" />
                                            <label for="yes">نعم مرتين </label>

                                            <input type="radio" id="one" :name="TASK_TWO[3].name" class="w-25"
                                                :value="TASK_TWO[3].points - 1" v-model="goldenForm.brushing_teeth"
                                                :disabled="isDisabled" />
                                            <label for="one">مرة واحدة </label>

                                            <input type="radio" id="no" value="0" :name="TASK_TWO[3].name" class="w-25"
                                                v-model="goldenForm.brushing_teeth" :disabled="isDisabled" />
                                            <label for="no">لا</label>
                                        </div>

                                    </div>

                                    <div class="alert alert-danger" role="alert" v-if="nextStepError">
                                        <small>
                                            {{ nextStepError }}
                                        </small>
                                    </div>

                                    <div class="d-inline-block w-100">
                                        <button type="button" class="ms-3 btn ramadan-btn float-end" @click="goNext()">
                                            التالي
                                        </button>
                                        <button type="button" class="btn ramadan-btn previous float-end"
                                            @click="goPrevious()">
                                            السابق
                                        </button>
                                    </div>
                                </div>
                                <!-- Step 3 -->
                                <div v-if="currentStep === 2" class="form-card">
                                    <div class="form-card form-group">
                                        <h2 class=" text-center mb-3">
                                            الجانب الفكري
                                        </h2>
                                        <hr />
                                        <!-- contemplation_of_allahs_signs -->
                                        <h6 class="mb-2 text-start h5">
                                            {{ TASK_THREE[0].head_title }}
                                        </h6>

                                        <TaskNotes :virtue_and_evidence="TASK_THREE[0].virtue_and_evidence"
                                            :important_clarifications="TASK_THREE[0].important_clarifications" />
                                        <h6 class="mb-2 text-start h5">
                                            <small class="badge bg-success" style="direction: rtl;">
                                                {{ TASK_THREE[0].points }}
                                                نقاط</small>
                                            {{ TASK_THREE[0].title }}

                                        </h6>

                                        <div class="radio-group mt-3 d-flex">
                                            <input type="radio" id="yes" :name="TASK_THREE[0].name" class="w-25"
                                                :value="TASK_THREE[0].points"
                                                v-model="goldenForm.contemplation_of_allahs_signs"
                                                :disabled="isDisabled" />
                                            <label for="yes">نعم</label>

                                            <input type="radio" id="no" value="0" :name="TASK_THREE[0].name"
                                                class="w-25" v-model="goldenForm.contemplation_of_allahs_signs"
                                                :disabled="isDisabled" />
                                            <label for="no">لا</label>
                                        </div>


                                    </div>
                                    <div class="alert alert-danger" role="alert" v-if="nextStepError">
                                        <small>
                                            {{ nextStepError }}
                                        </small>
                                    </div>
                                    <div class="d-inline-block w-100">
                                        <button type="button" class="ms-3 btn ramadan-btn float-end"
                                            @click="submitForm()">
                                            اعتماد
                                        </button>
                                        <button type="button" class="btn ramadan-btn previous float-end"
                                            @click="goPrevious()">
                                            السابق
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </iq-card>

            <statisticsHeader />

            <iq-card class="iq-card statistics-card">
                <div class="col-12 pt-2">
                    <div class="sign-in-from">
                        <h4 class="text-center">
                            عدد الذين أنجزوا يومًا ذهبيًا معنا في شهر رمضان
                            <p class=" ramada-p text-center display-3"> 1</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا عدد (5) أيام رمضانية ذهبية معنا حتى اللحظة
                            <p class=" ramada-p text-center display-3"> 1 </p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا عدد (10) أيام رمضانية ذهبية معنا حتى اللحظة
                            <p class=" ramada-p text-center display-3"> 1</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا عدد (20) أيام رمضانية ذهبية معنا حتى اللحظة
                            <p class=" ramada-p text-center display-3"> 1</p>
                        </h4>


                        <hr>
                        <div class="row">
                            <h5 class="text-center col-6">
                                نقاطك ل، (1) رمضان
                                <p class=" ramada-p text-center display-3"> 1</p>
                            </h5>
                            <h5 class="text-center col-6">
                                أتممت
                                <p class=" ramada-p text-center display-3"> 1</p>
                                يوماً ذهبيا
                            </h5>

                        </div>
                    </div>
                </div>
            </iq-card>
        </div>

    </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import ramadanHeader from "@/components/ramadan/ramadan-header";
import statisticsHeader from "@/components/ramadan/statistics-header";
import helper from "@/utilities/helper";
import { TASK_ONE, TASK_TWO, TASK_THREE } from "@/utilities/ramadanConstants";
import TaskNotes from '@/components/ramadan/task-notes.vue';

export default {
    name: "Golden Day",
    setup() {
        return { v$: useVuelidate() };
    },
    components: {
        ramadanHeader,
        statisticsHeader,
        TaskNotes,
    },
    async created() {
    },
    data() {
        return {
            loader: false,
            currentStep: 0,
            steps: [
                { title: 'الجانب الديني' },
                { title: 'الجانب الصحي' },
                { title: 'الجانب الفكري' },
            ],
            TASK_ONE,
            TASK_TWO,
            TASK_THREE,
            goldenForm: {
                //step1
                ramadan_day_id: 0,
                sunan_al_rawatib: 0,
                tasbeeh: 0,
                istighfar: 0,
                duha_prayer: 0,
                morning_evening_dhikr: 0,
                Shaf_and_witr: 0,
                //step2
                suhoor: 0,
                drink_water: 0,
                sleep_amount: 0,
                brushing_teeth: 0,
                //step 3
                contemplation_of_allahs_signs: 0,
            }, message: "",
            messageVariant: "",
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
        goNext() {
            if (this.currentStep < this.steps.length - 1) {
                this.currentStep++;
                this.toTheTop();
            }
        },
        goPrevious() {
            if (this.currentStep > 0) {
                this.currentStep--;
            }
            this.toTheTop();
        },
        toTheTop() {
            this.$nextTick(() => {
                // Now wait for the transition to finish
                const formContainer = this.$refs.formContainer;
                if (formContainer) {
                    formContainer.addEventListener('transitionend', () => {
                        window.scrollTo(0, formContainer.offsetTop);
                    }, { once: true });
                }
            });
        },

        async submitForm() {
            try {
                console.log('test');

            } catch (error) {
                helper.toggleToast(
                    "حدث خطأ أثناء التحديث, حاول مرة أخرى",
                    "error"
                );
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style>
@import './css/ramadan.css';

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