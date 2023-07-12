<template>
    <div id="loading">
        <loader />
    </div>
    <div class="iq-top-navbar">
        <nav class="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0">
            <div class="container-fluid p-auto">
                <router-link :to="{ name: 'osboha.list' }" class="navbar-brand p-0">
                    <img src="@/assets/images/main/osboha-logo.png" alt="logo" class="" />
                </router-link>
                <div class="social-media">
                    <p class="mb-0 d-flex">
                        <i class="d-flex align-items-center justify-content-center ms-2 me-2 position-relative">
                            <i class="material-symbols-outlined">chat_bubble</i>
                            <span v-if="true"
                                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                                2
                            </span>

                        </i>
                    </p>
                </div>
            </div>
        </nav>
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
  