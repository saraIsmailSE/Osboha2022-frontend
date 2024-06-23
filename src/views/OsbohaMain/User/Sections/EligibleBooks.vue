<template>
  <div class="row">
    <div class="col-sm-12">
      <iq-card>
        <div class="iq-card-body profile-page p-0">
          <div class="profile-header">
            <div class="cover-container">
              <img src="@/assets/images/main/book-banner.png" alt="profile-bg" class="rounded img-fluid" />
            </div>
          </div>
        </div>
      </iq-card>
      <iq-card class="iq-card">
        <div class="iq-card-body p-0">
          <div class="user-tabing">
            <tab-nav :pills="true" id="pills-tab"
              class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
              <tab-nav-items class="w-50 p-0" :active="true" id="pills-friend-tab" href="#last-achev"
                ariaControls="pills-contact" role="tab" :ariaSelected="true" title="الانجاز الأخير" />
              <tab-nav-items class="w-50 p-0" :active="false" id="pills-profile-tab" href="#all-achev"
                ariaControls="pills-contact" role="tab" :ariaSelected="false" title="كافة الانجازات" />
            </tab-nav>
          </div>
        </div>
      </iq-card>
    </div>
    <div class="col-12">
      <div class="tab-content">
        <!-- LAST Achievement -->
        <tab-content-item :active="true" id="last-achev" aria-labelled-by="last-achev">
          <div v-if="last_achievement">
            <div v-if="last_achievement.status == 'rejected'">
              <iq-card>
                <template v-slot:body>
                  <h2>انجاز مرفوض </h2>
                  <div class="tab-content">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="card card-block card-stretch card-height blog-list">
                          <div class="card-body">
                            <div class="row align-items-center">
                              <div class="col-md-6">
                                <div class="image-block">
                                  <img src="@/assets/images/main/export-congrats.png" class="img-fluid rounded w-100"
                                    alt="blog-img" />
                                </div>
                              </div>
                              <h5 class="text-center mt-3 mb-3 mx-2">تم رفض انجازك للاسباب التالية</h5>

                              <p class="text-center mt-3 mb-3 mx-2">
                                {{ last_achievement.reviews }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </iq-card>
            </div>
            <div v-else>
              <iq-card>
                <template v-slot:body v-if="last_achievement.status == 'finished' && statistics">
                  <h2>احصائيات</h2>
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <div class="mb-3">
                          <div class="d-flex justify-content-between mt-2 text-dark">
                            <h6>المعدل العام</h6>
                            <small>{{ statistics.total ? statistics.total : 0 }}%</small>
                          </div>
                          <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                            <progressbar className="bg-success" :style="{ width: statistics.total + '%' }"
                              aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></progressbar>
                          </b-progress>
                        </div>
                        <div class="mb-3">
                          <div class="d-flex justify-content-between mt-2 text-dark">
                            <h6>الأطروحات</h6>
                            <small>{{ statistics.thesises_degree ? statistics.thesises_degree : 0 }}%</small>
                          </div>
                          <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                            <progressbar className="bg-primary" :style="{ width: statistics.thesises_degree + '%' }"
                              aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></progressbar>
                          </b-progress>
                        </div>
                        <div class="mb-3">
                          <div class="d-flex justify-content-between mt-2 text-dark">
                            <h6>التلخيص العام</h6>
                            <small>{{ statistics.general_informations_degree ? statistics.general_informations_degree :
                              0
                            }}%</small>
                          </div>
                          <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                            <progressbar className="bg-primary"
                              :style="{ width: statistics.general_informations_degree + '%' }" aria-valuenow="30"
                              aria-valuemin="0" aria-valuemax="100"></progressbar>

                          </b-progress>
                        </div>
                        <div class="mb-3">
                          <div class="d-flex justify-content-between mt-2 text-dark">
                            <h6>القراءة التفحصية</h6>
                            <small>{{ statistics.questions_degree ? statistics.questions_degree : 0 }}%</small>
                          </div>

                          <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                            <progressbar className="bg-primary" :style="{ width: statistics.questions_degree + '%' }"
                              aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></progressbar>
                          </b-progress>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-slot:body v-else>
                  <h2>احصائيات</h2>
                  <div class="col-sm-12">
                    <div class="iq-card-body p-0">
                      <div class="image-block text-center">
                        <img src="@/assets/images/main/team_work.png" class="img-fluid rounded w-50" alt="blog-img">
                      </div>

                      <h4 class="text-center mt-3 mb-3 mx-2">
                        وكما تشكل المكعبات قلعة شامخة، تشكل إجابتك علمًا راسخًا يتم تقييمه ويسهل عليك العودة له دائمًا
                        للتدارس، أكمل تعبئة الأسئلة المطلوبة ضمن الكتاب لتظهر لك صفحة
                        الاحصائيات الخاصة بطلبك
                      </h4>
                    </div>
                  </div>
                </template>
              </iq-card>
              <iq-card>
                <template v-slot:body v-if="last_achievement.status == 'finished'">
                  <h2>اصدار الشهادة</h2>
                  <div class="tab-content">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="card card-block card-stretch card-height blog-list">
                          <div class="card-body">
                            <div class="row align-items-center">
                              <div class="col-md-6">
                                <div class="image-block">
                                  <img src="@/assets/images/main/export-congrats.png" class="img-fluid rounded w-100"
                                    alt="blog-img" />
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="blog-description p-2">
                                  <div class="blog-meta d-flex align-items-center justify-content-between mb-2">
                                    <div class="title">
                                      <h2>تهانينا</h2>
                                    </div>
                                  </div>
                                  <p>
                                    في أمة جاءها الأمر السماوي بضرورة القراءة، لا تسجل القراءة مكانًا لها في سلم
                                    الأولويات
                                    عند شخوص الأمة. وللأسف فإن أولئك الذين يقرأون في هذه الأمة لا يمارسون القراءة كأسلوب
                                    تعليمي كما يجب. لذلك نوجه لك التهنئة لأن وصولك لهذه المرحلة تعني أنك استخدم وسائل
                                    القراءة المتقدمة بالشكل الصحيح خلال قراءتك لهذا الكتاب وهذه خطوة مميزة لا يقوم بها
                                    سوى
                                    (10٪) فقط من القراء
                                  </p>
                                </div>
                                <button @click="listCertificate(last_achievement.id)" type="submit"
                                  class="btn btn-primary d-block w-100 mt-3">اصدار الشهادة
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-slot:body v-else>
                  <h2>اصدار الشهادة</h2>
                  <div class="col-sm-12">
                    <div class="iq-card-body p-0">
                      <div class="image-block text-center">
                        <img src="@/assets/images/main/finished.png" class="img-fluid rounded w-50" alt="blog-img">
                      </div>

                      <h4 class="text-center mt-3 mb-3">
                        انتظر تقييم المختصيين لقراءتك وليكن هذا حافزًا لك لتقرأ بشكل أفضل
                      </h4>
                    </div>

                  </div>
                </template>
              </iq-card>
            </div>
            <div>
            </div>
          </div>
          <div v-else>
            <iq-card class="iq-card">
              <div class="iq-card-body p-0">
                <div class="image-block text-center">
                  <img src="@/assets/images/main/stage2.png" class="img-fluid rounded w-50" alt="blog-img" />
                </div>
                <div class="mt-2">
                  <h4 class="text-center ">
                    ابدأ بتوثيق كتابك الأول
                  </h4>
                  <router-link :to="{ name: 'book.eligible' }" class="btn btn-primary d-block mt-3 mb-3 w-75 mx-auto"
                    style="color: white">
                    ابدأ التوثيق
                  </router-link>
                </div>

              </div>
            </iq-card>
          </div>

        </tab-content-item>
        <!-- END LAST Achievement -->

        <!-- START AchievementS -->
        <tab-content-item :active="false" id="all-achev" aria-labelled-by="all-achev-tab">
          <div class="row">
            <div class="col-lg-12">
              <iq-card>
                <template v-slot:headerTitle>
                  <h4 class="card-title">الكتب الموثقة </h4>
                </template>
                <template v-slot:body v-if="finished_achievements.length > 0">
                  <div class="card card-block card-stretch card-height blog-list"
                    v-for="(achievement, index) in finished_achievements" :key="index">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-md-6">
                          <div class="blog-description p-2 text-center">
                            <div class="image-block text-center">
                              <img src="@/assets/images/main/finished.png" class="img-fluid rounded w-50" alt="blog-img">
                            </div>

                            <h3 class="mb-2 text-center">اسم الكتاب: {{ achievement.book.name }} </h3>
                            <button @click="listCertificate(achievement.id)" type="submit"
                              class="btn btn-primary d-block w-100 mt-3">عرض الشهادة
                            </button>

                            <!-- <button type="submit" class="btn btn-primary d-block w-100 mt-3"
                              @click="$router.push({ path: `/certificate/${achievement.id}` })">
                              عرض الشهادة مع الانجاز
                            </button> -->


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-slot:body v-else>
                  <div class="iq-card-body p-0">
                    <div class="image-block text-center">
                      <img src="@/assets/images/main/stage2.png" class="img-fluid rounded w-50" alt="blog-img" />
                    </div>
                    <div class="mt-2 mb-3">
                      <h4 class="text-center ">
                        لا يوجد كتب موثقة
                      </h4>
                    </div>
                  </div>

                </template>

              </iq-card>
            </div>
          </div>
        </tab-content-item>
        <!-- END AchievementS -->
      </div>
    </div>
  </div>
</template>
<script>
import certificateService from '@/API/EligibleServices/certificateServices'
import userBookServices from '@/API/EligibleServices/userBookServices'
export default {
  name: "Profile",
  async created() {
    //await this.getStatistics();
    await this.getUserCertificates();
    await this.lastAchievement();
    await this.finishedAchievement();

  },
  data() {
    return {
      statistics: {
        general_informations: 0,
        questions: 0,
        thesises: 0,
        total: 0
      },
      certificates: [],
      last_achievement: null,
      finished_achievements: []
    }
  },
  methods: {
    listCertificate(id) {
      window.open(`https://platform.osboha180.com/backend/public/api/v1/eligible-certificates/generate-pdf/${id}`, '_blank');
    },
    async lastAchievement() {
      const response = await userBookServices.lastAchievement();
      this.last_achievement = response.last_achievement;
      this.statistics = response.statistics;
      this.statistics.thesises_degree = Math.floor(parseInt(this.statistics.thesises_degree) * 100) / 100
      this.statistics.general_informations_degree = Math.floor(parseInt(this.statistics.general_informations_degree) * 100) / 100
      this.statistics.questions_degree = Math.floor(parseInt(this.statistics.questions_degree) * 100) / 100
      this.statistics.total = Math.floor((parseInt(this.statistics.thesises_degree) + parseInt(this.statistics.general_informations_degree) + parseInt(this.statistics.questions_degree)) / 3);

    },
    async finishedAchievement() {
      this.finished_achievements = await userBookServices.finishedAchievement();
      //console.log(this.finished_achievements)
    },

    async getUserCertificates() {
      const certificates = await certificateService.getUserCertificates();
      this.certificates = certificates;
    },

    // async getStatistics() {
    //   const statistics = await userServices.getUserStatistics();
    //   this.statistics = statistics
    // },
  }
};
</script>
<script setup>
import { ref, reactive } from "vue";
import "flatpickr/dist/flatpickr.css";
const inlineDate = ref("");
const inlineDatepicker = reactive({
  inline: true,
  minDate: "today",
  dateFormat: "Y-m-d",
});
const level = ref({
  series: [
    {
      name: "Total Levels",
      data: [4762, 2889, 1098, 680],
    },
  ],
  options: {
    colors: ["#50b5ff"],
    chart: {
      toolbar: {
        show: false,
      },
    },
    forecastDataPoints: {
      count: 2,
    },
    stroke: {
      width: 3,
    },
    grid: {
      show: true,
      strokeDashArray: 7,
    },
    markers: {
      size: 6,
      colors: "#FFFFFF",
      strokeColors: ["#50b5ff"],
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 0,
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
    },
    xaxis: {
      categories: ["بسيط", "متوسط", "عميق", "متقدم"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  },
});
</script>