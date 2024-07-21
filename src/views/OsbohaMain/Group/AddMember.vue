<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto">
        <h1 class="text-center mt-3 mb-3">عضو جديد</h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img src="@/assets/images/main/add-user.png" class="img-fluid rounded w-75" alt="add-user" />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <h1 class="mb-0">اضافة عضو</h1>
          <form class="mt-2" @submit.prevent="onSubmit()">
            <div class="form-group">
              <label for="exampleInputEmail1">الايميل</label>
              <input type="text" v-model="v$.form.email.$model" class="form-control mb-0" id="exampleInputEmail1"
                placeholder="البريد الالكتروني العضو" />
              <template v-if="v$.form.email.$error">
                <small style="color: red" v-if="v$.form.email.required.$invalid">البريد الالكتروني مطلوب</small>
                <small style="color: red" v-if="v$.form.email.email.$invalid">البريد الالكتروني غير صحيح</small>
              </template>
            </div>
            <div class="form-group">
              <select v-model="v$.form.role_id.$model" class="form-select" data-trigger name="choices-single-default"
                id="choices-single-default">
                <option value="0" selected>اختر دور العضو</option>
                <option v-for="(role, index) in roles" :key="index" :value="role.id">
                  {{ ARABIC_ROLES[role.name] }}
                </option>
              </select>
              <small style="color: red" v-if="v$.form.role_id.$error">
                يرجى اختيار دور العضو في المجموعة
              </small>
            </div>
            <div class="form-group text-center" v-if="message">
              <small :style="{
                color: messageVariant === 'success' ? 'green' : 'red',
              }">
                {{ message }}
              </small>
            </div>
            <div class="col-sm-12 text-center" v-if="loader">
              <p class="text-center">جاري الاضافة</p>
              <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
            </div>
            <div class="d-inline-block w-100" v-else>
              <button type="submit" class="btn btn-primary float-end">
                اضافة
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="d-flex justify-content-end me-2">
        <back-button routeName="group.group-detail" :routeParams="{ group_id: this.$route.params.group_id }" />
      </div>
    </iq-card>
  </div>
</template>
<script>
import rolesService from "@/API/services/roles.service";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, email } from "@vuelidate/validators";
import UserGroupService from "@/API/services/user-group.service";
import { api } from "@/API/Intercepter.js";
import { ARABIC_ROLES } from "@/utilities/constants";
import BackButton from '@/components/common/BackButton.vue';

const greaterThanZero = (value) => value > 0;

export default {
  name: "AddBook",
  setup() {
    return { v$: useVuelidate() };
  },
  components: { BackButton },
  async created() {
    if (this.$route.params.add_type == 'main') {
      const roles = await api.get(`get-roles/1`);
      this.roles = roles.data.data;
    }
    else {
      this.roles = await rolesService.getSecondaryRoles(this.$route.params.add_type);

    }

  },

  data() {
    return {
      loader: false,
      ARABIC_ROLES,
      form: {
        email: "",
        role_id: 0,
        group_id: this.$route.params.group_id,
      },
      roles: [],
      message: "",
      messageVariant: "",
    };
  },
  watch: {
    message: function (val) {
      if (val) {
        setTimeout(
          () => {
            this.message = "";
          },
          this.messageVariant === "success" ? 4000 : 6000,
        );
      }
    },
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
          this.messageVariant = "success";

          this.v$.form.$reset();
          this.form = {
            email: "",
            role_id: 0,
            group_id: this.$route.params.group_id,
          };
        } catch (error) {
          console.log(error);
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