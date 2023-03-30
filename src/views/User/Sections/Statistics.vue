<template>
  <iq-card>
    <template v-slot:body>
      <h2>احصائيات</h2>
      <div class="tab-content">
        <tab-content-item :active="true" id="photo-you" aria-labelled-by="pills-photo-you-tab" v-if="statistics">
          <Marks  :statistics="statistics" />
          <UserWeek :weekMark="statistics.week_mark" />
          <UserMonth :monthAchievement="statistics.month_achievement" :monthTitle="statistics.month_achievement_title" />
        </tab-content-item>
      </div>
    </template>
  </iq-card>
</template>
<script>

import Marks from '../../../components/statistics/Marks.vue'
import UserProfile from '@/API/services/user-profile.service'
import UserMonth from '@/components/statistics/UserMonth.vue';
import UserWeek from '@/components/statistics/UserWeek.vue';

export default {
  name: 'Statistics',
  components: {
    Marks,
    UserMonth,
    UserWeek
},
  async created() {
    this.statistics = await UserProfile.getProfileStatistics(this.$route.params.user_id);
  },

  data() {
    return {
      statistics:null
    }
  },
  methods: {
  }
}
</script>
