<template>
    <div class="text-center">
        <div v-if="report.status == 'pending'">
            <h3 class="text-center mt-3 mb-3">الاجراء المناسب</h3>
            <div class="d-flex align-items-center mt-3">
                <form @submit.prevent="submitDecision" class="post-text m-auto w-100 row">
                    <div class="form-group col-12">
                        <select class="form-select" v-model="v$.actionForm.status.$model" :disabled="message">
                            <option value="" selected>اختر الاجراء المناسب</option>
                            <option value="resolved">مقبول </option>
                            <option value="rejected">مرفوض </option>
                        </select>
                        <small style="color: red" v-if="v$.actionForm.status.$error">
                            هذا الخيار مطلوب
                        </small>
                    </div>
                    <div class="form-group col-12">
                        <label class="form-label" for="reviewer_note">ملاحظاتك</label>
                        <textarea v-model="v$.actionForm.reviewer_note.$model" rows="5" placeholder="... اكتب ملاحظة"
                            class="rounded form-control" id="reviewer_note" :disabled="message"></textarea>
                        <small style="color: red" v-if="v$.actionForm.reviewer_note.$error">
                            * ملاحظاتك مطلوبة
                        </small>
                    </div>

                    <div class="form-group">
                        <button type="submit" :disabled="message"
                            class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
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
        </div>

        <div class="d-inline-flex justify-content-center alert alert-success mt-2 w-75" v-else>
            <h5>تم اتخاذ الاجراء مسبقًا</h5>
            <hr />
        </div>
        <div class="border border-danger w-100 mt-2 mb-3 text-center p-3"
            v-if="isTeamCoordinator && report.book.is_active">
            <p class="text-center" v-if="removeMsg">{{ removeMsg }}</p>
            <button type="button" class="btn btn-danger w-75" :disabled="removeMsg" @click="removeBook()">
                سحب من المنهج
            </button>
        </div>

    </div>
</template>
<script>
import bookService from "@/API/services/book.service";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import helper from "@/utilities/helper";
import UserInfoService from "@/Services/userInfoService";

export default {
    name: "Violated Book Decision",
    setup() {
        return { v$: useVuelidate() };
    },
    props: {
        report: { type: Object },
    },
    created() {
    },
    data() {
        return {
            actionForm: {
                report_id: this.$route.params.report_id,
                reviewer_note: "",
                status: '',
            },
            message: null,
            loader: false,
        };
    },
    validations() {
        return {
            actionForm: {
                reviewer_note: {
                    required,
                    minLength: minLength(10),
                    maxLength: maxLength(500),
                },
                status: {
                    required,
                },
            },
        };
    },
    methods: {
        ...helper,
        async submitDecision() {
            this.v$.$touch();
            if (!this.v$.actionForm.$invalid) {
                this.message = "";
                this.loader = true;
                try {
                    const response = await bookService.updateReportStatus(
                        this.report.id,
                        this.actionForm,
                    );
                    this.loader = false;
                    this.message = response;
                    helper.toggleToast(this.message, "success");
                    this.$emit("update_report");

                    this.v$.actionForm.$reset();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        removeBook() {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: "btn btn-primary btn-lg",
                    cancelButton: "btn btn-outline-primary btn-lg ms-2",
                },
                buttonsStyling: false,
            });
            swalWithBootstrapButtons
                .fire({
                    title: "ملاحظة هامة",
                    text: "حذف الكتاب من المنهج لا يعني حذفه بالكامل من المنصة، وإنما يعني أن السفراء ليس لديهم صلاحيات لكتابة أطروحاتهم وقراءته.  فيما يخص السفراء الذين يقرأون الكتاب حاليًا، سيكون بإمكانهم متابعة القراءة دون أي مشاكل.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "سحب من المنهج",
                    cancelButtonText: "إلغاء",
                    showClass: {
                        popup: "animate__animated animate__zoomIn",
                    },
                    hideClass: {
                        popup: "animate__animated animate__zoomOut",
                    },
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        this.removeMsg = await bookService.removeBookFromOsboha(this.report.book.id);
                        helper.toggleToast(
                            "تم سحب الكتاب من المنهج ... سيتم تحويلك إلى صفحة الكتب المخالفة",
                            "success",
                        );
                        setTimeout(() => {
                            this.$router.push({ name: "book.list-violated-books" });
                        }, 3000);
                    }
                });
        },
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        isTeamCoordinator() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                'book_quality_team_coordinator',
            ]);
        },
    },
};
</script>