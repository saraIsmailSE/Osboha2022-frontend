<template>
  <iq-card>
    <template v-slot:body>
      <h2 class="text-center mb-3">الكتب</h2>
      <hr />
      <div class="mb-3 d-flex justify-content-between">
        <h4 class="text-center mt-3 mb-3" v-if="books">
          العدد الكلي: {{ books.length }}
        </h4>
        <router-link
          :to="{
            name: 'book.later-books',
            params: {
              user_id: this.$route.params.user_id,
            },
          }"
        >
          <h4 class="text-center mt-3 mb-3">
            للقراءة لاحقاً
            <span class="align-middle material-symbols-outlined text-danger">
              favorite
            </span>
          </h4>
        </router-link>
      </div>
      <div
        class="d-grid gap-3 d-grid-template-1fr-19"
        v-if="books && books.length > 0"
      >
        <BookCard
          v-for="bookInfo in booksLoaded"
          :key="bookInfo.id"
          :cardInfo="bookInfo"
          :isProfile="true"
        />
        <a
          class="me-3 btn"
          role="button"
          @click="loadMore()"
          v-if="booksLoaded.length > length"
          >عرض المزيد</a
        >
      </div>
      <div class="col-sm-12" v-else>
        <iq-card class="iq-card">
          <div class="iq-card-body p-0">
            <div class="image-block text-center">
              <img
                src="@/assets/images/main/current_book.png"
                class="img-fluid rounded w-50"
                alt="blog-img"
              />
            </div>
            <h4 class="text-center mt-3 mb-3">لا يوجد كتب</h4>
            <router-link
              v-if="isAuth"
              class="btn btn-primary w-100"
              aria-current="page"
              :to="{ name: 'osboha.book' }"
            >
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

export default {
  name: "User Book",
  components: { BookCard },
  props: {
    books: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {
      length: 10,
    };
  },
  methods: {
    loadMore() {
      if (this.length > this.books.length) return;
      this.length = this.length + 10;
    },
  },
  computed: {
    booksLoaded() {
      return this.books.slice(0, this.length);
    },
    isAuth() {
      return this.$store.getters.getUser.id == this.$route.params.user_id;
    },
  },
};
</script>
