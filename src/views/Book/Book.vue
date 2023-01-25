<template>
  <BooksFilter />
  <hr />
  <div class="d-grid gap-3 d-grid-template-1fr-19">
    <BookCard v-for="bookInfo in bookInfos" :key="bookInfo.id" :cardInfo="bookInfo" />
  </div>
  <div class=" text-center mt-3">

    <ul class="pagination w-100">
      <router-link class="page-item page-link" :to="{ name: 'social.book', query: { page: page - 1 } }" rel="prev"
        v-if="page != 1">
        السابق
      </router-link>
      <li class="page-item page-link" :class="checkActive(page)">
        <router-link class="page-item page-link" :to="{ name: 'social.book', query: { page: page } }">
          {{ page }}
        </router-link>
      </li>

      <router-link class="page-item page-link" :to="{ name: 'social.book', query: { page: page + 1 } }" rel="next"
        v-if="hasNextPage">
        التالي
      </router-link>

    </ul>
  </div>

</template>
<script>
import BookCard from '../../components/book/BookCard.vue';
import BooksFilter from '../../components/filters/booksFilter.vue';
import bookService from '../../API/services/book.service'
import { watchEffect } from 'vue'

export default {
  name: 'Book',
  components: { BookCard, BooksFilter },
  created() {
    watchEffect(() => {
      this.books = null
      this.getBooks(this.page);
    })
  },
  data() {
    return {
      bookInfos:
        [
          {
            id: '1.jpg',
            title: 'الاقتصاد في درس واحد',
            text: 'هنري هازليت',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
          {
            id: '2.jpg',
            title: 'إلى من ضاقت عليه نفسه',
            text: 'يحيى اليحيى',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
          {
            id: '3.jpg',
            title: 'أولادنا بين التبعية والاستقلال',
            text: 'عبد العزيز الخضراء',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
          {
            id: '4.jpg',
            title: 'كيف تفوز في مشاكل البكاء',
            text: 'سينيتا ويثام',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
          {
            id: '5.jpg',
            title: 'لماذا نكتب',
            text: 'ميرديث ماران',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
          {
            id: '6.jpg',
            title: 'اسمي أحمر',
            text: 'اورهان باموق',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
          {
            id: '5.jpg',
            title: 'لماذا نكتب',
            text: 'ميرديث ماران',
            extraInfo: [
              {
                info: 'المستوى',
                value: 'متوسط'
              },
              {
                info: 'الفئة',
                value: 'ثقافية'
              },
              {
                info: 'الصفحات',
                value: '250'
              }
            ],
          },
        ],

      books: [],
      totalBooks: 0,
      current: 1,
      search: "",
      empty: "",

    }
  },
  methods: {
    async getBooks(page) {
      const response = await bookService.getAll(page);
      this.books = response.books.data;
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
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

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