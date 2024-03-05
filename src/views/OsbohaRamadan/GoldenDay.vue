<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">اليوم الذهبي</h1>
                </div>
                <h2 class="text-center mt-1 mb-3" v-if="current_day">الحالي : {{current_day.day}} ~ رمضان </h2>
                <div class="col-12 pt-2 text-center">
                    <div class="row">
                        <div class="col-6 col-md-6 col-lg-6" v-for="day in 10" :key="day">
                            <router-link :to="{ name: 'ramadan.fill-golden-day', params: { day: day } }" :class="` ${!inDays(day) ? 'disabled-link' : ''}`">
                                <img :src="imagePath(day)" alt="golden_day" class="img-fluid" />
                                <h4 class="text-center">{{ day }}</h4>

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
import ramadanDaysService from "@/API/RamadanServices/ramadanDays.service";

export default {
    name: "Golden Day",
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
            current_day:null,
            days: []
        };
    },
    methods: {
        inDays(value) {
            return Object.values(this.days).some(item => item.day === value)
        },
        imagePath(day) {
            const imageName = this.inDays(day) ? 'golden_day_on.png' : 'golden_day_off.png';
            return require(`@/assets/images/ramadan/${imageName}`);
        }


    },
};
</script>

<style>
@import './css/ramadan.css';
</style>