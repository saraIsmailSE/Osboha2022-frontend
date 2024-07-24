<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card" v-if="osboha_marathon">
            <div class="card-header">
                <h2>{{ osboha_marathon.title }} - {{ user_name }} </h2>
                <h4>{{ group_name ? group_name : " لا يوجد فريق" }} </h4>
            </div>
            <marathon_points_summury :basic_points="basic_points" :bonus_points="bonus_points"
                :total_points="total_points" />
            <div class="iq-card-body p-3">
                <marathon_points_details :point_details="point_details" />

                <div v-if="isMarathonAdministrator">
                    <hr />
                    <add_extra_points @bonus-added="setPoints()" />
                </div>
            </div>
        </iq-card>
    </div>
</template>
<script>
import marathon_points_details from "@/components/Marathon/PointsDetails";
import marathon_points_summury from "@/components/Marathon/MarathonPointsSummury";
import add_extra_points from "@/components/Marathon/AddExtraPoints";
import MarathonPoints from "@/API/MarathonServices/marathon-points.service";
import UserInfoService from "@/Services/userInfoService";

export default {
    name: "List Marathon Points",
    components: {
        marathon_points_details,
        marathon_points_summury,
        add_extra_points
    },
    async created() {
        await this.setPoints()
    },
    data() {
        return {
            osboha_marathon: null,
            group_name: null,
            basic_points: null,
            bonus_points: 0,
            total_points: 0,
            user_name: '',
            point_details: null,

        };
    },
    methods: {
        async setPoints() {
            const response = await MarathonPoints.getMarathonPoints(this.$route.params.user_id, this.$route.params.marathon_id);
            if (response) {
                this.osboha_marathon = response.osboha_marathon;
                this.group_name = response.group_name;
                this.user_name = response.user_name
                this.marathon = response.osboha - this.marathon;
                this.basic_points = response.basic_points;
                this.bonus_points = response.bonus_points;
                this.total_points = response.total_points;
                this.point_details = response.point_details
            }

        }
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        isMarathonAdministrator() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "marathon_coordinator",
                'marathon_verification_supervisor',
            ]);
        },
    },

};
</script>