<template>
  <modal
    ref="galleryModalRef"
    :id="`galleryModal-${post.id}`"
    dialogClass="modal-lg modal-dialog-centered"
    tabindex="-1"
    :aria-labelledby="`galleryModalLabel-${post.id}`"
    :aria-hidden="true"
  >
    <model-header>
      <h4>Gallery {{ post.id }}</h4>
      <a
        href="javascript:void(0);"
        class="lh-1"
        data-bs-dismiss="modal"
        ref="galleryModalCloseBtn"
      >
        <span class="material-symbols-outlined">close</span>
      </a>
    </model-header>
    <model-body style="background-color: black">
      <div class="col-12">
        <div
          :id="`gallery-${post.id}`"
          class="carousel slide"
          data-bs-ride="carousel"
          style="height: 60vh"
        >
          <div class="carousel-indicators">
            <button
              v-for="(media, index) in post.media"
              :key="media.id"
              type="button"
              :data-bs-target="`#gallery-${post.id}`"
              :data-bs-slide-to="index"
              :aria-current="index === currentMediaIndex"
              :aria-label="`Slide ${index + 1}`"
              :class="{ active: index === currentMediaIndex }"
            ></button>
          </div>
          <div class="carousel-inner h-100">
            <div
              class="carousel-item mx-auto h-100"
              v-for="(media, index) in post.media"
              :key="media.id"
              :class="{ active: index === currentMediaIndex }"
            >
              <img
                :src="media.path"
                class="d-block h-100 img-fluid"
                :alt="`Post Image ${index + 1}`"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            :data-bs-target="`#gallery-${post.id}`"
            data-bs-slide="next"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            :data-bs-target="`#gallery-${post.id}`"
            data-bs-slide="prev"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </model-body>
  </modal>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  name: "PostMediaModal",
  inject: ["post"],
  data() {
    return {
      galleryModal: null,
      currentMediaIndex: 0,
    };
  },
  mounted() {
    this.galleryModal = new Modal(this.$refs.galleryModalRef.$el);
  },
  methods: {
    showPostMedia(index) {
      this.galleryModal.show();
      this.currentMediaIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped></style>
