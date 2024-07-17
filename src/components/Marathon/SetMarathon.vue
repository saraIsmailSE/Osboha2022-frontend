<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img class="img-fluid rounded w-75" src="@/assets/images/main/current_book.png" alt="تحديد أسابيع المارثون" />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <h2 class="text-center"> المارثون الحالي - المارثون الأول </h2>
          <hr />
          <form class="mt-2 p-2" @submit.prevent="onSubmit()">
            <div class="form-group">
              <input type="text" class="form-control mb-0" id="groupName" placeholder=" عنوان المارثون" />
            </div>


            <h3> قم بتحديد أسابيع المارثون </h3>
            <div class="form-check form-switch ">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
              <h4 class="form-check-label" for="flexSwitchCheckDefault">الأول من يوليو</h4>
            </div>
            <br />
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
              <h4 class="form-check-label" for="flexSwitchCheckChecked">الثاني من يوليو</h4>
            </div>
            <p class="text-center my-2" style="color: red" v-if="message">
              {{ message }}
            </p>
            <div class="col-sm-12 text-center" v-if="loading">
              <p class="text-center">جاري الاعتماد</p>
              <img src="@/assets/images/gif/page-load-loader.gif" alt="loader" style="height: 100px" />
            </div>
            <div class="d-inline-block w-100" v-else>
              <button type="submit" class="btn btn-primary float-end" :disabled="loading">
                اعتماد
              </button>
            </div>
          </form>

          <hr />
          <div class="d-inline-block w-100 mb-3">
            <button type="submit" class="btn btn-primary float-end" :disabled="loading">
              فتح مارثون جديد
            </button>
            <button type="submit" class="btn btn-danger float-end me-2" :disabled="loading">
              انهاء المارثون الحالي
            </button>
          </div>

        </div>
      </div>
    </iq-card>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import GroupService from "@/API/services/group.service";
import groupType from "@/API/services/group-type.service";
import { GROUP_TYPE } from "@/utilities/constants";

const greaterThanZero = (value) => value > 0;

export default {
  name: "Add Group",
  setup() {
    return { v$: useVuelidate() };
  },

  async created() {
    this.types = await groupType.getAllGroupTypes();
  },

  data() {
    return {
      types: [],
      GROUP_TYPE,
      groupForm: {
        name: "",
        type_id: 0,
        description: "",
      },
      message: "",
      group_id: null,
      loading: false,
    };
  },
  methods: {
    async onSubmit() {
      this.v$.$touch();
      if (!this.v$.groupForm.$invalid) {
        this.loading = true;
        try {
          const group = await GroupService.createGroup(this.groupForm);
          this.message = "تمت الاضافة";
          this.group_id = group.id;

          this.v$.groupForm.$reset();
          this.groupForm = {
            name: "",
            type_id: 0,
            description: "",
          };
          setTimeout(() => {
            this.message = "";
          }, 1800);
        } catch (error) {
          this.message = "حصل خطأ - لم تتم الاضافة!";
          console.log(error.response.data);
        } finally {
          this.loading = false;
        }
      }
    },
  },
  validations() {
    return {
      groupForm: {
        name: {
          required,
        },
        type_id: {
          required,
          maxValue: greaterThanZero,
        },
        description: {
          required,
        },
      },
    };
  },
};
</script>