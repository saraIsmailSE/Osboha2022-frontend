<template>
    <div class="tree-container" v-if="rootUser">
        <div class="">
            <h2 class="text-center">{{ rootUser.name }}</h2>
        </div>

        <hr>

        <ul class="tree" v-if="users.length > 0">
            <li>
                <user-item v-for="user in topLevelUsers" :key="user.id" :user="user" :users="users" />
            </li>
        </ul>

        <p class="text-center dsiplay-6" v-else>
            لا يوجد مسؤول عنهم
            <span class="material-symbols-outlined align-middle">
                info
            </span>
        </p>
    </div>
    <hr>
    <div class="row d-flex justify-content-center mt-2">
        <span class="material-symbols-outlined text-center display-3">
            monitoring
        </span>
    </div>
    <div class="row d-flex justify-content-center mt-2">
        <div class="col-6 col-md-6 col-lg-6 text-center">
            <h5 class="text-center">
                عدد أفرقة المتابعة المسؤول عنها
            </h5>
            <p class="text-center display-4">
                {{ followup_groups }}
            </p>
        </div>
        <div class="col-6 col-md-6 col-lg-6 text-center">
            <h5 class="text-center">
                عدد أفرقة الرقابة المسؤول عنها
            </h5>
            <p class="text-center display-4">
                {{ supervising_groups }}
            </p>
        </div>
    </div>

    <div class="row d-flex justify-content-center mt-2" v-if="isAdmin">
        <div class="col-6 col-md-6 col-lg-6 text-center">
            <h5 class="text-center">
                العدد الكلي لأفرقة المتابعة
            </h5>
            <p class="text-center display-4">
                {{ total_followup_groups }}
            </p>
        </div>
        <div class="col-6 col-md-6 col-lg-6 text-center">
            <h5 class="text-center">
                العدد الكلي لأفرقة الرقابة
            </h5>
            <p class="text-center display-4">
                {{ total_supervising_groups }}
            </p>
        </div>
    </div>

</template>

<script>
import UserService from "@/API/services/user.service";
import UserItem from '@/components/user/UserItem';
import { watchEffect } from 'vue'
import UserInfoService from "@/Services/userInfoService";

export default {
    name: "Assign To Parent",
    async created() {
        watchEffect(async () => {
            const response = await UserService.retrieveNestedUsers(this.$route.params.parent_id);
            this.rootUser = response.root_user;
            this.users = response.nested_users;
            this.supervising_groups = response.supervising_groups;
            this.followup_groups = response.followup_groups;
            if (this.isAdmin) {
                this.total_followup_groups = response.total_followup_groups;
                this.total_supervising_groups = response.total_supervising_groups;
            }
        })

    },
    components: {
        UserItem,
    },
    data() {
        return {
            loader: false,
            rootUser: null,
            users: [],
            followup_groups: 0,
            supervising_groups: 0,
            total_supervising_groups: 0,
            total_followup_groups: 0,

        };
    },
    methods: {
    },
    computed: {
        topLevelUsers() {
            // Filter users that are at the top level (i.e., have no parents)
            return this.users.filter(u => u.depth === 0);
        },
        user() {
            return this.$store.getters.getUser;
        },
        isAdmin() {
            return UserInfoService.hasRole(this.user, "admin");
        },

    },

};
</script>
<style scoped>
.tree-container {
    direction: ltr;
    overflow-x: auto;
    max-height: 500px;
}
</style>


<style scoped lang="scss">
// typography
// ----------
$font-stack: normal normal 13px/1.4 Segoe, "Segoe UI", Calibri, Helmet, FreeSans,
    Sans-Serif;

// colors
// ------
$background-color: #f8f9fa;
; // all backgrounds
$connector-color: #369; // connectors and text
$shadow-color: #8f949a;
$box-color: #afafaf; // box border

// major dimensions
// ----------------
$tree-margin-left: 0px;

$entry-height: 3em; // total hight of entry: card + gap on top

$card-ident: 2em; // card horizontal ident (to nearest connector)
$card-height: 1.5em;
$card-width: 15em; // 'auto' is acceptable
$card-padding-top: (
    $card-height - 1em)/2;
$card-padding-side: $card-padding-top * 2;

$hconnector-top: 1em;

// =================== Don't edit below this line ========================

$card-margin-top: $entry-height - $card-height; // card vertical gap
$connector-vident: (
    $entry-height)/2 + $card-margin-top - 1.5em;
$tree-ident: $card-width; // connector horizontal ident (to card's front)

$background-color-presudo: $background-color; //for dev: beige;
$box-shadow: 1px 1px 4px $shadow-color;
$width-presudo: 0px;

body {
    background: $background-color;
    font: $font-stack;
}

// All of the magic inside .tree
.tree {
    & ul {
        margin: 0 0 0 $tree-ident; // whole tree indentation TODO:
        padding: 0;
        list-style: none;
        color: $connector-color;
        position: relative;
    }

    &:before,
    ul:before {
        content: "";
        display: block;
        width: $width-presudo;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        border-left: 1px solid; // vertical connectors
        background: $background-color-presudo; // same with body background
        // z-index: -1;
    }

    & li {
        list-style: none;
        font-weight: bold;
        line-height: $entry-height;
        margin: 0;
        padding: $card-margin-top 0 0 $card-ident; // indentation + .5em
        position: relative;
        // z-index: -1;

        &:before {
            border-top: 1px solid;
            content: "";
            display: block;
            height: 100%;
            left: 0;
            margin-top: $hconnector-top; // border top width
            position: absolute;
            top: $connector-vident; // (line-height/2)
            width: $card-ident; // same with indentation
        }

        &:last-child:before {
            background: $background-color-presudo; // same with body background
            bottom: 0;
            height: auto;
            top: $connector-vident; // (line-height/2)
        }
    }

    &>li:before {
        border-top: none !important;
    }

    & li div {
        border-radius: 5px;
        border: 1px solid $box-color;
        margin: 0;
        max-width: $card-width;
        min-width: $card-width;
        padding: $card-padding-top $card-padding-side;

        background: $background-color;
        box-shadow: $box-shadow;
        color: $connector-color;
        font-weight: bold;
    }
}

// Espasially for root level ul
ul.tree {
    margin-left: $tree-margin-left; // Set ident for the root ul (whole tree ident)

    &:before {
        border-left: none; // Remove left border for the root ul
    }
}

// Put it to sticky divs
.sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    width: 100%;
}
</style>