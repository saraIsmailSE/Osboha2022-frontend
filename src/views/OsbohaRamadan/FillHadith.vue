<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">الحديث الشريف</h1>
                </div>
                <h2 class="text-center mt-1 mb-3">1 ~ رمضان </h2>
                <img src="@/assets/images/ramadan/hadith_33.png" alt="ramadan-footer" class="img-fluid p-2"
                    v-if="(!form.hadith_1 && !form.hadith_2)" />
                <img src="@/assets/images/ramadan/night-prayer.png" alt="ramadan-footer" class="img-fluid" v-else />

                <p class=" ramada-p h5 text-center mt-2" v-if="(!form.hadith_1 && !form.hadith_2)">
                    قال رسول الله ﷺ: (مَن قامَ بعَشرِ آياتٍ لم يُكتَبْ مِن الغافِلينَ، ومَن قامَ بمئةِ آيةٍ كُتِبَ
                    مِن القانِتينَ، ومَن قامَ بألْفِ آيةٍ كُتِبَ مِن المُقَنطِرينَ)
                </p>
                <div class="col-12 pt-2">
                    <div class="sign-in-from">
                        <form class="mt-2" @submit.prevent="onSubmit()">
                            <div class="form-group">
                                <label for="role">المرة الأولى</label>
                                <textarea name="hadith_1" class="form-control" id="hadith_1" rows="5"
                                    required="required" v-model="form.hadith_1" @paste="handlePaste"></textarea>
                                <small style="color: red" v-if="v$.form.hadith_1.$error">
                                    الاجابة مطلوبة
                                </small>

                            </div>
                            <div class="form-group">
                                <label for="role">المرة الثانية</label>
                                <textarea name="hadith_2" class="form-control" id="hadith_2" rows="5"
                                    required="required" v-model="form.hadith_2" @paste="handlePaste"></textarea>
                                <small style="color: red" v-if="v$.form.hadith_2.$error">
                                    الاجابة مطلوبة
                                </small>
                            </div>
                            <div class="form-group text-center" v-if="message">
                                <small :style="{
                        color: messageVariant === 'success' ? 'green' : 'red',
                    }">
                                    {{ message }}
                                </small>
                            </div>
                            <div class="col-sm-12 text-center" v-if="loader">
                                <img src="@/assets/images/gif/page-load-loader.gif" alt="loader"
                                    style="height: 100px" />
                            </div>
                            <div class="d-inline-block w-100" v-else>
                                <button type="submit" class="btn ramadan-btn float-end" :disabled="loader">
                                    وثق حفظك
                                </button>
                            </div>
                        </form>
                    </div>
                    <hr />
                    <h4 class="mb-2 p-2">
                        تصحيح الحديث
                        <small class="badge bg-success">بحاجة لاعادة</small>

                        <form class="mt-2" @submit.prevent="onSubmit()">
                            <div class="form-group">
                                <label for="role">أعد كتابة الحديث هنا</label>
                                <textarea name="hadith_redo" class="form-control" id="hadith_redo" rows="5"
                                    required="required" v-model="form.hadith_redo" @paste="handlePaste"></textarea>
                                <small style="color: red" v-if="v$.form.hadith_redo.$error">
                                    الاجابة مطلوبة
                                </small>

                            </div>
                            <div class="form-group text-center" v-if="message">
                                <small :style="{
                        color: messageVariant === 'success' ? 'green' : 'red',
                    }">
                                    {{ message }}
                                </small>
                            </div>
                            <div class="col-sm-12 text-center" v-if="loader">
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
            </iq-card>

            <statisticsHeader />

            <iq-card class="iq-card statistics-card">
                <div class="col-12 pt-2">
                    <div class="sign-in-from">
                        <h4 class="text-center">
                            عدد الذين يقومون بحفظ الأحاديث معنا في شهر رمضان
                            <p class=" ramada-p text-center display-3"> 1</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا حفظ (5) من أحاديث النبيﷺ حتى اللحظة
                            <p class=" ramada-p text-center display-3"> 1</p>
                        </h4>

                        <h4 class="text-center">
                            عدد الذين أتموا حفظ (15) من أحاديث النبي ﷺ حتى اللحظة
                            <p class=" ramada-p text-center display-3"> 1</p>
                        </h4>
                        <h4 class="text-center">
                            عدد الذين أتموا حفظ (25) من أحاديث النبي ﷺ حتى اللحظة
                            <p class=" ramada-p text-center display-3"> 1</p>
                        </h4>

                        <hr>
                        <div class="row">
                            <h5 class="text-center col-6">
                                نقاطك ل، (1) رمضان
                                <p class=" ramada-p text-center display-3"> 1</p>
                            </h5>
                            <h5 class="text-center col-6">
                                أتممت قيام
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
import { required } from "@vuelidate/validators";
import ramadanHeader from "@/components/ramadan/ramadan-header";
import statisticsHeader from "@/components/ramadan/statistics-header";

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
    },
    data() {
        return {
            loader: false,
            form: {
                hadith_1: '',
                hadith_2: '',
                hadith_redo: '',
            },
            message: "",
            messageVariant: "",
        };
    },
    validations() {
        return {
            form: {
                hadith_1: {
                    required,
                },
                hadith_2: {
                    required,
                },
                hadith_redo: {

                }
            },
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
        handlePaste(event) {
            // Prevent the default paste behavior
            console.log("🚀 ~ handlePaste ~ preventDefault:", ' NOT ALLOWED')
            event.preventDefault();
        },

        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {
                    this.message = "";
                } catch (error) {
                    this.message = "حدث خطأ, يرجى المحاولة لاحقاً";
                    this.messageVariant = "danger";
                } finally {
                    this.loader = false;
                }
            }
        },
    },
};
</script>

<style >
@import './css/ramadan.css';
</style>