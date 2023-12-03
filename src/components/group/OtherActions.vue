<template>
    <div class="card-body">
        <div class="blog-description">
            <button class="btn mr-2 mt-1 w-75 btn-freez"
                @click="() => { showExceptionForm = !showExceptionForm; showIsNewForm = false; }">
                طلب تجميد استثنائي
            </button>
            <button class="btn btn-success ms-2 mt-1 w-75 "
                v-if="isnew && ((mark.reading_mark + mark.writing_mark + mark.support) <= 50)" @click="() => {
                    showIsNewForm = !showIsNewForm;
                    showExceptionForm = false;
                }">
                تعيين عضو جديد
            </button>
        </div>
        <form @submit.prevent="submitException" class="post-text ml-3 w-100 row" v-show="showExceptionForm">
            <div class="form-group mt-3 mb-1">
                <h4>السبب</h4>
                <div class="form-group row ">
                    <textarea rows="5" placeholder="سبب التجميد الاستثنائي" class="rounded form-control mt-2 col-12"
                        id="exceptionReason" v-model="v$.exceptionForm.reason.$model" name="reason">
                        </textarea>
                    <p class="mb-0">
                        <span :class="{ 'text-danger': v$.exceptionForm.reason.$error }">
                            {{ v$.exceptionForm.reason.$model.length }}
                        </span>
                        /250
                    </p>
                </div>
                <small class="d-block text-start mt-1" style="color: red" v-if="v$.exceptionForm.reason.$error">
                    * قم بادخال سبب لا ينقص عن 10 حروف ولا يزيد عن 250 حرف
                </small>
            </div>
            <div class="form-group">
                <button type="submit" :disabled="message" class="btn d-block btn-freez float-end mx-auto">
                    تجميد
                </button>
            </div>

        </form>

        <form @submit.prevent="submitIsNew" class="mt-3 post-text ml-3 w-100 row" v-show="showIsNewForm">
            <div class="form-check mt-2 w-100 text-start">
                <input type="checkbox" :checked="allowSubmitIsNew" class="form-check-input" id="allow_submit_is_new"
                    ref="allow_submit_is_new" @click="allowSubmitIsNew = !allowSubmitIsNew">
                <h4 class="form-check-label" for="allow_submit_is_new">
                    هذا العضو جديد وفي اسبوعه الأول أو الثاني
                </h4>
            </div>
            <div class="form-group">
                <button type="submit" :disabled="!allowSubmitIsNew" class="btn d-block btn-primary float-end mx-auto">
                    اعتماد عضو جديد
                </button>
            </div>
        </form>

        <div class="col-sm-12 text-center" v-if="loader">
            <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px" />
        </div>
        <h4 class="text-center mt-3 mb-3" v-if="message">{{ message }}</h4>

    </div>
</template>
<script>
import exceptionService from "@/API/services/user-exception.service";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
    name: "List Reading",
    setup() {
        return { v$: useVuelidate() };
    },
    created() {
        this.exceptionForm.user_id = this.user.id;
        this.exceptionForm.week_id = this.$route.params.week_id;

    },
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            exceptionForm: {
                reason: "",
                user_id: 0,
                week_id: 0,
            },
            showExceptionForm: false,
            showIsNewForm: false,
            allowSubmitIsNew: false,
            loader: false,
            message: null,
        };
    },
    validations() {
        return {
            exceptionForm: {
                reason: {
                    required,
                    minLength: minLength(10),
                    maxLength: maxLength(250),
                },
            },
        };
    },

    methods: {
        async submitException() {
            this.v$.$touch();
            if (!this.v$.exceptionForm.$invalid) {
                this.message = "";
                this.loader = true;
                try {
                    const response = await exceptionService.setExceptionalFreez(this.exceptionForm);

                    this.message = response;
                    this.showExceptionForm = false
                    this.v$.exceptionForm.$reset();
                } catch (error) {
                    console.log("[Exception request error]", error);
                } finally {
                    this.loader = false;
                }
            }
        },
        async submitIsNew() {
            this.message = "";
            this.loader = true;
            try {
                this.exceptionForm.reason = 'عضو جديد';
                const response = await exceptionService.setNewUser(this.exceptionForm);

                this.message = response;
                this.showIsNewForm = false
                this.v$.exceptionForm.$reset();
            } catch (error) {
                console.log("[submit new user error]", error);
            } finally {
                this.loader = false;
            }
        },
    },
    computed: {
        isnew() {
            if (this.user) {
                const givenDate = new Date(this.user.created_at);
                // Get today's date
                const today = new Date();

                // Calculate the start date of the 2-week period
                const twoWeeksAgo = new Date();
                twoWeeksAgo.setDate(today.getDate() - 14); // Subtract 14 days from today's date

                // Reset time for both dates to 00:00:00 for a day-level comparison
                twoWeeksAgo.setHours(0, 0, 0, 0);
                givenDate.setHours(0, 0, 0, 0);

                // Check if givenDate is between twoWeeksAgo and today
                return givenDate >= twoWeeksAgo && givenDate <= today;
            }
            else {
                return false;
            }
        },
    },
};
</script>

<style scoped>
.btn-freez {
    background-color: #223e7f;
    color: white;
}
</style>