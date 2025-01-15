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
              {{ exception.user.name + " " + exception.user.last_name }}
            </h4>
          </div>
        </div>

        <ExceptionDetails :exception="exception" :last_freez="last_freez" :last_exam="last_exam"
          :last_exceptional_freez="last_exceptional_freez" />
        <hr />

        <div class="p-2">
          <button type="button" @click="() => { show_marks = !show_marks; }"
            class="mb-3 btn bg-white text-dark border-dark w-100 d-flex justify-content-between">
            <h5>
              انجاز السفير خلال لأسابيع الأربعة الماضبة
              <span class="material-symbols-outlined align-middle me-1">
                query_stats
              </span>

            </h5>
            <span class="material-symbols-outlined">
              {{ show_marks ? "visibility_off" : "visibility" }}
            </span>
          </button>
          <Marks v-if="show_marks" :marks="ambassadorMarks" />
        </div>

        <Decision :exception="exception" :authInGroup="authInGroup" :weeks="weeks"
          @update_exception="updateException" />

        <!-- START NOTES -->
        <Note v-if="allowedToAddNotes" />
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
import CancelException from './CancelException';
import ExceptionDetails from './ExceptionDetails';
import Decision from './Decision';
import Note from './Note';
import Marks from '@/components/user/Achievement/4WeeksMarks.vue';
import helper from "@/utilities/helper";


export default {
  name: "List One Exception",
  components: {
    ExceptionDetails,
    CancelException,
    Marks,
    Decision,
    Note,
  },
  props: {
    exception: { type: Object },
    last_freez: { type: Object },
    last_exam: { type: Object },
    last_exceptional_freez: { type: Object },
    authInGroup: { type: Object },
    weeks: { type: Object },
    ambassadorMarks: { type: Object }
  },
  data() {
    return {
      message: null,
      loader: false,
      selectedWeek: null,
      selectedWeekError: "",
      selectedWeekTitle: '',
      show_marks: false,
    };
  },
  computed: {
    auth() {
      return this.$store.getters.getUser;
    },
    allowedToAddNotes() {
      if (this.authInGroup) {
        const groupAdministrators = ['admin', 'consultant', 'advisor', 'supervisor', 'leader']
        return groupAdministrators.includes(this.authInGroup.user_type)
      }
      return false;
    }
  },

  methods: {
    ...helper,
    updateException() {
      this.$emit("update_exception");
    },
  },
};
</script>