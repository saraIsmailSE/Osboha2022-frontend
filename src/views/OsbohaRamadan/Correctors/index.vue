<template>
    <div>
        <ramadanHeader />
        <div class="col-12">
            <div class="row">


                <div class="col-6 col-md-6 col-lg-6">
                    <router-link :to="{ name: 'ramadan.correctors-hadith-list', }">
                        <img src="@/assets/images/ramadan/ramadan-2024-01.png" alt="ramadan-footer" class="img-fluid" />
                    </router-link>
                </div>

                <div class="col-6 col-md-6 col-lg-6 mt-5 mb-3">
                    <router-link :to="{ name: 'ramadan.correctors-questions-list', }">
                        <img src="@/assets/images/ramadan/ramadan-2024-05.png" alt="ramadan-footer" class="img-fluid" />
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
    },
};

</script>