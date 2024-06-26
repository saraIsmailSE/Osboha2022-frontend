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
                            <h2 class="text-center mt-3 mb-3">قانون الكتاب الحر</h2>
                            <h4 class="text-center mt-3 mb-3" style="direction: rtl;">
                                تحرص أصبوحة 180 على رعاية نوعية الكتب وجودتها لكل قارئ. ولأجل ذلك نوفر منهج أصبوحة 180
                                الذي
                                يتم اختياره بعناية لك. ونوفر بجانبه الفرصة للقارئ المتمرس أن يقرأ كتبًا من خارج منهج
                                أصبوحة
                                180 بنظام (الكتاب الحر) وذلك ضمن الشروط التالية:
                                <br />
                                ١) 🟢يسمح لك بقراءة كتاب حر واحد، مقابل إنهاء قراءة كتابين من منهج أصبوحة 180.
                                <br />
                                .
                                <br />
                                ٢) 🟢يسمح لك بالقراءة على التوازي بين كتب منهج أصبوحة 180 والكتاب الحر الذي تختاره وذلك
                                بشكل
                                أسبوعي.
                                <br /><br />
                                🔸شرط ذلك أن تقوم "بداية" بتسليم قراءتك الأسبوعية ل (18) صفحة كحد أدنى وما يقابلها من
                                أطروحات من كتب المنهج، ليتيح ذلك أن تقرأ من (3) كتب حرة كحد أقصى ما شئت من عدد الصفحات.
                                <br />
                                ⚠️علمًا أن بإمكانك اختيار كتب حرة أخرى فقط فور انتهاءك من أحد الكتب ال(3) التي سبق لك
                                اختيارها. لذلك اختر كتبك بعناية وتأكد من أنك ترغب بقراءتها كيلا تخسر اختياراتك.
                            </h4>
                            <h2 class="text-center mt-3 mb-3" v-if="isAuth">{{ in_progress_books }}/3</h2>

                            <div class="row" v-if="can_add_books && isAuth">
                                <div class="col-12">
                                    <router-link :to="{ name: 'book.create' }"
                                        class="col-6 btn btn-primary d-block w-75 mx-auto mb-3">
                                        اضافة كتاب جديد
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </iq-card>
                </div>
            </div>
        </div>
        <div class="col-sm-12 text-center" v-if="loading && books.length <= 0">
            <img :src="require('@/assets/images/gif/page-load-loader.gif')" alt="loader" style="height: 100px" />
        </div>

        <template v-else>
            <div class="d-grid gap-3 d-grid-template-1fr-19">
                <BookCard v-for="bookInfo in books" :key="bookInfo.id" :cardInfo="bookInfo" :isProfile="true" />
            </div>
            <div class="text-center mt-3" v-if="books && books.length > 0">
                <Pagination :page="current" :total="totalBooks" :perPage="booksPerPage" :routeName="`book.free-book`" />

            </div>
        </template>
    </main>
</template>
<script>
import BookCard from "@/components/book/BookCard.vue";
import Pagination from "@/components/common/Pagination";
import userBookService from "@/API/services/user-books.service";
import { watchEffect } from "vue";
import helper from "@/utilities/helper";

export default {
    name: "Free Book",
    components: { BookCard, Pagination },
    props: ["page"],
    created() {
        this.fireAlert()
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
            loading: false,
            in_progress_books: 0,
            can_add_books: true,

        };
    },
    methods: {
        //get all books
        async getBooks(page) {
            this.empty = "";
            this.books = [];
            this.loading = true;
            try {
                const response = await userBookService.getAllFree(page, this.$route.params.user_id);
                this.books = response.books;
                this.totalBooks = response.total;
                this.can_add_books = response.can_add_books;
                this.in_progress_books = response.in_progress_books
                this.current = this.page;

            } catch (e) {
                helper.toggleToast("حدث خطأ ما, يرجى المحاولة مرة أخرى", "error");
            } finally {
                this.loading = false;
            }
        },
        fireAlert() {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: "btn btn-outline-primary btn-lg ms-2 text-white",
                },
                buttonsStyling: false,
            });

            swalWithBootstrapButtons
                .fire({
                    title: "🔥 تنبيه",
                    text: `انتهت هدية المشروع لكم بمنح (٤) اشهر من السماح بقراءة الكتاب الحر بلا شروط. نبدأ منذ اليوم العودة لقوانين الكتاب الحر.`,
                    imageUrl: require('@/assets/images/main/current_book.png'),
                    imageAlt: 'A tall image',
                    showConfirmButton: true,
                    confirmButtonText: "حسنــا ",
                    showClass: {
                        popup: "animate__animated animate__zoomIn",
                    },
                    hideClass: {
                        popup: "animate__animated animate__zoomOut",
                    },
                })
        }
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