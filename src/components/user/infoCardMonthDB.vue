<template>
    <div class="container" style="background-color: #f1f9f5">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-12 col-xl-12 mt-3 mb-3">
                <div class="card" style="border-radius: 15px">
                    <div class="card-body text-center">
                        <div class="mt-3 mb-3">
                            <BaseAvatar :profileImg="user.user_profile.profile_picture" :profile_id="user.user_profile.id"
                                :title="user.gender" :gender="user.gender" avatarClass="avatar-130 img-fluid rounded-circle"
                                containerClass="profile-img" :imageStyle="{ border: '4px solid #1d1a55' }"
                                dimensions="150x150" />
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
                                        :key="user.id">{{ user.name }}</li>
                                </ul>
                                <h4 v-else>لا يوجد</h4>
                            </div>

                        </div>

                        <div class="inline-block mt-3">
                            <h5>
                                موجود في المجموعات
                                <span class="material-symbols-outlined align-middle me-1">
                                    diversity_3
                                </span>

                            </h5>
                            <table class="table inline-grid w-100">
                                <thead>
                                    <tr class="d-flex justify-content-around">
                                        <th scope="col">المجموعة</th>
                                        <th scope="col"> دوره</th>
                                        <th scope="col"> حالته</th>
                                    </tr>
                                </thead>
                                <tbody v-for="group in groups" :key="group.id">
                                    <tr class="d-flex justify-content-around">

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

                            <iq-card class="iq-card">
                                <div class="col-12">
                                    <div class="card card-block card-stretch card-height">
                                        <div class="card-header">
                                            <h4>
                                                خلال الأسابيع الأربعة الماضية <span class="text-primary"> {{ user.name }} </span>  انجاز السفير
                                            </h4>
                                            <!-- <div class="form-group mt-3">
                                                <select class="form-select" v-model="week_id">
                                                <option value="-1">اختر الأسبوع</option>
                                                <option v-for="week in statistics.weeks" :key="week.id" :value="week.id">{{ week.title }}</option>
                                                </select>
                                            </div> -->
                                        </div>
                                        <div class="card-body">
                                            <!--  -->
                                            <table class="table inline-grid w-100">
                                                <thead>
                                                    <tr class="d-flex justify-content-around">
                                                        <th scope="col">الأسبوع</th>
                                                        <th scope="col"> العلامة من 100</th>
                                                        <th scope="col"> الصفحات</th>
                                                        <th scope="col"> الانجاز</th>
                                                        <th scope="col">الاطروحات</th>
                                                        <th scope="col">الاقتباسات</th>
                                                        <th scope="col">الدعم</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-for="(item, index) in ambassadorMarks" :key="index">
                                                    <tr class="d-flex justify-content-around"
                                                            :class="`${ambassadorMarks[index].is_freezed ? 'freeze' : markClass(Math.round(ambassadorMarks[index].out_of_100))} `">
                                                        <td class="align-middle text-center">
                                                            <span>{{ ambassadorMarks[index].week.title }}</span>
                                                        </td>
                                                        <td class="align-middle text-center">
                                                            <span> {{ Math.round(ambassadorMarks[index].out_of_100) }} </span>
                                                        </td>
                                                        <td class="align-middle text-center">
                                                            <span> {{ ambassadorMarks[index].total_pages }} </span>
                                                        </td>
                                                        <td class="align-middle text-center">
                                                            <span v-if="ambassadorMarks[index].total_thesis > 0 && ambassadorMarks[index].total_screenshot > 0">
                                                                أطروحة واقتباسات
                                                            </span>
                                                            <span v-else-if="ambassadorMarks[index].total_thesis > 0">أطروحة</span>
                                                            <span v-else-if="ambassadorMarks[index].total_screenshot > 0">اقتباس</span>
                                                            <span v-else-if="ambassadorMarks[index].total_pages == 0">لا يوجد </span>
                                                            <spanb v-else>قراءة فقط</spanb>
                                                            <br/>
                                                            <button
                                                                v-if="ambassadorMarks[index].total_thesis > 0" 
                                                                type="button"
                                                                @click="toggleInfo(index)"
                                                                class="mb-3 btn bg-white text-dark border-dark w-100 d-flex justify-content-between"
                                                            >
                                                            {{ currentIndex === index ? "اخفاء" : "عرض" }}
                                                            <span class="material-symbols-outlined">
                                                                {{ currentIndex === index ? "visibility_off" : "visibility" }}
                                                            </span>   
                                                            </button>
                                                        </td>
                                                        <td class="align-middle text-center">
                                                            <span> {{ ambassadorMarks[index].total_thesis }} </span>
                                                        </td>

                                                        <td class="align-middle text-center">
                                                            <span> {{ ambassadorMarks[index].total_screenshot }} </span>
                                                        </td>

                                                        <td class="align-middle text-center">
                                                            <span class="support material-symbols-outlined" v-if="ambassadorMarks[index].support != 0">
                                                                task_alt
                                                            </span>
                                                            <span class="no-support material-symbols-outlined" v-else>
                                                                close
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <div v-show="show_thesis"> {{ ambassadorMarks[index] }}</div>
                                                </tbody>
                                                
                                                <div v-if="currentIndex !== null" class="blog-description">
                                                    <h3>الإنجاز</h3>
                                                <div  class="row">
                                                    <div  class="row">
                                                    <div  class="col-6 form-group">
                                                        <label  class="form-control-plaintext">
                                                        صفحة البداية: {{ theses[currentIndex].start_page }}
                                                        </label>
                                                    </div>
                                                    <div  class="col-6 form-group">
                                                        <label  class="form-control-plaintext">
                                                        صفحة النهاية: {{  theses[currentIndex].end_page }}
                                                        </label>
                                                    </div>
                                                    </div>
                                                </div>
                                                <h6 > الصفحات المنجزة: {{ ambassadorMarks[currentIndex].total_pages }} </h6>
                                                <p  style="white-space: pre-wrap; direction: rtl;">
                                                    تأثرت أوروبا بأفكار مسيحية عميقة جذبتها منذ الطفولة في المدارس
                                                    الابتدائية خلال العصور الوسطى، ورغم نضوجها، تظل هذه التجارب الطفولية
                                                    حية في عقل الأوروبي. وبالرغم من أن بعض المناطق تحررت من تأثيرات
                                                    العصور الوسطى، مثل إنجلترا، إلا أن الأفكار الدينية ما زالت سادة في
                                                    أوروبا، حيث يظل الاختيار بين مملكة الرب ومملكة الأرض. تقسم المسيحية
                                                    تاريخ العالم الغربي إلى عصور متناقضة، لكن هذا التقسيم لا ينطبق
                                                    بالضرورة على إنجلترا، التي بحثت عن طريق ثالث.
                                                </p>
                                                <!-- <div
                                                    
                                                    class="d-flex flex-wrap align-items-center comment-activity"
                                                >
                                                    <span
                                                    
                                                    type="button"
                                                    id="example-tooltip"
                                                    class="text-muted small"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="bottom"
                                                    data-bs-html="false"
                                                    data-bs-original-title="السبت، 4 مايو 2024 في 2:22 ص"
                                                    >
                                                    
                                                    منذ 21 يوم
                                                    </span>
                                                </div> -->
                                                </div>
                                            </table>

                                            <hr />

                                        </div>
                                    </div>
                                </div>
                            </iq-card>
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

export default {
    name: "Information Card",
    components: {
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
        ambassadorMarks: {
            type: [Object],
            required: true,
        },
        theses: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            show_thesis: false,
            currentIndex: null,
            ARABIC_ROLES,
            TERMINATION_REASONS
        };
    },
    methods: {
        format_date(value) {
            if (value) {
                return moment(String(value)).format("MM/DD/YYYY");
            }
        },

        toggleInfo(index) {
            this.currentIndex = this.currentIndex === index ? null : index;
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
    },

};
</script>
<style scoped>

td {
    width: calc(100% / 8);
}

.no-support {
    vertical-align: -webkit-baseline-middle;
    color: darkred;
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}

.support {
    vertical-align: -webkit-baseline-middle;
    color: #278036;
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
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