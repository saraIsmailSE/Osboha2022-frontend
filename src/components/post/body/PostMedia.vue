<template>
  <div class="user-post" v-if="slicedMedia">
    <div class="row g-2">
      <div
        class="position-relative"
        :class="col"
        v-for="(image, index) in slicedMedia"
        :key="image.path"
        @click.prevent="showPostMedia(index)"
      >
        <img
          :src="image.path"
          alt="post-image"
          class="rounded w-100 h-100 post-image"
          style="object-fit: cover"
          v-if="image.type == 'image'"
        />

        <video class="w-75" controls v-if="image.type == 'video'">
          <source :src="image.path" type="video/mp4" />
        </video>

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

  <!--Post media modal-->
  <PostMediaModal ref="postMediaModal" />
</template>

<script>
import PostMediaModal from "@/components/post/modals/PostMediaModal.vue";
export default {
  name: "PostMedia",
  components: {
    PostMediaModal,
  },
  inject: ["post"],
  // emits: ["showPostMedia"],
  data() {
    return {
      showControls: false,
      isPlaying: false,
    };
  },

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
  methods: {
    /**
     * @description: show the gallery modal
     * @param index: the index of the media to show
     * @returns {void}
     */
    showPostMedia(index) {
      this.$refs.postMediaModal.showPostMedia(index);
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
