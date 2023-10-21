<template>
  <div>
    <div class="col-sm-12 mt-3">
      <count-down v-if="week" :week="week" :timer_type="'modify_timer'" />
      <iq-card class="iq-card" v-if="mark">
        <div class="iq-card-body p-3">
          <AchievementCard :mark="mark" :group="group" />
          <div class="d-flex align-items-center mt-3">
            <Check :theses="theses" />
          </div>

          <!--Support-->
          <Support :expired="expired" :support="support" :supportMark="mark?.support" :week="week" @updateSupportMark="updateSupportMark" />


          <div class="col-12" v-if="!expired">
            <div class="card card-block card-stretch card-height blog">
              <div class="card-header">
                <h2>اجراءات أخرى</h2>
              </div>
              <div class="card-body">
                <div class="blog-description">
                  <button class="btn btn-danger mr-2 mt-1"
                    @click="() => { showExceptionForm = !showExceptionForm; showIsNewForm = false; }">
                    تجميد استثنائي
                  </button>
                  <button class="btn btn-success ms-2 mt-1"
                    v-if="isnew && ((mark.reading_mark + mark.writing_mark + mark.support) <= 50)" @click="() => {
                      showIsNewForm = !showIsNewForm;
                      showExceptionForm = false;
                    }">
                    عضو جديد
                  </button>
                </div>
                <form @submit.prevent="submitException" class="post-text ml-3 w-100 row" v-show="showExceptionForm">
                  <div class="form-group mt-3 mb-1">
                    <h4>السبب</h4>
                    <div class="form-group row ">
                      <textarea rows="5" placeholder="سبب التجميد الاستثنائي" class="rounded form-control mt-2 col-12"
                        id="exceptionReason" v-model="v$.exceptionForm.reason.$model" name="reason">
                      </textarea>
                      <p class="mb-0">
                        <span :class="{ 'text-danger': v$.exceptionForm.reason.$error }">
                          {{ v$.exceptionForm.reason.$model.length }}
                        </span>
                        /250
                      </p>
                    </div>
                    <small class="d-block text-start mt-1" style="color: red" v-if="v$.exceptionForm.reason.$error">
                      * قم بادخال سبب لا ينقص عن 10 حروف ولا يزيد عن 250 حرف
                    </small>
                  </div>
                  <div class="form-group">
                    <button type="submit" :disabled="message" class="btn d-block btn-primary float-end mx-auto">
                      تجميد
                    </button>
                  </div>

                </form>

                <form @submit.prevent="submitIsNew" class="mt-3 post-text ml-3 w-100 row" v-show="showIsNewForm">
                  <div class="form-check mt-2 w-100 text-start">
                    <input type="checkbox" :checked="allowSubmitIsNew" class="form-check-input" id="allow_submit_is_new"
                      ref="allow_submit_is_new" @click="allowSubmitIsNew = !allowSubmitIsNew">
                    <h4 class="form-check-label" for="allow_submit_is_new">
                      هذا العضو جديد وفي اسبوعه الأول أو الثاني
                    </h4>
                  </div>
                  <div class="form-group">
                    <button type="submit" :disabled="!allowSubmitIsNew" class="btn d-block btn-primary float-end mx-auto">
                      اعتماد عضو جديد
                    </button>
                  </div>
                </form>

                <div class="col-sm-12 text-center" v-if="loader">
                  <img src="@/assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px" />
                </div>
                <h4 class="text-center mt-3 mb-3" v-if="message">{{ message }}</h4>

              </div>
            </div>
          </div>


          <div class="d-flex align-items-center mt-3 row">
            <div class="d-inline-block w-100 text-center col-12">
              <router-link v-if="group && week" :to="{
                name: 'group.ambassadors-reading',
                params: { group_id: group.id, week_id: week.id },
              }" class="d-block mt-3 mb-3 w-75 mx-auto">
                <span>إنجازات الفريق</span>
                <span class="align-middle material-symbols-outlined">
                  keyboard_return
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </iq-card>
    </div>
  </div>
