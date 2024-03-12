<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">ورد القرآن الكريم</h1>
                </div>
                <h2 class="text-center mt-1 mb-3" v-if="current_day">الحالي : {{current_day.day}} ~ رمضان </h2>
                <div class="col-12 pt-2 text-center">
                    <div class="row">
                        <div class="col-6 col-md-6 col-lg-6" v-for="day in 10" :key="day">
                            <router-link :to="{ name: 'ramadan.fill-quran', params: { day: day } }" :class="` ${!inDays(day) ? 'disabled-link' : ''}`">
                                <img :src="imagePath(day)" alt="golden_day" class="img-fluid" />
                                <h4 class="text-center">{{ day }}</h4>

                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="d-inline-block w-100 text-center col-12">
                    <router-link :to="{ name: 'ramadan.index' }" class="d-block mt-3 mb-3 w-75 mx-auto">
                        <span class="back-btn display-6">عودة</span>
                        <span class="align-middle material-symbols-outlined diplay-6">
                            keyboard_return
                        </span>
                    </router-link>
                </div>

            </iq-card>
        </div>

    </div>
</template>

<script>
import ramadanHeader from "@/components/ramadan/ramadan-header";
import ramadanDaysService from "@/API/RamadanServices/ramadanDays.service";

export default {
    name: "Quran Wird",
    components: {
        ramadanHeader,
    },
    async created() {
        this.days = await ramadanDaysService.all();
        this.current_day = await ramadanDaysService.current();
    },
    data() {
        return {
            loader: false,
            current_day: null,
            days: []
        };
    },
    methods: {
        inDays(value) {
            return Object.values(this.days).some(item => item.day === value)
        },
        imagePath(day) {
            const imageName = this.inDays(day) ? 'quran_on.png' : 'quran_off.png';
            return require(`@/assets/images/ramadan/${imageName}`);
        }


    },
};
</script>

<style>
@import './css/ramadan.css';
</style>