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
                  aria-describedby="search-addon" @input="searchForAmbassadorAchievement()" v-model="ambassador_name" />
                <button type="button" class="btn btn-outline-primary"><span class="material-symbols-outlined lh-1">
                    search
                  </span></button>
              </div>
            </form>
            <template v-for="(ambassador, index) in achievementList" :key="index">
              <AchievementProgress :ambassador="ambassador" :week_id="week_id" />
            </template>
            <li class="d-block text-center mb-0 pb-0">
              <router-link :to="{ name: 'group.listAllAmbassadorAchievements', params: { group_id: group_id,week_id:week_id } }">
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
import AchievementProgress from '@/components/group/AchievementProgress.vue'
import MostRead from './MostRead'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import GroupService from '@/API/services/group.service';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
  name: 'General Achievment',
  components: {
    GroupTitle,
    MostRead,
    AchievementProgress
  },
  created() {
    this.achievementList = this.ambassadorsAchievementList
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
    week_id: {
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
      achievementList: [],
      ambassador_name: '',
      show: false,
    }
  },
  methods: {
    /**
     * ambassador achievment in a week
     * @param ambassador_name, group _id , week filter [current - previous ]
     * @return ambassador achievment
     */
    async searchForAmbassadorAchievement() {
      const response = await GroupService.searchForAmbassadorAchievement(this.ambassador_name, this.$route.params.group_id, 'current');
      this.achievementList = response.ambassador_achievement
    }
  }
}
</script>
