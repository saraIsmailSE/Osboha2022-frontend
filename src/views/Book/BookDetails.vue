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
            <Thesis
              v-for="thesis in theses"
              :key="thesis.id"
              :thesis="thesis"
            />

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
    dialogClass="modal-fullscreen-sm-down"
    tabindex="-1"
    title="Create Post"
    aria-labelledby="modalsLabel"
    aria-hidden="true"
  >
    <model-header>
      <h5 class="modal-title" id="modalsLabel">اسم الكتاب || أطروحة جديدة</h5>
      <a href="javascript:void(0);" class="lh-1" data-bs-dismiss="modal">
        <span class="material-symbols-outlined">close</span>
      </a>
    </model-header>
    <model-body>
      <createThesis />
    </model-body>
  </modal>
</template>
<script>
import Thesis from "../../components/book/theses/thesis.vue";
import createThesis from "../../components/book/theses/create.vue";
import bookService from "../../API/services/book.service";
import thesisService from "../../API/services/thesis.service";
import moment from "moment";

export default {
  name: "BookDetails",
  components: {
    Thesis,
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
      const response = await bookService.getById(id);
      //check if response is success
      if (response.statusCode === 200) {
        // console.log('success', response)
        this.book = response.data;
        this.fullBriefText = this.book.book?.brief;
        this.shortBriefText = this.fullBriefText?.slice(0, 200);
      } else {
        //handle error
        console.log("error: ", response);
      }
    },
    loadMoreBriefText() {
      this.shortBriefText = this.fullBriefText;
    },
    loadLessBriefText() {
      this.shortBriefText = this.fullBriefText?.slice(0, 200);
    },
    resolve_img_url: function (path) {
      if (path) {
        return path;
      }
      let images = require.context(
        "../../assets/images/books",
        false,
        /\.png$|\.jpg$/
      );
      return images("./1.jpg");
    },
    async getTheses(page) {
      const response = await thesisService.getThesesByBookId(this.id, page);
      if (response.statusCode === 200) {
        this.theses.push(...response.data.theses);
        this.totalTheses = response.data.total;
      } else {
        console.log("error: ", response.data);
      }
    },
    async loadMoreTheses() {
      this.page++;
      await this.getTheses(this.page);
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
      return this.theses.length < this.totalTheses;
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
