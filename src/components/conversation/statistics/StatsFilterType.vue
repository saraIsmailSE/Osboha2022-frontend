<template>
  <div class="col-12 row">
    <div class="col-sm-12 col-md-6">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="type"
          id="by_week"
          value="week"
          v-model="proxyValue"
        />
        <label class="form-check-label" for="by_week">حسب الأسبوع</label>
      </div>
    </div>

    <div class="col-sm-12 col-md-6">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="type"
          id="by_month"
          value="month"
          v-model="proxyValue"
        />
        <label class="form-check-label" for="by_month">حسب الشهر</label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject } from "vue";

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
