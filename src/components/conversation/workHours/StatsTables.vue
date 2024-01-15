<template>
  <div>
    <div class="mt-4" v-if="!workingHours.length">
      <div class="p-3 d-flex align-items-center justify-content-center">
        <h5>
          لا يوجد ساعات عمل في هذا
          {{ type == "week" ? "الأسبوع" : "الشهر" }}
        </h5>
      </div>
    </div>
    <div
      class="card mt-4"
      v-for="(week, index) in workingHours"
      :key="week.key"
    >
      <div class="card-title pt-2 px-2 d-flex align-items-center">
        <span class="material-symbols-outlined"> atr </span>
        <h5>{{ week.key }}</h5>
      </div>

      <div class="card-body">
        <div class="blog-description">
          <table class="table w-100 table-bordered">
            <thead>
              <tr class="py-3">
                <th scope="col">الاسم</th>
                <th scope="col">الأحد</th>
                <th scope="col">الاثنين</th>
                <th scope="col">الثلاثاء</th>
                <th scope="col">الأربعاء</th>
                <th scope="col">الخميس</th>
                <th scope="col">الجمعة</th>
                <th scope="col">السبت</th>
                <th scope="col">مجموع الدقائق</th>
                <th scope="col">النقاط الإضافية</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="week?.value?.length">
                <tr
                  v-for="workingHour in week.value"
                  :key="workingHour.user.id"
                >
                  <td>{{ workingHour.user.name }}</td>

                  <!-- print minutes of each day for each user -->
                  <td v-for="day in 7" :key="day" class="text-center">
                    {{
                      !workingHour.days[day]
                        ? "❌"
                        : isMoreThanOneHour(workingHour.days[day])
                          ? "✅"
                          : "✖️"
                    }}
                  </td>

                  <!-- print total minutes of each user -->
                  <td>
                    {{ workingHour.minutes ?? 0 }}
                  </td>

                  <!-- print days that user worked less than one hour -->
                  <td>
                    {{ calculateBonus(workingHour.minutes) }}
                  </td>
                </tr>

                <!-- print total of minutes in minutes format-->
                <tr>
                  <td class="bold">المجموع</td>
                  <td class="bold" :colspan="columns - 3"></td>
                  <td class="bold">
                    {{ totalMinutesInWeek(index) }}
                  </td>
                  <td class="bold">
                    {{ totalBonusInWeek(index) }}
                  </td>
                  <!-- <td class="bold" :colspan="columns - 1">
                                        {{ totalMinutesInWeek(index) }}
                                      </td> -->
                </tr>

                <!-- print total of minutes in hours format-->
                <tr>
                  <td class="bold">المجموع الكلي بالساعات</td>
                  <td class="bold" :colspan="columns - 1">
                    {{ minutesToHoursAndMinutes(totalMinutesInWeek(index)) }}
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td class="bold text-center" :colspan="columns">
                    لا يوجد ساعات عمل
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import helper from "@/utilities/helper";

export default {
  name: "WorkingHoursList",
  data() {
    return {
      columns: 10,
    };
  },
  props: {
    workingHours: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "week",
    },
  },
  computed: {},
  methods: {
    ...helper,
    isMoreThanOneHour(minutes) {
      return minutes >= 60;
    },

    calculateBonus(minutes) {
      //360-419 min => 1pt
      //420-479 min => 2pts
      // >= 480 => 3pts

      if (minutes >= 360 && minutes <= 419) {
        return 1;
      } else if (minutes >= 420 && minutes <= 479) {
        return 2;
      } else if (minutes >= 480) {
        return 3;
      } else {
        return 0;
      }
    },

    totalMinutesInWeek(index) {
      let total = 0;

      this.workingHours[index]?.value?.forEach((user) => {
        total += user.minutes;
      });

      return total;
    },

    totalBonusInWeek(index) {
      let total = 0;

      this.workingHours[index]?.value?.forEach((user) => {
        total += this.calculateBonus(user.minutes);
      });

      return total;
    },
  },
};
</script>
