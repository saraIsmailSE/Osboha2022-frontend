<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">
                        سؤال رقم
                        <small class="badge bg-warning">فئة السؤال</small>

                    </h1>

                </div>
                <h6 class=" h5 text-center mt-2">
                    نص السؤال
                </h6>
                <hr />

                <div class="col-12 pt-2">
                    <h4 class="mb-2 p-2">
                        اسم المشارك
                        <small class="badge bg-warning">بحاجة لمراجعة</small>

                    </h4>
                    <h6 class="mb-2 p-2">
                        الاجابة
                    </h6>

                </div>

                <template v-slot:headerTitle>
                    <h4 class="card-title">تم التصحيح </h4>
                </template>

                <template v-slot:body>
                    <TimeLine :items="[
                        {
                            color: 'primary',
                            title: `الحالة ~ اسم المصحح`,
                            description: 'الملاحظات ',
                            child: {
                                type: 'img',
                                items: [
                                ]
                            }
                        },

                    ]" />
                </template>

                <div class="sign-in-from">

                    <form class="mt-2" @submit.prevent="onSubmit()">
                        <div class="form-group">
                            <label for="status">الاجراء</label>
                            <select v-model="v$.form.status.$model" class="form-select" data-trigger name="status"
                                id="status">
                                <option value="0" selected>اختر الاجراء</option>
                                <option value="accepted">مقبول</option>
                                <option value="rejected">مرفوض</option>
                            </select>
                            <small style="color: red" v-if="v$.form.status.$error">
                                الاجراء مطلوبة
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="reviwes">ملاحظاتك</label>
                            <textarea name="hadith_1" class="form-control" id="hadith_1" rows="5" required="required"
                                v-model="form.reviews"></textarea>
                            <small style="color: red" v-if="v$.form.reviews.$error">
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
                            <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                        </div>
                        <div class="d-inline-block w-100" v-else>
                            <button type="submit" class="btn ramadan-btn float-end" :disabled="loader">
                                اعتماد
                            </button>
                        </div>
                    </form>
                </div>



                <div class="d-inline-block w-100 text-center col-12">
                    <router-link :to="{ name: 'ramadan.correctors-questions-list', }"
                        class="d-block mt-3 mb-3 w-75 mx-auto">
                        <span class="back-btn">عودة</span>
                        <span class="align-middle material-symbols-outlined ">
                            keyboard_return
                        </span>
                    </router-link>
                </div>
            </iq-card>


        </div>

    </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import ramadanHeader from "@/components/ramadan/ramadan-header";

export default {
    name: "Ramadan Night Prayer",
    setup() {
        return { v$: useVuelidate() };
    },
    components: {
        ramadanHeader,
    },

    async created() {
    },
    data() {
        return {
            loader: false,
            form: {
                status: 0,
                reviews: '',
            },
            message: "",
            messageVariant: "",
        };
    },
    validations() {
        return {
            form: {
                status: {
                    required,
                },
                reviews: {
                    required,
                },
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

<style>
@import '../css/ramadan.css';
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