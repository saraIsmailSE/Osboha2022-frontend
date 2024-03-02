<template>
  <div :class="`right-sidebar-mini  ${miniClass} data-scrollbar`" v-click-outside="onClickOutside">
    <div class="right-sidebar-panel p-0">
      <div class="card shadow-none">
        <div class="card-body p-0">
          <div class="media-height p-2" data-scrollbar="init">
            <div class="card d-flex align-items-center mb-4">
              <img src="@/assets/images/main/current_book.png" class="card-img-top" alt="current reading" />

              <h5 class="card-title mt-3">املأ مخزون ثقافتك</h5>
              <div id="carouselExampleCaptions" class="carousel slide w-100" data-bs-ride="false" v-if="book_in_progress">
                <div class="carousel-inner w-75 m-4">
                  <div class="carousel-item" v-for="(book, index) in book_in_progress" :key="index"
                    :class="(index == 0) ? 'active' : ''">

                    <div class="progress mb-3">
                      <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" aria-valuenow="90"
                        aria-valuemin="0" aria-valuemax="100" :style="`width: ${Math.trunc(progress[index])}%;`"></div>
                    </div>

                    <p class="card-text h3">
                      {{ book.name }}
                      <router-link class="btn btn-primary w-100 mt-2" :to="{
                        name: 'book.book-details',
                        params: { book_id: book.id },
                      }">
                        متابعة
                      </router-link>
                    </p>
                  </div>
                  <div class="carousel-item">
                    <p class="card-text h3">
                      <span class="material-symbols-outlined text-center display-5 w-100"> ac_unit </span>

                      <router-link class="btn btn-primary w-100 mt-2 " style="background-color: #223E7F;" :to="{
                        name: 'user.requestexception',
                        params: { user_id: user.id },
                      }
                        ">
                        طلب اجازة
                      </router-link>
                    </p>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev">
                  <span class="carousel-btn material-symbols-outlined carousel-control-prev-icon" aria-hidden="true">
                    arrow_back_ios
                  </span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next">
                  <span class="carousel-btn material-symbols-outlined carousel-control-next-icon" aria-hidden="true">
                    arrow_forward_ios
                  </span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <div class="card-body w-100" v-else>
                <h4 class="card-title">لا يوجد كتب</h4>
                <router-link class="btn btn-primary w-100" :to="{ name: 'osboha.book' }">
                  ابدأ الأن
                </router-link>
              </div>
            </div>
          </div>
          <div class="right-sidebar-toggle bg-primary text-white mt-3 d-flex" @click="toggleMini">
            <span class="material-symbols-outlined"> auto_stories </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vClickOutside from "click-outside-vue3";

export default {
  name: "CurrentReading",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  created() {
  },
  props: {
    book_in_progress: {
      type: [Object],
      default: () => { },
    },
    progress: {
      type: [Number],
      default: null,
    },
  },
  data() {
    return {
      miniClass: "right-sidebar",
      rightSideBarMini: true,
    };
  },
  methods: {
    toggleMini() {
      this.rightSideBarMini = !this.rightSideBarMini;
      this.checkRightSideBar();
    },
    checkRightSideBar() {
      const body = document.querySelector("body");
      if (this.rightSideBarMini) {
        this.miniClass = "right-sidebar";
        body.classList.add("right-sidebar-close");
      } else {
        this.miniClass = "";
        body.classList.remove("right-sidebar-close");
      }
    },
    onClickOutside() {
      this.rightSideBarMini = true;
      const body = document.querySelector("body");
      this.miniClass = "right-sidebar";
      body.classList.add("right-sidebar-close");
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  }

};
</script>
<style scoped>
.bg-primary {
  background-color: #278036 !important;
}

.carousel-btn {
  color: #1d1a55;
}
</style>
