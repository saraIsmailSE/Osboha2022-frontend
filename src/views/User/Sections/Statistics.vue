<template>
  <iq-card>
    <template v-slot:body>
      <h2>احصائيات</h2>
      <div class="tab-content">
        <tab-content-item :active="true" id="photo-you" aria-labelled-by="pills-photo-you-tab">
          <Marks v-if="marks" :marks="marks" />
        </tab-content-item>
      </div>
    </template>
  </iq-card>
</template>
<script>

import Marks from '../../../components/statistics/Marks.vue'
import UserProfile from '@/API/services/user-profile.service'

export default {
  name: 'Statistics',
  components: {
    Marks
  },
  async created() {
    this.marks = await UserProfile.getProfileStatistics(this.$route.params.user_id);
  },

  data() {
    return {
      marks:null
    }
  },
  methods: {
  }
}
</script>
