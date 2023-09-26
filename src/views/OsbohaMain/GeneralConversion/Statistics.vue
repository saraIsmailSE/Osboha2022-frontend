<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12" v-if="statistics">
        <div class="card">
          <div class="card-header">
            <div class="header-title">
              <h4 class="card-title">إحصائيات التحويل العام || {{ statistics.week?.title }}</h4>
            </div>
          </div>
          <div class="card-body">
            <div class="col-sm-12 text-center" v-if="loading">
              <img src="@/assets/images/gif/loader-3.gif" alt="loader" />
            </div>

            <div class="col-12">
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
                          {{ statistics.total }}
                        </h3>
                        <p class="mb-0 text-center">كل الأسئلة</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-md-6 col-lg-6">
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
                            src="@/assets/images/gif/applause.gif"
                            alt="screen-animated"
                          />
                        </div>
                      </div>
                      <div class="mt-4">
                        <h3 class="text-center">
                          {{ statistics.totalSolved }}
                        </h3>
                        <p class="mb-0 text-center">عدد الأسئلة المحلولة</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-md-6 col-lg-6">
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
                            src="@/assets/images/gif/book.gif"
                            alt="book-animated"
                          />
                        </div>
                      </div>
                      <div class="mt-4">
                        <h3 class="text-center">
                          {{ statistics.totalClosed }}
                        </h3>
                        <p class="mb-0 text-center">عدد الأسئلة المغلقة</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
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
                            src="@/assets/images/gif/person.gif"
                            alt="person-animated"
                          />
                        </div>
                      </div>
                      <div class="mt-4">
                        <h3 class="text-center">
                          {{ statistics.totalOpened }}
                        </h3>
                        <p class="mb-0 text-center">عدد الأسئلة المفتوحة</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-md-6 col-lg-6">
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
                            src="@/assets/images/gif/screen.gif"
                            alt="screen-animated"
                          />
                        </div>
                      </div>
                      <div class="mt-4">
                        <h3 class="text-center">
                          {{ statistics.totalSolvedAfter12hrs }}
                        </h3>
                        <p class="mb-0 text-center">
                          عدد الأسئلة المحلولة بعد 12 ساعة
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-md-6 col-lg-6">
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
                            src="@/assets/images/gif/thesis.gif"
                            alt="write-animated"
                          />
                        </div>
                      </div>
                      <div class="mt-4">
                        <h3 class="text-center">
                          {{ statistics.totalSolvedWithin12hrs }}
                        </h3>
                        <p class="mb-0 text-center">
                          الأسئلة المحلولة خلال 12 ساعة
                        </p>
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
  name: "GeneralConversationStatistics",
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
        const response = await GeneralConversationService.getStatistics();

        console.log(response);
        this.statistics = response.data;
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
