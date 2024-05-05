<template>
    <div ref="listContainer">
        <div class="row">
            <div class="col-sm-12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title" v-if="requests && requests.length > 0">قائمة الطلبات - {{ requests.length
                            }}
                        </h4>
                        <h4 class="card-title" v-else>قائمة الطلبات - 0</h4>
                    </template>

                    <template v-slot:body>
                        <div class="mt-3 inputs mb-3">
                            <i class="material-symbols-outlined">
                                search
                            </i>
                            <input type="text" class="form-control" placeholder=" ... ابحث عن طلب"
                                v-model.trim="searchModel" @keyup="debouncedSearch" />
                        </div>
                        <div class="masonary-menu filter-button-group">
                            <nav class="d-flex justify-content-center">
                                <div className="nav nav-tabs justify-content-start" id="portfolio-tab" role="tablist">
                                    <button :className="`nav-link ${retrieveType == 'all' ? 'active' : ''}`"
                                        id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button"
                                        role="tab" aria-controls="nav-all" aria-selected="true"
                                        @click="() => { this.retrieveType = 'all'; loadRequests() }">
                                        الكل</button>

                                    <button :className="`nav-link ${retrieveType == 'special_care' ? 'active' : ''}`"
                                        id="nav-trending-tab" data-bs-toggle="tab" data-bs-target="#nav-trending"
                                        type="button" role="tab" aria-controls="nav-trending" aria-selected="false"
                                        @click="() => { this.retrieveType = 'special_care'; loadRequests() }">
                                        الرعاية الخاصة
                                    </button>

                                    <button :className="`nav-link ${retrieveType == 'followup' ? 'active' : ''}`"
                                        id="nav-featured-tab" data-bs-toggle="tab" data-bs-target="#nav-featured"
                                        type="button" role="tab" aria-controls="nav-featured" aria-selected="false"
                                        @click="() => { this.retrieveType = 'followup'; loadRequests() }">
                                        متابعة
                                    </button>
                                </div>
                            </nav>
                            <nav class="d-flex justify-content-center mt-2">
                                <div className="nav nav-tabs justify-content-start" id="portfolio-tab" role="tablist">
                                    <button :className="`nav-link ${is_done == 0 ? 'active' : ''}`"
                                        id="nav-featured-tab" data-bs-toggle="tab" data-bs-target="#nav-featured"
                                        type="button" role="tab" aria-controls="nav-featured" aria-selected="false"
                                        @click="() => { this.is_done = 0; loadRequests() }">
                                        غير مكتمل
                                    </button>
                                    <button :className="`nav-link ${is_done == 1 ? 'active' : ''}`"
                                        id="nav-featured-tab" data-bs-toggle="tab" data-bs-target="#nav-featured"
                                        type="button" role="tab" aria-controls="nav-featured" aria-selected="false"
                                        @click="() => { this.is_done = 1; loadRequests() }">
                                        مكتمل
                                    </button>

                                </div>
                            </nav>

                        </div>


                        <div class="table-responsive" v-if="requests && requests.length > 0">
                            <table id="datatable" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>اسم المجموعة</th>
                                        <th>مقدم الطلب</th>
                                        <th>تاريخ التقديم</th>
                                        <th>عدد السفراء المطلوب</th>
                                        <th>جنس السفراء</th>
                                        <th>جنس القائد</th>
                                        <th>تم توزيع</th>
                                        <th>حالة الطلب</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr v-for="(request, index) in requests" :key="index">
                                        <td>
                                            <router-link class="text-center" :to="{
                                                name: 'group.group-detail',
                                                params: { group_id: request.group.id },
                                            }">
                                                {{ request.group.name }}
                                            </router-link>
                                        </td>
                                        <td>
                                            {{ request.applicant.name }}
                                        </td>
                                        <td>
                                            {{ getFormatedDate(request.created_at) }}
                                        </td>
                                        <td>
                                            {{ request.members_num }}
                                        </td>
                                        <td>
                                            {{ GENDER[request.ambassadors_gender] }}
                                        </td>
                                        <td>
                                            {{ GENDER[request.leader_gender] }}
                                        </td>
                                        <td>
                                            {{ request.ambassadors_count }}
                                        </td>
                                        <td v-if="request.is_done == 0">
                                            <span class="badge bg-danger">غير مكتمل</span>
                                            <span if="request.high_priority" class="badge bg-primary m-2">
                                                أولوية
                                                <small class="material-symbols-outlined align-middle">
                                                    verified
                                                </small>
                                            </span>

                                        </td>
                                        <td v-else>
                                            <span class="badge bg-primary">مكتمل</span>
                                        </td>
                                        <td>
                                            <router-link class="text-center" :to="{
                                                name: 'ambassadors-request.request-details',
                                                params: { request_id: request.id },
                                            }">
                                                <span class="material-symbols-outlined">
                                                    visibility
                                                </span> </router-link>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
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
import AmbassadorsRequest from '@/API/services/ambassadors-request.service';
import helper from "@/utilities/helper";
import axios from "axios";
import { GENDER } from "@/utilities/constants";
import moment from 'moment';

