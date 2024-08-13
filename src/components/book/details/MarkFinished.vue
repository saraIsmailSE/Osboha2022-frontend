<template>
  <button
    class="btn btn-danger mark-finished-btn"
    @click="markBookAsFinished()"
    data-toggle="tooltip"
    data-placement="bottom"
    title="إنهاء الكتاب"
  >
    <span class="material-symbols-outlined align-middle"> task_alt </span>
    <!-- <span>إنهاء الكتاب</span> -->
  </button>
</template>
<script>
import userBookService from "@/API/services/user-books.service";
import helper from "@/utilities/helper";

export default {
  name: "MarkFinished",
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  emits: ["updateLoading"],
  methods: {
    async markBookAsFinished() {
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
          text: "سيتم اعتبار الكتاب منتهياً وبدء صفحات الأطروحة من بداية الكتاب",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "تأكيد",
          cancelButtonText: "تراجع",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.$emit("updateLoading", true);
            await userBookService
              .markAsFinished(this.book?.id)
              .then(async (response) => {
                helper.toggleToast(
                  "تم إنهاء الكتاب, سيتم تحديث الصفحة, يرجى الانتظار",
                  "success",
                );
                setTimeout(() => {
                  location.reload();
                }, 1800);
              })
              .catch((error) => {
                helper.toggleToast("حصل خطأ - لم يتم الحذف!", "danger");
                console.log(error);
              })
              .finally(() => {
                this.$emit("updateLoading", false);
              });
          }
        });
    },
  },
};
</script>
<style scoped></style>
