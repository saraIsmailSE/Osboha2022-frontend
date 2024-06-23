<template>
    <div class="card card-block card-stretch card-height blog">
        <div class="card-header">
            <h2>الاجازات - {{ EXCEPTION_TYPES[this.exception_type] }}</h2>
        </div>
        <div class="card-body">
            <div class="blog-description">
                <table class="table w-100">
                    <thead>
                        <tr>
                            <th scope="col">اسم السفير</th>
                            <th scope="col">فريق المتابعة</th>
                            <th scope="col">الانتهاء</th>
                        </tr>
                    </thead>
                    <tbody v-if="exceptions && exceptions.length > 0">
                        <tr v-for="exception in exceptions.slice(0, length)" :key="exception.id">
                            <td>{{ exception.user.name + " " + exception.user.last_name }}</td>
                            <td v-if="exception.user.followup_team.group">
                                <router-link class="text-center" :to="{
                                    name: 'group.group-detail',
                                    params: { group_id: exception.user.followup_team.group.id },
                                }">
                                    {{ exception.user.followup_team.group.name }}
                                </router-link>
                            </td>
                            <td v-else> لا يوجد</td>
                            <td v-if="exception.end_at">
                                {{ exception.end_at }}
                            </td>
                            <td v-else>------</td>
                            <router-link :to="{
                                name: 'exceptions.listException',
                                params: { exception_id: exception.id },
                            }">
                                <td>
                                    <i role="button" class="material-symbols-outlined md-18 me-1 text-primary">
                                        visibility
                                    </i>
                                </td>
                            </router-link>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr colspan="4">
                            <td>لا يوجد بيانات لعرضها</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { STATUS, EXCEPTION_TYPES } from "@/utilities/constants";

export default {
    name: "List Exceptions",
    props: {
        exception_type: { type: String },
        exceptions: { type: Object },
    },

    data() {
        return {
            STATUS,
            EXCEPTION_TYPES,
        };
    },
};
</script>