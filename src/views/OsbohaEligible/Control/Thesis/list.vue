<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card position-relative inner-page-bg bg-primary" style="height: 150px;">
                <div class="inner-page-title">
                    <h3 class="text-white">المراجعة والتدقيق</h3>
                    <p class="text-white">تبقى {{ totalTheses }} كتاب</p>
                </div>
            </div>
        </div>
        <div class="col-sm-12" v-if="thesesToReview.length == 0 && thesesToAudit.length == 0">
            <iq-card class="iq-card">
                <div class="iq-card-body p-0">
                    <div class="image-block text-center">
                        <img src="@/assets/images/main/export-congrats.png" class="img-fluid rounded w-50" alt="blog-img">
                    </div>

                    <h4 class="text-center mt-3 mb-3">لا يوجد أطروحات</h4>
                </div>
            </iq-card>
        </div>
        <div class="col-sm-12" v-if="thesesToReview.length > 0">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">أطروحات بحاجة للمراجعة</h4>
                </template>
                <template v-slot:body>
                    <div class="table-responsive">
                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>رقم التوثيق</th>
                                    <th>اسم السفير</th>
                                    <th>اسم الكتاب</th>
                                    <th>عدد الأطروحات</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="thesis in thesesToReview" :key="thesis.id">
                                    <td class=" btn-primary text-white bg-primary">
                                        {{ thesis.user_book.id }}
                                    </td>
                                    <td>
                                        <a href="javascript:void(0);" @click="listThesis(thesis.user_book.id)">
                                            {{ thesis.user_book.user.name }}
                                        </a>

                                    </td>
                                    <td>
                                        {{ thesis.user_book.book.name }}
                                    </td>
                                    <td>
                                        {{ thesis.user_book.thesises.length }}
                                    </td>
                                    <td class="text-center">
                                        {{ getFormatedDate(thesis.user_book.updated_at) }}
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </template>
            </iq-card>
        </div>
        <div class="col-sm-12" v-if="thesesToAudit.length > 0">
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title">أطروحات بحاجة للتدقيق</h4>
                </template>
                <template v-slot:body>
                    <div class="table-responsive">
                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>رقم التوثيق</th>
                                    <th>اسم السفير</th>
                                    <th>اسم الكتاب</th>
                                    <th>عدد الأطروحات</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="thesis in thesesToAudit" :key="thesis.id">
                                    <td class=" btn-primary text-white bg-primary">
                                        {{ thesis.user_book.id }}
                                    </td>
                                    <td>
                                        <a href="javascript:void(0);" @click="listThesis(thesis.user_book.id)">
                                            ***************
                                        </a>

                                    </td>
                                    <td>
                                        {{ thesis.user_book.book.name }}
                                    </td>
                                    <td>
                                        {{ thesis.user_book.thesises.length }}
                                    </td>
                                    <td>
                                        {{ getFormatedDate(thesis.updated_at) }}
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
import thesisServices from '@/API/EligibleServices/thesisServices'
import moment from 'moment';
import UserInfoService from "@/Services/userInfoService";


export default {
    name: 'ListThesis',
    async created() {
        if (this.canReview) {
            this.status = "review";
            this.thesesToReview = await this.getThesis(this.status);
        }
        if (this.canAudit) {
            this.status = "audit";
            this.thesesToAudit = await this.getThesis(this.status);
        }
    },
    data() {
        return {
            thesesToReview: [],
            thesesToAudit: [],
            status: '',
        }
    },
    methods: {
        async getThesis(status) {
            return await thesisServices.getByUserBookStatus(status);
        },
        listThesis(user_book_id) {
            this.$router.push({ name: `thesis-review.thesis`, params: { user_book_id: user_book_id } });
        },
        getFormatedDate(value) {
            return moment(String(value)).format('MM/DD/YYYY hA')
        }
    },
    computed: {
        totalTheses() {
            return this.thesesToAudit.length + this.thesesToReview.length;
        },

        user() {
            return this.$store.getters.getUser;
        },
        canAudit() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "eligible_admin",
                "super_auditer",
                "auditor",
            ]);
        },
        canReview() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "eligible_admin",
                "super_reviewer",
                "reviewer",
            ]);
        },
    },

}

</script>
