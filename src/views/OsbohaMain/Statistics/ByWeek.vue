<template>
    <iq-card v-if="response">
        <template v-slot:body>
            <h2 class="ps-3">{{ response.previous_week.title }}</h2>
            <div class="col-lg-12 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="header-title">
                            <h4 class="card-title">
                                الأكثر قراءة
                                <img class="img-fluid avatar-55" src="@/assets/images/gif/book.gif" alt="book-animated" />
                            </h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row d-flex justify-content-center mb-2">
                            <div class="col-6 m-auto d-flex justify-content-end">
                                <BaseAvatar :profileImg="response.max_total_pages.user.user_profile.profile_picture"
                                    :profile_id="response.max_total_pages.user.user_profile.id"
                                    :title="response.max_total_pages.user.name"
                                    :gender="response.max_total_pages.user.gender"
                                    avatarClass="avatar-120 rounded-circle" />
                            </div>
                            <div class="col-6 m-auto">
                                <router-link :to="{
                                    name: 'user.profile',
                                    params: { user_id: response.max_total_pages.user.id },
                                }">
                                    <h3>{{ response.max_total_pages.user.name }}</h3>
                                </router-link>
                                <h5 style="direction: rtl">
                                    {{ formatNumber(response.max_total_pages.max_total_pages) }}
                                    صفحة
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="header-title">
                            <h4 class="card-title">
                                الأكثر أطروحات
                                <img class="img-fluid avatar-55" src="@/assets/images/gif/thesis.gif"
                                    alt="write-animated" />

                            </h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row d-flex justify-content-center mb-2">
                            <div class="col-6 m-auto d-flex justify-content-end">
                                <BaseAvatar :profileImg="response.max_total_thesis.user.user_profile.profile_picture"
                                    :profile_id="response.max_total_thesis.user.user_profile.id"
                                    :title="response.max_total_thesis.user.name"
                                    :gender="response.max_total_thesis.user.gender"
                                    avatarClass="avatar-120 rounded-circle" />
                            </div>
                            <div class="col-6 m-auto">
                                <router-link :to="{
                                    name: 'user.profile',
                                    params: { user_id: response.max_total_thesis.user.id },
                                }">
                                    <h3>{{ response.max_total_thesis.user.name }}</h3>
                                </router-link>
                                <h5 style="direction: rtl">
                                    {{ formatNumber(response.max_total_thesis.max_total_thesis) }}
                                    أطروحة
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </iq-card>
</template>
<script>
import helper from "@/utilities/helper.js";
import MarkService from "@/API/services/marks.service";

export default {
    name: "By Week",
    components: {
        // MostRead,
    },
    async created() {
        this.response = await MarkService.topUsersByWeek();
    },

    data() {
        return {
            response: null,
        };
    },
    methods: {
        ...helper,
    },

};
</script>
