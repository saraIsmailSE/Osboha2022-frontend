<template>
    <div :class="`right-sidebar-mini ${miniClass} data-scrollbar right-sidebar-team`">
        <div class="right-sidebar-panel p-0">
            <div class="card shadow-none">
                <div class="card-body p-0">
                    <div class="media-height p-2" data-scrollbar="init">
                        <div class="card d-flex align-items-center mb-4">
                            <img src="@/assets/images/main/team_work.png" class="card-img-top" alt="current reading">
                            <div class="card-body row d-flex justify-content-center card-shadow">

                                <div class="card border-primary mb-3 col-6 card-shadow" >
                                    <div class="card-header">يوم</div>
                                    <div class="card-body text-primary">
                                        <h5 class="card-title">01</h5>
                                    </div>
                                </div>
                                <div class="card border-primary mb-3 col-6 card-shadow">
                                    <div class="card-header">ساعة</div>
                                    <div class="card-body text-primary">
                                        <h5 class="card-title">01</h5>
                                    </div>
                                </div>
                                <div class="card border-primary mb-3 col-6 card-shadow" >
                                    <div class="card-header">دقيقة</div>
                                    <div class="card-body text-primary">
                                        <h5 class="card-title">01</h5>
                                    </div>
                                </div>
                                <div class="card border-primary mb-3 col-6 card-shadow" >
                                    <div class="card-header">ثانية</div>
                                    <div class="card-body text-primary">
                                        <h5 class="card-title">01</h5>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="right-sidebar-toggle text-white mt-3 d-flex toggel-btn" @click="toggleMini">
                        <span class="material-symbols-outlined">
                            acute
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Timer Sidebar',
    created() {
    },
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
    top: 10.5rem !important;
}

.toggel-btn {
    background-color: #1d1a55;
}

.card-shadow {
    box-shadow: none
}
</style>