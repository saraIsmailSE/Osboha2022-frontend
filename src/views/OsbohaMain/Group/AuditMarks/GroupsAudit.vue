<template>
    <div class="d-grid gap-3 d-grid-template-1fr-19">
        <AuditCard :cardInfo="groupInfo" />
    </div>
</template>
<script>
import AuditCard from '@/components/group/audit/AuditCard.vue'
export default {
    components: { AuditCard },
    name: 'Groups Audit',
    data() {
        return {
            groupInfo:
            {
                backgroundImg: 'profile-bg9.jpg',
                groupImg: 'gi-9.jpg',
                title: 'اسم المجموعة',
                text: 'Lorem Ipsum',
                extraInfo: [
                    {
                        info: 'عدد السفراء',
                        value: '1200'
                    },
                    {
                        info: 'معدل الأسبوع',
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
  