<template>
  <div>
    <div class="col-sm-12 mt-3">
      <iq-card class="iq-card">
        <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
          <h3 class="text-center mt-3 mb-3">
            {{ group_title }}
          </h3>
        </div>
        <div class="iq-card-body p-3">
          <div class="d-flex align-items-center mt-3">
            <div class="col-12">
              <div class="card card-block card-stretch card-height blog">
                <div class="card-header">
                  <h2>الاجازات - {{EXCEPTION_TYPES[this.exception_type]}}</h2>
                </div>
                <div class="card-body">
                  <div class="blog-description">
                    <table class="table w-100">
                      <thead>
                        <tr>
                          <th scope="col">اسم السفير</th>
                          <th scope="col">فريق المتابعة</th>
                          <th scope="col">الانتهاء</th>
                        </tr>
                      </thead>
                      <tbody v-if="exceptions && exceptions.length > 0">
                        <tr v-for="exception in exceptions.slice(0, length)" :key="exception.id">
                          <td>{{ exception.user.name }}</td>
                          <td v-if="exception.user.followup_team.group">
                            <router-link class="text-center" :to="{
                              name: 'group.group-detail',
                              params: { group_id: exception.user.followup_team.group.id },
                            }">
                              {{ exception.user.followup_team.group.name }}
                            </router-link>
                          </td>
                          <td v-else> لا يوجد</td>
                          <td v-if="exception.end_at">
                            {{ exception.end_at }}
                          </td>
                          <td v-else>------</td>
                          <router-link :to="{
                            name: 'exceptions.listException',
                            params: { exception_id: exception.id },
                          }">
                            <td>
                              <i role="button" class="material-symbols-outlined md-18 me-1 text-primary">
                                visibility
                              </i>
                            </td>
                          </router-link>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr colspan="4">
                          <td>لا يوجد بيانات لعرضها</td>
                        </tr>
                      </tbody>
                    </table>
                    <span class="w-100 text-center mt-3 btn" role="button" @click="loadMore()"
                      v-if="exceptions && exceptions.length > length">
                      عرض المزيد
                    </span>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </iq-card>
    </div>
  </div>
</template>
<script>
import exceptionService from "@/API/services/user-exception.service";
import { EXCEPTION_STATUS, EXCEPTION_TYPES } from "@/utilities/constants";
import { watchEffect } from "vue";

export default {
  name: "List Exceptions",
  async created() {
    try {
      watchEffect(async () => {
        if (this.$route.params.exception_type) {
          this.exception_type=this.$route.params.exception_type;
          await this.getExceptions(this.exception_type);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      exceptions: null,
      group_title: "",
      week_title: "",
      exception_type:'',
      EXCEPTION_STATUS,
      EXCEPTION_TYPES,
      length: 10,
    };
  },
  methods: {
    loadMore() {
      this.length += 10;
    },
    async getExceptions(exception_type) {
      const response = await exceptionService.ListByAdvisor(exception_type, this.user.id);
      this.exceptions = response.exceptions;
      this.group_title = response.advisingGroup;

    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  }
};
</script>
