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
                <th scope="col">التاريخ</th>
                <th scope="col">المدة</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="2" class="text-center">
                  <img
                    src="@/assets/images/page-img/page-load-loader.gif"
                    alt="loader"
                    style="height: 100px"
                  />
                </td>
              </tr>
              <tr v-if="empty">
                <td colspan="2" class="text-center">لا يوجد ساعات عمل</td>
              </tr>
              <tr v-for="item in workingHours" :key="item.id">
                <td>{{ formatFullDate(item.created_at, false) }}</td>

                <td>{{ minutesToHoursAndMinutes(item.minutes) }}</td>
              </tr>
              <tr v-if="workingHours.length > 0">
                <td>
                  <strong>المجموع</strong>
                </td>
                <td>
                  <strong>
                    {{ total }}
                  </strong>
                </td>
              </tr>
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
      return this.workingHours?.length === 0 && !this.loading;
    },
    total() {
      return this.minutesToHoursAndMinutes(
        this.workingHours?.reduce((a, b) => a + b.minutes, 0),
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
