<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3" v-if="memorizedHadith">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">الحديث {{ memorizedHadith.hadith.hadith_title }}</h1>
                </div>
                <div>
                    <img :src="imagePath(memorizedHadith.hadith.image)" alt="ramadan-footer" class="img-fluid p-2" />
                    <p class=" ramada-p h5 text-center mt-2 p-2">
                        {{ memorizedHadith.hadith.hadith }}
                    </p>

                </div>
                <hr />

                <div class="col-12 pt-2">
                    <h4 class="mb-2 p-2">
                        {{ memorizedHadith.user.name }}
                        <small class="badge bg-warning">{{ ACTIVITIES_STATUS[memorizedHadith.status] }}</small>

                    </h4>
                    <h6 class="mb-2 p-2">
                        {{ memorizedHadith.hadith_memorize }}
                    </h6>

                </div>

                <template v-slot:headerTitle v-if="memorizedHadith.reviewer">
                    <h4 class="card-title">تم التصحيح </h4>
                </template>

                <template v-slot:body v-if="memorizedHadith.reviewer">
                    <TimeLine :items="[
            {
                color: 'primary',
                title: `${ACTIVITIES_STATUS[memorizedHadith.status]}  ~ ${memorizedHadith.reviewer.name}`,
                description: `${memorizedHadith.reviews}`,
                child: {
                    type: 'img',
                    items: [
                    ]
                }
            },

        ]" />
                </template>

                <div class="sign-in-from" v-if="memorizedHadith.status == 'pending'">

                    <form class="mt-2" @submit.prevent="onSubmit()">
                        <div class="form-group">
                            <label for="status">الاجراء</label>
                            <select v-model="v$.form.status.$model" class="form-select" data-trigger name="status"
                                id="status">
                                <option value="" selected>اختر الاجراء</option>
                                <option value="accepted">مقبول</option>
                                <option value="redo">بحاجة لاعادة</option>
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
                    <router-link :to="{ name: 'ramadan.correctors-hadith-list', }"
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
import helper from "@/utilities/helper";
import ramadanHeader from "@/components/ramadan/ramadan-header";
import HadithMemorizationServices from "@/API/RamadanServices/hadithMemorization.service";
import { ACTIVITIES_STATUS } from "@/utilities/constants";

export default {
    name: "Ramadan Night Prayer",
    setup() {
        return { v$: useVuelidate() };
    },
    components: {
        ramadanHeader,
    },

    async created() {
        this.memorizedHadith = await HadithMemorizationServices.show(this.form.hadith_memorization_id);
    },
    data() {
        return {
            loader: false,
            memorizedHadith: null,
            form: {
                hadith_memorization_id: this.$route.params.hadith_memorization_id,
                status: '',
                reviews: '',
            },
            ACTIVITIES_STATUS,
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
    methods: {
        imagePath(imageName) {
            return require(`@/assets/images/ramadan/${imageName}`);
        },
        async onSubmit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.loader = true;
                try {
                    const response = await HadithMemorizationServices.correct(this.form);
                    this.memorizedHadith = response;
                    helper.toggleToast(
                        "تم التصحيح",
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