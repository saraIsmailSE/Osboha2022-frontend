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
                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-12" v-for="(topPages,index) in response.max_total_pages.slice(0, 3) "
                            :key="topPages.user.id">
                            <NewTopUserFrame :userID="topPages.user.id" :userName="topPages.user.name"
                                :topValue="formatNumber(topPages.max_total_pages)" :topValueType="'صفحة'"
                                :profile_id="topPages.user.user_profile.id" :title="topPages.user.name"
                                :topNumber="index" :image='`most_read_${index + 1}.png`'/>
                        </div>
                        <div class="header-title">
                            <h3 class="ms-3 title">
                                50 أخرين
                                <span role="button" class="align-middle material-symbols-outlined"
                                    @click="show_top_pages = !show_top_pages">
                                    {{ show_top_pages ? "expand_less" : "expand_more" }}
                                </span>

                            </h3>
                        </div>

                    </div>
                    <div class="row" v-show="show_top_pages">

                        <div class="col" v-for="topPages in response.max_total_pages.slice(3)" :key="topPages.user.id">
                            <TopUserFrame_2 :userID="topPages.user.id" :userName="topPages.user.name"
                                :topValue="formatNumber(topPages.max_total_pages)" :topValueType="'صفحة'"
                                :profileImg="topPages.user.user_profile.profile_picture"
                                :profile_id="topPages.user.user_profile.id" :title="topPages.user.name"
                                :gender="topPages.user.gender" :dimensions="'60x60'" avatarClass="rounded-circle " />
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="header-title">
                            <h4 class="card-title">
                                الأكثر أطروحات

                                <img class="img-fluid avatar-55" src="@/assets/images/gif/book.gif" alt="book-animated" />
                            </h4>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-12" v-for="(topTheses,index) in response.max_total_thesis.slice(0, 3) "
                            :key="topTheses.user.id">
                            <NewTopUserFrame :userID="topTheses.user.id" :userName="topTheses.user.name"
                                :topValue="formatNumber(topTheses.max_total_thesis)" :topValueType="'اطروحة'"
                                :profile_id="topTheses.user.user_profile.id" :title="topTheses.user.name"
                                :topNumber="index" :image='`most_write_${index + 1}.png`'/>
                        </div>
                        <div class="header-title">
                            <h3 class="ms-3 title">
                                50 أخرين
                                <span role="button" class="align-middle material-symbols-outlined"
                                    @click="show_top_theses = !show_top_theses">
                                    {{ show_top_theses ? "expand_less" : "expand_more" }}
                                </span>

                            </h3>
                        </div>
                    </div>
                    <div class="row" v-show="show_top_theses">

                        <div class="col" v-for="topTheses in response.max_total_thesis.slice(3)" :key="topTheses.user.id">
                            <TopUserFrame_2 :userID="topTheses.user.id" :userName="topTheses.user.name"
                                :topValue="formatNumber(topTheses.max_total_thesis)" :topValueType="'اطروحة'"
                                :profileImg="topTheses.user.user_profile.profile_picture"
                                :profile_id="topTheses.user.user_profile.id" :title="topTheses.user.name"
                                :gender="topTheses.user.gender" :dimensions="'60x60'" avatarClass="rounded-circle " />
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
import NewTopUserFrame from "@/components/statistics/NewTopUserFrame";
import TopUserFrame_2 from "@/components/statistics/TopUserFrame_2.vue";
export default {
    name: "By Week",
    components: {
        NewTopUserFrame,
        TopUserFrame_2
    },
    async created() {
        this.response = await MarkService.topUsersByWeek();
    },

    data() {
        return {
            response: null,
            show_top_theses: false,
            show_top_pages: false,
        };
    },
    methods: {
        ...helper,
    },

};
</script>

<style scoped>
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 700,
        'GRAD' 0,
        'opsz' 24
}

.title {
    direction: rtl;
}
</style>