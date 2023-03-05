<template>
  <div class="row">
    <div class="col-lg-3">
      <StatisticsList :categoryList="categories" />
    </div>
    <div class="col-lg-9">
      <AmbassadorsAchevment :ambassadorsAchevmentList="ambassadorsAchevmentList" />
    </div>
  </div>
</template>
<script>
import StatisticsList from './StatisticsList.vue'
import AmbassadorsAchevment from './Achevment'

export default {
  name: 'AmbassadorsListing',
  components: { StatisticsList, AmbassadorsAchevment },
  data() {
    return {
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
          number: '07'
        },
        {
          id: 3,
          name: 'انجاز صفر',
          color: '#831018',
          href: "#",
          number: '03'
        },
      ],
      ambassadorsAchevmentList: [
        {
          id: 1,
          name: 'User 1',
          achevment: 95,
        },
        {
          id: 2,
          name: 'User 2',
          achevment: 100,
        },
        {
          id: 3,
          name: 'User 3',
          achevment: 100,
        },
        {
          id: 4,
          name: 'User 4',
          achevment: 80,
        },
      ],
    }
  },

}
</script>
