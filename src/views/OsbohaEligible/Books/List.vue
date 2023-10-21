<template>
  <div>
    <!-- <div v-if="openBook.length > 0">
      <h1 class="text-center mb-3">الانجاز الحالي </h1>
      <BookCard v-for="(bookInfo, index) in openBook" :key="index" :bookInfo="bookInfo" :current=true />
      <hr>
    </div>  -->
    <h2 class="text-center mb-3">ابحث عن كتاب </h2>
    <div class="iq-email-search d-flex justify-content-center mb-3">
      <form class="w-100  me-2 position-relative searchbox">
        <div class="form-group mb-0">
          <input type="text" class=" border border-primary w-100 text search-input form-control " v-model.trim="search"
            placeholder="ابحث عن كتاب" @keyup="filteredBooks" />
          <a class="search-link" href="javascript:void(0);" @click="filteredBooks()">
            <i class="material-symbols-outlined">
              search
            </i>
          </a>
        </div>
      </form>
    </div>

    <div v-if="empty" class="alert alert-danger">{{ empty }}</div>

    <div class="d-grid gap-3 d-grid-template-1fr-19">
      <BookCard v-for="bookInfo in books" :key="bookInfo.id" :bookInfo="bookInfo" :current=false />
    </div>

    <div class=" text-center mt-3">

      <ul class="pagination w-100">
        <router-link class="page-item page-link" :to="{ name: 'book.eligible', query: { page: page - 1 } }" rel="prev"
          v-if="page != 1">
          السابق
        </router-link>
        <li class="page-item page-link" :class="checkActive(page)">
          <router-link class="page-item page-link" :to="{ name: 'book.eligible', query: { page: page } }">
            {{ page }}
          </router-link>
        </li>

        <router-link class="page-item page-link" :to="{ name: 'book.eligible', query: { page: page + 1 } }" rel="next"
          v-if="hasNextPage">
          التالي
        </router-link>

      </ul>
    </div>


  </div>
</template>
<script>
import BookCard from '@/components/EligibleComponents/Book/BookCard.vue'
import bookService from '@/API/EligibleServices/bookServices'
import { watchEffect } from 'vue'

export default {
  name: 'List',
  components: { BookCard },

  created() {
    watchEffect(() => {
      this.books = null
      this.getBooks(this.page);      
    })
  },
  props: ['page'],
  data() {
    return {
      books: [],
      openBook: [],
      totalBooks: 0,
      current: 1,
      search: "",
      empty: "",
      deferredPrompt: null

    }
  },
  methods: {
    async getBooks(page) {
      const response = await bookService.getAllBooks(page);
      console.log("🚀 ~ file: List.vue:84 ~ getBooks ~ response:", response)
      this.books = response.books.data;
      this.openBook = response.open_book;
      this.totalBooks = response.books.total
      this.current = page
    },

    async filteredBooks() {
      this.empty = ''

      if (this.search) {
        const response = await bookService.getBookByName(this.search);
        if (response == 'empty') {
          this.empty = 'لا يوجد كتاب بهذا الاسم'
        }
        else {
          this.books = response.data;
          this.totalBooks = response.total

        }
      }
      else {
        const response = await bookService.getAllBooks(this.page);
        this.books = response.books.data;
      }
    },
    checkActive(item) {
      let className = ''
      if (this.current == item) {
        className = 'active'
      }
      else {
        className = className + ' done'
      }
      return className
    }

  },
  computed: {
    hasNextPage() {
      var totalPages = Math.ceil(this.totalBooks / 10)
      return this.page < totalPages
    },
    totalPages() {
      return Math.ceil(this.totalBooks / 10)
    },
  },

}

</script>
<style scoped>
.pagination {
  display: flex;
  width: 290px;
  padding: 0;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>