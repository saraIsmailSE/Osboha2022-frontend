<template>
  <main>
    <!-- <BooksFilter
      :sections="sections"
      :toggleActiveFilter="toggleActiveFilter"
      :searchBookByName="searchBookByName"
      :filterBooks="filterBooks"
    />
    <hr /> -->
    <div v-if="empty" class="alert alert-danger">{{ empty }}</div>

    <div class="col-sm-12 text-center" v-if="loading && books.length <= 0">
      <img
        :src="require('@/assets/images/gif/page-load-loader.gif')"
        alt="loader"
        style="height: 100px"
      />
    </div>

    <template v-else>
      <div class="d-grid gap-3 d-grid-template-1fr-19">
        <BookCard
          v-for="bookInfo in books"
          :key="bookInfo.id"
          :cardInfo="bookInfo"
          @updateUserBook="updateUserBook"
          :isRamadanActive="isRamadanActive"
        />
      </div>
      <div class="text-center mt-3">
        <ul class="pagination w-100">
          <router-link
            class="page-item page-link"
            :to="{ name: 'book.ramadan', query: { page: page - 1 } }"
            rel="prev"
            v-if="page != 1"
          >
            السابق
          </router-link>
          <li class="page-item page-link" :class="checkActive(page)">
            <router-link
              class="page-item page-link"
              :to="{ name: 'book.ramadan', query: { page: page } }"
            >
              {{ page }}
            </router-link>
          </li>

          <router-link
            class="page-item page-link"
            :to="{ name: 'book.ramadan', query: { page: page + 1 } }"
            rel="next"
            v-if="hasNextPage"
          >
            التالي
          </router-link>
        </ul>
      </div>
    </template>
  </main>
</template>
<script>
import BookCard from "@/components/book/BookCard.vue";
// import BooksFilter from "@/components/filters/booksFilter.vue";
import bookService from "@/API/services/book.service";
import { watchEffect } from "vue";
import helper from "@/utilities/helper";

export default {
  name: "Book",
  components: {
    BookCard,
    //BooksFilter
  },
  created() {
    watchEffect(() => {
      // this.books = null;
      if (this.search) {
        this.searchBookByName(this.search);
      } else if (
        this.selectedSection > 0 &&
        this.selectedSection < this.sections.length
      ) {
        this.filterBooks(this.selectedSection);
      } else if (this.selectedSection < this.sections.length) {
        this.getBooks(this.page);
      }
    });
  },
  props: ["page"],
  data() {
    return {
      books: [],
      totalBooks: 0,
      current: 1,
      booksPerPage: 9,
      search: "",
      empty: "",
      selectedSection: 0,
      lastSelectedSection: 0,
      loading: false,
      isRamadanActive: false,
      sections: [
        { section_id: 0, section: "الكل", active: true },
        { section_id: 1, section: "بسيط", level: "simple", active: false },
        {
          section_id: 2,
          section: "متوسط",
          level: "intermediate",
          active: false,
        },
        { section_id: 3, section: "عميق", level: "advanced", active: false },
        { section_id: 4, section: "عربي", lang: "arabic", active: false },
        { section_id: 5, section: "إنجليزي", lang: "english", active: false },
      ],
      timer: null,
    };
  },
  methods: {
    //get all books
    async getBooks(page) {
      this.empty = "";
      this.loading = true;
      try {
        const response = await bookService.getAllRamadan(page);
        this.books = response.books;
        this.totalBooks = response.total;
        this.isRamadanActive = response.isRamadanActive;
        this.current = this.page;
      } catch (e) {
        helper.toggleToast("حدث خطأ ما, يرجى المحاولة مرة أخرى", "error");
      } finally {
        this.loading = false;
      }
    },

    //filter books based on the level or language
    async filterBooks(index) {
      this.empty = "";
      this.toggleActiveFilter(index);

      let response = null;

      if (index < this.sections.length) {
        //reset the page parameter of the route to 1 for each level/lang to start the page from the beginning
        if (this.lastSelectedSection != index) {
          this.$router.push({ name: "book.ramadan", query: { page: 1 } });
        }

        if (Number(index) === 0) {
          //all
          this.getBooks(this.page);
        } else {
          if (index > 0 && index < 4) {
            //simple - intermediate - advanced
            //by level
            response = await bookService.getBooksByLevel(
              this.sections[index].level,
              this.page,
            );
          } else if (index >= 4) {
            //arabic - english
            //by language
            response = await bookService.getBooksByLanguage(
              this.sections[index].lang,
              this.page,
            );
          }
        }

        this.lastSelectedSection = index;
      } else {
        this.$router.push({ name: "osboha.ramadan", query: { page: 1 } });

        if (index == this.recentAddedBooks) {
          response = await bookService.getRecentAddedBooks();
        } else if (index == this.mostReadableBooks) {
          response = await bookService.getMostReadableBooks();
        } else if (index == this.randomBook) {
          response = await bookService.getRandomBook();
        }
      }

      if (response && index <= this.sections.length) {
        this.books = response.books;
        this.totalBooks = response.total;
        this.current = this.page;
      } else if (response && index > this.sections.length) {
        this.books = response.length > 1 ? response : [response];
        this.totalBooks = response.length;
        this.current = this.page;
      } else {
        this.empty = "لا يوجد كتب!";
        this.books = [];
      }
    },
    //search books by their name
    async searchBookByName(searchKey) {
      this.empty = "";

      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      if (searchKey) {
        this.search = searchKey;
        this.timer = setTimeout(async () => {
          this.loading = true;
          try {
            const response = await bookService.getBooksByName(
              this.search,
              this.page,
            );
            if (response?.total > 0) {
              this.books = response.books;
              this.totalBooks = response.total;
              this.current = this.page;
            } else {
              this.empty = "لا يوجد كتاب بهذا الاسم";
              this.books = [];
            }
          } catch (e) {
            helper.toggleToast("حدث خطأ ما, يرجى المحاولة مرة أخرى", "error");
          } finally {
            this.loading = false;
          }
        }, 500);
      } else {
        this.search = "";
        //display all books if the search input is empty
        // await this.getBooks(this.page);
      }
      // if (searchKey) {
      // } else {
      //   //display all books if the search input is empty
      //   this.getBooks(this.page);
      // }
    },
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
    // async getSections() {
    //   const response = await SectionService.getAll();
    //   const data = [...this.sections, ...response.data];
    //   this.sections = data.map((section) => {
    //     if (Number(section.section_id) === 0) {
    //       return section;
    //     }
    //     return { ...section, active: false };
    //   });
    //   console.log("sections", this.sections);
    // },

    //activate the selected option
    toggleActiveFilter(sectionId) {
      this.sections = this.sections.map((section) => {
        if (Number(section.section_id) === Number(sectionId)) {
          return { ...section, active: true };
        }
        return { ...section, active: false };
      });
      this.selectedSection = sectionId;
    },
    updateUserBook(book_id, data) {
      this.books = this.books.map((book) => {
        if (Number(book.id) === Number(book_id)) {
          return {
            ...book,
            userBooks: !data ? [] : [data],
          };
        }
        return book;
      });
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
