<template>
    <div class="col-12">
        <div class="card card-block card-stretch card-height blog">
            <div class="text-center m-auto" v-if="loding">
                <img class="img-fluid rounded w-75" src="@/assets/images/gif/chart_2.gif" alt="add-group" />
                <h4 class="text-center">
                    يتم تجهيز الجرد
                </h4>
            </div>
            <div class="card-header">
                <h2 v-if="advisorGroup">
                    احصائية المراقبين
                    ||
                    <router-link :to="{
                        name: 'group.group-detail',
                        params: { group_id: advisorGroup.id },
                    }">
                        {{ advisorGroup.name }}
                    </router-link>
                    <span class="material-symbols-outlined align-middle me-1">
                        diversity_1
                    </span>

                </h2>
            </div>

            <div class="card-body" v-if="supervisorFollowupTeams">
                <h3>
                    الأفرقة الرقابية
                    <span role="button" class="material-symbols-outlined" v-if="!showSupervisorFollowupTeams"
                        @click="() => { showOwnFollowupTeams = false; showSupervisorFollowupTeams = !showSupervisorFollowupTeams }">
                        expand_more
                    </span>
                    <span role="button" class="material-symbols-outlined" v-if="showSupervisorFollowupTeams"
                        @click="showSupervisorFollowupTeams = !showSupervisorFollowupTeams">
                        expand_less
                    </span>

                </h3>

                <div v-if="showSupervisorFollowupTeams">
                    <div class="blog-description">
                        <table class="table inline-grid w-100">
                            <thead>
                                <tr class="text-center">
                                    <th scope="col">المراقب</th>
                                    <th scope="col">فريق الرقابة</th>
                                    <th scope="col">عدد القادة</th>
                                    <th scope="col">المعدل الأسبوعي</th>
                                    <th scope="col">احصائية القادة</th>
                                </tr>
                            </thead>
                            <tbody v-for="supervisor_team in supervisorFollowupTeams"
                                :key="supervisor_team.superviser_name">
                                <tr class="">
                                    <td class="align-middle text-center">
                                        <span>{{ supervisor_team.superviser_name }} </span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span> {{ supervisor_team.team }}</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span> {{ supervisor_team.number_of_leaders }} </span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span> {{ (Math.round(supervisor_team.week_avg * 100) / 100).toFixed(2) }} </span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <router-link :to="{
                                            name: 'statistics.Leaders',
                                            params: {
                                                supervisor_id: supervisor_team.supervisor_id,
                                            },
                                        }" class="material-symbols-outlined md-18 me-1 text-primary">
                                            visibility
                                        </router-link>
                                    </td>
                                </tr>

                            </tbody>
                            <tr class="">
                                <td class="align-middle text-center" colspan="5">
                                    <span>المعدل العام : {{ generalAvg }} </span>
                                </td>
                            </tr>

                        </table>
                        <hr />
                    </div>
                    <div class="blog-description">
                        <table class="table inline-grid w-100">
                            <thead>
                                <tr>
                                    <th scope="col">

                                        <span class="material-symbols-outlined align-middle me-1">
                                            directions_run
                                        </span>
                                        عدد المنسحبين
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-for="supervisor_team in supervisorFollowupTeams"
                                :key="supervisor_team.superviser_name">
                                <tr class="text-center">

                                    <td class="align-middle text-center">
                                        <span> {{ supervisor_team.team }}</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span> {{ supervisor_team.ambassadors_withdraw_in_group }}</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tr>
                                <td class="align-middle text-center" colspan="4">
                                    <span> العدد الكلي للمنسحبين: {{ totalWithdraw }}</span>
                                </td>
                            </tr>
                        </table>
                        <hr />
                    </div>
                    <div class="blog-description">
                        <table class="table inline-grid w-100">
                            <thead>
                                <tr>
                                    <th scope="col">

                                        <span class="material-symbols-outlined align-middle me-1">
                                            person_cancel
                                        </span>
                                        عدد المستبعدين
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-for="supervisor_team in supervisorFollowupTeams"
                                :key="supervisor_team.superviser_name">
                                <tr class="text-center">

                                    <td class="align-middle text-center">
                                        <span> {{ supervisor_team.team }}</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span> {{ supervisor_team.ambassadors_excluded_in_group }}</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tr>

                                <td class="align-middle text-center" colspan="4">
                                    <span> العدد الكلي للمستبعدين: {{ totalExcluded }}</span>
                                </td>
                            </tr>
                        </table>
                        <hr />
                    </div>

                    <div class="blog-description">
                        <table class="table inline-grid w-100">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <span class="material-symbols-outlined align-middle me-1">
                                            do_not_disturb_on
                                        </span>
                                        عدد المجمدين
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-for="supervisor_team in supervisorFollowupTeams"
                                :key="supervisor_team.superviser_name">
                                <tr class="d-flex justify-content-around">

                                    <td class="align-middle text-center">
                                        <span> {{ supervisor_team.team }} </span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span> {{ supervisor_team.is_freezed }}</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tr>
                                <td class="align-middle text-center" colspan="4">
                                    <span>العدد الكلي للمجمدين: {{ totalFreezed }} </span>
                                </td>
                            </tr>
                        </table>
                        <hr />
                    </div>
                    <div class="blog-description">
                        <table class="table inline-grid w-100">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <span class="material-symbols-outlined align-middle me-1">
                                            trending_up
                                        </span>

                                        عدد الأصفار المتحولة إلى علامة
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-for="supervisor_team in supervisorFollowupTeams"
                                :key="supervisor_team.superviser_name">
                                <tr class="d-flex justify-content-around">
                                    <td class="align-middle text-center">
                                        <span> {{ supervisor_team.team }} </span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span> {{ supervisor_team.number_zero_varible }} </span>
                                    </td>
                                </tr>
                            </tbody>
                            <tr>
                                <td class="align-middle text-center" colspan="4">
                                    <span>العدد الكلي للأصفار المتحولة إلى علامة: {{ totalOfZeroVarible }} </span>
                                </td>
                            </tr>
                        </table>
                        <hr />
                    </div>

                    <div class="blog-description">
                        <table class="table inline-grid w-100">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <span class="material-symbols-outlined align-middle me-1">
                                            person_add
                                        </span>

                                        عدد الأعضاء الجدد
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-for="supervisor_team in supervisorFollowupTeams"
                                :key="supervisor_team.superviser_name">
                                <tr class="d-flex justify-content-around">
                                    <td class="align-middle text-center">
                                        <span> {{ supervisor_team.team }} </span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span> {{ supervisor_team.new_ambassadors }} </span>
                                    </td>
                                </tr>
                            </tbody>
                            <tr>
                                <td class="align-middle text-center" colspan="4">
                                    <span>العدد الكلي للأعضاء الجدد: {{ totalNewAmbassadros }} </span>
                                </td>
                            </tr>
                        </table>
                        <hr />
                    </div>
                </div>
            </div>

            <div class="card-body" v-if="ownFollowupTeams">
                <h3>
                    أفرقة المتابعة الخاصة بالمراقبين
                    <span role="button" class="material-symbols-outlined" v-if="!showOwnFollowupTeams"
                        @click="() => { showSupervisorFollowupTeams = false; showOwnFollowupTeams = !showSupervisorFollowupTeams }">
                        expand_more
                    </span>
                    <span role="button" class="material-symbols-outlined" v-if="showOwnFollowupTeams"
                        @click="showOwnFollowupTeams = !showOwnFollowupTeams">
                        expand_less
                    </span>

                </h3>

                <FollowupTeamsStatistics :teamData=ownFollowupTeams v-if="showOwnFollowupTeams" />
            </div>

            <div class="card-body" v-if="supervisorsReading">
                <MembersReading :ReadingData="supervisorsReading" :headTitle="'المراقبين'" :usetType="'المراقب'" />
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
        this.loding = true;
        const response = await StatisticsService.supervisorsStatistics(this.$route.params.advisor_id);
        this.ownFollowupTeams = response.supervisor_own_followup_team;
        this.supervisorFollowupTeams = response.supervisor_followup_teams
        this.supervisorsReading = response.supervisors_reading;
        this.advisorGroup = response.advisor_group;
        this.loding = false;

    },
    components: {
        FollowupTeamsStatistics,
        MembersReading,
    },
    data() {
        return {
            statistics: null,
            supervisorsReading: null,
            advisorGroup: null,
            ownFollowupTeams: null,
            supervisorFollowupTeams: null,
            showSupervisorFollowupTeams: false,
            showOwnFollowupTeams: false,
            loding: false,
        }
    },
    computed: {
        generalAvg() {
            // Calculate the sum of all week_avg values
            const sum = this.supervisorFollowupTeams.reduce((accumulator, item) => accumulator + parseFloat(item.week_avg), 0);
            // Calculate the average
            return Math.round(sum / this.supervisorFollowupTeams.length).toFixed(2);
        },
        totalWithdraw() {
            return this.supervisorFollowupTeams.reduce((accumulator, item) => accumulator + parseFloat(item.ambassadors_withdraw_in_group), 0);
        },
        totalFreezed() {
            return this.supervisorFollowupTeams.reduce((accumulator, item) => accumulator + parseFloat(item.is_freezed), 0);
        },
        totalExcluded() {
            return this.supervisorFollowupTeams.reduce((accumulator, item) => accumulator + parseFloat(item.ambassadors_excluded_in_group), 0);
        },
        totalOfZeroVarible() {
            return this.supervisorFollowupTeams.reduce((accumulator, item) => accumulator + parseFloat(item.number_zero_varible), 0);
        },
        totalNewAmbassadros() {
            return this.supervisorFollowupTeams.reduce((accumulator, item) => accumulator + parseFloat(item.new_ambassadors), 0);
        },
    }

}
</script>
<style scoped>
.inline-grid {
    display: inline-table;
}
</style>