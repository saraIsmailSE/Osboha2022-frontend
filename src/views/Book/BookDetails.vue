<template>
  <main>
    <div class="row">
      <div class="col-lg-12">
        <div class="card card-block card-stretch card-height blog blog-detail">
          <div class="card-body">
            <div class="image-block text-center mt-3">
              <img
                :src="resolve_img_url(book?.book?.media?.path ?? '')"
                class="img-fluid rounded w-25"
                alt="blog-img"
              />
            </div>
            <div class="blog-description mt-3 text-center">
              <h2 class="mb-3 pb-3 border-bottom text-center">
                {{ book?.book?.name }}
              </h2>
              <div
                class="blog-meta d-flex align-items-center mb-3 position-right-side flex-wrap"
              >
                <div class="date me-4 d-flex align-items-center">
                  <i class="material-symbols-outlined pe-2 md-18 text-primary"
                    >calendar_month</i
                  >تاريخ الاضافة {{ formattedDate }}
                </div>
                <div class="like me-4 d-flex align-items-center">
                  <i class="material-symbols-outlined pe-2 md-18 text-primary">
                    star
                  </i>
                  {{ book?.rate }}% تقييم
                </div>
                <div class="comments me-4 d-flex align-items-center">
                  <i class="material-symbols-outlined pe-2 md-18 text-primary">
                    book
                  </i>
                  عدد الصفحات:
                  {{ book?.book?.end_page }}
                </div>
                <div class="comments me-4 d-flex align-items-center">
                  <i class="material-symbols-outlined pe-2 md-18 text-primary">
                    comment </i
                  >{{ book?.theses_count }} أطروحة
                </div>
                <div class="comments me-4 d-flex align-items-center">
                  <i class="material-symbols-outlined pe-2 md-18 text-primary">
                    mode_comment </i
                  >{{ book?.comments_count }} تعليق
                </div>
              </div>
              <div class="text-center">
                {{ shortBriefText }}
                <a class="load-btn" v-on:click="loadMoreBriefText" v-if="isMore"
                  >...قراءة المزيد</a
                >
                <a class="load-btn" v-on:click="loadLessBriefText" v-if="isLess"
                  >قراءة أقل</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12" v-if="book?.book?.allow_comments">
        <div class="card card-block card-stretch card-height blog">
          <button
            type="submit"
            class="btn btn-primary d-block w-100"
            data-bs-toggle="modal"
            data-bs-target="#modals"
          >
            كتابة أطروحة
          </button>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card card-block card-stretch card-height blog user-comment">
          <div class="card-header d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">الأطروحات</h4>
            </div>
          </div>
          <div class="card-body">
            <div class="row" v-if="theses.length">
              <!-- display theses -->
              <div
                class="col-lg-12"
                v-for="comment in theses"
                :key="comment.id"
              >
                <div class="card card-block card-stretch card-height blog">
                  <div class="card-body">
                    <Comment
                      :allowComment="book?.book?.allow_comments"
                      :comment="comment"
                      :totalThesisPages="
                        comment.thesis
                          ? comment.thesis.end_page -
                              comment.thesis.start_page >
                            0
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
                  :id="`editThesis-${comment.id}`"
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
                    <createThesis :book="book?.book" :thesisToEdit="comment" />
                  </model-body>
                </modal>
              </div>

              <div class="col-sm-12 text-center" v-if="loading">
                <img
                  :src="
                    require('@/assets/images/page-img/page-load-loader.gif')
                  "
                  alt="loader"
                  style="height: 100px"
                />
              </div>

              <!-- <div class="col-lg-12">
                <div class="card card-block card-stretch card-height blog">
                  <CreateComment :type="'comment'" @addComment="addComment" />
                </div>
              </div> -->
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
              <div class="col-lg-12">
                <div class="text-center d-flex align-items-center">
                  <span class="material-symbols-outlined">
                    comments_disabled
                  </span>
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
      </div>
    </div>
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
        />
      </model-body>
    </modal>
  </main>
</template>
<script>
import Comment from "@/components/comment/Comment.vue";
import CreateComment from "@/components/comment/CreateComment.vue";
import createThesis from "@/components/book/theses/create.vue";
import bookService from "@/API/services/book.service";
import thesisService from "@/API/services/thesis.service";
import moment from "moment";
import helper from "@/utilities/helper";