</template>
<script>
import AchievementCard from "@/components/book/theses/achievement-card.vue";
import Check from "@/components/book/theses/check.vue";
import MarkService from "@/API/services/marks.service";
import CountDown from "@/components/timer/Countdown.vue";
import Support from "@/components/book/support/Support.vue";
import helper from "@/utilities/helper";
import exceptionService from "@/API/services/user-exception.service";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
  name: "List Reading",
  components: {
    Check,
    AchievementCard,
    CountDown,
    Support,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      theses: [],
      support: null,
      group: null,
      week: null,
      mark: null,
      exceptionForm: {
        reason: "",
        user_id: 0,
        week_id: 0,
      },
      showExceptionForm: false,
      showIsNewForm: false,
      allowSubmitIsNew: false,
      loader: false,
      message: null,
      date: null,
      now: null,
      expired: true,
    };
  },
  async created() {
    try {
      const response = await MarkService.ambassadorMark(
        this.$route.params.ambassador_id, this.$route.params.week_id
      );

      this.mark = response.mark;
      this.theses = response.theses.reduce((groupByBook, item) => {
        const group = groupByBook[item.book.name] || [];
        group["title"] = item.book.name;
        group.push(item);
        groupByBook[item.book.name] = group;
        return groupByBook;
      }, {});
      this.group = response.group;
      this.week = response.currentWeek;
      this.support = response.support;

      const riyadh = new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" });
      this.now = new Date(riyadh);
      this.date = new Date(this.week.modify_timer);
      this.expired = this.time < 0;

      if (!this.expired) {
        this.exceptionForm.user_id = this.mark.user.id;
        this.exceptionForm.week_id = this.$route.params.week_id;
      }


    } catch (error) {
      const res = error.response.data;
      if (res.statusCode === 401) {
        this.$router.push({ name: "NotAuthorized" });
      } else if (res.statusCode === 404) {
        this.$router.push({ name: "NotFound" });
      } else {
        helper.toggleToast("حدث خطأ ما", "error");
      }
    }
  },
  validations() {
    return {
      exceptionForm: {
        reason: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(250),
        },
      },
    };
  },

  methods: {
    updateSupportMark(mark) {
      this.mark.support = mark;
    },
    async submitException() {
      this.v$.$touch();
      if (!this.v$.exceptionForm.$invalid) {
        this.message = "";
        this.loader = true;
        try {
          const response = await exceptionService.setExceptionalFreez(this.exceptionForm);

          this.message = response;
          this.v$.exceptionForm.$reset();
        } catch (error) {
          console.log("[Exception request error]", error);
        } finally {
          this.loader = false;
        }
      }
    },
    async submitIsNew() {
      this.message = "";
      this.loader = true;
      try {
        this.exceptionForm.reason = 'عضو جديد';
        const response = await exceptionService.setNewUser(this.exceptionForm);

        this.message = response;
        this.v$.exceptionForm.$reset();
      } catch (error) {
        console.log("[submit new user error]", error);
      } finally {
        this.loader = false;
      }
    },
  },
  computed: {
    isnew() {
      if (this.mark) {
        const givenDate = new Date(this.mark.user.created_at);
        // Get today's date
        const today = new Date();

        // Calculate the start date of the 2-week period
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(today.getDate() - 14); // Subtract 14 days from today's date

        // Reset time for both dates to 00:00:00 for a day-level comparison
        twoWeeksAgo.setHours(0, 0, 0, 0);
        givenDate.setHours(0, 0, 0, 0);

        // Check if givenDate is between twoWeeksAgo and today
        return givenDate >= twoWeeksAgo && givenDate <= today;
      }
      else {
        return false;
      }
    },
    time() {
      return this.date - this.now;
    },

  },
};
</script>
