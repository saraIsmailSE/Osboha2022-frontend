<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <div class="header-title">
              <h4
                class="card-title bg-primary text-white text-center px-2 py-3"
              >
                إحصائيات تفقد التحويل العام
              </h4>
            </div>
          </div>
          <div class="card-body">
            <div class="col-sm-12 text-center" v-if="loading">
              <img src="@/assets/images/gif/loader-3.gif" alt="loader" />
            </div>

            <div class="col-12 col-md-12 col-lg-12" v-else>
              <div class="card">
                <div class="card-title">
                  <h4 class="text-center">الأسبوع {{ weekTitle }}</h4>
                </div>
                <div class="card-body">
                  <div class="blog-description">
                    <table class="table w-100 table-bordered">
                      <thead>
                        <tr class="py-3">
                          <th scope="col">الاسم</th>
                          <th scope="col">الرتبة</th>
                          <th scope="col">الأحد</th>
                          <th scope="col">الاثنين</th>
                          <th scope="col">الثلاثاء</th>
                          <th scope="col">الأربعاء</th>
                          <th scope="col">الخميس</th>
                          <th scope="col">الجمعة</th>
                          <th scope="col">السبت</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(stat, index) in statistics" :key="index">
                          <td>{{ stat.user.name }}</td>
                          <td>{{ ARABIC_ROLES[stat.user.roles[0]] }}</td>
                          <td
                            :class="{
                              'bg-danger': (stat.days[day]?.counter ?? 0) < 2,
                              'bg-primary': (stat.days[day]?.counter ?? 0) >= 2,
                            }"
                            class="text-white text-center"
                            v-for="day in 7"
                            :key="day"
                          >
                            {{ stat.days[day]?.counter ?? 0 }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GeneralConversationService from "@/API/services/general-conversation.service";
import helper from "@/utilities/helper";
import { ARABIC_ROLES } from "@/utilities/constants";

export default {
  name: "FollowupStatistics",
  created() {
    this.getStatistics();
  },
  data() {
    return {
      loading: false,
      statistics: [],
      ARABIC_ROLES,
    };
  },
  computed: {
    weekTitle() {
      return this.$store.state.week_title;
    },
  },
  watch: {
    statistics: function (val) {
      if (val) console.log(this.objectToArray(val[0].days));
    },
  },
  methods: {
    ...helper,
    async getStatistics() {
      if (this.loading) return;
      this.loading = true;
      try {
        const response =
          await GeneralConversationService.getFollowupStatistics();
        this.statistics = response.data;
      } catch (error) {
        this.toggleErrorToast();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
