<template>
    <div>
        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card">
                <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                    <h3 class="text-center mt-3 mb-3">اسم السفير - الأسبوع الرابع من يناير</h3>
                </div>
                <div class="iq-card-body p-3">
                    <AchievementCard v-if="mark" :mark="mark"/>
                    <div class="d-flex align-items-center mt-3">
                        <Check :theses="theses" />
                    </div>

                    <div class="d-flex align-items-center mt-3 row">
                        <div class="alert alert-danger text-center" role="alert">
                            لا يمكنك الاعتماد لأن الأسبوع انتهى
                        </div>
                        <div class="d-inline-block w-100 text-center col-12">
                            <button type="" @click="back()" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                                عودة للفريق
                            </button>
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
import MarkService from '@/API/services/marks.service';

export default {
    name: "List Reading",
    async created() {

        try {
            const response = await MarkService.ambassadorMark(1);
            this.mark = response.mark;
                this.theses = response.theses.reduce((theses, item) => {
                const group = (theses[item.book_id] || []);
                group.push(item);
                theses[item.book_id] = group;
                return theses;
            }, {});
            console.log(this.theses)
        }
        catch (error) {
            console.log(error);
        }
    },

    components: {
        Check,
        AchievementCard
    },

    data() {
        return {
            theses:[],
            mark:null,
        };
    },
};
</script>
