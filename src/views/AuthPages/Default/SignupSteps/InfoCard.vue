<template>

        <div class="col-6 col-md-6 col-lg-6 text-center mt-2 mb-3">
            <div class="image-block text-center">
                <img :src="imagePath()" class="img-fluid rounded" alt="blog-img" />
            </div>
            <p class="text-center description">{{ text }}</p>
        </div>
</template>

<script>

export default {
    name: "step",
    props: {
        text: {
            type: [String],
            required: true,
        },
        image: {
            type: [String],
            required: true,
        },
    },
    async created() {
        console.log("🚀 ~ created ~ created:", this.image)

    },
    data() {
        return {
        };
    },
    methods: {
        imagePath() {
            return require(`@/assets/images/signup/${this.image}`);
        }

    }
};
</script>

<style scoped>
.description {
    font-size: 1.5rem;
}
</style>