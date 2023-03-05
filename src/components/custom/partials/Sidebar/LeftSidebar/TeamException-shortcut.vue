<template>
  <div :class="`right-sidebar-mini ${miniClass} data-scrollbar right-sidebar-team`">
    <div class="right-sidebar-panel p-0">
      <div class="card shadow-none">
        <div class="card-body p-0">
          <div class="media-height p-2" data-scrollbar="init">
            <div class="card d-flex align-items-center mb-4">
              <img src="@/assets/images/main/current_book.png" class="card-img-top" alt="current reading">
              <div class="card-body w-100">
                <h4 class="card-title">اجازات الأعضاء</h4>
                <h5 class="card-text">
                  اسم السفير || تجميد
                </h5>
                <p> تنتهي 20-2-2020</p>
                <a href="#" class="btn btn-primary w-100">مراسلة</a>

                <hr>
                <h5 class="card-text">
                  اسم السفير || نظام امتحانات
                </h5>
                <p> تنتهي 20-2-2020</p>
                <a href="#" class="btn btn-primary w-100">مراسلة</a>
                <hr>
                <h5 class="card-text">
                  اسم السفير || تجميد
                </h5>
                <p> تنتهي 20-2-2020</p>
                <a href="#" class="btn btn-primary w-100">مراسلة</a>
              </div>
            </div>

          </div>
          <div class="right-sidebar-toggle text-white mt-3 d-flex toggel-btn" @click="toggleMini">
            <span class="material-symbols-outlined">
              person_off
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TeamException-shortcut',
  data() {
    return {
      miniClass: 'right-sidebar',
    }
  },
  methods: {
    toggleMini() {
      this.rightSideBarMini = !this.rightSideBarMini
      this.checkRightSideBar()
    },
    checkRightSideBar() {
      const body = document.querySelector('body')
      if (this.rightSideBarMini) {
        this.miniClass = 'right-sidebar'
        body.classList.add('right-sidebar-close')
      } else {
        this.miniClass = ''
        body.classList.remove('right-sidebar-close')
      }
    }
  }
}
</script>
<style scoped>
.right-sidebar-team {
  top: 19.5rem !important;
}

.toggel-btn {
  background-color: #831018;
}
</style>