<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3" v-if="hadith">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">الحديث {{ hadith.hadith_title }}</h1>
                </div>
                <h2 class="text-center mt-1 mb-3">{{ hadith.ramadan_day.day }} ~ رمضان </h2>

                <div v-if="isHadithActive">
                    <img :src="imagePath(hadith.image)" alt="ramadan-footer" class="img-fluid p-2"
                        v-if="(!form.hadith_1 && !form.hadith_2) || !form.hadith_redo || isAccepted" />
                    <img src="@/assets/images/ramadan/night-prayer.png" alt="ramadan-footer" class="img-fluid" v-else />

                    <p class=" ramada-p h5 text-center mt-2 p-2"
                        v-if="(!form.hadith_1 && !form.hadith_2) || !form.hadith_redo || isAccepted">
                        {{ hadith.hadith }}
                    </p>
                    <div class="col-12 pt-2">
                        <div class="sign-in-from">
                            <form class="mt-2" @submit.prevent="onSubmit()">
                                <div class="form-group">
                                    <label for="role">المرة الأولى</label>
                                    <textarea name="hadith_1" class="form-control" id="hadith_1" rows="5"
                                        required="required" v-model="form.hadith_1" @paste="handlePaste"
                                        :disabled="isDisabled"></textarea>
                                    <small style="color: red" v-if="v$.form.hadith_1.$error">
                                        الاجابة مطلوبة
                                    </small>

                                </div>
                                <div class="form-group">
                                    <label for="role">المرة الثانية</label>
                                    <textarea name="hadith_2" class="form-control" id="hadith_2" rows="5"
                                        required="required" v-model="form.hadith_2" @paste="handlePaste"
                                        :disabled="isDisabled"></textarea>

                                    <div v-if="v$.form.hadith_2.$error">
                                        <small style="color: red" v-if="v$.form.hadith_2.required.$invalid">
                                            الاجابة مطلوبة
                                        </small>
                                        <br />
                                        <small style="color: red" v-if="v$.form.hadith_2.sameAsHadith1.$invalid">
                                            يجب أن تكون الاجابة مطابقة لكتابتك للحديث الأول
                                        </small>
                                    </div>
                                </div>
                                <div class="col-sm-12 text-center" v-if="loader && submitType == 'normal'">
                                    <img src="@/assets/images/gif/page-load-loader.gif" alt="loader"
                                        style="height: 100px" />
                                </div>
                                <div class="alert alert-danger p-1 m-2 text-center" role="alert" v-if="isDisabled">
                                    <h6 class="text-center">
                                        قمت بتسليم هذا الحديث
                                    </h6>
                                </div>
                                <div class="d-inline-block w-100" v-else>
                                    <button type="submit" class="btn ramadan-btn float-end" :disabled="loader">
                                        وثق حفظك
                                    </button>
                                </div>
                            </form>
                        </div>
                        <hr />
                        <h4 class="mb-2 p-2" v-if="hadith.memorization.length > 0">
                            <p class="text-center display-4">نقاطك {{ hadith.memorization[0].points }}</p>
                            <p>حالة اجابتك</p>
                            {{ hadith.memorization[0].reviews }}
                            <small class="badge bg-success">{{ ACTIVITIES_STATUS[hadith.memorization[0].status]
                                }}</small>

                            <form class="mt-2" @submit.prevent="onSubmit()"
                                v-if="hadith.memorization[0].status == 'redo'">
                                <div class="form-group">
                                    <label for="role">أعد كتابة الحديث هنا</label>
                                    <textarea name="hadith_redo" class="form-control" id="hadith_redo" rows="5"
                                        required="required" v-model="form.hadith_redo" @paste="handlePaste"></textarea>
                                    <small style="color: red" v-if="v$.form.hadith_redo.$error">
                                        الاجابة مطلوبة
                                    </small>

                                </div>
                                <div class="col-sm-12 text-center" v-if="loader && submitType == 'redo'">
                                    <img src="@/assets/images/gif/page-load-loader.gif" alt="loader"
                                        style="height: 100px" />
                                </div>
                                <div class="d-inline-block w-100" v-else>
                                    <button type="submit" class="btn ramadan-btn float-end" :disabled="loader">
                                        وثق اعادة حفظك
                                    </button>
                                </div>
                            </form>


                        </h4>

                    </div>
                </div>

                <div class="alert alert-danger p-1 m-2 text-center" role="alert" v-else>
                    <h6 class="text-center">
                        هذا الحديث غير مُتاح الأن
                    </h6>
                </div>
            </iq-card>

            <statisticsHeader />

            <iq-card class="iq-card statistics-card">
                <div class="col-12 pt-2">
                    <div class="sign-in-from">
                        <h4 class="text-center">
                            عدد الذين يقومون بحفظ الأحاديث معنا في شهر رمضان
                            <p class=" ramada-p text-center display-3"> {{statistics.usersCount}}</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا حفظ (5) من أحاديث النبيﷺ حتى اللحظة
                            <p class=" ramada-p text-center display-3"> {{statistics.usersCount5}}</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا حفظ (15) من أحاديث النبي ﷺ حتى اللحظة
                            <p class=" ramada-p text-center display-3"> {{statistics.usersCount15}}</p>
                        </h4>
                        <h4 class="text-center">
                            عدد الذين أتموا حفظ (25) من أحاديث النبي ﷺ حتى اللحظة
                            <p class=" ramada-p text-center display-3"> {{statistics.usersCount25}}</p>
                        </h4>

                        <hr>
                        <div class="row">
                            <h5 class="text-center col-6">
                                نقاطك ل، (1) رمضان
                                <p class=" ramada-p text-center display-3"> 1</p>
                            </h5>
                            <h5 class="text-center col-6">
                                أتممت حفظ
                                <p class=" ramada-p text-center display-3"> 1</p>
                            </h5>

                        </div>

                        <p class=" ramada-p text-center h5">
                            من أهم أبواب الدفاع عن النبي صلى الله عليه وسلم، هو حفظ سنته في الصدور
                            لا تجعل الآخرين يسبقونك إلى الدفاع عن نبيك صلى الله عليه وسلم
                        </p>
                    </div>
                </div>
            </iq-card>
        </div>

    </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, requiredIf, sameAs } from "@vuelidate/validators";
