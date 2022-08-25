<template>
    <div class="col-sm-12">
        <div class="card card-block card-stretch card-height">
            <div class="card-body">
                <div class="user-post-data">
                    <div class="d-flex justify-content-between">
                        <div class="w-100">
                            <div class="d-flex justify-content-between">
                                <div class="">
                                    <h5 class="mb-0 d-inline-block"> STUFF NO. 1</h5>
                                    <p class="mb-0 text-primary">التقييم || {{ stuff.mark }}</p>
                                </div>
                                <div class="card-post-toolbar">
                                    <div class="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown"
                                        aria-expanded="false" role="button" @mouseover="show = true" @mouseleave="show = false">
                                        <span class="material-symbols-outlined">
                                            more_horiz
                                        </span>
                                    </div>
                                    <div :class="`dropdown-menu dropdown-menu-right ${show ? 'show' : ''}`"
                                        aria-labelledby="dropdownMenuButton" style="">
                                        <a class="dropdown-item d-flex align-items-center" href="#"><span
                                                class="material-symbols-outlined me-2 md-18">
                                                edit
                                            </span>Edit</a>
                                        <a class="dropdown-item d-flex align-items-center" href="#"><span
                                                class="material-symbols-outlined me-2 md-18">
                                                delete
                                            </span>Delete</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <p>
                        {{ stuff.stuff }}
                    </p>
                </div>
                <div class="user-post" v-if="stuff.images">
                    <div class=" d-grid grid-rows-2 grid-flow-col gap-3">
                        <div class="row-span-2 row-span-md-1" v-for="image in stuff.images" :key="image.id">
                            <img :src="resolve_img_url(image)" alt="post-image" class="img-fluid rounded w-100" />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'book-detail',
    props: [
        'stuff'
    ],
    data() {
        return {
            show: false
        }
    },
    methods: {
        resolve_img_url: function (path) {
            let images = require.context('../../assets/images', false, /\.png$|\.jpg$/)
            return images("./" + path)
        }
    },
}
</script>

<style>
.dropdown-item {
    color: #212529 !important;
}
.dropdown-menu .dropdown-item:focus,
.dropdown-menu .dropdown-item:hover {
    background: transparent;
    color: var(--iq-primary) !important;
}
</style>