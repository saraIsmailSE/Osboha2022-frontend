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
          <template v-if="canEdit">
            <a
              class="dropdown-item d-flex align-items-center"
              href="#"
              data-bs-toggle="modal"
              :data-bs-target="`#editThesis-${
                comment.type.trim() === 'screenshot'
                  ? comment.comment_id
                  : comment.id
              }`"
              v-if="comment.type === 'thesis' || comment.type === 'screenshot'"
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
          </template>
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
  emits: ["triggerEditBox"],
  data() {
    return {
      showDropdown: false,
      deleteLoading: false,
      confirmationText: "",
      successText: "",
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
        (this.comment?.user?.id === UserInfoService.getUser().user.id &&
          UserInfoService.hasPermission("delete comment")) ||
        UserInfoService.hasRole("admin")
      );
    },
  },
  created() {
    this.confirmationText =
      this.comment.type === "thesis" || this.comment.type === "screenshot"
        ? "سيتم حذف الأطروحة نهائياً, وخصم علامتها!"
        : "سيتم حذف التعليق نهائياً!";

    this.successText =
      this.comment.type === "thesis" || this.comment.type === "screenshot"
        ? "تم حذف الأطروحة نهائياً, وخصم علامتها!"
        : "تم حذف التعليق!";
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
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
          cancelButton: "btn btn-outline-danger btn-lg ms-2",
        },
        buttonsStyling: false,
      });

      if (this.canDelete) {
        if (this.deleteLoading) return;

        swalWithBootstrapButtons
          .fire({
            title: "هل أنت متأكد؟",
            text: this.confirmationText,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم, احذف!",
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

                helper.handleSuccessSwal(this.successText);
                if (
                  this.comment.type === "thesis" ||
                  this.comment.type === "screenshot"
                ) {
                  setTimeout(() => location.reload(), 1800);
                }
              } catch (error) {
                helper.handleErrorSwal(
                  "حدث خطأ أثناء الحذف, يرجى المحاولة مرة أخرى!"
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
      this.showDropdown = false;
      this.$emit("triggerEditBox");
    },
  },
};
</script>

>
