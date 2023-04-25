<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div
        class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto"
      >
        <h1 class="text-center mt-3 mb-3">اعطاء صلاحية</h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img
            src="@/assets/images/main/reader.png"
            class="img-fluid rounded w-25"
            alt="blog-img"
          />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <h1 class="mb-0">اعطاء صلاحية</h1>
          <form class="mt-2" @submit.prevent="onSubmit()">
            <div class="form-group">
              <label for="exampleInputEmail2">ايميل السفير</label>
              <input
                v-model="v$.form.email.$model"
                type="email"
                class="form-control mb-0"
                id="exampleInputEmail2"
                placeholder="Enter email"
              />
              <small style="color: red" v-if="v$.form.email.$error"
                >الرجاء ادخال ايميل صالح</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">الصلاحية</label>
              <select
                v-model="v$.form.role.$model"
                class="form-select"
                data-trigger
                name="choices-single-default"
                id="choices-single-default"
              >
                <option value="">اختر الصلاحية</option>
                <option v-for="(role, index) in roles" :key="index">
                  {{ role.name }}
                </option>
              </select>
              <small style="color: red" v-if="v$.form.role.$error"
                >Please select a role.</small
              >
            </div>
            <div class="form-group" v-if="regError">
              <small style="color: red">
                {{ regError }}
              </small>
            </div>
            <div class="d-inline-block w-100">
              <button type="submit" class="btn btn-primary float-end">
                Create Account
              </button>
            </div>
            <div class="sign-info">
              <span class="dark-color d-inline-block line-height-2">
                Already have an account?
                <router-link :to="{ name: 'auth.sign-in' }">
                  Sign In
                </router-link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </iq-card>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { api } from "@/API/Intercepter";
import authService from "@/API/services/auth.service";
export default {
  name: "AssignRole",
  setup() {
    return { v$: useVuelidate() };
  },
  async created() {
    await this.getRoles();
  },
  data() {
    return {
      loader: false,
      form: {
        email: "",
        role: "",
      },
      roles: [],
      regError: "",
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
        role: { required },
      },
    };
  },
  methods: {
    async getRoles() {
      const a = JSON.parse(localStorage.getItem("osboha__user")).user.roles;
      const biggestRole = a.reduce(
        (acc, obj) => (obj.id < acc ? obj : acc),
        Infinity
      );
      const roles = await api.get(`get-roles/${biggestRole.id}`);
      this.roles = roles.data.data;
    },
    async onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const res = await authService.assignRole({
          email: this.form.email,
          role: this.form.role,
        });

        if (res.data.data == "email not found") {
          this.regError = "الايميل غير موجود";
        } else {
          window.location.reload();
        }
      }
    },
  },
};
</script>
