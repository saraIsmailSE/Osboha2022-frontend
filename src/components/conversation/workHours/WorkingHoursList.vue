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
              <template v-else v-for="item in workingHours" :key="item.key">
                <tr class="bg-primary text-white">
                  <td colspan="2" class="text-center">
                    <strong>{{ item.key }}</strong>
                  </td>
                </tr>

                <tr
                  v-for="workingHour in item.value?.workingHours"
                  :key="workingHour.id"
                >
                  <td>{{ formatFullDate(workingHour.date, false) }}</td>
                  <td>{{ workingHour.minutes + " دقيقة" }}</td>
                </tr>
                <tr v-if="item.value?.workingHours?.length > 0">
                  <td>
                    <strong>المجموع</strong>
                  </td>
                  <td>
                    <strong>
                      {{ item.value?.totalMinutes + " دقيقة" }}
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
  },
  computed: {
    empty() {
      return Object.keys(this.workingHours).length === 0 && !this.loading;
    },
  },
};
</script>

<style lang="scss" scoped></style>
