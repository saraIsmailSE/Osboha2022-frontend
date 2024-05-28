<template>
  <div class="col-12 row mt-3 ms-3">
    <template v-if="type == 'week'">
      <div class="col-sm-12 col-md-6" v-for="week in weeks" :key="week.id">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="date"
            :id="week.id"
            :value="week.id"
            v-model="weekProxyValue"
          />
          <label class="form-check-label" :for="week.id">
            {{ week.title }}
          </label>
        </div>
      </div>
    </template>
    <template v-else-if="type == 'month'">
      <div class="form-group col-12">
        <select class="form-select" v-model="monthYearProxyValue">
          <option value="">اختر شهر</option>
          <option v-for="month in months" :key="month.date" :value="month.date">
            {{ month.title }}
          </option>
        </select>
      </div>
    </template>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  week: {
    type: String,
    required: true,
  },
  monthYear: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "week",
  },
  weeks: {
    type: Array,
    default: () => [],
  },
  months: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:week", "update:monthYear"]);

const weekProxyValue = computed({
  get() {
    return props.week;
  },
  set(value) {
    emit("update:week", value);
  },
});

const monthYearProxyValue = computed({
  get() {
    return props.monthYear;
  },
  set(value) {
    emit("update:monthYear", value);
  },
});
</script>
