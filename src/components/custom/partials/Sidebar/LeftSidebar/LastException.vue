<template>
    <div :class="`right-sidebar-mini ${miniClass} data-scrollbar right-sidebar-exception`" v-click-outside="onClickOutside">
        <div class="right-sidebar-panel p-0">
            <div class="card shadow-none">
                <div class="card-body p-0">
                    <div class="media-height p-2" data-scrollbar="init">
                        <div class="card d-flex align-items-center mb-4">
                            <img src="@/assets/images/main/relax.png" class="card-img-top w-50" alt="current reading" />
                            <div class="card-body row d-flex justify-content-center card-shadow" v-if="lastException">
                                <h4 class="card-title text-center" style="direction: rtl">
                                    لديك اعفاء: {{ lastException.type.type }}
                                    <p v-if="lastException.week"> للأسبوع {{ lastException.week.title }} </p>
                                </h4>
                                <h6 class="mt-2" style="direction: rtl !important"
                                    v-if="lastException.status == 'accepted'">
                                    ينتهي بــ :
                                    {{ lastException.end_at }}
                                </h6>
                                <router-link :to="{
                                    name: 'exceptions.listException',
                                    params: { exception_id: lastException.id },
                                }">
                                    عرض الاعفاء
                                </router-link>

                            </div>

                            <div class="card-body row d-flex justify-content-center card-shadow">
                                <router-link :to="{
                                    name: 'user.listException',
                                    params: { user_id: lastException.user_id },
                                }">
                                    <p>
                                        <span class="material-symbols-outlined align-middle">
                                            arrow_back
                                        </span>
                                        عرض جميع الاعفاءات

                                    </p>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="right-sidebar-toggle text-white mt-3 d-flex toggel-btn" @click="toggleMini">
                        <span class="material-symbols-outlined "> ac_unit </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vClickOutside from "click-outside-vue3";

export default {
    name: "lastException Sidebar",
    directives: {
        clickOutside: vClickOutside.directive,
    },
    props: {
        lastException: {
            type: [Object],
            required: true,
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
        onCountdownEnd: function () {
            // re-read week info [to start new week]
        },
        onClickOutside() {
            this.rightSideBarMini = true;
            const body = document.querySelector("body");
            this.miniClass = "right-sidebar";
            body.classList.add("right-sidebar-close");
        },

    },
};
</script>
<style scoped>
.right-sidebar-exception {
    top: 13.5rem !important;
}

.toggel-btn {
    background-color: #223E7F;
}

.card-shadow {
    box-shadow: none;
}
</style>
