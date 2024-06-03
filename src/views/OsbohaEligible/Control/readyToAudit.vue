<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card position-relative inner-page-bg bg-primary" style="height: 150px;">
                <div class="inner-page-title">
                    <h3 class="text-white">انجازات جاهزة للتدقيق</h3>
                </div>
            </div>
        </div>
        <div class="col-sm-12" v-if="AchievementsToAudit.length == 0">
            <iq-card class="iq-card">
                <div class="iq-card-body p-0">
                    <div class="image-block text-center">
                        <img src="@/assets/images/main/export-congrats.png" class="img-fluid rounded w-50" alt="blog-img">
                    </div>

                    <h4 class="text-center mt-3 mb-3">تم رفع جميع الانجازات للتدقيق</h4>
                </div>
            </iq-card>
        </div>
        <div class="row" v-else>

            <div class="col-sm-12" v-if="AchievementsToAudit.theses.length != 0">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title">أطروحات جاهزة للتدقيق</h4>
                    </template>
                    <template v-slot:body>
                        <div class="table-responsive">
                            <table id="datatable" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>توثيق رقم</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="thesis in AchievementsToAudit.theses" :key="thesis.eligible_user_books_id">
                                        <td class="">
                                            <button class="btn btn-primary"
                                                @click="listThesis(thesis.eligible_user_books_id)">عـــرض </button>

                                        </td>
                                        <td>
                                            <a href="javascript:void(0);">
                                                {{ thesis.eligible_user_books_id }}
                                            </a>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </template>
                </iq-card>
            </div>
            <div class="col-sm-12" v-if="AchievementsToAudit.questions.length != 0">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title">أسئلة جاهزة للتدقيق</h4>
                    </template>
                    <template v-slot:body>
                        <div class="table-responsive">
                            <table id="datatable" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>توثيق رقم</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="question in AchievementsToAudit.questions"
                                        :key="question.eligible_user_books_id">
                                        <td class="">
                                            <button class="btn btn-primary"
                                                @click="listQuestions(question.eligible_user_books_id)">عـــرض </button>
                                        </td>
                                        <td>
                                            <a href="javascript:void(0);">
                                                {{ question.eligible_user_books_id }}
                                            </a>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </template>
                </iq-card>
            </div>

        </div>
    </div>
</template>

<script>
import userBookServices from '@/API/EligibleServices/userBookServices'

export default {
    name: 'ReadyToAudit',
    async created() {
        this.AchievementsToAudit = await this.getReadyToAudit();
    },
    data() {
        return {
            AchievementsToAudit: [],
        }
    },
    methods: {
        async getReadyToAudit() {
            return await userBookServices.getReadyToAudit();
        },
        listThesis(user_book_id) {
            this.$router.push({ name: `thesis-review.thesis`, params: { user_book_id: user_book_id } });
        },
        listQuestions(user_book_id) {
            this.$router.push({ name: 'questions.questions', params: { user_book_id: user_book_id } })
        },


    },

}

</script>
