<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <div class="header-title">
              <h4 class="card-title">
                إحصائيات التحويل العام || {{ "statistics.week?.title" }}
              </h4>
            </div>
          </div>
          <div class="card-body">
            <div class="col-sm-12 text-center" v-if="loading">
              <img src="@/assets/images/gif/loader-3.gif" alt="loader" />
            </div>

            <div class="col-12" v-else>
              <div class="row">
                <div class="text-center w-100 col-12 col-md-12 col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <div
                        class="d-flex align-items-center justify-content-center"
                      >
                        <div
                          class="border rounded avatar-55 d-flex align-items-center justify-content-center"
                        >
                          <img
                            class="img-fluid"
                            src="@/assets/images/gif/chart.gif"
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="mt-4">
                        <h3 class="text-center">
                          {{ 546487 }}
                        </h3>
                        <p class="mb-0 text-center">مجموع الساعات</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GeneralConversationService from "@/API/services/general-conversation.service";
import helper from "@/utilities/helper";
export default {
  name: "WorkingHoursStats",
  async created() {
    await this.getStatistics();
  },

  data() {
    return {
      statistics: null,
      loading: false,
    };
  },
  methods: {
    ...helper,
    async getStatistics() {
      this.loading = true;

      try {
        const respponse =
          await GeneralConversationService.getWorkingHoursStatistics();
        console.log(respponse);
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
