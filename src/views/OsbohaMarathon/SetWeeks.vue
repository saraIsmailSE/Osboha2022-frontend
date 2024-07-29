<template>
    <div ref="listContainer">
        <div class="row">
            <div class="col-sm-12">
                <setMarathonWeeks />
            </div>
        </div>
    </div>
</template>
<script>
import setMarathonWeeks from "@/components/Marathon/SetMarathon";

export default {
    name: "Set Marathon Weeks",
    components: {
        setMarathonWeeks,
    },
    created() {
    },
    data() {
        return {

        };
    },

    methods: {
    },
    computed: {
    }
};


</script>