<template>
  <iq-card v-if="statistics">
    <template v-slot:body>
      <div class="d-flex justify-content-between">
        <h2 class="mt-auto mb-auto">
          احصائيات
          {{ statistics.group.name }}
        </h2>
        <back-button routeName="group.group-detail" :routeParams="{ group_id: this.$route.params.group_id }" />
      </div>
      <div class="form-group mt-3">
        <select class="form-select" v-model="week_id">
          <option value="-1">اختر الأسبوع</option>
          <option v-for="week in statistics.weeks" :key="week.id" :value="week.id">{{ week.title }}</option>
        </select>
      </div>

      <Marks :statistics="statistics.total_statistics" :week_title="this.statistics.week.title"
        :number_of_users="(statistics.users_in_group - statistics.total.freezed)" />

      <MembersReading :ReadingData="statistics.ambassadors_reading" :groupLeader="statistics.group_leader" />


      <MostRead :most_read="statistics.most_read"
        v-if="statistics.most_read && statistics.most_read.max_total_pages > 0" />
      <Achievement :total="this.statistics.total" v-if="!noStatistics" />
      <ThseseAndQuotes :total_theses="statistics.total_statistics.total_thesis ?? 0"
        :total_screenshot="statistics.total_statistics.total_screenshot ?? 0" />
      <GroupMonth :monthAchievement="statistics.month_achievement" :monthTitle="statistics.month_achievement_title" />
    </template>
  </iq-card>
</template>
<script>
import Marks from "@/components/group/statistics/Marks.vue";
import MostRead from "@/components/group/statistics/MostRead.vue";
import Achievement from "@/components/group/statistics/Achievement.vue";
import ThseseAndQuotes from "@/components/group/statistics/ThseseAndQuotes.vue";
import GroupMonth from "@/components/group/statistics/GroupMonth.vue";
import GroupService from "@/API/services/group.service";
import { watchEffect } from "vue";
import MembersReading from "@/components/group/statistics/ReadingList";
import BackButton from '@/components/common/BackButton.vue';

export default {
  name: "GroupStatistics",
  components: {
    Marks,
    MostRead,
    Achievement,
    ThseseAndQuotes,
    GroupMonth,
    MembersReading,
    BackButton,
  },
  async created() {
    watchEffect(async () => {
      if (this.week_id) {
        this.statistics = null;
        this.statistics = await GroupService.statistics(
          this.$route.params.group_id,
          this.week_id
        );
      }
    });

  },

  data() {
    return {
      statistics: null,
      week_id: this.$route.params.week_id
    };
  },
  computed: {
    noStatistics() {
      return !(
        this.statistics.total.out_of_100 ||
        this.statistics.total.out_of_90 ||
        this.statistics.total.zero ||
        this.statistics.total.freezed ||
        this.statistics.total.others
      );
    },
  },
  methods: {},
};
</script>