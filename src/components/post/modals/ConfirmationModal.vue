<template>
  <!--Confirmation modal-->
  <modal
    ref="confirmationModalRef"
    :id="`confirmationModal-${post_id}`"
    tabindex="-1"
    :aria-labelledby="`confirmationModalLabel-${post_id}`"
    :aria-hidden="true"
    dialogClass="modal-dialog-centered"
  >
    <model-header>
      <h4>{{ title }}</h4>
      <a
        href="javascript:void(0);"
        class="lh-1"
        data-bs-dismiss="modal"
        ref="confirmationModalCloseBtn"
      >
        <span class="material-symbols-outlined">close</span>
      </a>
    </model-header>

    <model-body>
      <div class="text-center" :style="{ color: btnColor }">
        <span class="me-2">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" size="sm" />
        </span>
        <span>{{ text }}</span>
      </div>
    </model-body>
    <model-footer>
      <button
        class="btn"
        @click.prevent="deletePost"
        :disabled="loading"
        :style="{ backgroundColor: btnColor, color: '#fff' }"
      >
        <img
          v-if="loading"
          :src="require('@/assets/images/page-img/page-load-loader.gif')"
          alt="loader"
          style="height: 25px"
        />

        <span v-else>نعم</span>
      </button>
      <button
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        ref="confirmationModalCloseBtn"
      >
        لا
      </button>
    </model-footer>
  </modal>
</template>

<script>
import postService from "@/API/services/post.service";
import helper from "@/utilities/helper";

export default {
  name: "ConfirmationModal",
  inject: ["postDelete"],
  props: {
    post_id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    btnColor: {
      type: String,
      default: "#b90808",
    },
  },
  data() {
    return {
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    async deletePost() {
      if (this.loading) return;

      this.errorMessage = "";
      this.loading = true;
      try {
        await postService.delete(this.post_id);
        this.postDelete(this.post_id);
        this.$refs.confirmationModalCloseBtn.click();
        helper.toggleToast("تم حذف المنشور بنجاح", "success");
      } catch (error) {
        helper.toggleToast(
          "حدث خطأ أثناء حذف المنشورة, حاول مرة أخرى",
          "error"
        );
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
