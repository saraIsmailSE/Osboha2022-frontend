<template>
  <div class="col-12 col-md-12 col-lg-12">
    <div class="card">
      <div class="card-title pt-2">
        <h3 class="text-center">
          {{ `الأسبوع الحالي: ${weeks[0]?.title}` }}
        </h3>
      </div>
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-center">
          <div
            class="border rounded avatar-55 d-flex align-items-center justify-content-center"
          >
            <img class="img-fluid" src="@/assets/images/gif/chart.gif" alt="" />
          </div>
        </div>
        <div class="mt-4">
          <h4 class="text-center rtl">
            {{ minutesOfCurrentWeek ?? 0 }}
          </h4>
          <p class="mb-0 text-center">مجموع الدقائق</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatsHeader",
  props: {
    weeks: {
      type: Array,
      default: () => [],
    },
    minutesOfCurrentWeek: {
      type: Number,
      default: 0,
    },
  },
};
</script>
