<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="card-header">
                <h2>المارثون الأول - اسم السفير </h2>
                <h4>فريق 1 </h4>
            </div>

            <div class="iq-card-body p-3">
                <marathon_points_details />
                <hr />
                <add_extra_points />
            </div>
        </iq-card>
    </div>
</template>
<script>
import marathon_points_details from "@/components/Marathon/PointsDetails";
import add_extra_points from "@/components/Marathon/AddExtraPoints";

export default {
    name: "List Marathon Points",
    components: {
        marathon_points_details,
        add_extra_points
    },
    data() {
        return {
        };
    },
    async created() {
    },
    methods: {
    },
};
</script>