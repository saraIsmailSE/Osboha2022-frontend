<template>
    <div class="col-12">
        <div class="card card-block card-stretch card-height blog">
            <div class="card-header">
                <h2>قادة لم يعتمدوا الأطروحات</h2>
            </div>
            <div class="card-body" v-if="theses.length>0">
                <div class="blog-description" v-for="(leader, index) in theses" :key="index">
                    <h2 class="book-title mb-2 rtl">{{ index }}</h2>
                    <table class="table w-100">
                        <tbody>
                            <td v-for="(thesis, index_3) in leader" :key="index_3">
                                <tr class="border-0" v-for="(ambassador_thesis, index) in thesis" :key="index">
                                    <h4 class="rtl"> - {{ index }}</h4>
                                </tr>
                            </td>
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
        console.log("🚀 ~ file: pending.vue:81 ~ created ~ this.theses:", this.theses)
    },
    data() {
        return {
            loader: false,
            theses: [],
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
