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
                        <h2 class="mb-2 text-center">{{ user.name }}</h2>
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
                        <div class="social-links mt-1 mb-2">
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
                            </ul>
                        </div>

                        <div class="row text-center">
                            <div class="col-12 p-1">
                                <h3 class="mb-2 text-center" style="direction: rtl">
                                    <span class="material-symbols-outlined align-middle">
                                        person_pin
                                    </span>
                                    المسؤول عنه:
                                    <span v-if="user.parent_id">{{ user.parent.name }}</span>
                                    <span v-else>لا يوجد</span>
                                </h3>
                            </div>
                        </div>
                        <div class="row text-center">
                            <div class="col-12 p-1">
                                <h3 class="mb-2 text-start" style="direction: rtl">
                                    <span class="material-symbols-outlined align-middle">
                                        sensor_occupied
                                    </span>
                                    المسؤول عنهم:
                                </h3>
                                <ul v-if="in_charge_of.length>0">
                                    <li style="direction: rtl" class="text-start h5" v-for="user in in_charge_of"
                                        :key="user.id">{{ user.name }}</li>
                                </ul>
                                <h4 v-else>لا يوجد</h4>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ARABIC_ROLES } from "@/utilities/constants";

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
        }
    },
    data() {
        return {
            ARABIC_ROLES,
        };
    },
};
</script>  