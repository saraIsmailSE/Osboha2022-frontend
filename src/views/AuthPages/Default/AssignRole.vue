<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto">
        <h1 class="text-center mt-3 mb-3">ترقية</h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img src="@/assets/images/main/upgrade-user.png" class="img-fluid rounded w-75" alt="blog-img" />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <form class="mt-2" @submit.prevent="onSubmit()">
            <div class="form-group">
              <label for="user">المستخدم</label>
              <input v-model="v$.form.user.$model" type="email" class="form-control mb-0" id="user"
                placeholder="ادخل بريد المستخدم" />
              <small style="color: red" v-if="v$.form.user.$error">البريد الالكتروني للمستخدم مطلوب</small>
            </div>
            <div class="form-group">
              <label for="head_user"> المسؤول عنه</label>
              <input v-model="v$.form.head_user.$model" type="email" class="form-control mb-0" id="head_user"
                placeholder="ادخل بريد المسؤول عنه" />
              <small style="color: red" v-if="v$.form.head_user.$error"> البريد الالكتروني للمسؤول مطلوب</small>
            </div>
            <div class="form-group">
              <label for="role">الترقية</label>
              <select v-model="v$.form.role_id.$model" class="form-select" data-trigger name="role"
                id="role">
                <option value=0 selected>ترقية إلى</option>
                <option v-for="(role, index) in roles" :key="index" :value="role.id">{{ user_type[role.name] }}</option>
              </select>
              <small style="color: red" v-if="v$.form.role_id.$error">
                يرجى اختيار نوع الترقية
              </small>            
            </div>
            <div class="col-sm-12 text-center" v-if="loader">
              <p class="text-center">جاري الترقية</p>
              <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;" />
            </div>

            <div class="form-group text-center" v-if="message">
              <small style="color: red">
                {{ message }}
              </small>
            </div>
            <div class="d-inline-block w-100">
              <button type="submit" class="btn btn-primary float-end">
                ترقية
              </button>
            </div>
          </form>
        </div>
      </div>
    </iq-card>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, maxLength } from "@vuelidate/validators";
import { api } from "@/API/Intercepter";
import authService from "@/API/services/auth.service";
const greaterThanZero = (value) => value > 0

export default {
  name: "AssignRole",
  setup() {
    return { v$: useVuelidate() };
  },
  async created() {
    const roles = await api.get(`get-roles/1`);
    this.roles = roles.data.data;
  },
  data() {
    return {
      loader: false,
      user_type: {
        ambassador: "سفير",
        leader: "قائد",
        supervisor: "مراقب",
        advisor: 'موجه',
        consultant: 'مستشار',
        admin: 'ادارة'
      },
      form: {
        user: "",
        head_user:'',
        role_id: 0,
      },
      roles: [],
      message: "",
    };
  },
  validations() {
    return {
      form: {
        user: { required, email },
        head_user: { required, email },
        role_id: {
          required,
          maxValue: greaterThanZero,
        },
      },
    };
  },
  methods: {
    async onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          this.message = ''
          const response = await authService.assignRole(this.form);
          this.loader = false;
          this.message = response
        } catch (error) {
          this.loader = false;
          this.message = 'حدث خطأ'
          console.log(error);
        }
      }
    },
  },
};
</script>
