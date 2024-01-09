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
      <div class="iq-card-body p-4">
        <div class="image-block text-center">
          <img
            src="@/assets/images/main/left-timer.png"
            class="img-fluid rounded w-75"
            alt="blog-img"
          />
        </div>
      </div>
      <div class="col-12 bg-white pt-2">
        <div class="sign-in-from">
          <form
            class="mt-2"
            v-for="(day, index) in weekDays"
            :key="day.date"
            :id="day.date"
            @submit.prevent="submit(index)"
          >
            <div class="row">
              <div class="col-sm-12 col-md-5">
                <div class="form-group">
                  <label
                    for="hours"
                    class="d-block mb-1"
                    style="font-weight: bold"
                    >اليوم/التاريخ</label
                  >
                  <div class="input-group">
                    <span class="text-primary me-2" style="font-weight: bold">{{
                      day.name
                    }}</span>
                    <input
                      type="string"
                      v-model="day.date"
                      :disabled="true"
                      class="form-control mb-0"
                      id="date"
                      placeholder="ادخل التاريخ"
                    />
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-5">
                <div class="form-group">
                  <label
                    class="d-block mb-1"
                    for="minutes"
                    style="font-weight: bold"
                    >الدقائق</label
                  >
                  <input
                    :value="day.minutes"
                    type="number"
                    min="1"
                    class="form-control mb-0"
                    id="minutes"
                    placeholder="ادخل عدد الدقائق"
                    :disabled="loader"
                    @change="changeMinutes(index, $event.target.value)"
                  />

                  <small style="color: red" v-if="errors[index]">
                    {{ errors[index] }}
                  </small>
                </div>
              </div>

              <div
                class="col-sm-12 col-md-2 d-flex justify-content-end align-items-center"
              >
                <button
                  type="submit"
                  class="btn btn-primary me-2"
                  style="height: fit-content"
                  :disabled="loader"
                >
                  حفظ
                </button>
              </div>
            </div>

            <div class="form-group text-center" v-if="messages[index]?.message">
              <small :class="`text-${messages[index]?.variant}`">
                {{ messages[index]?.message }}
              </small>
            </div>
            <hr />
          </form>
        </div>
      </div>
    </iq-card>

    <WorkingHoursList :workingHours="workingHours" :loading="loadingStats" />
  </div>
</template>

<script>
import GeneralConversationService from "@/API/services/general-conversation.service";
import WorkingHoursList from "@/components/conversation/WorkingHoursList.vue";
import helper from "@/utilities/helper";

export default {
  name: "WorkingHours",
  components: {
    WorkingHoursList,
    // Datepicker,
  },
  async created() {
    await this.getWorkingHours();
    this.fillWeekDays();
  },
  data() {
    return {
      messages: [],
      loader: false,

      workingHours: [],
      loadingStats: false,
      weekDays: [],
      errors: [],
    };
  },
  watch: {
    messages: {
      handler: function (val) {
        val.forEach((item, index) => {
          setTimeout(() => {
            this.messages[index] = {};
          }, 3000);
        });
      },
      deep: true,
    },
  },
  methods: {
    async submit(index) {
      this.messages[index] = {};

      this.loader = true;
      const { minutes, date } = this.weekDays[index];

      if (!minutes) {
        this.errors[index] = "عدد الدقائق يجب أن يكون أكبر من 0";
        this.loader = false;
        return;
      }

      //check if number of minutes is already entered
      const isFound = this.workingHours.find(
        (item) => new Date(item.date).toLocaleDateString() === date,
      );

      if (isFound && Number(isFound.minutes) === Number(minutes)) {
        this.errors[index] = "تم إدخال هذه الدقائق من قبل";
        this.loader = false;
        return;
      }

      try {
        const response = await GeneralConversationService.addWorkingHours(
          date,
          minutes,
        );

        this.messages[index]["message"] = "تم إدخال الدقائق بنجاح";
        this.messages[index]["variant"] = "success";

        this.updateWorkingHours(response);
      } catch (error) {
        this.messages[index]["message"] = "حدث خطأ أثناء إدخال الدقائق";
        this.messages[index]["variant"] = "danger";
      } finally {
        this.loader = false;
      }
    },
    updateWorkingHours(response) {
      const { data } = response;
      const workingHoursId = data.id;

      const isFound = this.workingHours.find(
        (item) => item.id === workingHoursId,
      );

      if (!isFound) {
        this.workingHours.push(data);
      } else {
        this.workingHours = this.workingHours.map((item) => {
          if (item.id === workingHoursId) {
            return data;
          }
          return item;
        });
      }
    },
    async getWorkingHours() {
      if (this.loading) return;

      this.empty = false;
      this.loadingStats = true;
      try {
        const response = await GeneralConversationService.getWorkingHours();

        this.workingHours = response.data;
      } catch (error) {
        helper.toggleErrorToast();
      } finally {
        this.loadingStats = false;
      }
    },
    fillWeekDays() {
      //fill week days as following
      // [ {"name" : "الأجد" , "date" : "31-12-2024"} , {...} ]
      //where sunday is the $store.state.week_start_date

      const weekDays = [];
      const startDate = new Date(this.$store.state.week_start_date);
      startDate.setDate(startDate.getDate() + 1); //add one day to start from sunday
      const endDate = new Date(this.$store.state.main_timer);

      const daysOfWeek = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ];

      let currentDate = startDate;

      while (currentDate <= endDate) {
        const dayName = daysOfWeek[currentDate.getDay()];
        const formattedDate = currentDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        //find if there is already a working hours for this date
        const isFound = this.workingHours.find(
          (item) =>
            new Date(item.date).toLocaleDateString() ===
            currentDate.toLocaleDateString(),
        );

        weekDays.push({
          name: dayName,
          date: formattedDate,
          minutes: isFound ? isFound.minutes : 0,
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      this.weekDays = weekDays;
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

<style lang="scss" scoped>
.vuejs3-datepicker #calendar-div {
  width: 100% !important;
}
</style>
