<template>
    <div class="d-grid gap-3 d-grid-template-1fr-19">
        <AdvisorAuditCard :cardInfo="groupInfo" />
    </div>
</template>
<script>
import AdvisorAuditCard from '@/components/group/audit/AdvisorAuditCard.vue'
export default {
    components: { AdvisorAuditCard },
    name: 'Groups Audit',
    data() {
        return {
            groupInfo:
            {
                backgroundImg: 'profile-bg9.jpg',
                groupImg: 'gi-9.jpg',
                title: 'اسم المراقب',
                text: 'Lorem Ipsum',
                extraInfo: [
                    {
                        info: 'عدد القادة',
                        value: '1200'
                    },
                    {
                        info: 'المعدل العام',
                        value: '100%'
                    }
                ],
            }
        }
    },
    mounted() {
        console.log(this.groupInfo)
    },
}
</script>
  