<template>
    <main>

        <div class="row">
            <div class="col-lg-12" v-if="book">
                <div class="card card-block card-stretch card-height blog blog-detail">
                    <div class="card-body">
                        <div class="position-absolute start-0">
                            <span role="button" @click="download(book.link)"
                                class="material-symbols-outlined align-middle display-5 me-1s">
                                download
                            </span>
                            <router-link class="material-symbols-outlined align-middle display-5 me-3" :to="{
                                name: 'book.update',
                                params: { book_id: book.id },
                            }" v-if="isAdmin || inBooksTeam || book_owner">
                                edit
                            </router-link>
                        </div>

                        <div class="image-block text-center mt-3">
                            <img :src="resolve_img_url(book.media.path ?? '')" class="img-fluid rounded w-25"
                                alt="blog-img" />
                        </div>
                        <div class="blog-description mt-3 text-center">
                            <h2 class="mb-3 pb-3 border-bottom text-center">
                                {{ book.name }}
                            </h2>
                            <div class="blog-meta d-flex align-items-center mb-3 position-right-side flex-wrap">
                                <div class="date me-4 d-flex align-items-center">
                                    <i class="material-symbols-outlined pe-2 md-18 text-primary">calendar_month</i>تاريخ
                                    الاضافة {{
                                        formattedDate }}
                                </div>
                                <div class="comments me-4 d-flex align-items-center">
                                    <i class="material-symbols-outlined pe-2 md-18 text-primary">
                                        book
                                    </i>
                                    عدد الصفحات:
                                    {{ book.end_page }}
                                </div>
                            </div>
                            <div class="text-center">
                                {{ shortBriefText }}
                                <a class="load-btn" v-on:click="loadMoreBriefText" v-if="isMore">...قراءة المزيد</a>
                                <a class="load-btn" v-on:click="loadLessBriefText" v-if="isLess">قراءة أقل</a>
                            </div>
                            <div class="col-lg-12 mt-3">
                                <div class="card card-block card-stretch card-height blog">
                                    <router-link :to="{
                                        name: 'book.book-details',
                                        params: { book_id: book.id },
                                    }" class="btn btn-primary d-block w-100" :disabled="!(book.allow_comments)">
                                        عرض الأطروحات
                                    </router-link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import bookService from "@/API/services/book.service";
import moment from "moment";
import UserInfoService from "@/Services/userInfoService";

export default {
    name: "Latest Book",
    async created() {
        this.book = await bookService.latestBooks();
        this.fullBriefText = this.book.brief;
        this.shortBriefText = this.fullBriefText?.slice(0, 200);
    },
    data() {
        return {
            book: null,
            fullBriefText: "",
            shortBriefText: "",

        };
    },

    methods: {
        loadMoreBriefText() {
            this.shortBriefText = this.fullBriefText;
        },
        loadLessBriefText() {
            this.shortBriefText = this.fullBriefText?.slice(0, 200);
        },
        resolve_img_url: function (path) {
            return path ? path : require("@/assets/images/main/200x200-book.png");
        },
    },

    computed: {
        formattedDate() {
            return moment(this.book?.created_at).format("YYYY-MM-DD");
        },
        isMore() {
            return this.shortBriefText?.length < this.fullBriefText?.length;
        },
        isLess() {
            return (
                this.shortBriefText?.length >= this.fullBriefText?.length &&
                this.fullBriefText?.length > 200
            );
        },
        user() {
            return this.$store.getters.getUser;
        },
        inBooksTeam() {
            return UserInfoService.hasRole(this.user, "book_quality_team");
        },
        isAdmin() {
            return UserInfoService.hasRole(this.user, "admin");
        },
    }

};
</script>
<style>
.load-btn {
    color: #216d2e;
    font-weight: bold;
    cursor: pointer;
}
</style>
  