<template>
    <div class="col-sm-12 mt-3 text-center" v-if="exception">
        <iq-card class="iq-card">
            <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
                <h3 class="text-center mt-3 mb-3">
                    طلب: {{ exception.type }}
                </h3>
            </div>
            <div class="iq-card-body ">
                <div class="image-block text-center">
                    <div class="profile-img">
                        <img src="@/assets/images/avatar/avatar-03.jpg" alt="profile-img" class="avatar-130 img-fluid"
                            style="border: 4px solid #1D1A55;" />
                        <h4 class="text-center mt-3 mb-3">
                            {{ exception.user.name }}
                        </h4>

                    </div>
                </div>

                <div class="iq-card-body ps-3 mt-1">
                    <h5>السبب</h5>
                    <p class="m-auto">{{ exception.reason }}</p>
                    <small class="d-flex" style="color:red;">
                        Last one
                    </small>
                </div>

                <h3 class="text-center mt-3 mb-3">
                    الاجراء المناسب
                </h3>
                <div class="d-flex align-items-center mt-3">
                    <form @submit.prevent="submitSociaMedia" class="post-text m-auto w-100 row">
                        <div class="form-group col-12">
                            <select class="form-select">
                                        <option class="bg-white text-dark" value="" selected>اختر الاجراء المناسب</option>
                                        <option class="bg-white text-dark">اعفاء لمدة أسبوع</option>
                                        <option class="bg-white text-dark">اعفاء لمدة أسبوعين</option>
                                    </select>
                        </div>
                        <div class="form-group">
                            <button type="submit" :disabled="socialMediaMessage"
                                class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                                اعتماد
                            </button>
                        </div>

                        <div class="col-sm-12 text-center" v-if="loader">
                            <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;">
                        </div>
                        <h4 class="text-center mt-3 mb-3" v-if="message"> {{ socialMediaMessage }}</h4>
                    </form>
                </div>
                <!-- <div class="d-flex align-items-center mt-3 row">
                    <div class="d-inline-block w-100 text-center col-12">
                        <a role="button" @click="back()" class=" d-block mt-3 mb-3 w-75 mx-auto">
                            <span>عودة</span>
                            <span class="align-middle material-symbols-outlined">
                                keyboard_return
                            </span>
                        </a>

                    </div>
                </div> -->


            </div>
        </iq-card>

    </div>
</template>
<script>
export default {
    name: 'List One Exception',
    props: {
        exception: { type: Object }
    },
    data() {
        return {
        }
    },
    methods:{
        back() {
            this.$router.push({ name: 'group.group-detail', params: { exception_id: this.exception_id } })
        }
    },

}
</script>
