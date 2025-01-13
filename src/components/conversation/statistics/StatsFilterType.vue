<template>
  <!-- <div class="col-12 row">
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
  </div> -->

  <nav class="d-flex justify-content-center">
    <div
      className="nav nav-tabs justify-content-start"
      id="types-tab"
      role="tablist"
    >
      <button
        :className="`nav-link ${type == 'week' ? 'active' : ''}`"
        id="nav-week-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-week"
        type="button"
        role="tab"
        aria-controls="nav-week"
        aria-selected="true"
        @click="
          () => {
            this.$emit('changeType', 'week');
          }
        "
      >
        حسب الأسبوع
      </button>

      <button
        :className="`nav-link ${type == 'month' ? 'active' : ''}`"
        id="nav-month-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-month"
        type="button"
        role="tab"
        aria-controls="nav-month"
        aria-selected="false"
        @click="
          () => {
            this.$emit('changeType', 'month');
          }
        "
      >
        حسب الشهر
      </button>
    </div>
  </nav>
</template>
<script setup>
import { computed, inject } from "vue";

const props = defineProps({
  // modelValue: {
  //   type: String,
  //   required: true,
  // },
  type: {
    type: String,
    default: "week",
  },
});

const emit = defineEmits(["update:modelValue", "changeType"]);

// const proxyValue = computed({
//   get() {
//     return props.modelValue;
//   },
//   set(value) {
//     emit("update:modelValue", value);
//   },
// });
</script>
