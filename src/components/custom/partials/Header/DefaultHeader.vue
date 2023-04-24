<template>
    <div class="iq-top-navbar">
        <nav class="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0">
            <div class="container-fluid navbar-inner">
                <div class="d-flex align-items-center gap-3">
                    <router-link :to="{ name: 'osboha.list' }"
                        class="d-flex align-items-center gap-2 iq-header-logo d-none d-md-flex">
                        <!-- logo -->
                    </router-link>
                    <h3 class="logo-title d-none d-sm-block" data-setting="app_name">أصبوحة 180</h3>
                    <router-link class="sidebar-toggle" @click="toggleSidebar" data-toggle="sidebar" data-active="true"
                        to="#">
                        <div class="icon material-symbols-outlined iq-burger-menu">
                            menu
                        </div>
                    </router-link>
                </div>
                <div class="d-block d-md-none">
                    <router-link :to="{ name: 'osboha.list' }" class="d-flex align-items-center gap-2 iq-header-logo">
                        <!-- logo -->
                        <h3 class="logo-title d-none d-sm-block" data-setting="app_name">أصبوحة 180 </h3>
                    </router-link>
                </div>
                <!-- <div class="iq-search-bar device-search">
                    <form action="#" class="searchbox">
                        <a class="search-link" href="#">
                            <span class="material-symbols-outlined">search</span>
                        </a>
                        <input type="text" class="text search-input form-control bg-soft-primary"
                            placeholder="Search here...">
                    </form>
                </div> -->
                <a class="d-lg-none d-flex" href="javascript:void(0);" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <span class="material-symbols-outlined">tune</span>
                </a>
                <div class="offcanvas offcanvas-end iq-profile-menu-responsive" tabindex="-1" id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header">
                        <h5 id="offcanvasRightLabel">General Setting</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body pt-0">
                        <ul class="navbar-nav  ms-auto navbar-list">
                            <li class="nav-item">
                                <router-link :to="{ name: 'osboha.list' }" class="d-flex align-items-center">
                                    <i class="material-symbols-outlined">home</i>
                                    <span class="mobile-text d-lg-none ms-3">Home</span>
                                </router-link>
                            </li>
                            <li class="nav-item dropdown d-none d-lg-block">
                                <a href="#" class="dropdown-toggle d-flex align-items-center" id="group-drop"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="material-symbols-outlined">group</span>
                                </a>
                                <div class="sub-drop sub-drop-large dropdown-menu " aria-labelledby="group-drop">
                                    <div class="card shadow-none m-0">
                                        <div class="card-header d-flex justify-content-between bg-primary">
                                            <div class="header-title">
                                                <h5 class="mb-0 text-white">Friend Request</h5>
                                            </div>
                                            <small class="badge  bg-light text-dark ">4</small>
                                        </div>
                                        <div class="card-body p-0">
                                            <div class="iq-friend-request">
                                                <div
                                                    class="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                    <div class="d-flex align-items-center">
                                                        <img class="avatar-40 rounded" src="@/assets/images/user/01.jpg"
                                                            alt="" loading="lazy">
                                                        <div class="ms-3">
                                                            <h6 class="mb-0 ">Jaques Amole</h6>
                                                            <p class="mb-0">40 friends</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <a href="javascript:void(0);"
                                                            class="me-3 btn btn-primary rounded">Confirm</a>
                                                        <a href="javascript:void(0);"
                                                            class="me-3 btn btn-secondary rounded">Delete Request</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="iq-friend-request">
                                                <div
                                                    class="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                    <div class="d-flex align-items-center">
                                                        <img class="avatar-40 rounded" src="@/assets/images/user/02.jpg"
                                                            alt="" loading="lazy">
                                                        <div class="ms-3">
                                                            <h6 class="mb-0 ">Lucy Tania</h6>
                                                            <p class="mb-0">12 friends</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <a href="javascript:void(0);"
                                                            class="me-3 btn btn-primary rounded">Confirm</a>
                                                        <a href="javascript:void(0);"
                                                            class="me-3 btn btn-secondary rounded">Delete Request</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="iq-friend-request">
                                                <div
                                                    class="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                    <div class="d-flex align-items-center">
                                                        <img class="avatar-40 rounded" src="@/assets/images/user/03.jpg"
                                                            alt="" loading="lazy">
                                                        <div class=" ms-3">
                                                            <h6 class="mb-0 ">Manny Petty</h6>
                                                            <p class="mb-0">3 friends</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <a href="javascript:void(0);"
                                                            class="me-3 btn btn-primary rounded">Confirm</a>
                                                        <a href="javascript:void(0);"
                                                            class="me-3 btn btn-secondary rounded">Delete Request</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="iq-friend-request">
                                                <div
                                                    class="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                    <div class="d-flex align-items-center">
                                                        <img class="avatar-40 rounded" src="@/assets/images/user/04.jpg"
                                                            alt="" loading="lazy">
                                                        <div class="ms-3">
                                                            <h6 class="mb-0 ">Marsha Mello</h6>
                                                            <p class="mb-0">15 friends</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <a href="javascript:void(0);"
                                                            class="me-3 btn btn-primary rounded">Confirm</a>
                                                        <a href="javascript:void(0);"
                                                            class="me-3 btn btn-secondary rounded">Delete Request</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-center">
                                                <a href="#" class=" btn text-primary">View More Request</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item dropdown d-none d-lg-block">
                                <a href="#" class="search-toggle dropdown-toggle d-flex align-items-center"
                                    id="notification-drop" data-bs-toggle="dropdown">
                                    <i class="material-symbols-outlined">notifications</i>
                                </a>
                                <div class="sub-drop dropdown-menu" aria-labelledby="notification-drop">
                                    <div class="card shadow-none m-0">
                                        <div class="card-header d-flex justify-content-between bg-primary">
                                            <div class="header-title bg-primary">
                                                <h5 class="mb-0 text-white">All Notifications</h5>
                                            </div>
                                            <small class="badge  bg-light text-dark">{{notifications.length}}</small>
                                        </div>
                                        <div class="card-body p-0">
                                            <a href="#" class="iq-sub-card">
                                                <div class="d-flex align-items-center">
                                                    <div class="">
                                                        <img class="avatar-40 rounded" src="@/assets/images/user/01.jpg"
                                                            alt="">
                                                    </div>
                                                    <div class="ms-3 w-100">
                                                        <h6 class="mb-0 ">Emma Watson Bni</h6>
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <p class="mb-0">95 MB</p>
                                                            <small class="float-right font-size-12">Just Now</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" class="iq-sub-card">
                                                <div class="d-flex align-items-center">
                                                    <div class="">
                                                        <img class="avatar-40 rounded" src="@/assets/images/user/02.jpg"
                                                            alt="" loading="lazy">
                                                    </div>
                                                    <div class="ms-3 w-100">
                                                        <h6 class="mb-0 ">New customer is join</h6>
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <p class="mb-0">Cyst Bni</p>
                                                            <small class="float-right font-size-12">5 days ago</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" class="iq-sub-card">
                                                <div class="d-flex align-items-center">
                                                    <div class="">
                                                        <img class="avatar-40 rounded" src="@/assets/images/user/03.jpg"
                                                            alt="" loading="lazy">
                                                    </div>
                                                    <div class="ms-3 w-100">
                                                        <h6 class="mb-0 ">Two customer is left</h6>
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <p class="mb-0">Cyst Bni</p>
                                                            <small class="float-right font-size-12">2 days ago</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" class="iq-sub-card">
                                                <div class="d-flex align-items-center">
                                                    <div class="">
                                                        <img class="avatar-40 rounded" src="@/assets/images/user/04.jpg"
                                                            alt="" loading="lazy">
                                                    </div>
                                                    <div class="w-100 ms-3">
                                                        <h6 class="mb-0 ">New Mail from Fenny</h6>
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <p class="mb-0">Cyst Bni</p>
                                                            <small class="float-right font-size-12">3 days ago</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item d-lg-none">
                                <router-link :to="{ name: 'osboha.notification' }" class="d-flex align-items-center">
                                    <i class="material-symbols-outlined">notifications</i>
                                    <span class="mobile-text  ms-3">Notifications</span>
                                </router-link>
                            </li>
                            <li class="nav-item dropdown d-none d-lg-block">
                                <a href="#" class="d-flex align-items-center dropdown-toggle" id="drop-down-arrow"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src="@/assets/images/user/1.jpg" class="img-fluid rounded-circle me-3" alt="user"
                                        loading="lazy">
                                    <div class="caption">
                                        <h6 class="mb-0 line-height">Bni Cyst</h6>
                                    </div>
                                </a>
                                <div class="sub-drop dropdown-menu caption-menu" aria-labelledby="drop-down-arrow">
                                    <div class="card shadow-none m-0">
                                        <div class="card-header ">
                                            <div class="header-title">
                                                <h5 class="mb-0 ">Hello Bni Cyst</h5>
                                            </div>
                                        </div>
                                        <div class="card-body p-0 ">
                                            <div class="d-flex align-items-center iq-sub-card border-0">
                                                <span class="material-symbols-outlined">
                                                    line_style
                                                </span>
                                                <div class="ms-3">
                                                    <router-link :to="{
                                                            name: 'user.profile', params: {
                                                                user_id: user.id
                                                            }
                                                        }" class="mb-0 h6">
                                                        My Profile
                                                    </router-link>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center iq-sub-card border-0">
                                                <span class="material-symbols-outlined">
                                                    manage_accounts
                                                </span>
                                                <div class="ms-3">
                                                    <router-link :to="{ name: 'user.accountsetting' }" class="mb-0 h6">
                                                        Account settings
                                                    </router-link>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center iq-sub-card border-0">
                                                <span class="material-symbols-outlined">
                                                    lock
                                                </span>
                                                <div class="ms-3">
                                                    <router-link :to="{ name: 'user.privacy-setting' }" class="mb-0 h6">
                                                        Privacy Settings
                                                    </router-link>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center iq-sub-card">
                                                <span class="material-symbols-outlined">
                                                    login
                                                </span>
                                                <div class="ms-3">
                                                    <router-link :to="{ name: 'auth.sign-in' }" class="mb-0 h6">
                                                        Sign out
                                                    </router-link>
                                                </div>
                                            </div>
                                            <div class=" iq-sub-card">
                                                <h5>Chat Settings</h5>
                                            </div>
                                            <div class="d-flex align-items-center iq-sub-card border-0">
                                                <i class="material-symbols-outlined text-success md-14">
                                                    circle
                                                </i>
                                                <div class="ms-3">
                                                    Online
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center iq-sub-card border-0">
                                                <i class="material-symbols-outlined text-warning md-14">
                                                    circle
                                                </i>
                                                <div class="ms-3">
                                                    Away
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center iq-sub-card border-0">
                                                <i class="material-symbols-outlined text-danger md-14">
                                                    circle
                                                </i>
                                                <div class="ms-3">
                                                    Disconnected
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center iq-sub-card border-0">
                                                <i class="material-symbols-outlined text-gray md-14">
                                                    circle
                                                </i>
                                                <div class="ms-3">
                                                    Invisible
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item d-lg-none">
                                <router-link :to="{
                                        name: 'user.profile', params: {
                                            user_id: user.id
                                        }
                                    }" class="dropdown-toggle d-flex align-items-center">
                                    <span class="material-symbols-outlined">person</span>
                                    <span class="mobile-text  ms-3">Profile</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import UserInfo from '@/Services/userInfoService'
