<template>
    <div class="col-12">
        <div class="row">
            <h1 class="text-center"> التحكم بالمراقبين</h1>
            <hr />

            <!-- <div class="col-6 col-md-6 col-lg-6">
                <div class="card">
                    <router-link :to="{ name: 'roles.changeAdvisingTeam', }">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="border rounded d-flex align-items-center justify-content-center">
                                    <i class="display-1 img-fluid material-symbols-outlined">
                                        swap_horizontal_circle
                                    </i>
                                </div>
                            </div>
                            <div class="mt-2">
                                <h3 class="mb-0 text-center">
                                    لم ينجز
                                </h3>
                            </div>
                        </div>
                    </router-link>

                </div>
            </div>
            <div class="col-6 col-md-6 col-lg-6">
                <div class="card">
                    <router-link :to="{ name: 'roles.changeAdvisingTeam', }">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="border rounded d-flex align-items-center justify-content-center">
                                    <i class="display-1 img-fluid material-symbols-outlined">
                                        swap_horizontal_circle
                                    </i>
                                </div>
                            </div>
                            <div class="mt-2">
                                <h3 class="mb-0 text-center">
                                    لم يعتمد
                                </h3>
                            </div>
                        </div>
                    </router-link>

                </div>
            </div> -->

            <!-- ###### TRANSFER SUPERVISOR ###### -->

            <div class="col-6 col-md-6 col-lg-6">
                <div class="card">
                    <router-link :to="{ name: 'roles.changeAdvisingTeam', }">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="border rounded d-flex align-items-center justify-content-center">
                                    <i class="display-1 img-fluid material-symbols-outlined">
                                        swap_horizontal_circle
                                    </i>
                                </div>
                            </div>
                            <div class="mt-2">
                                <h3 class="mb-0 text-center">
                                    نقل مراقب
                                </h3>
                            </div>
                        </div>
                    </router-link>

                </div>
            </div>

            <!-- ###### SWAP SUPERVISORS ###### -->

            <div class="col-6 col-md-6 col-lg-6" v-if="isConsultant || isAdmin">
                <div class="card">
                    <router-link :to="{ name: 'control.supervisorsSwap', }">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="border rounded d-flex align-items-center justify-content-center">
                                    <i class="display-1 img-fluid material-symbols-outlined">
                                        swap_horizontal_circle
                                    </i>
                                </div>
                            </div>
                            <div class="mt-2">
                                <h3 class="mb-0 text-center">
                                    تبديل مراقبين
                                </h3>
                            </div>
                        </div>
                    </router-link>

                </div>
            </div>

            <!-- ###### DELETE SUPERVISOR ###### -->
            <!-- <div class="col-6 col-md-6 col-lg-6">
                <div class="card">
                    <router-link :to="{ name: 'roles.changeAdvisingTeam', }">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="border rounded d-flex align-items-center justify-content-center">
                                    <i class="display-1 img-fluid material-symbols-outlined">
                                        person_remove
                                    </i>
                                </div>
                            </div>
                            <div class="mt-2">
                                <h3 class="mb-0 text-center">
                                    حذف مراقب
                                </h3>
                            </div>
                        </div>
                    </router-link>

                </div>
            </div> -->


        </div>
    </div>
</template>
<script>
import UserInfoService from "@/Services/userInfoService";

export default {
    name: 'Control Groups - supervisors',
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        isConsultant() {
            return UserInfoService.hasRole(this.user, "consultant");
        },

        isAdmin() {
            return UserInfoService.hasRole(this.user, "admin");
        },
    },
    data() {
    },
    methods: {
    },
};
</script>