<template>
    <div ref="listContainer">
        <div class="row">
            <div class="col-sm-12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title"> قائمة الكتب المقترحة - {{ booksCount }}</h4>
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
                                        id="nav-accepted-tab" data-bs-toggle="tab" data-bs-target="#nav-accepted"
                                        type="button" role="tab" aria-controls="nav-accepted" aria-selected="false"
                                        @click="() => { this.status = 'accepted'; }">
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
                        <div class="table-responsive" v-if="booksCount > 0">
                            <table id="datatable" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>اسم الكتاب</th>
                                        <th>اللغة</th>
                                        <th>الفئة</th>
                                        <th>اخر تحديث</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr v-for="(book, index) in books" :key="index">
                                        <td>
                                            {{ book.name }}
                                        </td>
                                        <td>
                                            {{ LANUAGES[book.language.language] }}
                                        </td>
                                        <td>
                                            {{ book.section.section }}
                                        </td>
                                        <td>
                                            {{ getFormatedDate(book.updated_at) }}
                                        </td>

                                        <td>
                                            <router-link class="text-center" :to="{
                                                name: 'book.suggested-book',
                                                params: { suggestion_id: book.id },
                                            }">
                                                <span class="material-symbols-outlined">
                                                    visibility
                                                </span> </router-link>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <Pagination :page="currentPage" :total="totalPages" :perPage="booksPerPage"
                                :routeName="`withdrawns-team.list-ambassadors`" />
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
import BookSuggestion from "@/API/services/book-suggestion.service";
import helper from "@/utilities/helper";
import axios from "axios";
import moment from 'moment';
import Pagination from '@/components/common/Pagination';
import { watch } from 'vue';
import { watchEffect } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { LANUAGES, } from "@/utilities/constants";

export default {
    components: { Pagination },
    name: "List Suggested Books",
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
        this.loadBooks();
        watchEffect(() => {
            this.currentPage = this.page;
        });

        watch(
            () => this.currentPage,
            (newPage) => {
                this.loadBooks();
            }
        );
        watch(
            () => [this.status],
            ([newstatus]) => {
                this.currentPage = 1;
                this.books = [];
                this.updatePage(this.currentPage);
                this.loadBooks();
            }
        );

        watch(
            () => this.page,
            (newPage) => {
                if (newPage !== this.currentPage) {
                    this.books = [];
                    this.currentPage = newPage;
                    this.loadBooks();
                }
            },
            { deep: true },
            { immediate: true }


        );



    },
    data() {
        return {
            LANUAGES,
            status: 'pending',
            books: [],
            booksPerPage: 30,
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
        async loadBooks() {
            if (this.pendingRequest) {
                return;
            }

            this.pendingRequest = true;
            this.loading = true;
            this.emptyMessage = "";

            try {
                let response = await BookSuggestion.listByStatus(
                    this.currentPage,
                    this.status,
                    this.cancelToken
                );
                if (response.statusCode !== 200) {
                    helper.toggleToast(
                        "حدث خطأ أثناء تحميل الكتب, حاول مرة أخرى",
                        "error"
                    );
                    return;
                }

                if (response.statusCode === 200 && (!response.data || !response.data.books)) {
                    this.emptyMessage = "لا يوجد كتب مقترحة";
                    this.hasMore = false;
                    return;
                }

                this.books = response.data.books.data;
                this.totalPages = response.data?.total ?? 1;
            } catch (error) {
                console.log(error);
                helper.toggleToast(
                    "حدث خطأ أثناء تحميل الكتب المقترحة, حاول مرة أخرى",
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
        booksCount() {
            return Object.keys(this.books).length
        }
    }
};

</script>