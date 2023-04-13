<template>
    <div class="row">
        <!-- ########## START WEEK STATISTICS ########## -->
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="header-title">
                        <h4 class="card-title">انجاز الأسبوع || {{ week_title }}</h4>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between mt-2 text-dark">
                            <h6>المعدل العام</h6>
                            <small>100%</small>
                        </div>
                        <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                            <progressbar className="bg-primary" :style="{ width: 100 + '%' }"
                                aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></progressbar>
                        </b-progress>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex justify-content-between mt-2 text-dark">
                            <h6>إنجاز القراءة</h6>
                            <small> 45 / 50</small>
                        </div>
                        <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                            <progressbar className="bg-primary" :style="{ width: ((45 / 50) * 100) + '%' }"
                                aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></progressbar>
                        </b-progress>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex justify-content-between mt-2 text-dark">
                            <h6>إنجاز الكتابة</h6>
                            <small> {{20}} / 40</small>
                        </div>
                        <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                            <progressbar className="bg-primary" :style="{ width: ((20 / 40 ) * 100) + '%' }"
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
                                <h2>{{ 22222 }}</h2>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="m-auto text-dark">
                                <h6 class="d-inline-flex">
                                    عدد الأطروحات
                                    <span class="material-symbols-outlined me-2">
                                        draw
                                    </span>

                                </h6>
                                <h2>{{ 97 }} %</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- ########## END WEEK STATISTICS ########## -->
    </div>
</template>

<script>
import Marks from '@/API/services/marks.service'

export default {
    name: 'Marks',
    created() {
        //week mark
        //this.week_mark = this.statistics.week_mark;
        // group AVG        
        // this.group_week_avg = (Math.round(this.statistics.group_week_avg * 100) / 100).toFixed(2);
    },
    props: {
        statistics: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            week_mark: null,
            month_achievement: null,
            group_week_avg: null,
        }
    },
    computed: {
        week_title() {
           return 'TEST'
            // return this.statistics.week.title
        },
    }
}

</script>
