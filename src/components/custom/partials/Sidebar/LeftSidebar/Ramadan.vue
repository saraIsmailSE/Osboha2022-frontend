<template>
  <div :class="`right-sidebar-mini  ${miniClass} data-scrollbar`" v-click-outside="onClickOutside">
    <div class="right-sidebar-panel p-0">
      <div class="card shadow-none">
        <div class="card-body p-0">
          <div class="media-height p-2" data-scrollbar="init">
            <div class="card d-flex align-items-center mb-4">

              <div id="ramadanCarousel" class="carousel slide w-100" data-bs-ride="false">
                <div class="carousel-inner w-75 m-4">
                  <button class="carousel-control-prev" type="button" data-bs-target="#ramadanCarousel"
                    data-bs-slide="prev">
                    <span class="carousel-btn material-symbols-outlined carousel-control-prev-icon" aria-hidden="true">
                      arrow_back_ios
                    </span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#ramadanCarousel"
                    data-bs-slide="next">
                    <span class="carousel-btn material-symbols-outlined carousel-control-next-icon" aria-hidden="true">
                      arrow_forward_ios
                    </span>
                    <span class="visually-hidden">Next</span>
                  </button>

                  <div class="carousel-item" v-for="(data, index) in ramadanData" :key="index"
                    :class="(index == 0) ? 'active' : ''">

                    <div class=" text-center mb-3">
                      <img :src="data.image" class="w-50" alt="ramadan data" />
                    </div>

                    <p class="card-text h3 text-center">
                      {{ data.title }}
                      <router-link class="btn ramadan-btn w-100 mt-2" :to="{ name: data.route_to, }">
                        عرض
                      </router-link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right-sidebar-toggle text-white mt-3 d-flex toggel-btn" @click="toggleMini">
            <img src="@/assets/images/ramadan/ramadan_btn.png" class="w-50" alt="ramadan" />
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
  data() {
    return {
      miniClass: "right-sidebar",
      rightSideBarMini: true,
      ramadanData: [
        {
          route_to: "book.ramadan",
          title: "الكتب الرمضانية",
          image: require("@/assets/images/ramadan/ramadan-2024_books.png")
        },
        {
          route_to: "ramadan.quran",
          title: "وِرد القرآن الكريم",
          image: require("@/assets/images/ramadan/ramadan-2024-03.png")
        },
        {
          route_to: "ramadan.night-prayer",
          title: "قيام الليل",
          image: require("@/assets/images/ramadan/ramadan-2024-02.png")
        },
        {
          route_to: "ramadan.hadith",
          title: "مسابقة الحديث الشريف",
          image: require("@/assets/images/ramadan/ramadan-2024-01.png")
        },
        {
          route_to: "ramadan.questions",
          title: "اسئلة رمضان",
          image: require("@/assets/images/ramadan/ramadan-2024-04.png")
        },
        {
          route_to: "ramadan.golden-day",
          title: "اليوم الذهبي",
          image: require("@/assets/images/ramadan/ramadan-2024-05.png")
        },
        {
          route_to: "ramadan.telegram-channels",
          title: "قنوات أصبوحة الرمضانية",
          image: require("@/assets/images/ramadan/ramadan-2024_telegram.png")
        }
      ],

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

.toggel-btn {
  margin-right: -3.5rem !important;
  background-color: #FCD2BE;
}

.carousel-btn {
  color: #1d1a55;
}

.ramadan-btn {
  background: #b17658;
  color: #f8f9fa;

}
</style>