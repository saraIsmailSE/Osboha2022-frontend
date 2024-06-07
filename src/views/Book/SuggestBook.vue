<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar text-center align-items-center mx-auto">
                <h1 class="text-center mt-3 mb-3">اقترح كتاباً</h1>
            </div>
            <div class="iq-card-body p-4">
                <div class="image-block text-center mt-3">
                    <img class="img-fluid rounded w-75" src="@/assets/images/main/reading_list.png" alt="add-group" />
                </div>
            </div>
            <div class="col-12 bg-white pt-2">
                <div class="alert alert-primary m-auto" style="width: 90%;">
                    <h4 style="direction: rtl;">
                        <strong> ✅ شروط قبول اقتراحك </strong>
                    </h4>
                    <ul>
                        <li>
                            ان يتوفر رابط تحميل للكتاب
                        </li>

                        <li>
                            ان لايكون رواية او خواطر شعرية
                        </li>

                        <li>
                            الا يكون الكتاب ضخم واجزاء عديدة
                        </li>
                    </ul>
                    ⚠️ علماَ أن هناك شروط أخرى يهتم فريق الجودة بالتحقق منها خلال تدقيق ومراجعة الكتاب
                </div>
                <div class="sign-in-from">
                    <form class="mt-2" @submit.prevent="onSubmit()">
                        <small style="color: red">
                            ⚠️ احرص على تعبئة المعلومات الصحيحة ل مساعدتنا
                        </small>

                        <!-- Name -->
                        <div class="form-group mt-2">
                            <h4>* اسم الكتاب</h4>
                            <input type="text" v-model="v$.bookForm.name.$model" class="form-control mb-0 mt-2"
                                id="bookName" placeholder=" اسم الكتاب" />
                            <small style="color: red" v-if="v$.bookForm.name.$error">
                                اسم الكتاب مطلوب</small>
                        </div>

                        <!-- Brief -->
                        <div class="form-group">
                            <h4>
                                <span>*</span> وصف الكتاب
                            </h4>
                            <textarea type="text" v-model="v$.bookForm.brief.$model" class="form-control mb-0 mt-2"
                                id="bookDescription" placeholder="وصف الكتاب " :style="{
                                    'padding-right': '1rem !important',
                                }" style="
                    direction: rtl;
                    max-height: 120px;
                    resize: none;
                    overflow: auto;
                  " :rows="1" ref="bodyRef" />
                            <small style="color: red" v-if="v$.bookForm.brief.$error">وصف الكتاب مطلوب</small>
                        </div>


                        <!-- Publisher -->
                        <div class="form-group">
                            <h4>
                                <span>*</span> دار النشر
                            </h4>
                            <input type="text" v-model="v$.bookForm.publisher.$model" class="form-control mb-0 mt-2"
                                id="bookPublisher" placeholder="دار النشر " />
                            <small style="color: red" v-if="v$.bookForm.publisher.$error">دار النشر مطلوبة</small>
                        </div>

                        <div class="form-group">
                            <h4>
                                رابط الكتاب
                                <span class="text-danger">(ان وجد)</span>
                            </h4>
                            <input type="url" v-model="v$.bookForm.link.$model" class="form-control mb-0 mt-2"
                                id="bookLink" placeholder="رابط الكتاب " />
                            <small style="color: red" v-if="v$.bookForm.link.$error">رابط الكتاب مطلوب</small>
                        </div>

                        <!-- Book Section -->
                        <div class="form-group col-12">
                            <h4> قسم الكتاب
                                <span>*</span>
                            </h4>
                            <select class="form-select mt-2" data-trigger name="section" id="section"
                                v-model="v$.bookForm.section_id.$model">
                                <option value="0" selected>اختر قسم الكتاب</option>
                                <option v-for="section in sections" :key="section.id" :value="section.id">
                                    {{ section.section }}
                                </option>
                            </select>
                            <small style="color: red" v-if="v$.bookForm.section_id.$error">قسم الكتاب مطلوب</small>
                        </div>

                        <!-- Book Language -->
                        <div class="form-group col-12">
                            <h4>
                                لغة الكتاب
                                <span>*</span>
                            </h4>
                            <select class="form-select mt-2" data-trigger name="section" id="section"
                                v-model="v$.bookForm.language_id.$model">
                                <option value="0" selected>اختر لغة الكتاب</option>
                                <option v-for="language in languages" :key="language.id" :value="language.id">
                                    {{ LANUAGES[language.language] }}
                                </option>
                            </select>
                            <small style="color: red" v-if="v$.bookForm.language_id.$error">لغة الكتاب مطلوبة</small>

                        </div>

                        <p class="text-center my-2" style="color: red" v-if="message">
                            {{ message }}
                        </p>
                        <div class="col-sm-12 text-center" v-if="loading">
                            <p class="text-center">جاري حفظ الاقتراح</p>
                            <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                        </div>
                        <div class="d-inline-block w-100" v-else>
                            <button type="submit" class="btn btn-primary float-end" :disabled="loading">
                                حفظ الاقتراح
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </iq-card>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import bookService from "@/API/services/book.service";
import languages from "@/API/services/language.service";
import sections from "@/API/services/sectionService";
import { LANUAGES, } from "@/utilities/constants";


const greaterThanZero = (value) => value > 0;

export default {
    name: "Create Book",
    setup() {
        return { v$: useVuelidate() };
    },

    async created() {
        this.sections = await sections.getAll();
        this.sections = this.sections.data;
        this.languages = await languages.getAll();
    },
    watch: {
        bookBrief() {
            this.$refs.bodyRef.style.height = "auto";
            this.$nextTick(() => {
                this.$refs.bodyRef.style.height =
                    this.$refs.bodyRef.scrollHeight + "px";
            });
        },
    },
    data() {
        return {
            sections: [],
            languages: [],
            LANUAGES,
            bookForm: {
                book_media: null,
                name: "",
                publisher: "",
                brief: "",
                link: "",
                section_id: 0,
                language_id: 0,
            },
            message: "",
            loading: false,
        };
    },
    validations() {
        return {
            bookForm: {
                name: {
                    required,
                },
                publisher: {
                    required
                },
                brief: {
                    required
                },
                link: {
                    required
                },
                language_id: {
                    required,
                    maxValue: greaterThanZero,
                },
                section_id: {
                    required,
                    maxValue: greaterThanZero,
                },
            },
        };
    },
    methods: {
        async onSubmit() {
            this.v$.$touch();
            if (!this.v$.bookForm.$invalid) {
                this.loading = true;
                try {
                    const newBook = await bookService.suggest(this.bookForm);
                    this.message = " تم حفظ الاقتراح - سيتم تحويلك لصفحة الكتاب";
                    setTimeout(() => {
                        this.$router.push({ name: 'book.book-details', params: { book_id: this.book_id } })
                    }, 3000);
                } catch (error) {
                    this.message = "حصل خطأ - لم يتم حفظ الاقتراح!";
                    console.log(error);
                } finally {
                    this.loading = false;
                }
            }
        },
    },
};
</script>