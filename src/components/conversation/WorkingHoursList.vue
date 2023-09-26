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
import GeneralConversationService from "@/API/services/general-conversation.service";
import helper from "@/utilities/helper";
export default {
  name: "WorkingHoursList",
  async created() {
    await this.getWorkingHours();
  },
  data() {
    return {
      workingHours: [],
      loading: false,
      empty: false,
      total: 0,
    };
  },
  methods: {
    ...helper,
    async getWorkingHours() {
      if (this.loading) return;

      this.empty = false;
      this.loading = true;
      try {
        const response = await GeneralConversationService.getWorkingHours();

        const data = response.data?.workingHours;

        if (!data) {
          this.empty = true;
          return;
        }

        // console.log("data", data);

        // const mappedData = Object.keys(data).map((key) => {
        //   const date = helper.formatFullDate(key, false);
        //   const time = helper.minutesToHoursAndMinutes(data[key][0].minutes);
        //   const id = data[key][0].id;
        //   return { date, time, id };
        // });

        this.workingHours = data;

        this.total = helper.minutesToHoursAndMinutes(
          response.data?.totalMinutes
        );
      } catch (error) {
        console.log("error", error);
        helper.toggleErrorToast();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
