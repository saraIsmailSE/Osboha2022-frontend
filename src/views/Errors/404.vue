<template>
    <div class="container-fluid p-0">
        <div class="row no-gutters">
            <div class="col-sm-12 text-center">
                <div class="iq-error position-relative mt-5">
                    <img :src="image404" class="img-fluid iq-error-img" alt="404">
                    <h2 class="mb-0">Oops! This Page is Not Found.</h2>
                    <p>The requested page dose not exist.</p>
                    <a href="javascript:void(0);" @click="$router.go(-1)" class="btn btn-primary mt-3"><i class="ri-home-4-line"></i>Back
                        </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Error404',
    data() {
        return {
            image404: require('../../assets/images/error/400.png')
        }
    }
}
</script>
  