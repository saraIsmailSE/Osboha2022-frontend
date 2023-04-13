<template>
  <!--Confirmation modal-->
  <modal
    ref="confirmationModalRef"
    :id="`confirmationModal-${id}`"
    tabindex="-1"
    :aria-labelledby="`confirmationModalLabel-${id}`"
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
      <slot name="actionBtn" />
      <button
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        ref="confirmationModalCloseBtn"
      >
        إلغاء
      </button>
    </model-footer>
  </modal>
</template>

<script>
export default {
  name: "ConfirmationModal",
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      default: "تأكيد",
    },
    text: {
      type: String,
      default: "هل أنت متأكد؟",
    },
    btnColor: {
      type: String,
      default: "#b90808",
    },
  },
  methods: {
    closeModal() {
      this.$refs.confirmationModalCloseBtn.click();
    },
  },
};
</script>

<style lang="scss" scoped></style>
