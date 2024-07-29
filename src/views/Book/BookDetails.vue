<template>
  <div class="col-sm-12 text-center" v-if="loadingBook">
    <img src="@/assets/images/gif/loader-3.gif" alt="loader" />
  </div>
  <main v-else>
    <div class="row">
      <div class="col-lg-12">
        <div class="card card-block card-stretch card-height blog blog-detail">
          <BookHeader />
        </div>
      </div>

      <div class="col-12 mb-3" v-if="hasFinished">
        <div class="alert alert-info text-center mb-0 py-1 px-2">
          <span class="material-symbols-outlined align-middle"> info </span>
          <span> لقد أنهيت هذا الكتاب مسبقاً </span>
        </div>
      </div>

      <div
        class="col-sm-12"
        :class="{
          'col-md-6': hasFinished,
        }"
      >
        <div class="card card-block card-stretch card-height blog">
          <button
            type="submit"
            class="btn btn-primary d-block w-100"
            data-bs-toggle="modal"
            data-bs-target="#thesesModal"
            @click="this.type = 'thesis'"
            :disabled="shouldDisableButton"
          >
            كتابة أطروحة
          </button>
        </div>
      </div>

      <div class="col-md-6 col-sm-12" v-if="hasFinished">
        <div class="card card-block card-stretch card-height blog">
          <button
            type="button"
            class="btn btn-dark d-block w-100"
            data-bs-toggle="modal"
            data-bs-target="#rateModal"
            @click="this.type = 'rate'"
            :disabled="!book?.book?.allow_comments || book?.userRate"
            v-if="!book?.userRate"
          >
            تقييم الكتاب
          </button>
          <router-link
            :to="{
              name: 'book.user-rate',
              params: { rate_id: book?.userRate?.id, book_id: book?.book?.id },
              query: { tab: 'rates' },
            }"
            class="btn btn-dark d-block w-100"
            v-else-if="book?.userRate && $route.name !== 'book.user-rate'"
          >
            عرض تقييمك
          </router-link>
          <router-link
            :to="{
              name: 'book.book-details',
              params: { book_id: book?.book?.id },
              query: { tab: 'rates' },
            }"
            class="btn btn-dark d-block w-100"
            v-else-if="book?.userRate && $route.name === 'book.user-rate'"
          >
            عودة للتقييمات
          </router-link>
        </div>
      </div>

      <div class="col-lg-12">
        <iq-card class="iq-card">
          <div class="iq-card-body p-0">
            <div class="user-tabing">
              <tab-nav
                :pills="true"
                id="pills-tab"
                class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0"
              >
                <tab-nav-items
                  class="col-sm-6 p-0"
                  :active="selectedTab === 'theses'"
                  id="pills-theses-tab"
                  ariaControls="pills-theses"
                  role="tab"
                  :ariaSelected="selectedTab === 'theses'"
                  title="الأطروحات"
                  @click="changeTab('theses')"
                />
                <tab-nav-items
                  class="col-sm-6 p-0"
                  :active="selectedTab === 'rates'"
                  id="pills-rates-tab"
                  ariaControls="pills-rates"
                  role="tab"
                  :ariaSelected="selectedTab === 'rates'"
                  title="التقييمات"
                  @click="changeTab('rates')"
                />
              </tab-nav>
            </div>
          </div>
        </iq-card>

        <div class="tab-content">
          <ThesesTabContent
            :active="selectedTab === 'theses'"
            :theses="comments"
            :hasMore="hasMore"
            :page="commentsPage"
            @pushToItems="pushToItems"
            @updateItemsTotal="updateItemsTotal"
            @updateItemsPage="updateItemsPage"
            :addComment="addComment"
            :editComment="editComment"
            :reactToComment="reactToComment"
            v-if="selectedTab === 'theses'"
          />

          <RatesTabContent
            :active="selectedTab === 'rates'"
            :rates="comments"
            :hasMore="hasMore"
            :page="commentsPage"
            @pushToItems="pushToItems"
            @updateItemsTotal="updateItemsTotal"
            @updateItemsPage="updateItemsPage"
            :addComment="addComment"
            :editComment="editComment"
            :reactToComment="reactToComment"
            :editRate="editRate"
            v-if="selectedTab === 'rates'"
          />
        </div>
      </div>
    </div>
  </main>

  <modal
    id="thesesModal"
    ref="thesesModal"
    dialogClass="modal-dialog-centered modal-dialog-scrollable"
    tabindex="-1"
    aria-labelledby="thesesModalLabel"
    :aria-hidden="false"
  >
    <model-header>
      <h5 class="modal-title" id="thesesModalLabel">
        {{ book?.book?.name }} || أطروحة جديدة
      </h5>
      <a
        href="javascript:void(0);"
        class="lh-1"
        data-bs-dismiss="modal"
        ref="closeThesesModalBtn"
      >
        <span class="material-symbols-outlined">close</span>
      </a>
    </model-header>
    <model-body>
      <createThesis
        :book="book?.book"
        :lastThesis="book?.last_thesis"
        @closeModel="this.$refs.closeThesesModalBtn.click()"
        @addThesis="addNewComment"
        :isRamadanActive="book?.isRamadanActive"
      />
    </model-body>
  </modal>

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
        ref="closeRateModalBtn"
      >
        <span class="material-symbols-outlined">close</span>
      </a>
    </model-header>
    <model-body>
      <AddRate
        :book_id="book?.book?.id"
        @closeModel="this.$refs.closeRateModalBtn.click()"
        @addRate="addRate"
      />
    </model-body>
  </modal>
