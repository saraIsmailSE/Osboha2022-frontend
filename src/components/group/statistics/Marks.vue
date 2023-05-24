<template>
  <div class="row">
    <!-- ########## START WEEK STATISTICS ########## -->
    <div class="col-lg-12 col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="header-title">
            <h4 class="card-title">انجاز الأسبوع {{ week_title }}</h4>
          </div>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <div class="d-flex justify-content-between mt-2 text-dark">
              <h6>المعدل العام</h6>
              <small>{{ getAverage(statistics.team_out_of_100) }}%</small>
            </div>
            <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
              <progressbar
                className="bg-primary"
                :style="{
                  width: getAverage(statistics.team_out_of_100) + '%',
                }"
                :aria-valuenow="getAverage(statistics.team_out_of_100)"
                :aria-valuemin="0"
                :aria-valuemax="100"
              ></progressbar>
            </b-progress>
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between mt-2 text-dark">
              <h6>إنجاز القراءة</h6>
              <small>
                {{ getAverage(statistics.team_reading_mark) }}
                / 50</small
              >
            </div>
            <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
              <progressbar
                className="bg-primary"
                :style="{
                  width:
                    (getAverage(statistics.team_reading_mark) / 50) * 100 + '%',
                }"
                :aria-valuenow="getAverage(statistics.team_reading_mark)"
                :aria-valuemin="0"
                :aria-valuemax="50"
              ></progressbar>
            </b-progress>
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between mt-2 text-dark">
              <h6>إنجاز الكتابة</h6>
              <small>
                {{ getAverage(statistics.team_writing_mark) }}
                / 40</small
              >
            </div>
            <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
              <progressbar
                className="bg-primary"
                :style="{
                  width:
                    (getAverage(statistics.team_writing_mark) / 40) * 100 + '%',
                }"
                :aria-valuenow="getAverage(statistics.team_writing_mark)"
                :aria-valuemin="0"
                :aria-valuemax="40"
              ></progressbar>
            </b-progress>
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between mt-2 text-dark">
              <h6>اعرف مشروعك</h6>
              <small>{{ getAverage(statistics.team_support_mark) }} / 10</small>
            </div>
            <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
              <progressbar
                className="bg-primary"
                :style="{ width: (getAverage(statistics.team_support_mark) / 10) * 100 +  '%' }"
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
              ></progressbar>
            </b-progress>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="text-dark d-flex flex-column align-items-center">
                <h6 class="d-inline-flex">
                  عدد الصفحات المقروءة
                  <span class="material-symbols-outlined me-2">
                    auto_stories
                  </span>
                </h6>
                <h2>{{ formatNumber(statistics.total_pages) }}</h2>
              </div>
            </div>
            <div class="col-6">
              <div class="text-dark d-flex flex-column align-items-center">
                <h6 class="d-inline-flex">
                  عدد الأطروحات المكتوبة
                  <span class="material-symbols-outlined me-2"> draw </span>
                </h6>
                <h2>{{ formatNumber(statistics.total_thesis) }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ########## END WEEK STATISTICS ########## -->
  </div>
</template>

<script>
import helper from "@/utilities/helper.js";
export default {
  name: "GroupMarks",
  props: {
    statistics: {
      type: [Object],
      required: true,
    },
    week_title: {
      type: [String],
      required: true,
    },
  },
  methods: {
    ...helper,
    getAverage(number) {
      return (Math.round(number).toFixed(2));
    },
  },
};
</script>
