<template>
  <div class="col-sm-12 mt-3 text-center">
    <iq-card class="iq-card">
      <div class="iq-card-header-toolbar d-flex align-items-center mx-auto">
        <h3 class="text-center mt-3 mb-3">كتب للقراءة لاحقاً</h3>
      </div>
      <div class="iq-card-body p-3">
        <div class="image-block text-center">
          <img
            src="@/assets/images/main/reading_list.png"
            class="img-fluid rounded w-50"
            alt="profile-img"
          />
        </div>
        <ul class="mt-3 list-group" v-if="books.length > 0">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="book in books"
            :key="book.id"
          >
            <router-link
              :to="{
                name: 'book.book-details',
                params: { book_id: book.book.id },
              }"
            >
              <h5>{{ book.book.name }}</h5>
            </router-link>
            <span class="rounded-pill badge bg-primary">{{
              book.book.section.section
            }}</span>
          </li>
        </ul>

        <ul class="mt-3 list-group" v-else>
          <h4 class="text-center mt-3 mb-3">لا يوجد كتب</h4>
          <router-link
            v-if="isAuth"
            class="btn btn-primary w-100"
            aria-current="page"
            :to="{ name: 'osboha.book' }"
          >
            أضف للقائمة
          </router-link>
        </ul>
      </div>
    </iq-card>
  </div>
</template>
<script>
import userBookService from "@/API/services/user-books.service";

export default {
  name: "Later Books",
  async created() {
    this.books = await userBookService.laterBooks(this.$route.params.user_id);
  },
  data() {
    return {
      books: [],
    };
  },
  computed: {
    isAuth() {
      return (
        this.$store.getters.getUser.id === parseInt(this.$route.params.user_id)
      );
    },
  },
};
</script>
