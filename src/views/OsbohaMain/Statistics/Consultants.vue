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
                <h2 v-if="administratorGroup">
                    احصائية المستشارين
                    ||
                    <router-link :to="{
                        name: 'group.group-detail',
                        params: { group_id: administratorGroup.id },
                    }">
                        {{ administratorGroup.name }}
                    </router-link>
                    <span class="material-symbols-outlined align-middle me-1">
                        diversity_1
                    </span>

                </h2>
            </div>

            <div class="card-body" v-if="consultantStatistics">
                <div class="blog-description">
                    <table class="table inline-grid w-100">
                        <thead>
                            <tr class="text-center">
                                <th scope="col">المستشار</th>
                                <th scope="col">فريق الاستشارة</th>
                                <th scope="col">عدد الموجهين</th>
                                <th scope="col">احصائية الموجهين</th>
                            </tr>
                        </thead>
                        <tbody v-for="statistics_data in consultantStatistics" :key="statistics_data.consultant_name">
                            <tr class="">
                                <td class="align-middle text-center">
                                    <span>{{ statistics_data.consultant_name }} </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.team }}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span> {{ statistics_data.number_of_advisors }} </span>
                                </td>
                                <td class="align-middle text-center">
                                    <router-link :to="{
                                        name: 'statistics.advisors',
                                        params: {
                                            consultant_id: statistics_data.consultant_id,
                                        },
                                    }" class="material-symbols-outlined md-18 me-1 text-primary">
                                        visibility
                                    </router-link>
                                </td>
                            </tr>

                        </tbody>

                    </table>
                    <hr />
                </div>

            </div>
            <div class="card-body" v-if="consultantsReading">
                <MembersReading :ReadingData="consultantsReading" :headTitle="'المستشارين'" :usetType="'المتشار'" />
            </div>

        </div>
    </div>
</template>
<script>
import StatisticsService from "@/API/services/statistics.service";
import MembersReading from "@/components/statistics/MembersReading";

export default {
    name: 'Supervisor Statistics',
    async created() {
        this.loding = true;
        const response = await StatisticsService.consultantsStatistics(this.$route.params.admin_id);
        this.consultantStatistics = response.consultant_statistics;
        this.consultantsReading = response.consultants_reading;
        this.administratorGroup = response.administrator_groupك
        this.loding = false;
    },
    components: {
        MembersReading,
    },
    data() {
        return {
            consultantStatistics: null,
            consultantsReading: null,
            administratorGroup: null,
            loding: false,
        }
    },

}
</script>
<style scoped>
.inline-grid {
    display: inline-table;
}
</style>