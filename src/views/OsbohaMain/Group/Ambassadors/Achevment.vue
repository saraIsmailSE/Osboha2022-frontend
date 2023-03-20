<template>
  <div class="row">

    <div class="col-md-8">
      <iq-card body-class="p-0" v-if="ambassadorsAchevmentList.length > 0">
        <template v-slot:body>
          <div class="card position-relative inner-page-bg" style=" background-color: #cae0cd; height: 100px;">
            <div class="inner-page-title">
              <h3 class="text-dark">فريق المتابعة</h3>
              <p>
                عدد السفراء
                <strong>30</strong>
              </p>
            </div>
          </div>
          <ul class="todo-task-lists m-0 p-0">
            <form>
            <div class="input-group w-100 m-auto p-2">
              <input type="search" class="form-control rounded" placeholder="ابحث عن سفير" aria-label="Search"
                aria-describedby="search-addon" />
              <button type="button" class="btn btn-outline-primary"><span class="material-symbols-outlined lh-1">
                  search
                </span></button>
            </div>
          </form>
            <template v-for="(ambassador, index) in ambassadorsAchevmentList" :key="index">
              <li class="d-flex align-items-center p-3">
                <div class="user-img img-fluid">
                  <img :src="require('../../../../assets/images/user/03.jpg')" alt="story-img"
                    class="rounded-circle avatar-40">
                </div>
                <div class="d-flex align-items-center w-100 row">
                  <div class="col-lg-3 col-md-3 col-sm-12 ms-3">
                    <h6 class="d-inline-block">
                      <strong>{{ ambassador.name }} </strong>
                    </h6>
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-12 form-check mt-2">
                    <div class="d-block w-100">
                      <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" aria-valuenow="90"
                          aria-valuemin="0" aria-valuemax="100" :style="`width: ${ambassador.achevment}%;`"></div>
                      </div>
                    </div>

                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 text-center">
                    <span class="badge bg-primary ms-0 ms-md-3 my-1 my-md-0 w-75 text-center" role="button"
                      @click="listAchevment()">عرض </span>
                  </div>
                </div>
              </li>
            </template>
            <li class="d-block text-center mb-0 pb-0">
              <a class="me-3 btn" role="button" @click="loadMore()">عرض جميع الانجازات</a>
            </li>

          </ul>
        </template>
      </iq-card>
    </div>

    <div class="col-md-4">
      <iq-card>
        <template v-slot:body>
          <div class="iq-todo-right">
            <div class="iq-todo-friendlist mt-3">
              <ul class="suggestions-lists m-0 p-0">
                <li class="d-flex mb-4 align-items-center" v-for="(ambassador, index) in ambassadorsList" :key=index>
                  <div class="user-img img-fluid">
                    <img :src="ambassador.img" alt="story-img" class="rounded-circle avatar-40">
                  </div>
                  <div class="d-flex align-items-center justify-content-between w-100">
                    <div class="ms-3">
                      <h6>{{ ambassador.name }}</h6>
                      <p class="mb-0">عدد الصفحات: 908997</p>
                    </div>
                    <div class="card-header-toolbar d-flex align-items-center">
                      <i class="material-symbols-outlined md-18 me-1 text-primary">
                        visibility
                      </i>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="container mt-3 mb-3 d-flex  align-items-center justify-content-center" hight="200px">
                <Bar id="my-chart-id" :options="chartOptions" :data="chartData" :height="500" :width="500" />
              </div>

              <a href="#" class="btn text-white d-flex align-items-center" style=" background-color:#2e328b; ">
                <i class="material-symbols-outlined md-18 me-1">
                  patient_list
                </i> عرض الكل
              </a>
            </div>
          </div>
        </template>
      </iq-card>
    </div>

  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
  name: 'TaskList',
  components: { Bar },
  props: [
    'ambassadorsAchevmentList',
    'category'
  ],
  data() {
    return {
      search: '',
      show: false,
      ambassadorsList: [
        {
          img: require('../../../../assets/images/user/03.jpg'),
          name: 'Paige Turner',
          work: 'Web Designer'
        },
        {
          img: require('../../../../assets/images/user/04.jpg'),
          name: 'Barb Ackue',
          work: 'Tester'
        }
      ],
      chartData: {
        labels: [
          'amb1',
          'amb2',
          'amb3',
          'amb4',
          'amb5',
        ],
        datasets: [{
          label: 'قراءة السفراء',
          backgroundColor: '#1d1a55',
          data: [60, 45, 40, 35, 30],
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,

        }
        ],
      },
      chartOptions: {
        responsive: true,
      }
    }
  },
  methods: {
    listAchevment() {
      this.$router.push({ name: `social.ambassador-list-reading` });

    }
  }
}
</script>
