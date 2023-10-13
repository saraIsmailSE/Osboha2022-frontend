<template>
  <img
    v-if="!isError && !isLoading"
    :src="imageSRC"
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
import axios from "axios";
import mediaService from "@/API/services/media.services";

export default {
  name: "BaseMediaImage",
  data() {
    return {
      isError: false,
      isLoading: true,
      imageSRC: "",
    };
  },
  async created() {
    const IMAGE_URL = mediaService.show(this.mediaID);
    const response = await axios
      .get(IMAGE_URL)
      .then((res) => {
        this.imageSRC = IMAGE_URL;
        this.isLoading = false;
      })
      .catch((err) => {
        this.isError = true;
        this.isLoading = false;
      });
  },
  props: {
    mediaID: {
      type: Number,
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
