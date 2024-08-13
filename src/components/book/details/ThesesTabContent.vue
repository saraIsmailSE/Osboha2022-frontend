<template lang="">
  <tab-content-item
    :active="active"
    id="book-theses"
    aria-labelled-by="pills-theses-tab"
  >
    <div class="card card-block card-stretch card-height blog user-comment">
      <div class="card-header d-flex justify-content-between">
        <div class="header-title">
          <h4 class="card-title">الأطروحات</h4>
        </div>
      </div>
      <div class="card-body">
        <div class="row" v-if="theses.length">
          <!-- display theses -->
          <div class="col-lg-12" v-for="comment in theses" :key="comment.id">
            <div class="card card-block card-stretch card-height blog">
              <div class="card-body">
                <Comment
                  :allowComment="book?.book?.allow_comments"
                  :comment="comment"
                  :totalThesisPages="
                    comment.thesis
                      ? comment.thesis.end_page - comment.thesis.start_page > 0
                        ? comment.thesis.end_page -
                          comment.thesis.start_page +
                          1
                        : 0
                      : 0
                  "
                  @addComment="addComment"
                  @editComment="editComment"
                  @reactToComment="reactToComment"
                />
              </div>
            </div>

            <modal
              :id="`editThesis-${
                comment.type.trim() === 'screenshot'
                  ? comment.comment_id
                  : comment.id
              }`"
              ref="editThesisRef"
              dialogClass="modal-dialog-centered modal-dialog-scrollable"
              tabindex="-1"
              aria-labelledby="editThesis"
              :aria-hidden="false"
            >
              <model-header>
                <h5 class="modal-title" id="modalsLabel">تعديل الأطروحة</h5>
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
                <createThesis
                  :book="book?.book"
                  :thesisToEdit="comment"
                  :isRamadanActive="book?.isRamadanActive"
                />
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

          <!--Load more thesis-->
          <div class="col-lg-12">
            <div class="card card-block card-stretch card-height blog">
              <button
                type="button"
                class="btn btn-primary d-block w-100"
                v-if="hasMore"
                @click="loadMoreTheses"
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
              <h5 class="ms-2" v-if="$route.params.thesis_id">
                لم يتم العثور على هذه الأطروحة
              </h5>
              <h5 class="ms-2" v-else>
                لا يوجد أطروحات
                <span
                  v-if="$route.params.user_id && $route.name == 'book.user-theses'"
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
import createThesis from "@/components/book/theses/create.vue";

import thesisService from "@/API/services/thesis.service";
import helper from "@/utilities/helper";
import { watch } from "vue";

export default {
  name: "ThesesTabContent",
  components: {
    Comment,
    createThesis,
  },
  data() {
    return {
      loading: false,
    };
  },
  inject: ["book"],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    theses: {
      type: Array,
      default: () => [],
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
  },
  emits: ["pushToItems", "updateItemsTotal", "updateItemsPage"],
  async created() {
    // this.$emit("updateItemsPage", 1);
    // this.$emit("updateItemsTotal", 0);
    // this.$emit("pushToItems", [], { reset: true });

    // this.$nextTick(async () => {
    if (this.$route.params.book_id) {
      await this.getTheses(this.page);
    }
    // });
  },

  methods: {
    async getTheses(page) {
      if (this.loading || !this.book) return;

      this.loading = true;
      try {
        let response;
        if (this.$route.params.thesis_id) {
          response = await thesisService.getBookThesis(
            this.$route.params.book_id,
            this.$route.params.thesis_id,
          );
        } else {
          response = await thesisService.getThesesByBookId(
            this.$route.params.book_id,
            page,
            this.$route.params.user_id ?? "",
          );
        }

        this.$emit("pushToItems", response.data.theses);
        this.$emit("updateItemsTotal", response.data.total);
      } catch (e) {
        console.log("🚀 ~ getTheses ~ e:", e);

        helper.toggleToast(
          "حدث خطأ أثناء تحميل البيانات, الرجاء المحاولة مرة أخرى",
          "error",
        );
      } finally {
        this.loading = false;
      }
    },

    async loadMoreTheses() {
      this.$emit("updateItemsPage", this.page + 1);

      this.$nextTick(async () => {
        await this.getTheses(this.page);
      });
    },
  },
};
</script>
<style lang=""></style>
