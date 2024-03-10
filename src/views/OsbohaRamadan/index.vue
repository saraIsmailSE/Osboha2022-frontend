<template>
    <div>
        <ramadanHeader />
        <div class="col-12">
            <div class="row d-flex justify-content-center">

                <div class="col-6 col-md-6 col-lg-6">
                    <router-link :to="{ name: 'ramadan.telegram-channels', }">
                        <img src="@/assets/images/ramadan/ramadan-2024_telegram.png" alt="ramadan-footer"
                            class="img-fluid" />
                    </router-link>
                </div>


                <div class="col-6 col-md-6 col-lg-6">
                    <router-link :to="{ name: 'book.ramadan', }">
                        <img src="@/assets/images/ramadan/ramadan-2024_books.png" alt="ramadan-footer" class="img-fluid" />
                    </router-link>
                </div>
                <div class="col-6 col-md-6 col-lg-6 mt-5">
                    <router-link :to="{ name: 'ramadan.hadith', }">
                        <img src="@/assets/images/ramadan/ramadan-2024-01.png" alt="ramadan-footer" class="img-fluid" />
                    </router-link>
                </div>


                <div class="col-6 col-md-6 col-lg-6 mt-5">
                    <router-link :to="{ name: 'ramadan.quran', }">
                        <img src="@/assets/images/ramadan/ramadan-2024-03.png" alt="ramadan-footer" class="img-fluid" />
                    </router-link>
                </div>

                <div class="col-6 col-md-6 col-lg-6 mt-5">
                    <router-link :to="{ name: 'ramadan.night-prayer', }">
                        <img src="@/assets/images/ramadan/ramadan-2024-02.png" alt="ramadan-footer" class="img-fluid" />
                    </router-link>
                </div>



                <div class="col-6 col-md-6 col-lg-6 mt-5">
                    <router-link :to="{ name: 'ramadan.questions', }">
                        <img src="@/assets/images/ramadan/ramadan-2024-04.png" alt="ramadan-footer" class="img-fluid" />
                    </router-link>
                </div>


                <div class="col-6 col-md-6 col-lg-6 mt-5 mb-3">
                    <router-link :to="{ name: 'ramadan.golden-day', }">
                        <img src="@/assets/images/ramadan/ramadan-2024-05.png" alt="ramadan-footer" class="img-fluid" />
                    </router-link>
                </div>


                <!-- <div class="col-6 col-md-6 col-lg-6 mt-5 mb-3">
                    <router-link :to="{ name: 'roles.upgradeEligibleRole', }">
                        <img src="@/assets/images/ramadan/ramadan-2024-06.png" alt="ramadan-footer" class="img-fluid" />
                    </router-link>
                </div> -->

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
    },
};

</script>