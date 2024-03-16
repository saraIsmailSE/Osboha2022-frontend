<template>
  <div class="d-flex flex-column">
    <form
      class="comment-text d-flex align-items-end mt-3"
      @submit.prevent="addAnswer"
    >
      <textarea
        v-model.trim="v$.answerData.answer.$model"
        class="form-control rounded"
        placeholder="أضف إجابة"
        :style="{
          'padding-right': '3rem !important',
        }"
        style="direction: rtl; max-height: 120px; resize: none; overflow: auto"
        :rows="1"
        ref="bodyRef"
      ></textarea>
      <div class="comment-attagement right d-flex mb-1">
        <button
          type="submit"
          class="material-symbols-outlined ms-2 border-0 bg-transparent"
          :class="{
            'text-primary': !v$.answerData.$invalid,
            disabled: v$.answerData.$invalid,
          }"
          :disabled="v$.answerData.$invalid || loading"
        >
          Send
        </button>
      </div>
      <div class="comment-attagement d-flex mb-1">
        <input
          type="file"
          ref="fileInput"
          class="d-none"
          multiple
          @change="uploadImages"
          accept="image/*"
        />
        <span
          role="button"
          class="material-symbols-outlined me-3"
          @click="chooseImages"
        >
          photo_camera
        </span>
      </div>
    </form>
    <template v-if="answerData.media?.length">
      <ImagePreviewer :media="answerData.media" @remove-media="removeMedia" />
    </template>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import GeneralConversationService from "@/API/services/general-conversation.service";
import helper from "@/utilities/helper";
import ImagePreviewer from "@/components/media/ImagePreviewer.vue";

export default {
  name: "AddAnswer",
  setup() {
    const v$ = useVuelidate();
    return {
      v$,
    };
  },
  components: {
    ImagePreviewer,
  },
  emits: ["add-answer"],
  inject: {
    addNewAnswer: {
      default: () => () => {},
    },
  },
  props: {
    question_id: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      answerData: {
        answer: "",
        media: [],
        question_id: this.question_id,
        is_discussion:
          this.$route.query?.keyword === "discussion-questions" ? 1 : 0,
        discussion_type: this.$route.query?.discussion_type || "",
      },
    };
  },
  computed: {
    answerBody() {
      return this.answerData.answer;
    },
  },
  watch: {
    answerBody() {
      this.$refs.bodyRef.style.height = "auto";
      this.$nextTick(() => {
        this.$refs.bodyRef.style.height =
          this.$refs.bodyRef.scrollHeight + "px";
      });
    },
  },
  methods: {
    chooseImages() {
      this.$refs.fileInput.click();
    },
    uploadImages(e) {
      const files = [...e.target.files];
      this.answerData.media = files;
    },
    removeMedia(index) {
      const files = [...this.answerData.media];
      files.splice(index, 1);
      this.answerData.media = files;

      if (this.answerData.media.length === 0) {
        this.$refs.fileInput.value = null;
      }
    },
    async addAnswer() {
      if (this.loading) return;

      this.v$.$touch();
      if (!this.v$.answerData.$invalid) {
        this.loading = true;

        try {
          const response = await GeneralConversationService.addAnswer(
            this.answerData,
          );

          this.addNewAnswer(response.data);
          // reset form
          this.answerData.answer = "";
          this.answerData.image = null;

          this.v$.$reset();

          this.answerData = {
            ...this.answerData,
            answer: "",
            media: [],
          };
          helper.toggleToast("تم إضافة الجواب ", "success");
        } catch (error) {
          helper.toggleErrorToast("حدث خطأ ما, حاول مرة أخرى");
        } finally {
          this.loading = false;
        }
      } else {
        helper.toggleToast("يرجى إدخال البيانات", "error");
      }
    },
  },
  validations() {
    return {
      answerData: {
        answer: {
          required,
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
