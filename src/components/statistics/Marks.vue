<template>
    <div class="row">
        <!-- ########## START WEEK STATISTICS ########## -->
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="header-title">
                        <h4 class="card-title">انجاز الأسبوع</h4>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between mt-2 text-dark">
                            <h6>العلامة الكلية</h6>
                            <small>{{ marks.out_of_100 }}%</small>
                        </div>
                        <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                            <progressbar className="bg-primary" :style="{ width: marks.out_of_100 + '%' }"
                                aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></progressbar>
                        </b-progress>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex justify-content-between mt-2 text-dark">
                            <h6>إنجاز القراءة</h6>
                            <small>تـــام</small>
                        </div>
                        <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                            <progressbar className="bg-primary" :style="{ width: marks.out_of_100 + '%' }"
                                aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></progressbar>
                        </b-progress>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex justify-content-between mt-2 text-dark">
                            <h6>إنجاز الكتابة</h6>
                            <small>تـــام</small>
                        </div>
                        <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                            <progressbar className="bg-primary" :style="{ width: marks.out_of_100 + '%' }"
                                aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></progressbar>
                        </b-progress>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="m-auto text-dark">
                                <h6 class="d-inline-flex">
                                    عدد الصفحات المقروءة
                                    <span class="material-symbols-outlined me-2">
                                        auto_stories
                                    </span>
                                </h6>
                                <h2>{{ marks.total_pages }}</h2>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="m-auto text-dark">
                                <h6 class="d-inline-flex">
                                    معدل الفريق
                                    <span class="material-symbols-outlined me-2">
                                        bar_chart
                                    </span>

                                </h6>
                                <h2>80%</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- ########## END WEEK STATISTICS ########## -->


        <!-- ########## START THSES AND QUOTES  ########## -->
        <div class="col-12">
            <div class="card card-block card-stretch card-height">
                <div class="card-header">
                    <div class=" d-flex justify-content-between flex-wrap">
                        <h4 class="card-title">الأطروحات والاقتباسات</h4>
                        <div class="dropdown w-100">
                            <select class="form-select">
                                <option class="dropdown-item" value="" selected>هذا الأسبوع</option>
                                <option class="dropdown-item" value="">الاسبوع السابق</option>
                                <option class="dropdown-item" value="">خلال الشهر</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <PieChart :data="pie_data" :options="pie_options" />
                </div>
            </div>
        </div>
        <!-- ########## END THSES AND QUOTES  ########## -->

        <!-- ########## START MONTH STATISTICS ########## -->
        <div class="col-12">
            <div class="card card-block card-stretch card-height">
                <div class="card-header">
                    <div class=" d-flex justify-content-between flex-wrap">
                        <h4 class="card-title">احصائيات حسب الشهر</h4>
                        <div class="dropdown w-100">
                            <select class="form-select">
                                <option class="dropdown-item" value="" selected>هذا الشهر</option>
                                <option class="dropdown-item" value="">الشهر السابق</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <LineChart :data="line_data" :options="line_options" />
                </div>
            </div>
        </div>
        <!-- ########## END MONTH STATISTICS ########## -->

    </div>
</template>

<script>
import LineChart from '../Charts/LineChart.vue'
import PieChart from '../Charts/PieChart.vue'
export default {
    name: 'Marks',
    created() {
        console.log(this.marks)
        console.log(this.pie_data.datasets[0].data)
        this.pie_data.datasets[0].data[0] = this.marks.total_thesis
        this.pie_data.datasets[0].data[1] = this.marks.total_screenshot


        console.log(this.pie_data.datasets[0].data)
    },
    props: {
        marks: {
            type: [Object],
            required: true,
        },
    },

    components: {
        LineChart,
        PieChart,

    },
    data() {
        return {
            line_data: {
                labels: [' ', 'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس'],
                datasets: [{
                    label: 'يناير',
                    data: [0, 70, 0, 100, 90, 100],
                    fill: false,
                    borderColor: '#1D1A55',
                    tension: 0.1
                }]
            },
            line_option: {
                responsive: true,
                maintainAspectRatio: false
            },
            pie_data: {
                labels: ['الأطروحات', 'الاقتباسات'],
                datasets: [
                    {
                        backgroundColor: ['#278036', '#1D1A55'],
                        data: [40, 20]
                    }
                ]
            },
            pie_options: {
                responsive: true,
                maintainAspectRatio: false
            }


        }
    }
}
</script>
