<template>
    <div class="col-12">
        <div class="card card-block card-stretch card-height blog">
            <div class="card-header">
                <h2>قادة لم يعتمدوا الأطروحات</h2>
            </div>
            <div class="card-body" v-if="theses">
                <div class="blog-description" v-for="(leader, index) in theses" :key="index">
                    <h2 class="book-title mb-2 rtl">{{ index }}</h2>
                    <table class="table w-100">
                        <tbody>
                            <tr v-for="(thesis, index_2) in leader" :key="index_2">
                                <h4 class="rtl"> - {{ index_2 }}</h4>
                                <td class="border-0" v-for="(ambassador_thesis, index) in thesis.pending_theses" :key="index">

                                    <router-link
                                    class="badge rounded-pill bg-secondary"
                                    :to="{
                                        name: 'group.listOneAmbassadorThesis',
                                        params: { thesis_id: ambassador_thesis.id },
                                        query: { can_edit: true },
                                    }">
                                    {{ index+1 }}
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                </div>
            </div>
            <div class="card-body" v-else>
                <h4>لا يوجد</h4>

            </div>

        </div>
    </div>
</template>

<script>
import AuditMarkService from '@/API/services/audit-marks.service';

export default {
    name: "Pending Theses",
    async created() {
        this.theses = await AuditMarkService.pendingTheses(this.$route.params.supervisor_id);
    },
    data() {
        return {
            loader: false,
            theses: null,
            message: "",
        };
    },
    methods: {

    },
};
</script>
<style scoped>
.rtl {
    direction: rtl;
}
</style>
