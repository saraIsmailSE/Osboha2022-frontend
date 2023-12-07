<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div
        class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto"
      >
        <h1 class="text-center mt-3 mb-3">ترقية</h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img
            src="@/assets/images/main/upgrade-user.png"
            class="img-fluid rounded w-75"
            alt="blog-img"
          />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <form class="mt-2" @submit.prevent="onSubmit()">
            <div class="form-group">
              <label for="role">الترقية</label>
              <select
                v-model="v$.form.role_id.$model"
                class="form-select"
                data-trigger
                name="role"
                id="role"
              >
                <option value="0" selected>ترقية إلى</option>
                <option
                  v-for="(role, index) in roles"
                  :key="index"
                  :value="role.id"
                >
                  {{ ARABIC_ROLES[role.name] }}
                </option>
              </select>
              <small style="color: red" v-if="v$.form.role_id.$error">
                يرجى اختيار نوع الترقية
              </small>
            </div>

            <div class="form-group">
              <label for="user">المستخدم</label>
              <input
                v-model="v$.form.user.$model"
                type="email"
                class="form-control mb-0"
                id="user"
                placeholder="ادخل بريد المستخدم"
              />
              <template v-if="v$.form.user.$error">
                <small style="color: red" v-if="v$.form.user.required.$invalid"
                  >البريد الالكتروني للمستخدم مطلوب</small
                >
                <small style="color: red" v-if="v$.form.user.email.$invalid"
                  >البريد الالكتروني للمستخدم غير صحيح</small
                >
              </template>
            </div>
            <div class="form-group" v-if="showHeadUser">
              <label for="head_user"> المسؤول عنه</label>
              <input
                v-model="v$.form.head_user.$model"
                type="email"
                class="form-control mb-0"
                id="head_user"
                placeholder="ادخل بريد المسؤول عنه"
              />
              <template v-if="v$.form.head_user.$error">
                <small
                  style="color: red"
                  v-if="v$.form.head_user.requiredIf.$invalid"
                >
                  البريد الالكتروني للمسؤول مطلوب</small
                >
                <small
                  style="color: red"
                  v-if="v$.form.head_user.email.$invalid"
                >
                  البريد الالكتروني للمسؤول غير صحيح</small
                >
              </template>
            </div>

            <div class="form-group text-center" v-if="message">
              <small
                :style="{
                  color: messageVariant === 'success' ? 'green' : 'red',
                }"
              >
                {{ message }}
              </small>
            </div>
            <div class="col-sm-12 text-center" v-if="loader">
              <p class="text-center">جاري الترقية</p>
              <img
                src="@/assets/images/page-img/page-load-loader.gif"
                alt="loader"
                style="height: 100px"
              />
            </div>
            <div class="d-inline-block w-100" v-else>
              <button
                type="submit"
                class="btn btn-primary float-end"
                :disabled="loader"
              >
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
import { required, requiredIf, email, maxLength } from "@vuelidate/validators";
import { api } from "@/API/Intercepter";
import { ARABIC_ROLES, SUPPORT_LEADER_ROLE_ID } from "@/utilities/constants";

import rolesService from "@/API/services/roles.service";
const greaterThanZero = (value) => value > 0;

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
      ARABIC_ROLES,
      SUPPORT_LEADER_ROLE_ID,
      form: {
        user: "",
        head_user: "",
        role_id: 0,
      },
      roles: [],
      message: "",
      messageVariant: "",
      showHeadUser: false,
    };
  },
  validations() {
    return {
      form: {
        user: { required, email },
        head_user: {
          requiredIf: requiredIf(() => this.showHeadUser),
          email,
        },
        role_id: {
          required,
          maxValue: greaterThanZero,
        },
      },
    };
  },
  watch: {
    "v$.form.role_id.$model": function (val) {
      if (val !== this.SUPPORT_LEADER_ROLE_ID && val !== 0) {
        this.showHeadUser = true;
      } else {
        this.showHeadUser = false;
      }
    },
    message: function (val) {
      if (val) {
        setTimeout(
          () => {
            this.message = "";
          },
          this.messageVariant === "success" ? 2000 : 5000,
        );
      }
    },
  },
  methods: {
    async onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.loader = true;
        try {
          this.message = "";
          const response = await rolesService.assignRole(this.form);
          this.message = response;
          this.messageVariant = "success";

          this.v$.form.$reset();
          this.form = {
            user: "",
            head_user: "",
            role_id: 0,
          };
        } catch (error) {
          console.log(error.response.data);
          if (error?.response?.data?.data) {
            this.message = error.response.data.data;
          } else {
            this.message = "حدث خطأ, يرجى المحاولة لاحقاً";
          }
          this.messageVariant = "danger";
        } finally {
          this.loader = false;
        }
      }
    },
  },
};
</script>
