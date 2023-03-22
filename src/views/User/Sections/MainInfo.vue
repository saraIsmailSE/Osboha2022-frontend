<template>
  <iq-card>
    <div class="iq-card-body profile-page p-0">
      <div class="profile-header">
        <div class="cover-container">
          <img src="@/assets/images/main/book-banner.png" alt="profile-bg" class="rounded img-fluid">
          <ul class="header-nav list-inline d-flex flex-wrap justify-start p-0 m-0 mx-3" style="left: auto;" v-if="isAuth">
            <li><a role="button" class="material-symbols-outlined text-white" style="background-color: #208040;" @click="updateProfile()">
                edit
            </a>
            </li>
            <li><a href="#" class="material-symbols-outlined text-white" style="background-color: #1D1A55;">
                settings
              </a>
            </li>
          </ul>
        </div>
        <div class="user-detail text-center mb-3">
          <div class="profile-img">
            <img src="../../../assets/images/avatar/avatar-03.jpg" alt="profile-img" class="avatar-130 img-fluid" style="border: 4px solid #1D1A55;" />
          </div>
          <div class="profile-detail mt-1">
            <h3 class="">{{user.name}}</h3>
          </div>
        </div>
        <div class="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
          <div class="social-links">
            <ul class="social-data-block d-flex align-items-center justify-content-center list-inline p-0 m-0">
              <li v-for="(role, index) in roles" :key="index" class="text-center pe-2">
                <span class="rounded-pill badge bg-primary">{{role}}</span>
              </li>
            </ul>
          </div>
          <div class="social-info">
            <ul class="social-data-block d-flex align-items-center justify-content-center list-inline p-0 m-0">
              <li v-for="(i, index) in readingInfo" :key="index" class="text-center ps-2 pe-2">
                <h4 class="text-center">{{ i.value }}</h4>
                <p class="mb-0">{{ i.title }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </iq-card>
</template>
<script >
export default {
  name: 'MainInfo',
  props: {
    isAuth: {
      type: [Boolean],
      required: true,
    },
    user: {
      type: [Object],
      required: true,
    },
    roles: {
      type: [Object],
      required: true,
    },
    readingInfo: {
      type: [Object],
      required: true,
    },
  },
  methods:{
    updateProfile() {
            this.$router.push({ name: 'user.profileUpdate', params: { user_id: this.$route.params.user_id } })
        }

  }

}
</script>
