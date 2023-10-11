<template>
  <div class="container">
    <ul class="list-unstyled row mb-0">
      <li class="col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="points">
              <span>عدد المراجعين</span>
              <div class="d-flex align-items-center">
                <h3>{{ statistics.reviewer }}</h3>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="points">
              <span>عدد المدققين</span>
              <div class="d-flex align-items-center">
                <h3>{{ statistics.auditers }}</h3>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="points">
              <span>عدد المستخدمين</span>
              <div class="d-flex align-items-center">
                <h3>{{ statistics.users }}</h3>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="points">
              <span>الشهادات المصدرة</span>
              <div class="d-flex align-items-center">
                <h3>{{ statistics.certificates }}</h3>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="row">
      <div class="col-lg-8">
        <div class="card card-block card-stretch card-height">
          <div class="card-header">
            <div class="d-flex justify-content-between flex-wrap">
              <h4 class="card-title">مستوى الكتب</h4>
            </div>
          </div>
          <div class="card-body">
            <apexchart height="100%" type="line" :options="level.options" :series="level.series" />
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="row">
          <div class="col-6 col-md-6 col-lg-6">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-center">
                  <div class="border rounded bg-soft-info avatar-55 d-flex align-items-center justify-content-center">
                    <span class="material-symbols-outlined"> menu_book </span>
                  </div>
                </div>
                <div class="mt-4">
                  <h3 class="text-center">{{ statistics.books }}</h3>
                  <p class="mb-0 text-center">كتاب</p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 col-md-6 col-lg-6">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-center">
                  <div class="border rounded bg-soft-warning avatar-55 d-flex align-items-center justify-content-center">
                    <span class="material-symbols-outlined"> draw </span>
                  </div>
                </div>
                <div class="mt-4">
                  <h3 class="text-center">{{ thesises.total }}</h3>
                  <p class="mb-0 text-center">أطروحة</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-6 col-lg-6">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-center">
                  <div class="border rounded bg-soft-danger avatar-55 d-flex align-items-center justify-content-center">
                    <span class="material-symbols-outlined">
                      contact_support
                    </span>
                  </div>
                </div>
                <div class="mt-4">
                  <h3 class="text-center">{{ questions.total }}</h3>
                  <p class="mb-0 text-center">اسئلة</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-6 col-lg-6">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-center">
                  <div class="border rounded bg-soft-success avatar-55 d-flex align-items-center justify-content-center">
                    <span class="material-symbols-outlined"> summarize </span>
                  </div>
                </div>
                <div class="mt-4">
                  <h3 class="text-center">{{ general_informations.total }}</h3>
                  <p class="mb-0 text-center">ملخص عام</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <div class="header-title">
              <h4 class="card-title">الاسئلة</h4>
            </div>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>أمتياز</h6>
                <small>{{ questions.very_excellent }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="questions.very_excellent" variant="danger"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>ممتاز</h6>
                <small>{{ questions.excellent }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="questions.excellent" variant="info"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>جيد جدا</h6>
                <small>{{ questions.very_good }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="questions.very_good" variant="primary"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>جيد</h6>
                <small>{{ questions.good }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="questions.good" variant="success"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>مقبول</h6>
                <small>{{ thesises.accebtable }}</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="thesises.accebtable" variant="success"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>مرفوض</h6>
                <small>{{ questions.rejected }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="questions.rejected" variant="success"></b-progress-bar>
              </b-progress>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <div class="header-title">
              <h4 class="card-title">المراجعه العامة</h4>
            </div>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>أمتياز</h6>
                <small>{{ general_informations.very_excellent }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="general_informations.very_excellent" variant="danger"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>ممتاز</h6>
                <small>{{ general_informations.excellent }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="general_informations.excellent" variant="info"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>جيد جدا</h6>
                <small>{{ general_informations.very_good }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="general_informations.very_good" variant="primary"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>جيد</h6>
                <small>{{ general_informations.good }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="general_informations.good" variant="success"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>مقبول</h6>
                <small>{{ general_informations.accebtable }}</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="general_informations.accebtable" variant="success"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>مرفوض</h6>
                <small>{{ general_informations.rejected }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="general_informations.rejected" variant="success"></b-progress-bar>
              </b-progress>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <div class="header-title">
              <h4 class="card-title">الاطروحات</h4>
            </div>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>أمتياز</h6>
                <small>{{ thesises.very_excellent }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="thesises.very_excellent" variant="danger"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>ممتاز</h6>
                <small>{{ thesises.excellent }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="thesises.excellent" variant="info"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>جيد جدا</h6>
                <small>{{ thesises.very_good }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="thesises.very_good" variant="primary"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>جيد</h6>
                <small>{{ thesises.good }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="thesises.good" variant="success"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>مقبول</h6>
                <small>{{ thesises.accebtable }}</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="thesises.accebtable" variant="success"></b-progress-bar>
              </b-progress>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between mt-2 text-dark">
                <h6>مرفوض</h6>
                <small>{{ thesises.rejected }}%</small>
              </div>
              <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
                <b-progress-bar :value="thesises.rejected" variant="success"></b-progress-bar>
              </b-progress>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import bookServices from "@/API/EligibleServices/bookServices";
export default {
  name: 'Statistics',
  created() {
    this.getStatistics();
  },
  data() {
    return {
      statistics: {},
      thesises: {},
      questions: {},
      general_informations: {},
    };
  },
  methods: {
    async getStatistics() {
      try {
        const statistics = await bookServices.getGeneralStatistics();
        this.statistics = statistics;
        this.thesises = this.statistics.thesises;
        this.general_informations = this.statistics.general_informations;
        this.questions = this.statistics.questions;

      } catch (error) {
        console.log(error)
      }


    },
  },
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
      data: [275, 235, 127]
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
      categories: ["بسيط", "متوسط", "متقدم"],
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
<style>
.flatpickr-calendar {
  width: 100%;
}
</style>
