<template>
    <div ref="listContainer">
        <div class="row">
            <div class="col-sm-12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title"> انجاز أعضاء جودة الكتب</h4>
                    </template>

                    <template v-slot:body>
                        <div class="masonary-menu filter-button-group">
                            <nav class="d-flex justify-content-center">
                                <div className="nav nav-tabs justify-content-start" id="portfolio-tab" role="tablist">
                                    <button :className="`nav-link ${this.current_week.id == week.id ? 'active' : ''}`"
                                        id="nav-pending-tab" data-bs-toggle="tab" data-bs-target="#nav-pending"
                                        type="button" role="tab" aria-controls="nav-pending" aria-selected="true"
                                        @click="() => { this.current_week = week; }" v-for="week in weeks"
                                        :key="week.id">
                                        {{ week.title }}
                                    </button>

                                </div>
                            </nav>
                        </div>
                        <div class="table-responsive" v-if="achievements">
                            <div class="alert bg-info" role="alert">
                                <h3 class="text-center text-white"> العدد الكلي للصفحات: {{ totalTeamReading }}</h3>
                            </div>

                            <table id="datatable" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>اسم العضو</th>
                                        <th>الكتب</th>
                                        <th>الصفحات</th>
                                        <th>الأطروحات</th>
                                        <th>الاقتباسات</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr v-for="(user_achievement, user) in achievements" :key="user_achievement">
                                        <td>
                                            <router-link
                                                :to="{ name: 'user.profile', params: { user_id: user_achievement.user_id } }">
                                                {{ user }}
                                            </router-link>
                                        </td>
                                        <td v-if="user_achievement.status == 'active'">
                                            <ul>
                                                <li class="mt-1"
                                                    v-for="(book, index) in user_achievement.achievement.book"
                                                    :key="index">
                                                    <router-link :to="{
                                                        name: 'book.user-theses',
                                                        params: {
                                                            book_id: index,
                                                            user_id: user_achievement.user_id,
                                                        },
                                                    }">
                                                        {{ book.total_pages }} - {{ book.book_name }}
                                                    </router-link>
                                                </li>
                                            </ul>
                                        </td>
                                        <td v-if="user_achievement.status == 'active'">
                                            {{ user_achievement.achievement.total_pages }}
                                        </td>
                                        <td v-if="user_achievement.status == 'active'">
                                            {{ user_achievement.achievement.total_thesis }}
                                        </td>
                                        <td v-if="user_achievement.status == 'active'">
                                            {{ user_achievement.achievement.total_screenshot }}

                                        </td>
                                        <td v-if="user_achievement.status != 'active'" colspan="4" class="text-center">
                                            {{ user_achievement.status }}
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
import MarkService from "@/API/services/marks.service";
import WeekService from "@/API/services/week.service";
import helper from "@/utilities/helper";
import moment from 'moment';
import { watch } from 'vue';

export default {
    name: "Quality Team Achievements",
    async created() {
        this.weeks = await WeekService.getWeeks(3);
        this.current_week = this.weeks[0];
        this.loadAchievements(this.current_week.id);
        watch(
            () => this.current_week,
            () => {
                this.loadAchievements(this.current_week.id);
            }
        );
    },
    data() {
        return {
            weeks: [],
            current_week: null,
            achievements: null,
            searchModel: "",
            totalPages: 1,
            loading: false,
            pendingRequest: false,
            hasMore: true,
            emptyMessage: "",
        };
    },

    methods: {
        async loadAchievements(week_id) {
            if (this.pendingRequest) {
                return;
            }

            this.pendingRequest = true;
            this.loading = true;
            this.emptyMessage = "";
            this.achievements = null;

            try {
                this.achievements = await MarkService.bookQualityTeamAchievements(week_id);
            } catch (error) {
                console.log(error);
                helper.toggleToast(
                    "حدث خطأ أثناء تحميل الانجازات, حاول مرة أخرى",
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

        totalTeamReading() {
            if (this.achievements) {
                return Object.values(this.achievements).reduce((sum, user) => {
                    return sum + (user.achievement && user.achievement.total_pages ? user.achievement.total_pages : 0);
                }, 0);

            }
            return 0;
        },
    },
}

</script>