<template>
  <div :class="`right-sidebar-mini ${miniClass} data-scrollbar right-sidebar-team`" v-click-outside="onClickOutside">
    <div class="right-sidebar-panel p-0">
      <div class="card shadow-none">
        <div class="card-body p-0">
          <div class="media-height p-2" data-scrollbar="init">
            <div class="card d-flex align-items-center mb-4">
              <img src="@/assets/images/main/left-timer.png" class="card-img-top" alt="current reading" />
              <div class="card-body row d-flex justify-content-center card-shadow" v-if="timer && !timer.is_vacation">
                <h4 class="card-title" style="direction: rtl">
                  الأسبوع:
                  {{ timer.title }}
                </h4>

                <vue-countdown :time="time" v-slot="{ days, hours, minutes, seconds }" @end="onCountdownEnd">
                  <table class="text-center w-100" style="direction: rtl !important">
                    <thead>
                      <tr class="font-weight-bold display-6 border-bottom">
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
                    </tbody>
                  </table>
                </vue-countdown>
              </div>

              <div class="card-body row d-flex justify-content-center card-shadow" v-else>
                <h4 class="card-title" style="direction: rtl">
                  الأسبوع:
                  {{ timer.title }}
                </h4>
                <p>اجازة</p>
              </div>
            </div>
          </div>
          <div class="right-sidebar-toggle text-white mt-3 d-flex toggel-btn" @click="toggleMini">
            <span class="material-symbols-outlined"> acute </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueCountdown from "@chenfengyuan/vue-countdown";
import vClickOutside from "click-outside-vue3";

export default {
  name: "Timer Sidebar",
  created() {
    const riyadh = new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" });
    this.now = new Date(riyadh);
    this.date = new Date(this.timer.main_timer);
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    VueCountdown,
  },
  props: {
    timer: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {
      miniClass: "right-sidebar",
      rightSideBarMini: true,
    };
  },
  methods: {
    toggleMini() {
      this.rightSideBarMini = !this.rightSideBarMini;
      this.checkRightSideBar();
    },
    checkRightSideBar() {
      const body = document.querySelector("body");
      if (this.rightSideBarMini) {
        this.miniClass = "right-sidebar";
        body.classList.add("right-sidebar-close");
      } else {
        this.miniClass = "";
        body.classList.remove("right-sidebar-close");
      }
    },
    onCountdownEnd: function () {
      // re-read week info [to start new week]
    },
    onClickOutside() {
      this.rightSideBarMini = true;
      const body = document.querySelector("body");
      this.miniClass = "right-sidebar";
      body.classList.add("right-sidebar-close");
    },

  },
  computed: {
    time() {
      return this.date - this.now;
    },
  },
};
</script>
<style scoped>
/* .right-sidebar-team {
  top: 14.5rem !important;
} */
.right-sidebar-team {
  top: 10.5rem !important;
}

.toggel-btn {
  background-color: #1d1a55;
}

.card-shadow {
  box-shadow: none;
}
</style>