<template>
  <div class="mt-3 mb-3">
    <BaseAvatar
      :profileImg="user.user_profile.profile_picture"
      :profile_id="user.user_profile.id"
      :title="user.gender"
      :gender="user.gender"
      avatarClass="avatar-130 img-fluid rounded-circle"
      containerClass="profile-img"
      :imageStyle="{ border: '4px solid #1d1a55' }"
      dimensions="150x150"
    />
  </div>
  <router-link
    :to="{
      name: 'user.profile',
      params: { user_id: user.id },
    }"
  >
    <h2 class="mb-2 text-center">{{ user.name + " " + user.last_name }}</h2>
  </router-link>
  <p class="text-center mb-4" style="direction: rtl">
    فريق المتابعة
    <span class="mx-2">|</span>
    <router-link
      v-if="followup_team"
      class="text-center"
      :to="{
        name: 'group.group-detail',
        params: { group_id: followup_team.group.id },
      }"
    >
      {{ followup_team.group.name }}</router-link
    >
    <span v-else class="mx-2">لا يوجد</span>
  </p>
  <div class="social-links mt-1 mb-3">
    <ul
      class="social-data-block align-items-center justify-content-center list-inline p-0 m-0"
      style="display: flex !important"
    >
      <li v-for="(role, index) in roles" :key="index" class="text-center pe-2">
        <span class="rounded-pill badge bg-primary px-2">{{
          ARABIC_ROLES[role]
        }}</span>
      </li>

      <li v-if="user.is_excluded" class="text-center pe-2">
        <span class="rounded-pill badge bg-danger px-2"> مستبعد </span>
      </li>
      <li v-if="user.is_hold" class="text-center pe-2">
        <span class="rounded-pill badge bg-secondary px-2"> منسحب </span>
      </li>
    </ul>
  </div>

  <div class="row">
    <h5 class="mb-2 text-start" style="direction: rtl">
      <span class="material-symbols-outlined align-middle"> heart_plus </span>
      تاريخ الانضمام:
      <span>
        {{ format_date(user.created_at) }}
      </span>
    </h5>
  </div>
  <div class="row text-center">
    <h5 class="mb-2 text-start" style="direction: rtl">
      <span class="material-symbols-outlined align-middle"> person_pin </span>
      المسؤول عنه:
      <span v-if="user.parent_id">{{
        user.parent.name + " " + user.parent.last_name
      }}</span>
      <span v-else>لا يوجد</span>
    </h5>
  </div>
  <div class="row text-center">
    <div class="col-12 p-1">
      <h5 class="mb-2 text-start" style="direction: rtl">
        <span class="material-symbols-outlined align-middle">
          sensor_occupied
        </span>
        المسؤول عنهم:
      </h5>
      <ul v-if="in_charge_of.length > 0">
        <li
          style="direction: rtl"
          class="text-start h5"
          v-for="user in in_charge_of"
          :key="user.id"
        >
          {{ user.name + " " + user.last_name }}
        </li>
      </ul>
      <h4 v-else>لا يوجد</h4>
    </div>
  </div>
</template>

<script>
import { ARABIC_ROLES } from "@/utilities/constants";
import moment from "moment";

export default {
  name: "BasicInfo",
  props: {
    user: { type: Object },
    followup_team: { type: Object },
    roles: { type: Array },
    in_charge_of: { type: Array },
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY");
      }
    },
  },
  data() {
    return {
      ARABIC_ROLES,
    };
  },
};
</script>
