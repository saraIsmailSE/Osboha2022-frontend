<template>
  <div class="preview-images">
    <div
      class="image-container"
      v-for="(previewUrl, index) in previewUrls"
      :key="previewUrl.url"
    >
      <div class="delete-image" @click="removeMedia(index)">
        <span> x </span>
      </div>
      <img :src="previewUrl.url" v-if="previewUrl.type.includes('image')" />
      <video autoplay muted v-else>
        <source :src="previewUrl.url" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImagePreviewer",
  props: {
    media: {
      type: [Array, FileList],
      default: () => [],
    },
  },
  emits: ["remove-media"],
  data() {
    return {
      previewUrls: [],
    };
  },
  methods: {
    previewMedia() {
      this.previewUrls = [];
      const images = [...this.media];
      images.forEach((image) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrls.push({
            url: reader.result,
            type: image.type,
          });
        };
        reader.readAsDataURL(image);
      });
    },
    removeMedia(index) {
      this.previewUrls.splice(index, 1);
      this.$emit("remove-media", index);
    },
    clearMedia() {
      this.previewUrls = [];
    },
  },
  mounted() {
    this.previewMedia();
  },
  watch: {
    media() {
      this.previewMedia();
    },
  },
};
</script>

<style>
.preview-images {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.image-container {
  margin-right: 10px;
  margin-bottom: 10px;
  height: 60px;
  width: 60px;
  position: relative;
}

.image-container img,
.image-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.delete-image {
  position: absolute;
  top: -5px;
  right: -5px;
  z-index: 1;
  height: 20px;
  width: 20px;
  background: #fff;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  color: #000;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
