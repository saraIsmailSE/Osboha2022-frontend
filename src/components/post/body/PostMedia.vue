<template>
  <div class="user-post" v-if="slicedMedia">
    <div class="row g-2">
      <div
        class="position-relative"
        :class="col"
        v-for="(image, index) in slicedMedia"
        :key="image.path"
        @click.prevent="$emit('showPostMedia', index)"
      >
        <img
          :src="image.path"
          alt="post-image"
          class="rounded w-100 h-100 post-image"
          style="object-fit: cover"
        />

        <!--overlay over last image-->
        <div
          class="overlay"
          v-if="
            post.media?.length > slicedMedia.length &&
            index === slicedMedia.length - 1
          "
          role="button"
        >
          <span class="material-symbols-outlined"> add </span>
          <span> {{ post.media?.length - slicedMedia.length }} </span>
          <span class="ms-1"> المزيد</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostMedia",
  inject: ["post"],
  emits: ["showPostMedia"],
  computed: {
    col() {
      return this.post.media.length > 1 ? "col-6" : "col-12";
    },
    /**
     * @description returns the sliced media array to show only 4 images
     * @returns {Array}
     */
    slicedMedia() {
      return this.post.media ? this.post.media.slice(0, 4) : [];
    },
  },
};
</script>

<style scoped>
/*overlay on last image*/
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: all 0.3s ease-in-out;
}
</style>
