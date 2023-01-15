<template>
    <div>
        <ul class="post-comments list-inline p-0 m-0">
            <li class="mb-2" v-for="comment in comments" :key="comment.id">
                <div class="d-flex">
                    <div class="user-img">
                        <img :src="resolve_img_url(comment.author_image)" alt="post-image"
                            class=" rounded-circle img-fluid" />
                    </div>
                    <div class="comment-data-block ms-3">
                        <h6>{{ comment.author }}</h6>
                        <p class="mb-0">{{ comment.body }}</p>
                        <div class="d-flex flex-wrap align-items-center comment-activity">
                            <a href="javascript:void();">like</a>
                            <a href="javascript:void();">reply</a>
                            <span> {{ comment.created_at }} </span>
                        </div>
                    </div>
                </div>
            </li>

            <li class="mb-2" v-if="no_comments">
                <div class="text-center">
                    <h4> Be The First Commenter</h4>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Comment',
    components:{
        
    },
    props: {
        comments: { type: Object },
        no_comments: Boolean
    },
    data() {
        return {
            commentMessage: ''
        }
    },
    methods: {
        resolve_img_url: function (path) {
            let images = require.context('../../assets/images/avatar', false, /\.png$|\.jpg$/)
            return images("./" + path)
        }
    },
    mounted() {
        // console.log(this.comment)
    }

}
</script>
