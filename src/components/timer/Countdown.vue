<template>
  <div class="card">
    <div class="card-header rounded-0 p-1" style="background-color: #1d1a55">
      <h5 class="text-center text-light mt-0" style="direction: rtl !important">
        <div class="d-flex justify-content-center">
          <span
            role="button"
            class="material-symbols-outlined"
            @click="setExpand()"
          >
            {{ expand ? "expand_less" : "expand_more" }}
          </span>

          الأسبوع {{ week.title }}
        </div>
      </h5>
    </div>
    <div
      class="card-body row d-flex justify-content-center m-auto"
      style="box-shadow: none"
      v-if="expand"
    >
      <vue-countdown
        v-if="!expired"
        :time="time"
        v-slot="{ days, hours, minutes, seconds }"
        @end="onCountdownEnd"
      >
        <table class="text-center" style="direction: rtl !important">
          <thead>
            <tr class="font-weight-bold display-3 border-bottom">
              <th>{{ seconds }}</th>
              <th>{{ minutes }}</th>
              <th>{{ hours }}</th>
              <th>{{ days }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="w-25">ثانية</td>
              <td class="w-25">دقيقة</td>
              <td class="w-25">ساعة</td>
              <td class="w-25">يوم</td>
            </tr>
            <tr>
              <td colspan="4">
                <img
                  v-if="timer_type == 'main_timer'"
                  class="mt-3 w-100"
                  src="@/assets/images/main/main_timer.gif"
                />
                <img
                  v-if="timer_type == 'audit_timer'"
                  class="mt-3 w-75"
                  src="@/assets/images/main/audit_timer.gif"
                />
                <img
                  v-if="timer_type == 'modify_timer'"
                  class="mt-3 w-100"
                  src="@/assets/images/main/modify_timer.gif"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </vue-countdown>

      <div v-else class="alert alert-danger text-center" role="alert">
        انتهى الوقت
      </div>
    </div>
  </div>
</template>
<script>
import VueCountdown from "@chenfengyuan/vue-countdown";
import UserInfoService from "@/Services/userInfoService";

export default {
  name: "Countdown",
  created() {
    const riyadh = new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" });
    this.now = new Date(riyadh);
    if (this.timer_type == "main_timer") {
      this.date = new Date(this.week.main_timer);
    } else if (this.timer_type == "audit_timer") {
      this.date = new Date(this.week.audit_timer);
    } else if (this.timer_type == "modify_timer") {
      this.date = new Date(this.week.modify_timer);
    }
    this.expired = this.time < 0;
  },
  components: {
    VueCountdown,
  },
  props: {
    week: {
      type: [Object],
      required: true,
    },
    timer_type: {
      type: [String],
    },
  },

  data() {
    return {
      expand: true,
      date: null,
      now: null,
      expired: true,
    };
  },
  methods: {
    setExpand() {
      this.expand = !this.expand;
    },
    onCountdownEnd: function () {
      this.expired = true;
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    isAdvisor() {
      return UserInfoService.hasRole(this.user, "advisor");
    },

    time() {
      if(this.isAdvisor && this.timer_type == "audit_timer"){
        return  (this.date.getTime() + (26 * 60 * 60 * 1000) )- this.now;
      }
      return this.date - this.now;
    },
  },
  watch: {
    expand() {
      this.now = new Date();
      this.expired = this.time < 0;
    },
  },
};
</script>
