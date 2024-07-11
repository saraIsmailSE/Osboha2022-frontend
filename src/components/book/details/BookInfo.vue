<template lang="">
  <div class="image-block text-center mt-3">
    <img
      :src="resolve_img_url(book?.book?.media?.path ?? '')"
      class="img-fluid rounded w-25"
      alt="blog-img"
    />
  </div>
  <div class="blog-description mt-3 text-center">
    <h2 class="mb-3 pb-3 border-bottom text-center">
      {{ book?.book?.name }}
    </h2>
    <p v-if="!book?.book.is_active" class="badge bg-danger">
      هذا الكتاب تم حذفه من المنهج
    </p>
    <div
      class="blog-meta d-flex align-items-center mb-3 position-right-side flex-wrap gap-4"
    >
      <div class="date d-flex align-items-center">
        <i class="material-symbols-outlined pe-1 md-18 text-primary"
          >calendar_month</i
        >تاريخ الاضافة {{ formattedDate }}
      </div>
      <div class="like d-flex align-items-center">
        <i class="material-symbols-outlined pe-1 md-18 text-primary"> star </i>
        {{ book?.rate }}% تقييم
      </div>
      <div class="comments d-flex align-items-center">
        <i class="material-symbols-outlined pe-1 md-18 text-primary"> book </i>
        عدد الصفحات:
        {{ book?.book?.end_page }}
      </div>
      <div class="comments d-flex align-items-center">
        <i class="material-symbols-outlined pe-1 md-18 text-primary">
          comment </i
        >{{ book?.theses_count }} أطروحة
      </div>
      <div class="comments d-flex align-items-center">
        <i class="material-symbols-outlined pe-1 md-18 text-primary"> forum </i
        >{{ book?.comments_count }} تعليق
      </div>
      <div class="comments d-flex align-items-center">
        <i class="material-symbols-outlined pe-1 md-18 text-primary">
          rate_review </i
        >{{ book?.reviews_count }} تقييم
      </div>
    </div>
    <div class="text-center" v-if="shortBriefText">
      {{ shortBriefText }}
      <a
        role="button"
        class="load-btn"
        v-on:click="loadMoreBriefText"
        v-if="isMore"
        >...قراءة المزيد</a
      >
      <a
        role="button"
        class="load-btn"
        v-on:click="loadLessBriefText"
        v-if="isLess"
        >قراءة أقل</a
      >
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "BookInfo",
  mounted() {
    this.fullBriefText = this.book.book?.brief;
    this.shortBriefText = this.fullBriefText?.slice(0, 200);
  },
  data() {
    return {
      fullBriefText: "",
      shortBriefText: "",
    };
  },
  inject: ["book"],
  computed: {
    isMore() {
      return this.shortBriefText?.length < this.fullBriefText?.length;
    },
    isLess() {
      return (
        this.shortBriefText?.length >= this.fullBriefText?.length &&
        this.fullBriefText?.length > 200
      );
    },
    formattedDate() {
      return moment(this.book?.book?.created_at).format("YYYY-MM-DD");
    },
  },
  methods: {
    resolve_img_url: function (path) {
      return path ? path : require("@/assets/images/main/200x200-book.png");
    },

    loadMoreBriefText() {
      this.shortBriefText = this.fullBriefText;
    },

    loadLessBriefText() {
      this.shortBriefText = this.fullBriefText?.slice(0, 200);
    },
  },
};
</script>
<style lang=""></style>
