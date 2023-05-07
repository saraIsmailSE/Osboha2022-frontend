<template>
  <div class="d-flex justify-content-between align-items-center mt-1">
    <!--Accept Button-->
    <button
      type="button"
      class="btn flex-grow-1 d-flex align-items-center justify-content-center text-success hover-bold"
      @click.prevent="acceptPost"
      :disabled="pendingRequest"
    >
      <span class="material-symbols-outlined"> check </span>
      <span class="ms-1 bold-600"> قبول </span>
    </button>

    <!--Reject Button-->
    <button
      type="button"
      class="btn flex-grow-1 d-flex align-items-center justify-content-center text-danger hover-bold"
      @click.prevent="declinePost"
      :disabled="pendingRequest"
    >
      <span class="material-symbols-outlined"> close </span>
      <span class="ms-1 bold-600"> رفض </span>
    </button>
  </div>
</template>

<script>
import PostService from "@/API/services/post.service";
import helper from "@/utilities/helper";
export default {
  name: "AcceptReject",
  inject: {
    post: {
      required: true,
    },
    postAction: {
      default: () => {},
    },
  },
  data() {
    return {
      pendingRequest: false,
    };
  },
  methods: {
    async acceptPost() {
      if (this.pendingRequest) return;
      const alert = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-danger btn-lg ms-2",
        },
        buttonsStyling: false,
      });

      alert
        .fire({
          title: "هل أنت متأكد؟",
          text: "هل تريد قبول هذا المنشور؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم!",
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
            this.pendingRequest = true;
            try {
              await PostService.acceptPost(this.post.id);
              this.postAction(this.post.id);
              helper.handleSuccessSwal("تم قبول المنشور بنجاح");
              setTimeout(() => this.goBack(), 1800);
            } catch (error) {
              helper.handleErrorSwal(
                "حدث خطأ أثناء القبول, يرجى المحاولة مرة أخرى!"
              );
            } finally {
              this.pendingRequest = false;
            }
          }
        });
    },
    async declinePost() {
      if (this.pendingRequest) return;
      const alert = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-danger btn-lg ms-2",
        },
        buttonsStyling: false,
      });

      alert
        .fire({
          title: "هل أنت متأكد؟",
          text: "هل تريد رفض هذا المنشور؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم!",
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
            this.pendingRequest = true;
            try {
              await PostService.declinePost(this.post.id);
              this.postAction(this.post.id);
              helper.handleSuccessSwal("تم رفض المنشور بنجاح");
              setTimeout(() => this.goBack(), 1800);
            } catch (error) {
              helper.handleErrorSwal(
                "حدث خطأ أثناء الرفض, يرجى المحاولة مرة أخرى!"
              );
            } finally {
              this.pendingRequest = false;
            }
          }
        });
    },
    goBack() {
      if (this.$route.params.post_id) {
        this.$router.push({
          name: "osboha.pendingPosts",
          params: { timeline_id: this.$route.params.timeline_id },
        });
      }
    },
  },
};
</script>

<style scoped>
.hover-bold:hover {
  font-weight: 700;
}
</style>
