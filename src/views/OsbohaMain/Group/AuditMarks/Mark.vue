<template>
    <div>
        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card">
                <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                    <h3 class="text-center mt-3 mb-3" style=" direction: rtl;" v-if="mark && week">{{ mark.user.name }} -
                        الأسبوع {{ week.title }}
                    </h3>
                </div>
                <div class="text-center">
                    <span v-if="mark_for_audit"
                        :class="`ms-2 rounded badge text-white ${statusClass(mark_for_audit.status)}`">{{
                            audit_status[mark_for_audit.status] }}</span>
                </div>

                <div class="iq-card-body p-3">
                    <AchievementCard v-if="mark" :mark="mark" :group="group" />
                    <div class="d-flex align-items-center mt-3">
                        <Check v-if="theses.length > 0" :theses="theses" />
                        <div v-else class="alert alert-secondary w-100 text-center" role="alert">
                            لا يوجد انجاز
                        </div>

                    </div>

                    <div class="d-flex align-items-center mt-3 row">
                        <div class="text-center mb-3" v-if="!expired && authorized">
                            <button class="btn btn-primary ms-1 me-1" @click="updateStatus('acceptable')">مقبول</button>
                            <button class="btn btn-danger ms-1 me-1" @click="updateStatus('unacceptable')">مرفوض</button>
                            <div v-if="msg" class="alert alert-primary mt-2">{{ msg }}</div>
                        </div>

                        <count-down v-if="week && authorized" :week="week" :timer_type="'audit_timer'" />

                        <Note v-if="mark_for_audit" />
                        <div class="d-flex align-items-center mt-3 row">
                            <div class="d-inline-block w-100 text-center col-12">
                                <a role="button" @click="$router.go(-1)" class=" d-block mt-3 mb-3 w-75 mx-auto">
                                    <span>عودة</span>
                                    <span class="align-middle material-symbols-outlined">
                                        keyboard_return
                                    </span>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </iq-card>
        </div>
    </div>
</template>
<script>
import AchievementCard from '@/components/book/theses/achievement-card.vue'
import Check from '@/components/book/theses/check.vue'
import CountDown from '@/components/timer/Countdown.vue'
import Note from '@/components/group/audit/Note.vue'
import AuditMarkService from '@/API/services/audit-marks.service';

export default {
    name: "Audit Mark",
    async created() {

        try {
            const response = await AuditMarkService.markForAudit(this.$route.params.mark_for_audit);
            console.log("🚀 ~ file: Mark.vue:62 ~ created ~ response:", response)
            this.mark_for_audit = response.mark_for_audit;
            this.mark = response.mark_for_audit.mark;
            this.theses = response.theses.reduce((groupByBook, item) => {
                const group = (groupByBook[item.book.name] || []);
                group['title'] = item.book.name;
                group.push(item);
                groupByBook[item.book.name] = group;
                return groupByBook;
            }, {});
            this.group = response.group
            this.week = response.week
            this.expired = (((new Date(this.week.audit_timer)) - (new Date())) < 0)
            this.authorized = response.authorized

        }
        catch (error) {
            console.log(error);
        }
    },

    components: {
        Check,
        AchievementCard,
        CountDown,
        Note
    },

    data() {
        return {
            theses: [],
            group: null,
            week: null,
            expired: true,
            mark: null,
            authorized: false,
            mark_for_audit: null,
            audit_status: {
                'acceptable': "مقبول",
                'unacceptable': "مرفوض",
                'not_audited': "لم يتم تدقيقه",
            },
            msg: '',

        };
    },
    methods: {

        /**
        * return status bg-color class.
        *  @param  status
        * @return class
        */
        statusClass(status) {
            switch (status) {
                case 'acceptable':
                    return 'bg-primary'

                case 'unacceptable':
                    return 'bg-danger'

                default:
                    return 'bg-dark'
            }
        },
        /**
        * update status of mark for audit.
        *  @param  status
        */
        async updateStatus(status) {
            const response = await AuditMarkService.updateMarkForAuditStatus(status, this.$route.params.mark_for_audit);
            this.mark_for_audit.status = status
            this.msg = 'تم التدقيق'
        },
    }
};
</script>