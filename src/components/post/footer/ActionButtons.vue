<template>
  <div class="d-flex justify-content-between align-items-center">
    <!--Like Button-->
    <button
      type="button"
      class="btn flex-grow-1"
      :class="isLiked ? 'text-primary' : 'text-gray-600'"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="إعجاب"
      @click.prevent="isLiked ? $emit('unlikePost') : $emit('likePost')"
    >
      <span class="me-1 bold-600"> إعجاب </span>
      <font-awesome-icon
        :icon="[`${isLiked ? 'fas' : 'far'}`, 'thumbs-up']"
        size="xl"
      />
    </button>

    <!--Comment Button-->
    <button
      type="button"
      class="btn flex-grow-1 text-gray-600"
      title="تعليق"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      @click.prevent="$emit('showCommentModel')"
    >
      <span class="me-1 bold-600"> تعليق </span>
      <font-awesome-icon :icon="['far', 'comment']" size="xl" />
    </button>

    <!--Share Button-->
    <!-- <button
              type="button"
              class="btn flex-grow-1 text-gray-600"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="مشاركة"
            >
              <span class="me-1 bold-600"> مشاركة </span>
              <font-awesome-icon :icon="['fas', 'share']" size="xl" />
            </button> -->
  </div>
</template>

<script>
export default {
  name: "ActionButtons",
  props: {
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["showCommentModel", "likePost", "unlikePost"],
};
</script>

<style lang="scss" scoped></style>
