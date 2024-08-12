<template lang="">
  <tab-content-item
    :active="active"
    id="book-rates"
    aria-labelled-by="pills-rates-tab"
  >
    <div class="card card-block card-stretch card-height blog user-comment">
      <div class="card-header d-flex justify-content-between">
        <div class="header-title">
          <h4 class="card-title">التقييمات</h4>
        </div>
      </div>
      <div class="card-body">
        <div class="row" v-if="rates.length">
          <div class="col-lg-12" v-for="comment in rates" :key="comment.id">
            <div class="card card-block card-stretch card-height blog">
              <div class="card-body">
                <Comment
                  :allowComment="book?.book?.allow_comments"
                  :comment="comment"
                  :rate="comment?.rate?.rate"
                  @addComment="addComment"
                  @editComment="editComment"
                  @reactToComment="reactToComment"
                />
              </div>
            </div>

            <modal
              :id="`editRate-${comment.id}`"
              ref="editRateRef"
              dialogClass="modal-dialog-centered modal-dialog-scrollable"
              tabindex="-1"
              aria-labelledby="editRate"
              :aria-hidden="false"
              v-if="comment.user_id == user.id || isAdmin"
            >
              <model-header>
                <h5 class="modal-title" id="modalsLabel">تعديل التقييم</h5>
                <a
                  href="javascript:void(0);"
                  class="lh-1"
                  data-bs-dismiss="modal"
                  ref="editCloseBtn"
                >
                  <span class="material-symbols-outlined">close</span>
                </a>
              </model-header>
              <model-body>
                <AddRate :rateToEdit="comment" @editRate="editRate" />
              </model-body>
            </modal>
          </div>

          <div class="col-sm-12 text-center" v-if="loading">
            <img
              :src="require('@/assets/images/gif/page-load-loader.gif')"
              alt="loader"
              style="height: 100px"
            />
          </div>

          <!--Load more-->
          <div class="col-lg-12">
            <div class="card card-block card-stretch card-height blog">
              <button
                type="button"
                class="btn btn-primary d-block w-100"
                v-if="hasMore"
                @click="loadMore"
                :disabled="loading"
              >
                تحميل المزيد
              </button>
            </div>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-sm-12 text-center" v-if="loading">
            <img
              :src="require('@/assets/images/gif/page-load-loader.gif')"
              alt="loader"
              style="height: 100px"
            />
          </div>
          <div class="col-lg-12" v-else>
            <div class="text-center d-flex align-items-center">
              <span class="material-symbols-outlined"> comments_disabled </span>
              <h5 class="ms-2" v-if="$route.params.rate_id">
                لم يتم العثور على هذا التقييم
              </h5>
              <h5 class="ms-2" v-else>
                لا يوجد تقييمات
                <span
                  v-if="
                    $route.params.user_id && $route.name == 'book.user-rate'
                  "
                >
                  >لهذا السفير</span
                >
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </tab-content-item>
</template>
<script>
import Comment from "@/components/comment/Comment.vue";
import AddRate from "@/components/book/rate/AddRate.vue";

import RateService from "@/API/services/rate.service";
import UserInfoService from "@/Services/userInfoService";

import helper from "@/utilities/helper";

export default {
  name: "RatesTabContent",
  components: {
    Comment,
    AddRate,
  },
  inject: ["book"],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    rates: {
      type: Array,
      default: () => [],
    },
    totalRates: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
    hasMore: {
      type: Boolean,
      default: false,
    },
    addComment: Function,
    editComment: Function,
    reactToComment: Function,
    editRate: Function,
  },
  emits: ["pushToItems", "updateItemsTotal", "updateItemsPage"],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },

    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
    },
  },
  async created() {
    if (this.$route.params.book_id) {
      await this.getRates(this.page);
    }
  },
  methods: {
    async getRates(page) {
      if (this.loading || !this.book) return;

      this.loading = true;
      try {
        let response;
        if (this.$route.params.rate_id) {
          response = await RateService.getRateById(this.$route.params.rate_id);
        } else {
          response = await RateService.getBookRates(
            this.$route.params.book_id,
            page,
          );
        }

        if (this.$route.params.rate_id) {
          this.$emit("pushToItems", response, { spread: false });
          this.$emit("updateItemsTotal", 1);
        } else {
          this.$emit("pushToItems", response.rates);
          this.$emit("updateItemsTotal", response.total);
        }
      } catch (e) {
        console.log("🚀 ~ getRates ~ e:", e);
        helper.toggleToast(
          "حدث خطأ أثناء تحميل البيانات, الرجاء المحاولة مرة أخرى",
          "error",
        );
      } finally {
        this.loading = false;
      }
    },

    async loadMore() {
      this.$emit("updateItemsPage", this.page + 1);

      this.$nextTick(async () => {
        await this.getRates(this.page);
      });
    },
  },
};
</script>
<style lang="scss">
.material-symbols-outlined.star {
  font-variation-settings:
    "FILL" 1,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}

//style hover state of the star
.material-symbols-outlined.clickable-star:hover {
  color: #f1c40f;
  font-variation-settings:
    "FILL" 1,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}
</style>
