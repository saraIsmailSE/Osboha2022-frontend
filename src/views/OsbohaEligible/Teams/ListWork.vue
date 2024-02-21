<template>
    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-body p-3">
                <div class="card card-block card-stretch card-height blog">
                    <div class="card-header">
                        <h2>الاسبوع - {{ week.title }}</h2>
                    </div>

                    <div class="form-group mt-3">
                        <select class="form-select" v-model="week_id">
                            <option value="-1">اختر الأسبوع</option>
                            <option v-for="week in weeks" :key="week.id" :value="week.id">{{ week.title }}
                            </option>
                        </select>
                    </div>

                    <div class="card-body">
                        <h2>
                            الأطروحات
                            <span role="button" class="material-symbols-outlined" v-if="!showTheses"
                                @click="() => { showQuestions = false; showSummury = false; showTheses = true }">
                                expand_more
                            </span>
                            <span role="button" class="material-symbols-outlined" v-if="showTheses"
                                @click="showTheses = !showTheses">
                                expand_less
                            </span>

                        </h2>
                        <ListItems :items="eligible_theses" v-if="showTheses" :route="'thesis'" :for_super="for_super" />
                    </div>

                    <div class="card-body">
                        <h2>
                            الأسئلة
                            <span role="button" class="material-symbols-outlined" v-if="!showQuestions"
                                @click="() => { showTheses = false; showSummury = false; showQuestions = true }">
                                expand_more
                            </span>
                            <span role="button" class="material-symbols-outlined" v-if="showQuestions"
                                @click="showQuestions = !showQuestions">
                                expand_less
                            </span>

                        </h2>
                        <ListItems :items="eligible_questions" v-if="showQuestions" :route="'question'"
                            :for_super="for_super" />
                    </div>
                    <div class="card-body">
                        <h2>
                            التلخيص العام
                            <span role="button" class="material-symbols-outlined" v-if="!showSummury"
                                @click="() => { showTheses = false; showQuestions = false; showSummury = true }">
                                expand_more
                            </span>
                            <span role="button" class="material-symbols-outlined" v-if="showSummury"
                                @click="showSummury = !showSummury">
                                expand_less
                            </span>

                        </h2>
                        <ListItems :items="eligible_questions" v-if="showSummury" :route="'generalSummury'"
                            :for_super="for_super" />
                    </div>

                </div>
            </div>
        </iq-card>
    </div>
</template>
<script>
import statisticsServices from "@/API/EligibleServices/statistics.services";
import helper from "@/utilities/helper";
import ListItems from './itemsToList';
import { watchEffect } from "vue";

export default {
    name: "List Work",
    components: {
        ListItems
    },
    data() {
        return {
            showTheses: false,
            showQuestions: false,
            showSummury: false,
            eligible_general_informations: [],
            eligible_theses: [],
            eligible_questions: [],
            week: [],
            weeks: [],
            week_id: -1,
            loader: false,
            for_super: '',
            // date: null,
            // now: null,
            // can_edit: true,
        };
    },
    async created() {
        try {
            watchEffect(async () => {
                if (this.week_id) {
                    this.eligible_general_informations = [];
                    this.eligible_theses = [];
                    this.eligible_questions = [];

                    const response = await statisticsServices.myTeam(this.week_id);
                    this.week = response.week;
                    this.week_id = this.week.id;
                    this.weeks = response.weeks;
                    this.for_super = response.for_super;
                    switch (this.for_super) {
                        case 'reviewer':
                            this.eligible_general_informations = response.eligible_general_informations.reduce((groupByTeamMember, item) => {
                                const group = groupByTeamMember[item.reviewer.name] || [];
                                group["title"] = item.reviewer.name;
                                group.push(item);
                                groupByTeamMember[item.reviewer.name] = group;
                                return groupByTeamMember;
                            }, {});

                            this.eligible_questions = response.eligible_questions.reduce((groupByTeamMember, item) => {
                                const group = groupByTeamMember[item.reviewer.name] || [];
                                group["title"] = item.reviewer.name;
                                group.push(item);
                                groupByTeamMember[item.reviewer.name] = group;
                                return groupByTeamMember;
                            }, {});


                            this.eligible_theses = response.eligible_thesis.reduce((groupByTeamMember, item) => {
                                const group = groupByTeamMember[item.reviewer.name] || [];

                                group["title"] = item.reviewer.name;
                                group.push(item);
                                groupByTeamMember[item.reviewer.name] = group;
                                return groupByTeamMember;
                            }, {});


                            break;
                        case 'auditer':
                            this.eligible_general_informations = response.eligible_general_informations.reduce((groupByTeamMember, item) => {
                                const group = groupByTeamMember[item.auditor.name] || [];
                                group["title"] = item.auditor.name;
                                group.push(item);
                                groupByTeamMember[item.auditor.name] = group;
                                return groupByTeamMember;
                            }, {});

                            this.eligible_questions = response.eligible_questions.reduce((groupByTeamMember, item) => {
                                const group = groupByTeamMember[item.auditor.name] || [];
                                group["title"] = item.auditor.name;
                                group.push(item);
                                groupByTeamMember[item.auditor.name] = group;
                                return groupByTeamMember;
                            }, {});


                            this.eligible_theses = response.eligible_thesis.reduce((groupByTeamMember, item) => {
                                const group = groupByTeamMember[item.auditor.name] || [];

                                group["title"] = item.auditor.name;
                                group.push(item);
                                groupByTeamMember[item.auditor.name] = group;
                                return groupByTeamMember;
                            }, {});


                            break;
                    }
                }
            });

        } catch (error) {
            console.log("🚀 ~ created ~ error:", error)
            const res = error.response.data;
            if (res.statusCode === 401) {
                this.$router.push({ name: "NotAuthorized" });
            } else if (res.statusCode === 404) {
                this.$router.push({ name: "NotFound" });
            } else {
                helper.toggleToast("حدث خطأ ما", "error");
            }
        }
    },
    methods: {
        getDayOfWeek(dateString) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const date = new Date(dateString);
            return days[date.getDay()];
        }
    },
};
</script>
