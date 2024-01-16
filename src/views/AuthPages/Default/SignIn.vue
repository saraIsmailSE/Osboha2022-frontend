<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div
        class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto"
      >
        <h1 class="text-center mt-3 mb-3">تسجيل الدخول</h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img
            src="@/assets/images/main/login.png"
            class="img-fluid rounded w-50"
            alt="blog-img"
          />
        </div>
        <form class="mt-4 w-75 mx-auto" @submit.prevent="submit">
          <div class="form-group">
            <label class="form-label text-right" for="exampleInputEmail1"
              >الايميل</label
            >

            <input
              type="email"
              class="form-control mb-0 w-100 mx-auto"
              id="exampleInputEmail1"
              placeholder="أدخل الايميل هنا"
              v-model="v$.form.email.$model"
            />

            <p style="color: red" v-if="v$.form.email.$error">
              <span v-if="v$.form.email.required.$invalid">
                رجاء قم بادخال البريد الإلكتروني
              </span>
              <span v-if="v$.form.email.email.$invalid">
                رجاء قم بادخال البريد الإلكتروني بشكل صحيح
              </span>
            </p>
          </div>
          <div class="form-group">
            <label class="form-label" for="exampleInputPassword1"
              >الرمز السري</label
            >
            <div class="input-group mb-0 w-100 mx-auto">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="أدخل الرمز السري هنا"
                v-model="v$.form.password.$model"
              />
              <button
                class="input-group-addon btn btn-primary d-flex align-items-center justify-content-center"
                @click.prevent="showPassword = !showPassword"
              >
                <span class="material-symbols-outlined">
                  {{ showPassword ? "visibility_off" : "visibility" }}
                </span>
              </button>
            </div>

            <p style="color: red" v-if="v$.form.password.$error">
              <span v-if="v$.form.password.required.$invalid">
                رجاء قم بادخال كلمة السر
              </span>
              <span v-if="v$.form.password.min.$invalid">
                كلمة السر يجب ان تكون اكثر من 8 احرف
              </span>
            </p>
          </div>
          <p class="text-center my-2" style="color: red" v-if="errorMessage">
            {{ errorMessage }}
          </p>

          <router-link :to="{ name: 'auth.forgot-password' }" class="float-end"
            >هل نسيت كلمة السر؟</router-link
          >
          <div class="d-inline-block w-100 text-center">
            <div class="col-sm-12 text-center" v-if="loading">
              <img :src="require('@/assets/images/gif/page-load-loader.gif')" alt="loader" style="height: 80px" />
            </div>

            <button type="submit" class="btn btn-primary text-center" v-else>
              تسجيل الدخول
            </button>
          </div>
          <div class="sign-info">
            <span class="dark-color d-inline-block line-height-2"
              >لا تملك حساب؟
              <router-link :to="{ name: 'auth.sign-up' }">
                سجل الأن
              </router-link></span
            >
          </div>
        </form>
      </div>
    </iq-card>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: "SignIn",
  setup() {
    return { v$: useVuelidate() };
  },
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errorMessage: "",
      submitStatus: null,
      loading: false,
      showPassword: false,
    };
  },
  methods: {
    async submit() {
      this.v$.$touch();
      if (this.v$.form.$invalid) {
        this.errorMessage = " قم بادخال البيانات بشكل صحيح";
        return;
      }

      if (this.loading) return;
      this.loading = true;

      try {
        await this.$store.dispatch("login", {
          email: this.form.email,
          password: this.form.password,
        });

        this.errorMessage = "";
        this.$router.push({ name: "osboha.list" });
      } catch (error) {
        const response = error.response.data;

        if (response.statusCode === 500) {
          //validation errors
          const data = response.data;
          if (data.email) {
            console.log(
              "🚀 ~ file: SignIn.vue:152 ~ submit error ~ data.email:",
              data.email,
            );
            const err = data.email.first();
            if (err.includes("required")) {
              this.errorMessage = "رجاءً قم بادخال البريد الالكتروني";
            } else if (err.includes("valid")) {
              this.errorMessage = "رجاءً قم بادخال البريد الالكتروني بشكل صحيح";
            }
          } else if (data.password) {
            console.log(
              "🚀 ~ file: SignIn.vue:161 ~ submit error ~ data.password:",
              data.password,
            );
            const err = data.password[0];
            console.log(err);
            if (err.includes("required")) {
              this.errorMessage = "رجاءً قم بادخال كلمة السر";
            } else if (err.includes("least")) {
              this.errorMessage = "كلمة السر يجب ان تكون اكثر من 8 احرف";
            }
          }
        } else {
          this.errorMessage = response.data;
        }
      } finally {
        this.loading = false;
      }
    },
  },
  validations() {
    return {
      form: {
        email: {
          required,
          email,
        },
        password: {
          required,
          min: minLength(8),
        },
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    if (
      localStorage.getItem("osboha__token") &&
      localStorage.getItem("osboha__user")
    ) {
      next({ name: "osboha.list" });
    } else {
      next();
    }
  },
};
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
