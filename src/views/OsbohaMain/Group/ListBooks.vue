<template>
  <iq-card>
    <template v-slot:body>
      <h2 class="text-center mb-3">كتب يقرؤها الأعضاء</h2>
      <hr />
      <h4 class="text-center mt-3 mb-3" v-if="books">
        العدد الكلي: {{ books.length }}
      </h4>

      <template v-if="books && books.length > 0">
        <div class="d-grid gap-3 d-grid-template-1fr-19">
          <BookCard
            v-for="bookInfo in booksLoaded"
            :key="bookInfo.id"
            :cardInfo="bookInfo"
            :isAmbassador="false"
            :isProfile="true"
          />
        </div>
        <div class="row my-2" v-if="books.length > booksLoaded.length">
          <div class="col-12 text-center">
            <a
              class="btn"
              role="button"
              @click="loadMore()"
              style="font-weight: 600; font-size: 1.1rem; color: #1f662b"
              >عرض المزيد</a
            >
          </div>
        </div>
      </template>
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
          </div>
        </iq-card>
      </div>
    </template>
  </iq-card>
</template>
<script>
import BookCard from "@/components/book/BookCard.vue";
import GroupService from "@/API/services/group.service";

export default {
  name: "Group Book",
  components: { BookCard },
  async created() {
    try {
      this.books = await GroupService.getBooks(this.$route.params.group_id);
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      books: null,
      length: 9,
    };
  },
  methods: {
    loadMore() {
      if (this.length > this.books.length) return;
      this.length = this.length + 9;
    },
  },
  computed: {
    booksLoaded() {
      return this.books.slice(0, this.length);
    },
  },
};
</script>
