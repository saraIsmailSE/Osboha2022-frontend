<template>
  <div class="col-12">
    <div class="card card-block card-stretch card-height blog">
      <div class="card-header">
        <h2>ساعات العمل</h2>
      </div>
      <div class="card-body">
        <div class="blog-description">
          <table class="table w-100">
            <thead>
              <tr>
                <th>التاريخ</th>
                <th>المدة (دقائق)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="2" class="text-center">
                  <img
                    src="@/assets/images/gif/page-load-loader.gif"
                    alt="loader"
                    style="height: 100px"
                  />
                </td>
              </tr>
              <tr v-else-if="empty">
                <td colspan="2" class="text-center">لا يوجد ساعات عمل</td>
              </tr>
              <template
                v-else
                v-for="item in objectToArray(groupedWorking)"
                :key="item.key"
              >
                <tr class="bg-primary text-white">
                  <td colspan="2" class="text-center">
                    <strong>{{ item.key }}</strong>
                  </td>
                </tr>

                <tr v-for="workingHour in item.value" :key="workingHour.id">
                  <td>{{ formatFullDate(workingHour.date, false) }}</td>
                  <td>{{ workingHour.minutes + " دقيقة" }}</td>
                </tr>
                <tr v-if="item.value?.length > 0">
                  <td>
                    <strong>المجموع</strong>
                  </td>
                  <td>
                    <strong>
                      {{ totalByWeek(item.key) + " دقيقة" }}
                    </strong>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <hr />
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
      startWeekTitle: "",
    };
  },
  props: {
    workingHours: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...helper,
    totalByWeek(weekTitle) {
      return this.groupedWorking[weekTitle].reduce((a, b) => a + b.minutes, 0);
    },
  },
  computed: {
    empty() {
      return this.workingHours?.length === 0 && !this.loading;
    },
    total() {
      return this.workingHours?.reduce((a, b) => a + b.minutes, 0) + " دقيقة";
    },
    groupedWorking() {
      return this.workingHours.reduce((acc, item) => {
        const weekTitle = item.week.title;
        if (!acc[weekTitle]) {
          acc[weekTitle] = [];
        }
        acc[weekTitle].push(item);
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
