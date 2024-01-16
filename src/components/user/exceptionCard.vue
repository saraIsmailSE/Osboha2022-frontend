<template>
    <div class="container" style="background-color: #f1f9f5">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-12 col-xl-4 mt-3 mb-3">
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

                        <div class="blog-description">
                            <table class="table w-100">
                                <thead>
                                    <tr>
                                        <th scope="col">اسم السفير</th>
                                        <th scope="col">نوع الاجازة</th>
                                        <th scope="col">الحالة</th>
                                        <th scope="col">يبدأ بـ</th>
                                        <th scope="col">ينتهي بـ</th>
                                    </tr>
                                </thead>
                                <tbody v-if="exceptions && exceptions.length > 0">
                                    <tr v-for="exception in exceptions" :key="exception.id">
                                        <td>{{ exception.user.name }}</td>
                                        <td>{{ exception.type.type }}</td>
                                        <td>{{ EXCEPTION_STATUS[exception.status] }}</td>
                                        <td v-if="exception.start_at">
                                            {{ exception.start_at }}
                                        </td>
                                        <td v-else>------</td>
                                        <td v-if="exception.end_at">
                                            {{ exception.end_at }}
                                        </td>
                                        <td v-else>------</td>
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
            </div>
        </div>
    </div>
</template>
<script>
import { EXCEPTION_STATUS} from "@/utilities/constants";

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
        exceptions: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            EXCEPTION_STATUS
        };
    },
};
</script>  