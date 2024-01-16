<template>
    <div class="col-12">
        <div class="row">
            <h1 class="text-center"> التحكم بالسفراء</h1>
            <hr />
            <div class="col-6 col-md-6 col-lg-6">
                <div class="card">
                    <router-link :to="{ name: 'control.transfer-ambassador', }">
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
                                    نقل سفير
                                </h3>
                            </div>
                        </div>
                    </router-link>

                </div>
            </div>
            <div class="col-6 col-md-6 col-lg-6">
                <div class="card">
                    <router-link :to="{ name: 'user.search', }">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="border rounded d-flex align-items-center justify-content-center">
                                    <i class="display-1 img-fluid material-symbols-outlined">
                                        search
                                    </i>
                                </div>
                            </div>
                            <div class="mt-2">
                                <h3 class="mb-0 text-center">
                                    بحث عن سفير
                                </h3>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>            <div class="col-6 col-md-6 col-lg-6">
                <div class="card">
                    <router-link :to="{ name: 'user.exception-search', }">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="border rounded d-flex align-items-center justify-content-center">
                                    <i class="display-1 img-fluid material-symbols-outlined">
                                        do_not_disturb_on
                                    </i>
                                </div>
                            </div>
                            <div class="mt-2">
                                <h3 class="mb-0 text-center">
                                    اعفائات السفير
                                </h3>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="col-6 col-md-6 col-lg-6" v-if="advisorAndAbove">
                <div class="card">
                    <router-link :to="{ name: 'user.assignToParent', }">
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="border rounded d-flex align-items-center justify-content-center">
                                    <i class="display-1 img-fluid material-symbols-outlined">
                                        supervisor_account
                                    </i>
                                </div>
                            </div>
                            <div class="mt-2">
                                <h3 class="mb-0 text-center">
                                    تعيين مسؤول عنه
                                </h3>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import UserInfoService from "@/Services/userInfoService";

export default {
    name: 'Control Groups - Ambassadors',
    async created() {
    },
    data() {
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        advisorAndAbove() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "consultant",
                "advisor",
            ]);
        },
        isAdmin() {
            return UserInfoService.hasRole(this.user, "admin");
        },
        consultantAndAbove() {
            return UserInfoService.hasRoles(this.user, ["consultant", "admin"]);
        },
    },
};
</script>