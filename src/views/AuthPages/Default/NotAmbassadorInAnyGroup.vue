<template>
    <div class="container-fluid p-0">
        <div class="row no-gutters">
            <div class="col-sm-12 text-center">
                <div class="iq-error position-relative mt-5">
                    <img src="@/assets/images/main/no-team.png" class="img-fluid iq-error-img" alt="403">
                    <div>

                        <h2 class="mb-2 text-center">عذرًا ليس لديك مجموعة</h2>
                        <!-- <p class="text-center">لم يتم العثور على الصفحة التي طلبتها، قد يكون الرابط خاطئ أو تم حذف الصفحة</p> -->

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
    name: 'NotAmbassadorInAnyGroup',
    data() {
        return {
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push({ name: 'social' })
        }
    }
}
</script>
  