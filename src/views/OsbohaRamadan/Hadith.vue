<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">الحديث الشريف</h1>
                </div>
                <h2 class="text-center mt-1 mb-3" v-if="current_day">الحالي : {{ current_day.day }} ~ رمضان </h2>
                <div class="col-12 pt-2 text-center">
                    <div class="row">
                        <div class="col-6 col-md-6 col-lg-6" v-for="hadith in hadits" :key="hadith.id">
                            <router-link :to="{ name: 'ramadan.fill-hadith', params: { hadith_id: hadith.id } }">
                                <img :src="imagePath(hadith.ramadan_day.is_active)" alt="hadith" class="img-fluid" />
                                <h4 class="text-center">
                                    الحديث {{ hadith.hadith_title }}
                                    <p class="text-center" v-if="hadith.memorization.length > 0">
                                        <span class="material-symbols-outlined align-middle  text-primary display-5 "
                                            v-if="hadith.memorization[0].status == 'accepted'">
                                            verified
                                        </span>
                                        <span class="material-symbols-outlined align-middle text-info display-5 "
                                            v-else-if="hadith.memorization[0].status == 'pending'">
                                            pending
                                        </span>
                                        <span class="material-symbols-outlined align-middle text-warning display-5"
                                            v-else>
                                            report
                                        </span>
                                    </p>

                                </h4>
                            </router-link>

                        </div>
                    </div>
                </div>
            </iq-card>
        </div>

    </div>
</template>

<script>
import ramadanHeader from "@/components/ramadan/ramadan-header";
import HadithServices from "@/API/RamadanServices/hadith.service";
import ramadanDaysService from "@/API/RamadanServices/ramadanDays.service";

export default {
    name: "Hadith",
    components: {
        ramadanHeader,
    },
    async created() {
        this.current_day = await ramadanDaysService.current();
        this.hadits = await HadithServices.get();
    },
    data() {
        return {
            loader: false,
            current_day: null,
            hadits: []
        };
    },
    methods: {
        imagePath(is_active) {
            const imageName = is_active ? 'hadith_on.png' : 'hadith_off.png';
            return require(`@/assets/images/ramadan/${imageName}`);
        },

    },
};
</script>

<style>
@import './css/ramadan.css';
</style>

<style scoped>
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}
</style>