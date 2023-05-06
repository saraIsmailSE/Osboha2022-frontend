<template>
  <div class="row">
    <!-- ########## START Most Read ########## -->
    <div class="col-lg-12 col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="header-title">
            <h4 class="card-title">الأكثر قراءة</h4>
          </div>
        </div>
        <div class="card-body">
          <div class="row d-flex justify-content-center mb-2">
            <div class="col-6 m-auto d-flex justify-content-end">
              <UserAvatar
                :profileImg="most_read.user.user_profile.profile_picture"
                :profile_id="most_read.user.user_profile.id"
                :title="most_read.user.name"
                :gender="most_read.user.gender"
                avatarClass="avatar-120 rounded-circle"
              />
            </div>
            <div class="col-6 m-auto">
              <router-link
                :to="{
                  name: 'user.profile',
                  params: { user_id: most_read.user.id },
                }"
              >
                <h3>{{ most_read.user.name }}</h3>
              </router-link>
              <h5 style="direction: rtl">
                {{ formatNumber(most_read.max_total_pages) }}
                صفحة
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ########## END Most Read ########## -->
  </div>
</template>

<script>
import UserAvatar from "@/components/user/UserAvatar.vue";
import helper from "@/utilities/helper.js";

export default {
  name: "MostRead",
  components: {
    UserAvatar,
  },
  props: {
    most_read: {
      type: [Object],
      required: true,
    },
  },
  methods: {
    ...helper,
  },
};
</script>
