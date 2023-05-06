<template>
  <div class="user-img img-fluid" :class="containerClass">
    <img
      v-if="profileImg"
      :src="resolve_porfile_img(dimensions, profileImg, profile_id)"
      alt="profile-img"
      class="rounded-circle"
      :class="avatarClass"
      :title="title"
      :style="imageStyle"
    />

    <img
      v-else
      :src="
        resolve_porfile_img(
          dimensions,
          'ananimous_' + gender + '.png',
          'ananimous'
        )
      "
      alt="profile-img"
      :title="title"
      class="rounded-circle"
      :class="avatarClass"
      :style="imageStyle"
    />
  </div>
</template>

<script>
import profileImagesService from "@/API/services/profile.images.service";
export default {
  name: "UserAvatar",
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
