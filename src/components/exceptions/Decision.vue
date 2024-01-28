<template>
    <div v-if="authInGroup && authInGroup.user_type != 'ambassador'">
        <h3 class="text-center mt-3 mb-3">الاجراء المناسب</h3>

        <div v-if="exception.status == 'pending'">
            <div class="form-group text-start ms-3">
                <h4 class="mt-3 mb-3">اختر الأسبوع</h4>
                <div class="form-check form-check-inline" v-for="week in weeks" :key="week.id">
                    <input class="form-check-input" type="radio" name="weeks" id="currentWeek" v-model="selectedWeek"
                        :value="`${week.id}`" @change="() => { selectedWeekError = ''; selectedWeekTitle = week.title }" />
                    <label class="form-check-label fs-4" for="currentWeek">{{ week.title }}</label>
                </div>

                <small style="color: red" v-if="selectedWeekError">
                    * {{ selectedWeekError }}
                </small>
            </div>

            <div class="d-flex align-items-center mt-3" v-if="exception.type.type != 'تجميد استثنائي'">
                <form @submit.prevent="submitDecision" class="post-text m-auto w-100 row">
                    <div class="form-group col-12">
                        <select class="form-select" v-model="v$.decideForm.decision.$model"
                            :disabled="message || !selectedWeek">
                            <option value="-1" selected>اختر الاجراء المناسب</option>
                            <option value="1">اعفاء الأسبوع {{ selectedWeekTitle }}</option>
                            <option value="2">اعفاء الأسبوع القادم [يأتي بعد {{ selectedWeekTitle }} ] </option>
                            <option value="3">
                                اعفاء الأسبوعين [ {{ selectedWeekTitle }} + الذي يليه]
                            </option>
                            <option value="0">رفض</option>
                        </select>
                        <small style="color: red" v-if="v$.decideForm.decision.$error">
                            هذا الخيار مطلوب
                        </small>
                    </div>
                    <div class="form-group col-12">
                        <label class="form-label" for="note">ملاحظاتك</label>
                        <textarea v-model="v$.decideForm.note.$model" rows="5" placeholder="... اكتب ملاحظة"
                            class="rounded form-control" id="note" :disabled="message"></textarea>
                        <small style="color: red" v-if="v$.decideForm.note.$error">
                            * ملاحظاتك مطلوبة
                        </small>
                    </div>

                    <div class="form-group">
                        <button type="submit" :disabled="message" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                            اعتماد
                        </button>
                    </div>

                    <div class="col-sm-12 text-center" v-if="loader">
                        <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                    </div>
                    <h4 class="text-center mt-3 mb-3" v-if="message">
                        {{ message }}
                    </h4>
                </form>
            </div>
            <div class="d-flex align-items-center mt-3" v-else-if="exception.type.type == 'تجميد استثنائي' &&
                authInGroup &&
                (authInGroup.user_type == 'admin' || authInGroup.user_type == 'consultant' ||
                    authInGroup.user_type == 'advisor')
                ">
                <form @submit.prevent="submitDecision" class="post-text m-auto w-100 row">
                    <div class="form-group col-12">
                        <select class="form-select" v-model="v$.decideForm.decision.$model"
                            :disabled="message || !selectedWeek">
                            <option value="-1" selected>اختر الاجراء المناسب</option>
                            <option value="1">اعفاء الأسبوع {{ selectedWeekTitle }}</option>
                            <option value="2">اعفاء الأسبوع القادم [يأتي بعد {{ selectedWeekTitle }} ] </option>
                            <option value="3">
                                اعفاء الأسبوعين [ {{ selectedWeekTitle }} + الذي يليه]
                            </option>
                            <option value="4">
                                اعفاء ثلاثة أسابيع [ {{ selectedWeekTitle }} + القادم + الذي يليه]
                            </option>
                            <option value="0">رفض</option>
                        </select>
                        <small style="color: red" v-if="v$.decideForm.decision.$error">
                            هذا الخيار مطلوب
                        </small>
                    </div>
                    <div class="form-group col-12">
                        <label class="form-label" for="note">ملاحظاتك</label>
                        <textarea v-model="v$.decideForm.note.$model" rows="5" placeholder="... اكتب ملاحظة"
                            class="rounded form-control" id="note" :disabled="message"></textarea>
                        <small style="color: red" v-if="v$.decideForm.note.$error">
                            * ملاحظاتك مطلوبة
                        </small>
                    </div>

                    <div class="form-group">
                        <button type="submit" :disabled="message" class="btn d-block btn-primary mt-3 w-75 mx-auto">
                            اعتماد
                        </button>
                    </div>

                    <div class="col-sm-12 text-center" v-if="loader">
                        <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                    </div>
                    <h4 class="text-center mt-3 mb-3" v-if="message">
                        {{ message }}
                    </h4>
                </form>
            </div>
            <div class="d-inline-flex justify-content-center alert alert-success mt-2 w-75" v-else>
                <h5>يتطلب هذا الاجراء موافقة موجه المجموعة</h5>
            </div>
        </div>

        <div class="d-inline-flex justify-content-center alert alert-success mt-2 w-75" v-else>
            <h5>تم اتخاذ الاجراء مسبقًا</h5>
            <hr />
        </div>
    </div>
</template>
<script>
import exceptionService from "@/API/services/user-exception.service";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import helper from "@/utilities/helper";

const greaterThanMinusOne = (value) => value > -1;

export default {
    name: "Exception Decision",
    setup() {
        return { v$: useVuelidate() };
    },
    props: {
        exception: { type: Object },
        authInGroup: { type: Object },
        weeks: { type: Object },
    },
    data() {
        return {
            decideForm: {
                note: "",
                decision: -1,
                week_id: 0,
            },
            message: null,
            loader: false,
            selectedWeek: null,
            selectedWeekError: "",
            selectedWeekTitle: '',
        };
    },
    computed: {
        auth() {
            return this.$store.getters.getUser;
        },
    },
    validations() {
        return {
            decideForm: {
                note: {
                    required,
                    minLength: minLength(10),
                    maxLength: maxLength(250),
                },
                decision: {
                    required,
                    maxValue: greaterThanMinusOne,
                },
            },
        };
    },
    methods: {
        ...helper,
        async submitDecision() {
            this.selectedWeekError = "";
            if (this.selectedWeek) {
                this.v$.$touch();
                if (!this.v$.decideForm.$invalid) {
                    this.message = "";
                    this.loader = true;
                    try {
                        this.decideForm.week_id = this.selectedWeek;
                        const response = await exceptionService.updateStatus(
                            this.exception.id,
                            this.decideForm,
                        );
                        this.loader = false;
                        this.message = response;
                        helper.toggleToast(this.message, "success");
                        this.$emit("update_exception");

                        this.v$.decideForm.$reset();
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else {
                this.selectedWeekError = "يجب اختيار الأسبوع";
            }
        },
    },
};
</script>
  