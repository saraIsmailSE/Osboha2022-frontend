<template>
    <div class="col-12">
        <div class="card card-block card-stretch card-height blog">
            <div class="card-header">
                <h2 v-if="supervisorGroup">
                    احصائية القادة
                    ||
                    <router-link :to="{
                        name: 'group.group-detail',
                        params: { group_id: supervisorGroup.id },
                    }">
                        {{ supervisorGroup.name }}
                    </router-link>
                    <span class="material-symbols-outlined align-middle me-1">
                        diversity_1
                    </span>

                </h2>
            </div>

            <div class="card-body" v-if="statistics">
                <FollowupTeamsStatistics :teamData=statistics />

            </div>
            <div class="card-body" v-if="leadersReading">
                <MembersReading :ReadingData="leadersReading" :headTitle="'القادة'" :usetType="'القائد'" />
            </div>

        </div>
    </div>
</template>
<script>
import StatisticsService from "@/API/services/statistics.service";
import FollowupTeamsStatistics from "@/components/statistics/FollowupTeams";
import MembersReading from "@/components/statistics/MembersReading";

export default {
    name: 'Supervisor Statistics',
    async created() {
        const response = await StatisticsService.leadersStatistics(this.$route.params.supervisor_id);
        this.statistics = response.statistics_data;
        this.leadersReading = response.leaders_reading;
        this.supervisorGroup = response.supervisor_group
    },
    components: {
        FollowupTeamsStatistics,
        MembersReading,
    },
    data() {
        return {
            statistics: null,
            leadersReading: null,
            supervisorGroup: null,
        }
    },
    computed: {
        generalAvg() {
            // Calculate the sum of all week_avg values
            const sum = this.statistics.reduce((accumulator, item) => accumulator + parseFloat(item.week_avg), 0);
            // Calculate the average
            return Math.round(sum / this.statistics.length).toFixed(2);
        },
        totalWithdraw() {
            return this.statistics.reduce((accumulator, item) => accumulator + parseFloat(item.ambassadors_withdraw_in_group), 0);
        },
        totalFreezed() {
            return this.statistics.reduce((accumulator, item) => accumulator + parseFloat(item.is_freezed), 0);
        },
        totalExcluded() {
            return this.statistics.reduce((accumulator, item) => accumulator + parseFloat(item.ambassadors_excluded_in_group), 0);
        },
        totalOfZeroVarible() {
            return this.statistics.reduce((accumulator, item) => accumulator + parseFloat(item.number_zero_varible), 0);
        },
        totalNewAmbassadros() {
            return this.statistics.reduce((accumulator, item) => accumulator + parseFloat(item.new_ambassadors), 0);
        },
        totalPages() {
            return this.leadersReading.reduce((accumulator, item) => accumulator + parseFloat(item.total_pages), 0);
        }
    }

}
</script>
<style scoped>
.inline-grid {
    display: inline-table;
}
</style>