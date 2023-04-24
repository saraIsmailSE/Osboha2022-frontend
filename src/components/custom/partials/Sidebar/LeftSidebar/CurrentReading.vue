<template>
  <div :class="`right-sidebar-mini  ${miniClass} data-scrollbar`">
    <div class="right-sidebar-panel p-0">
      <div class="card shadow-none">
        <div class="card-body p-0">
          <div class="media-height p-2" data-scrollbar="init">
            <div class="card d-flex align-items-center mb-4">
              <img src="@/assets/images/main/current_book.png" class="card-img-top" alt="current reading">
              <div class="card-body w-100" v-if="book_in_progress">
                <div class="progress mb-3" v-if="progress">
                  <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" aria-valuenow="90"
                    aria-valuemin="0" aria-valuemax="100" :style="`width: ${Math.trunc(progress)}%;`"></div>
                </div>
                <h4 class="card-title">املأ مخزون ثقافتك</h4>
                <p class="card-text">
                  {{ book_in_progress.name }}
                </p>

                <router-link class="btn btn-primary w-100" :to="{
                  name: 'osboha.book-details',
                  params: { book_id: book_in_progress.id },
                }">
                  متابعة
                </router-link>
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
  props: {
    book_in_progress: {
      type: [Object],
      required: true,
    },
    progress: {
      type: [Number],
      required: true,
    },
  },
  data() {
    return {
      miniClass: 'right-sidebar',
      rightSideBarMini: true,
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
.bg-primary{
  background-color: #278036 !important;
}
</style>