export default {
  name: "BookDetails",
  components: {
    Comment,
    createThesis,
    // CreateComment,
  },
  provide() {
    return {
      deleteComment: this.deleteComment,
    };
  },
  // props: ["id"],
  async created() {
    await this.getBook(this.$route.params.book_id);
    await this.getTheses(this.page);
  },
  data() {
    return {
      theses: [],
      book: null,
      fullBriefText: "",
      shortBriefText: "",
      page: 1,
      totalTheses: 0,
      loading: false,
    };
  },
  methods: {
    async getBook(id) {
      const response = await bookService.getById(id);
      this.book = response.data;
      this.fullBriefText = this.book.book?.brief;
      this.shortBriefText = this.fullBriefText?.slice(0, 200);
    },
    loadMoreBriefText() {
      this.shortBriefText = this.fullBriefText;
    },
    loadLessBriefText() {
      this.shortBriefText = this.fullBriefText?.slice(0, 200);
    },
    resolve_img_url: function (path) {
      return path ? path : require("@/assets/images/main/200x200-book.png");
    },
    async getTheses(page) {
      if (this.loading || !this.book) return;

      this.loading = true;
      try {
        let response;
        if (this.$route.params.thesis_id) {
          response = await thesisService.getBookThesis(
            this.$route.params.book_id,
            this.$route.params.thesis_id
          );
        } else {
          response = await thesisService.getThesesByBookId(
            this.$route.params.book_id,
            page,
            this.$route.params.user_id ?? ""
          );
        }

        if (response.statusCode === 200) {
          this.theses.push(...response.data.theses);
          this.totalTheses = response.data.total;
        } else {
          helper.toggleToast(
            "حدث خطأ أثناء تحميل البيانات, الرجاء المحاولة مرة أخرى",
            "error"
          );
        }
      } catch (e) {
        helper.toggleToast(
          "حدث خطأ أثناء تحميل البيانات, الرجاء المحاولة مرة أخرى",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },
    async loadMoreTheses() {
      this.page++;
      await this.getTheses(this.page);
    },
    async closeModel() {
      this.$refs.closeBtn.click();
    },

    addThesis(thesis) {
      this.theses.unshift(thesis);
      this.book.theses_count++;
      this.book.comments_count =
        this.book.comments_count + thesis.replies.length + 1;
      this.totalTheses++;
      this.book.book.userBooks = thesis.user.userBooks;
      this.book.last_thesis = thesis.thesis;

      if (
        this.book.book.userBooks.length > 0 &&
        this.book.book.userBooks[0].status === "finished"
      ) {
        helper.toggleToast("تهانينا, لقد أنهيت الكتاب", "success");
      }
    },
    findComment(theses, comment_id) {
      for (let i = 0; i < theses.length; i++) {
        if (theses[i].id === comment_id) {
          return theses[i];
        } else if (theses[i].replies.length > 0) {
          const comment = this.findComment(theses[i].replies, comment_id);
          if (comment) {
            return comment;
          }
        }
      }
    },
    addComment(reply, comment_id) {
      if (!comment_id) {
        this.theses.push(reply);
        this.book.comments_count++;
        this.totalTheses++;
        return;
      } else {
        const comment = this.findComment(this.theses, comment_id);
        comment.replies.push(reply);
        this.book.comments_count++;
        console.log("[added comment at book]", comment);
      }
    },
    deleteComment(comment_id) {
      for (let i = 0; i < this.theses.length; i++) {
        if (this.theses[i].id === comment_id) {
          this.theses.splice(i, 1);
          this.book.comments_count--;
          this.totalTheses--;
          return;
        } else if (this.theses[i].replies.length > 0) {
          for (let j = 0; j < this.theses[i].replies.length; j++) {
            if (this.theses[i].replies[j].id === comment_id) {
              this.theses[i].replies.splice(j, 1);
              this.book.comments_count--;
              return;
            }
          }
        }
      }
    },
    editComment(comment) {
      let commentToEdit = this.findComment(this.theses, comment.id);
      commentToEdit.body = comment.body;
      commentToEdit.media = comment.media;
    },
    reactToComment(comment_id, status) {
      let comment = this.findComment(this.theses, comment_id);
      if (status) {
        comment.reactions_count++;
        comment.reacted_by_user = true;
      } else {
        comment.reactions_count--;
        comment.reacted_by_user = false;
      }
    },
  },
  computed: {
    formattedDate() {
      return moment(this.book?.created_at).format("YYYY-MM-DD");
    },
    isMore() {
      return this.shortBriefText?.length < this.fullBriefText?.length;
    },
    isLess() {
      return (
        this.shortBriefText?.length >= this.fullBriefText?.length &&
        this.fullBriefText?.length > 200
      );
    },
    hasMoreTheses() {
      return (
        this.theses.length < this.totalTheses &&
        this.totalTheses > 0 &&
        this.theses.length > 0
      );
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
