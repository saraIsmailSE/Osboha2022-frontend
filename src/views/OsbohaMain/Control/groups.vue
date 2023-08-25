<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <div class="header-title">
                            <h4 class="card-title">التحكم بالمجموعات - {{ 2 }}</h4>
                        </div>
                    </div>
                    <div class="card-body">

                        <div class="col-12">
                            <div class="row">
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{ name: 'osboha.groupsList', }">

                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            list_alt
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        عرض المجموعات
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{ name: 'group.addGroup', }">
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
                                                        اضافة مجموعة
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>

                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{ name: 'control.assign-administrator', }">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            assignment_ind
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        تعيين مسؤول
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <router-link :to="{ name: 'roles.assignRole', }">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <div
                                                        class="border rounded d-flex align-items-center justify-content-center">
                                                        <i class="display-1 img-fluid material-symbols-outlined">
                                                            grade
                                                        </i>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <h3 class="mb-0 text-center">
                                                        ترقية
                                                    </h3>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ########## Supervisors ########## -->
                        <Supervisors />

                        <!-- ########## Leaders ########## -->
                        <Leaders />

                        <!-- ########## Ambassadors ########## -->
                        <Ambassadors />
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<script>

import Leaders from "./groups.leaders"
import Supervisors from "./groups.supervisors"
import Ambassadors from "./groups.ambassadors"
export default {
    name: 'Control Groups',
    components: {
        Supervisors,
        Leaders,
        Ambassadors,

    },
    async created() {
    },
    data() {
        return {
        };
    },
    methods: {
    },
};
</script>