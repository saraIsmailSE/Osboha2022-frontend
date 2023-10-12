<template>
    <div class="d-grid gap-3 d-grid-template-1fr-19">
        <div class="card mb-0">
            <div class="position-absolute top-0 end-0 p-2 rounded-start" style="background-color: #278036; opacity: 50%">
                <h6 class="text-white m-auto">{{ bookTypeLanguage }}</h6>
            </div>
            <div class="position-absolute start-0 mt-2">
                <span class="material-symbols-outlined me-2 align-middle"
                    :class="[isSaved ? 'later-book-on' : 'later-book-off']" role="button" @click.prevent="markBookForLater"
                    v-if="!isProfile">
                    favorite
                </span>
                <span role="button" @click="download(cardInfo.link)"
                    class="material-symbols-outlined download-book align-middle me-3">
                    download
                </span>
            </div>

            <div class="card-body text-center">
                <img :src="resolve_img_url(cardInfo.media?.path ?? '')" class="img-fluid rounded w-75 mt-4"
                    alt="blog-img" />

                <div class="group-info pt-3 pb-3">
                    <h4>
                        <router-link :to="{
                            name: 'book.book-details',
                            params: { book_id: this.cardInfo.id },
                        }" data-toggle="tooltip" data-placement="top" :title="cardInfo.name" class="truncated"
                            :class="directionClass">{{ cardInfo.name }}</router-link>
                    </h4>
                    <p class="truncated" :class="directionClass">
                        {{ cardInfo.writer }}
                    </p>
                </div>
                <div class="group-details d-inline-block pb-3">
                    <ul class="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                        <li class="pe-3 ps-3">
                            <p class="mb-0">المستوى</p>
                            <h6>{{ cardInfo.level.arabic_level }}</h6>
                        </li>
                        <li class="pe-3 ps-3">
                            <p class="mb-0">الفئة</p>
                            <h6>{{ cardInfo.section?.section }}</h6>
                        </li>
                        <li class="pe-3 ps-3">
                            <p class="mb-0">الصفحات</p>
                            <h6>{{ cardInfo.end_page }}</h6>
                        </li>
                    </ul>
                </div>
                <div class="row" v-if="isProfile">
                    <div class="row d-flex justify-content-center" v-if="isAmbassador">
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary d-block w-100" @click="thesesDetails()">
                                عرض
                                <span v-if="myProfile"> أطروحاتي </span>
                                <span v-else> أطروحات السفير </span>
                            </button>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center" v-else>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary d-block w-100" @click="bookDetails()">
                                صفحة الكتاب
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col-6">
                        <button type="submit" class="btn btn-primary d-block w-100" data-bs-toggle="modal"
                            :data-bs-target="`#modal-${cardInfo.id}`" :disabled="!cardInfo.allow_comments">
                            كتابة أطروحة
                        </button>
                    </div>
                    <div class="col-6">
                        <button type="submit" class="btn btn-primary d-block w-100" @click="bookDetails()">
                            عرض الأطروحات
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal class="modal fade" :id="`modal-${cardInfo.id}`" dialogClass="modal-fullscreen-sm-down" tabindex="-1"
        title="Create Thesis" :aria-labelledby="`modalsLabel-${cardInfo.id}`" :aria-hidden="true">
        <model-header>
            <h5 class="modal-title" :id="`modalsLabel-${cardInfo.id}`">
                {{ cardInfo.name }} || أطروحة جديدة
            </h5>
            <a href="javascript:void(0);" class="lh-1" data-bs-dismiss="modal" ref="closeBtn">
                <span class="material-symbols-outlined">close</span>
            </a>
        </model-header>
        <model-body>
            <createThesis :book="cardInfo" :lastThesis="cardInfo.last_thesis" @closeModel="closeModel"
                @addThesis="addThesis" />
        </model-body>
    </modal>
</template>
<script>
import createThesis from "@/components/book/theses/create.vue";
import userBooksService from "@/API/services/user-books.service";
import helper from "@/utilities/helper";

