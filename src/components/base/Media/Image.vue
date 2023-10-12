<template>
  <img
    v-if="!isError && !isLoading"
    :src="src"
    :alt="alt"
    :style="style"
    :class="classes"
  />
  <div class="col-sm-12 text-right" v-else-if="isLoading">
    <img
      :src="require('@/assets/images/page-img/page-load-loader.gif')"
      alt="loader"
      style="height: 100px"
    />
  </div>

  <img
    v-else-if="isError"
    src="@/assets/images/main/finish-audit.png"
    alt="404"
    :class="classes"
  />
</template>

<script>
import { api } from "../../../API/Intercepter";
export default {
  name: "BaseMediaImage",
  data() {
    return {
      isError: false,
      isLoading: true,
    };
  },
  created() {
    //make axios request to check if the image exists
    api
      .get(this.src)
      .then((res) => {
        this.isLoading = false;
      })
      .catch((err) => {
        this.isError = true;
        this.isLoading = false;
      });
  },
  props: {
    src: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: null,
    },
    classes: {
      type: String,
      default: null,
    },
    style: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
