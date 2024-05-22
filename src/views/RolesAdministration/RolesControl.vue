<template>

    <div class="col-sm-12 mt-3">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar text-center align-items-center mx-auto">
                <h1 class="text-center mt-3 mb-3">تحكم العضويات </h1>
                <h3 class="text-center mt-3 mb-3">{{ ROLESTYPES[type] }} </h3>
            </div>
            <div class="col-12 bg-white pt-2">
                <div class="row d-flex justify-content-center">
                    <router-link :to="{
                        name: 'roles.upgradeUser', params: {
                            type: type,
                        },
                    }" class="col-6 col-md-6 col-lg-6 text-center">
                        <div class=" mt-2 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100" x="0" y="0"
                                viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"
                                class="">
                                <g>
                                    <circle cx="227.1" cy="108.6" r="108.6" fill="#192e35" opacity="1"
                                        data-original="#115c8e" class=""></circle>
                                    <path fill="#192e35"
                                        d="M395.2 446.7H59c-14 0-25.4-11.3-25.4-25.4 0-1 .1-2.1.2-3.1 12.9-103.7 94.6-183.6 193.3-183.6s180.4 79.9 193.3 183.6c1.7 13.9-8.2 26.6-22.1 28.3-1 .2-2.1.2-3.1.2z"
                                        opacity="1" data-original="#115c8e" class=""></path>
                                    <path fill="#f1f9f5"
                                        d="M372.7 512C314.3 512 267 464.7 267 406.3s47.3-105.7 105.7-105.7S478.4 348 478.4 406.3c-.1 58.4-47.3 105.6-105.7 105.7z"
                                        opacity="1" data-original="#0e4d70" class=""></path>
                                    <circle cx="372.7" cy="406.3" r="95" fill="#208040" opacity="1"
                                        data-original="#7bcaff" class=""></circle>
                                    <path fill="#f1f9f5"
                                        d="M372.3 342.4c-2 0-3.9.9-5.2 2.4l-50 58.8c-2.5 2.9-2.1 7.2.8 9.7 1.2 1 2.8 1.6 4.4 1.6h28.5v44.4c0 3.8 3.1 6.9 6.8 6.9h.2l27-.7c3.7-.1 6.7-3.1 6.7-6.9V415H422c3.8 0 6.9-3.1 6.9-6.8 0-1.6-.6-3.2-1.6-4.4L377.6 345c-1.3-1.7-3.2-2.6-5.3-2.6zm0 12.3 42.2 50H388c-3.8 0-6.9 3.1-6.9 6.9v43.7l-20 .5v-44.3c0-3.8-3.1-6.9-6.9-6.9h-24.4z"
                                        opacity="1" data-original="#0c4266" class=""></path>
                                </g>
                            </svg>
                            <h5 class="text-center mt-1" style="direction: rtl;"> اضافة رتبة</h5>
                        </div>
                    </router-link>
                    <router-link :to="{
                        name: 'roles.downgradeUser', params: {
                            type: type,
                        },
                    }" class="col-6 col-md-6 col-lg-6 text-center">
                        <div class=" mt-2 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100" x="0" y="0"
                                viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"
                                class="">
                                <g>
                                    <circle cx="227.1" cy="108.6" r="108.6" fill="#192e35" opacity="1"
                                        data-original="#115c8e" class=""></circle>
                                    <path fill="#192e35"
                                        d="M395.2 446.7H59c-14 0-25.4-11.3-25.4-25.4 0-1 .1-2.1.2-3.1 12.9-103.7 94.6-183.6 193.3-183.6s180.4 79.9 193.3 183.6c1.7 13.9-8.2 26.6-22.1 28.3-1 .2-2.1.2-3.1.2z"
                                        opacity="1" data-original="#115c8e" class=""></path>
                                    <path fill="#f1f9f5"
                                        d="M372.7 512C314.3 512 267 464.7 267 406.3s47.3-105.7 105.7-105.7S478.4 348 478.4 406.3c-.1 58.4-47.3 105.6-105.7 105.7z"
                                        opacity="1" data-original="#0e4d70" class=""></path>
                                    <circle cx="372.7" cy="406.3" r="95" fill="#831018" opacity="1"
                                        data-original="#7bcaff" class=""></circle>
                                    <path fill="#f1f9f5"
                                        d="M372 466.2c2 0 3.9-.9 5.2-2.4l50-58.8c1.1-1.2 1.6-2.8 1.6-4.5 0-1-.2-2-.6-2.9-1.1-2.4-3.6-4-6.2-4h-28.4v-44.4c0-3.8-3.1-6.9-6.9-6.9h-.1l-27 .7c-3.7.1-6.7 3.1-6.7 6.9v43.6h-30.6c-3.8 0-6.9 3.1-6.9 6.9 0 1.6.6 3.2 1.6 4.4l49.7 58.8c1.3 1.7 3.2 2.6 5.3 2.6zm0-12.3-42.2-50h26.5c3.8 0 6.9-3.1 6.9-6.9v-43.7l20-.5V397c0 3.8 3.1 6.9 6.9 6.9h24.4z"
                                        opacity="1" data-original="#0c4266" class=""></path>
                                </g>
                            </svg>
                            <h5 class="text-center mt-1" style="direction: rtl;"> سحب رتبة</h5>
                        </div>
                    </router-link>
                </div>
            </div>
        </iq-card>
    </div>



</template>

<script>
import { ROLESTYPES } from "@/utilities/constants";

export default {
    name: 'Roles Control',
    data() {
        return {
            type: this.$route.params.type,
            ROLESTYPES,
        };
    },
    methods: {
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
    },
};

</script>