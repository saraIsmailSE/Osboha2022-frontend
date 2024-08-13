<template lang="">
  <button class="btn btn-info display-5" @click="suggestThisBook()">
    <span class="material-symbols-outlined align-middle"> bolt </span>
    اقترح للمنهج
  </button>
</template>
<script>
import BookSuggestion from "@/API/services/book-suggestion.service";
import helper from "@/utilities/helper";

export default {
  name: "SuggestBook",
  inject: ["book", "toggleSuggestedBook"],
  async suggestThisBook() {
    let bookForm = new FormData();
    bookForm.append("name", this.book?.book?.name);
    bookForm.append("publisher", this.book?.book?.publisher);
    bookForm.append("brief", this.book?.book?.brief);
    bookForm.append("link", this.book?.book?.link);
    bookForm.append("section_id", this.book?.book?.section.id);
    bookForm.append("language_id", this.book?.book?.language.id);

    const suggestion = await BookSuggestion.suggest(bookForm)
      .then(async (response) => {
        helper.toggleToast("تم حفظ الاقتراح ", "success");
        this.toggleSuggestedBook(true);
      })
      .catch((error) => {
        helper.toggleToast("حصل خطأ - لم يتم حفظ الاقتراح!", "danger");
        console.log(error);
      });
  },
};
</script>
<style lang=""></style>
