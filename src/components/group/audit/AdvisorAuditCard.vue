<template>
    <div class="d-grid gap-3 d-grid-template-1fr-19">
        <div class="card mb-0">
            <div class="card-body text-center">
                <div class="">
                    <img :src="resolve_img_url(cardInfo.groupImg)" alt="profile-img"
                        class="rounded-circle img-fluid avatar-120" />

                </div>
                <div class="group-info pt-3 pb-3">
                    <h4>
                        <!-- <router-link :to="{ name: 'osboha.group-detail' }">{{ cardInfo.title }}</router-link> -->
                        {{ cardInfo.title }}
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
                    <div class="col-12">
                        <button class="btn btn-primary d-block w-100">
                            عرض تدقيق المراقب
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Advisor Audit Card',
    props: {
        cardInfo: { type: Object },
    },
    data() {
        return [
        ]
    },
    methods: {
        resolve_img_url: function (path) {
            let images = require.context('@/assets/images/', false, /\.png$|\.jpg$/)
            return images("./" + path)
        },
        // groupDetails() {
        //     router.push({ name: "osboha.group-detail" })
        // }

    }
}
</script>
