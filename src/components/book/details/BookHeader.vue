<template lang="">
  <div class="card-body">
    <div class="position-absolute start-0" v-if="book?.book">
      <DownloadBook v-if="book?.book.is_active" />

      <router-link
        class="material-symbols-outlined align-middle display-5 me-2"
        :to="{
          name: 'book.update',
          params: { book_id: book?.book?.id },
        }"
        v-if="(isAdmin || inBooksTeam || bookOwner) && book?.book.is_active"
      >
        edit
      </router-link>

      <DeleteBook
        v-if="
          !loadingBook &&
          ((canBookBeDeleted && inBooksTeam) || (canBookBeDeleted && bookOwner))
        "
      />
    </div>
    <router-link
      :to="{
        name: 'book.report',
        params: { book_id: book?.book?.id },
      }"
      class="btn btn-danger display-5"
      v-if="
        !loadingBook && book?.book.is_active && book?.book.type.type != 'free'
      "
    >
      <span class="material-symbols-outlined align-middle"> warning </span>
      ابلاغ مخالف
    </router-link>

    <SuggestBook
      v-if="
        !loadingBook &&
        bookOwner &&
        book?.book.type.type == 'free' &&
        !isSuggested &&
        allowedToSuggest
      "
    />

    <BookInfo />
  </div>
</template>

<script>
import SuggestBook from "@/components/book/details/SuggestBook.vue";
import BookInfo from "@/components/book/details/BookInfo.vue";
import DeleteBook from "@/components/book/details/DeleteBook.vue";
import DownloadBook from "@/components/book/details/DownloadBook.vue";

import BookSuggestion from "@/API/services/book-suggestion.service";
import UserInfoService from "@/Services/userInfoService";

export default {
  name: "BookHeader",
  components: {
    SuggestBook,
    BookInfo,
    DeleteBook,
    DownloadBook,
  },
  inject: ["book", "loadingBook", "isSuggested"],
  data() {
    return {
      bookSuggestionsCount: 3,
    };
  },
  async created() {
    this.bookSuggestionsCount = await BookSuggestion.isAllowedToSuggest();
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },

    inBooksTeam() {
      return UserInfoService.hasRole(this.user, "book_quality_team");
    },

    isAdmin() {
      return UserInfoService.hasRole(this.user, "admin");
    },

    canBookBeDeleted() {
      return this.book?.theses_count <= 0;
    },

    bookOwner() {
      return this.book?.book_owner === this.user.id;
    },

    allowedToSuggest() {
      return this.bookSuggestionsCount < 3;
    },
  },
};
</script>
<style lang=""></style>
