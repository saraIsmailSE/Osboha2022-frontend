<template>
    <li class="nav-item static-item">
        <a class="nav-link static-item disabled" tabindex="-1">
            <span class="default-icon" v-if="inBooksTeam">جودة الكتب</span>
            <span class="default-icon" v-else>الكتب</span>
            <span class="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
        </a>
    </li>
    <!-- ###### Books ###### -->
    <li class="nav-item">
        <router-link :class="checkActive('osboha.book') ? 'active nav-link' : 'nav-link'" aria-current="page"
            :to="{ name: 'osboha.book' }">
            <i class="icon material-symbols-outlined"> auto_stories </i>
            <span class="item-name">الكتب</span>
        </router-link>
    </li>
    <li class="nav-item">
        <router-link :class="checkActive('book.free-book') ? 'active nav-link' : 'nav-link'" aria-current="page" :to="{
            name: 'book.free-book',
            params: {
                user_id: user?.id,
            },
        }">
            <i class="icon material-symbols-outlined"> local_library </i>
            <span class="item-name">الكتاب الحر</span>
        </router-link>
    </li>

    <li class="nav-item">
        <router-link :class="checkActive('book.reading-list') ? 'active nav-link' : 'nav-link'" aria-current="page" :to="{
            name: 'book.reading-list',
            params: {
                user_id: user?.id,
            },
        }">
            <i class="icon material-symbols-outlined"> book_5 </i>
            <span class="item-name">قائمة القراءة</span>
        </router-link>
    </li>
    <li class="nav-item" v-if="inBooksTeam">
        <router-link :class="checkActive('book.create') ? 'active nav-link' : 'nav-link'" aria-current="page"
            :to="{ name: 'book.create' }">
            <i class="icon material-symbols-outlined"> book </i>
            <span class="item-name">اضافة كتاب</span>
        </router-link>
    </li>
    <li class="nav-item">
        <router-link :class="checkActive('book.suggest-book') ? 'active nav-link' : 'nav-link'" aria-current="page"
            :to="{ name: 'book.suggest-book' }">
            <i class="icon material-symbols-outlined"> bolt </i>
            <span class="item-name">اقترح كتاب</span>
        </router-link>
    </li>
    <li class="nav-item" v-if="isTeamSupervisor">
        <router-link :class="checkActive('book.list-violated-books') ? 'active nav-link' : 'nav-link'"
            aria-current="page" :to="{ name: 'book.list-violated-books' }">
            <i class="icon material-symbols-outlined"> book </i>
            <span class="item-name">الكتب المخالفة</span>
        </router-link>
    </li>
    <li class="nav-item" v-if="isTeamSupervisor">
        <router-link :class="checkActive('book.list-suggested-books') ? 'active nav-link' : 'nav-link'"
            aria-current="page" :to="{ name: 'book.list-suggested-books' }">
            <i class="icon material-symbols-outlined"> bookmark_star </i>
            <span class="item-name">الكتب المقترحة</span>
        </router-link>
    </li>
    <li class="nav-item" v-if="isTeamCoordinator">
        <router-link :class="checkActive('roles.rolesControl') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
                name: 'roles.rolesControl',
                params: {
                    type: 'booksTeam',
                },
            }">
            <i class="icon material-symbols-outlined"> digital_wellbeing </i>
            <span class="item-name">تحكم العضويات</span>
        </router-link>
    </li>
    <li class="nav-item" v-if="isTeamCoordinator">
        <router-link :class="checkActive('book.quality-team-achievements') ? 'active nav-link' : 'nav-link'
            " aria-current="page" :to="{
                name: 'book.quality-team-achievements',
            }">
            <i class="icon material-symbols-outlined"> person </i>
            <span class="item-name">انجاز الاعضاء</span>
        </router-link>
    </li>
</template>
<script>
import UserInfoService from "@/Services/userInfoService";

export default {
    name: "Osboha Books",
    methods: {
        checkActive(route) {
            if (this.$route.name === route) {
                return true;
            }
        },
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        inBooksTeam() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                'book_quality_team_coordinator',
                'book_quality_team',
            ]);
        },
        isTeamCoordinator() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                'book_quality_team_coordinator',
            ]);
        },
        isTeamSupervisor() {
            return UserInfoService.hasRoles(this.user, [
                "admin",
                'book_quality_team_coordinator',
                'book_quality_supervisor',
            ]);
        }
    },
};
</script>