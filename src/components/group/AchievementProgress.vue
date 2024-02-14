<template>
  <li class="d-flex align-items-center p-3" v-if="ambassador" :style="`cursor: ${cursorStyle(ambassador.mark)}`">
    <BaseAvatar :profileImg="ambassador.user_profile.profile_picture" :profile_id="ambassador.user_profile.id"
      :title="ambassador.name" :gender="ambassador.gender" avatarClass="rounded-circle avatar-40" />
    <div class="d-flex align-items-center w-100 row">
      <div class="col-lg-3 col-md-3 col-sm-12 ms-3">
        <h6 class="d-inline-block">
          <strong>{{ ambassador.name }} </strong>
        </h6>
      </div>
      <div class="col-lg-5 col-md-5 col-sm-12 form-check mt-2">
        <div class="d-block w-100">
          <div class="progress">
            <div v-if="ambassador.mark.length > 0 && ambassador.mark[0].is_freezed" :class="`${markClass(-1)}`"
              class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="90" aria-valuemin="0"
              aria-valuemax="100" :style="`width: ${100}%;`"></div>
            <div v-else :class="`${markClass(getMark(ambassador.mark))}`" class="progress-bar progress-bar-striped"
              role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"
              :style="`width: ${getMark(ambassador.mark)}%;`"></div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 text-center">
        <router-link :to="{
          name: route_to,
          params: { ambassador_id: ambassador.id, week_id: week_id },
        }">
          <button class="badge ms-0 ms-md-3 my-1 my-md-0 w-75 text-center border-0 outline-none position-relative" :class="{
            'bg-primary': ambassador.mark.length > 0,
            'd-none': ambassador.mark.length == 0,
          }" :style="`cursor: ${cursorStyle(ambassador.mark)}`">
            عرض

            <span v-if="ambassador.mark[0] && ambassador.mark[0].pending_thesis_count.length > 0 && show_pending_count"
              class="mt-1 fs-6 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ ambassador.mark[0].pending_thesis_count[0].pending_thesis }}
            </span>

          </button>
        </router-link>
        <OtherActions v-if="ambassador.mark.length == 0" :user="ambassador" />

      </div>
    </div>
  </li>
</template>

<script>
import OtherActions from "@/components/group/OtherActions";

export default {
  name: "Achievement Progress",
  components: {
    OtherActions,
  },
  props: {
    ambassador: {
      type: [Object],
      required: true,
    },
    week_id: {
      type: [Number],
      required: true,
    },
    route_to: {
      type: [String],
      default: 'group.listOneAmbassadorReading',
    },
    show_pending_count: {
      type: [Boolean],
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    /**
     * return mark color class.
     *  @param  mark
     * @return class
     */
    markClass(mark) {
      switch (mark) {
        case -1:
          return "freeze";
        case 100:
          return "full-mark";

        case 0:
          return "zero-mark";

        default:
          return "incomplete";
      }
    },

    getMark(mark) {
      if (mark?.length > 0) {
        return mark[0].reading_mark + mark[0].writing_mark + mark[0].support;
      }
      else {
        return 0
      }
    },

    cursorStyle(mark) {
      if (mark?.length == 0) {
        return "not-allowed";
      }
      return "pointer";
    },
  },
};
</script>

<style scoped>
.full-mark {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-primary-rgb),
      var(--bs-bg-opacity)) !important;
}

.zero-mark {
  width: 100% !important;
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-danger-rgb), var(--bs-bg-opacity)) !important;
}

.incomplete {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-warning-rgb),
      var(--bs-bg-opacity)) !important;
}

.freeze {
  --bs-bg-opacity: 1;
  background-color: #223e7f !important;
}
</style>
