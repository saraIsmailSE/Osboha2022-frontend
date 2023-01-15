<template>
    <div class="d-grid gap-3 d-grid-template-1fr-19">
        <div class="card mb-0">
            <div class="position-absolute top-0 end-0 p-2 rounded-start" style="background-color:#278036; opacity: 50%;">
                <h6 class="text-white">
                    كتاب منهجي
                </h6>
            </div>

            <div class="card-body text-center">
                <img :src="resolve_img_url(cardInfo.id)" class="img-fluid rounded w-75 mt-3" alt="blog-img" />

                <div class="group-info pt-3 pb-3">
                    <h4>
                        <router-link :to="{ name: 'social.book' }">{{ cardInfo.title }}</router-link>
                    </h4>
                    <p>{{ cardInfo.text }}</p>
                </div>
                <div class="group-details d-inline-block pb-3">
                    <ul class="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                        <li class="pe-3 ps-3" v-for="extraInfo in cardInfo.extraInfo" :key="extraInfo.info">
                            <p class="mb-0">{{ extraInfo.info }}</p>
                            <h6>{{ extraInfo.value }}</h6>
                        </li>
                    </ul>
                </div>
                <div class="row">
                    <div class="col-6">
                        <button type="submit" class="btn btn-primary d-block w-100" data-bs-toggle="modal"
                            data-bs-target="#modals">كتابة أطروحة</button>

                    </div>
                    <div class="col-6">
                        <button type="submit" class="btn btn-primary d-block w-100" @click="bookDetails()">عرض الأطروحات
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal id="modals" dialogClass="modal-fullscreen-sm-down" tabindex="-1" title="Create Post"
        aria-labelledby="modalsLabel" aria-hidden="true">
        <model-header>
          <h5 class="modal-title" id="modalsLabel">اسم الكتاب || أطروحة جديدة </h5>
          <a href="javascript:void(0);" class="lh-1" data-bs-dismiss="modal">
            <span class="material-symbols-outlined">close</span>
          </a>
        </model-header>
        <model-body>
            <createThesis />
        </model-body>
      </modal>
</template>
<script>
import router from '../../router'
import createThesis from '../../components/book/theses/create.vue'
export default {
    name: 'BookCard',
    components:{
        createThesis,
    },
    props: {
        cardInfo: { type: Object },
    },
    data() {
        return [
        ]
    },
    methods: {
        resolve_img_url: function (path) {
            let images = require.context('../../assets/images/books', false, /\.png$|\.jpg$/)
            return images("./" + path)
        },
        bookDetails() {
            router.push({ name: "social.book-details" })
        }

    }
}
</script>
