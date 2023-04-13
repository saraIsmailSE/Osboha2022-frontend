<template>
  <div class="d-flex align-items-center justify-content-center mb-3">
    <UserAvatar
      :profileImg="comment.user?.profile.profile_picture"
      :profile_id="comment.user?.profile.id"
      :title="comment.user?.name"
      :gender="comment.user?.gender"
      avatarClass="avatar-50"
    />

    <div class="ms-3 flex-grow-1">
      <h5>{{ comment.user?.name }}</h5>
      <span
        class="badge bg-primary rounded-pill"
        v-for="role in comment.user?.roles"
        :key="role"
      >
        &nbsp; {{ role }} &nbsp;</span
      >
    </div>
    <div class="card-post-toolbar d-flex align-items-center" v-if="authorized">
      <div class="dropdown">
        <span
          class="dropdown-toggle"
          data-bs-toggle="dropdown"
          role="button"
          @click.prevent="toggleDropdown"
        >
          <i class="material-symbols-outlined md-18"> more_horiz </i>
        </span>
        <div
          class="dropdown-menu dropdown-menu-right"
          :class="{ show: showDropdown }"
          x-placement="bottom-end"
        >
          <a
            class="dropdown-item d-flex align-items-center"
            href="#"
            data-bs-toggle="modal"
            :data-bs-target="`#editThesis-${
              comment.type === 'screenshot' ? comment.comment_id : comment.id
            }`"
            v-if="
              canEdit &&
              (comment.type === 'thesis' || comment.type === 'screenshot')
            "
            ><span class="material-symbols-outlined me-2 md-18"> edit </span
            >تعديل</a
          >
          <a
            v-else
            class="dropdown-item d-flex align-items-center"
            href="#"
            @click.prevent="editCmnt"
            ><span class="material-symbols-outlined me-2 md-18"> edit </span
            >تعديل</a
          >
          <a
            class="dropdown-item d-flex align-items-center"
            href="#"
            v-if="canDelete"
            @click.prevent="deleteCmnt"
            ><span class="material-symbols-outlined me-2 md-18"> delete </span
            >حذف</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserAvatar from "@/components/user/UserAvatar.vue";
import UserInfoService from "@/Services/userInfoService";
import helper from "@/utilities/helper";
import CommentService from "@/API/services/comment.service";

export default {
  name: "CommentUser",
  components: {
    UserAvatar,
  },
  inject: ["deleteComment"],
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDropdown: false,
      deleteLoading: false,
      confirmationText: "هل أنت متأكد من حذف هذا التعليق؟",
    };
  },
  computed: {
    authorized() {
      return this.canEdit || this.canDelete;
    },
    canEdit() {
      return this.comment?.user?.id == UserInfoService.getUser().user.id;
    },
    canDelete() {
      return (
        this.comment?.user?.id === UserInfoService.getUser().user.id ||
        UserInfoService.hasRole("admin") ||
        UserInfoService.hasPermission("delete comment")
      );
    },
  },
  created() {
    this.confirmationText =
      this.comment.type === "thesis" || this.comment.type === "screenshot"
        ? "هل أنت متأكد من حذف هذا التعليق؟ سيتم خصم علامة الأطروحة بعد الحذف!"
        : "هل أنت متأكد من حذف هذا التعليق؟";
  },
  methods: {
    resolve_img_url(path) {
      return path ? path : require("@/assets/images/avatar/avatar-01.jpg");
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    hideDropdown() {
      this.showDropdown = false;
    },
    async deleteCmnt() {
      if (this.canDelete) {
        if (this.deleteLoading) return;

        const swalWithBootstrapButtons = this.$swal.mixin({
          customClass: {
            confirmButton: "btn btn-primary btn-lg ",
            cancelButton: "btn btn-outline-primary btn-lg ms-2",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "هل أنت متأكد؟",
            text: "سيتم حذف التعليق نهائياً!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم, احذفه!",
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
              this.deleteLoading = true;
              try {
                await CommentService.delete(this.comment.id);
                this.deleteComment(this.comment.id);
                // this.$refs.deleteCommentRef.closeModal();
                helper.toggleToast("تم حذف التعليق", "success");
              } catch (error) {
                helper.toggleToast(
                  "حدث خطأ أثناء حذف التعليق, حاول مرة أخرى",
                  "error"
                );
              } finally {
                this.deleteLoading = false;
              }
            }
          });
      } else {
        helper.toggleToast("لا يمكنك حذف هذا التعليق", "error");
        return;
      }
    },
    async editCmnt() {
      console.log("[edit comment] ", this.comment.id);
    },
  },
};
</script>
