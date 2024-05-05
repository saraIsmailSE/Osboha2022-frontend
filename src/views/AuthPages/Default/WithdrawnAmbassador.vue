<template>
    <div class="container-fluid p-0 mb-3">
        <div class="row no-gutters">
            <div class="col-sm-12 text-center">
                <div class="iq-error position-relative mt-5">
                    <img src="@/assets/images/main/no-team.png" class="img-fluid iq-error-img" alt="403" />
                    <div>
                        <h2 class="mb-2 text-center">أهلاً مجدداً</h2>
                        <h5 class="text-center m-auto w-75">
                            {{ paragraph }}
                        </h5>
                        <div class="col-sm-12 text-center" v-if="loader">
                            <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px;">
                        </div>
                        <div class="alert alert-danger m-2 p-2" role="alert" v-if="message">
                            <h4 class="text-center mt-3 mb-3"> {{ message }}</h4>
                        </div>
                        <allocate-ambassador v-if="reallocate" />

                        <div class="d-flex w-100 text-center p-2" v-else>
                            <button @click="returnToTeam()" class="btn d-block btn-primary mt-3 mb-3 w-75 ms-1 me-1"
                                :disabled="loader">
                                عودة إلى الفريق
                            </button>
                            <a href="https://www.messenger.com/t/117840717971244/" target="_blank"
                                class="btn d-block btn-success mt-3 mb-3 w-75 ms-1 me-1">
                                <span class="material-symbols-outlined align-middle">
                                    support_agent
                                </span>
                                راسلنا لمساعدتك
                            </a>
                        </div>

                        <a href="javascript:void(0);" class="d-flex align-items-center m-3" @click="logout">
                            <i class="material-symbols-outlined">logout</i>
                            <span class="mobile-text d-lg-none ms-3">تسجيل خروج</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Auth from '@/API/services/auth.service'
import AmbassadorsRequest from '@/API/services/ambassadors-request.service';
import AllocateAmbassador from '@/components/group/AllocateAmbassador.vue';

export default {
    name: "Withdrawn Ambassador",
    components: { AllocateAmbassador },
    async created() {
        this.latest_ambassador_recored = await AmbassadorsRequest.checkAmbassador(this.user.id);
        this.reallocate = this.checkReallocate()
    },
    data() {
        return {
            paragraph: `مرحبًا بك مجددًا! نحن سعداء بعودتك بعد فترة الانسحاب. يمكنك الآن العودة إلى فريقك
                            السابق، أو في حال رغبت في التغيير، نحن هنا لمساعدتك في الانضمام إلى فريق جديد. لا تتردد في
                            التواصل معنا لأي استفسارات أو دعم تحتاجه`,
            message: "",
            loader: false,
            latest_ambassador_recored: null,
            reallocate: false,
        };
    },
    methods: {
        logout() {
            this.$store.dispatch("logout");
        },
        async returnToTeam() {
            this.message = "";
            this.loader = true;
            const response = await Auth.returnToTeam()

            if (response) {
                this.message = response
                if (response == 'تم التعديل بنجاح') {
                    this.$router.push({ name: 'osboha.list' })
                }
            }
            else {
                this.message = " حدث خطأ"
            }

            this.loader = false;

        },
        checkReallocate() {
            if (this.latest_ambassador_recored) {

                const updatedAt = new Date(this.latest_ambassador_recored.updated_at);
                const threeMonthsAgo = new Date();
                threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                if (updatedAt < threeMonthsAgo) {
                    //The record was updated more than three months ago.
                    this.paragraph = `no team or leader`;
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        }

    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
    }

};
</script>