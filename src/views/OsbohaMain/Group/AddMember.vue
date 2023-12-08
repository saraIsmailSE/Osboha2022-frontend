<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div
        class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto"
      >
        <h1 class="text-center mt-3 mb-3">عضو جديد</h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img
            src="@/assets/images/main/add-user.png"
            class="img-fluid rounded w-75"
            alt="add-user"
          />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <h1 class="mb-0">اضافة عضو</h1>
          <form class="mt-2" @submit.prevent="onSubmit()">
            <div class="form-group">
              <label for="exampleInputEmail1">الايميل</label>
              <input
                type="text"
                v-model="v$.form.email.$model"
                class="form-control mb-0"
                id="exampleInputEmail1"
                placeholder="البريد الالكتروني العضو"
              />
              <template v-if="v$.form.email.$error">
                <small style="color: red" v-if="v$.form.email.required.$invalid"
                  >البريد الالكتروني مطلوب</small
                >
                <small style="color: red" v-if="v$.form.email.email.$invalid"
                  >البريد الالكتروني غير صحيح</small
                >
              </template>
            </div>
            <div class="form-group">
              <select
                v-model="v$.form.role_id.$model"
                class="form-select"
                data-trigger
                name="choices-single-default"
                id="choices-single-default"
              >
                <option value="0" selected>اختر دور العضو</option>
                <option
                  v-for="(role, index) in roles"
                  :key="index"
                  :value="role.id"
                >
                  {{ user_type[role.name] }}
                </option>
              </select>
              <small style="color: red" v-if="v$.form.role_id.$error">
                يرجى اختيار دور العضو في المجموعة
              </small>
            </div>
            <div class="form-group text-center" v-if="message">
              <small style="color: red">
                {{ message }}
              </small>
            </div>
            <div class="col-sm-12 text-center" v-if="loader">
              <p class="text-center">جاري الاضافة</p>
              <img
                src="@/assets/images/page-img/page-load-loader.gif"
                alt="loader"
                style="height: 100px"
              />
            </div>
            <div class="d-inline-block w-100" v-else>
              <button type="submit" class="btn btn-primary float-end">
                اضافة
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
import { required, maxLength, email } from "@vuelidate/validators";
import UserGroupService from "@/API/services/user-group.service";
import { api } from "@/API/Intercepter.js";

const greaterThanZero = (value) => value > 0;

export default {
  name: "AddBook",
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
        advisor: "موجه",
        consultant: "مستشار",
        admin: "ادارة",
      },
      form: {
        email: "",
        role_id: 0,
        group_id: this.$route.params.group_id,
      },
      roles: [],
      message: "",
    };
  },
  methods: {
    async onSubmit() {
      this.v$.$touch();
      if (!this.v$.form.$invalid) {
        this.loader = true;

        try {
          this.message = "";
          const response = await UserGroupService.AddMember(this.form);
          this.message = response;

          this.v$.form.$reset();
          this.form = {
            email: "",
            role_id: 0,
            group_id: this.$route.params.group_id,
          };

          setTimeout(() => {
            this.message = "";
          }, 3000);
        } catch (error) {
          this.message = "حدث خطأ";
          console.log(error);
        } finally {
          this.loader = false;
        }
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
        role_id: {
          required,
          maxValue: greaterThanZero,
        },
      },
    };
  },
};
</script>
