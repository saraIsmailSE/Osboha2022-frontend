<template>
    <div class="form-group">
        <select class="form-select" name="question" id="question">
            <option :value="option.value" v-for="(option, index) in options" :key="index" :selected="index === 0">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script>

export default {
    name: "step",
    props: {
        options: {
            type: [String],
            required: true,
        },
    },
    async created() {
    },
    data() {
        return {
        };
    },
};
</script>

<style scoped>
.description {
    font-size: 1.5rem;
}
</style>