<template>
  <div :class="{ containerClass, 'user-img img-fluid': !noMainClass }">
    <img
      v-if="profileImg"
      :src="resolve_porfile_img(dimensions, profileImg, profile_id)"
      alt="profile-img"
      :class="avatarClass"
      :title="title"
      :style="imageStyle"
    />

    <img
      v-else
      :src="
        resolve_porfile_img(dimensions, `ananimous_${gender}.png`, 'ananimous')
      "
      alt="profile-img"
      :title="title"
      :class="avatarClass"
      :style="imageStyle"
    />
    <slot />
  </div>
</template>

<script>
import profileImagesService from "@/API/services/profile.images.service";
export default {
  name: "BaseAvatar",
  props: {
    profileImg: {
      type: String,
      default: null,
    },
    profile_id: {
      type: Number,
      default: null,
    },
    dimensions: {
      type: String,
      default: "60x60",
    },
    title: {
      type: String,
      default: "user image",
    },
    avatarClass: {
      type: String,
      default: "avatar-40",
    },
    containerClass: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "male",
    },
    imageStyle: {
      type: Object,
      default: null,
    },
    noMainClass: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * get profile picture or cover.
     * @param  {String} size,
     * @param {String} name
     * @param {Int, String} profile_id
     * @return image url
     */
    resolve_porfile_img(size, imageName, profile_id) {
      return profileImagesService.resolve_porfile_img(
        size,
        imageName,
        profile_id
      );
    },
  },
};
</script>
