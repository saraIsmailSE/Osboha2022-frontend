<template>
    <div class="col-md-4" v-if="most_read">
        <iq-card>
            <template v-slot:body>
                <div class="iq-todo-right">
                    <div class="iq-todo-friendlist mt-3">
                        <ul class="suggestions-lists m-0 p-0">
                            <li class="d-flex mb-4 align-items-center" v-for="(record, index) in most_read.slice(0, 2)"
                                :key=index>
                                <AchievementPages :record="record" />
                            </li>
                        </ul>
                        <div class="container mt-3 mb-3 d-flex  align-items-center justify-content-center" hight="200px">
                            <Bar id="my-chart-id" :options="chartOptions" :data="chartData" :height="500" :width="500" />
                        </div>

                        <router-link :to="{ name: 'group.achievementAsPages', params: { group_id: group_id } }"
                            class="btn text-white d-flex align-items-center" style=" background-color:#2e328b; ">
                            <i class="material-symbols-outlined md-18 me-1">
                                patient_list
                            </i> عرض الكل
                        </router-link>
                    </div>
                </div>
            </template>
        </iq-card>
    </div>
</template>


<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import AchievementPages from '@/components/group/AchievementPages.vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
    name: 'Most Read',
    components: {
        Bar,
        AchievementPages,
    },
    created(){
            if (this.most_read) {
                for (let i = 0; i < this.most_read.length; i++) {
                    this.chartData.datasets[0].data[i] = this.most_read[i].total_pages
                    this.chartData.labels[i] = this.most_read[i].user.name
                }
            }
    },
    props: {
        most_read: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            group_id: this.$route.params.group_id,
            chartData: {
                labels: [],
                datasets: [{
                    label: 'قراءة السفراء',
                    backgroundColor: '#1d1a55',
                    data: [],
                    borderWidth: 2,
                    borderRadius: 5,
                    borderSkipped: false,

                }
                ],
            },
            chartOptions: {
                responsive: true,
            }
        }
    },
}
</script>
