<template>
  <div class="user-post-data">
    <div class="d-flex justify-content-between">
      <!--Post user name and date of post-->
      <TaggedFriends :user="post.user" :friends="post.taggedUsers">
        <template #date>
          <div class="d-flex align-items-center">
            <tooltip
              tag="p"
              class="mb-0 text-primary"
              tooltipPlacement="bottom"
              data-bs-toggle="tooltip"
              :title="formatFullDate(post.created_at)"
              style="width: fit-content"
              >{{ formatDateToWritten(post.created_at) }}</tooltip
            >

            <span class="material-symbols-outlined ms-1" v-if="post.is_pinned">
              push_pin
            </span>

            <span v-if="is_announcement" class="ms-1 text-danger">إعلان</span>
          </div>
        </template>
      </TaggedFriends>

      <!--Post actions dropdown (edit - delete - pin)-->
      <div class="card-post-toolbar" v-if="byAuth">
        <!--Actions dropdown trigger-->
        <div
          class="dropdown-toggle"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          role="button"
          @click="show = !show"
        >
          <span class="material-symbols-outlined"> more_horiz </span>
        </div>

        <!--Actions choices-->
        <div
          :class="`dropdown-menu dropdown-menu-right ${show ? 'show' : ''}`"
          aria-labelledby="dropdownMenuButton"
          style=""
        >
          <a
            v-if="showPin"
            class="dropdown-item d-flex align-items-center text-primary"
            href="#"
            @click.prevent="pin"
            ><span class="material-symbols-outlined me-2 md-18">
              push_pin
            </span>
            {{ post.is_pinned ? "فك التثبيت" : "تثبيت" }}
          </a>
          <!-- <a
            class="dropdown-item d-flex align-items-center text-primary"
            href="#"
            ><span class="material-symbols-outlined me-2 md-18"> edit </span
            >تعديل</a
          > -->
          <a
            class="dropdown-item d-flex align-items-center text-primary"
            href="#"
            @click.prevent="closeComments"
            ><span class="material-symbols-outlined me-2 md-18">
              {{ post.allow_comments ? "comments_disabled" : "comment" }}
            </span>
            {{ post.allow_comments ? "إغلاق" : "فتح" }} التعليقات
          </a>
          <a
            class="dropdown-item d-flex align-items-center"
            href="#"
            role="button"
            :aria-disabled="deleteLoading"
            @click.prevent="deletePost"
            ><span class="material-symbols-outlined me-2 md-18"> delete </span
            >حذف</a
          >
          <a
            class="dropdown-item d-flex align-items-center"
            href="#"
            @click.prevent="show = false"
            ><span class="material-symbols-outlined me-2 md-18"> cancel </span
            >إغلاق</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import helper from "@/utilities/helper";
import TaggedFriends from "./TaggedFriends.vue";
import PostService from "@/API/services/post.service";

export default {
  name: "PostHeader",
  inject: ["closePostComments", "pinPost", "postDelete"],
  props: {
    post: {
      type: Object,
      required: true,
    },
    showPin: {
      type: Boolean,
      default: false,
    },
    is_announcement: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    byAuth() {
      return this.post.user.id === this.$store.getters.getUser.id;
    },
  },
  methods: {
    ...helper,
    async closeComments() {
      try {
        await PostService.contolComments(this.post.id);
        this.closePostComments(this.post.id);

        if (this.post.allow_comments)
          this.toggleToast("تم فتح التعليقات", "success");
        else this.toggleToast("تم إغلاق التعليقات", "success");
      } catch (error) {
        this.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
      }
    },
    async pin() {
      try {
        const response = await PostService.pinPost(this.post.id);

        if (response.statusCode !== 200) {
          this.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
          return;
        }

        const isPinned = response.data === "pinned" ? true : false;
        this.pinPost(this.post.id, isPinned);

        if (isPinned) this.toggleToast("تم تثبيت المنشور", "success");
        else this.toggleToast("تم فك التثبيت", "success");
      } catch (error) {
        this.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
      }
    },
    async deletePost() {
      if (this.deleteLoading) return;

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
          text: "سيتم حذف هذا المنشور نهائياً!",
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
              await PostService.delete(this.post.id);
              this.postDelete(this.post.id);
              helper.handleSuccessSwal("تم حذف المنشور بنجاح");
            } catch (error) {
              helper.handleErrorSwal(
                "حدث خطأ أثناء الحذف, يرجى المحاولة مرة أخرى!"
              );
            } finally {
              this.deleteLoading = false;
            }
          }
        });
    },
  },
  components: { TaggedFriends },
};
</script>
