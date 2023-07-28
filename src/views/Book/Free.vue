<template>
    <main>
        <div class="col-sm-12 text-center" v-if="loading && books.length <= 0">
            <img :src="require('@/assets/images/page-img/page-load-loader.gif')" alt="loader" style="height: 100px" />
        </div>

        <template v-else>
            <div class="d-grid gap-3 d-grid-template-1fr-19">
                <BookCard v-for="bookInfo in books" :key="bookInfo.id" :cardInfo="bookInfo"
                    @updateUserBook="updateUserBook" />
            </div>
            <div class="text-center mt-3">
                <ul class="pagination w-100">
                    <router-link class="page-item page-link" :to="{ name: 'osboha.book', query: { page: page - 1 } }"
                        rel="prev" v-if="page != 1">
                        السابق
                    </router-link>
                    <li class="page-item page-link" :class="checkActive(page)">
                        <router-link class="page-item page-link" :to="{ name: 'osboha.book', query: { page: page } }">
                            {{ page }}
                        </router-link>
                    </li>

                    <router-link class="page-item page-link" :to="{ name: 'osboha.book', query: { page: page + 1 } }"
                        rel="next" v-if="hasNextPage">
                        التالي
                    </router-link>
                </ul>
            </div>
        </template>
    </main>
</template>
<script>
import BookCard from "@/components/book/BookCard.vue";
import userBookService from "@/API/services/user-books.service";
import { watchEffect } from "vue";
import helper from "@/utilities/helper";

export default {
    name: "Free Book",
    components: { BookCard },
    props: ["page"],
    created() {
        watchEffect(() => {

            this.getBooks(this.page);
        });
    },

    data() {
        return {
            books: [],
            totalBooks: 0,
            current: 1,
            booksPerPage: 9,
            search: "",
            empty: "",
            selectedSection: 0,
            lastSelectedSection: 0,
            loading: false,
            sections: [
                { section_id: 0, section: "الكل", active: true },
                { section_id: 1, section: "بسيط", level: "simple", active: false },
                {
                    section_id: 2,
                    section: "متوسط",
                    level: "intermediate",
                    active: false,
                },
                { section_id: 3, section: "عميق", level: "advanced", active: false },
                { section_id: 4, section: "عربي", lang: "arabic", active: false },
                { section_id: 5, section: "إنجليزي", lang: "english", active: false },
            ],
        };
    },
    methods: {
        //check which page is active
        checkActive(item) {
            let className = "";
            if (this.current == item) {
                className = "active";
            } else {
                className = className + " done";
            }
            return className;
        },

        //get all books
        async getBooks(page) {
            this.empty = "";
            this.loading = true;
            try {
                const response = await userBookService.getAllFree(this.$route.params.user_id);
                this.books = response.books;
                this.totalBooks = response.total;
                this.current = this.page;
            } catch (e) {
                helper.toggleToast("حدث خطأ ما, يرجى المحاولة مرة أخرى", "error");
            } finally {
                this.loading = false;
            }
        },
    },
    computed: {
        hasNextPage() {
            return this.page < this.totalPages;
        },
        totalPages() {
            return Math.ceil(this.totalBooks / this.booksPerPage);
        },
    },
};
</script>
  
<style scoped>
.pagination {
    display: flex;
    width: 290px;
    padding: 0;
}

.pagination a {
    flex: 1;
    text-decoration: none;
    color: #2c3e50;
}

#page-prev {
    text-align: left;
}

#page-next {
    text-align: right;
}
</style>
  