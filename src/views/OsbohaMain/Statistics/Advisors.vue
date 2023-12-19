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
                        <tbody v-for="leader in statistics" :key="leader.leader_name">
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
                        <tbody v-for="leader in statistics" :key="leader.leader_name">
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
                        <tbody v-for="leader in statistics" :key="leader.leader_name">
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
                        <tbody v-for="leader in statistics" :key="leader.leader_name">
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
                        <tbody v-for="leader in statistics" :key="leader.leader_name">
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
                        <tbody v-for="leader in statistics" :key="leader.leader_name">
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
                <!-- ##### TO DO LATER ##### -->
                <!-- <div class="blog-description">
                    <table class="table inline-grid w-100">
                        <thead>
                            <tr class="d-flex justify-content-around">
                                <th scope="col">قادة حصلو على دعم</th>
                                <th scope="col">قادة منسحبين</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="d-flex justify-content-around">
                                <td class="align-middle text-center">
                                    <span> فريق متابعة 1 </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> x </span>
                                </td>
                            </tr>
                            <tr class="d-flex justify-content-around">
                                <td class="align-middle text-center">
                                    <span> فريق متابعة 1 </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> y </span>
                                </td>
                            </tr>
                            <tr class="d-flex justify-content-center">
                                <td class="align-middle text-center" colspan="4">
                                    <span> العدد الكلي z </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                </div> -->

                <div class="blog-description">
                    <h4>
                        قراءة القادة
                        <span class="material-symbols-outlined align-middle me-1">
                            book_5
                        </span>

                    </h4>
                    <table class="table inline-grid w-100">
                        <thead>
                            <tr class="d-flex justify-content-around">
                                <th scope="col">القائد</th>
                                <th scope="col">عدد الصفحات</th>
                                <th scope="col">نوع الانجاز</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody v-for="mark in leadersReading" :key="mark.id">
                            <tr class="d-flex justify-content-around">
                                <td class="align-middle text-center">
                                    <span> {{ mark.user.name }} </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> {{ mark.total_pages }} </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span v-if="mark.total_thesis > 0 && mark.total_screenshot > 0">
                                        أطروحة واقتباسات
                                    </span>
                                    <span v-else-if="mark.total_thesis > 0">أطروحة</span>
                                    <span v-else-if="mark.total_screenshot > 0">اقتباسات</span>
                                    <span v-else-if="mark.total_pages == 0">لا يوجد انجاز</span>
                                    <spanb v-else>قراءة فقط</spanb>
                                </td>
                                <td class="align-middle text-center">
                                    <router-link :to="{
                                        name: 'group.listOneAmbassadorReading',
                                        params: { ambassador_id: mark.user_id, week_id: mark.week_id },
                                    }" class="material-symbols-outlined md-18 me-1 text-primary">
                                        visibility
                                    </router-link>
                                </td>

                            </tr>

                        </tbody>
                        <tr class="d-flex justify-content-center">
                            <td class="align-middle text-center" colspan="4">
                                <span> العدد الكلي للصفحات {{ totalPages }} </span>
                            </td>
                        </tr>

                    </table>
                    <hr />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import StatisticsService from "@/API/services/statistics.service";

export default {
    name: 'Supervisor Statistics',
    async created() {
        const response = await StatisticsService.supervisingStatistics(this.$route.params.supervisor_id);
        this.statistics = response.statistics_data;
        this.leadersReading = response.leaders_reading;
        this.supervisorGroup = response.supervisor_group
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