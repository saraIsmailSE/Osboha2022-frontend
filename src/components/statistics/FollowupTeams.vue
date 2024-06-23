<template>
    <div class="card-body" v-if="teamDataTofilter">
        <div class="blog-description">
            <table class="table inline-grid w-100">
                <thead>
                    <tr class="text-center">
                        <th scope="col">القائد</th>
                        <th scope="col">فريق المتابعة</th>
                        <th scope="col">عدد السفراء</th>
                        <th scope="col">المعدل الأسبوعي</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="leader in teamDataTofilter" :key="leader.leader_name">
                        <td class="align-middle text-center">
                            <span>{{ leader.leader_name }} </span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ leader.team }}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ leader.number_ambassadors }} </span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ Math.round(leader.week_avg).toFixed(2) }} </span>
                        </td>
                    </tr>
                    <tr v-if="supervisor_followup_team" class="supervisor_team">
                        <td class="align-middle text-center">
                            <span>{{ supervisor_followup_team.leader_name }} </span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ supervisor_followup_team.team }}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ supervisor_followup_team.number_ambassadors }} </span>
                        </td>
                        <td class="align-middle text-center">
                            <span>
                                {{ Math.round(supervisor_followup_team.week_avg).toFixed(2) }}
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tr class="">
                    <td class="align-middle text-center" colspan="4">
                        <span>المعدل العام : {{ Math.round(generalAvg).toFixed(2) }} </span>
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
                <tbody>
                    <tr class="d-flex justify-content-around" v-for="leader in teamDataTofilter" :key="leader.leader_name">
                        <td class="align-middle text-center">
                            <span> {{ leader.team }}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ leader.ambassadors_withdraw_in_group }}</span>
                        </td>
                    </tr>
                    <tr v-if="supervisor_followup_team" class=" d-flex justify-content-around supervisor_team">
                        <td class="align-middle text-center">
                            <span> {{ supervisor_followup_team.team }}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ supervisor_followup_team.ambassadors_withdraw_in_group }}</span>
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
                <tbody>
                    <tr class=" d-flex justify-content-around" v-for="leader in teamDataTofilter" :key="leader.leader_name">

                        <td class="align-middle text-center">
                            <span> {{ leader.team }}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ leader.ambassadors_excluded_in_group }}</span>
                        </td>
                    </tr>
                    <tr v-if="supervisor_followup_team" class=" d-flex justify-content-around supervisor_team">
                        <td class="align-middle text-center">
                            <span> {{ supervisor_followup_team.team }}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ supervisor_followup_team.ambassadors_excluded_in_group }}</span>
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
                <tbody>
                    <tr class="d-flex justify-content-around" v-for="leader in teamDataTofilter" :key="leader.leader_name">

                        <td class="align-middle text-center">
                            <span> {{ leader.team }} </span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ leader.is_freezed }}</span>
                        </td>
                    </tr>
                    <tr v-if="supervisor_followup_team" class=" d-flex justify-content-around supervisor_team">
                        <td class="align-middle text-center">
                            <span> {{ supervisor_followup_team.team }}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ supervisor_followup_team.is_freezed }}</span>
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
                <tbody>
                    <tr class="d-flex justify-content-around" v-for="leader in teamDataTofilter" :key="leader.leader_name">
                        <td class="align-middle text-center">
                            <span> {{ leader.team }} </span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ leader.number_zero_varible }} </span>
                        </td>
                    </tr>
                    <tr v-if="supervisor_followup_team" class=" d-flex justify-content-around supervisor_team">
                        <td class="align-middle text-center">
                            <span> {{ supervisor_followup_team.team }}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ supervisor_followup_team.number_zero_varible }}</span>
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
                <tbody>
                    <tr class="d-flex justify-content-around" v-for="leader in teamDataTofilter" :key="leader.leader_name">
                        <td class="align-middle text-center">
                            <span> {{ leader.team }} </span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ leader.new_ambassadors }} </span>
                        </td>
                    </tr>
                    <tr v-if="supervisor_followup_team" class=" d-flex justify-content-around supervisor_team">
                        <td class="align-middle text-center">
                            <span> {{ supervisor_followup_team.team }}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ supervisor_followup_team.new_ambassadors }}</span>
                        </td>
                    </tr>

                </tbody>
                <tr>
                    <td class="align-middle text-center" colspan="4">
                        <span>العدد الكلي للأعضاء الجدد: {{ totalNewambassadors }} </span>
                    </td>
                </tr>
            </table>
            <hr />
        </div>
    </div>
</template>
<script>

export default {
    name: 'followup teams statistics',
    created() {
        this.teamDataTofilter = this.teamData
    },
    props: {
        teamData: {
            type: Object,
            required: true,
        },
        supervisor_followup_team: {
            type: Object,
        },
        generalAvg: {
            type: Number
        }
    },
    data() {
        return {
            teamDataTofilter: null,
        }
    },

    computed: {

        totalWithdraw() {
            const followupTeams_totalWithdraw = this.teamDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.ambassadors_withdraw_in_group), 0);
            if (this.supervisor_followup_team) {
                return followupTeams_totalWithdraw + parseFloat(this.supervisor_followup_team.ambassadors_withdraw_in_group);
            }
            return followupTeams_totalWithdraw;
        },
        totalFreezed() {
            const followupTeams_totalFreezed = this.teamDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.is_freezed), 0);
            if (this.supervisor_followup_team) {
                return followupTeams_totalFreezed + parseFloat(this.supervisor_followup_team.is_freezed);
            }
            return followupTeams_totalFreezed
        },
        totalExcluded() {
            const followupTeams_totalExcluded = this.teamDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.ambassadors_excluded_in_group), 0);
            if (this.supervisor_followup_team) {
                return followupTeams_totalExcluded + parseFloat(this.supervisor_followup_team.ambassadors_excluded_in_group);
            }
            return followupTeams_totalExcluded
        },
        totalOfZeroVarible() {
            const followupTeams_totalOfZeroVarible = this.teamDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.number_zero_varible), 0);
            if (this.supervisor_followup_team) {
                return followupTeams_totalOfZeroVarible + parseFloat(this.supervisor_followup_team.number_zero_varible);
            }
            return followupTeams_totalOfZeroVarible
        },
        totalNewambassadors() {
            const followupTeams_totalNewambassadors = this.teamDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.new_ambassadors), 0);
            if (this.supervisor_followup_team) {
                return followupTeams_totalNewambassadors + parseFloat(this.supervisor_followup_team.ambassadors_excluded_in_group);
            }
            return followupTeams_totalNewambassadors
        },
    }

}
</script>
<style scoped>
.inline-grid {
    display: inline-table;
}

.supervisor_team {
    background-color: #E4E9DE;
}
</style>