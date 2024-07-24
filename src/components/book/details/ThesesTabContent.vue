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
                v-if="hasMoreTheses"
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
                <span v-if="$route.params.user_id">لهذا السفير</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </tab-content-item>
  <modal
    id="modals"
    ref="modals"
    dialogClass="modal-dialog-centered modal-dialog-scrollable"
    tabindex="-1"
    aria-labelledby="modalsLabel"
    :aria-hidden="false"
  >
    <model-header>
      <h5 class="modal-title" id="modalsLabel">
        {{ book?.book?.name }} || أطروحة جديدة
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
      <createThesis
        :book="book?.book"
        :lastThesis="book?.last_thesis"
        @closeModel="closeModel"
        @addThesis="addThesis"
        :isRamadanActive="book?.isRamadanActive"
      />
    </model-body>
  </modal>
</template>
<script>
import createThesis from "@/components/book/theses/create.vue";
import Comment from "@/components/comment/Comment.vue";
import thesisService from "@/API/services/thesis.service";
import helper from "@/utilities/helper";
import { commentMixin } from "@/mixins/comment.mixin";

export default {
  name: "ThesesTabContent",
  components: {
    createThesis,
    Comment,
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
      theses: [],
      loading: false,
      totalTheses: 0,
      page: 1,
    };
  },
  computed: {
    hasMoreTheses() {
      return (
        this.theses.length < this.totalTheses &&
        this.totalTheses > 0 &&
        this.theses.length > 0
      );
    },
  },
  async created() {
    if (this.$route.params.book_id) {
      await this.getTheses(this.page);
    }
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

        if (response.statusCode === 200) {
          this.theses.push(...response.data.theses);
          this.totalTheses = response.data.total;
        } else {
          helper.toggleToast(
            "حدث خطأ أثناء تحميل البيانات, الرجاء المحاولة مرة أخرى",
            "error",
          );
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

    async loadMoreTheses() {
      this.page++;
      await this.getTheses(this.page);
    },

    addThesis(thesis) {
      this.theses.unshift(thesis);
      this.$emit("updateBook", {
        theses_count: this.book.theses_count + 1,
        comments_count: this.book.comments_count + 1,
        last_thesis: thesis.thesis,
        userBooks: thesis.user.userBooks || thesis.user.user_books,
      });
      this.totalTheses++;

      if (
        (thesis.user.user_books.length > 0 &&
          thesis.user.user_books[0].status === "finished") ||
        (thesis.user.userBooks.length > 0 &&
          thesis.user.userBooks[0].status === "finished")
      ) {
        helper.toggleToast("تهانينا, لقد أنهيت الكتاب", "success");
      }
    },

    addComment(reply, comment_id) {
      const options = {
        itemsKey: "theses",
        totalItemsKey: "totalTheses",
        incrementTotalItems: false,
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
        itemsKey: "theses",
        totalItemsKey: "totalTheses",
        type: "thesis",
      };

      this.$options.mixins[0].methods.deleteComment.call(
        this,
        comment_id,
        options,
      );
    },

    editComment(comment) {
      const options = {
        itemsKey: "theses",
      };

      this.$options.mixins[0].methods.editComment.call(this, comment, options);
    },

    reactToComment(comment_id, status) {
      const options = {
        itemsKey: "theses",
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
<style lang=""></style>
