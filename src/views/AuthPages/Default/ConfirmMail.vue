<template>
  <div class="container-fluid p-0">
    <div class="row no-gutters">
      <div class="col-sm-12 text-center">
        <div class="iq-error position-relative mt-5">
          <img src="@/assets/images/main/confirm_mail.png" class="img-fluid iq-error-img" alt="confirm email">
          <div>

            <h2 class="mb-2 text-center">تفقد بريدك الالكتروني</h2>
            <p class="text-center">قم بتاكيد بريدك الالكتروني لتستطيع استخذام الموقع</p>

            <div class="alert alert-warning w-75 m-auto" role="alert">
              الايميل المسجل به: {{ user.email }}
            </div>

            <div class="d-inline-block w-100 text-center">
              <h4 class="text-center" style="color:red;" v-if="message">تم الارسال</h4>
              <button type="submit" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto" @click="sendMail">
                اعادة ارسال البريد الالكتروني
              </button>
            </div>
            <h4 class="p-2 text-center text-danger">
              اذا كنت تواجه مشكلة في تأكيد بريدك الالكتروني الحالي يمكن إعادة تعيينه من
              <router-link :to="{ name: 'auth.reset-email' }">
                هنا
              </router-link>
            </h4>

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
import UserInfoService from "@/Services/userInfoService";

export default {
  name: "ConfirmMail",
  data() {
    return {
      message: false,
    };
  }, methods: {
    async sendMail() {
      this.message = true;
      await Auth.sendEmail();
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'osboha' })
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  }
};
</script>