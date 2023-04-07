<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto">
        <h1 class="text-center mt-3 mb-3">
          تسجيل الدخول
        </h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img src="@/assets/images/main/login.png" class="img-fluid rounded w-25" alt="blog-img">
        </div>
        <form class="mt-4 w-75 mx-auto" @submit.prevent="submit">
          <div class="form-group">
            <label class="form-label text-right" for="exampleInputEmail1">الايميل</label>
            <input type="email" class="form-control mb-0 w-100 mx-auto" id="exampleInputEmail1"
              placeholder="أدخل الايميل هنا" v-model="v$.form.email.$model">
            <p style="color:red" v-if="v$.form.email.$error">الرجاء قم بادخال البريد الالكتروني</p>
          </div>
          <div class="form-group">
            <label class="form-label" for="exampleInputPassword1">الرمز السري</label>
            <input type="password" class="form-control mb-0 w-100 mx-auto" id="exampleInputPassword1"
              placeholder="أدخل الرمز السري هنا" v-model="v$.form.password.$model">
            <p style="color:red" v-if="v$.form.password.$error">الرجاء قم بادخال كلمة السر</p>
          </div>
          <!-- <router-link :to="{ name: 'auth1.forgot-password' }" class="float-end">هل نسيت كلمة السر؟</router-link> -->
          <div class="d-inline-block w-100 text-center">
            <div class="d-inline-block w-100 text-center">
              <div class="col-sm-12 text-center" v-if="loader">
                <img src="../../../assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;">
              </div>
            </div>
            <button type="submit" class="btn btn-primary ">تسجيل الدخول</button>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>

          </div>
          <div class="sign-info">
            <span class="dark-color d-inline-block line-height-2">لا تملك حساب؟<router-link to="/auth/signup"> سجل الأن
              </router-link></span>
          </div>
        </form>
      </div>
    </iq-card>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
export default {
  name: 'SignIn',
  setup() {
    return { v$: useVuelidate() }
  },
  components: {},
  data() {
    return {
      form: {
        email: '',
        password: '',


      },
      error: '',
      submitStatus: null,
    }
  },

  methods: {
    async submit() {
      this.v$.$touch()
      if (this.v$.form.$invalid) {
        (this.submitStatus)
      } else {
        this.$store.dispatch('login', {
          email: this.form.email,
          password: this.form.password
        }).then(this.$router.push({ name: 'social' }))
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
        password: {
          required,
          min: minLength(8)
        },

      },
    }
  },
}
</script>

<style lang="scss" scoped>
h1,
h4,
p,
title,
form {
  direction: rtl;
}

.form-check {
  float: left;
}

a.float-end {
  margin-top: 10px;
}
</style>
Footer