<template>
    <div class="container-fluid p-0">
        <div class="row no-gutters">
            <div class="col-sm-12 text-center">
                <div class="iq-error position-relative mt-5">
                    <img src="@/assets/images/main/excluded-ambassador.png" class="img-fluid iq-error-img" alt="403" />
                    <div>
                        <h2 class="mb-2 text-center">تم استبعادك</h2>
                        <h5 class="text-center m-auto w-75">
                            بسبب عدم التزامك بالقراءة طيلة الأسابيع الماضية
                        </h5>
                        <div class="col-sm-12 text-center" v-if="loader">
                            <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px;">
                        </div>
                        <h4 class="text-center mt-3 mb-3" v-if="message"> {{ message }}</h4>
                        <div class="d-inline-block w-100 text-center">
                            <button @click="returnToTeam()" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                                عودة إلى الفريق
                            </button>
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

export default {
    name: "NotAmbassadorInAnyGroup",
    data() {
        return {};
    },
    methods: {
        logout() {
            this.$store.dispatch("logout");
        },
        async returnToTeam() {
            this.message = "";
            this.loader = true;
            const response = await Auth.returnToTeam()
            if (response.statusCode == 200) {
                this.$router.push({ name: 'osboha.list' })
            }
            else {
                this.message = " حدث خطأ"
            }
            this.loader = false;
        }
    },
};
</script>
