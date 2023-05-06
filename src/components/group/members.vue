<template>
  <div class="group-member d-flex align-items-center mt-md-0 mt-3 w-100">
    <div class="iq-media-group me-3 col-6" v-if="members.length > 0">
      <router-link
        class="iq-media"
        :to="{ name: 'group.group-members', params: { group_id: group_id } }"
      >
        <img
          src="@/assets/images/main/more_users.png"
          alt="profile-img"
          class="img-fluid avatar-40 rounded-circle"
          :title="`عرض الكل`"
        />
      </router-link>
      <router-link
        class="iq-media"
        v-for="member in members.slice(0, 5)"
        :key="member.id"
        :to="{ name: 'user.profile', params: { user_id: member.id } }"
      >
        <img
          v-if="member.user_profile.profile_picture"
          :src="
            resolve_porfile_img(
              '60x60',
              member.user_profile.profile_picture,
              member.user_profile.id
            )
          "
          alt="profile-img"
          class="img-fluid avatar-40 rounded-circle"
          :title="member.name"
        />

        <img
          v-else
          :src="
            resolve_porfile_img(
              '60x60',
              'ananimous_' + member.gender + '.png',
              'ananimous'
            )
          "
          alt="profile-img"
          :title="member.name"
          class="img-fluid avatar-40 rounded-circle"
        />
      </router-link>
    </div>
    <div class="iq-media-group me-3 col-6" v-else>
      <p>لا يوجد أعضاء</p>
    </div>

    <!-- DISPLAY FOR ADVISOR -->
    <div
      class="d-flex align-items-center mt-3 col-6"
      v-if="authInGroup && authInGroup.user_type != 'ambassador'"
      v-click-outside="onClickOutside"
    >
      <div
        class="d-inline-block w-100 text-center"
        @click="show = !show"
        role="button"
      >
        <span class="align-middle material-symbols-outlined"> settings </span>
        <span>اعدادت المجموعة</span>
      </div>

      <div
        :class="`dropdown-menu dropdown-menu-right ${show ? 'show' : ''}`"
        aria-labelledby="dropdownMenuButton"
        style=""
      >
        <router-link
          :to="{
            name: 'group.requestAmbassadors',
            params: { group_id: group_id },
          }"
        >
          <a role="button" class="dropdown-item d-flex align-items-center">
            <span class="material-symbols-outlined me-2 md-18">
              diversity_1
            </span>
            طلب سفراء
          </a>
        </router-link>

        <router-link
          :to="{
            name: 'group.addMemeber',
            params: { group_id: group_id },
          }"
        >
          <a role="button" class="dropdown-item d-flex align-items-center">
            <span class="material-symbols-outlined me-2 md-18">
              person_add
            </span>
            اضافه عضو
          </a>
        </router-link>
      </div>
    </div>
    <!-- DISPLAY FOR ADVISOR -->
  </div>
</template>
<script>
import profileImagesService from "@/API/services/profile.images.service";
import vClickOutside from "click-outside-vue3";

export default {
  name: "card",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    members: {
      type: [Object],
      required: true,
    },
    authInGroup: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {
      show: false,
      group_id: this.$route.params.group_id,
    };
  },
  methods: {
    /**
     * get profile picture or cover.
     *  @param  image size, image name, profile id
     * @return image url
     */
    resolve_porfile_img(size, imageName, profile_id) {
      return profileImagesService.resolve_porfile_img(
        size,
        imageName,
        profile_id
      );
    },

    onClickOutside() {
      this.show = false;
    },
  },
};
</script>
