<template>
    <div class="col-12 bg-white pt-2">
        <table class="table table-striped" style="margin-top: 1rem;">
            <thead>
                <tr>
                    <th scope="col">الاسبوع</th>
                    <th scope="col">مشاركة بالانشطة</th>
                    <th scope="col">دورة القيادة</th>
                    <th scope="col">توثيق كتاب جيد جداً فأكثر </th>
                    <th scope="col"> توثيق كتاب اقل من جيد جداَ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in current_bonus_points" :key="index">
                    <td>{{ row.week ? row.week.title : "غير محدد" }}</td>
                    <td>{{ row.activity || '0' }}</td>
                    <td>{{ row.leading_course || '0' }}</td>
                    <td>{{ row.eligible_book || '0' }}</td>
                    <td>{{ row.eligible_book_less_VG || '0' }}</td>
                    <td>
                        <span class="material-symbols-outlined align-middle" role="button"
                            @click="subtractPoints(row.id)">
                            arrow_cool_down
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>


        <div class="sign-in-from">
            <form class="mt-2" @submit.prevent="onSubmit()">
                <div class="form-group">

                    <div class="form-group"
                        v-if="current_marathon.marathon_weeks && current_marathon.marathon_weeks.length > 0">
                        <select class="form-select" data-trigger name="choices-single-default"
                            id="choices-single-default" v-model="bonusForm.week_key">
                            <option value="" selected>الاسبوع ... </option>
                            <option v-for=" marathon_week in current_marathon.marathon_weeks" :key="marathon_week"
                                :value="marathon_week.week_key">
                                {{ marathon_week.week_title }}
                            </option>
                        </select>
                        <small style="color: red" v-if="v$.bonusForm.week_key.$error">يجب اختيار الاسبوع</small>
                    </div>
                    <select class="form-select" data-trigger name="choices-single-default" id="choices-single-default"
                        v-model="bonusForm.bonus_type" @change="handleBonusTypeChange">
                        <option value="" selected>اختر ... </option>
                        <option value="activity">مشاركة في نشاط</option>
                        <option value="leading_course">دورة القادة</option>
                        <option value="eligible_book">توثيق كتاب </option>
                    </select>
                    <small style="color: red" v-if="v$.bonusForm.bonus_type.$error">يجب اختيار نوع الاعتماد</small>

                </div>

                <div class="form-group" v-if="activities">
                    <input type="text" class="form-control mb-0" id="number_of_activites" placeholder=" عدد الأنشطة"
                        v-model="bonusForm.amount" />
                </div>

                <div v-if="eligible_book_avg">
                    <div class="form-group">
                        <select class="form-control" name="eligible_book_avg" id="eligible_book_avg"
                            v-model="bonusForm.eligible_book_avg">
                            <option value="" selected>اختر تقييم الكتاب</option>
                            <option value="vg_above">جيد جدا فما فوق</option>
                            <option value="vg_less">اقل من جيد جدا </option>
                        </select>
                        <small style="color: red" v-if="v$.bonusForm.eligible_book_avg.$error">يجب اختيار تقييم
                            الكتاب</small>
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control mb-0" id="number_of_books" placeholder=" عدد الكتب "
                            v-model="bonusForm.amount" />
                    </div>
                </div>

                <p class="text-center my-2" style="color: red" v-if="message">
                    {{ message }}
                </p>
                <div class="col-sm-12 text-center" v-if="loading">
                    <p class="text-center">جاري الاعتماد</p>
                    <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                </div>
                <div class="d-inline-block w-100" v-else>
                    <button type="submit" class="btn btn-primary float-end" :disabled="loading">
                        اعتماد
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, requiredIf } from "@vuelidate/validators";
import helper from "@/utilities/helper";
import MarathonPoints from "@/API/MarathonServices/marathon-points.service";

export default {
    name: "Add Extra Points",
    setup() {
        return { v$: useVuelidate() };
    },
    async created() {
        this.current_bonus_points = await MarathonPoints.getBonusPoints(this.$route.params.user_id, this.$route.params.marathon_id)
    },
    props: {
        current_marathon: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            current_bonus_points: null,
            bonusForm: {
                osboha_marthon_id: this.$route.params.marathon_id,
                user_id: this.$route.params.user_id,
                bonus_type: "",
                week_key: "",
                amount: 1,
                eligible_book_avg: '',
            },
            eligible_book_avg: false,
            activities: false,
            message: "",
            loading: false,
        };
    },
    methods: {
        handleBonusTypeChange(event) {
            this.activities = false;
            this.eligible_book_avg = false;
            const selectedValue = event.target.value;

            if (selectedValue === 'activity') {
                this.activities = true;
            }
            else if (selectedValue === 'eligible_book') {
                this.eligible_book_avg = true;
            }
        },
        async onSubmit() {
            this.v$.$touch();
            if (!this.v$.bonusForm.$invalid) {
                this.loading = true;
                try {
                    const response = await MarathonPoints.addBonus(this.bonusForm);
                    this.current_bonus_points = response;
                    this.message = "تم الاعتماد";
                    this.v$.bonusForm.$reset();
                    this.bonusForm = {
                        osboha_marthon_id: this.$route.params.marathon_id,
                        user_id: this.$route.params.user_id,
                        bonus_type: "",
                        week_key: "",
                        amount: 1,
                        eligible_book_avg: '',
                    };
                    this.activities = false;
                    this.eligible_book_avg = false;

                    helper.toggleToast(
                        "تم الاعتماد",
                        "success",
                    );
                    this.$emit('bonus-added')

                    setTimeout(() => {
                        this.message = "";
                    }, 3000);
                } catch (error) {
                    this.message = "حصل خطأ - لم يتم الاعتماد!";
                    helper.toggleToast(
                        "حصل خطأ - لم يتم الاعتماد!",
                        "danger",
                    );

                    console.log(error.response.data);
                } finally {
                    this.loading = false;
                }
            }
        },
        async subtractPoints(bonus_id) {
            try {
                const form = {
                    osboha_marthon_id: this.$route.params.marathon_id,
                    user_id: this.$route.params.user_id,
                    bonus_id: bonus_id,
                };
                const response = await MarathonPoints.subtractPoints(form);
                this.current_bonus_points = response;
                helper.toggleToast(
                    "تم الخصم",
                    "success",
                );
                this.$emit('bonus-added')

                setTimeout(() => {
                    this.message = "";
                }, 3000);
            } catch (error) {
                this.message = "حصل خطأ - لم يتم الخصم!";
                helper.toggleToast(
                    "حصل خطأ - لم يتم الخصم!",
                    "danger",
                );

                console.log(error.response.data);
            }

        },

    },
    validations() {
        return {
            bonusForm: {
                week_key: {
                    required,
                },
                bonus_type: {
                    required,
                },
                eligible_book_avg: {
                    required: requiredIf(function () {
                        return this.bonusForm.bonus_type == "eligible_book";
                    }),
                },
            },
        };
    },
    computed: {
        shouldShowTable() {
            if (this.current_bonus_points) {
                return this.current_bonus_points.activity > 0 ||
                    this.current_bonus_points.leading_course > 0 ||
                    this.current_bonus_points.eligible_book > 0 ||
                    this.current_bonus_points.eligible_book_less_VG > 0;
            }
            return false;
        }
    }
};
</script>