<template>
  <iq-card>
    <div class="iq-card-body profile-page p-0">
      <div class="profile-header">
        <div class="cover-container">
          <img :src="resolve_porfile_img('1300x325', profile.cover_picture, profile.id)" alt="profile-bg" class="rounded img-fluid" v-if="profile && profile.cover_picture" />
          <img src="@/assets/images/main/book-banner.png" alt="profile-bg" class="rounded img-fluid" v-else>
          <ul class="header-nav list-inline d-flex flex-wrap justify-start p-0 m-0 mx-3" style="left: auto;" v-if="isAuth">
            <li><a role="button" class="material-symbols-outlined text-white" style="background-color: #208040;" @click="updateProfile()">
                edit
            </a>
            </li>
            
            <!-- LATER -->
            <!-- <li><a href="#" class="material-symbols-outlined text-white" style="background-color: #1D1A55;">
                settings
              </a>
            </li> -->
          </ul>
        </div>
        <div class="user-detail text-center mb-3">
          <div class="profile-img">
            <img :src="resolve_porfile_img('150x150', profile.profile_picture, profile.id)"
                        alt="profile-img" class="avatar-130 img-fluid" style="border: 4px solid #1D1A55;"
                        v-if="profile && profile.profile_picture" />
            <img src="@/assets/images/avatar/avatar-03.jpg" alt="profile-img" class="avatar-130 img-fluid" style="border: 4px solid #1D1A55;" v-else />
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
  created(){
  },
  props: {
    isAuth: {
      type: [Boolean],
      required: true,
    },
    profile: {
      type: [Object],
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
        },
                /**
        * get profile picture or cover.
        *  @param  image size, image name, profile id
        * @return image url
        */
        resolve_porfile_img(size, imageName, profile_id) {
            let image = size + '_' + imageName;
            const url = `http://127.0.0.1:8000/api/v1/profile-image?fileName=${image}&profileID=${profile_id}`
            return url;
        },


  }

}
</script>
