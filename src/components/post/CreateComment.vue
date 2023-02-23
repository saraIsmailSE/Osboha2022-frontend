<template>
  <form
    class="comment-text d-flex align-items-center mt-3"
    @submit.prevent="addComment"
  >
    <input
      type="text"
      class="form-control rounded"
      placeholder="أضف تعليق"
      ref="commentInput"
      v-model.trim="v$.comment.body.$model"
    />
    <div class="comment-attagement right d-flex">
      <button
        type="submit"
        class="material-symbols-outlined ms-2 border-0 bg-transparent"
        :class="{
          'text-primary': !v$.comment.$invalid,
          disabled: v$.comment.$invalid,
        }"
        :disabled="v$.comment.$invalid"
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
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { requiredIf } from "@vuelidate/validators";
import commentService from "../../API/services/comment.service";
export default {
  name: "CreateComment",
  setup() {
    const v$ = useVuelidate();
    return {
      v$,
    };
  },
  emits: ["addComment"],
  props: {
    comment_id: {
      type: Number,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comment: {
        body: "",
        image: null,
        book_id: this.$route.query.id,
        comment_id: this.comment_id,
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
      this.comment.image = file;
    },
    async addComment() {
      const response = await commentService.create(this.comment);
      this.$emit("addComment", response.data, this.comment_id);

      // reset form
      this.comment.body = "";
      this.comment.image = null;
      this.$refs.imageInput.value = "";

      this.v$.$reset();
    },
  },
  validations() {
    return {
      comment: {
        body: {
          required: requiredIf(() => !this.comment.image),
        },
        image: {
          required: requiredIf(() => !this.comment.body),
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

.form-control {
  padding-right: 3rem !important;
}

.disabled {
  cursor: not-allowed;
}

.btn-text {
  background: transparent;
}
</style>
