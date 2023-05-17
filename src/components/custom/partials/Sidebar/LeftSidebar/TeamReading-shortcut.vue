<template>
  <div
    :class="`right-sidebar-mini ${miniClass} data-scrollbar right-sidebar-team`"
  >
    <div class="right-sidebar-panel p-0">
      <div class="card shadow-none">
        <div class="card-body p-0">
          <div class="media-height p-2" data-scrollbar="init">
            <div class="card d-flex align-items-center mb-4">
              <img
                src="@/assets/images/main/current_book.png"
                class="card-img-top"
                alt="current reading"
              />
              <div class="card-body w-100">
                <h4 class="card-title">كتب يقرؤها الأعضاء</h4>
                <p class="card-text">اسم الكتاب</p>
                <a href="#" class="btn btn-primary w-100">مشاهدة</a>

                <hr />
                <p class="card-text">اسم الكتاب</p>
                <a href="#" class="btn btn-primary w-100">مشاهدة</a>

                <hr />
                <p class="card-text">اسم الكتاب</p>
                <a href="#" class="btn btn-primary w-100">مشاهدة</a>
              </div>
            </div>
          </div>
          <div
            class="right-sidebar-toggle text-white mt-3 d-flex toggel-btn"
            @click="toggleMini"
          >
            <span class="material-symbols-outlined"> local_library </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TeamReading-shortcut",
  data() {
    return {
      miniClass: "right-sidebar",
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
  },
};
</script>
<style scoped>
.right-sidebar-team {
  top: 16.5rem !important;
}

.toggel-btn {
  background-color: #1d1a55;
}
</style>
