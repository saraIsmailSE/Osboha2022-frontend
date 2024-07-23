<template>
    <div :class="`right-sidebar-mini ${miniClass} data-scrollbar right-sidebar-team`" v-click-outside="onClickOutside">
        <div class="right-sidebar-panel p-0">
            <div class="card shadow-none">
                <div class="card-body p-0">
                    <div class="media-height p-2" data-scrollbar="init">
                        <div class="card d-flex align-items-center mb-4">
                            <img src="@/assets/images/main/team.png" class="card-img-top" alt="current reading">
                            <div class="card-body w-100" v-if="reading_team">
                                <h4 class="card-title" style="direction: rtl;">
                                    <span class="material-symbols-outlined align-middle">
                                        diversity_1
                                    </span>
                                    فريق المتابعة:
                                    {{ reading_team.group.name }}
                                </h4>
                                <router-link class="btn btn-primary w-100" :to="{
                                    name: 'group.group-detail',
                                    params: { group_id: reading_team.group.id },
                                }">مشاهدة
                                </router-link>
                            </div>
                            <div class="card-body w-100" v-else>
                                <h4 class="card-title">لست في أي فريق</h4>
                            </div>
                            <div class="card-body w-100" v-if="parent">
                                <h4 class="card-title mb-2" style="direction: rtl;">
                                    <span class="material-symbols-outlined align-middle">
                                        supervisor_account
                                    </span>
                                    المسؤول عنك:
                                    <br />
                                    {{ parent.name + " " + parent.last_name }}
                                </h4>
                                <div class="d-flex justify-content-around">
                                    <router-link class="btn btn-primary rounded"
                                        :to="{ name: 'user.profile', params: { user_id: parent.id } }">
                                        <span class="material-symbols-outlined">
                                            person
                                        </span>
                                    </router-link>
                                    <router-link class="btn btn-info text-white rounded"
                                        :to="{ name: 'chat.index', query: { user_id: parent.id } }">
                                        <span class="material-symbols-outlined m-auto">
                                            forum
                                        </span>
                                    </router-link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="right-sidebar-toggle text-white mt-3 d-flex toggel-btn" @click="toggleMini">
                        <span class="material-symbols-outlined">
                            diversity_3
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vClickOutside from "click-outside-vue3";

export default {
    name: 'ReadingTeam',
    directives: {
        clickOutside: vClickOutside.directive,
    },
    created() {
    },
    props: {
        reading_team: {
            type: [Object],
            required: true,
        },
        parent: {
            type: [Object],
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
        },
        onClickOutside() {
            this.rightSideBarMini = true;
            const body = document.querySelector("body");
            this.miniClass = "right-sidebar";
            body.classList.add("right-sidebar-close");
        },

    }
}
</script>
<style scoped>
/* .right-sidebar-team {
    top: 11.5rem !important;
} */
.right-sidebar-team {
    top: 7.5rem !important;
}


.toggel-btn {
    background-color: #192e35;
}
</style>