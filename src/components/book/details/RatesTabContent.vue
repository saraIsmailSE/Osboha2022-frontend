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
                  :rate="comment.rate?.rate"
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
                <span v-if="$route.params.user_id">لهذا السفير</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </tab-content-item>
  <modal
    id="rateModal"
    ref="rateModal"
    dialogClass="modal-dialog-centered modal-dialog-scrollable"
    tabindex="-1"
    aria-labelledby="rateModalLabel"
    :aria-hidden="false"
    v-if="!book?.book.userRate"
  >
    <model-header>
      <h5 class="modal-title" id="rateModalLabel">
        تقييم كتاب {{ book?.book?.name }}
      </h5>
      <a
        href="javascript:void(0);"
        class="lh-1"
        data-bs-dismiss="modal"
        ref="closeBtn"
      >
        <span class="material-symbols-outlined">close</span>
      </a>
    </model-header>
    <model-body>
      <AddRate
        :book_id="book?.book?.id"
        @closeModel="closeModel"
        @addRate="addRate"
      />
    </model-body>
  </modal>
</template>
<script>
import Comment from "@/components/comment/Comment.vue";
import AddRate from "@/components/book/rate/AddRate.vue";

import RateService from "@/API/services/rate.service";
import UserInfoService from "@/Services/userInfoService";

import helper from "@/utilities/helper";
import { commentMixin } from "@/mixins/comment.mixin";

export default {
  name: "RatesTabContent",
  components: {
    Comment,
    AddRate,
  },
  mixins: [commentMixin],
  provide() {
    return {
      deleteComment: this.deleteComment,
    };
  },
  inject: ["book"],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["updateBook"],

  data() {
    return {
      rates: [],
      loading: false,
      totalRates: 0,
      page: 1,
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },

    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
    },

    hasMore() {
      return (
        this.rates.length < this.totalRates &&
        this.totalRates > 0 &&
        this.rates.length > 0
      );
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
          this.rates.push(response);
          this.totalRates = 1;
        } else {
          this.rates.push(...response.rates);
          this.totalRates = response.total;
        }
      } catch (e) {
        helper.toggleToast(
          "حدث خطأ أثناء تحميل البيانات, الرجاء المحاولة مرة أخرى",
          "error",
        );
      } finally {
        this.loading = false;
      }
    },

    async loadMore() {
      this.page++;
      await this.getRates(this.page);
    },

    calculateAverageRate(sum, count) {
      let avgRate = Math.round(sum / count);
      avgRate = avgRate > 5 ? 5 : avgRate;
      return (avgRate * 100) / 5;
    },

    addRate(item) {
      this.rates.unshift(item);

      const sum = parseInt(this.book.reviews_sum) + item.rate.rate;
      const avgRate = this.calculateAverageRate(sum, this.totalRates + 1);

      this.$emit("updateBook", {
        reviews_count: this.book.reviews_count + 1,
        reviews_sum: sum,
        rate: avgRate,
        userRate: item.rate,
      });
      this.totalRates++;
    },

    editRate(item) {
      const foundRate = this.rates?.find((i) => i.id === item.id);
      if (foundRate) {
        const sum =
          parseInt(this.book.reviews_sum) -
          foundRate.rate.rate +
          item.rate.rate;
        const avgRate = this.calculateAverageRate(sum, this.totalRates);

        foundRate.body = item.body;
        foundRate.rate.rate = item.rate.rate;
        this.$emit("updateBook", {
          reviews_sum: sum,
          rate: avgRate,
        });
      }
    },

    addComment(reply, comment_id) {
      const options = {
        itemsKey: "rates",
        totalItemsKey: "totalRates",
        incrementTotalItems: false,
        removeEmitEvent: true,
      };

      this.$options.mixins[0].methods.addComment.call(
        this,
        reply,
        comment_id,
        options,
      );
    },

    deleteComment(comment_id) {
      const options = {
        itemsKey: "rates",
        totalItemsKey: "totalRates",
        type: "rate",
      };

      this.$options.mixins[0].methods.deleteComment.call(
        this,
        comment_id,
        options,
      );
    },

    editComment(comment) {
      const options = {
        itemsKey: "rates",
      };

      this.$options.mixins[0].methods.editComment.call(this, comment, options);
    },

    reactToComment(comment_id, status) {
      const options = {
        itemsKey: "rates",
      };

      this.$options.mixins[0].methods.reactToComment.call(
        this,
        comment_id,
        status,
        options,
      );
    },

    async closeModel() {
      this.$refs.closeBtn.click();
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
