<template>
  <div class="d-grid gap-3 d-grid-template-1fr-19 w-25">
    <div class="card mb-0">
      <div
        class="position-absolute top-0 end-0 p-2 rounded-start"
        style="background-color: #278036; opacity: 50%"
      >
        <h6 class="text-white">{{ bookTypeLanguage }}</h6>
      </div>

      <div class="card-body text-center">
        <img
          :src="resolve_img_url(cardInfo.media?.path ?? '')"
          class="img-fluid rounded w-75 mt-3"
          alt="blog-img"
        />

        <div class="group-info pt-3 pb-3">
          <h4>
            <router-link :to="{ name: 'osboha.book' }">{{
              cardInfo.name.slice(0, 20) +
              (cardInfo.name.length > 20 ? "..." : "")
            }}</router-link>
          </h4>
          <p>
            {{
              cardInfo.brief.slice(0, 100) +
              (cardInfo.brief.length > 100 ? "..." : "")
            }}
          </p>
        </div>
        <div class="group-details d-inline-block pb-3">
          <ul
            class="d-flex align-items-center justify-content-between list-inline m-0 p-0"
          >
            <li class="pe-3 ps-3">
              <p class="mb-0">المستوى</p>
              <h6>{{ cardInfo.level }}</h6>
            </li>
            <li class="pe-3 ps-3">
              <p class="mb-0">الفئة</p>
              <h6>{{ cardInfo.section.section }}</h6>
            </li>
            <li class="pe-3 ps-3">
              <p class="mb-0">الصفحات</p>
              <h6>{{ cardInfo.end_page }}</h6>
            </li>
          </ul>
        </div>
        <div class="row d-flex justify-content-center" v-if="isAmbassador">
          <div class="col-6">
            <button
              type="submit"
              class="btn btn-primary d-block w-100"
              @click="bookDetails()"
            >
              عرض أطروحات السفير
            </button>
          </div>
        </div>
        <div class="row d-flex justify-content-center" v-else>
          <div class="col-6">
            <button
              type="submit"
              class="btn btn-primary d-block w-100"
              @click="bookDetails()"
            >
              صفحة الكتاب
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "../../router";
export default {
  name: "BookCard",
  props: {
    cardInfo: { type: Object },
    isAmbassador: { type: Boolean, default: true },
  },
  data() {
    return [];
  },
  methods: {
    resolve_img_url: function (path) {
      if (path) {
        return path;
      }
      let images = require.context(
        "../../assets/images/books",
        false,
        /\.png$|\.jpg$/
      );
      return images("./1.jpg");
    },
    bookDetails() {
      router.push({
        name: "osboha.book-details",
        params: { book_id: this.cardInfo.id },
      });
    },
  },
  computed: {
    bookTypeLanguage() {
      //get type
      let result = "كتاب ";
      const bookType = this.cardInfo.type.type.toLowerCase();

      if (bookType == "normal") {
        result += "منهجي";
      } else if (bookType == "ramadan" || bookType == "tafseer") {
        result += "رمضاني";
      } else if (bookType == "kids") {
        result += "أطفال";
      } else if (bookType == "young") {
        result += "يافعين";
      }

      result += " - ";
      //get language
      const language = this.cardInfo.language.language.toLowerCase();
      if (language == "arabic") {
        result += "عربي";
      } else if (language == "english") {
        result += "إنجليزي";
      }
      return result;
    },
  },
};
</script>
