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
                <tbody v-for="leader in teamDataTofilter.sort((a, b) => b.week_avg - a.week_avg)" :key="leader.leader_name">
                    <tr class="">
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
                            <span> {{ (Math.round(leader.week_avg * 100) / 100).toFixed(2) }} </span>
                        </td>
                    </tr>

                </tbody>
                <tr class="">
                    <td class="align-middle text-center" colspan="4">
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
                <tbody v-for="leader in teamDataTofilter.sort((a, b) => b.ambassadors_withdraw_in_group - a.ambassadors_withdraw_in_group)" :key="leader.leader_name">
                    <tr class="text-center">

                        <td class="align-middle text-center">
                            <span> {{ leader.team }}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ leader.ambassadors_withdraw_in_group }}</span>
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
                <tbody v-for="leader in teamDataTofilter.sort((a, b) => b.ambassadors_excluded_in_group - a.ambassadors_excluded_in_group)" :key="leader.leader_name">
                    <tr class="text-center">

                        <td class="align-middle text-center">
                            <span> {{ leader.team }}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ leader.ambassadors_excluded_in_group }}</span>
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
                <tbody v-for="leader in teamDataTofilter.sort((a, b) => b.is_freezed - a.is_freezed)" :key="leader.leader_name">
                    <tr class="d-flex justify-content-around">

                        <td class="align-middle text-center">
                            <span> {{ leader.team }} </span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ leader.is_freezed }}</span>
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
                <tbody v-for="leader in teamDataTofilter.sort((a, b) => b.number_zero_varible - a.number_zero_varible)" :key="leader.leader_name">
                    <tr class="d-flex justify-content-around">
                        <td class="align-middle text-center">
                            <span> {{ leader.team }} </span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ leader.number_zero_varible }} </span>
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
                <tbody v-for="leader in teamDataTofilter.sort((a, b) => b.new_ambassadors - a.new_ambassadors)" :key="leader.leader_name">
                    <tr class="d-flex justify-content-around">
                        <td class="align-middle text-center">
                            <span> {{ leader.team }} </span>
                        </td>
                        <td class="align-middle text-center">
                            <span> {{ leader.new_ambassadors }} </span>
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
</template>
<script>

export default {
    name: 'followup teams statistics',
    created(){
        this.teamDataTofilter=this.teamData
    },
    props: {
        teamData: {
            required: true,
        },
    },
    data() {
        return {
            teamDataTofilter: null,
        }
    },

    computed: {
        generalAvg() {
            // Calculate the sum of all week_avg values
            const sum = this.teamDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.week_avg), 0);
            // Calculate the average
            return Math.round(sum / this.teamDataTofilter.length).toFixed(2);
        },
        totalWithdraw() {
            return this.teamDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.ambassadors_withdraw_in_group), 0);
        },
        totalFreezed() {
            return this.teamDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.is_freezed), 0);
        },
        totalExcluded() {
            return this.teamDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.ambassadors_excluded_in_group), 0);
        },
        totalOfZeroVarible() {
            return this.teamDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.number_zero_varible), 0);
        },
        totalNewAmbassadros() {
            return this.teamDataTofilter.reduce((accumulator, item) => accumulator + parseFloat(item.new_ambassadors), 0);
        },
    }

}
</script>
<style scoped>
.inline-grid {
    display: inline-table;
}
</style>