<template>
  <main>
    <div class="row">
      <div class="col-lg-12">
        <div class="card card-block card-stretch card-height blog blog-detail">
          <div class="card-body">
            <div class="position-absolute start-0" v-if="book?.book">
              <span role="button" @click="download(book?.book?.link)"
                class="material-symbols-outlined align-middle display-5 me-1s">
                download
              </span>
              <router-link class="material-symbols-outlined align-middle display-5 me-3" :to="{
                name: 'book.update',
                params: { book_id: book?.book?.id },
              }" v-if="isAdmin || inBooksTeam">
                edit
              </router-link>
            </div>

            <div class="image-block text-center mt-3">
              <img :src="resolve_img_url(book?.book?.media?.path ?? '')" class="img-fluid rounded w-25" alt="blog-img" />
            </div>
            <div class="blog-description mt-3 text-center">
              <h2 class="mb-3 pb-3 border-bottom text-center">
                {{ book?.book?.name }}
              </h2>
              <div class="blog-meta d-flex align-items-center mb-3 position-right-side flex-wrap">
                <div class="date me-4 d-flex align-items-center">
                  <i class="material-symbols-outlined pe-2 md-18 text-primary">calendar_month</i>تاريخ الاضافة {{
                    formattedDate }}
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
                    comment </i>{{ book?.theses_count }} أطروحة
                </div>
                <div class="comments me-4 d-flex align-items-center">
                  <i class="material-symbols-outlined pe-2 md-18 text-primary">
                    mode_comment </i>{{ book?.comments_count }} تعليق
                </div>
              </div>
              <div class="text-center">
                {{ shortBriefText }}
                <a class="load-btn" v-on:click="loadMoreBriefText" v-if="isMore">...قراءة المزيد</a>
                <a class="load-btn" v-on:click="loadLessBriefText" v-if="isLess">قراءة أقل</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12" v-if="book?.book?.allow_comments && eligibleToWriteThesis">
        <div class="card card-block card-stretch card-height blog">
          <button type="submit" class="btn btn-primary d-block w-100" data-bs-toggle="modal" data-bs-target="#modals">
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
              <div class="col-lg-12" v-for="comment in theses" :key="comment.id">
                <div class="card card-block card-stretch card-height blog">
                  <div class="card-body">
                    <Comment :allowComment="book?.book?.allow_comments" :comment="comment" :totalThesisPages="comment.thesis
                      ? comment.thesis.end_page -
                        comment.thesis.start_page >
                        0
                        ? comment.thesis.end_page -
                        comment.thesis.start_page +
                        1
                        : 0
                      : 0
                      " @addComment="addComment" @editComment="editComment" @reactToComment="reactToComment" />
                  </div>
                </div>

                <modal :id="`editThesis-${comment.id}`" ref="editThesisRef"
                  dialogClass="modal-dialog-centered modal-dialog-scrollable" tabindex="-1" aria-labelledby="editThesis"
                  :aria-hidden="false">
                  <model-header>
                    <h5 class="modal-title" id="modalsLabel">تعديل الأطروحة</h5>
                    <a href="javascript:void(0);" class="lh-1" data-bs-dismiss="modal" ref="editCloseBtn">
                      <span class="material-symbols-outlined">close</span>
                    </a>
                  </model-header>
                  <model-body>
                    <createThesis :book="book?.book" :thesisToEdit="comment" />
                  </model-body>
                </modal>
              </div>

              <div class="col-sm-12 text-center" v-if="loading">
                <img :src="require('@/assets/images/page-img/page-load-loader.gif')
                  " alt="loader" style="height: 100px" />
              </div>

              <!-- <div class="col-lg-12">
                <div class="card card-block card-stretch card-height blog">
                  <CreateComment :type="'comment'" @addComment="addComment" />
                </div>
              </div> -->
              <!--Load more thesis-->
              <div class="col-lg-12">
                <div class="card card-block card-stretch card-height blog">
                  <button type="button" class="btn btn-primary d-block w-100" v-if="hasMoreTheses" @click="loadMoreTheses"
                    :disabled="loading">
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
    <modal id="modals" ref="modals" dialogClass="modal-dialog-centered modal-dialog-scrollable" tabindex="-1"
      aria-labelledby="modalsLabel" :aria-hidden="false">
      <model-header>
        <h5 class="modal-title" id="modalsLabel">
          {{ book?.book?.name }} || أطروحة جديدة
        </h5>
        <a href="javascript:void(0);" class="lh-1" data-bs-dismiss="modal" ref="closeBtn">
          <span class="material-symbols-outlined">close</span>
        </a>
      </model-header>
      <model-body>
        <createThesis :book="book?.book" :lastThesis="book?.last_thesis" @closeModel="closeModel"
          @addThesis="addThesis" />
      </model-body>
    </modal>
  </main>
