<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12" v-if="statistics">
                <div class="card">
                    <div class="card-header">
                        <div class="header-title">
                            <h4 class="card-title">التقييم الأسبوعي - {{ statistics.week.title }}</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="col-sm-12 text-center" v-if="loading">
                            <img  src="@/assets/images/gif/loader-3.gif" alt="loader" />
                        </div>

                        <div class="col-12">
                            <div class="row">
                                <div class="text-center w-100 col-12 col-md-12 col-lg-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <div
                                                    class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                    <img class="img-fluid" src="@/assets/images/gif/chart.gif" alt="" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ getRounded(statistics.total_statistics.total_sum / (statistics.total_users - statistics.freezed ))
                                                }}</h3>
                                                <p class="mb-0 text-center">المعدل العام</p>
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
                                                    <img class="img-fluid" src="@/assets/images/gif/book.gif"
                                                        alt="book-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.total_statistics.total_pages }}</h3>
                                                <p class="mb-0 text-center">العدد الكلي للصفحات</p>
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
                                                        alt="person-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.total_users }}</h3>
                                                <p class="mb-0 text-center">العدد الكلي للسفراء</p>
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
                                                    <img class="img-fluid" src="@/assets/images/gif/thesis.gif"
                                                        alt="write-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.total_statistics.total_thesis }}</h3>
                                                <p class="mb-0 text-center">عدد الاطروحات</p>
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
                                                    <img class="img-fluid" src="@/assets/images/gif/screen.gif"
                                                        alt="screen-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.total_statistics.total_screenshot }}
                                                </h3>
                                                <p class="mb-0 text-center">عدد الاقتباسات </p>
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
                                                    <img class="img-fluid" src="@/assets/images/gif/applause.gif"
                                                        alt="screen-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.total_100 }}
                                                </h3>
                                                <p class="mb-0 text-center"> الحاصلين على العلامة الكاملة </p>
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
                                                    <img class="img-fluid" src="@/assets/images/gif/thumb-down.gif"
                                                        alt="screen-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.total_0 }}
                                                </h3>
                                                <p class="mb-0 text-center"> الحاصلين على صفر </p>
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
                                                    <img class="img-fluid" src="@/assets/images/gif/minus-circle.gif"
                                                        alt="screen-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.freezed }}
                                                </h3>
                                                <p class="mb-0 text-center">عدد المجمدين </p>
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
                                                    <img class="img-fluid" src="@/assets/images/gif/no-entry.gif"
                                                        alt="screen-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.is_excluded }}
                                                </h3>
                                                <p class="mb-0 text-center">عدد الاخراج </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-md-12 col-lg-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <div
                                                    class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                    <img class="img-fluid" src="@/assets/images/gif/add-user.gif"
                                                        alt="screen-animated" />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <h3 class="text-center">{{ statistics.is_new }}
                                                </h3>
                                                <p class="mb-0 text-center">عدد الأعضاء الجدد </p>
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
import StatisticsService from "@/API/services/statistics.service";

export default {
    name: 'Statistics',
    async created() {
        this.statistics = await StatisticsService.byWeek();
        this.loading=false;
    },
    data() {
        return {
            statistics: null,
            thesises: {},
            questions: {},
            general_informations: {},
            loading:true,
        };
    },
    methods: {
        getRounded(number) {
            return (Math.round(number).toFixed(2));
        },

        async getStatistics() {
            // try {
            //     const statistics = await bookServices.getGeneralStatistics();
            //     this.statistics = statistics;
            //     this.thesises = this.statistics.thesises;
            //     this.general_informations = this.statistics.general_informations;
            //     this.questions = this.statistics.questions;

            // } catch (error) {
            //     console.log(error)
            // }


        },
    },
};
</script>