export default {
    name: "List Requests",
    created() {
        // Debounce the searchGroup method
        this.debouncedSearch = this.debounce(this.loadRequests, 300);
    },
    async mounted() {
        this.loadRequests(this.retrieveType);
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        this.cancelToken.cancel();
    },

    data() {
        return {
            retrieveType: 'all',
            requests: [],
            GENDER,
            searchModel: "",
            page: 1,
            totalPages: 1,
            loading: false,
            pendingRequest: false,
            hasMore: true,
            emptyMessage: "",
            cancelToken: axios.CancelToken.source(),
            is_done: 0,

        };
    },

    methods: {
        async loadRequests() {
            this.requests = [];

            if (this.pendingRequest) {
                return;
            }

            if (this.searchModel == '' && this.requests.length == 0) {
                this.page = 1;
            }
            if (this.searchModel != '') {
                this.page = 1;
                this.requests = []
            }

            this.pendingRequest = true;
            this.loading = true;
            this.emptyMessage = ""
            try {
                let response;
                response = await AmbassadorsRequest.getRequests(this.searchModel,
                    this.page,
                    this.retrieveType,
                    this.is_done,
                    this.cancelToken
                );
                if (response.statusCode !== 200) {
                    helper.toggleToast(
                        "حدث خطأ أثناء تحميل الطلبات, حاول مرة أخرى",
                        "error"
                    );
                    return;
                }

                if (response.statusCode === 200 && !response.data) {
                    this.emptyMessage = "لا يوجد طلبات";
                    this.hasMore = false;
                    return;
                }

                this.requests = [...this.requests, ...response.data.requests.data];
                this.totalPages = response.data?.last_page ?? 1;
                this.page++;
            } catch (error) {
                console.log(error)
                helper.toggleToast(
                    "حدث خطأ أثناء تحميل الطلبات, حاول مرة أخرى",
                    "error"
                );
            } finally {
                this.loading = false;
                this.pendingRequest = false;

            }
        },
        /**
         * Check if the user has scrolled to the bottom of the page
         * @returns {boolean}
         */
        isAtBottomOfPage() {
            const containerRect = this.$refs.listContainer.getBoundingClientRect();
            const containerBottom = containerRect.bottom;
            const windowHeight = window.innerHeight;
            return containerBottom >= windowHeight;
        },
        /*
         * Load more requests when the user scrolls to the bottom of the page
         */
        handleScroll() {
            if (this.hasMoreToLoad && this.isAtBottomOfPage()) {
                this.loadRequests(this.retrieveType);
            }
        },
        debounce(func, wait) {
            let timeout;
            return function (...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(this, args);
                }, wait);
            };
        },
        getFormatedDate(value) {
            return moment(String(value)).format('MM/DD/YYYY hA')
        },

    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        hasMoreToLoad() {
            return this.page <= this.totalPages && this.hasMore;
        },
    }
};


</script>

<style lang="scss" scoped>
.inputs {
    position: relative;
}

.form-control {
    text-indent: 15px;
    border: none;
    height: 45px;
    border-radius: 0px;
    border-bottom: 1px solid #eee;
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #eee;
    outline: 0;
    box-shadow: none;
    border-bottom: 1px solid blue;
}

.form-control:focus {
    color: blue;
}

.inputs i {
    position: absolute;
    top: 14px;
    left: 4px;
    color: #b8b9bc;
}
</style>