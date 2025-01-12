<template>
  <div class="col-sm-12 mt-3">
    <iq-card class="iq-card">
      <div
        class="iq-card-header-toolbar d-flex text-center align-items-center flex-column mx-auto"
      >
        <h1 class="text-center mt-3 mb-3">إدخال ساعات العمل</h1>
        <div class="alert alert-warning">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" size="xl" />
          <span>
            سيتم حفظ الساعات المدخلة في اليوم الواحد كما هي بدون زيادة تراكمية,
            لذلك يرجى الإدخال بشكل دقيق
          </span>
        </div>
      </div>
      <!-- <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img
            src="@/assets/images/main/left-timer.png"
            class="img-fluid rounded w-75"
            alt="blog-img"
          />
        </div>
      </div> -->

      <!-- week form  -->
      <div class="row my-2 px-4 w-100">
        <!-- <div class="col-sm-12 col-md-6" v-for="week in weeks" :key="week.id"> -->
        <!-- <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="date"
              :id="week.id"
              :value="week.id"
              v-model="selectedWeek"
            />
            <label class="form-check-label" :for="week.id">
              <span class="bold text-primary">
                {{
                  `${
                    parseInt(week.id) ===
                    parseInt($store.state.current_week?.id)
                      ? "الأسبوع الحالي: "
                      : "الأسبوع السابق: "
                  }`
                }}
              </span>
              <span>
                {{ week.title }}
              </span>
            </label>
          </div> -->

        <nav class="d-flex justify-content-center mt-2">
          <div
            className="nav nav-tabs justify-content-start"
            id="weeks-tab"
            role="tablist"
          >
            <button
              v-for="week in weeks"
              :key="week.id"
              :className="`nav-link ${selectedWeek == week.id ? 'active' : ''}`"
              :id="`nav-${week.id}-tab`"
              data-bs-toggle="tab"
              :data-bs-target="`#nav-${week.id}`"
              type="button"
              role="tab"
              aria-controls="nav-featured"
              aria-selected="false"
              @click="
                () => {
                  this.selectedWeek = week.id;
                }
              "
            >
              {{
                `${
                  parseInt(week.id) === parseInt($store.state.current_week?.id)
                    ? "الأسبوع الحالي: "
                    : "الأسبوع السابق: "
                } ${week.title}`
              }}
            </button>
          </div>
        </nav>

        <!-- </div> -->
      </div>

      <!-- header  -->
      <!-- <div class="col-12 my-2" v-if="selectedWeekData">
        <h3
          class="bold text-primary text-center d-flex justify-content-center align-items-center gap-2"
        >
          <span class="material-symbols-outlined"> atr </span>
          {{
            `${isCurrentWeek ? "الأسبوع الحالي" : "الأسبوع السابق"}: ${
              selectedWeekData?.title
            }`
          }}
          <span class="material-symbols-outlined"> atr </span>
        </h3>
      </div> -->

      <!-- Loading state -->
      <div
        class="col-12 d-flex justify-content-center align-items-center"
        v-if="loadingStats"
      >
        <!-- <img
          :src="require('@/assets/images/gif/page-load-loader.gif')"
          alt="loader"
          style="height: 100px"
        /> -->
        <img src="@/assets/images/gif/loader-3.gif" alt="loader" />
      </div>

      <!-- days form -->
      <DaysForm
        v-else
        :weekDays="weekDays"
        @changeMinutes="changeMinutes"
        @getWorkingHours="getWorkingHours"
      />
    </iq-card>

    <WorkingHoursList :workingHours="workingHours" :loading="loadingStats" />
  </div>
</template>

<script>
import WorkingHourService from "@/API/services/working-hour.service";
import WorkingHoursList from "@/components/conversation/workHours/WorkingHoursList.vue";
import helper from "@/utilities/helper";
import DaysForm from "@/components/conversation/workHours/DaysForm.vue";

export default {
  name: "WorkingHours",
  components: {
    WorkingHoursList,
    DaysForm,
  },
  async created() {
    const queryParams = this.$route.query;

    if (!queryParams.week) {
      this.$router.push({
        query: { week: this.$store.state.current_week?.id },
      });
    } else {
      this.selectedWeek = queryParams.week;
    }

    await this.getWorkingHours();
    this.fillWeekDays();
  },

  data() {
    return {
      weeks: [],
      workingHours: [],
      loadingStats: false,
      weekDays: [],
      selectedWeek: "",
    };
  },
  watch: {
    async selectedWeek() {
      this.$router.push({ query: { week: this.selectedWeek } });
      this.weekDays = [];
      this.workingHours = [];
      await this.getWorkingHours();
    },
    workingHours() {
      this.fillWeekDays();
    },
  },
  computed: {
    selectedWeekData() {
      return this.weeks.find(
        (week) => parseInt(week.id) === parseInt(this.selectedWeek),
      );
    },
    isCurrentWeek() {
      return (
        parseInt(this.selectedWeek) ===
        parseInt(this.$store.state.current_week?.id)
      );
    },
  },
  methods: {
    ...helper,

    async getWorkingHours() {
      if (this.loadingStats) return;

      this.weekDays = [];
      this.loadingStats = true;
      try {
        const response = await WorkingHourService.getWorkingHours(
          this.selectedWeek,
        );

        this.workingHours = response.data?.workingHours;
        this.weeks = response.data?.weeks;
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loadingStats = false;
      }
    },

    fillWeekDays() {
      this.weekDays = [];

      const arabicWeekDays = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ];

      //get date part only
      const startDate = new Date(this.selectedWeekData?.created_at);
      const endDate = new Date(this.selectedWeekData?.main_timer);
      const options = {
        timeZone: "Asia/Riyadh",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

      let countSundays = 0;
      while (startDate < endDate) {
        //check if sunday is repeated, skip it
        if (startDate.getDay() === 0) {
          console.log(countSundays);
          if (countSundays > 0) {
            startDate.setDate(startDate.getDate() + 1);
            continue;
          }
          countSundays++;
        }

        //format date to be mm/dd/yyyy
        const date = startDate.toLocaleDateString("en-US", options);
        //get the day name in arabic
        const dayName = arabicWeekDays[startDate.getDay()];
        //get the minutes for the day
        const minutes = this.workingHours.find(
          (wh) => wh.date === date,
        )?.minutes;

        this.weekDays.push({
          name: dayName,
          //format the date to be dd-mm-yyyy
          date: startDate.toLocaleDateString("en-CA", options),
          minutes: minutes ?? 0,
          week_id: this.selectedWeek,
        });

        startDate.setDate(startDate.getDate() + 1);
      }
    },

    changeMinutes(index, value) {
      this.weekDays = this.weekDays.map((day, i) => {
        if (i === index) {
          return { ...day, minutes: value };
        }
        return day;
      });
    },
  },
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}

.material-symbols-outlined {
  font-variation-settings:
    "FILL" 0,
    "wght" 700,
    "GRAD" 0,
    "opsz" 24;
}
</style>
