<template>
  <div class="row">
    <div class="col-lg-12" v-for="article in articles" :key="article.id">
      <div class="card card-block card-stretch card-height blog-list">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="image-block">
                <!-- <img
                  :src="resolve_img_url(article.image)"
                  class="img-fluid rounded w-100"
                  alt="blog-img"
                /> -->
                <img class="img-fluid rounded-circle" src="@/assets/images/icon/01.png" alt="">
              </div>
            </div>
            <div class="col-md-6">
              <div class="blog-description p-2">
                <h3 class="mb-2">{{ article.title }}</h3>
                <div class="
                    blog-meta
                    d-flex
                    align-items-center
                    justify-content-between
                    mb-2
                  ">
                  <div class="date">
                    <a href="#" tabindex="-1">{{ article.created_at }}</a>
                  </div>
                </div>
                <p>
                  {{ article.post.body.substring(0, 130) }}
                </p>
                <a href="#" class="btn btn-primary d-flex align-items-center" tabindex="-1">قراءة المزيد</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArticleService from "../../API/services/articles.services";
export default {
  name: "ListArticles",
  components: {},
  data() {
    return {
      articles: [],
    };
  },
  async created() {
    await this.getArticles();
  },
  methods: {
    // resolve_img_url: function (path) {
    //   let images = require.context(
    //     "../../assets/images",
    //     false,
    //     /\.png$|\.jpg$/
    //   );
    //   return images("./" + path);
    // },
    async getArticles() {
      this.articles = await ArticleService.getAll();
    },
  },
};
</script>