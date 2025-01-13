<template>
    <div ref="listContainer">
        <div class="row">
            <div class="col-sm-12" v-if="report">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title">
                            <router-link :to="{
                                name: 'book.book-details',
                                params: { book_id: report.book?.id },
                            }" data-toggle="tooltip" data-placement="top" :title="report.book?.name">
                                {{ report.book?.name }}
                            </router-link>

                            <span class="bg-danger rounded badge text-white border-0 ms-1 me-1">
                                كتاب مخالف
                            </span>
                        </h4>
                    </template>

                    <template v-slot:body>
                        <div class="table-responsive">
                            <table id="datatable" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>نوع المخالة</th>
                                        <th>اخر تحديث</th>
                                        <th>الصفحات</th>
                                        <th>الكتاب</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {{ report.violation_type }}
                                        </td>
                                        <td>
                                            {{ getFormatedDate(report.updated_at) }}
                                        </td>
                                        <td>
                                            <ul>

                                                <li class="mt-1" v-for="(page, index) in report.violated_pages"
                                                    :key="index">
                                                    <p>
                                                        {{ page.number }}
                                                    </p>
                                                </li>
                                            </ul>


                                        </td>

                                        <td>
                                            <router-link :to="{
                                                name: 'book.book-details',
                                                params: { book_id: report.book?.id },
                                            }">
                                                <span class="material-symbols-outlined">
                                                    visibility
                                                </span> </router-link>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div class="table-responsive">
                            <table id="datatable" class="table table-bordered">
                                <tbody>
                                    <tr class="text-center">
                                        <td>
                                            تم الإبلاغ من قِبَل
                                        </td>
                                        <td>
                                            {{ report.reporter.name + " " + report.reporter.last_name }}
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>
                                            تم المراجعة من قِبَل
                                        </td>
                                        <td>
                                            {{ report.reviewer ? report.reviewer.name + " " + report.reviewer.last_name : " تحت المراجعة" }}
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div class="text-center m-auto">
                            <h4 class="mt-3 mb-3" style="direction: rtl;">
                                حالة المخالفة
                                <span class="badge" :class="STATUS_CLASS[report.status]">
                                    {{ STATUS[report.status] }}
                                </span>

                            </h4>
                            <p v-if="report.status != 'pending'" style="direction: rtl;">
                                ملاحظات المراجع:
                                {{ report.reviewer_note }}
                            </p>
                        </div>
                        <div class="text-center m-auto">
                            <h4 class="mt-3 mb-3">
                                وصف المخالفة
                            </h4>

                            <p>
                                {{ report.description }}
                            </p>
                        </div>
                        <div class="text-center m-auto" v-if="report.media">
                            <h4 class="mt-3 mb-3">
                                صورة المخالفة
                            </h4>

                            <img class="img-fluid w-75 mt-1" v-for="m in report.media" :key="m.id" :src="showMedia(m.id)" />
                        </div>


                        <violated-book-action :report="report" @update_report="updateReport" v-if="inBooksTeam" />

                        <div class="col-sm-12 text-center" v-if="loading">
                            <img :src="require('@/assets/images/gif/page-load-loader.gif')" alt="loader"
                                style="height: 100px" />
                        </div>

                    </template>
                </iq-card>

            </div>
            <div class="col-sm-12 text-center" v-else>
                <h4 v-if="emptyMessage">
                    {{ emptyMessage }}
                    <span class="material-symbols-outlined align-middle">
                        info
                    </span>
                </h4>
            </div>

        </div>
    </div>
</template>
<script>
import bookService from "@/API/services/book.service";
import { STATUS, STATUS_CLASS } from "@/utilities/constants";
import UserInfoService from "@/Services/userInfoService";
import moment from 'moment';
import mediaService from "@/API/services/media.services";
import ViolatedBookAction from '@/components/book/ViolatedBookAction'
export default {
    name: "Violated Book Report",
    components: { ViolatedBookAction },
    async created() {
        try {
            this.loading = true;
            this.getReport();

        } catch (e) {
            this.emptyMessage = "لا يوجد معلومات";
        }
        finally {
            this.loading = false;
        }
    },
    data() {
        return {
            report: null,
            loading: false,
            emptyMessage: "",
            STATUS,
            STATUS_CLASS,

        };
    },

    methods: {
        getFormatedDate(value) {
            return moment(String(value)).format('MM/DD/YYYY hA')
        },
        /**
        * get exam media.
        * @param  {int} media id,
        * @return image url
        */
        showMedia(id) {
            return mediaService.show(id);
        },
        async getReport() {
            this.report = await bookService.getReport(this.$route.params.report_id);
        },
        updateReport() {
            this.getReport();
        }

    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        inBooksTeam() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                'book_quality_team_coordinator',
                'book_quality_supervisor',
            ]);
        },

    }
};


</script>