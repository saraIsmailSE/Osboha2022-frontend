<template>
    <div class="container" style="background-color: #f1f9f5">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-12 col-xl-12 mt-3 mb-3">
                <div class="card" style="border-radius: 15px">
                    <div class="card-body text-center">
                        <BasicInfo :user="user" :roles="roles" :in_charge_of="in_charge_of" />
                        <div class="inline-block mt-3">
                            <button type="button"
                                @click="() => { show_groups = !show_groups; show_marks = false; }"
                                class="mb-3 btn bg-white text-dark border-dark w-100 d-flex justify-content-between">
                                <h5>
                                    موجود في المجموعات
                                    <span class="material-symbols-outlined align-middle me-1">
                                        diversity_3
                                    </span>

                                </h5>
                                <span class="material-symbols-outlined">
                                    {{ show_groups ? "visibility_off" : "visibility" }}
                                </span>
                            </button>

                            <UserGroups v-if="show_groups" :groups="groups" />

                            <hr />

                            <button type="button"
                                @click="() => { show_marks = !show_marks; show_groups = false; }"
                                class="mb-3 btn bg-white text-dark border-dark w-100 d-flex justify-content-between">
                                <h5>
                                    انجاز السفير خلال لأسابيع الأربعة الماضبة
                                    <span class="material-symbols-outlined align-middle me-1">
                                        query_stats
                                    </span>

                                </h5>
                                <span class="material-symbols-outlined">
                                    {{ show_marks ? "visibility_off" : "visibility" }}
                                </span>
                            </button>
                            <Marks v-if="show_marks" :marks="marks" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Marks from './Achievement/4WeeksMarks.vue';
import UserGroups from "./UserGroups.vue";
import BasicInfo from "./BasicInfo.vue";

export default {
    name: "Information Card",
    components: {
        Marks,
        UserGroups,
        BasicInfo,
    },
    created() {
    },

    props: {
        user: {
            type: [Object],
            required: true,
        },
        followup_team: {
            type: [Object],
            required: true,
        },
        roles: {
            type: [Object],
            required: true,
        },
        in_charge_of: {
            type: [Object],
            required: true,
        },
        groups: {
            type: [Object],
            required: true,
        },
        marks: {
            type: [Object],
            required: true,
        }
    },
    data() {
        return {
            show_groups: false,
            show_marks: false,
        };
    },
};
</script>