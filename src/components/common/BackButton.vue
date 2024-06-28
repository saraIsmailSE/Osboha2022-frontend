<template>
    <div class="">
        <router-link :to="routeObject" class="d-block mt-3 mb-3 mx-auto">
            <span class="back-btn">{{ text }}</span>
            <span class="align-middle material-symbols-outlined diplay-6">
                keyboard_return
            </span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'BackButton',
    props: {
        routeName: {
            type: String,
            required: true,
        },
        routeParams: {
            type: Object,
            default: () => ({}),
        },
        text: {
            type: String,
            default: "عودة",
        },
    },
    computed: {
        routeObject() {
            return {
                name: this.routeName,
                params: this.routeParams,
            };
        },
    },
};
</script>

<style scoped>
.back-btn {
    font-size: 1.2rem;
}
</style>