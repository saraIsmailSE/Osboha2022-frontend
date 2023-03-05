<template>
    <div :class="`right-sidebar-mini ${miniClass} data-scrollbar right-sidebar-team`">
        <div class="right-sidebar-panel p-0">
            <div class="card shadow-none">
                <div class="card-body p-0">
                    <div class="media-height p-2" data-scrollbar="init">
                        <div class="card d-flex align-items-center mb-4">
                            <img src="@/assets/images/main/team_work.png" class="card-img-top" alt="current reading">
                            <div class="card-body w-100">
                                <h4 class="card-title">تحديات الفريق</h4>

                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="mb-1">
                                            تحدي 1
                                        </h4>
                                        <p class="mb-0 fs-6"> مشاهدة</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="mb-1">
                                            تحدي 2
                                        </h4>
                                        <p class="mb-0 fs-6"> مشاهدة</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="right-sidebar-toggle text-white mt-3 d-flex toggel-btn" @click="toggleMini">
                        <span class="material-symbols-outlined">
                            workspace_premium
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ReadingTeam',
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
    top: 13.5rem !important;
}

.toggel-btn {
    background-color: #DF7F43;
}
</style>