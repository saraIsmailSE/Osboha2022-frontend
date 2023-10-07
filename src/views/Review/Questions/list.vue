<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card position-relative inner-page-bg bg-primary" style="height: 150px;">
                <div class="inner-page-title">
                    <h3 class="text-white">مراجعة الأسئلة</h3>
                    <p class="text-white">تبقى {{ totalQuestions }} سؤال </p>
                </div>
            </div>
        </div>
        <div class="col-sm-12" v-if="questionsToReview.length == 0 && questionsToAudit.length == 0">
            <iq-card class="iq-card">
                <div class="iq-card-body p-0">
                    <div class="image-block text-center">
                        <img src="@/assets/images/export-congrats.png" class="img-fluid rounded w-50" alt="blog-img">
                    </div>

                    <h4 class="text-center mt-3 mb-3">لا يوجد أسئلة</h4>
                </div>
            </iq-card>

        </div>

        <div class="col-sm-12" v-if="questionsToReview.length > 0">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">أسئلة بحاجة للمراجعة</h4>
                </template>
                <template v-slot:body>
                    <div class="table-responsive">
                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>رقم التوثيق</th>
                                    <th>اسم السفير</th>
                                    <th>اسم الكتاب</th>
                                    <th>عدد الأسئلة</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="question in questionsToReview" :key="question.id">
                                    <td class=" btn-primary text-white bg-primary">
                                        {{ question.user_book.id }}
                                    </td>
                                    <td>
                                        <a href="javascript:void(0);" @click="listQuestions(question.user_book.id)">
                                            {{ question.user_book.user.name }}
                                        </a>

                                    </td>
                                    <td>
                                        {{ question.user_book.book.name }}
                                    </td>
                                    <td>
                                        {{ question.user_book.questions.length }}
                                    </td>
                                    <td class="text-center">
                                        {{ getFormatedDate(question.user_book.updated_at) }}
                                    </td>

                                </tr>

                            </tbody>
                        </table>
                    </div>
                </template>
            </iq-card>
        </div>
        <div class="col-sm-12" v-if="questionsToAudit.length > 0">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">أسئلة بحاجة للتدقيق</h4>
                </template>
                <template v-slot:body>
                    <div class="table-responsive">
                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>رقم التوثيق</th>
                                    <th>اسم السفير</th>
                                    <th>اسم الكتاب</th>
                                    <th>عدد الأسئلة</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="question in questionsToAudit" :key="question.id">

                                    <td class=" btn-primary text-white bg-primary">
                                        {{ question.user_book.id }}
                                    </td>

                                    <td>
                                        <a href="javascript:void(0);" @click="listQuestions(question.user_book.id)">
                                            ***************
                                        </a>

                                    </td>
                                    <td>
                                        {{ question.user_book.book.name }}
                                    </td>
                                    <td>
                                        {{ question.user_book.questions.length }}
                                    </td>
                                    <td class="text-center">
                                        {{ getFormatedDate(question.user_book.updated_at) }}
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </template>
            </iq-card>
        </div>

    </div>
</template>
<script>
import iqCard from '@/components/custom/cards/iq-card.vue'
import questionServices from '@/api/questionServices'
import UserInfoService from "@/services/userInfo.service";
import moment from 'moment';

export default {
    components: { iqCard },
    name: 'ListQuestions',
    async created() {
        if (this.canReview) {
            this.status = "review";
            this.questionsToReview = await this.Questions(this.status)
        }
        if (this.canAudit) {

            this.status = "audit";
            this.questionsToAudit = await this.Questions(this.status)
        }
    },

    data() {
        return {
            questionsToReview: [],
            questionsToAudit: [],
            status: '',
        }
    },
    methods: {
        getFormatedDate(value) {
            return moment(String(value)).format('MM/DD/YYYY hA')
        },
        async Questions(status) {
            return await questionServices.getByStatus(status);
        },
        listQuestions(user_book_id) {
            this.$router.push({ name: 'questions.questions', params: { user_book_id: user_book_id } })
        },
    },
    computed: {
        totalQuestions() {
            return this.questionsToAudit.length + this.questionsToReview.length;
        },
        user() {
            return UserInfoService.getUser();
        },
        canAudit() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "super_auditer",
                "auditor",
            ]);
        },
        canReview() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "super_reviewer",
                "reviewer",
            ]);
        },

    },

}
</script>
