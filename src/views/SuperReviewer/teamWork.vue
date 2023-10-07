<template>
    <div class="container">
        <ul class="list-unstyled row mb-0">
            <li class="col-lg-12 col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="points">
                            <h5 class="text-center">عدد المراجعين</h5>
                            <h3 class="text-center">4</h3>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="row">
            <div class="col-lg-12">
                <div class="card card-block card-stretch card-height">
                    <div class="card-header">
                        <div class="d-flex justify-content-between flex-wrap">
                            <h4 class="card-title">انجاز الأعضاء</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <apexchart height="100%" type="line" :options="level.options" :series="level.series" />
                    </div>
                </div>
            </div>

            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <div class="header-title">
                            <h4 class="card-title">عضو 1</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6 col-md-6 col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center justify-content-center">
                                            <div
                                                class="border rounded bg-soft-warning avatar-55 d-flex align-items-center justify-content-center">
                                                <span class="material-symbols-outlined"> redo </span>
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <h3 class="text-center">20</h3>
                                            <p class="mb-0 text-center">اعادة</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-md-6 col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center justify-content-center">
                                            <div
                                                class="border rounded bg-soft-primary avatar-55 d-flex align-items-center justify-content-center">
                                                <span class="material-symbols-outlined">task_alt</span>                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <h3 class="text-center">30</h3>
                                            <p class="mb-0 text-center">مقبول</p>
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
export default {
    name: 'TeamsStatistics',
    created() {
    },
    data() {
        return {
            statistics: {},
            thesises: {},
            questions: {},
            general_informations: {},
        };
    },
    methods: {
    },
};
</script>
<script setup>
import { ref, reactive } from "vue";
import FlatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
const inlineDate = ref("");
const inlineDatepicker = reactive({
    inline: true,
    minDate: "today",
    dateFormat: "Y-m-d",
});
const level = ref({
    series: [
        {
            name: "الانجاز العام",
            data: [0, 100, 200, 50, 20],
        },
    ],
    options: {
        colors: ["#50b5ff"],
        chart: {
            toolbar: {
                show: false,
            },
        },
        forecastDataPoints: {
            count: 2,
        },
        stroke: {
            width: 3,
        },
        grid: {
            show: true,
            strokeDashArray: 7,
        },
        markers: {
            size: 6,
            colors: "#FFFFFF",
            strokeColors: ["#50b5ff"],
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 0,
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
        },
        xaxis: {
            categories: [' ', "عضو 1", "عضو 2", "عضو 3", "عضو 4"],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    },
});
</script>
<style>
.flatpickr-calendar {
    width: 100%;
}
</style>
  