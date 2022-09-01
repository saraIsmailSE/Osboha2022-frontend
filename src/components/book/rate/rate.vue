<template>
    <div class="d-flex align-items-center justify-content-between mb-2">
        <a href="#" class="comments"><i class="ri-chat-3-fill pe-2"></i></a>
        <span class="font-size-12 text-warning">
            <i class="material-symbols-outlined md-18" v-for="star in rate" :key="star.id">star</i>
        </span>
    </div>
</template>
<script>
export default {
    name: 'Rate',
    props: {
        rate: Number
    },
    data() {
        return {}

    },
}
</script>
