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
                    <ul class="0">
                        <li v-for="(category, index1) in categoryList" :key="index1">
                            <a class="d-flex align-items-center justify-content-between">
                                <div class="d-flex">
                                    <i :class="`material-symbols-outlined`" :style="`color:${category.color}`">bolt</i>
                                    <h5>{{ category.name }}</h5>
                                </div>
                                <div class="d-inline p-2 text-light float-end rounded"
                                    :style="`background-color:${category.color}`">
                                    {{ category.number }}
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div class="container mt-3 d-flex  align-items-center justify-content-center">
                        <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
                    </div>
                </div>
            </div>
        </div>
        <!-- ########## END WEEK STATISTICS ########## -->
    </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
    name: 'Marks',
    created() {
        //week mark
        //this.week_mark = this.statistics.week_mark;
        // group AVG        
        // this.group_week_avg = (Math.round(this.statistics.group_week_avg * 100) / 100).toFixed(2);
    },
    components: {
        Doughnut
    },
    props: {
        statistics: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            chartData: {
                labels: [
                    '100',
                    '90',
                    'صفر',
                    'تجميد',
                    'امتحانات'
                ],
                datasets: [{
                    label: 'معدل الأسبوع',
                    data: [20, 7, 3, 2, 9],
                    backgroundColor: [
                        '#22803f',
                        '#192f36',
                        '#831018',
                        '#D0ECFF',
                        '#CAE0CD'
                    ],
                    hoverOffset: 4
                }]
            },
            chartOptions: {
                responsive: true,

            }
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
