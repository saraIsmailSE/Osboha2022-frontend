<template>
    <!-- ########## START THSES AND QUOTES  ########## -->
    <div class="col-12">
        <div class="card card-block card-stretch card-height">
            <div class="card-header">
                <div class=" d-flex justify-content-between flex-wrap">
                    <h4 class="card-title">الأطروحات والاقتباسات</h4>
                    <div class="dropdown w-100">
                        <select class="form-select" @change="thesesAndScreensByWeek()" v-model="weekFilter">
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
import GroupService from "@/API/services/group.service";

export default {
    name: 'Thsese And Quotes Statistics',
    created() {
        this.theses = this.total_theses
        this.screenshots = this.total_screenshot

    },
    props: {
        total_theses: {
            required: true,
        },
        total_screenshot: {
            required: true,
        }
    },
    components: {
        PieChart,
    },
    data() {
        return {
            theses: 0,
            screenshots: 0,
            weekFilter: 'current',
            pie_options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        /**
         * get screenshots and screens by week
         * 
         * @param  $group_id,$filter
         * @return number of theses and screenshots;
         */
        async thesesAndScreensByWeek() {
            const response = await GroupService.thesesAndScreensByWeek(this.$route.params.group_id, this.weekFilter)
            this.theses = response.total_thesis
            this.screenshots = response.total_screenshot
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
            data.datasets[0].data[0] = this.theses
            data.datasets[0].data[1] = this.screenshots

            return data;
        },

    }
}

</script>
