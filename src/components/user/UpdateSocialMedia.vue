<template>
    <iq-card class="iq-card">
        <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
            <h3 class="text-center mt-3 mb-3">مواقع التواصل الاجتماعي</h3>
        </div>
        <div class="iq-card-body p-3">
            <div class="image-block text-center">
                <img src="@/assets/images/main/social-media.png" class="img-fluid rounded w-50" alt="profile-img" />
            </div>

            <div class="d-flex align-items-center mt-3">
                <form @submit.prevent="submitSociaMedia" class="post-text ml-3 w-100 row">
                    <div class="form-group col-12">

                        <div class="d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" x="0" y="0"
                                viewBox="0 0 112.196 112.196" style="enable-background:new 0 0 25 25"
                                xml:space="preserve" class="align-middle mt-2">
                                <g>
                                    <circle cx="56.098" cy="56.098" r="56.098" style="" fill="#3b5998"
                                        data-original="#3b5998" class="">
                                    </circle>
                                    <path
                                        d="M70.201 58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34c0-5.964 2.833-15.303 15.301-15.303l11.234.047v12.51h-8.151c-1.337 0-3.217.668-3.217 3.513v7.585h11.334l-1.325 12.876z"
                                        style="" fill="#ffffff" data-original="#ffffff" class=""></path>
                                </g>
                            </svg>
                            <input type="url" class="form-control mt-2 ms-2" name="facebook" id="facebook"
                                v-model="socialMediaForm.facebook" placeholder="https://www.facebook.com/username" />
                        </div>


                        <div class="d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" x="0" y="0"
                                viewBox="0 0 551.034 551.034" style="enable-background:new 0 0 25 25"
                                xml:space="preserve" class="align-middle mt-2">
                                <g>
                                    <linearGradient id="a" x1="275.517" x2="275.517" y1="4.57" y2="549.72"
                                        gradientTransform="matrix(1 0 0 -1 0 554)" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" style="stop-color:#E09B3D" stop-color="#e09b3d"></stop>
                                        <stop offset=".3" style="stop-color:#C74C4D" stop-color="#c74c4d"></stop>
                                        <stop offset=".6" style="stop-color:#C21975" stop-color="#c21975"></stop>
                                        <stop offset="1" style="stop-color:#7024C4" stop-color="#7024c4"></stop>
                                    </linearGradient>
                                    <path
                                        d="M386.878 0H164.156C73.64 0 0 73.64 0 164.156v222.722c0 90.516 73.64 164.156 164.156 164.156h222.722c90.516 0 164.156-73.64 164.156-164.156V164.156C551.033 73.64 477.393 0 386.878 0zM495.6 386.878c0 60.045-48.677 108.722-108.722 108.722H164.156c-60.045 0-108.722-48.677-108.722-108.722V164.156c0-60.046 48.677-108.722 108.722-108.722h222.722c60.045 0 108.722 48.676 108.722 108.722v222.722z"
                                        style="fill:url(#a);" fill=""></path>
                                    <linearGradient id="b" x1="275.517" x2="275.517" y1="4.57" y2="549.72"
                                        gradientTransform="matrix(1 0 0 -1 0 554)" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" style="stop-color:#E09B3D" stop-color="#e09b3d"></stop>
                                        <stop offset=".3" style="stop-color:#C74C4D" stop-color="#c74c4d"></stop>
                                        <stop offset=".6" style="stop-color:#C21975" stop-color="#c21975"></stop>
                                        <stop offset="1" style="stop-color:#7024C4" stop-color="#7024c4"></stop>
                                    </linearGradient>
                                    <path
                                        d="M275.517 133C196.933 133 133 196.933 133 275.516s63.933 142.517 142.517 142.517S418.034 354.1 418.034 275.516 354.101 133 275.517 133zm0 229.6c-48.095 0-87.083-38.988-87.083-87.083s38.989-87.083 87.083-87.083c48.095 0 87.083 38.988 87.083 87.083 0 48.094-38.989 87.083-87.083 87.083z"
                                        style="fill:url(#b);" fill=""></path>
                                    <linearGradient id="c" x1="418.31" x2="418.31" y1="4.57" y2="549.72"
                                        gradientTransform="matrix(1 0 0 -1 0 554)" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" style="stop-color:#E09B3D" stop-color="#e09b3d"></stop>
                                        <stop offset=".3" style="stop-color:#C74C4D" stop-color="#c74c4d"></stop>
                                        <stop offset=".6" style="stop-color:#C21975" stop-color="#c21975"></stop>
                                        <stop offset="1" style="stop-color:#7024C4" stop-color="#7024c4"></stop>
                                    </linearGradient>
                                    <circle cx="418.31" cy="134.07" r="34.15" style="fill:url(#c);" fill=""></circle>
                                </g>
                            </svg>
                            <input type="url" class="form-control mt-2 ms-2" name="instagram" id="instagram"
                                v-model="socialMediaForm.instagram" placeholder="https://www.instagram.com/username" />


                        </div>
                        <div class="d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" x="0" y="0"
                                viewBox="0 0 152 152" style="enable-background:new 0 0 25 25" xml:space="preserve"
                                class="align-middle mt-2">
                                <g>
                                    <g data-name="Layer 2">
                                        <g data-name="08.whatsapp">
                                            <circle cx="76" cy="76" r="76" fill="#2aa81a" opacity="1"
                                                data-original="#2aa81a" class=""></circle>
                                            <g fill="#fff">
                                                <path
                                                    d="M102.81 49.19a37.7 37.7 0 0 0-60.4 43.62l-4 19.42a1.42 1.42 0 0 0 .23 1.13 1.45 1.45 0 0 0 1.54.6l19-4.51a37.7 37.7 0 0 0 43.6-60.26zm-5.94 47.37a29.56 29.56 0 0 1-34 5.57l-2.66-1.32-11.67 2.76v-.15L51 91.65l-1.3-2.56a29.5 29.5 0 0 1 5.43-34.27 29.53 29.53 0 0 1 41.74 0L97 55a29.52 29.52 0 0 1-.15 41.58z"
                                                    fill="#ffffff" opacity="1" data-original="#ffffff" class=""></path>
                                                <path
                                                    d="M95.84 88c-1.43 2.25-3.7 5-6.53 5.69-5 1.2-12.61 0-22.14-8.81l-.12-.11c-8.29-7.74-10.49-14.19-10-19.3.29-2.91 2.71-5.53 4.75-7.25a2.72 2.72 0 0 1 4.25 1l3.07 6.94a2.7 2.7 0 0 1-.33 2.76l-1.56 2a2.65 2.65 0 0 0-.21 2.95 29 29 0 0 0 5.27 5.86 31.17 31.17 0 0 0 7.3 5.23 2.65 2.65 0 0 0 2.89-.61l1.79-1.82a2.71 2.71 0 0 1 2.73-.76l7.3 2.09A2.74 2.74 0 0 1 95.84 88z"
                                                    fill="#ffffff" opacity="1" data-original="#ffffff" class=""></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <input type="text" class="form-control mt-2 ms-2" name="whatsapp" id="whatsapp"
                                v-model="socialMediaForm.whatsapp" placeholder="+1234567890" />
                        </div>
                    </div>
                    <hr />
                    <div class="form-group">
                        <button type="tel" :disabled="loader" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                            تعديل
                        </button>
                    </div>

                    <div class="col-sm-12 text-center" v-if="loader">
                        <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
                    </div>
                    <h4 class="text-center mt-3 mb-3" v-if="socialMediaMessage">
                        {{ socialMediaMessage }}
                    </h4>
                </form>
            </div>
        </div>
    </iq-card>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, email } from "@vuelidate/validators";
import SocialMedia from "@/API/services/social-media.service";


export default {
    name: "update user social media",
    async created() {
        const social_media = await SocialMedia.getByUserId(
            this.$route.params.user_id
        );
        if (social_media) {
            this.socialMediaForm.facebook = social_media.facebook;
            this.socialMediaForm.instagram = social_media.instagram;
            this.socialMediaForm.whatsapp = social_media.whatsapp;
        }
    },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            loader: false,
            socialMediaForm: {
                facebook: "",
                instagram: "",
                whatsapp: "",
            },
            message: null,
            socialMediaMessage: "",
        };
    },
    validations() {
        return {
        };
    },
    methods: {

        /**
         * update profile socialmedia.
         */
        async submitSociaMedia() {
            this.socialMediaMessage = "";
            this.loader = true;
            try {
                const response = await SocialMedia.add(this.socialMediaForm);
                this.loader = false;
                this.socialMediaMessage = 'تم التعديل';
                setTimeout(() => {
                    this.socialMediaMessage = "";
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },

    },
};

</script>