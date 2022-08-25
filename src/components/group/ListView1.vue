<template>
  <div class="friend-list-tab mt-2">
    <div class="tab-content">
      <tab-content-item :active="true" id="all-friends" aria-labelled-by="pills-all-friends">
        <div class="iq-card-body p-0">
          <div class="row">
            <div class="col-md-6 col-lg-6 mb-3" v-for="(group, index) in groups" :key="index">
              <div class="iq-friendlist-block">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <a href="#">
                      <img :src="group.image" alt="profile-image" class="image-fluid">
                    </a>
                    <div class="friend-info ms-3">
                      <h5>{{ group.name }}</h5>
                      <p class="mb-0">تاريخ الانضمام || {{ group.date }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab-content-item>

    </div>
  </div>

</template>
<script>
export default {
  name: 'ListView1',
     props: {
      groups: { type: Object },
   },
mounted() {
  },
  components: {
  },
  data() {
    return {
     
    }
  }
}
</script>
