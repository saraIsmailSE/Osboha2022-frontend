<template>
  <div class="row" v-if="group">
    <div class="col-lg-12">
      <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap">
        <div class="group-info d-flex align-items-center">
          <div class="me-3">
            <img class="rounded-circle img-fluid avatar-100" src="@/assets/images/main/current_book.png" alt="" />
          </div>
          <div class="info">
            <h4>{{ group.name }}</h4>
            <p class="mb-0">
              <i class="ri-lock-fill pe-2"></i>{{ GROUP_TYPE[group.type.type] }} .
              {{ group.user_ambassador_count }} سفير
            </p>
          </div>
        </div>
        <membersHeader :members="group.users" :authInGroup="authInGroup" :group="group"
          :hasSupportLeader="hasSupportLeader" />
      </div>
    </div>
    <div class="col-lg-4">
      <!-- ###### START GROUP ABOUT ###### -->
      <AboutMarathon :group="group" :groupAdministrators="groupAdministrators" :week="week" :week_avg="week_avg"
        v-if="group.type.type == 'marathon'" />
      <AboutMain :group="group" :groupAdministrators="groupAdministrators" :week="week" :week_avg="week_avg" v-else />

      <!-- ###### END GROUP ABOUT ###### -->

      <!-- ###### START GROUP Quick Access ###### -->
      <MarathonQuickAccess :group="group" :previous_week="previous_week" :week="week" :authInGroup="authInGroup"
        v-if="group.type.type == 'marathon'" />

      <MainQuickAccess :group="group" :previous_week="previous_week" :week="week" :authInGroup="authInGroup" v-else />
      <!-- ###### End GROUP Quick Access ###### -->

    </div>
    <div class="col-lg-8">
      <div id="post-modal-data" class="card">
        <!-- ##### <AddPost /> ##### -->
        <AddPost @add-post="addPost" type="normal" :timeline_id="group.timeline_id" />
        <!-- ##### <AddPost /> ##### -->
      </div>
      <div class="card">
        <div class="card-body">
          <!-- ##### LIST POSTS ##### -->
          <LazyLoadedPosts :timeline_id="group.timeline_id" ref="lazyLoadedPostsRef" />
          <!-- ##### END LIST POSTS ##### -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import membersHeader from "@/components/group/membersHeader";
import AboutMain from "@/components/group/AboutMain";
import AboutMarathon from "@/components/group/AboutMarathon";
import MainQuickAccess from "@/components/group/MainQuickAccess";
import MarathonQuickAccess from "@/components/group/MarathonQuickAccess";
import AddPost from "@/components/post/add/AddPost";
import LazyLoadedPosts from "@/components/post/LazyLoadedPosts";
import GroupService from "@/API/services/group.service";
import { GROUP_TYPE } from "@/utilities/constants";

export default {
  name: "Group-detail",
  components: {
    membersHeader,
    AboutMain,
    AboutMarathon,
    MainQuickAccess,
    MarathonQuickAccess,
    AddPost,
    LazyLoadedPosts,
  },
  async created() {
    try {
      const response = await GroupService.getById(this.group_id);
      this.group = response.info;
      this.week_avg = (Math.round(response.week_avg * 100) / 100).toFixed(2);
      this.week = response.week;
      this.previous_week = response.previous_week;
      this.authInGroup = response.authInGroup;
      this.hasSupportLeader = response.has_support_leader;
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      group: null,
      group_id: this.$route.params.group_id,
      week: null,
      previous_week: null,
      week_avg: 0,
      authInGroup: null,
      GROUP_TYPE,
      reasons: [],
      roles: {
        admin: 0,
        consultant: 1,
        advisor: 2,
        supervisor: 3,
        leader: 4,
        ambassador: 5,
      },
      hasSupportLeader: false,
    };
  },
  computed: {
    groupAdministrators() {
      let admins = this.group.group_administrators.filter(
        (administrator) => administrator.pivot.user_type != "admin",
      );

      return admins.sort((a, b) => {
        return this.roles[a.pivot.user_type] - this.roles[b.pivot.user_type];
      });
    },
  },
  methods: {
    addPost(post) {
      this.$refs.lazyLoadedPostsRef.addNewPost(post);
    },
  },
};
</script>