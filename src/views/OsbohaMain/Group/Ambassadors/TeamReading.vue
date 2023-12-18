<template>
  <div class="row" v-if="group_users > 0">
    <div class="col-lg-3">
      <StatisticsList :categoryList="categories" />
    </div>
    <div class="col-lg-9">
      <!-- v-if="ambassadorsAchievementList" -->
      <AmbassadorsAchievement
        :ambassadorsAchievementList="ambassadorsAchievementList"
        :group_id="group.id"
        :week_id="week_id"
        :group_name="group.name"
        :group_users="group_users"
        :most_read="most_read"
      />
    </div>
  </div>
  <div class="row" v-else>
    <iq-card class="iq-card">
      <div class="iq-card-body p-0">
        <div class="image-block text-center">
          <img
            src="@/assets/images/main/reader.png"
            class="img-fluid rounded w-75 mt-3"
            alt="no-amb"
          />
        </div>
        <h4 class="text-center mt-3 mb-3">لا يوجد سفراء في هذه المجموعة</h4>
        <div class="d-inline-block w-100 text-center col-12">
          <a
            role="button"
            @click="$router.go(-1)"
            class="d-block mt-3 mb-3 w-75 mx-auto"
          >
            <span>عودة</span>
            <span class="align-middle material-symbols-outlined">
              keyboard_return
            </span>
          </a>
        </div>
      </div>
    </iq-card>
  </div>
  <div class="row" v-if="support_leader && support_leader?.mark">
    <div class="col-lg-3">
      <router-link
        :to="{
          name: 'group.listOneAmbassadorReading',
          params: {
            ambassador_id: support_leader?.mark?.user?.id,
            week_id: week_id,
          },
        }"
        class="btn btn-primary d-block mt-3"
      >
        إنجاز قائد الدعم
      </router-link>
    </div>
  </div>
</template>
<script>
import StatisticsList from "./StatisticsList.vue";
import AmbassadorsAchievement from "./Achievement";
import GroupService from "@/API/services/group.service";

export default {
  name: "Team Reading Info",
  async created() {
    try {
      const response = await GroupService.BasicMarksView(
        this.group_id,
        this.week_id,
      );
      this.group = response.group;
      this.group_users = response.group_users;
      this.categories[0].number = response.full;
      this.categories[1].number = response.incomplete;
      this.categories[2].number = response.zero;
      this.ambassadorsAchievementList = response.random_achievement;
      this.most_read = response.most_read;
      this.support_leader = response.support_leader;

      console.log(this.support_leader);
    } catch (error) {
      console.log(error);
    }
  },

  components: { StatisticsList, AmbassadorsAchievement },
  data() {
    return {
      group_id: this.$route.params.group_id,
      week_id: this.$route.params.week_id,
      group: [],
      group_users: 0,
      categories: [
        {
          id: 1,
          name: "انجاز كامل",
          color: "#22803f",
          number: 20,
        },
        {
          id: 2,
          name: "انجاز ناقص",
          color: "#192f36",
          number: 7,
        },
        {
          id: 3,
          name: "انجاز صفر",
          color: "#831018",
          number: 3,
        },
      ],
      ambassadorsAchievementList: null,
      most_read: null,
      supportLeaderAchievement: null,
    };
  },
};
</script>
