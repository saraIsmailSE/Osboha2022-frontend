<template>
    <div class="row">
        <!-- ########## START WEEK STATISTICS ########## -->
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="card-body">
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
        this.chartData.datasets[0].data[0] = this.total.out_of_100
        this.chartData.datasets[0].data[1] = this.total.out_of_90
        this.chartData.datasets[0].data[2] = this.total.zero
        this.chartData.datasets[0].data[3] = this.total.freezed
        this.chartData.datasets[0].data[4] = this.total.others
    },
    components: {
        Doughnut
    },
    props: {
        total: {
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
                    'غير ذلك'
                ],
                datasets: [{
                    label: 'عدد السفراء',
                    data: [],
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
