<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card card-block card-stretch card-height blog blog-detail">
        <div class="card-body">
          <div class="image-block text-center mt-3">
            <img
              :src="resolve_img_url(book.book?.media?.path ?? '')"
              class="img-fluid rounded w-25"
              alt="blog-img"
            />
          </div>
          <div class="blog-description mt-3 text-center">
            <h2 class="mb-3 pb-3 border-bottom text-center">
              {{ book.book?.name }}
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
                {{ book.rate }}% تقييم
              </div>
              <div class="comments me-4 d-flex align-items-center">
                <i class="material-symbols-outlined pe-2 md-18 text-primary">
                  mode_comment </i
                >{{ book.theses_count }} أطروحة
              </div>
              <div class="comments me-4 d-flex align-items-center">
                <i class="material-symbols-outlined pe-2 md-18 text-primary">
                  mode_comment </i
                >{{ book.comments_count }} تعليق
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
    <div class="col-lg-12">
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
          <div class="row">
            <!-- display theses -->
            <div class="col-lg-12" v-for="comment in theses" :key="comment.id">
              <div class="card card-block card-stretch card-height blog">
                <div class="card-body">
                  <Comment
                    :comment="comment"
                    :totalThesisPages="
                      comment.thesis
                        ? comment.thesis.end_page -
                          comment.thesis.start_page +
                          1
                        : 0
                    "
                    @addComment="addComment"
                  />
                </div>
              </div>
            </div>

            <!--Load more thesis-->
            <div class="col-lg-12">
              <div class="card card-block card-stretch card-height blog">
                <button
                  type="button"
                  class="btn btn-primary d-block w-100"
                  v-if="hasMoreTheses"
                  @click="loadMoreTheses"
                >
                  تحميل المزيد
                </button>
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
    dialogClass="modal-fullscreen-sm-down"
    tabindex="-1"
    title="Create Post"
    aria-labelledby="modalsLabel"
    aria-hidden="false"
  >
    <model-header>
      <h5 class="modal-title" id="modalsLabel">
        {{ book.book?.name }} || أطروحة جديدة
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
        :start_page="book.book?.start_page"
        :end_page="book.book?.end_page"
        :book_id="this.id"
        @closeModel="closeModel"
        @addThesis="addThesis"
      />
    </model-body>
  </modal>
</template>
<script>
import Comment from "../../components/post/Comment.vue";
import createThesis from "../../components/book/theses/create.vue";
import bookService from "../../API/services/book.service";
import thesisService from "../../API/services/thesis.service";
import moment from "moment";

export default {
  name: "BookDetails",
  components: {
    Comment,
    createThesis,
  },
  props: ["id"],
  async created() {
    await this.getBook(this.id);
    await this.getTheses(this.page);
  },
  data() {
    return {
      theses: [],
      book: {},
      fullBriefText: "",
      shortBriefText: "",
      page: 1,
      totalTheses: 0,
    };
  },
  methods: {
    async getBook(id) {
      try {
        const response = await bookService.getById(id);
        //check if response is success
        if (response.statusCode === 200) {
          // console.log('success', response)
          this.book = response.data;
          this.fullBriefText = this.book.book?.brief;
          this.shortBriefText = this.fullBriefText?.slice(0, 200);
        } else {
          //handle error
          console.log("error: ", response.data);
        }
      } catch (e) {
        console.log(e);
      }
      // const response = await bookService.getById(id);
      // //check if response is success
      // if (response.statusCode === 200) {
      //   // console.log('success', response)
      //   this.book = response.data;
      //   this.fullBriefText = this.book.book?.brief;
      //   this.shortBriefText = this.fullBriefText?.slice(0, 200);
      // } else {
      //   //handle error
      //   console.log("error: ", response);
      // }
    },
    loadMoreBriefText() {
      this.shortBriefText = this.fullBriefText;
    },
    loadLessBriefText() {
      this.shortBriefText = this.fullBriefText?.slice(0, 200);
    },
    resolve_img_url: function (path) {
      return path ? path : require("@/assets/images/books/1.jpg");
    },
    async getTheses(page) {
      try {
        const response = await thesisService.getThesesByBookId(this.id, page);
        if (response.statusCode === 200) {
          this.theses.push(...response.data.theses);
          this.totalTheses = response.data.total;
        } else {
          console.log("error: ", response.data);
        }
      } catch (e) {
        console.log(e);
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
      console.log("comment_id", comment_id);
      if (comment_id === null) {
        this.theses.unshift(reply);
        this.book.comments_count++;
        return;
      } else {
        const comment = this.findComment(this.theses, comment_id);
        comment.replies.push(reply);
        this.book.comments_count++;
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
