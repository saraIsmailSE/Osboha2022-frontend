<template lang="">
  <div class="form-group">
    <label class="form-label" for="thesisBody">الأطروحة</label>
    <textarea
      rows="5"
      placeholder="... اكتب أطروحتك"
      class="rounded form-control"
      id="thesisBody"
      name="thesisBody"
      v-model.trim="proxyValue"
      style="direction: rtl"
    ></textarea>
    <p style="direction: rtl">
      <span> {{ proxyValue.length }} /400 حرف</span>
      <span> - </span>
      <span
        style="color: red"
        class="text-center"
        v-if="proxyValue.length < 400"
        >أطروحة غير شاملة
        <span class="material-symbols-outlined font-small">error</span>
      </span>
      <span style="color: green" v-else
        >أطروحة شاملة
        <span class="material-symbols-outlined font-small">check_circle</span>
      </span>
    </p>
    <div class="help-block" v-if="v$.thesisForm.body.$error">
      <small style="color: red" v-if="v$.thesisForm.body.requiredIf.$invalid"
        >الرجاء ادخال الأطروحة</small
      >

      <small style="color: red" v-if="v$.thesisForm.body.between.$invalid">
        الأطروحة الرمضانية يجب أن تكون شاملة
      </small>
    </div>
  </div>
</template>
<script setup>
import { computed, inject } from "vue";

const v$ = inject("v$");

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const proxyValue = computed({
  get() {
    return props.modelValue;
  },

  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<style scoped lang="css">
.font-small {
  font-size: 0.8rem;
}
</style>
