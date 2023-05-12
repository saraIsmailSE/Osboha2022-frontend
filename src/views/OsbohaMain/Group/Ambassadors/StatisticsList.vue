<template>
  <iq-card>
    <template v-slot:body>
      <div class="iq-todo-page">
        <ul class="todo-task-list p-0 m-0">
          <li v-for="(category, index1) in categoryList" :key="index1">
            <a class="d-flex align-items-center justify-content-between">
              <div class="d-flex">
                <i
                  :class="`material-symbols-outlined`"
                  :style="`color:${category.color}`"
                  >bolt</i
                >
                <h5>{{ category.name }}</h5>
              </div>
              <div
                class="d-inline p-2 text-light float-end rounded"
                :style="`background-color:${category.color}`"
              >
                {{ category.number }}
              </div>
            </a>
          </li>
        </ul>

        <div
          class="container mt-3 d-flex align-items-center justify-content-center"
        >
          <Doughnut
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
          />
        </div>

        <router-link
          :to="{
            name: 'group.group-statistics',
            params: { group_id: this.$route.params.group_id },
          }"
          class="btn d-flex align-items-center mt-3 text-white"
          style="background-color: #2e328b"
        >
          <i class="material-symbols-outlined md-18 me-1">insights</i>
          احصائيات الأسبوع
        </router-link>
      </div>
    </template>
  </iq-card>
</template>
<script>
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

export default {
  name: "StatisticsList",
  created() {
    this.chartData.datasets[0].data[0] = this.categoryList[0].number;
    this.chartData.datasets[0].data[1] = this.categoryList[1].number;
    this.chartData.datasets[0].data[2] = this.categoryList[2].number;
  },
  props: ["categoryList"],
  components: {
    Doughnut,
  },
  data() {
    return {
      search: "",
      project: {
        id: 0,
        project_name: "",
      },
      chartData: {
        labels: ["100", "90", "صفر"],
        datasets: [
          {
            label: "معدل الأسبوع",
            data: [20, 7, 3],
            backgroundColor: ["#22803f", "#192f36", "#831018"],
            hoverOffset: 4,
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
};
</script>
