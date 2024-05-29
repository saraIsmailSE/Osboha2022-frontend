<template>
  <div class="col-sm-12 mt-3 text-center" v-if="exception">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
        <h3 class="text-center mt-3 mb-3">طلب: {{ exception.type.type }}</h3>
      </div>
      <div class="iq-card-body">
        <div class="image-block text-center">
          <div class="profile-img">
            <BaseAvatar :profileImg="exception.user.user_profile.profile_picture"
              :profile_id="exception.user.user_profile.id" :dimensions="'512x512'" :title="exception.user?.name"
              :gender="exception.user?.gender" avatarClass="avatar-130 img-fluid" containerClass="flex-shrink-0" />
            <h4 class="text-center mt-3 mb-3">
              {{ exception.user.name }}
            </h4>
          </div>
        </div>

        <div class="iq-card-body ps-3 pe-3 mt-1">
          <h4 class="mb-2">

            <p class="m-auto">
              <span class="badge" :class="STATUS_CLASS[exception.status]">{{ STATUS[exception.status]
              }}
              </span>
            </p>
          </h4>
          <p class="m-auto">
            تاريخ الطلب: {{ formatFullDate(exception.created_at) }}
          </p>
          <h4 class="mb-2">السبب</h4>
          <p class="m-auto">{{ exception.reason }}</p>
          <h4 class="mb-2">المدة المطلوبة</h4>
          <p class="m-auto">{{ exception.desired_duration }}</p>

          <div v-if="exception.type.type == 'نظام امتحانات - شهري' ||
            exception.type.type == 'نظام امتحانات - فصلي'
            ">
            <h4 class="mb-2">جدول الامتحانات</h4>

            <img class="img-fluid w-75" v-if="exception.media" :src="showMedia(exception.media.id)" />
            <p class="m-auto" v-else>لا يوجد جدول ثابت للامتحانات</p>
          </div>

          <Reviewer :exception="exception" />

          <LastExceptions :last_freez="last_freez" :last_exam="last_exam"
            :last_exceptional_freez="last_exceptional_freez" />

        </div>

        <Decision :exception="exception" :authInGroup="authInGroup" :weeks="weeks"  @update_exception="updateException"/>

        <CancelException :exception="exception" @update_exception="updateException" />

        <div class="d-flex align-items-center mt-3 row">
          <div class="d-inline-block w-100 text-center col-12">
            <a role="button" @click="$router.go(-1)" class="d-block mt-3 mb-3 w-75 mx-auto">
              <span>عودة</span>
              <span class="align-middle material-symbols-outlined">
                keyboard_return
              </span>
            </a>
          </div>
        </div>
      </div>
    </iq-card>
  </div>
</template>
<script>
import LastExceptions from "./LastExceptions"
import CancelException from './CancelException';
import Decision from './Decision';
import Reviewer from './Reviewer';
import helper from "@/utilities/helper";
import mediaService from "@/API/services/media.services";
import { STATUS, STATUS_CLASS } from "@/utilities/constants";

const greaterThanMinusOne = (value) => value > -1;

export default {
  name: "List One Exception",
  components: {
    LastExceptions,
    CancelException,
    Decision,
    Reviewer,
  },
  props: {
    exception: { type: Object },
    last_freez: { type: Object },
    last_exam: { type: Object },
    last_exceptional_freez: { type: Object },
    authInGroup: { type: Object },
    weeks: { type: Object },
  },
  data() {
    return {
      message: null,
      loader: false,
      selectedWeek: null,
      selectedWeekError: "",
      selectedWeekTitle: '',
      STATUS_CLASS,
      STATUS,
    };
  },
  computed: {
    auth() {
      return this.$store.getters.getUser;
    },
  },

  methods: {
    ...helper,
    updateException() {
      this.$emit("update_exception");
    },
    /**
     * get exam media.
     * @param  {int} media id,
     * @return image url
     */
    showMedia(id) {
      return mediaService.show(id);
    },
  },
};
</script>
