<template>
  <div class="row">

    <div class="col-md-8">
      <iq-card body-class="p-0" v-if="ambassadorsAchievementList && ambassadorsAchievementList.length > 0">
        <template v-slot:body>

          <GroupTitle :group_id:="group_id" :group_name="group_name" :group_users="group_users" />

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
            <template v-for="(ambassador, index) in ambassadorsAchievementList" :key="index">
              <li class="d-flex align-items-center p-3">
                <div class="user-img img-fluid">
                  <img :src="require('@/assets/images/user/03.jpg')" alt="story-img" class="rounded-circle avatar-40">
                </div>
                <div class="d-flex align-items-center w-100 row">
                  <div class="col-lg-3 col-md-3 col-sm-12 ms-3">
                    <h6 class="d-inline-block">
                      <strong>{{ ambassador.user.name }} </strong>
                    </h6>
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-12 form-check mt-2">
                    <div class="d-block w-100">
                      <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" aria-valuenow="90"
                          aria-valuemin="0" aria-valuemax="100" :style="`width: ${ambassador.out_of_100}%;`"></div>
                      </div>
                    </div>

                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 text-center">
                    <router-link
                      :to="{ name: 'group.listOneAmbassadorReading', params: { ambassador_id: ambassador.user_id } }">
                      <span class="badge bg-primary ms-0 ms-md-3 my-1 my-md-0 w-75 text-center" role="button">عرض </span>
                    </router-link>
                  </div>
                </div>
              </li>
            </template>
            <li class="d-block text-center mb-0 pb-0">
              <router-link :to="{ name: 'group.listAllAmbassadorAchievements', params: { group_id: group_id } }">
                <span class="me-3 btn" role="button">عرض جميع الانجازات</span>
              </router-link>
            </li>

          </ul>
        </template>
      </iq-card>
    </div>

    <MostRead v-if="most_read" :most_read="most_read" />
  </div>
</template>

<script>
import GroupTitle from '@/components/group/GroupTitle.vue'
import MostRead from './MostRead'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
  name: 'General Achievment',
  components: {
    GroupTitle,
    MostRead
  },
  props: {
    ambassadorsAchievementList: {
      type: [Object],
      required: true,
    },
    category: {
      type: [Object],
      required: true,
    },
    group_id: {
      type: [Number],
      required: true,
    },
    group_name: {
      type: [String],
      required: true,
    },
    group_users: {
      type: [Number],
      required: true,
    },
    most_read: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {
      search: '',
      show: false,
    }
  },
  methods: {
  }
}
</script>
