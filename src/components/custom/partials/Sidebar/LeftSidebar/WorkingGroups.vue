<template>
    <div :class="`right-sidebar-mini ${miniClass} data-scrollbar right-sidebar-team`">
        <div class="right-sidebar-panel p-0">
            <div class="card shadow-none">
                <div class="card-body p-0">
                    <div class="media-height p-2" data-scrollbar="init">
                        <div class="card d-flex align-items-center mb-4">
                            <img src="@/assets/images/main/team_work.png" class="card-img-top" alt="current reading">
                            <div class="card-body w-100">
                                <h4 class="card-title">أفرقة العمل</h4>

                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="mb-1">
                                            دورة القيادة
                                            <img src="@/assets/images/working-groups/leader.png" alt="leader" width="25" />
                                        </h4>
                                        <p class="mb-0 fs-6"> مدرب</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="mb-1">
                                            فريق الانفوجرافيك
                                            <img src="@/assets/images/working-groups/infographic.png" alt="infographi team" width="25" />
                                        </h4>
                                        <p class="mb-0 fs-6"> مصمم</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="right-sidebar-toggle text-white mt-3 d-flex toggel-btn" @click="toggleMini">
                        <span class="material-symbols-outlined">
                            diversity_2
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
    top: 10.5rem !important;
}

.toggel-btn {
    background-color: #1d1a55;
}
</style>