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
                    <h5 class="p-3">المرة الأولى</h5>
                    <h6 class="mb-2 p-3">
                        {{ memorizedHadith.hadith_memorize }}
                    </h6>
                    <h5 class="p-3">المرة الثانية</h5>
                    <h6 class="mb-2 p-3">
                        {{ memorizedHadith.hadith_memorize_2 }}
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


<style scoped>
@font-face {
    font-family: HacenSamra;
    src: url('@/assets/fonts/HacenSamra.ttf');
}

h1,
h2,
h4,
h5,
p {
    font-family: HacenSamra, Arial, sans-serif;
    color: #471809;
}

.ramada-p {
    font-size: 25px;
    line-height: 40px;
    font-family: HacenSamra, Arial, sans-serif;
    color: #471809;
}

.ramadan-card {
    background: #f8f9fa;
}

.disabled-link {
    color: #ccc;
    /* Set the color to a muted or grayed-out color */
    pointer-events: none;
    /* Disable pointer events to prevent clicking */
    text-decoration: none;
    /* Remove underline or other decorations */
}

.statistics-card {
    background: #FDEEEC;
    border-top: none;
    border-right: solid #471809;
    border-bottom: solid #471809;
    border-left: solid #471809;
}

.ramadan-btn {
    background: #b17658;
    color: #f8f9fa;

}

.back-btn {
    font-family: HacenSamra, Arial, sans-serif;
    color: #471809;
}

.accepted {
    color: #3e9069;
}

.rejected {
    color: darkred;
}


/*form styles*/
#msform {
    position: relative;
    margin-top: 20px;
}

#msform fieldset .form-card {
    background: white;
    border: 0 none;
    border-radius: 0px;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
    padding: 20px 40px 30px 40px;
    box-sizing: border-box;
    width: 94%;
    margin: 0 3% 20px 3%;

    /*stacking fieldsets above each other*/
    position: relative;
}

#msform fieldset {
    background: white;
    border: 0 none;
    border-radius: 0.5rem;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding-bottom: 20px;

    /*stacking fieldsets above each other*/
    position: relative;
}

/*Hide all except first fieldset*/
#msform fieldset:not(:first-of-type) {
    display: none;
}

#msform fieldset .form-card {
    text-align: left;
    color: #9E9E9E;
}

#msform input,
#msform textarea {
    padding: 0px 8px 4px 8px;
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0px;
    margin-bottom: 25px;
    margin-top: 2px;
    width: 100%;
    box-sizing: border-box;
    font-family: montserrat;
    color: #2C3E50;
    font-size: 16px;
    letter-spacing: 1px;
}

#msform input:focus,
#msform textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: none;
    font-weight: bold;
    border-bottom: 2px solid #596D13;
    outline-width: 0;
}


/*Dropdown List Exp Date*/
select.list-dt {
    border: none;
    outline: 0;
    border-bottom: 1px solid #ccc;
    padding: 2px 5px 3px 5px;
    margin: 2px;
}

select.list-dt:focus {
    border-bottom: 2px solid #596D13;
}

/*The background card*/
.card {
    z-index: 0;
    border: none;
    border-radius: 0.5rem;
    position: relative;
}

/*FieldSet headings*/
.fs-title {
    font-size: 25px;
    color: #2C3E50;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: left;
}

/*progressbar*/
#progressbar {
    margin-bottom: 30px;
    overflow: hidden;
    color: lightgrey;
}

#progressbar .active {
    color: #471809;
}

#progressbar li {
    list-style-type: none;
    font-size: 12px;
    width: 33%;
    float: left;
    position: relative;
}

/*ProgressBar before any progress*/
#progressbar li:before {
    width: 50px;
    height: 50px;
    line-height: 45px;
    display: block;
    font-size: 18px;
    color: #ffffff;
    background: lightgray;
    border-radius: 50%;
    margin: 0 auto 10px auto;
    padding: 2px;
}

/*ProgressBar connectors*/
#progressbar li:after {
    content: '';
    width: 100%;
    height: 2px;
    background: lightgray;
    position: absolute;
    left: 0;
    top: 25px;
    z-index: -1;
}

/*Color number of the step and the connector before it*/
#progressbar li.active:before,
#progressbar li.active:after {
    background: #596D13;
}

/*Imaged Radio Buttons*/
.radio-group {
    position: relative;
    margin-bottom: 25px;
}

.radio {
    display: inline-block;
    width: 204;
    height: 104;
    border-radius: 0;
    background: lightblue;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    cursor: pointer;
    margin: 8px 2px;
}

.previous {
    background: #448e9e;
    color: white;
}

.radio:hover {
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
}

.radio.selected {
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
}

/*Fit image in bootstrap div*/
.fit-image {
    width: 100%;
    object-fit: cover;
}

/* Define your transitions and other styles here */
.step-enter-active,
.step-leave-active {
    transition: opacity 0.5s;
}

.step-enter-from,
.step-leave-to {
    opacity: 0;
}

.tag-input-container .form-control {
    min-height: 45px;
    cursor: text;
}

.tag-input-container input {
    border: none;
    outline: none;
    flex-grow: 1;
    padding: 0;
}

.material-symbols-outlined {
    color: #471809;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}
</style>