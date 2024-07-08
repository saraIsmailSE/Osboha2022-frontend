<template>
  <div class="row">
    <label class="form-label">نوع الأطروحة</label>
    <div class="form-group">
      <select
        class="form-select w-100"
        name="type_of_thesis"
        id="type_of_thesis"
        v-model="proxyValue"
      >
        <option value="">اختر نوع الأطروحة</option>
        <option value="read" v-if="!isTafseerBook">قراءة</option>
        <option value="readAndWrite">كتابة أطروحة</option>
        <option value="screenshots">اقتباسات</option>
        <option
          value="screenshotsAndWrite"
          v-if="!isRamadanBook && !isTafseerBook"
        >
          كتابة واقتباسات
        </option>
      </select>
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
  book: {
    type: Object,
    required: true,
  },
  isRamadanActive: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "changeTypeOfThesis"]);

const isRamadanBook = computed(
  () => props.book?.type.type === "ramadan" && props.isRamadanActive,
);
const isTafseerBook = computed(
  () => props.book?.type.type === "tafseer" && props.isRamadanActive,
);

const proxyValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
    emit("changeTypeOfThesis", value);
  },
});
</script>
<style lang=""></style>
