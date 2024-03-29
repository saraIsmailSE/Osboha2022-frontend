<template>
    <div class="col-sm-12" style="overflow-x: hidden;">

        <div class="divider-shape-bottom">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 274.29">
                <defs>
                    <linearGradient id="linear-gradient" x1="1920" y1="138.85" x2="0" y2="138.85"
                        gradientTransform="matrix(1, 0, 0, -1, 0, 276)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#4048aa" />
                        <stop offset="1" stop-color="#4048aa" />
                    </linearGradient>
                </defs>
                <path class="cls-1"
                    d="M0,203.56V0H1920V95.13c-142.35-48.64-402.45-44.69-537,23.12-155.94,78.61-209,143.72-387,92-134.38-39-217.54,63.19-340.77,3.74q-15.42-7.45-30.13-13.62c-113-47.51-198.84-41.07-330.69-3.66h0q-12.66,3.57-26,7.57C134,244.5,53,235,0,203.56Z" />
                <path class="cls-2"
                    d="M1920,0V274.29c-141-72.6-246.61-8.72-368.19-3-54.53,2.57-112.26-6.57-177.86-45-230.1-134.7-279.49-3.66-444.67-12C726.15,204.15,623.94,94.53,520.66,98.58c-50.45,2-110.88,22.73-190.38,74.54h0C160.41,283.84,57.94,253.63,0,247.76V0Z" />
            </svg>
        </div>
        <div class="iq-card" v-if="!showSteps">
            <div class="iq-card-body p-4">
                <div class="image-block text-center">
                    <img src="@/assets/images/main/signup.png" class="img-fluid" alt="blog-img" />
                </div>
            </div>
            <div class="d-inline-block text-center">

                <p class="text-center display-6 p-2">
                    لأن التعليم المدرسي/ الجامعي ليس كافيًا لصناعة إنسان مختلف، نُقدم لك أفضل تعليم مجانًا عبر القراءة
                    المنهجية التي تنمى فكر الإنسان وتطور مهاراته.
                </p>

                <button class="btn bg-primary-alt text-white m-2 w-75" @click="showSteps = true;">
                    ابدأ الأن
                </button>
            </div>
            <div class="sign-info mb-3 ps-2">
                <span class="dark-color d-inline-block line-height-2">
                    تملك حساب؟
                    <router-link :to="{ name: 'auth.sign-in' }">
                        تسجيل الدخول
                    </router-link>
                </span>
            </div>
        </div>
        <div class="col-sm-12" v-else>
            <steps />
        </div>

        <section class="landing-action text--center bg-primary-alt position-relative" id="action">
            <div class="divider-shape-top divider-rotate">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 274.29">
                    <defs>
                        <linearGradient id="linear-gradient" x1="1920" y1="138.85" x2="0" y2="138.85"
                            gradientTransform="matrix(1, 0, 0, -1, 0, 276)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#4048aa" />
                            <stop offset="1" stop-color="#4048aa" />
                        </linearGradient>
                    </defs>
                    <path class="cls-1"
                        d="M0,203.56V0H1920V95.13c-142.35-48.64-402.45-44.69-537,23.12-155.94,78.61-209,143.72-387,92-134.38-39-217.54,63.19-340.77,3.74q-15.42-7.45-30.13-13.62c-113-47.51-198.84-41.07-330.69-3.66h0q-12.66,3.57-26,7.57C134,244.5,53,235,0,203.56Z" />
                    <path class="cls-2"
                        d="M1920,0V274.29c-141-72.6-246.61-8.72-368.19-3-54.53,2.57-112.26-6.57-177.86-45-230.1-134.7-279.49-3.66-444.67-12C726.15,204.15,623.94,94.53,520.66,98.58c-50.45,2-110.88,22.73-190.38,74.54h0C160.41,283.84,57.94,253.63,0,247.76V0Z" />
                </svg>
            </div>
        </section>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, requiredIf } from "@vuelidate/validators";
import steps from "../Default/SignupSteps/Steps";

export default {
    name: "SignUp",
    components: {
        steps,
    },
    setup() {
        return { v$: useVuelidate() };
    },

    data() {
        return {
            loader: false,
            showSteps: false,
            form: {
                name: "",
                password: "",
                email: "",
                gender: "",
            },
            regError: "",
        };
    },
    methods: {
        async onSubmit() {
            this.v$.$touch();
            if (!this.v$.form.$invalid) {
                try {
                    this.loader = true;
                    this.regError = "";
                    await this.$store.dispatch("register", {
                        email: this.form.email,
                        password: this.form.password,
                        name: this.form.name,
                        gender: this.form.gender,
                    });

                    this.loader = false;
                    this.$router.push({ name: "osboha.list" });
                } catch (error) {
                    this.loader = false;
                    if (
                        error.response.data.data.email &&
                        error.response.data.data.email ==
                        "The email has already been taken."
                    ) {
                        this.regError = " البريد الالكتروني موجود مسبقاً، قم بتسجيل الدخول";
                    } else {
                        console.log(error);
                    }
                }
            }
        },
    },
    validations() {
        return {
            form: {
                email: {
                    required,
                    email,
                },
                password: {
                    required,
                    min: minLength(8),
                },
                name: {
                    required,
                },
                gender: {
                    required,
                },
            },
        };
    },
};
</script>

<style scoped>
.divider-rotate {
    height: 100px;
    margin-top: -100px;
    transform: rotate(180deg);
}

.landing-action {
    margin-top: 0;
}

.landing-action {
    padding: 120px 0;
    margin-top: 25%;
    overflow: visible;
}

.bg-primary-alt {
    background-color: #4048aa !important;
}

.divider-shape-top {
    width: 101%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
}

.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

.cls-1 {
    fill: #cfefd7;
}

.cls-1,
.cls-2 {
    fill-rule: evenodd;
}

.cls-2 {
    fill: url(#linear-gradient);
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