<template>
    <main>
        <div class="row">
            <div class="col-sm-12 d-flex justify-content-center">
                <div class="col-sm-12">
                    <iq-card class="iq-card">
                        <div class="iq-card-body p-3">
                            <div class="image-block text-center">
                                <img src="@/assets/images/main/reading_list.png" class="img-fluid rounded w-75 mt-3"
                                    alt="blog-img" />
                            </div>
                        </div>
                        <div class="mt-3 inputs mb-3 w-75 text-center m-auto">
                            <i class="material-symbols-outlined">
                                search
                            </i>
                            <input type="text" class="form-control" placeholder=" ... ابحث عن كتاب"
                                v-model.trim="searchModel" @keyup="debouncedSearch" />
                        </div>

                    </iq-card>
                </div>
            </div>
        </div>
        <div class="col-sm-12 text-center" v-if="loading && books.length <= 0">
            <img :src="require('@/assets/images/gif/page-load-loader.gif')" alt="loader" style="height: 100px" />
        </div>

        <template v-else>
            <div class="col-sm-12" v-if="!loading && books.length == 0">
                <h4 class="text-center mt-3 mb-3">لا يوجد كتب</h4>
                <router-link v-if="isAuth" class="btn btn-primary w-100" aria-current="page"
                    :to="{ name: 'osboha.book' }">
                    ابدأ القراءة
                </router-link>
            </div>

            <div class="d-grid gap-3 d-grid-template-1fr-19">
                <BookCard v-for="bookInfo in books" :key="bookInfo.id" :cardInfo="bookInfo" :isProfile="true" />
            </div>
            <div class="text-center mt-3" v-if="books && books.length > 0">
                <Pagination :page="currentPage" :total="totalBooks" :perPage="booksPerPage"
                    :routeName="`book.reading-list`" />

            </div>
        </template>
    </main>
</template>
<script>
import BookCard from "@/components/book/BookCard.vue";
import Pagination from "@/components/common/Pagination";
import userBookService from "@/API/services/user-books.service";
import { watchEffect } from "vue";
import { watch } from 'vue';
import helper from "@/utilities/helper";
import { useRouter, useRoute } from 'vue-router';

export default {
    name: "Free Book",
    components: { BookCard, Pagination },
    props: ["page"],
    setup() {
        const router = useRouter();
        const route = useRoute();

        const updatePage = (pageNumber) => {
            router.push({
                path: route.path,
                query: { ...route.query, page: pageNumber }
            }).catch(err => {
                if (err.name !== 'NavigationDuplicated') {
                    throw err;
                }
            });
        };

        return {
            updatePage,
        };
    },

    created() {
        // Debounce the searchGroup method
        this.debouncedSearch = this.debounce(this.getBooks, 300);
        this.currentPage = this.page;
        this.getBooks();
        watchEffect(() => {
            this.currentPage = this.page;
        });

        watch(
            () => this.currentPage,
            (newPage) => {
                this.getBooks();
            }
        );
    },

    data() {
        return {
            searchModel: "",
            books: [],
            totalBooks: 0,
            current: 1,
            currentPage: this.page,
            booksPerPage: 9,
            search: "",
            empty: "",
            loading: false,

        };
    },
    methods: {
        //get all books
        async getBooks() {
            this.empty = "";
            this.books = [];
            this.loading = true;

            if (this.searchModel == '' && this.books.length == 0) {
                this.currentPage = 1;
            }
            if (this.searchModel != '') {
                this.currentPage = 1;
                this.books = []
            }
            try {
                const response = await userBookService.getOsbohaUserBooks(this.currentPage, this.$route.params.user_id, this.searchModel);
                if (response) {
                    this.books = response.books;
                    this.totalBooks = response.total;

                }
                else {
                    this.totalBooks = 0;
                }

            } catch (e) {
                helper.toggleToast("حدث خطأ ما, يرجى المحاولة مرة أخرى", "error");
            } finally {
                this.loading = false;
            }
        },
        debounce(func, wait) {
            let timeout;
            return function (...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(this, args);
                }, wait);
            };
        },
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalBooks / this.booksPerPage);
        },
        user() {
            return this.$store.getters.getUser;
        },

        isAuth() {
            return (this.$route.params.user_id == this.user.id)
        }
    },
};
</script>
<style scoped>
.inputs {
    position: relative;
}

.form-control {
    text-indent: 15px;
    border: none;
    height: 45px;
    border-radius: 0px;
    border-bottom: 1px solid #eee;
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #eee;
    outline: 0;
    box-shadow: none;
    border-bottom: 1px solid blue;
}

.form-control:focus {
    color: blue;
}

.inputs i {
    position: absolute;
    top: 14px;
    left: 4px;
    color: #b8b9bc;
}
</style>