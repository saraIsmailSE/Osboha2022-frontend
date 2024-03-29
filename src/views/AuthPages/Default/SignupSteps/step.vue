<template>
    <div class="text-center">
        <h1 class="text-center mt-3 mb-3">{{ stepInfo.headerText }}</h1>
    </div>
    <div class="iq-card-body">
        <div class="image-block text-center">
            <img :src="imagePath()" class="img-fluid" alt="blog-img" />
        </div>
        <p class="text-center description">{{ stepInfo.description }}</p>

        <div class="row d-flex justify-content-center">
            <infoCard v-for="(info, index) in stepInfo.extra" :key="index" :text="info.text" :image="info.image" />
        </div>
        <question v-if="stepInfo.type == 'question' && stepInfo.options" :options="stepInfo.options" />
    </div>
</template>

<script>
import infoCard from "./InfoCard";
import question from "./Question";

export default {
    name: "step",
    components: {
        infoCard,
        question,
    },
    props: {
        stepInfo: {
            type: [Object],
            required: true,
        },
    },
    async created() {
        console.log("🚀 ~ created ~ created:", this.stepInfo.extra)
    },
    data() {
        return {
        };
    },
    methods: {
        imagePath() {
            return require(`@/assets/images/signup/${this.stepInfo.image}`);
        }

    }
};
</script>

<style scoped>
.description {
    font-size: 1.5rem;
}

/* Default styles for the image */
img {
    width: 100%;
    /* Make the image responsive */
    height: auto;
    /* Maintain aspect ratio */
}

/* Media query for smaller screens */
@media screen and (max-width: 600px) {
    img {
        width: 80%;
        /* Adjust width for smaller screens */
    }
}

/* Media query for larger screens */
@media screen and (min-width: 1200px) {
    img {
        width: 50%;
        /* Adjust width for larger screens */
    }
}
</style>