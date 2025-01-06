<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img class="img-fluid rounded w-50" src="@/assets/images/main/marathon.png"
                        alt="تحديد أسابيع المارثون" />
                </div>
            </div>
            <div class="col-12 bg-white pt-2">
                <div class="sign-in-from">
                    <h2 class="text-center" style="direction: rtl;" v-if="current_marathon"> المارثون الحالي - {{
                        current_marathon.title }} </h2>
                    <h2 class="text-center" v-else> المارثون الحالي - لا يوجد </h2>
                    <hr />

                    <div class="d-inline-block w-100 mb-3 text-center" v-if="current_marathon">
                        <button type="submit" class="btn btn-info" :disabled="loading"
                            @click="GroupMarathonPointsExport(current_marathon.id)">
                            تحميل نقاط المجموعة
                        </button>
                    </div>
                </div>
            </div>
        </iq-card>
    </div>
</template>
<script>

import MarathonPoints from "@/API/MarathonServices/marathon-points.service";
import OsbohaMarathon from "@/API/MarathonServices/osboha-marathon.service";
import helper from "@/utilities/helper";

export default {
    name: "Group Marathon Points Export",

    async created() {
        this.current_marathon = await OsbohaMarathon.getCurrentMarathon();
    },

    data() {
        return {
            current_marathon: null,
            message: "",
            loading: false,
        };
    },
    methods: {
        async GroupMarathonPointsExport(marathon_id) {
            const response = await MarathonPoints.GroupMarathonPointsExport(this.$route.params.group_id, marathon_id);
            helper.toggleToast(
                "تم التحميل",
                "success"
            );

        },
    },
};
</script>