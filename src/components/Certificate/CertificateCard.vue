<template>
    <div class="d-grid gap-3 d-grid-template-1fr-19">
        <div class="card mb-0">
            <div class="top-bg-image">
                    <img :src="resolve_img_url('banner_1.jpg')" alt="profile-img" class="img-fluid w-100" />
            </div>
            <div class="card-body text-center">
                <div class="group-icon">
                    <img :src="resolve_img_url('gi-9.jpg')" alt="profile-img"
                        class="rounded-circle img-fluid avatar-120" />
                </div>
                <div class="group-info pt-3 pb-3">
                    <h4>
                        {{ certificateInfo.name }}
                    </h4>
                </div>
                <button @click="listBookAchievement()" type="submit" class="btn btn-primary d-block w-100">اصدار الشهادة</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BookCard',
    props: {
        certificateInfo: { type: Object },
    },
    data() {
        return [
        ]
    },
    methods: {
        resolve_img_url: function (path) {
            let images = require.context('../../assets/images', false, /\.png$|\.jpg$/)
            return images("./" + path)
        },
    }


}
</script>
