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
              <li class="d-flex align-items-center p-3">
                <div class="user-img img-fluid">
                  <img v-if="ambassador.user.user_profile.profile_picture"
                    :src="resolve_porfile_img('60x60', ambassador.user.user_profile.profile_picture, ambassador.user.user_profile.id)"
                    alt="profile-img" class="rounded-circle avatar-40" :title="ambassador.user.name" />

                  <img v-else
                    :src="resolve_porfile_img('60x60', 'ananimous_' + ambassador.user.gender + '.png', 'ananimous')"
                    alt="profile-img" :title="ambassador.user.name" class="rounded-circle avatar-40">
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
                        <div
                          :class="`${markClass(ambassador.reading_mark + ambassador.writing_mark + ambassador.support)}`"
                          class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="90"
                          aria-valuemin="0" aria-valuemax="100"
                          :style="`width: ${ambassador.reading_mark + ambassador.writing_mark + ambassador.support}%;`">
                        </div>
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
import profileImagesService from '@/API/services/profile.images.service'
import GroupService from '@/API/services/group.service';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
  name: 'General Achievment',
  components: {
    GroupTitle,
    MostRead
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
    * return mark color class.
    *  @param  mark
    * @return class
    */
    markClass(mark) {
      switch (mark) {
        case 100:
          return 'full-mark'

        case 0:
          return 'zero-mark'

        default:
          return 'incomplete'
      }
    },
    /**
    * get profile picture or cover.
    *  @param  image size, image name, profile id
    * @return image url
    */
    resolve_porfile_img(size, imageName, profile_id) {
      return profileImagesService.resolve_porfile_img(size, imageName, profile_id);
    },

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


<style scoped>
.full-mark {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
}

.zero-mark {
  width: 100% !important;
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-danger-rgb), var(--bs-bg-opacity)) !important;
}

.incomplete {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-warning-rgb), var(--bs-bg-opacity)) !important;
}</style>
