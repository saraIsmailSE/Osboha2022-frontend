<template>
    <div>
        <ramadanHeader />

        <div class="col-sm-12 mt-3">
            <iq-card class="iq-card ramadan-card">
                <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto ramadan-card">
                    <h1 class="text-center mt-3 mb-3">اسئلة رمضان</h1>
                </div>
                <h2 class="text-center mt-1 mb-3">الحالي : 1 ~ رمضان </h2>
                <div class="col-12 pt-2 text-center">
                    <div class="row">
                        <div class="col-6 col-md-6 col-lg-6" v-for="day in 10" :key="day">
                            <router-link :to="{ name: 'ramadan.fill-questions', params: { day: day } }">
                                <img :src="imagePath(day)" alt="question" class="img-fluid" />
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

export default {
    name: "Questions",
    components: {
        ramadanHeader,
    },
    async created() {
    },
    data() {
        return {
            loader: false,
            days: [
                1, 2, 3,
            ]
        };
    },
    methods: {
        inDays(value) {
            return this.days.includes(value)
        },
        imagePath(day) {
            const imageName = this.inDays(day) ? 'question_on.png' : 'question_off.png';
            return require(`@/assets/images/ramadan/${imageName}`);
        }


    },
};
</script>

<style scoped>
@font-face {
    font-family: HacenSamra;
    src: url('@/assets/fonts/HacenSamra.ttf');
}

h1,
h2,
h4,
h5,
p {
    font-family: HacenSamra, Arial, sans-serif;
    color: #471809;
}

.ramadan-card {
    background: #f8f9fa;
}

.statistics-card {
    background: #FDEEEC;
    border-top: none;
    border-right: solid #471809;
    border-bottom: solid #471809;
    border-left: solid #471809;
}

.ramadan-btn {
    background: #b17658;
    color: #f8f9fa;

}

.material-symbols-outlined {
    color: #471809;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}
</style>