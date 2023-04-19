<template>
    <div class="d-grid gap-3 d-grid-template-1fr-19">
        <AuditCard v-for="group in groups" :group="group" :key="group.id" />
    </div>
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
            groups:[],
        }
    },
}
</script>
  