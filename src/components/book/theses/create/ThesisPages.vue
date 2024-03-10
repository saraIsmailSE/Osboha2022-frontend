<template lang="">
  <div class="row mt-2">
    <div class="form-group">
      <h5
        class="form-label"
        :class="{ 'text-primary': pages.length === 0 && !startOver }"
      >
        {{ pages.length === 0 && !startOver ? "لقد أنهيت الكتاب" : "الصفحات" }}
      </h5>
    </div>
  </div>
  <div class="row">
    <button
      class="btn btn-primary me-2 d-flex align-content-center justify-content-center"
      @click.prevent="startBookOver"
      v-if="pages.length === 0 && !startOver"
    >
      <span class="material-symbols-outlined md-18"> refresh </span>
      إعادة قراءة الكتاب
    </button>

    <template v-else>
      <small style="color: red" v-if="v$.thesisForm.pagesCount.$invalid">
        <span v-if="isRamadanBook"> * الحد الأدنى لكتب رمضان 15 صفحة </span>
        <span v-else-if="isTafseerBook">
          * الحد الأدنى لكتب التفسير 2 صفحات
        </span>
        <span v-else> * الحد الأدنى 3 صفحات </span>
      </small>

      <div class="form-group col-6">
        <select
          class="form-select"
          data-trigger
          name="start_page"
          id="start_page"
          v-model="startPageProxy"
        >
          <option value="">صفحة البداية</option>
          <option v-for="page in pages" :value="page" :key="page">
            {{ page }}
          </option>
        </select>

        <div class="help-block" v-if="v$.thesisForm.start_page.$error">
          <small
            style="color: red"
            v-if="v$.thesisForm.start_page.required.$invalid"
            >الرجاء اختيار صفحة البداية</small
          >
          <small
            style="color: red"
            v-if="
              !v$.thesisForm.start_page.required.$invalid &&
              v$.thesisForm.start_page.between.$invalid
            "
            >البداية يجب ان تكون اقل من النهاية</small
          >
        </div>
      </div>
      <div class="form-group col-6">
        <select
          class="form-select"
          data-trigger
          name="end_page"
          id="end_page"
          v-model="endPageProxy"
        >
          <option value="">صفحة النهاية</option>
          <option v-for="page in bookPagesEnd" :value="page" :key="page">
            {{ page }}
          </option>
        </select>
        <div class="help-block" v-if="v$.thesisForm.end_page.$error">
          <small
            style="color: red"
            v-if="v$.thesisForm.end_page.required.$invalid"
            >الرجاء اختيار صفحة النهاية</small
          >
          <small
            style="color: red"
            v-if="
              !v$.thesisForm.end_page.required.$invalid &&
              v$.thesisForm.end_page.between.$invalid
            "
            >النهاية يجب ان تكون اكبر من البداية</small
          >
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
import { ref, computed, inject } from "vue";

const startOver = ref(false);

const v$ = inject("v$");

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
  lastThesis: {
    type: Object,
    default: null,
  },
  thesisToEdit: {
    type: Object,
    default: null,
  },
  startPage: {
    type: [String, Number],
    default: "",
  },
  endPage: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:startPage", "update:endPage"]);

const isRamadanBook = computed(() => props?.book.type.type === "ramadan");
const isTafseerBook = computed(() => props?.book.type.type === "tafseer");

const pages = computed(() => {
  let allPages = [];
  let start = null;

  //if user has a book in progress, start pages from the last thesis end page and add 1 to it
  if (
    props.book.userBooks.length &&
    props.book.userBooks[0].status === "in progress"
  ) {
    start = props.lastThesis
      ? props.lastThesis?.end_page + 1
      : props.book.start_page;
  }
  //if user has no book/ or the book is in the favorites shelf, so this is the first thesis, start pages from the book start page
  else if (
    (!props.book.userBooks.length && !props.lastThesis) ||
    (props.book.userBooks.length && props.book.userBooks[0].status === "later")
  ) {
    start = props.book.start_page;
  }

  //if user is editing the thesis, start pages from the book start page
  if (props.thesisToEdit) {
    start = props.book.start_page;
  }

  //if start null, it means the user has finished the book

  //if start over button is not clicked, return empty array
  if (start === null && !startOver.value) {
    return [];
  }

  //if start over button is clicked, start pages from the book start page
  if (start === null && startOver.value) {
    start = props.book.start_page;
  }
  //add all pages to the array from the start page to the book end page
  for (let i = start; i <= props.book.end_page; i++) {
    allPages.push(i);
  }
  return allPages;
});

const bookPagesEnd = computed(() => {
  return pages.value.filter((page) => page > startPageProxy.value);
});

const startPageProxy = computed({
  get() {
    return props.startPage;
  },
  set(value) {
    emit("update:startPage", value);
  },
});

const endPageProxy = computed({
  get() {
    return props.endPage;
  },
  set(value) {
    emit("update:endPage", value);
  },
});

const startBookOver = () => {
  startOver.value = true;
};
</script>
<style lang=""></style>
