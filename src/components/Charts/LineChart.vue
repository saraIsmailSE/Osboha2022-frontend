<template>
    <LineChartGenerator :data="data" :options="options" />
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,ArcElement, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,ArcElement,PointElement, LineElement)
export default {
    name: 'LineChart',
    components: {
        LineChartGenerator
    },
    props:[
        'data',
        'options'
    ],
    data() {
        return {
            }
        }
    }
</script>
