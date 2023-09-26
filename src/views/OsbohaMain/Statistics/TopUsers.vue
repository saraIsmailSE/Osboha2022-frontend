<template>
    <div class="row">
        <iq-card body-class="profile-page p-0">
            <template v-slot:body>
                <div class="profile-header">
                    <div class="profile-info p-4">
                        <div class="row">
                            <div class="col-12">
                                <tab-nav :pills="true" id="pills-tab" class="profile-feed-items d-flex justify-content-end"
                                    v-if="lastWeek">
                                    <tab-nav-items :active="true" id="month-top-usres" href="#by-week" class="w-50"
                                        ariaControls="pills-profile" role="tab" :ariaSelected="false"
                                        :title="`الأسبوع - ${lastWeek.title}`" v-if="lastWeek" />
                                    <tab-nav-items :active="false" id="month-top-usres" href="#by-month" class="w-50"
                                        ariaControls="pills-profile" role="tab" :ariaSelected="false"
                                        :title="`شهر - ${MONTHS[monthName]}`" v-if="monthName" />
                                </tab-nav>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div class="row">
                <div class="col-12 profile-center">
                    <tab-content id="pills-tabContent-2">
                        <tab-content-item :active="true" id="by-week" aria-labelled-by="week-top-usres">
                            <ByWeek />
                        </tab-content-item>
                        <tab-content-item :active="false" id="by-month" aria-labelled-by="month-top-usres">
                            <ByMonth :monthName="MONTHS[monthName]" />
                        </tab-content-item>
                    </tab-content>
                </div>
            </div>
        </iq-card>
    </div>
</template>
<script>
import { MONTHS } from "@/utilities/constants";
import ByWeek from "./ByWeek";
import ByMonth from "./ByMonth";
import StatisticsService from "@/API/services/statistics.service";

export default {
    name: 'Top Users',
    async created() {
        const date = new Date(); // Replace with your date
        const lastMonth = new Date(date);
        lastMonth.setMonth(date.getMonth() - 1);
        const options = { month: 'long' };
        this.monthName = lastMonth.toLocaleString(undefined, options);
        this.lastWeek = await StatisticsService.lastWeek();

    },
    components: {
        ByWeek,
        ByMonth,
    },
    data() {
        return {
            monthName: '',
            MONTHS,
            lastWeek: null,
        }
    },
}
</script>
