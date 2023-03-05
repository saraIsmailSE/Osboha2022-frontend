<template>
  <iq-card>
    <template v-slot:body>
      <h2 class="text-center mb-3">الكتب</h2>
      <hr>
      <div class="d-grid gap-3 d-grid-template-1fr-19">
        <BookCard v-for="bookInfo in user_books" :key="bookInfo.id" :cardInfo="bookInfo.book" />
      </div>
      <!-- <div class="text-center mt-3">
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
      </div> -->
    </template>
  </iq-card>
</template>
<script>
import BookCard from "@/components/book/ambassadorBookCard.vue";
import UserBooks from '@/API/services/user-books.service'

export default {
  name: "User Book",
  components: { BookCard },
  async created() {
    this.user_books = await UserBooks.getUserBooks(this.$route.params.user_id);
  },
  data() {
    return {
      user_books:null,
      totalBooks: 0,
      current: 1,
      booksPerPage: 9,
      page: 1,
    };
  },
  methods: {
    //check which page is active
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
      return this.page < this.totalPages;
    },
    totalPages() {
      return Math.ceil(this.totalBooks / this.booksPerPage);
    },
    recentAddedBooks() {
      return this.sections.length + 1;
    },
    mostReadableBooks() {
      return this.recentAddedBooks + 1;
    },
    randomBook() {
      return this.mostReadableBooks + 1;
    },
  },
};
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
