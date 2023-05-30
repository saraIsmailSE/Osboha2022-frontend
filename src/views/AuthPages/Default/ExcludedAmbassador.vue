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
export default {
    name: "NotAmbassadorInAnyGroup",
    data() {
        return {};
    },
    methods: {
        logout() {
            this.$store.dispatch("logout");
        },
    },
};
</script>
  