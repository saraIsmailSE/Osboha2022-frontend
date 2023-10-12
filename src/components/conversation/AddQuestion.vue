<template>
  <div>
    <iq-card
      id="question-modal-data"
      body-class="iq-card iq-card-block iq-card-stretch iq-card-height"
    >
      <template v-slot:headerTitle>
        <h4 class="card-title">طرح سؤال</h4>
      </template>
      <template v-slot:body>
        <div class="d-flex align-items-center">
          <BaseAvatar
            :profileImg="auth?.user_profile?.profile_picture"
            :profile_id="auth?.user_profile?.id"
            :title="auth?.name"
            :gender="auth?.gender"
            avatarClass="avatar-60 rounded-circle"
          />
          <form class="post-text ml-3 w-100">
            <textarea
              id="question-editor"
              placeholder="اطرح سؤالك هنا..."
              class="rounded form-control"
              style="border: none; max-height: 50vh"
              v-model.trim="question.question"
              ref="questionRef"
            >
            </textarea>

            <input
              type="file"
              @change="previewMedia($event)"
              multiple
              accept="image/*"
              class="d-none"
              ref="fileRef"
            />
          </form>
        </div>
        <!-- <hr />
        <ul class="post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
          <li class="me-2 mb-2">
            <button
              class="btn btn-soft-primary d-flex align-items-center"
              @click="openFilePicker"
            >
              <span class="material-symbols-outlined me-2">photo_camera</span>
              إضافة صورة
            </button>
          </li>
        </ul> -->
        <template v-if="question.media.length > 0">
          <hr />
          <ImagePreviewer :media="question.media" @remove-media="removeMedia" />
        </template>
        <div class="col-sm-12 text-center" v-if="loader">
          <img
            :src="require('@/assets/images/gif/page-load-loader.gif')"
            alt="loader"
            style="height: 100px"
          />
        </div>
        <button
          v-else
          class="btn btn-primary btn-block my-3 w-100 flex-grow-1"
          @click="addNewQuestion()"
          :disabled="!allowPosting"
        >
          نشـــر
        </button>
      </template>
    </iq-card>
  </div>
</template>
<script>
import ImagePreviewer from "@/components/media/ImagePreviewer.vue";
import helper from "@/utilities/helper";
import GeneralConversationService from "@/API/services/general-conversation.service";

export default {
  name: "AddQuestion",
  components: {
    ImagePreviewer,
  },
  emits: ["add-question"],
  data() {
    return {
      question: {
        question: "",
        media: [],
      },
      loader: false,
    };
  },
  computed: {
    auth() {
      return this.$store.getters.getUser;
    },
    allowPosting() {
      if (this.question.question === "") {
        return false;
      }

      return true;
    },
    questionBody() {
      return this.question.question;
    },
  },
  watch: {
    questionBody() {
      this.$refs.questionRef.style.height = "auto";
      this.$nextTick(() => {
        this.$refs.questionRef.style.height =
          this.$refs.questionRef.scrollHeight + "px";
      });
    },
  },
  methods: {
    openFilePicker() {
      this.$refs.fileRef.click();
    },
    previewMedia(event) {
      const files = [...event.target.files];
      this.question.media = files;
    },
    removeMedia(index) {
      const files = [...this.question.media];
      files.splice(index, 1);
      this.question.media = files;

      if (this.question.media.length === 0) {
        this.$refs.fileRef.value = null;
      }
    },
    async addNewQuestion() {
      this.loader = true;

      try {
        const response = await GeneralConversationService.addQuestion(
          this.question
        );

        this.$emit("add-question", response.data);

        this.question = {
          question: "",
          media: [],
        };
      } catch (error) {
        helper.toggleErrorToast();
      } finally {
        this.loader = false;
      }
    },
  },
};
</script>
<style lang=""></style>
