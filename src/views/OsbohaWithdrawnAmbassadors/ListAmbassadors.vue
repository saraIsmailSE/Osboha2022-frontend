<template>
    <div ref="listContainer">
        <div class="row">
            <div class="col-sm-12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title"> قائمة المنسحبين - {{ ambassadorsCount }}</h4>
                    </template>

                    <template v-slot:body>
                        <div class="masonary-menu filter-button-group">
                            <nav class="d-flex justify-content-center">
                                <div className="nav nav-tabs justify-content-start" id="portfolio-tab" role="tablist">
                                    <button :className="`nav-link ${gender == 'both' ? 'active' : ''}`"
                                        id="nav-both-tab" data-bs-toggle="tab" data-bs-target="#nav-both" type="button"
                                        role="tab" aria-controls="nav-both" aria-selected="true"
                                        @click="() => { this.gender = 'both'; }">
                                        الكل</button>

                                    <button :className="`nav-link ${gender == 'special_care' ? 'active' : ''}`"
                                        id="nav-female-tab" data-bs-toggle="tab" data-bs-target="#nav-female"
                                        type="button" role="tab" aria-controls="nav-female" aria-selected="false"
                                        @click="() => { this.gender = 'female'; }">
                                        إناث
                                    </button>

                                    <button :className="`nav-link ${gender == 'followup' ? 'active' : ''}`"
                                        id="nav-male-tab" data-bs-toggle="tab" data-bs-target="#nav-male" type="button"
                                        role="tab" aria-controls="nav-male" aria-selected="false"
                                        @click="() => { this.gender = 'male'; }">
                                        ذكور
                                    </button>
                                </div>
                            </nav>
                            <nav class="d-flex justify-content-center mt-2">
                                <div className="nav nav-tabs justify-content-start" id="portfolio-tab" role="tablist">
                                    <button v-for="(monthToShow, index) in lastSixMonths" :key="index"
                                        :className="`nav-link ${month == monthToShow.month ? 'active' : ''}`"
                                        id="nav-featured-tab" data-bs-toggle="tab" data-bs-target="#nav-featured"
                                        type="button" role="tab" aria-controls="nav-featured" aria-selected="false"
                                        @click="() => { this.month = monthToShow.month; }">
                                        {{ monthToShow.month }}
                                    </button>
                                </div>
                            </nav>
                        </div>
                        <div class="table-responsive" v-if="ambassadorsCount > 0">
                            <table id="datatable" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>اسم السفير</th>
                                        <th>تاريخ الانسحاب</th>
                                        <th>سبب الانسحاب</th>
                                        <th>الجنس</th>
                                        <th>الحالة</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr v-for="(ambassador, index) in ambassadors" :key="index">
                                        <td>
                                            <router-link
                                                :to="{ name: 'user.profile', params: { user_id: ambassador.id } }">
                                                {{ ambassador.name }}
                                            </router-link>
                                        </td>
                                        <td>
                                            {{ getFormatedDate(ambassador.updated_at) }}
                                        </td>
                                        <td>
                                            {{ ambassador.latest_exception[0] ? ambassador.latest_exception[0].reason
                                                : 'لا يوجد' }}
                                        </td>
                                        <td>
                                            {{ GENDER[ambassador.gender] }}
                                        </td>
                                        <td>
                                            <span class="material-symbols-outlined"
                                                v-if="ambassador.contacts_as_a_withdrawn">check_circle</span>
                                            <span v-else class="material-symbols-outlined">pending</span>
                                        </td>
                                        <td>
                                            <router-link class="text-center" :to="{
                                                name: 'withdrawns-team.withdrawn-ambassador',
                                                params: { ambassador_id: ambassador.id },
                                            }">
                                                <span class="material-symbols-outlined">
                                                    visibility
                                                </span> </router-link>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <Pagination :page="currentPage" :total="totalPages" :perPage="ambassadorsPerPage"
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

                    <div class="col-12" v-if="statistics">
                        <hr class="w-75 m-auto" />
                        <div class="row">
                            <div class="text-center w-100 col-12 col-md-12 col-lg-12">
                                <div class="card">
                                    <h3 class="mt-2 card-title text-center"> احصائيات</h3>

                                    <div class="card-body">
                                        <div class="d-flex align-items-center justify-content-center">
                                            <div
                                                class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                <img class="img-fluid" src="@/assets/images/gif/chart.gif" alt="" />
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <h3 class="text-center">
                                                {{ ambassadorsCount }}
                                            </h3>
                                            <p class="mb-0 text-center">العدد الكلي</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-md-6 col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center justify-content-center">
                                            <div
                                                class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                <img class="img-fluid" src="@/assets/images/gif/done.gif"
                                                    alt="book-animated" />
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <h3 class="text-center">{{ statistics.contact_done }}</h3>
                                            <p class="mb-0 text-center">تم التواصل معهم</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-md-6 col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center justify-content-center">
                                            <div
                                                class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                <img class="img-fluid" src="@/assets/images/gif/error.gif"
                                                    alt="person-animated" />
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <h3 class="text-center">
                                                {{ ambassadorsCount - statistics.contact_done }}
                                            </h3>
                                            <p class="mb-0 text-center">لم يتم التواصل معهم</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center justify-content-center">
                                            <div
                                                class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                <img class="img-fluid" src="@/assets/images/gif/person.gif"
                                                    alt="write-animated" />
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <h3 class="text-center">{{ statistics.consented_to_return }}</h3>
                                            <p class="mb-0 text-center">وافق على العودة</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center justify-content-center">
                                            <div
                                                class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                <img class="img-fluid" src="@/assets/images/gif/red_person.gif"
                                                    alt="screen-animated" />
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <h3 class="text-center">{{ statistics.refused_to_return }}
                                            </h3>
                                            <p class="mb-0 text-center">لم يوافق </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-4 col-md-4 col-lg-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center justify-content-center">
                                            <div
                                                class="border rounded avatar-55 d-flex align-items-center justify-content-center">
                                                <img class="img-fluid" src="@/assets/images/gif/no-entry.gif"
                                                    alt="screen-animated" />
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <h3 class="text-center">{{ statistics.did_not_respond }}
                                            </h3>
                                            <p class="mb-0 text-center"> لم يستجب </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </iq-card>

            </div>
        </div>
    </div>
