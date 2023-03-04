<template>
  <div :class="`right-sidebar-mini ${miniClass} data-scrollbar`">
    <div class="right-sidebar-panel p-0">
      <div class="card shadow-none">
        <div class="card-body p-0">
          <div class="media-height p-2" data-scrollbar="init">
            <div class="card d-flex align-items-center mb-4">
              <img src="@/assets/images/main/current_book.png" class="card-img-top" alt="current reading">
              <div class="card-body w-100">
                <div class="progress mb-3">
                  <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" aria-valuenow="90"
                    aria-valuemin="0" aria-valuemax="100" :style="`width: 40%;`"></div>
                </div>
                <h4 class="card-title">املأ مخزون ثقافتك</h4>
                <p class="card-text">
                  اسم الكتاب
                </p>
                <a href="#" class="btn btn-primary w-100">متابعة</a>
              </div>
            </div>

          </div>
          <div class="right-sidebar-toggle bg-primary text-white mt-3 d-flex" @click="toggleMini">
            <span class="material-symbols-outlined">
              auto_stories
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CurrentReading',
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
