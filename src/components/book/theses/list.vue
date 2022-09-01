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
                    </h6>
                    <p>{{thesis.body}}</p>
                    <rate :rate="thesis.rate" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import rate from '../rate/rate.vue'

export default {
    name: 'ListTesis',
    components: {
        rate,
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
