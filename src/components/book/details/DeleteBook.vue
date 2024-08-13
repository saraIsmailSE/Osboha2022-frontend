<template lang="">
  <span
    role="button"
    class="material-symbols-outlined align-middle display-5 me-3"
    @click="deleteBook()"
  >
    delete
  </span>
</template>
<script>
import bookService from "@/API/services/book.service";
import helper from "@/utilities/helper";

export default {
  name: "DeleteBook",
  inject: ["book"],
  methods: {
    deleteBook() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-primary btn-lg ms-2",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "هل انت متأكد؟",
          text: "نعم قم بحذف الكتاب",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "حذف",
          cancelButtonText: "تراجع",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        })
        .then(async (willDelete) => {
          if (willDelete.isConfirmed) {
            const response = await bookService
              .deleteById(this.book?.book?.id)
              .then(async (response) => {
                helper.toggleToast(
                  "تم الحذف ... سيتم تحويلك إلى صفحة الكتب",
                  "success",
                );
                setTimeout(() => {
                  this.$router.push({ name: "osboha.book" });
                }, 3000);
              })
              .catch((error) => {
                helper.toggleToast("حصل خطأ - لم يتم الحذف!", "danger");
                console.log(error);
              });
          }
        });
    },
  },
};
</script>
<style lang=""></style>
