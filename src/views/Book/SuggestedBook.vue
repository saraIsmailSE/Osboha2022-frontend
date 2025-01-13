<template>
    <div ref="listContainer">
        <div class="row">
            <div class="col-sm-12" v-if="book">
                <iq-card>

                    <template v-slot:body>
                        <div class="table-responsive">
                            <table id="datatable" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>اسم الكتاب</th>
                                        <th>اللغة</th>
                                        <th>فئة الكتاب</th>
                                        <th>اخر تحديث</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
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
                                            <a v-if="book.link" target="_blank" :href="book.link">
                                                <span class="material-symbols-outlined">
                                                    link
                                                </span>
                                            </a>
                                            <span v-else>
                                                لا يوجد
                                            </span>

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
                                            تم الاقتراح من قِبَل
                                        </td>
                                        <td>
                                            {{ book.user.name + " " +book.user.last_name }}
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>
                                            تم المراجعة من قِبَل
                                        </td>
                                        <td>
                                            {{ book.reviewer ? book.reviewer.name + " " + book.reviewer.last_name : " تحت المراجعة" }}
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div class="text-center m-auto">
                            <h4 class="mt-3 mb-3" style="direction: rtl;">
                                حالة الاقتراح
                                <span class="badge" :class="STATUS_CLASS[book.status]">
                                    {{ STATUS[book.status] }}
                                </span>

                            </h4>
                            <p v-if="book.status != 'pending'" style="direction: rtl;">
                                ملاحظات المراجع:
                                {{ book.reviewer_note }}
                            </p>
                        </div>
                        <div class="text-center m-auto">
                            <h4 class="mt-3 mb-3">
                                وصف الكتاب
                            </h4>

                            <p>
                                {{ book.brief }}
                            </p>
                        </div>

                        <suggested-book-action :suggestion="book" @update_suggestion="updateSuggestion"
                            v-if="inBooksTeam" />

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
import { STATUS, STATUS_CLASS, LANUAGES } from "@/utilities/constants";
import UserInfoService from "@/Services/userInfoService";
import moment from 'moment';
import BookSuggestion from "@/API/services/book-suggestion.service";
import SuggestedBookAction from '@/components/book/SuggestedBookAction'

export default {
    name: "Violated Book book",
    components: {
        SuggestedBookAction
    },
    async created() {
        try {
            this.loading = true;
            this.getSuggestion();

        } catch (e) {
            this.emptyMessage = "لا يوجد معلومات";
        }
        finally {
            this.loading = false;
        }
    },
    data() {
        return {
            book: null,
            loading: false,
            emptyMessage: "",
            STATUS,
            STATUS_CLASS,
            LANUAGES,

        };
    },

    methods: {
        getFormatedDate(value) {
            return moment(String(value)).format('MM/DD/YYYY hA')
        },
        async getSuggestion() {
            this.book = await BookSuggestion.show(this.$route.params.suggestion_id);
        },
        updateSuggestion() {
            this.getSuggestion();
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