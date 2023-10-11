<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div
          class="card position-relative inner-page-bg bg-primary"
          style="height: 150px"
        >
          <div class="inner-page-title">
            <h3 class="text-white">الكتب</h3>
          </div>
        </div>
      </div>

      <div class="col-sm-12" v-if="books && books.length > 0">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">قائمة الكتب</h4>
            <div v-if="error" class="alert alert-danger" role="alert">
              لايمكن حذف الكتاب لاحتوائه على توثيقات
            </div>
                <div class="iq-email-search d-flex justify-content-center mb-3">
                <form class="w-100 me-2 position-relative searchbox">
                  <div class="form-group mb-0">
                    <input
                      type="text"
                      class="border border-primary w-100 text search-input form-control"
                      v-model.trim="search"
                      placeholder="ابحث عن كتاب"
                      @keyup="filteredBooks"
                    />
                    <a
                      class="search-link"
                      href="javascript:void(0);"
                      @click="filteredBooks()"
                    >
                      <i class="material-symbols-outlined"> search </i>
                    </a>
                  </div>
                </form>
              </div>
          </template>

          <template v-slot:body>
            <button
              @click="$router.push({ path: `/admin/addbook` })"
              class="btn btn-primary float-end"
            >
              اضافة الكتاب
            </button>
            <div class="table-responsive">
          
              <table id="datatable" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>اسم الكتب</th>
                    <th>عدد الصفحات</th>
                    <th>قسم الكتاب</th>
                    <th>صعوبة الكتاب</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(book,index) in books" :key="index">
                    <td>
                      <a
                        href="javascript:void(0);"
                        @click="listQuestions(question.user_book.id)"
                      >
                        {{ book.name }}
                      </a>
                    </td>
                    <td>
                      {{ book.end_page - book.start_page }}
                    </td>
                    <td>
                      {{ book.section.name }}
                    </td>
                    <td>
                      {{ book.level.name }}
                    </td>
                    <td>
                      <button
                        @click="$router.push(`updatebook/${book.id}`)"
                        class="btn btn-primary text-white bg-delete"
                      >
                        تعديل
                      </button>
                    </td>
                    <td>
                      <button
                        @click="deleteThesis(book.id)"
                        class="btn btn-danger text-white bg-delete"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <ul class="pagination w-100">
                <router-link
                  class="page-item page-link"
                  :to="{ name: 'admin.book-list', query: { page: page - 1 } }"
                  rel="prev"
                  v-if="page != 1"
                >
                  السابق
                </router-link>
                <li class="page-item page-link" :class="checkActive(page)">
                  <router-link
                    class="page-item page-link"
                    :to="{ name: 'admin.book-list', query: { page: page } }"
                  >
                    {{ page }}
                  </router-link>
                </li>

                <router-link
                  class="page-item page-link"
                  :to="{ name: 'admin.book-list', query: { page: page + 1 } }"
                  rel="next"
                  v-if="hasNextPage"
                >
                  التالي
                </router-link>
              </ul>
            </div>
          </template>
        </iq-card>
      </div>
    </div>
  </div>
</template>
<script>
import { socialvue } from "@/config/pluginInit";
import userServices from "@/API/EligibleServices/userServices";
import bookService from "@/API/EligibleServices/bookServices";
import useVuelidate from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import { watchEffect } from 'vue'


export default {
  name: "acceptNormal",
  components: {},
  props: ["page"],
  setup() {
    return { v$: useVuelidate() };
  },

  mounted() {
    socialvue.index();
  },
  async created() {
    watchEffect(() => {
      this.books = null
      this.getBooks(this.page);
    })

    await this.getBooks(this.page);
    console.log(this.books);
  }, 
  data() {
    return {
      error: false,
      books: [] ,
      users: [],
      reject: [],
      rejectNote: "",
      current: 1,
      totalBooks:'',
      loader: false,
        empty: "",

      search: "",
    };
  },
 
  methods: {
    
    async getBooks(page) {
      const response = await bookService.getAllBooks(page);
      this.books = response.books.data; 
      this.totalBooks = response.books.total;
      this.current = page;
    },
    deleteThesis(id) {
      this.show = !this.show;
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-primary btn-lg ms-2",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "هل أنت متأكد؟",
          text: "موافقتك تعني حذف هذه الكتاب ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم قم بالحذف",
          cancelButtonText: "تراجع  ",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        })
        .then((willDelete) => {
          if (willDelete.isConfirmed) {
            bookService
              .deleteBook(id)
              .then((response) => {
                swalWithBootstrapButtons.fire({
                  title: "تم الحذف",
                  text: "تم حذف الكتاب",
                  icon: "success",
                  showClass: {
                    popup: "animate__animated animate__zoomIn",
                  },
                  hideClass: {
                    popup: "animate__animated animate__zoomOut",
                  },
                });
                location.reload();
              })
              .catch((error) => {
                this.error = !this.error;
              });
          }
        });
    },
    async filteredBooks() {
      this.empty = "";

      if (this.search) {
        const response = await bookService.getBookByName(this.search);
        if (response == "empty") {
          this.empty = "لا يوجد كتاب بهذا الاسم";
        } else {
          this.books = response.data;
          this.totalBooks = response.total;
        }
      } else {
        const response = await bookService.getAllBooks(this.page);
        this.books = response.books.data;
      }
    },
    checkActive(item) {
      let className = "";
      if (this.current == item) {
        className = "active";
      } else {
        className = className + " done";
      }
      return className;
    },
  },
  computed: {
    hasNextPage() {
      var totalPages = Math.ceil(this.totalBooks / 4);
      return this.page < totalPages;
    },
    totalPages() {
      return Math.ceil(this.totalBooks / 10);
    },
  },
};
</script>
