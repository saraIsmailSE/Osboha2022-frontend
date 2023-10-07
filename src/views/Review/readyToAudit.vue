<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card position-relative inner-page-bg bg-primary" style="height: 150px;">
                <div class="inner-page-title">
                    <h3 class="text-white">انجازات جاهزة للتدقيق</h3>
                </div>
            </div>
        </div>
        <div class="col-sm-12" v-if="achevmentsToAudit.length == 0">
            <iq-card class="iq-card">
                <div class="iq-card-body p-0">
                    <div class="image-block text-center">
                        <img src="@/assets/images/export-congrats.png" class="img-fluid rounded w-50" alt="blog-img">
                    </div>

                    <h4 class="text-center mt-3 mb-3">تم رفع جميع الانجازات للتدقيق</h4>
                </div>
            </iq-card>
        </div>
        <div class="row" v-else>

            <div class="col-sm-12" v-if="achevmentsToAudit.theses.length != 0">
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
                                    <tr v-for="thesis in achevmentsToAudit.theses" :key="thesis.user_book_id">
                                        <td class="">
                                            <button class="btn btn-primary"
                                                @click="listThesis(thesis.user_book_id)">عـــرض </button>

                                        </td>
                                        <td>
                                            <a href="javascript:void(0);">
                                                {{ thesis.user_book_id }}
                                            </a>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </template>
                </iq-card>
            </div>
            <div class="col-sm-12" v-if="achevmentsToAudit.questions.length != 0">
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
                                    <tr v-for="question in achevmentsToAudit.questions" :key="question.user_book_id">
                                        <td class="">
                                            <button class="btn btn-primary"
                                                @click="listQuestions(question.user_book_id)">عـــرض </button>
                                        </td>
                                        <td>
                                            <a href="javascript:void(0);">
                                                {{ question.user_book_id }}
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
import iqCard from '../../components/custom/cards/iq-card.vue'
import UserInfo from "../../services/userInfo.service";
import userBookServices from '../../api/userBookServices'

export default {
    components: { iqCard },
    name: 'ReadyToAudit',
    async created() {
        if (UserInfo.getRole()[0] === 'reviewer' || UserInfo.getRole()[0] === 'admin') {
            this.achevmentsToAudit = await this.getReadyToAudit();
        }
    },
    data() {
        return {
            achevmentsToAudit: [],
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
            this.$router.push({name:'questions.questions', params: { user_book_id: user_book_id } })
        },


    },

}

</script>
