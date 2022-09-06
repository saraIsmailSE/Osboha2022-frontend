<template>
    <div class="group-member d-flex align-items-center  mt-md-0 mt-2">
        <div class="iq-media-group me-3">
            <router-link :to="'/'+member.profile" class="iq-media" v-for="member in members " :key="member.id">
                <img class="img-fluid avatar-40 rounded-circle" :src="resolve_img_url(member.image)" :title="member.name" >
            </router-link>
        </div>

        <!-- DISPLAY FOR ADVISOR -->
        <button type="submit" class="btn btn-primary mb-2" @click="addMember()"><i class="ri-add-line me-1"></i>ADD</button>
        <!-- DISPLAY FOR ADVISOR -->
    </div>
</template>
<script>
import router from '../../router'
export default {
    name: 'card',
    props: {
        members: { type: Object },
    },
    data() {
        return [
        ]
    },
    methods: {
        resolve_img_url: function (path) {
            let images = require.context('../../assets/images/', false, /\.png$|\.jpg$/)
            return images("./" + path)
        },
        addMember() {
            router.push({ name: "social.group-detail" })
        }

    }


}
</script>
