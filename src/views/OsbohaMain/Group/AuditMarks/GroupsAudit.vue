<template>
    <iq-card class="iq-card">
        <div class="d-grid gap-3 d-grid-template-1fr-19">
            <AuditCard v-for="group in groups" :group="group" :key="group.id" />

            <div class="d-flex align-items-center mt-3 row">
                <div class="d-inline-block w-100 text-center col-12">
                    <router-link :to="{
                        name: 'group.AdvisorAudit',
                        params: {
                            advisor_id: user.id,
                        },
                    }" class="d-block mt-3 mb-3 w-75 mx-auto">
                        <span>تدقيق المراقبين</span>
                        <span class="align-middle material-symbols-outlined">
                            keyboard_return
                        </span>
                    </router-link>
                </div>
            </div>

        </div>
    </iq-card>
</template>
<script>
import AuditCard from '@/components/group/audit/AuditCard.vue'
import AuditMarkService from '@/API/services/audit-marks.service';

export default {
    components: { AuditCard },
    name: 'Groups Audit',
    async created() {
        try {
            const response = await AuditMarkService.groupsAudit(this.$route.params.supervisor_id);
            this.groups = response.groups;
        }
        catch (error) {
            console.log(error);
        }
    },
    data() {
        return {
            groups: [],
        }
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
    }
}
</script>
