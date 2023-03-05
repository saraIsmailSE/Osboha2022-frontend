<template>
    <Pie :data="data" :options="options" />
</template>
<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)


export default {
    name: 'PieChart',
    props: [
        'data',
        'options'
    ],
    components: {
        Pie
    },
    data() {
        return {
        }
    },
}
</script>

