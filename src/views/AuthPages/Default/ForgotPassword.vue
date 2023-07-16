<template>
  <div class="col-sm-12 mt-3 text-center">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
        <h4 class="text-center mt-3 mb-3">
          اعادة تعيين كلمة المرور
        </h4>
      </div>
      <div class="iq-card-body p-0">
        <div class="image-block text-center">
          <img src="@/assets/images/main/forgot-password.png" class="img-fluid rounded w-25" alt="blog-img">
        </div>
        <form class="mt-4 mx-auto" @submit.prevent="forgetPassword">
          <div class="form-group">
            <label class="form-label" for="exampleInputEmail1">ادخل بريدك الالكتروني</label>
            <input type="email" class="form-control mb-0 w-75 mx-auto" id="exampleInputEmail1"
              placeholder="ادخل بريدك الالكتروني هنا" v-model="v$.form.email.$model">
            <p style="color:red" v-if="v$.form.email.$error">قم بادخال البريد الالكتروني</p>
          </div>
          <div class="d-inline-block w-100 text-center">
            <div class="col-sm-12 text-center" v-if="loader">
              <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;">
            </div>
            <h4 class="text-center mt-3 mb-3" v-if="message"> {{ message }}</h4>
            <button type="submit" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto" v-if="!sent">
              ارسال
            </button>
            <button type="submit" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto" v-else>
              اعادة ارسال
            </button>
          </div>
        </form>
      </div>
    </iq-card>

  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import Auth from '@/API/services/auth.service'

export default {
  name: "ForgetPassword",
  setup() {
    return { v$: useVuelidate() }
  },
  components: {},
  data() {
    return {
      loader: false,
      sent: false,
      message: '',
      form: {
        email: '',
      },
      error: '',
      submitStatus: null,
      options: {
        centeredSlides: false,
        loop: false,
        slidesPerView: 1,
        autoplay: {
          delay: 3000
        },
        spaceBetween: 15,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },

        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar'
        }
      }
    }
  },

  methods: {
    async forgetPassword() {
      this.v$.$touch()
      if (!this.v$.form.$invalid) {
        this.message = "";
        this.loader = true;
        const response = await Auth.forgetPassword(this.form.email)
        if (response.statusCode == 200) {
          this.sent = true;
          this.message = "تم ارسال بريد"
        }
        else {
          this.message = " حدث خطأ"
        }
        this.loader = false;
      }
    }
  },
  validations() {
    return {
      form: {
        email: {
          required,
          email
        },
      },
    }
  },
}
</script>
<style scoped>
::placeholder {
  text-align: center;
}
</style>