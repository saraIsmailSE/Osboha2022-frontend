<template>
  <div class="d-flex align-items-center justify-content-center mb-3">
    <BaseAvatar
      :profileImg="comment.user?.user_profile.profile_picture"
      :profile_id="comment.user?.user_profile.id"
      :title="comment.user?.name"
      :gender="comment.user?.gender"
      avatarClass="rounded-circle avatar-50"
    />

    <div class="ms-3 flex-grow-1">
      <h5
        role="button"
        class="author-name hover-undelined"
        @click.prevent="sendToProfile(comment.user.id)"
      >
        {{ comment.user?.name + " " + comment.user?.last_name }}
      </h5>
      <div class="mt-1" v-if="comment.user?.roles?.length > 0">
        <span
          class="badge bg-primary rounded-pill ms-1 px-2">
          {{ ARABIC_ROLES[getHighestRole(extractRoleNames(comment.user?.roles))] }}
          </span>
      </div>
    </div>
    <div
      class="card-post-toolbar d-flex align-items-center"
      v-if="authorized && showOptions"
    >
      <div>
        <template v-if="canEdit">
          <a
            class="d-flex align-items-center"
            href="#"
            data-bs-toggle="modal"
            :data-bs-target="`#editThesis-${
              comment.type.trim() === 'screenshot'
                ? comment.comment_id
                : comment.id
            }`"
            v-if="comment.type === 'thesis' || comment.type === 'screenshot'"
            ><span class="material-symbols-outlined me-2 md-18"> edit </span></a
          >
          <a
            class="d-flex align-items-center"
            href="#"
            data-bs-toggle="modal"
            :data-bs-target="`#editRate-${comment.id}`"
            v-else-if="comment.type === 'review'"
            ><span class="material-symbols-outlined me-2 md-18"> edit </span></a
          >
          <a
            v-else
            class="d-flex align-items-center"
            href="#"
            @click.prevent="editCmnt"
            ><span class="material-symbols-outlined me-2 md-18"> edit </span></a
          >
        </template>
        <a
          class="d-flex align-items-center"
          href="#"
          v-if="canDelete"
          @click.prevent="deleteCmnt"
          ><span class="material-symbols-outlined me-2 md-18"> delete </span></a
        >
      </div>
    </div>
    <!-- <div
      class="card-post-toolbar d-flex align-items-center"
      v-if="authorized && showOptions"
    >
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
    </div> -->
  </div>
</template>
<script>
import UserInfoService from "@/Services/userInfoService";
import helper from "@/utilities/helper";
import CommentService from "@/API/services/comment.service";
import { ARABIC_ROLES } from "@/utilities/constants";
import { getHighestRole , extractRoleNames } from "@/utilities/commonFunctions";

export default {
  name: "CommentUser",
  inject: {
    deleteComment: {
      default: () => {},
    },
  },
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
      ARABIC_ROLES,
    };
  },
  computed: {
    authorized() {
      return this.canEdit || this.canDelete;
    },
    canEdit() {
      return this.comment?.user?.id == this.$store.getters.getUser.id;
    },
    canDelete() {
      const user = this.$store.getters.getUser;
      return (
        (this.comment?.user?.id === user.id &&
          UserInfoService.hasPermission(user, "delete comment")) ||
        UserInfoService.hasRole(user, "admin")
      );
    },
    showOptions() {
      const isThesis =
        this.comment?.type === "thesis" || this.comment?.type === "screenshot";
      if (!isThesis) return true;
      const thesisDate = new Date(this.comment?.created_at);
      const start_week = new Date(this.$store.state.current_week?.created_at);
      const end_week = new Date(this.$store.state.current_week?.main_timer);

      return thesisDate >= start_week && thesisDate <= end_week;
    },
  },
  created() {
    this.confirmationText =
      this.comment.type === "thesis" || this.comment.type === "screenshot"
        ? "سيتم حذف الأطروحة نهائياً, وخصم علامتها!"
        : this.comment.type === "review"
          ? "سيتم حذف التقييم نهائياً!"
          : "سيتم حذف التعليق نهائياً!";

    this.successText =
      this.comment.type === "thesis" || this.comment.type === "screenshot"
        ? "تم حذف الأطروحة نهائياً, وخصم علامتها!"
        : this.comment.type === "review"
          ? "تم حذف التقييم!"
          : "تم حذف التعليق!";
  },
  methods: {
    getHighestRole,
    extractRoleNames,
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
                console.log("from comment header", this.comment.id);
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
                  "حدث خطأ أثناء الحذف, يرجى المحاولة مرة أخرى!",
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
    sendToProfile(user_id) {
      this.$router.push({
        name: "user.profile",
        params: { user_id },
      });
    },
  },
};
</script>
<style scoped>
.author-name {
  font-size: 1rem;
  font-weight: 600;
}

.hover-undelined:hover {
  text-decoration: underline;
}
</style>
