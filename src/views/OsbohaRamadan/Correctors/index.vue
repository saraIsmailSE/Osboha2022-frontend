<template>
    <div>
        <ramadanHeader />
        <div class="col-12">
            <div class="row d-flex justify-content-center">
                <div class="col-6 col-md-6 col-lg-6" v-if="isHadithCorrector">
                    <router-link :to="{ name: 'ramadan.correctors-hadith-list', }">
                        <img src="@/assets/images/ramadan/ramadan-2024_correct_hadiths.png" alt="ramadan-footer"
                            class="img-fluid" />
                    </router-link>
                </div>

                <div class="col-6 col-md-6 col-lg-6" v-if="isQuestionCorrector">
                    <router-link :to="{ name: 'ramadan.correctors-questions-list', }">
                        <img src="@/assets/images/ramadan/ramadan-2024_correct_questions.png" alt="ramadan-footer"
                            class="img-fluid" />
                    </router-link>
                </div>

            </div>
        </div>
        <ramadanFooter />


    </div>
</template>

<script>
import UserInfoService from "@/Services/userInfoService";
import ramadanHeader from "@/components/ramadan/ramadan-header";
import ramadanFooter from "@/components/ramadan/ramadan-footer";

export default {
    name: 'Ramadan Index',
    components: {
        ramadanHeader,
        ramadanFooter,
    },
    async created() {
    },
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        isQuestionCorrector() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "ramadan_coordinator",
                "ramadan_fiqh_corrector",
                'ramadan_tafseer_corrector',
                "ramadan_vedio_corrector",
            ]);
        },
        isHadithCorrector() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                "ramadan_coordinator",
                "ramadan_hadith_corrector",
            ]);
        },
    },
};

</script>