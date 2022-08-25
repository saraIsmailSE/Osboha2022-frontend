<template>
    <div class="row">
        
        <!-- ########## START GENERAL STATISTICS ########## -->
        
        <div class="col-lg-8">
            <div class="card card-block card-stretch card-height">
                <div class="card-header">
                    <div class=" d-flex justify-content-between flex-wrap">
                        <h4 class="card-title">New Accounts</h4>
                        <div class="dropdown">
                            <a href="javascript:void(0);" class="text-secondary dropdown-toggle"
                                id="dropdownMenuButton223" data-bs-toggle="dropdown" aria-expanded="false">
                                هذا الشهر
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton223">
                                <li><a class="dropdown-item" href="javascript:void(0);">الشهر السابق</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">6 أشهر </a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">سنة</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <apexchart height="100%" type="line" :options="general.options" :series="general.series" />
                </div>
            </div>
        </div>
        <!-- ########## END GENERAL STATISTICS ########## -->

        <!-- ########## START THSES AND QUOTES ########## -->
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <div class="header-title">
                        <h4 class="card-title">الأطروحات والاقتباسات</h4>
                    </div>
                </div>
                <div class="card-body">
                    <div class="flex-wrap d-flex align-items-center justify-content-between">
                        <div class="d-grid gap col-md-4 col-lg-4 gap-3">
                            <div class="d-flex align-items-start">
                                <i class="icon material-symbols-outlined filled text-primary mt-1">
                                    fiber_manual_record
                                </i>
                                <div class="ms-2" style="line-height: 1.5;">
                                    <span class="mb-3">الأطروحات</span>
                                    <h6 class="mb-0">3</h6>
                                </div>
                            </div>
                            <div class="d-flex align-items-start">
                                <i class="icon material-symbols-outlined filled text-info mt-1">
                                    fiber_manual_record
                                </i>
                                <div class="ms-2" style="line-height: 1.5;">
                                    <span class="mb-3">الاقتباسات</span>
                                    <h6 class="mb-0">2</h6>
                                </div>
                            </div>
                        </div>
                        <apexchart height="200" type="radialBar" class="col-md-8 col-lg-8" :options="thesesAndQuotes.options"
                            :series="thesesAndQuotes.series" />
                    </div>
                </div>
            </div>
        </div>
        <!-- ########## END THSES AND QUOTES ########## -->

    </div>
    
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
                        <small>100%</small>
                    </div>
                    <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                        <b-progress-bar :value="100" variant="primary"></b-progress-bar>
                    </b-progress>
                </div>
                <div class="mb-3">
                    <div class="d-flex justify-content-between mt-2 text-dark">
                        <h6>إنجاز القراءة</h6>
                        <small>تـــام</small>
                    </div>
                    <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                        <b-progress-bar :value="100" variant="danger"></b-progress-bar>
                    </b-progress>
                </div>
                <div class="mb-3">
                    <div class="d-flex justify-content-between mt-2 text-dark">
                        <h6>إنجاز الكتابة</h6>
                        <small>تـــام</small>
                    </div>
                    <b-progress class="shadow-none  w-100 mt-2" style="height: 6px">
                        <b-progress-bar :value="100" variant="info"></b-progress-bar>
                    </b-progress>
                </div>
                <div class="mb-3">
                    <div class="d-flex justify-content-between mt-2 text-dark">
                        <h6>عدد الصفحات المقروءة</h6>
                        <small>45</small>
                    </div>
                    <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                        <b-progress-bar :value="100" variant="warning"></b-progress-bar>
                    </b-progress>
                </div>
                
                <div class="mb-3">
                    <div class="d-flex justify-content-between mt-2 text-dark">
                        <h6>معدل الفريق</h6>
                        <small>80%</small>
                    </div>
                    <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                        <b-progress-bar :value="80" variant="success"></b-progress-bar>
                    </b-progress>
                </div>
            </div>
        </div>
    </div>
    <!-- ########## END WEEK STATISTICS ########## -->

</template>
<script setup>
import { ref, reactive } from 'vue'
import FlatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
const inlineDate = ref('')
const inlineDatepicker = reactive({
    inline: true,
    minDate: 'today',
    dateFormat: 'Y-m-d'
})
//GENERAL
const general = ref({
    series: [{
        name: 'WEEK MARK',
        data: [90, 80, 100, 100, 90]
    }],
    options: {
        colors: ['#030059'],
        chart: {
            toolbar: {
                show: false
            }
        },
        forecastDataPoints: {
            count: 2
        },
        stroke: {
            width: 3
        },
        grid: {
            show: true,
            strokeDashArray: 7
        },
        markers: {
            size: 6,
            colors: '#FFFFFF',
            strokeColors: ['#50b5ff'],
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 0,
            shape: 'circle',
            radius: 2,
            offsetX: 0,
            offsetY: 0
        },
        xaxis: {
            categories: ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'WEEK 5'],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            tooltip: {
                enabled: false
            }
        }
    }
})
//THESTS AND QOUTES
const thesesAndQuotes = ref({
    series: [80, 20],
    options: {
        colors: ['#278036', '#292672'],
        plotOptions: {
            radialBar: {
                inverseOrder: false,
                endAngle: 360,
                hollow: {
                    margin: 5,
                    size: '50%',
                    background: 'transparent',
                    imageWidth: 150,
                    imageHeight: 150,
                    imageClipped: true,
                    position: 'front',
                    dropShadow: {
                        enabled: false,
                        blur: 3,
                        opacity: 0.5
                    }
                },
                track: {
                    show: true,
                    background: '#f2f2f2',
                    strokeWidth: '70%',
                    opacity: 1,
                    margin: 6,
                    dropShadow: {
                        enabled: false,
                        blur: 3,
                        opacity: 0.5
                    }
                },
                dataLabels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '16px',
                        fontWeight: 600,
                        offsetY: -10
                    },
                    value: {
                        show: true,
                        fontSize: '14px',
                        fontWeight: 400,
                        offsetY: 16,
                        formatter: function (val) {
                            return val + '%'
                        }
                    }
                }
            }
        },
        labels: ['أطروحات', 'اقتباسات']
    }
})
</script>
<style>
.flatpickr-calendar {
    width: 100%;
}
</style>
