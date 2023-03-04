<template>
    <!-- Sidebar Menu Start -->
    <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
        <li class="nav-item static-item">
            <a class="nav-link static-item disabled" href="#" tabindex="-1">
                <span class="default-icon">Social</span>
                <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
            </a>
        </li>
        <li class="nav-item">
            <router-link :class="checkActive('social.list') ? 'active nav-link' : 'nav-link'" aria-current="page"
                :to="{ name: 'social.list' }">
                <i class="icon material-symbols-outlined">
                    newspaper
                </i>
                <span class="item-name">الرئيسية</span>
            </router-link>
        </li>
        <!-- ###### Profile ###### -->
        <li class="nav-item">
            <router-link :class="checkActive('user.profile') ? 'active nav-link' : 'nav-link'"
                :to="{ name: 'user.profile' }">
                <i class="icon material-symbols-outlined">
                    person
                </i>
                <span class="user.profile">الملف الشخصي</span>

            </router-link>
        </li>
        <!-- ###### group ###### -->
        <li class="nav-item">
            <router-link :class="checkActive('social.group') ? 'active nav-link' : 'nav-link'" aria-current="page"
                :to="{ name: 'social.group' }">
                <i class="icon material-symbols-outlined">
                    groups
                </i>
                <span class="item-name">المجموعات </span>
            </router-link>
        </li>
        <!-- ###### Books ###### -->
        <li class="nav-item">
            <router-link :class="checkActive('social.book') ? 'active nav-link' : 'nav-link'" aria-current="page"
                :to="{ name: 'social.book' }">
                <i class="icon material-symbols-outlined">
                    book
                </i>
                <span class="item-name">الكتب</span>
            </router-link>
        </li>
        <li class="nav-item static-item">
            <a class="nav-link static-item disabled" href="#" tabindex="-1">
                <span class="default-icon">Latest</span>
                <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
            </a>
        </li>
        <li class="nav-item">
            <router-link :class="checkActive('app.chat') ? 'active nav-link' : 'nav-link'" aria-current="page"
                :to="{ name: 'app.chat' }">
                <i class="icon material-symbols-outlined">
                    message
                </i>
                <span class="item-name">الرسائل</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :class="checkActive('social.infographic') ? 'active nav-link' : 'nav-link'" aria-current="page"
                :to="{ name: 'social.infographic' }">
                <i class="icon material-symbols-outlined">
                    extension
                </i>
                <span class="item-name">انفوجرافيك</span>
            </router-link>
        </li>

        <li class="nav-item">
            <router-link :class="checkActive('social.articles') ? 'active nav-link' : 'nav-link'" aria-current="page"
                :to="{ name: 'social.articles' }">
                <i class="icon material-symbols-outlined">
                    article
                </i> <span class="item-name">مقالات</span>
            </router-link>
        </li>

    </ul>
    <!-- Sidebar Menu End -->
</template>
<script>
export default {
    name: 'DefaultSidebar',
    data() {
        return {
        }
    },
    methods: {
        checkActive(route) {
            if (this.$route.name === route) {
                return true
            }
            if (route.includes(this.$route.name)) {
                return true
            }
        }
    }
}
</script>
