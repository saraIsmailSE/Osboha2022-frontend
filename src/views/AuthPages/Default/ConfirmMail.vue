<template>
  <div class="col-sm-12 mt-3" >
    <iq-card class="iq-card">
      <div class="iq-card-body p-0">
        <div class="image-block text-center mt-3">
          <img src="@/assets/images/main/confirm_mail.png" class="img-fluid rounded w-25" alt="blog-img">
        </div>

        <h2 class="text-center mt-3">تفقد بريدك الالكتروني </h2>
        <h4 class="text-center">
          قم بتاكيد بريدك الالكتروني لتستطيع استخذام الموقع </h4>
          
          <div class="d-inline-block w-100 text-center">
            <h4 class="text-center" style="color:red;" v-if="message">تم الارسال</h4>
            <button
              type="submit"
              class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto"
              @click="sendMail"
            >
                اعادة ارسال البريد الالكتروني
            </button>
          </div>
      </div>

          <a href="javascript:void(0);" class="d-flex align-items-center m-3" @click="logout">
      <i class="material-symbols-outlined">logout</i>
      <span class="mobile-text d-lg-none ms-3">تسجيل خروج</span>
    </a>

    </iq-card>

  </div>
</template>
<script>
import Auth from '@/API/services/auth.service'

export default {
name: "ConfirmMail",
data() {
  return {
    message:false,
  };
}, methods: {
  async sendMail() {
    this.message=true;
    await Auth.sendEmail();
  },
  logout(){
    this.$store.dispatch('logout');
    this.$router.push({ name: 'social' })
  }
}
};
</script>