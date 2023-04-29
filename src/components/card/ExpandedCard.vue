<template>
  <div class="card">
    <div
      class="card-header rounded-0 p-1"
      :style="{ backgroundColor: bgColor }"
    >
      <h5 class="text-light mt-0 text-center" style="direction: rtl !important">
        <div class="d-flex justify-content-center">
          <span
            role="button"
            class="material-symbols-outlined"
            @click="expanding = !expanding"
          >
            {{ expanding ? "expand_less" : "expand_more" }}
          </span>
          {{ title }}
        </div>
      </h5>
    </div>
    <div
      class="card-body row d-flex justify-content-center"
      style="box-shadow: none"
      v-if="expanding"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpandedCard",
  data() {
    return {
      expanding: false,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
      default: "#1d1a55",
    },
    defaultExpanding: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.expanding = this.defaultExpanding;
  },
};
</script>

<style lang="scss" scoped></style>
