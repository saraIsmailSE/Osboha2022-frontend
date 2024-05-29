<template>
    <div ref="listContainer">
        <div class="row">
            <div class="col-sm-12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title"> قائمة الكتب المخالفة - {{ reportsCount }}</h4>
                    </template>

                    <template v-slot:body>
                        <div class="masonary-menu filter-button-group">
                            <nav class="d-flex justify-content-center">
                                <div className="nav nav-tabs justify-content-start" id="portfolio-tab" role="tablist">
                                    <button :className="`nav-link ${status == 'pending' ? 'active' : ''}`"
                                        id="nav-pending-tab" data-bs-toggle="tab" data-bs-target="#nav-pending"
                                        type="button" role="tab" aria-controls="nav-pending" aria-selected="true"
                                        @click="() => { this.status = 'pending'; }">
                                        تحت المراجعة</button>

                                    <button :className="`nav-link ${status == 'special_care' ? 'active' : ''}`"
                                        id="nav-resolved-tab" data-bs-toggle="tab" data-bs-target="#nav-resolved"
                                        type="button" role="tab" aria-controls="nav-resolved" aria-selected="false"
                                        @click="() => { this.status = 'resolved'; }">
                                        تم الحل
                                    </button>

                                    <button :className="`nav-link ${status == 'followup' ? 'active' : ''}`"
                                        id="nav-rejected-tab" data-bs-toggle="tab" data-bs-target="#nav-rejected"
                                        type="button" role="tab" aria-controls="nav-rejected" aria-selected="false"
                                        @click="() => { this.status = 'rejected'; }">
                                        مرفوض
                                    </button>
                                </div>
                            </nav>
                        </div>
                        <div class="table-responsive" v-if="reportsCount > 0">
                            <table id="datatable" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>اسم الكتاب</th>
                                        <th>نوع المخالة</th>
                                        <th>اخر تحديث</th>
                                        <th>الصفحات</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr v-for="(report, index) in reports" :key="index">
                                        <td>
                                            <router-link :to="{
                                                name: 'book.book-details',
                                                params: { book_id: report.book?.id },
                                            }">
                                                {{ report.book.name }}
                                            </router-link>
                                        </td>
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
                                            <router-link class="text-center" :to="{
                                                name: 'book.violated-book',
                                                params: { report_id: report.id },
                                            }">
                                                <span class="material-symbols-outlined">
                                                    visibility
                                                </span> </router-link>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <Pagination :page="currentPage" :total="totalPages" :perPage="reportsPerPage"
                                :routeName="`withdrawns-team.list-ambassadros`" />
                        </div>

                        <div v-else>
                            <h4>
                                {{ emptyMessage }}
                                <span class="material-symbols-outlined align-middle">
                                    info
                                </span>
                            </h4>
                        </div>

                        <div class="col-sm-12 text-center" v-if="loading">
                            <img :src="require('@/assets/images/gif/page-load-loader.gif')" alt="loader"
                                style="height: 100px" />
                        </div>

                    </template>
                </iq-card>

            </div>
        </div>
    </div>
</template>
<script>
import reportservice from "@/API/services/book.service";
import helper from "@/utilities/helper";
import axios from "axios";
import moment from 'moment';
import Pagination from '@/components/common/Pagination';
import { watch } from 'vue';
import { watchEffect } from "vue";
import { useRouter, useRoute } from 'vue-router';

export default {
    components: { Pagination },
    name: "List reports",
    props: ["page"],
    setup() {
        const router = useRouter();
        const route = useRoute();

        const updatePage = (pageNumber) => {
            router.push({
                path: route.path,
                query: { ...route.query, page: pageNumber }
            }).catch(err => {
                if (err.name !== 'NavigationDuplicated') {
                    throw err;
                }
            });
        };

        return {
            updatePage,
        };
    },

    created() {
        this.currentPage = this.page;
        this.loadreports();
        console.log("🚀 ~ created ~ this.reportsCount:", this.reportsCount)
        watchEffect(() => {
            this.currentPage = this.page;
        });

        watch(
            () => this.currentPage,
            (newPage) => {
                this.loadreports();
            }
        );
        watch(
            () => [this.status],
            ([newstatus]) => {
                this.currentPage = 1;
                this.reports = [];
                this.updatePage(this.currentPage);
                this.loadreports();
            }
        );

        watch(
            () => this.page,
            (newPage) => {
                if (newPage !== this.currentPage) {
                    this.reports = [];
                    this.currentPage = newPage;
                    this.loadreports();
                }
            },
            { deep: true },
            { immediate: true }


        );



    },
    data() {
        return {
            status: 'pending',
            reports: [],
            reportsPerPage: 30,
            searchModel: "",
            totalPages: 1,
            currentPage: this.page,
            loading: false,
            pendingRequest: false,
            hasMore: true,
            emptyMessage: "",
            cancelToken: axios.CancelToken.source(),
        };
    },

    methods: {
        async loadreports() {
            if (this.pendingRequest) {
                return;
            }

            this.pendingRequest = true;
            this.loading = true;
            this.emptyMessage = "";

            try {
                let response = await reportservice.listReportsByStatus(
                    this.currentPage,
                    this.status,
                    this.cancelToken
                );
                if (response.statusCode !== 200) {
                    helper.toggleToast(
                        "حدث خطأ أثناء تحميل التقارير, حاول مرة أخرى",
                        "error"
                    );
                    return;
                }

                if (response.statusCode === 200 && (!response.data || !response.data.reports)) {
                    this.emptyMessage = "لا يوجد كتب مخالفة";
                    this.hasMore = false;
                    return;
                }

                this.reports = response.data.reports.data;
                this.totalPages = response.data?.total ?? 1;
            } catch (error) {
                console.log(error);
                helper.toggleToast(
                    "حدث خطأ أثناء تحميل الكتب المخالفة, حاول مرة أخرى",
                    "error"
                );
            } finally {
                this.loading = false;
                this.pendingRequest = false;
            }
        },

        getFormatedDate(value) {
            return moment(String(value)).format('MM/DD/YYYY hA')
        },

    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        reportsCount() {
            return Object.keys(this.reports).length
        }
    }
};

</script>