</template>
<script>
import { watchEffect, computed } from "vue";

import BookHeader from "@/components/book/details/BookHeader.vue";
import ThesesTabContent from "@/components/book/details/ThesesTabContent.vue";
import RatesTabContent from "@/components/book/details/RatesTabContent.vue";
import createThesis from "@/components/book/theses/create.vue";
import AddRate from "@/components/book/rate/AddRate.vue";

import bookService from "@/API/services/book.service";
import userBookService from "@/API/services/user-books.service";

import helper from "@/utilities/helper";

import { commentMixin } from "@/mixins/comment.mixin";

export default {
  name: "BookDetails",
  components: {
    BookHeader,
    ThesesTabContent,
    RatesTabContent,
    createThesis,
    AddRate,
  },
  provide() {
    return {
      book: computed(() => this.book),
      loadingBook: computed(() => this.loadingBook),
      toggleLoadingBook: this.toggleLoadingBook,
      toggleSuggestedBook: this.toggleSuggestedBook,
      isSuggested: computed(() => this.isSuggested),
      deleteComment: this.deleteComment,
    };
  },
  mixins: [commentMixin],
  data() {
    return {
      book: null,
      isSuggested: false,
      eligibleToWriteThesis: true,
      loadingBook: false,
      selectedTab: "theses",
      comments: [],
      commentsPage: 1,
      totalComments: 0,
      type: "thesis",
    };
  },
  async created() {
    const queryParam = this.$route.query.tab;
    if (queryParam) {
      this.selectedTab = queryParam;
    }

    if (this.$route.params.rate_id) {
      this.selectedTab = "rates";
    }

    this.loadingBook = true;

    watchEffect(async () => {
      if (this.$route.params.book_id) {
        await this.init();
      }
    });
  },
  methods: {
    async init() {
      await this.getBook(this.$route.params.book_id);
      window.addEventListener("popstate", this.popstateEventAction);
    },

    popstateEventAction() {
      const body = document.querySelector("body");
      body.removeAttribute("data-bs-overflow");
      body.removeAttribute("data-bs-padding-right");
      body.removeAttribute("style");
      body.classList.remove("modal-open");
      const element = document.getElementsByClassName("modal-backdrop");
      for (let i = 0; i < element.length; i++) {
        element[i].remove();
      }
      this.removePopstateEventAction();
    },

    removePopstateEventAction() {
      window.removeEventListener("popstate", this.popstateEventAction);
    },

    async getBook(id) {
      this.loadingBook = true;

      try {
        const response = await bookService.getById(id);
        this.book = response.data;
        this.isSuggested = this.book.isSuggested;

        //check if free book
        if (response.data.book.type.type == "free") {
          //check if auth user is the owner
          if (response.data.book_owner == this.user.id) {
            // Check rules for free book.
            this.eligibleToWriteThesis =
              await userBookService.eligibleToWriteThesis(this.user.id);
          } else {
            this.eligibleToWriteThesis = false;
          }
        }
      } catch (e) {
        helper.toggleToast(
          "حدث خطأ أثناء تحميل البيانات, الرجاء المحاولة مرة أخرى",
          "error",
        );
      } finally {
        this.loadingBook = false;
      }
    },

    toggleLoadingBook(status) {
      this.loadingBook = status;
    },

    toggleSuggestedBook(status) {
      this.isSuggested = status;
    },

    changeTab(tab) {
      this.selectedTab = tab;
    },

    addNewComment(item) {
      //check if the active tab is same as type
      if (this.isTabSameType) {
        this.comments.unshift(item);
      }

      if (this.type === "thesis") {
        this.book = {
          ...this.book,
          theses_count: this.book.theses_count + 1,
          comments_count: this.book.comments_count + 1,
          last_thesis: item.thesis,
          book: {
            ...this.book.book,
            userBooks: item.user.userBooks || item.user.user_books,
          },
        };

        if (
          (item.user.user_books?.length > 0 &&
            item.user.user_books[0].status === "finished") ||
          (item.user.userBooks?.length > 0 &&
            item.user.userBooks[0].status === "finished")
        ) {
          helper.toggleToast("تهانينا, لقد أنهيت الكتاب", "success");
        }
      }

      if (this.isTabSameType) {
        this.totalComments++;
      }
    },

    addComment(reply, comment_id) {
      const options = {
        itemsKey: "comments",
        totalItemsKey: "totalComments",
        incrementTotalItems: false,
      };

      this.$options.mixins[0].methods.addComment.call(
        this,
        reply,
        comment_id,
        options,
      );

      if (this.type === "thesis") {
        this.book = {
          ...this.book,
          comments_count: this.book.comments_count + 1,
        };
      }
    },

    deleteComment(comment_id) {
      const options = {
        itemsKey: "comments",
        totalItemsKey: "totalComments",
        type: this.type,
      };

      this.$options.mixins[0].methods.deleteComment.call(
        this,
        comment_id,
        options,
      );
    },

    editComment(comment) {
      const options = {
        itemsKey: "comments",
      };

      this.$options.mixins[0].methods.editComment.call(this, comment, options);
    },

    reactToComment(comment_id, status) {
      const options = {
        itemsKey: "comments",
      };

      this.$options.mixins[0].methods.reactToComment.call(
        this,
        comment_id,
        status,
        options,
      );
    },

    pushToItems(items, options) {
      if (options.spread !== undefined && options.spread === false) {
        this.comments.push(items);
        return;
      }

      if (options.reset !== undefined && options.reset === true) {
        this.comments = items;
        return;
      }

      this.comments.push(...items);
    },

    updateItemsTotal(total) {
      this.totalComments = total;
    },

    updateItemsPage(page) {
      this.commentsPage = page;
    },

    calculateAverageRate(sum, count) {
      let avgRate = Math.round(sum / count);
      avgRate = avgRate > 5 ? 5 : avgRate;
      return (avgRate * 100) / 5;
    },

    addRate(item) {
      if (this.isTabSameType) {
        this.comments.unshift(item);
      }

      const sum = parseInt(this.book.reviews_sum) + item.rate.rate;
      const avgRate = this.calculateAverageRate(sum, this.totalComments + 1);

      this.book = {
        ...this.book,
        reviews_count: this.book.reviews_count + 1,
        reviews_sum: sum,
        rate: avgRate,
        userRate: item.rate,
      };

      if (this.isTabSameType) {
        this.totalComments++;
      }
    },

    editRate(item) {
      const foundRate = this.comments?.find((i) => i.id === item.id);
      if (foundRate) {
        const sum =
          parseInt(this.book.reviews_sum) -
          foundRate.rate.rate +
          item.rate.rate;
        const avgRate = this.calculateAverageRate(sum, this.totalComments);

        foundRate.body = item.body;
        foundRate.rate.rate = item.rate.rate;
        this.book = {
          ...this.book,
          reviews_sum: sum,
          rate: avgRate,
        };
      }
    },

    updateBook(data) {
      this.book = {
        ...this.book,
        ...data,
      };
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },

    shouldDisableButton() {
      const allowComments = this.book?.book?.allow_comments;
      const eligibleToWriteThesis = this.eligibleToWriteThesis;
      const lastThesis = this.book?.last_thesis;

      if (allowComments === 0) {
        return !lastThesis;
      }

      return !eligibleToWriteThesis;
    },

    hasFinished() {
      return (
        this.book?.book?.userBooks?.length > 0 &&
        (this.book?.book?.userBooks[0]?.status === "finished" ||
          this.book?.book?.userBooks[0]?.counter > 0)
      );
    },

    isTabSameType() {
      return (
        (this.selectedTab === "theses" && this.type === "thesis") ||
        (this.selectedTab === "rates" && this.type === "rate")
      );
    },

    hasMore() {
      return (
        this.comments.length < this.totalComments &&
        this.totalComments > 0 &&
        this.comments.length > 0
      );
    },
  },
  watch: {
    selectedTab(val) {
      this.comments = [];
      this.totalComments = 0;
      this.commentsPage = 1;

      if (val === "theses") {
        this.type = "thesis";
      } else {
        this.type = "rate";
      }
    },
    //watch route change
    $route(to, from) {
      this.comments = [];
      this.totalComments = 0;
      this.commentsPage = 1;

      if (this.$route.query.tab) {
        this.selectedTab = this.$route.query.tab;
      }
    },
  },
};
</script>
<style>
.load-btn {
  color: #216d2e;
  font-weight: bold;
  cursor: pointer;
}
</style>
