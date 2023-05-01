<template>
  <iq-card>
    <template v-slot:body>
      <h2>فريق ABC احصائيات</h2>
      <Marks :statistics="statistics" />
      <MostRead />
      <Achievement />
      <ThseseAndQuotes />
      <GroupMonth />
    </template>
  </iq-card>
</template>
<script>
import Marks from "@/components/group/statistics/Marks.vue";
import MostRead from "@/components/group/statistics/MostRead.vue";
import Achievement from "@/components/group/statistics/Achievement.vue";
import ThseseAndQuotes from "@/components/group/statistics/ThseseAndQuotes.vue";
import GroupMonth from "@/components/group/statistics/GroupMonth.vue";
import UserProfile from "@/API/services/user-profile.service";

export default {
  name: "GroupStatistics",
  components: {
    Marks,
    MostRead,
    Achievement,
    ThseseAndQuotes,
    GroupMonth,
  },
  async created() {
    this.statistics = await UserProfile.getProfileStatistics(
      this.$route.params.user_id
    );
  },

  data() {
    return {
      statistics: null,
    };
  },
  methods: {},
};
</script>
