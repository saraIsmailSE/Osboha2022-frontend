<template>
    <div id="loading">
        <loader />
    </div>
    <div class="main-content">
        <div class="position-relative">
            <template v-for="(option, index) in breadcrumboptions" :key="index">
                <breadcrumb :img="option.img" :title="option.title" v-show="this.$route.meta.name === option.title" />
            </template>
        </div>
        <div id="content-page">
            <router-view v-slot="{ Component }">
                <transition name="fade">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>
<script>
import logo from "../assets/images/logo.png";
export default {
    name: "Chat Header",
    data() {
        return {
            logoimage: logo,
        };
    },
    methods: {
    },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
  