</template>
<script>
import Comment from "@/components/comment/Comment.vue";
import CreateComment from "@/components/comment/CreateComment.vue";
import createThesis from "@/components/book/theses/create.vue";
import bookService from "@/API/services/book.service";
import userBookService from "@/API/services/user-books.service";
import thesisService from "@/API/services/thesis.service";
import moment from "moment";
import helper from "@/utilities/helper";
import UserInfoService from "@/Services/userInfoService";

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
    window.addEventListener('popstate', this.popstateEventAction);
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
      eligibleToWriteThesis: true,
    };
  },
  methods: {
    popstateEventAction() {
      const body = document.querySelector('body');
      body.removeAttribute("data-bs-overflow")
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
      window.removeEventListener('popstate', this.popstateEventAction);
    },
    async getBook(id) {
      const response = await bookService.getById(id);
      this.book = response.data;
      this.fullBriefText = this.book.book?.brief;
      this.shortBriefText = this.fullBriefText?.slice(0, 200);

      //check if free book 
      if (this.book.book.type.type == 'free') {
        //check if auth user is the owner
        if (response.book_owner == this.user.id) {
          // Check rules for free book.
          this.eligibleToWriteThesis = await userBookService.eligibleToWriteThesis(this.user.id);
        }
        else {
          this.eligibleToWriteThesis = false;
        }
      }

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
    download(link) {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-primary btn-lg ms-2",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "ملاحظة هامة",
          text: "في مشروعنا لن لا نقوم أبدًا بتصوير الكتب المطبوعة ولا نقوم بنسب هذه الكتب للمشروع أو محاولة إخفاء أسماء دور النشر وحقوقها . إنما كل ما نقوم به هو عملية البحث عن هذه الكتب في مواقع الانترنت و إحضار روابط الحصول عليها للاستفادة منها . علمًا أننا لا نقوم بعملية بيع للكتب أو الاستفادة المادية منها مطلقًا ولكننا نؤمن أن من حق دور النشر إيجاد وسائل لمنع تصوير كتبها ووضعها على مواقع الانترنت ولكن أن يتواجد الكتاب على الانترنت مجانًا سواء عن طريق موقع لديه أذن بالنشر ، أو عن طريق كاتب الكتاب أو غيرهم ، ثم لا نقوم بقراءة هذه الكتب ونمنع أنفسنا من العلم فهذا الأمر لن يساهم في عملية ايقاف الكتب الالكترونية إنما سوف يساهم فقط بمنع أنفسنا عن علم مطروح وتقييد أنفسنا بظروف تدفعنا للجهل والتوقف عن التعلم . علمًا أن المشروع يتعهد دومًا بحذف أي كتاب من المنهج إذا لم يناسب وجوده كاتب الكتب أو دار النشر الخاصة بالكتاب ، فبإمكان كل شخص إما قراءة الكتاب مطبوعًا أو الاستفادة من النسخ التي نجمعها من مواقع الكتب المنتشرة مع إخلاء مسؤوليتنا حول إن كانت هذه المواقع لديها أذن بالنشر والتوزيع من عدمه فنترك هذا الأمر لدور النشر . هذا ونسأل الله أن يصلح نوايانا ويجعلها خالصة لوجهه الكريم وتطبيقًا لأمره لنا بالقراءة لأجل التعلم والتفكر . والله أعلم .",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "تحميل",
          cancelButtonText: "إلغاء",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            window.open(link, "_blank");
          }
        });
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
    user() {
      return this.$store.getters.getUser;
    },
    inBooksTeam() {
      return UserInfoService.hasRole(this.user, "book_quality_team");
    },
    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
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
