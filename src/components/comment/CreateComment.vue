<template>
  <div class="d-flex flex-column">
    <form
      class="comment-text d-flex align-items-center mt-3"
      @submit.prevent="addComment"
    >
      <input
        type="text"
        class="form-control rounded"
        placeholder="أضف تعليق"
        ref="commentInput"
        v-model.trim="v$.commentData.body.$model"
        :style="{
          'padding-right': isEdit ? '1rem !important' : '3rem !important',
        }"
      />
      <div class="comment-attagement right d-flex" v-if="!isEdit">
        <button
          type="submit"
          class="material-symbols-outlined ms-2 border-0 bg-transparent"
          :class="{
            'text-primary': !v$.commentData.$invalid,
            disabled: v$.commentData.$invalid,
          }"
          :disabled="v$.commentData.$invalid || loading"
        >
          Send
        </button>
      </div>
      <div class="comment-attagement d-flex">
        <input
          type="file"
          ref="imageInput"
          class="d-none"
          @change="uploadImage"
          accept="image/*"
        />
        <a
          href="javascript:void(0);"
          class="material-symbols-outlined me-3"
          @click="chooseImage"
        >
          photo_camera
        </a>
      </div>
    </form>
    <div class="preview-images" v-if="fileSrc">
      <div class="image-container">
        <div class="delete-image" @click="removeMedia">
          <span> x </span>
        </div>
        <img :src="fileSrc" />
      </div>
    </div>
    <div class="mt-2" v-if="isEdit">
      <button
        class="btn btn-primary btn-sm me-2"
        @click.prevent="editComment"
        :disabled="loading"
      >
        تعديل
      </button>
      <button
        class="btn btn-danger btn-sm"
        @click.prevent="$emit('cancelEdit')"
      >
        إلغاء
      </button>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { requiredIf } from "@vuelidate/validators";
import commentService from "@/API/services/comment.service";
import helper from "@/utilities/helper";

export default {
  name: "CreateComment",
  setup() {
    const v$ = useVuelidate();
    return {
      v$,
    };
  },
  emits: ["addComment", "editComment", "cancelEdit"],
  props: {
    comment: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: "",
    },
    post_id: {
      type: Number,
      default: null,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fileSrc: this.isEdit ? this.comment?.media?.path ?? "" : "",
      loading: false,
      commentData: {
        body: this.isEdit ? this.comment?.body ?? "" : "",
        image: null,
        book_id: this.$route.params.book_id,
        comment_id: this.comment.id,
        post_id: this.comment.post_id ?? this.post_id,
        type: this.type,
      },
    };
  },
  methods: {
    focusInput() {
      this.$refs.commentInput.focus();
    },
    chooseImage() {
      this.$refs.imageInput.click();
    },
    uploadImage(e) {
      const file = e.target.files[0];
      this.commentData.image = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.fileSrc = reader.result;
      };
      reader.readAsDataURL(file);
    },
    removeMedia() {
      this.fileSrc = "";
      this.$refs.imageInput.value = null;
    },
    async addComment() {
      if (this.loading) return;

      this.v$.$touch();
      if (!this.v$.commentData.$invalid) {
        this.loading = true;

        try {
          const response = await commentService.create(this.commentData);

          if (response.statusCode !== 200) {
            helper.handleErrorSwal("حدث خطأ ما, حاول مرة أخرى");
            return;
          }

          console.log("[add comment response]", response.data, this.comment.id);
          this.$emit("addComment", response.data, this.comment?.id);

          // reset form
          this.commentData.body = "";
          this.commentData.image = null;
          this.$refs.imageInput.value = "";
          this.fileSrc = "";

          this.v$.$reset();

          helper.toggleToast("تم إضافة التعليق ", "success");
        } catch (error) {
          console.log("[add comment error]", error);
          helper.handleErrorSwal("حدث خطأ ما, حاول مرة أخرى");
        } finally {
          this.loading = false;
        }
      } else {
        helper.toggleToast("يرجى إدخال البيانات", "error");
      }
    },

    async editComment() {
      if (this.loading) return;

      this.v$.$touch();
      if (!this.v$.commentData.$invalid) {
        this.loading = true;

        try {
          const dataToUpdate = {
            body: this.commentData.body,
            u_comment_id: this.comment.id,
            image: this.commentData.image,
          };

          const response = await commentService.update(dataToUpdate);

          if (response.statusCode !== 200) {
            helper.handleErrorSwal("حدث خطأ ما, حاول مرة أخرى");
            return;
          }

          this.$emit("editComment", response.data);
        } catch (error) {
          helper.handleErrorSwal("حدث خطأ ما, حاول مرة أخرى");
        } finally {
          this.loading = false;
        }

        helper.toggleToast("تم تعديل التعليق ", "success");
      } else {
        helper.toggleToast("يرجى إدخال البيانات", "error");
      }
    },
  },
  validations() {
    return {
      commentData: {
        body: {
          required: requiredIf(() => !this.commentData.image),
        },
        image: {
          required: requiredIf(() => !this.commentData.body),
        },
      },
    };
  },
};
</script>
<style scoped>
.right {
  left: auto !important;
  right: 0 !important;
}

.disabled {
  cursor: not-allowed;
}

.btn-text {
  background: transparent;
}
</style>
