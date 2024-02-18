<template lang="">
  <div
    class="col-12 row justify-content-start"
    v-if="question.media?.length > 0"
  >
    <div
      class="col-lg-3 col-md-6 col-sm-12 mb-2"
      v-for="(mediaFile, index) in question.media"
      :key="index"
    >
      <a :href="`${mediaFile.path}`" target="_blank">
        <img
          class="img-fluid rounded w-100 h-100"
          :src="`${mediaFile.path}`"
          alt="question media"
          style="object-fit: cover; border: 1px solid #e5e5e5"
        />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "QuestionMedia",
  inject: ["question"],
};
</script>
<style lang=""></style>