import ramadanHeader from "@/components/ramadan/ramadan-header";
import helper from "@/utilities/helper";
import statisticsHeader from "@/components/ramadan/statistics-header";
import { ACTIVITIES_STATUS } from "@/utilities/constants";
import HadithServices from "@/API/RamadanServices/hadith.service";
import HadithMemorizationServices from "@/API/RamadanServices/hadithMemorization.service";
import ramadanDaysService from "@/API/RamadanServices/ramadanDays.service";
import hadithMemorizationService from "../../API/RamadanServices/hadithMemorization.service";

export default {
    name: "Ramadan Night Prayer",
    setup() {
        return { v$: useVuelidate() };
    },
    components: {
        ramadanHeader,
        statisticsHeader,
    },

    async created() {
        this.current_day = await ramadanDaysService.current();
        this.hadith = await HadithServices.show(this.$route.params.hadith_id)
        this.setHadithForm(this.hadith);
    },
    data() {
        return {
            loader: false,
            ACTIVITIES_STATUS,
            statistics: [],
            current_day: null,
            hadith: null,
            form: {
                ramadan_hadiths_id: this.$route.params.hadith_id,
                hadith_1: '',
                hadith_2: '',
                hadith_redo: '',
            },
        };
    },
    validations() {
        return {
            form: {
                hadith_1: {
                    required: requiredIf(function () {
                        return (!this.hadith || (this.hadith.status == 'pending'))
                    })
                },
                hadith_2: {
                    required,
                    sameAsHadith1: sameAs(this.form.hadith_1)
                },
                hadith_redo: {
                    required: requiredIf(function () {
                        return (this.hadith && (this.hadith.status == 'redo'))
                    })

                },

            },
        };
    },
    methods: {
        handlePaste(event) {
            // Prevent the default paste behavior
            event.preventDefault();
        },
        imagePath(imageName) {
            return require(`@/assets/images/ramadan/${imageName}`);
        },
        async setHadithForm(hadith) {
            if (hadith.memorization.length > 0) {
                this.form.hadith_1 = hadith.memorization[0].hadith_memorize;
                this.form.hadith_2 = hadith.memorization[0].hadith_memorize;
            }
            //get new statistics
            this.statistics = await hadithMemorizationService.statistics();

        },
        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {

                    const response = await HadithMemorizationServices.store(this.form, this.submitType);
                    this.setHadithForm(response);
                    helper.toggleToast(
                        "تم التوثيق",
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
    computed: {
        isHadithActive() {
            const now = new Date();
            const localTime = now.toLocaleString("en-US", { timeZone: "Asia/Riyadh" });
            const currentDateTime = new Date(localTime);
            const targetDateTime = new Date(this.hadith.ramadan_day.created_at);
            targetDateTime.setHours(targetDateTime.getHours() + 4);


            // Check if current_day.is_active is 1
            // Check if ramadan_day.id of the hadith is less than or equal to current_day.id
            // Check if the time associated with the hadith is greater than 10 am KSA time
            if (this.current_day.is_active &&
                this.hadith.ramadan_day.id <= this.current_day.id &&
                currentDateTime >= targetDateTime) { // Extracting hours from time and comparing
                return true;
            } else {
                return false;
            }
        },
        isDisabled() {
            if (this.hadith.memorization.length > 0) {
                return this.hadith.memorization[0].status != 'pending'
            }
            else {
                return false;
            }
        },
        isAccepted() {
            if (this.hadith.memorization.length > 0) {
                return this.hadith.memorization[0].status == 'accepted'
            }
            else {
                return false;
            }
        },
        submitType() {
            if (this.hadith.memorization.length > 0 && this.hadith.memorization[0].status == 'redo') {
                return 'redo'
            }
            else {
                return 'normal';
            }
        }
    }

};
</script>

<style>
@import './css/ramadan.css';
</style>