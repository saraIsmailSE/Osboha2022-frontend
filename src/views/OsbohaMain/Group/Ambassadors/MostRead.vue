<template>
    <div class="col-md-4" v-if="most_read">
        <iq-card>
            <template v-slot:body>
                <div class="iq-todo-right">
                    <div class="iq-todo-friendlist mt-3">
                        <ul class="suggestions-lists m-0 p-0">
                            <li class="d-flex mb-4 align-items-center" v-for="(record, index) in most_read.slice(0, 2)"
                                :key=index>
                                <div class="user-img img-fluid">
                                    <img v-if="record.user.user_profile.profile_picture" :src="resolve_porfile_img('60x60', record.user.user_profile.profile_picture, record.user.user_profile.id)"
                                        alt="profile-img" class="rounded-circle avatar-40" :title="record.user.name"/>

                                    <img v-else :src="resolve_porfile_img('60x60', 'ananimous_'+record.user.gender+'.png', 'ananimous')"
                                        alt="profile-img" :title="record.user.name"
                                        class="rounded-circle avatar-40">
                                </div>
                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <div class="ms-3">
                                        <h6>{{ record.user.name }}</h6>
                                        <p class="mb-0">عدد الصفحات: {{ record.total_pages }}</p>
                                    </div>
                                    <div class="card-header-toolbar d-flex align-items-center">
                                        <router-link
                                            :to="{ name: 'group.listOneAmbassadorReading', params: { ambassador_id: record.user_id } }">
                                            <i class="material-symbols-outlined md-18 me-1 text-primary">
                                                visibility
                                            </i>
                                        </router-link>
                                    </div>
                                </div>
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
import profileImagesService from '@/API/services/profile.images.service'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
    name: 'Most Read',
    components: {
        Bar,
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
    methods:{
                /**
        * get profile picture or cover.
        *  @param  image size, image name, profile id
        * @return image url
        */
        resolve_porfile_img(size, imageName, profile_id) {
            return profileImagesService.resolve_porfile_img(size, imageName, profile_id);
        },

    },
}
</script>
