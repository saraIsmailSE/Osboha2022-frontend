<template>
  <div class="row">
    <!-- ########## START WEEK STATISTICS ########## -->
    <div class="col-lg-12 col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="header-title">
            <h4 class="card-title">انجاز الأسبوع || {{ week_title }}</h4>
          </div>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <div class="d-flex justify-content-between mt-2 text-dark">
              <h6>العلامة الكلية</h6>
              <small
                >{{ week_mark.reading_mark + week_mark.writing_mark }}%</small
              >
            </div>
            <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
              <progressbar
                className="bg-primary"
                :style="{
                  width:
                    week_mark.reading_mark +
                    week_mark.writing_mark +
                    week_mark.support +
                    '%',
                }"
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
              ></progressbar>
            </b-progress>
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between mt-2 text-dark">
              <h6>إنجاز القراءة</h6>
              <small>{{ week_mark.reading_mark }} / 50</small>
            </div>
            <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
              <progressbar
                className="bg-primary"
                :style="{ width: (week_mark.reading_mark / 50) * 100 + '%' }"
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
              ></progressbar>
            </b-progress>
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between mt-2 text-dark">
              <h6>إنجاز الكتابة</h6>
              <small> {{ week_mark.writing_mark }} / 40</small>
            </div>
            <b-progress class="shadow-none w-100 mt-2" style="height: 6px">
              <progressbar
                className="bg-primary"
                :style="{ width: (week_mark.writing_mark / 40) * 100 + '%' }"
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
              ></progressbar>
            </b-progress>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="m-auto text-dark">
                <h6 class="d-inline-flex">
                  عدد الصفحات المقروءة
                  <span class="material-symbols-outlined me-2">
                    auto_stories
                  </span>
                </h6>
                <h2>{{ week_mark.total_pages }}</h2>
              </div>
            </div>
            <div class="col-6">
              <div class="m-auto text-dark">
                <h6 class="d-inline-flex">
                  معدل الفريق
                  <span class="material-symbols-outlined me-2">
                    bar_chart
                  </span>
                </h6>
                <h2>{{ group_week_avg }} %</h2>
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
export default {
  name: "UserMarks",
  created() {
    //week mark
    this.week_mark = this.statistics.week_mark;
    // group AVG
    this.group_week_avg = (
      Math.round(this.statistics.group_week_avg * 100) / 100
    ).toFixed(2);
  },
  props: {
    statistics: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {
      week_mark: null,
      month_achievement: null,
      group_week_avg: null,
    };
  },
  computed: {
    week_title() {
      return this.statistics.week.title;
    },
  },
};
</script>
