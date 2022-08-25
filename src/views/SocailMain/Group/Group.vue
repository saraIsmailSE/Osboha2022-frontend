<template>
  <div class="d-grid gap-3 d-grid-template-1fr-19">    
    <card :cardInfo="groupInfo"/>
  </div>
</template>
<script>
import card from '../../../components/custom/cards/card.vue'
export default {
  components: { card },
  name: 'Group',
  data () {
    return {
      groupInfo: 
        {
          backgroundImg: 'profile-bg9.jpg',
          groupImg: 'gi-9.jpg',
          title: 'CARD',
          text: 'Lorem Ipsum',
          extraInfo: [
            {
              info: 'post',
              value: '1200'
            },
            {
              info: 'Member',
              value: '1000'
            },
            {
              info: 'Visit',
              value: '1.2k'
            }
          ],
        }
    }
  },
  mounted() {
    console.log(this.groupInfo)  
  },
}
</script>
