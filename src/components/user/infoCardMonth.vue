<template>
    <div class="container" style="background-color: #f1f9f5">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-12 col-xl-12 mt-3 mb-3">
                <div class="card" style="border-radius: 15px">
                    <div class="card-body text-center">
                        <div class="mt-3 mb-3">
                            <BaseAvatar :profileImg="user.user_profile.profile_picture"
                                :profile_id="user.user_profile.id" :title="user.gender" :gender="user.gender"
                                avatarClass="avatar-130 img-fluid rounded-circle" containerClass="profile-img"
                                :imageStyle="{ border: '4px solid #1d1a55' }" dimensions="150x150" />
                        </div>
                        <router-link :to="{
                            name: 'user.profile',
                            params: { user_id: user.id },
                        }">
                            <h2 class="mb-2 text-center">{{ user.name }}</h2>
                        </router-link>
                        <p class="text-center mb-4" style="direction: rtl">
                            فريق المتابعة
                            <span class="mx-2">|</span>
                            <router-link v-if="followup_team" class="text-center" :to="{
                                name: 'group.group-detail',
                                params: { group_id: followup_team.group.id },
                            }">
                                {{ followup_team.group.name }}</router-link>
                            <span v-else class="mx-2">لا يوجد</span>

                        </p>
                        <div class="social-links mt-1 mb-3">
                            <ul class="social-data-block align-items-center justify-content-center list-inline p-0 m-0"
                                style="display: flex !important">
                                <li v-for="(role, index) in roles" :key="index" class="text-center pe-2">
                                    <span class="rounded-pill badge bg-primary px-2">{{
                                        ARABIC_ROLES[role]
                                    }}</span>
                                </li>

                                <li v-if="user.is_excluded" class="text-center pe-2">
                                    <span class="rounded-pill badge bg-danger px-2">
                                        مستبعد
                                    </span>
                                </li>
                                <li v-if="user.is_hold" class="text-center pe-2">
                                    <span class="rounded-pill badge bg-secondary px-2">
                                        منسحب
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div class="row">
                            <h5 class="mb-2 text-start" style="direction: rtl">
                                <span class="material-symbols-outlined align-middle">
                                    heart_plus
                                </span>
                                تاريخ الانضمام:
                                <span>
                                    {{ format_date(user.created_at) }}
                                </span>
                            </h5>
                        </div>
                        <div class="row text-center">
                            <h5 class="mb-2 text-start" style="direction: rtl">
                                <span class="material-symbols-outlined align-middle">
                                    person_pin
                                </span>
                                المسؤول عنه:
                                <span v-if="user.parent_id">{{ user.parent.name }}</span>
                                <span v-else>لا يوجد</span>
                            </h5>
                        </div>
                        <div class="row text-center">
                            <div class="col-12 p-1">
                                <h5 class="mb-2 text-start" style="direction: rtl">
                                    <span class="material-symbols-outlined align-middle">
                                        sensor_occupied
                                    </span>
                                    المسؤول عنهم:
                                </h5>
                                <ul v-if="in_charge_of.length > 0">
                                    <li style="direction: rtl" class="text-start h5" v-for="user in in_charge_of"
                                        :key="user.id">{{ user.name + " " + user.last_name }}</li>
                                </ul>
                                <h4 v-else>لا يوجد</h4>
                            </div>

                        </div>

                        <div class="inline-block mt-3">
                            <button type="button"
                                @click="() => { show_groups = !show_groups; show_marks = false; thesesToShow = null }"
                                class="mb-3 btn bg-white text-dark border-dark w-100 d-flex justify-content-between">
                                <h5>
                                    موجود في المجموعات
                                    <span class="material-symbols-outlined align-middle me-1">
                                        diversity_3
                                    </span>

                                </h5>
                                <span class="material-symbols-outlined">
                                    {{ show_groups ? "visibility_off" : "visibility" }}
                                </span>
                            </button>

                            <table class="table inline-grid w-100" v-show="show_groups">
                                <thead>
                                    <tr class="d-flex justify-content-around">
                                        <th scope="col">المجموعة</th>
                                        <th scope="col"> دوره</th>
                                        <th scope="col"> حالته</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="d-flex justify-content-around" v-for="group in groups" :key="group.id">

                                        <td scope="col" class="align-middle text-center w-25">
                                            <router-link class="text-center" :to="{
                                                name: 'group.group-detail',
                                                params: { group_id: group.group.id },
                                            }">
                                                <span> {{ group.group.name }} </span></router-link>
                                        </td>

                                        <td scope="col" class="align-middle text-center w-25">
                                            <span> {{ ARABIC_ROLES[group.user_type] }} </span>
                                        </td>
                                        <td scope="col" class="align-middle text-center w-50">
                                            <span v-if="group.termination_reason" style="color: darkred;"> {{
                                                TERMINATION_REASONS[group.termination_reason] }} </span>
                                            <span v-else class="rounded-pill badge bg-primary px-2"> فعال </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />

                            <button type="button"
                                @click="() => { show_marks = !show_marks; show_groups = false; thesesToShow = null }"
                                class="mb-3 btn bg-white text-dark border-dark w-100 d-flex justify-content-between">
                                <h5>
                                    انجاز السفير خلال لأسابيع الأربعة الماضبة
                                    <span class="material-symbols-outlined align-middle me-1">
                                        query_stats
                                    </span>

                                </h5>
                                <span class="material-symbols-outlined">
                                    {{ show_marks ? "visibility_off" : "visibility" }}
                                </span>
                            </button>
                            <table class="table inline-grid w-100" v-show="show_marks">
                                <thead>
                                    <tr class="">
                                        <td scope="col">الأسبوع</td>
                                        <td scope="col" colspan="3">العلامة من 100</td>
                                        <td scope="col">الصفحات</td>
                                        <td scope="col">الاطروحات</td>
                                        <td scope="col">الاقتباسات</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr :class="`${mark.is_freezed ? 'freeze' : markClass(mark.reading_mark + mark.writing_mark + mark.support)} `"
                                        v-for="mark in marks" :key="mark.id">
                                        <td class="align-middle text-center">
                                            <span> {{ mark.week.title }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span> القراءة
                                                <br />
                                                {{ mark.reading_mark }}
                                            </span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span>
                                                الكتابة
                                                <br />
                                                {{ mark.writing_mark }}
                                            </span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span>
                                                اعرف مشروعك
                                                <br />
                                                {{ mark.support ? mark.support : 0 }}
                                            </span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span> {{ mark.total_pages }} </span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span> {{ mark.total_thesis }} </span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span> {{ mark.total_screenshot }} </span>
                                        </td>

                                        <td class="align-middle text-center">
                                            <span class="support material-symbols-outlined" role="button"
                                                @click="setThesesToShow(mark.thesis)">
                                                {{ mark.reading_mark + mark.writing_mark + mark.support > 0 ?
                                                    "visibility" : "visibility_off" }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <mark-theses :theses="thesesToShow" v-if="thesesToShow" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ARABIC_ROLES, TERMINATION_REASONS } from "@/utilities/constants";
import moment from "moment";
import MarkTheses from './Achevment/MarkTheses.vue';

export default {
    name: "Information Card",
    components: {
        MarkTheses
    },
    created() {
    },

    props: {
        user: {
            type: [Object],
            required: true,
        },
        followup_team: {
            type: [Object],
            required: true,
        },
        roles: {
            type: [Object],
            required: true,
        },
        in_charge_of: {
            type: [Object],
            required: true,
        },
        groups: {
            type: [Object],
            required: true,
        },
        marks: {
            type: [Object],
            required: true,
        }
    },
    data() {
        return {
            ARABIC_ROLES,
            TERMINATION_REASONS,
            show_groups: false,
            show_marks: false,
            thesesToShow: null,
        };
    },
    methods: {
        format_date(value) {
            if (value) {
                return moment(String(value)).format("MM/DD/YYYY");
            }
        },

        /**
         * return mark color class.
         *  @param  mark
         * @return class
         */
        markClass(mark) {
            switch (mark) {
                case -1:
                    return "freeze";
                case 100:
                    return "full-mark";

                case 0:
                    return "zero-mark";

                default:
                    return "incomplete";
            }
        },
        setThesesToShow(theses) {
            this.thesesToShow = theses;
        }
    },

};
</script>
<style scoped>
.freeze {
    --bs-bg-opacity: 1;
    background-color: #F4FAFF !important;
}

.full-mark {
    --bs-bg-opacity: 1;
    background-color: #F0FDF0 !important;
}

.zero-mark {
    --bs-bg-opacity: 1;
    background-color: #FFE5E6 !important;
}

.incomplete {
    --bs-bg-opacity: 1;
    background-color: #FFEBCC;
}
</style>