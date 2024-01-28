<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <div class="header-title">
                <h4 class="card-title">عن المجموعة</h4>
            </div>
        </div>
        <div class="card-body">
            <ul class="list-inline p-0 m-0">
                <li class="mb-3">
                    <h3 class="mb-0">{{ group.name }}</h3>
                </li>
                <li class="mb-3">
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <i class="material-symbols-outlined"> sticky_note_2 </i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h4>رسالة المجموعة المجموعة</h4>
                            <p class="mb-0" style="white-space: pre-wrap; direction: rtl">
                                {{ group.description }}
                            </p>
                        </div>
                    </div>
                </li>
                <li class="mb-3" v-for="administrator in groupAdministrators" :key="administrator.id">
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <i class="material-symbols-outlined"> supervisor_account </i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h4 v-if="administrator.pivot.user_type == 'marathon_coordinator'">
                                المسؤول العام
                            </h4>
                            <h4 v-if="administrator.pivot.user_type == 'marathon_verification_supervisor'">
                                مسؤول التدقيق
                            </h4>
                            <h4 v-if="administrator.pivot.user_type == 'marathon_supervisor'">
                                مسؤول المجموعة
                            </h4>
                            <p class="mb-0">
                                {{ administrator.name }}
                            </p>
                        </div>
                    </div>
                </li>
                <li class="mb-3">
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <i class="material-symbols-outlined">trending_up</i>
                        </div>
                        <div class="flex-grow-1 ms-3" v-if="week_avg">
                            <h4>{{ week_avg }}</h4>
                            <p class="mb-0">معدل الأسبوع {{ week.title }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

export default {
    name: "About the group [OsbohaMarathon]",
    components: {
    },
    props: {
        group: {
            type: [Object],
            required: true,
        },
        groupAdministrators: {
            type: [Object],
            required: true,
        },
        week_avg: {
            type: [Object],
            required: true,
        },
        week: {
            type: [Object],
            required: true,
        },
    },
};
</script>