export default {
    name: "BookCard",
    components: {
        createThesis,
    },
    props: {
        cardInfo: { type: Object },
        isProfile: { type: Boolean, default: false },
        isAmbassador: { type: Boolean, default: true },
    },
    created() {
        window.addEventListener("popstate", this.popstateEventAction);
    },
    emits: ["updateUserBook"],
    methods: {
        popstateEventAction() {
            const body = document.querySelector("body");
            body.removeAttribute("data-bs-overflow");
            body.removeAttribute("data-bs-padding-right");
            body.removeAttribute("style");
            body.classList.remove("modal-open");
            const element = document.getElementsByClassName("modal-backdrop");
            for (let i = 0; i < element.length; i++) {
                element[i].remove();
            }
            this.removePopstateEventAction();
        },
        removePopstateEventAction() {
            window.removeEventListener("popstate", this.popstateEventAction);
        },

        resolve_img_url: function (path) {
            return path ? path : require("@/assets/images/main/200x200-book.png");
        },
        bookDetails() {
            this.$router.push({
                name: "book.book-details",
                params: { book_id: this.cardInfo.id },
            });
        },
        thesesDetails() {
            this.$router.push({
                name: "book.user-theses",
                params: {
                    book_id: this.cardInfo.id,
                    user_id: this.$route.params.user_id,
                },
            });
        },
        closeModel() {
            this.$refs.closeBtn.click();
        },
        addThesis(thesis) {
            setTimeout(() => {
                // this.$router.go(0);
                this.closeModel();
                this.bookDetails();
            }, 1800);
        },
        async markBookForLater() {
            try {
                const response = await userBooksService.saveBookForLater(
                    this.cardInfo.id
                );
                helper.handleSuccessSwal(response.message, 1800);

                this.$emit(
                    "updateUserBook",
                    this.cardInfo.id,
                    response.data
                        ? {
                            id: response.data.id,
                            status: response.data.status,
                            counter: response.data.counter,
                        }
                        : null
                );
            } catch (error) {
                console.log("[save book error]", error);
                helper.toggleToast(
                    "حدث خطأ ما أثناء حفظ الكتاب, يرجى المحاولة مرة أخرى",
                    "error"
                );
            }
        },
        download(link) {
            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: "btn btn-primary btn-lg",
                    cancelButton: "btn btn-outline-primary btn-lg ms-2",
                },
                buttonsStyling: false,
            });
            swalWithBootstrapButtons
                .fire({
                    title: "ملاحظة هامة",
                    text: "في مشروعنا لن لا نقوم أبدًا بتصوير الكتب المطبوعة ولا نقوم بنسب هذه الكتب للمشروع أو محاولة إخفاء أسماء دور النشر وحقوقها . إنما كل ما نقوم به هو عملية البحث عن هذه الكتب في مواقع الانترنت و إحضار روابط الحصول عليها للاستفادة منها . علمًا أننا لا نقوم بعملية بيع للكتب أو الاستفادة المادية منها مطلقًا ولكننا نؤمن أن من حق دور النشر إيجاد وسائل لمنع تصوير كتبها ووضعها على مواقع الانترنت ولكن أن يتواجد الكتاب على الانترنت مجانًا سواء عن طريق موقع لديه أذن بالنشر ، أو عن طريق كاتب الكتاب أو غيرهم ، ثم لا نقوم بقراءة هذه الكتب ونمنع أنفسنا من العلم فهذا الأمر لن يساهم في عملية ايقاف الكتب الالكترونية إنما سوف يساهم فقط بمنع أنفسنا عن علم مطروح وتقييد أنفسنا بظروف تدفعنا للجهل والتوقف عن التعلم . علمًا أن المشروع يتعهد دومًا بحذف أي كتاب من المنهج إذا لم يناسب وجوده كاتب الكتب أو دار النشر الخاصة بالكتاب ، فبإمكان كل شخص إما قراءة الكتاب مطبوعًا أو الاستفادة من النسخ التي نجمعها من مواقع الكتب المنتشرة مع إخلاء مسؤوليتنا حول إن كانت هذه المواقع لديها أذن بالنشر والتوزيع من عدمه فنترك هذا الأمر لدور النشر . هذا ونسأل الله أن يصلح نوايانا ويجعلها خالصة لوجهه الكريم وتطبيقًا لأمره لنا بالقراءة لأجل التعلم والتفكر . والله أعلم .",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "تحميل",
                    cancelButtonText: "إلغاء",
                    showClass: {
                        popup: "animate__animated animate__zoomIn",
                    },
                    hideClass: {
                        popup: "animate__animated animate__zoomOut",
                    },
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.open(link, "_blank");
                    }
                });
        },
    },
    computed: {
        bookTypeLanguage() {
            //get type
            let result = "كتاب ";
            const bookType = this.cardInfo.type.type.toLowerCase();

            if (bookType == "normal") {
                result += "منهجي";
            } else if (bookType == "ramadan" || bookType == "tafseer") {
                result += "رمضاني";
            } else if (bookType == "kids") {
                result += "أطفال";
            } else if (bookType == "young") {
                result += "يافعين";
            }

            result += " - ";
            //get language
            const language = this.cardInfo.language.language.toLowerCase();
            if (language == "arabic") {
                result += "عربي";
            } else if (language == "english") {
                result += "إنجليزي";
            }
            return result;
        },
        isSaved() {
            return this.cardInfo.userBooks
                ? this.cardInfo.userBooks[0]?.status === "later"
                : false;
        },
        myProfile() {
            return (
                this.isProfile &&
                this.isAmbassador &&
                parseInt(this.$store.getters.getUser.id) ===
                parseInt(this.$route.params.user_id)
            );
        },
        directionClass() {
            return this.cardInfo.language.language.toLowerCase() == "arabic"
                ? "right-direction"
                : "left-direction";
        },
    },
};
</script>
<style scoped>
.truncated {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
}

.right-direction {
    direction: rtl;
}

.left-direction {
    direction: ltr;
}

.download-book {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
}

.later-book-on {
    color: darkred;
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}

.later-book-off {
    font-variation-settings:
        'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}
</style>