<template>
    <iq-card v-if="statistics">
        <template v-slot:body>
            <h2> فريق ABC احصائيات</h2>
            <Marks :statistics="statistics.total_statistics" :week_title="this.statistics.week.title" />
            <MostRead :most_read="statistics.most_read"/>
            <Achievement :total="this.statistics.total"/>
            <ThseseAndQuotes :total_theses="statistics.total_statistics.total_thesis" :total_screenshot="statistics.total_statistics.total_screenshot"/>
            <GroupMonth :monthAchievement="statistics.month_achievement" :monthTitle="statistics.month_achievement_title"/>
        </template>
    </iq-card>
</template>
<script>

import Marks from '@/components/group/statistics/Marks.vue'
import MostRead from '@/components/group/statistics/MostRead.vue'
import Achievement from '@/components/group/statistics/Achievement.vue'
import ThseseAndQuotes from '@/components/group/statistics/ThseseAndQuotes.vue'
import GroupMonth from '@/components/group/statistics/GroupMonth.vue'
import GroupService from "@/API/services/group.service";


export default {
    name: 'Statistics',
    components: {
        Marks,
        MostRead,
        Achievement,
        ThseseAndQuotes,
        GroupMonth
    },
    async created() {
        this.statistics = await GroupService.statistics(this.$route.params.group_id);
        console.log(this.statistics)
    },

    data() {
        return {
            statistics:null,

        }
    },
    methods: {
    },
}
</script>