</template>
<script>
import UserService from "@/API/services/user.service";
import helper from "@/utilities/helper";
import axios from "axios";
import { GENDER } from "@/utilities/constants";
import { getFormatedDate } from "@/utilities/commonFunctions";
import Pagination from '@/components/common/Pagination';
import { watch } from 'vue';
import { watchEffect } from "vue";
import { useRouter, useRoute } from 'vue-router';

export default {
    components: { Pagination },
    name: "List Ambassadors",
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
        this.month = this.lastSixMonths[0].month;
        this.loadAmbassadors();
        watchEffect(() => {
            this.currentPage = this.page;
        });

        watch(
            () => this.currentPage,
            (newPage) => {
                this.loadAmbassadors();
            }
        );
        watch(
            () => [this.month, this.gender],
            ([newMonth, newGender]) => {
                this.currentPage = 1;
                this.ambassadors = [];
                this.updatePage(this.currentPage);
                this.loadAmbassadors();
            }
        );

        watch(
            () => this.page,
            (newPage) => {
                if (newPage !== this.currentPage) {
                    this.ambassadors = [];
                    this.currentPage = newPage;
                    this.loadAmbassadors();
                }
            },
            { deep: true },
            { immediate: true }


        );



    },
    data() {
        return {
            gender: 'both',
            ambassadors: [],
            statistics: null,
            ambassadorsPerPage: 30,
            GENDER,
            searchModel: "",
            totalPages: 1,
            currentPage: this.page,
            loading: false,
            pendingRequest: false,
            hasMore: true,
            emptyMessage: "",
            cancelToken: axios.CancelToken.source(),
            month: 0,

        };
    },

    methods: {
        getFormatedDate,
        async loadAmbassadors() {
            if (this.pendingRequest) {
                return;
            }

            this.pendingRequest = true;
            this.loading = true;
            this.emptyMessage = "";

            try {
                let response = await UserService.getUsersOnHoldByMonthAndGender(
                    this.currentPage,
                    this.month,
                    this.gender,
                    this.cancelToken
                );
                if (response.statusCode !== 200) {
                    helper.toggleToast(
                        "حدث خطأ أثناء تحميل السفراء, حاول مرة أخرى",
                        "error"
                    );
                    return;
                }

                if (response.statusCode === 200 && (!response.data || !response.data.ambassadors)) {
                    this.emptyMessage = "لا يوجد سفراء";
                    this.hasMore = false;
                    return;
                }

                this.ambassadors = response.data.ambassadors;
                this.totalPages = response.data?.total ?? 1;
                this.statistics = response.data.statistics;
            } catch (error) {
                console.log(error);
                helper.toggleToast(
                    "حدث خطأ أثناء تحميل السفراء, حاول مرة أخرى",
                    "error"
                );
            } finally {
                this.loading = false;
                this.pendingRequest = false;
            }
        },
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        lastSixMonths() {
            const months = [];
            const currentDate = new Date();

            for (let i = 0; i < 6; i++) {
                const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                months.push({
                    year: month.getFullYear(),
                    month: month.getMonth() + 1, // getMonth() returns 0-based month index
                });
            }
            return months;
        },
        ambassadorsCount() {
            return Object.keys(this.ambassadors).length
        }
    }
};


</script>