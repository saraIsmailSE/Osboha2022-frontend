<template>
  <iq-card>
    <template v-slot:body>
      <h2 class="text-center mb-3">الكتب</h2>
      <hr />
      <div class="row mb-3 d-flex justify-content-between">
        <h4 class="col-6 text-center mt-3 mb-3" v-if="books">
          العدد الكلي: {{ totalBooks }}
        </h4>
        <router-link class="col-6" :to="{
          name: 'book.later-books',
          params: {
            user_id: this.$route.params.user_id,
          },
        }">
          <h4 class="text-center mt-3 mb-3">
            للقراءة لاحقاً
            <span class="align-middle material-symbols-outlined later-book later-book-on">
              favorite
            </span>
          </h4>
        </router-link>
        <router-link :to="{
          name: 'book.free-book',
          params: {
            user_id: this.$route.params.user_id,
          },
        }">
          <h4 class="text-center mt-3 mb-3">
            الكتب الحرة
            <span class="align-middle material-symbols-outlined later-book">
              local_library
            </span>
          </h4>
        </router-link>

        <router-link class="col-6" v-if="isAuth" :to="{
          name: 'user.eligible-books',
          params: {
            user_id: this.$route.params.user_id,
          },
        }">
          <h4 class="text-center mt-3 mb-3">
            الكتب الموثقة
            <span class="align-middle material-symbols-outlined later-book">
              contract_edit
            </span>
          </h4>
        </router-link>
        <router-link class="col-6" :to="{
          name: 'book.reading-list',
          params: {
            user_id: this.$route.params.user_id,
          },
        }">
          <h4 class="text-center mt-3 mb-3">
            قائمة القراءة
            <span class="align-middle material-symbols-outlined later-book">
              book_5
            </span>
          </h4>
        </router-link>
      </div>
      <div class="d-grid gap-3 d-grid-template-1fr-19" v-if="books && books.length > 0">
        <BookCard v-for="bookInfo in books" :key="bookInfo.id" :cardInfo="bookInfo" :isProfile="true" />
      </div>
      <div class="col-sm-12" v-else>
        <iq-card class="iq-card">
          <div class="iq-card-body p-0">
            <div class="image-block text-center">
              <img src="@/assets/images/main/current_book.png" class="img-fluid rounded w-50" alt="blog-img" />
            </div>
            <h4 class="text-center mt-3 mb-3">لا يوجد كتب</h4>
            <router-link v-if="isAuth" class="btn btn-primary w-100" aria-current="page" :to="{ name: 'osboha.book' }">
              ابدأ القراءة
            </router-link>
          </div>
        </iq-card>
      </div>
    </template>
  </iq-card>
</template>
<script>
import BookCard from "@/components/book/BookCard.vue";
import UserInfoService from "@/Services/userInfoService";
import userBookService from "@/API/services/user-books.service";
import helper from "@/utilities/helper";

export default {
  name: "User Book",
  components: { BookCard },
  created() {
    this.getBooks(this.page);
  },
  data() {
    return {
      books: [],
      totalBooks: 0,
      loading: false,
      empty: '',
      page:1,
    };
  },
  methods: {
    //get all books
    async getBooks(page) {
      this.empty = "";
      this.books = [];
      this.loading = true;
      try {
        const response = await userBookService.getOsbohaUserBooks(page, this.$route.params.user_id,'');
        this.books = response.books;
        this.totalBooks = response.total;
      } catch (e) {
        helper.toggleToast("حدث خطأ ما, يرجى المحاولة مرة أخرى", "error");
      } finally {
        this.loading = false;
      }
    },

  },
  computed: {
    isAuth() {
      return this.$store.getters.getUser.id == this.$route.params.user_id;
    },
    user() {
      return this.$store.getters.getUser;
    },
    supervisorAndAbove() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        "consultant",
        "advisor",
        "supervisor",
      ]);
    },
    eligibleTeam() {
      return UserInfoService.hasRoles(this.user, [
        "admin",
        'eligible_admin',
        'reviewer',
        'auditor',
        'user_accept',
        'super_auditer',
        'super_reviewer'
      ]);
    },

  },
};
</script>

<style>
.later-book {
  font-variation-settings:
    'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48
}

.later-book-on {
  color: darkred;
}
</style>