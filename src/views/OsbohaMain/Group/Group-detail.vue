<template>
  <div class="row" v-if="group">
    <div class="col-lg-12">
      <div
        class="d-flex align-items-center justify-content-between mb-3 flex-wrap"
      >
        <div class="group-info d-flex align-items-center">
          <div class="me-3">
            <img
              class="rounded-circle img-fluid avatar-100"
              src="@/assets/images/main/current_book.png"
              alt=""
            />
          </div>
          <div class="info">
            <h4>{{ group.name }}</h4>
            <p class="mb-0">
              <i class="ri-lock-fill pe-2"></i
              >{{ group_type[group.type.type] }} .
              {{ group.user_ambassador_count }} سفير
            </p>
          </div>
        </div>
        <listMembers :members="group.users" :authInGroup="authInGroup" />
      </div>
    </div>
    <div class="col-lg-4">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">عن المجموعة</h4>
          </div>
        </div>
        <div class="card-body">
          <ul class="list-inline p-0 m-0">
            <li class="mb-3">
              <h3 class="mb-0">{{ group.name }}</h3>
            </li>
            <li class="mb-3">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <i class="material-symbols-outlined">group</i>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h4>رسالة المجموعة المجموعة</h4>
                  <p class="mb-0">
                    {{ group.description }}
                  </p>
                </div>
              </div>
            </li>
            <li
              class="mb-3"
              v-for="administrator in group.group_administrators"
              :key="administrator.id"
            >
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <i class="material-symbols-outlined">group</i>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h4 v-if="administrator.pivot.user_type == 'leader'">
                    قائد المجموعة
                  </h4>
                  <h4 v-if="administrator.pivot.user_type == 'supervisor'">
                    مراقب المجموعة
                  </h4>
                  <h4 v-if="administrator.pivot.user_type == 'advisor'">
                    موجه المجموعة
                  </h4>
                  <p class="mb-0">{{ administrator.name }}</p>
                </div>
              </div>
            </li>
            <li class="mb-3">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <i class="material-symbols-outlined">trending_up</i>
                </div>
                <div class="flex-grow-1 ms-3" v-if="week_avg">
                  <h4>{{ week_avg }}</h4>
                  <p class="mb-0">معدل الأسبوع {{ week.title }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">الوصول السريع</h4>
          </div>
        </div>
        <div class="card-body row d-flex justify-content-center">
          <router-link
            :to="{ name: 'group.group-books', params: { group_id: group_id } }"
            class="btn btn-primary d-block mt-3 col-5 me-1"
            >احصائيات المجموعة
          </router-link>
          <router-link
            :to="{ name: 'group.group-books', params: { group_id: group_id } }"
            class="btn btn-primary d-block mt-3 col-5 me-1"
            >كتب يقرأوها الأعضاء
          </router-link>
          <router-link
            :to="{
              name: 'group.group-exceptions',
              params: { group_id: group_id },
            }"
            class="btn btn-primary d-block mt-3 col-5 me-1"
            v-if="authInGroup && authInGroup.user_type != 'ambassador'"
            >الاجازات</router-link
          >
          <!-- <router-link to="/" class="btn btn-primary d-block mt-3 col-5 me-1">التحديات</router-link> -->
          <router-link
            :to="{
              name: 'group.ambassadors-reading',
              params: { group_id: group_id },
            }"
            class="btn btn-primary d-block mt-3 col-5 me-1"
            v-if="authInGroup && authInGroup.user_type != 'ambassador'"
          >
            انجاز السفراء
          </router-link>
          <router-link
            :to="{ name: 'group.auditMarks', params: { group_id: group_id } }"
            class="btn btn-primary d-block mt-3 col-5 me-1"
            v-if="
              authInGroup &&
              authInGroup.user_type != 'ambassador' &&
              (group.type.type == 'supervising' ||
                group.type.type == 'advising')
            "
          >
            تدقيق العلامات
          </router-link>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div id="post-modal-data" class="card">
        <!-- ##### <AddPost /> ##### -->
        <AddPost
          @add-post="addPost"
          type="normal"
          :timeline_id="group.timeline_id"
        />
        <!-- ##### <AddPost /> ##### -->
      </div>
      <div class="card">
        <div class="card-body">
          <!-- ##### LIST POSTS ##### -->
          <LazyLoadedPosts
            :timeline_id="group.timeline_id"
            ref="lazyLoadedPostsRef"
          />
          <!-- ##### END LIST POSTS ##### -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import listMembers from "@/components/group/members.vue";
import AddPost from "@/components/post/add/AddPost";
import LazyLoadedPosts from "@/components/post/LazyLoadedPosts";
import GroupService from "@/API/services/group.service";

export default {
  name: "Group-detail",
  components: {
    listMembers,
    AddPost,
    LazyLoadedPosts,
  },
  async created() {
    try {
      const response = await GroupService.getById(this.group_id);
      this.group = response.info;
      this.week_avg = (Math.round(response.week_avg * 100) / 100).toFixed(2);
      this.week = response.week;
      this.authInGroup = response.authInGroup;
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      group: null,
      group_id: this.$route.params.group_id,
      week: null,
      week_avg: 0,
      authInGroup: null,
      group_type: {
        followup: "فريق متابعة",
        supervising: "فريق رقابة",
        advising: "فريق توجيه",
        consultation :'فريق الاستشارة',
        Administration :'الإدارة العليا'
      },
      reasons: [],
    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "group.group-detail",
        params: { group_id: this.group_id },
      });
    },
    addPost(post) {
      this.$refs.lazyLoadedPostsRef.addNewPost(post);
    },
  },
};
</script>
