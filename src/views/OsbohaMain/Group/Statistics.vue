<template>
  <iq-card v-if="statistics">
    <template v-slot:body>
      <h2>
        احصائيات
        {{ statistics.group.name }}
      </h2>
      <Marks :statistics="statistics.total_statistics" :week_title="this.statistics.week.title"
        :number_of_users="(statistics.users_in_group - statistics.total.freezed)" />

      <MembersReading :ReadingData="statistics.ambassadors_reading" />


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

import MembersReading from "@/components/group/statistics/ReadingList";

export default {
  name: "GroupStatistics",
  components: {
    Marks,
    MostRead,
    Achievement,
    ThseseAndQuotes,
    GroupMonth,
    MembersReading,
  },
  async created() {
    this.statistics = await GroupService.statistics(
      this.$route.params.group_id,
      this.$route.params.week_id
    );
  },

  data() {
    return {
      statistics: null,
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