import Pusher from 'pusher-js';
import notificationsServices from "@/API/services/notifications.service";
import helper from "@/utilities/helper";

export default {
    name: 'DefaultHeader',
    created() {
        const user_data = UserInfo.getUser()
        this.user = user_data.user
    },
    props: {
        image: {
            type: String,
            default: require('@/assets/images/logo.png')
        }
    },
    setup() {
        const store = useStore()
        const sidebarType = computed(() => store.getters['setting/sidebar_type'])
        const toggleSidebar = () => {
            // Code Here
            if (sidebarType.value.includes('sidebar-mini')) {
                store.dispatch(
                    'setting/sidebar_type',
                    sidebarType.value.filter((item) => item !== 'sidebar-mini')
                )
            } else {
                store.dispatch('setting/sidebar_type', [...sidebarType.value, 'sidebar-mini'])
            }
        }
        return {
            store,
            sidebarType,
            toggleSidebar
        }
    },
    data() {
        return {
            user: null,
            notifications:[],
        }
    },
    mounted() {
        Pusher.logToConsole = true;

        const pusher = new Pusher('0098112dc7c6ed8e4777', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('notifications-channel');
        channel.bind('new-notification', async function (data) {
            if (data) {
                this.notifications= await notificationsServices.listUnreadNotification();
                console.log(Object.keys(this.notifications).length)
                console.log(typeof this.notifications);
                helper.toggleToast(
                    data.message,
                    "success"
                );


            }
        });


    }

}
</script>
