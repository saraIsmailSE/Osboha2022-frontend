<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12" v-if="statistics">
                <div class="card">
                    <div class="card-header">
                        <div class="header-title">
                            <h3 class="card-title">احصائيات الاعضاء الجدد - {{ arabicTimeFrame[timeFrame] }}</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="col-sm-12 text-center" v-if="loading">
                            <img src="@/assets/images/gif/loader-3.gif" alt="loader" />
                        </div>

                        <div class="col-12">
                            <div class="row">
                                <div class="masonary-menu filter-button-group">
                                    <nav class="d-flex justify-content-center">
                                        <div className="nav nav-tabs justify-content-start" id="portfolio-tab"
                                            role="tablist">
                                            <button v-for="(time, index) in arabicTimeFrame" :key="index"
                                                :className="`nav-link ${index == timeFrame ? 'active' : ''}`"
                                                id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all"
                                                type="button" role="tab" aria-controls="nav-all" aria-selected="true"
                                                @click="() => { this.timeFrame = index; loadStatistics() }">
                                                {{ time }}</button>
                                        </div>
                                    </nav>
                                </div>
                                <div class="text-center w-100 col-12 col-md-12 col-lg-12 mt-2">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <div
                                                    class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                    <img class="img-fluid" src="@/assets/images/gif/done.gif" alt="" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">
                                                    {{ statistics.completed_requests }}</h3>
                                                <p class="mb-0 text-center">عدد الطلبات المكتملة</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <div
                                                    class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                    <img class="img-fluid" src="@/assets/images/gif/person.gif"
                                                        alt="book-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">
                                                    {{ statistics.new_allocated_users }}
                                                </h3>
                                                <p class="mb-0 text-center">عدد السفراء الموزعين</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <div
                                                    class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                    <img class="img-fluid" src="@/assets/images/gif/red_person.gif"
                                                        alt="person-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.not_allocated_users }}</h3>
                                                <p class="mb-0 text-center">عدد السفراء الغير موزعيين </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <div
                                                    class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                    <img class="img-fluid" src="@/assets/images/gif/loader-3.gif"
                                                        alt="write-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.uncompleted_requests }}
                                                </h3>
                                                <p class="mb-0 text-center">عدد الطلبات الغير مكتملة</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <div
                                                    class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                    <img class="img-fluid" src="@/assets/images/gif/any_gender.gif"
                                                        alt="write-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.requests_any }}
                                                </h3>
                                                <p class="mb-0 text-center">عدد طلبات - لا فرق </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <div
                                                    class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                    <img class="img-fluid" src="@/assets/images/gif/female_leader.gif"
                                                        alt="write-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.requests_female }}
                                                </h3>
                                                <p class="mb-0 text-center">عدد طلبات - اناث </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <div
                                                    class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                    <img class="img-fluid" src="@/assets/images/gif/male_leader.gif"
                                                        alt="write-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.requests_male }}
                                                </h3>
                                                <p class="mb-0 text-center">عدد طلبات - ذكور </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center w-100 col-12 col-md-12 col-lg-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <div
                                                    class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                    <img class="img-fluid" src="@/assets/images/gif/error.gif" alt="" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.users_not_complete_registration }}
                                                </h3>
                                                <p class="mb-0 text-center">لم يكمل التسجيل</p>
                                            </div>
                                        </div>
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
import AmbassadorsRequest from '@/API/services/ambassadors-request.service';

export default {
    name: 'Statistics',
    async created() {
        this.loadStatistics();
        this.loading = false;
    },
    data() {
        return {
            statistics: null,
            loading: true,
            timeFrame: 'today',
            arabicTimeFrame: {
                'today': 'اليوم',
                'yesterday': 'أمس',
                'week': 'الاسبوع الحالي',
                'month': 'الشهر الحالي',
            },
        };
    },
    methods: {
        async loadStatistics() {
            this.statistics = await AmbassadorsRequest.statistics(this.timeFrame);
        }
    },
};
</script>