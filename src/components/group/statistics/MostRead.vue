<template>
    <div class="row">
        <!-- ########## START Most Read ########## -->
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="header-title">
                        <h4 class="card-title">الأكثر قراءة</h4>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row d-flex justify-content-center mb-2">
                        <div class="col-6 m-auto d-flex justify-content-end">
                            <img src="@/assets/images/gi-9.jpg" alt="profile-img"
                        class="rounded-circle img-fluid avatar-120" />

                        </div>
                        <div class="col-6 m-auto">
                            <h3>اسم السفير</h3>
                            <h5>500</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ########## END Most Read ########## -->
    </div>
</template>

<script>
import Marks from '@/API/services/marks.service'

export default {
    name: 'Most Read',
    created() {
        //week mark
        //this.week_mark = this.statistics.week_mark;
        // group AVG        
        // this.group_week_avg = (Math.round(this.statistics.group_week_avg * 100) / 100).toFixed(2);
    },
    props: {
        statistics: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            week_mark: null,
            month_achievement: null,
            group_week_avg: null,
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
