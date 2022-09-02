<template>
    <div class="col-lg-12">
        <div class="card card-block card-stretch card-height blog">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="user-image mb-3">
                        <img class="avatar-80 rounded" src="@/assets/images/user/01.jpg" alt="#" data-original-title=""
                            title="">
                    </div>
                    <div class="ms-3">
                        <h5>Kaya Scodelario</h5>
                        <p>سفير</p>
                    </div>
                </div>
                <div class="blog-description">
                    <h6>
                    الصفحات المنجزة: {{thesis.pages}}
                    <rate :rate="thesis.rate" />
                    </h6>
                    <p>{{thesis.body}}</p>
                    <Comment v-if="thesis.comments" :no_comments="false" :comments="thesis.comments" />
                    <CreateComment />

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import rate from '../rate/rate.vue'
import Comment from '../../post/Comment.vue'
import CreateComment from '../../post/CreateComment.vue'

export default {
    name: 'ListTesis',
    components: {
        rate,
        Comment,
        CreateComment,
    },
    props: {
        thesis: { type: Object }
    },
    data() {
        return {
         rate:5
      }

    },
}
</script>
