<template ref="formContainer">

    <div class="iq-card p-2">
        <div class="image-block text-center mt-3">
            <img src="@/assets/images/main/osboha-logo.png" class="img-fluid " alt="blog-img" />
        </div>


        <div class="col-12 pt-2">
            <div class="row justify-content-center mt-0 mb-3 ">
                <transition id="msform" name="step" mode="out-in" class="payment-method">
                    <div :key="currentStep" class="ps-3 pe-3">
                        <div class="form-card text-center">
                            <step :stepInfo="STEPS[currentStep]"  />

                            <div class="d-flex justify-content-center">
                                <button class="btn bg-prev m-2 w-50" @click="goPrevious()" v-if="currentStep > 0">
                                    السابق
                                </button>
                                <button class="btn bg-next m-2 w-50" @click="goNext()"
                                    v-if="currentStep < STEPS.length">
                                    التالي
                                </button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

    </div>

</template>

<script>
import useVuelidate from "@vuelidate/core";
import helper from "@/utilities/helper";
import step from "./step.vue";
import { STEPS } from "@/utilities/signup"
export default {
    name: "Signup Steps",
    setup() {
        return { v$: useVuelidate() };
    },
    components: {
        step,
    },
    async created() {
        console.log("🚀 ~ created ~ created:", this.STEPS)

    },
    data() {
        return {
            loader: false,
            currentStep: 0,
            STEPS,
            message: "",
            messageVariant: "",
        };
    },
    watch: {
        message: function (val) {
            if (val) {
                setTimeout(
                    () => {
                        this.message = "";
                    },
                    this.messageVariant === "success" ? 2000 : 5000,
                );
            }
        },
    },
    methods: {
        goNext() {
            if (this.currentStep < this.STEPS.length - 1) {
                this.currentStep++;
                this.toTheTop();
            }
        },
        goPrevious() {
            if (this.currentStep > 0) {
                this.currentStep--;
            }
            this.toTheTop();
        },
        toTheTop() {
            this.$nextTick(() => {
                // Now wait for the transition to finish
                const formContainer = this.$refs.formContainer;
                if (formContainer) {
                    formContainer.addEventListener('transitionend', () => {
                        window.scrollTo(0, formContainer.offsetTop);
                    }, { once: true });
                }
            });
        },
    },
};
</script>
<style scoped>
.bg-next {
    color: white;
    background-color: #2D36A1;
    font-size: 1rem;
}

.bg-prev {
    background-color: #5058B2;
    color: white;
    font-size: 1rem;
}
</style>