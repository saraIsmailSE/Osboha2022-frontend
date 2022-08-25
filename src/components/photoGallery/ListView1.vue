<template>
  <div class="row">
    <div class="col-md-6 col-lg-4 mb-3" v-for="(image,index) in images" :key="index">
      <div class="user-images position-relative overflow-hidden">
        <a data-fslightbox="gallery" :href="image.img">
          <img :src="image.img" class="img-fluid rounded" alt="Responsive image">
        </a>
        <div class="image-hover-data">
          <div class="product-elements-icon">
            <ul class="d-flex align-images-center m-0 p-0 list-inline">
              <li v-for="(info,index1) in image.otherInfo" :key="index1">
                <a href="#" class="pe-3 text-white d-flex align-images-center"> {{info.value}} <i class="material-symbols-outlined md-14 ms-1">
                     {{info.class}}
                </i> </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListView1',
  mounted () {
  },
  props:{
    images: { type: Object },
  },      

  data () {
    return {

    }
  }
}
</script>
