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
                <h2 v-if="consultantGroup">
                    احصائية الموجهين
                    ||
                    <router-link :to="{
                        name: 'group.group-detail',
                        params: { group_id: consultantGroup.id },
                    }">
                        {{ consultantGroup.name }}
                    </router-link>
                    <span class="material-symbols-outlined align-middle me-1">
                        diversity_1
                    </span>

                </h2>
            </div>

            <div class="card-body" v-if="advisorStatistics">
                <div class="blog-description">
                    <table class="table inline-grid w-100">
                        <thead>
                            <tr class="text-center">
                                <th scope="col">الموجه</th>
                                <th scope="col">فريق التوجيه</th>
                                <th scope="col">عدد المراقبين</th>
                                <th scope="col">عدد القادة</th>
                                <th scope="col">المعدل الأسبوعي</th>
                                <th scope="col">احصائية المراقبين</th>
                            </tr>
                        </thead>
                        <tbody v-for="statistics_data in advisorStatistics" :key="statistics_data.advisor_name">
                            <tr class="">
                                <td class="align-middle text-center">
                                    <span>{{ statistics_data.advisor_name }} </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.team }}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.number_of_supervisors }} </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.number_of_leaders }} </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> {{ (Math.round(statistics_data.week_avg )).toFixed(2) }} </span>
                                </td>
                                <td class="align-middle text-center">
                                    <router-link :to="{
                                        name: 'statistics.supervisors',
                                        params: {
                                            advisor_id: statistics_data.advisor_id,
                                        },
                                    }" class="material-symbols-outlined md-18 me-1 text-primary">
                                        visibility
                                    </router-link>
                                </td>
                            </tr>

                        </tbody>
                        <tr class="">
                            <td class="align-middle text-center" colspan="6">
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
                        <tbody v-for="statistics_data in advisorStatistics" :key="statistics_data.advisor_name">
                            <tr class="text-center">

                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.team }}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.ambassadors_withdraw_in_group }}</span>
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
                        <tbody v-for="statistics_data in advisorStatistics" :key="statistics_data.advisor_name">
                            <tr class="text-center">

                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.team }}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.ambassadors_excluded_in_group }}</span>
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
                        <tbody v-for="statistics_data in advisorStatistics" :key="statistics_data.advisor_name">
                            <tr class="d-flex justify-content-around">

                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.team }} </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.is_freezed }}</span>
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
                        <tbody v-for="statistics_data in advisorStatistics" :key="statistics_data.advisor_name">
                            <tr class="d-flex justify-content-around">
                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.team }} </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.number_zero_varible }} </span>
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
                        <tbody v-for="statistics_data in advisorStatistics" :key="statistics_data.advisor_name">
                            <tr class="d-flex justify-content-around">
                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.team }} </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.new_ambassadors }} </span>
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
            <div class="card-body" v-if="advisorsReading">
                <MembersReading :ReadingData="advisorsReading" :headTitle="'الموجيهن'" :usetType="'الموجه'" />
            </div>

            <h4 @click="$router.go(-1)" class="text-center mb-3" v-if="consultantGroup" role="button">
                <span class="align-middle material-symbols-outlined">
                    keyboard_return
                </span>
                عودة
            </h4>

        </div>
    </div>
</template>
<script>
import StatisticsService from "@/API/services/statistics.service";
import MembersReading from "@/components/statistics/MembersReading";

export default {
    name: 'Advisors Statistics',
    async created() {
        this.loding = true;
        const response = await StatisticsService.advisorsStatistics(this.$route.params.consultant_id);
        this.advisorStatistics = response.advisor_statistics;
        this.advisorsReading = response.advisors_reading;
        this.consultantGroup = response.consultant_group
        this.loding = false;
    },
    components: {
        MembersReading,
    },
    data() {
        return {
            advisorStatistics: null,
            advisorsReading: null,
            consultantGroup: null,
            loding: false,
        }
    },
    computed: {
        generalAvg() {
            // Calculate the sum of all week_avg values
            const sum = this.advisorStatistics.reduce((accumulator, item) => accumulator + parseFloat(item.week_avg), 0);
            // Calculate the average
            return Math.round(sum / this.advisorStatistics.length).toFixed(2);
        },
        totalWithdraw() {
            return this.advisorStatistics.reduce((accumulator, item) => accumulator + parseFloat(item.ambassadors_withdraw_in_group), 0);
        },
        totalFreezed() {
            return this.advisorStatistics.reduce((accumulator, item) => accumulator + parseFloat(item.is_freezed), 0);
        },
        totalExcluded() {
            return this.advisorStatistics.reduce((accumulator, item) => accumulator + parseFloat(item.ambassadors_excluded_in_group), 0);
        },
        totalOfZeroVarible() {
            return this.advisorStatistics.reduce((accumulator, item) => accumulator + parseFloat(item.number_zero_varible), 0);
        },
        totalNewAmbassadros() {
            return this.advisorStatistics.reduce((accumulator, item) => accumulator + parseFloat(item.new_ambassadors), 0);
        },
    }

}
</script>
<style scoped>
.inline-grid {
    display: inline-table;
}
</style>