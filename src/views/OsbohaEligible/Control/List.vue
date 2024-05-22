<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <div class="header-title">
                            <h4 class="card-title">توثيق الكتب</h4>
                        </div>
                    </div>
                    <div class="card-body">

                        <!-- ########## Admin ########## -->
                        <div class="col-12" v-if="isAdmin">
                            <div class="row">
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{ name: 'admin.statistics', }">

                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            monitoring
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        احصائيات
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{
                                            name: 'roles.rolesControl',
                                            params: {
                                                type: 'eligible',
                                            },

                                        }">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            list_alt_add
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        تحكم العضويات
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>

                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{ name: 'admin.accept-certificates', }">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            card_membership
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        قبول الشهادات
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- ########## Admin  UserAcceptTeam ########## -->
                        <div class="col-12" v-if="isAdmin || isUserAcceptTeamMember">
                            <h1 class="text-center">
                                التحكم بالمستخدمين
                            </h1>
                            <hr />

                            <div class="row">
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{ name: 'admin.accept-users', }">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            background_replace
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        قبول المستخدمين
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- ########## Admin - Auditer - Reviewer ########## -->
                        <div class="col-12" v-if="isAdmin || isAuditer || isReviewer">
                            <h1 class="text-center">
                                المراجعة والتدقيق
                            </h1>
                            <hr />

                            <div class="row">
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{ name: 'admin.find-achievement', }">

                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            search
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        البحث عن توثيق
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{ name: 'thesis-review.list', }">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            draw
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        الأطروحات
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{ name: 'general.list', }">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            grading
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        التلخيص العام
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{ name: 'questions.list', }">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            psychology_alt
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        الأسئلة المعرفية
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6" v-if="isSuper_teamLeader">
                                    <div class="card">
                                        <router-link :to="{ name: 'eligibleTeam.team-work', }">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            diversity_2
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        عمل الفريق
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- ########## Admin - Reviewer ########## -->
                        <div class="col-12" v-if="isAdmin || isReviewer">
                            <h1 class="text-center">
                                ادوات المراجعة
                            </h1>
                            <hr />

                            <div class="row">
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{ name: 'ReadyToAudit', }">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            star
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        توثيق جاهز للتقييم
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <a href="https://plagiarismdetector.net/" target="_blank">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            plagiarism
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        Plagiarism Checker
                                                    </h3>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<script>
import UserInfoService from "@/Services/userInfoService";

export default {
    name: 'ُEligible Control',

    async created() {
    },
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        isBookTeamMember() {
            return UserInfoService.hasRole(this.user, "book-quality");
        },
        isUserAcceptTeamMember() {
            return UserInfoService.hasRoles(this.user, [
                "user_accept",
            ]);
        },
        isAdmin() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "eligible_admin"
            ]);
        },
        isSuper() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "eligible_admin",
                "super_auditer",
                "super_reviewer",
            ]);
        },
        isAuditer() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "eligible_admin",
                "super_auditer",
                "auditor",
            ]);
        },
        isReviewer() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "eligible_admin",
                "super_reviewer",
                "reviewer",
            ]);
        },
        isSuper_teamLeader() {
            return UserInfoService.hasRoles(this.user, [
                "super_auditer",
                "super_reviewer",
            ]);
        },
    },
};

</script>