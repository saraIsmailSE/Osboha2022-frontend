<template lang="">
  <form @submit.prevent="submit">
    <div class="d-flex align-items-center w-100 row">
      <div class="form-group">
        <label class="form-label" for="rate">تقييمك</label>
        <div class="d-flex align-items-center">
          <span
            class="material-symbols-outlined clickable-star"
            v-for="i in 5"
            :key="i"
            @click="rateForm.rate = i"
            :class="{
              'text-warning': i <= rateForm.rate,
              star: i <= rateForm.rate,
            }"
            style="cursor: pointer"
            role="button"
          >
            star
          </span>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="rateBody">تعليقك</label>
        <textarea
          rows="5"
          placeholder="... اكتب تعليقك هنا"
          class="rounded form-control"
          id="rateBody"
          name="rateBody"
          v-model="v$.rateForm.body.$model"
          style="direction: rtl"
        ></textarea>
        <div class="help-block" v-if="v$.rateForm.body.$error">
          <small style="color: red" v-if="v$.rateForm.body.requiredIf.$invalid"
            >الرجاء كتابة تعليق</small
          >
        </div>
      </div>

      <hr />

      <!--Success and error messages-->
      <small class="text-danger text-center" v-if="errorMessage">
        {{ errorMessage }}
      </small>

      <div class="col-sm-12 text-center" v-if="loader">
        <img
          :src="require('@/assets/images/gif/page-load-loader.gif')"
          alt="loader"
          style="height: 100px"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary d-block mt-3"
        v-else
        :disabled="v$.rateForm.$invalid"
      >
        {{ rateToEdit ? "تعديل" : "إضافة" }}
      </button>
    </div>
  </form>
</template>
<script>
import { required, requiredIf, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import RateService from "@/API/services/rate.service";

import helper from "@/utilities/helper";

export default {
  name: "AddRate",
  inject: ["book"],
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      loader: false,
      errorMessage: "",
      rateForm: {
        rate: this.rateToEdit ? this.rateToEdit?.rate.rate : 0,
        body: this.rateToEdit ? this.rateToEdit?.body ?? "" : "",
        book_id: this.book_id,
        rate_id: this.rateToEdit ? this.rateToEdit?.rate.id : null,
      },
    };
  },
  props: {
    comment: {
      type: Object,
      default: null,
    },
    book_id: {
      type: Number,
      default: null,
    },
    rateToEdit: {
      type: Object,
      default: null,
    },
  },
  emits: ["addRate", "closeModel", "editRate"],
  computed: {
    successMessage() {
      return this.rateToEdit
        ? "تم تعديل التقييم بنجاح"
        : "تم إضافة التقييم بنجاح";
    },
  },
  methods: {
    async submit() {
      if (this.book?.userRate && !this.rateToEdit) return;

      const result = await this.v$.$validate();
      if (result) {
        this.loader = true;
        try {
          let response;

          if (this.rateToEdit) {
            response = await RateService.update(this.rateForm);
          } else {
            response = await RateService.create(this.rateForm);
          }

          helper.toggleToast(this.successMessage, "success");

          if (this.rateToEdit) {
            this.$emit("editRate", response.data);
          } else {
            this.$emit("addRate", response.data);

            //reset form
            this.v$.rateForm.$reset();
            this.rateForm = {
              rate: 0,
              body: "",
              book_id: this.book_id,
              related_comment_id: null,
            };
          }
          //timer to close the modal
          setTimeout(() => {
            this.$emit("closeModel");
          }, 2000);
        } catch (error) {
          helper.toggleErrorToast();
        } finally {
          this.loader = false;
        }
      } else {
        this.errorMessage = "الرجاء ادخال جميع البيانات المطلوبة";
      }
    },
  },
  validations() {
    return {
      rateForm: {
        body: {
          required: requiredIf(() => !this.rateForm.rate),
        },
        rate: {
          required: requiredIf(() => !this.rateForm.body),
        },
      },
    };
  },
};
</script>
<style lang=""></style>
