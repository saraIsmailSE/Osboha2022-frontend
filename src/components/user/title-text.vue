<template>
    <div class="col-6 p-1">
        <h3 class="mb-2 text-center" style="direction: rtl">
            {{ title }}
        </h3>
        <p class="text-center">{{ text }} </p>
    </div>
</template>
<script>
export default {
    name: "Title - Text",
    created() {
    },

    props: {
        title: {
            type: [String],
            required: true,
        },
        text: {
            type: [String],
            required: true,
        },
    },
    data() {
        return {};
    },
};
</script>  