<template>
  <div class="col-sm-12 mt-3 text-center">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
        <h3 class="text-center mt-3 mb-3">طلب اجازة</h3>
      </div>
      <div class="iq-card-body p-3">
        <div class="image-block text-center">
          <img src="@/assets/images/main/update-forms.png" class="img-fluid rounded w-50" alt="blog-img" />
        </div>

        <div class="d-flex align-items-center mt-3">
          <form @submit.prevent="submitException" class="post-text ml-3 w-100 row">
            <div class="form-group col-12">
              <h4>نوع الاجازة</h4>
              <select :disabled="message" v-model="v$.exceptionForm.type_id.$model" class="form-select mt-2" data-trigger
                name="type_id" id="eceptionType">
                <option value="0" selected>اختر نوع الاجازة</option>
                <option v-for="(type, index) in exceptionTypes" :key="index" :value="type.id">
                  {{ type.type }}
                </option>
              </select>
              <small style="color: red" v-if="v$.exceptionForm.type_id.$error">
                يرجى اختيار نوع الاجازة</small>
            </div>

            <div class="form-group col-12" v-if="isAdmin && v$.exceptionForm.type_id.$model == 5">
              <h4>تاريخ انتهاء الاجازة</h4>
              <input :disabled="message" type="date" class="form-control mt-2" id="exceptionEndDate"
                v-model="v$.exceptionForm.end_date.$model" name="end_date" />
              <template v-if="v$.exceptionForm.end_date.$error">
                <small style="color: red" v-if="v$.exceptionForm.end_date.required.$invalid">
                  يرجى اختيار تاريخ انتهاء الاجازة
                </small>
                <small style="color: red" v-if="v$.exceptionForm.end_date.date_format.$invalid">
                  يرجى اختيار تاريخ انتهاء الاجازة بتاريخ لا يقل عن اليوم
                </small>
              </template>
            </div>
            <div class="form-group" v-if="exceptionForm.type_id != 0 && exceptionForm.type_id != 1 && exceptionForm.type_id != 2">
              <h4>المدة المطلوبة</h4>
              <div class="form-group row">
                <select :disabled="message" v-model="v$.exceptionForm.desired_duration.$model" class="form-select mt-2"
                  data-trigger name="desired_duration" id="desired_duration">
                  <option value="" selected>اختر مدة الاجازة</option>
                  <option value="أسبوع واحد">
                    أسبوع واحد
                  </option>
                  <option value="أسبوعين">
                    أسبوعين
                  </option>
                  <option value="ثلاثة أسابيع">
                    ثلاثة أسابيع
                  </option>
                </select>
                <small style="color: red" v-if="v$.exceptionForm.desired_duration.$error">
                  يرجى اختيار مدة الاجازة</small>
              </div>
            </div>
            <div class="form-group">
              <h4>السبب</h4>
              <div class="form-group row">
                <textarea :disabled="message" rows="5" placeholder="سبب طلب الاجازة"
                  class="rounded form-control mt-2 col-12" id="exceptionReason" v-model="v$.exceptionForm.reason.$model"
                  name="reason">
                </textarea>
                <p>
                  <span :class="{ 'text-danger': v$.exceptionForm.reason.$error }">
                    {{ v$.exceptionForm.reason.$model.length }}
                  </span>
                  /250
                </p>
              </div>
              <small style="color: red" v-if="v$.exceptionForm.reason.$error">
                قم بادخال سبب لا ينقص عن 10 حروف ولا يزيد عن 250 حرف
              </small>
            </div>
            <hr />
            <div class="form-group">
              <button type="submit" :disabled="message" class="btn d-block btn-primary mt-3 mb-3 w-75 mx-auto">
                ارسال
              </button>
            </div>

            <div class="col-sm-12 text-center" v-if="loader">
              <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px" />
            </div>
            <h4 class="text-center mt-3 mb-3" v-if="message">{{ message }}</h4>
          </form>
        </div>
        <div class="d-flex align-items-center mt-3 row">
          <div class="d-inline-block w-100 text-center col-12">
            <a role="button" @click="back()" class="d-block mt-3 mb-3 w-75 mx-auto">
              <span>عودة للملف الشخصي</span>
              <span class="align-middle material-symbols-outlined">
                keyboard_return
              </span>
            </a>
          </div>
        </div>
      </div>
    </iq-card>
  </div>
</template>
<script>
import exceptionTypeService from "@/API/services/exception-type.service";
import exceptionService from "@/API/services/user-exception.service";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import UserInfoService from "@/Services/userInfoService";

const greaterThanZero = (value) => value > 0;

export default {
  name: "New Exception",
  async created() {
    this.exceptionTypes = await exceptionTypeService.getAllExceptionTypes();
  },
  components: {},
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      loader: false,
      exceptionForm: {
        reason: "",
        type_id: 0,
        end_date: new Date().toISOString().slice(0, 10),
        desired_duration:'',
      },
      exceptionTypes: null,
      message: null,
    };
  },
  computed: {
    isAdmin() {
      return UserInfoService.hasRole(this.$store.getters.getUser, "admin");
    },
  },
  validations() {
    return {
      exceptionForm: {
        reason: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(250),
        },
        type_id: {
          required,
          maxValue: greaterThanZero,
        },
        desired_duration:{
          required,
        },
        //after yesterday
        end_date: {
          required,
          date_format: (value) => {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return new Date(value) > yesterday;
          },
        },
      },
    };
  },
  methods: {
    async submitException() {
      this.v$.$touch();
      if (!this.v$.exceptionForm.$invalid) {
        this.message = "";
        this.loader = true;
        try {
          const response = await exceptionService.create(this.exceptionForm);

          this.message = response;
          this.v$.exceptionForm.$reset();
        } catch (error) {
          console.log("[Exception request error]", error);
        } finally {
          this.loader = false;
        }
      }
    },
    back() {
      this.$router.push({
        name: "user.profile",
        params: { user_id: this.$route.params.user_id },
      });
    },
  },
};
</script>
