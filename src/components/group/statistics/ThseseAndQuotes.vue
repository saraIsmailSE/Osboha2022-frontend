<template>
    <!-- ########## START THSES AND QUOTES  ########## -->
    <div class="col-12">
        <div class="card card-block card-stretch card-height">
            <div class="card-header">
                <div class=" d-flex justify-content-between flex-wrap">
                    <h4 class="card-title">الأطروحات والاقتباسات</h4>
                    <div class="dropdown w-100">
                        <select class="form-select" @change="userWeekAchievement()" v-model="weekAchievementFilter">
                            <option class="dropdown-item" value="current" selected>هذا الأسبوع</option>
                            <option class="dropdown-item" value="previous">الاسبوع السابق</option>
                            <option class="dropdown-item" value="in_a_month">خلال الشهر</option>
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
</template>

<script>
import PieChart from '../../Charts/PieChart.vue'
import Marks from '@/API/services/marks.service'

export default {
    name: 'Thsese And Quotes Statistics',
    created() {
        //week mark
        this.week_mark = this.weekMark
    },
    props: {
        weekMark: {
            type: [Object],
            required: true,
        },
    },
    components: {
        PieChart,
    },
    data() {
        return {
            week_mark: null,
            weekAchievementFilter: 'current',
            pie_options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {

        /**
         * get user week Achievement.
         * @return week Achievement
         */
        async userWeekAchievement() {
            const response = await Marks.userWeekAchievement(this.$route.params.user_id, this.weekAchievementFilter)
            this.week_mark = response.week_mark
            console.log(this.week_mark);

        },

    },
    computed: {
        week_title() {
            return this.statistics.week.title
        },
        pie_data() {
            let data = {
                labels: ['الأطروحات', 'الاقتباسات'],
                datasets: [
                    {
                        backgroundColor: ['#278036', '#1D1A55'],
                        data: []
                    }
                ]
            }
            //Pie Chart [for theses and qoutes]
            // data.datasets[0].data[0] = this.week_mark.total_thesis
            // data.datasets[0].data[1] = this.week_mark.total_screenshot
            data.datasets[0].data[0] = 100
            data.datasets[0].data[1] = 150

            return data;
        },

    }
}

</script>
