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
        <form class="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
            <input type="text" class="form-control rounded" placeholder="Enter Your Comment">
            <div class="comment-attagement d-flex">
                <a href="javascript:void(0);" class="material-symbols-outlined  me-3">
                    photo_camera
                </a>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: 'Comment',
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
            let images = require.context('../../assets/images/', false, /\.png$|\.jpg$/)
            return images("./" + path)
        }
    },
    mounted() {
        // console.log(this.comment)
    }

}
</script>
