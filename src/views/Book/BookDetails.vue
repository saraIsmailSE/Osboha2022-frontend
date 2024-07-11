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

      <div class="col-md-6 col-sm-12">
        <div class="card card-block card-stretch card-height blog">
          <button
            type="submit"
            class="btn btn-primary d-block w-100"
            data-bs-toggle="modal"
            data-bs-target="#modals"
            :disabled="shouldDisableButton"
          >
            كتابة أطروحة
          </button>
        </div>
      </div>

      <div class="col-md-6 col-sm-12">
        <div class="card card-block card-stretch card-height blog">
          <button
            type="submit"
            class="btn btn-dark d-block w-100"
            data-bs-toggle="modal"
            data-bs-target="#rateModal"
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
                  title="التقييم"
                  @click="changeTab('rates')"
                />
              </tab-nav>
            </div>
          </div>
        </iq-card>

        <div class="tab-content">
          <ThesesTabContent
            @updateBook="updateBook"
            :active="selectedTab === 'theses'"
            v-if="selectedTab === 'theses'"
          />

          <RatesTabContent
            @updateBook="updateBook"
            :active="selectedTab === 'rates'"
            v-if="selectedTab === 'rates'"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { watchEffect, computed } from "vue";

import BookHeader from "@/components/book/details/BookHeader.vue";
import ThesesTabContent from "@/components/book/details/ThesesTabContent.vue";
import RatesTabContent from "@/components/book/details/RatesTabContent.vue";

import bookService from "@/API/services/book.service";
import userBookService from "@/API/services/user-books.service";
import RateService from "@/API/services/rate.service";

import helper from "@/utilities/helper";

export default {
  name: "BookDetails",
  components: {
    BookHeader,
    ThesesTabContent,
    RatesTabContent,
  },
  provide() {
    return {
      book: computed(() => this.book),
      loadingBook: computed(() => this.loadingBook),
      toggleLoadingBook: this.toggleLoadingBook,
      toggleSuggestedBook: this.toggleSuggestedBook,
      isSuggested: computed(() => this.isSuggested),
    };
  },
  // props: ["id"],
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
  data() {
    return {
      book: null,
      isSuggested: false,
      eligibleToWriteThesis: true,
      loadingBook: false,
      loadingRates: false,
      ratesPage: 1,
      rates: [],
      selectedTab: "theses",
    };
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

    updateBook(updatedBook) {
      this.book = {
        ...this.book,
        ...updatedBook,
      };
    },

    changeTab(tab) {
      this.selectedTab = tab;
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
