<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex text-center align-items-center mx-auto">
        <h1 class="text-center mt-3 mb-3">اضافة مجموعة</h1>
      </div>
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img class="img-fluid rounded w-50" src="@/assets/images/main/request_amb.png" alt="blog-img" />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <form class="mt-2" @submit.prevent="onSubmit()">
            <div class="form-group">
              <label for="groupName">اسم المجموعة</label>
              <input type="text" v-model="v$.groupForm.name.$model" class="form-control mb-0" id="groupName"
                placeholder=" اسم المجموعة" />
              <small style="color: red" v-if="v$.groupForm.name.$error"> اسم المجموعة مطلوب</small>
            </div>
            <div class="form-group">
              <label for="groupType">نوع المجموعة</label>
              <select v-model="v$.groupForm.type_id.$model" class="form-select" data-trigger name="choices-single-default"
                id="choices-single-default">
                <option value=0 selected>اختر نوع المجموعة</option>
                <option v-for="(type, index) in types" :key="index" :value="type.id">
                  {{ group_type[type.type] }}
                </option>
              </select>
              <small style="color: red" v-if="v$.groupForm.type_id.$error">نوع المجموعة مطلوب</small>
            </div>
            <div class="form-group">
              <label for="groupDescription">وصف المجموعة</label>
              <textarea type="text" v-model="v$.groupForm.description.$model" class="form-control mb-0"
                id="groupDescription" placeholder="وصف المجموعة " />
              <small style="color: red" v-if="v$.groupForm.description.$error">وصف المجموعة مطلوب</small>
            </div>
            <div class="d-inline-block w-100">
              <button type="submit" class="btn btn-primary float-end">
                اضافة المجموعة
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
import { required, minLength, maxLength } from "@vuelidate/validators";
import GroupService from "@/API/services/group.service";
import groupType from '@/API/services/group-type.service'

const greaterThanZero = (value) => value > 0

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
      loader: false,
      types: [],
      group_type: {
        followup: "فريق متابعة",
        supervising: "فريق رقابة",
        advising: "فريق توجيه",
        consultation: 'فريق الاستشارة',
        Administration: 'الإدارة العليا'
      },
      groupForm: {
        name: "",
        type_id: 0,
        description: '',

      },
    };
  },
  methods: {
    async onSubmit() {
      this.v$.$touch();
      if (!this.v$.groupForm.$invalid) {
        try {
          this.loader = true;
          const group = await GroupService.createGroup(this.groupForm)
          console.log(group);

        } catch (error) {
          this.loader = false;

          console.log(error.data);
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
          required

        }

      },
    };
  },
};
</script>
