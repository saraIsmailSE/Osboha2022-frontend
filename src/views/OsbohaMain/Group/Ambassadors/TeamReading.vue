<template>
  <div class="row">
    <div class="col-lg-3">
      <StatisticsList :categoryList="categories" />
    </div>
    <div class="col-lg-9">
      <AmbassadorsAchevment :ambassadorsAchevmentList="ambassadorsAchevmentList" :group_users="group_users"  :most_read="most_read"/>
    </div>
  </div>
</template>
<script>
import StatisticsList from './StatisticsList.vue'
import AmbassadorsAchevment from './Achevment'
import GroupService from '@/API/services/group.service';


export default {
  name: 'AmbassadorsListing',
  async created() {

    try {
      const response = await GroupService.BasicMarksView(this.group_id);
      this.group_users=response.group_users
      this.categories[0].number=response.full
      this.categories[1].number=response.incomplete
      this.categories[2].number=response.zero
      this.ambassadorsAchevmentList=response.random_achevment
      this.most_read=response.most_read
    }
    catch (error) {
      console.log(error);
    }
  },

  components: { StatisticsList, AmbassadorsAchevment },
  data() {
    return {
      group_id: this.$route.params.group_id,
      group_users:0,
      categories: [
        {
          id: 1,
          name: 'انجاز كامل',
          color: '#22803f',
          href: "#",
          number: 20
        },
        {
          id: 2,
          name: 'انجاز ناقص',
          color: '#192f36',
          href: "#",
          number: 7
        },
        {
          id: 3,
          name: 'انجاز صفر',
          color: '#831018',
          href: "#",
          number: 3
        },
      ],
      ambassadorsAchevmentList: null,
      most_read:null,
    }
  },

}
</script>
