<template>
  <div class="d-flex align-items-center">
    <!--Users dropdown images that interacted with this post-->
    <div class="like-data">
      <div class="dropdown">
        <!-- <span
          class="dropdown-toggle text-primary"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          role="button"
        > -->
        <span
          class="text-primary"
          aria-haspopup="true"
          aria-expanded="false"
          role="button"
        >
          <font-awesome-icon :icon="['fas', 'thumbs-up']" size="lg" />
        </span>
        <!-- <div class="dropdown-menu py-2">
          <a
            class="ms-2 me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Like"
            ><img src="@/assets/images/icon/01.png" class="img-fluid" alt=""
          /></a>
          <a
            class="me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Love"
            ><img src="@/assets/images/icon/02.png" class="img-fluid" alt=""
          /></a>
          <a
            class="me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Happy"
            ><img src="@/assets/images/icon/03.png" class="img-fluid" alt=""
          /></a>
          <a
            class="me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="HaHa"
            ><img src="@/assets/images/icon/04.png" class="img-fluid" alt=""
          /></a>
          <a
            class="me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Think"
            ><img src="@/assets/images/icon/05.png" class="img-fluid" alt=""
          /></a>
          <a
            class="me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Sade"
            ><img src="@/assets/images/icon/06.png" class="img-fluid" alt=""
          /></a>
          <a
            class="me-2"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Lovely"
            ><img src="@/assets/images/icon/07.png" class="img-fluid" alt=""
          /></a>
        </div> -->
      </div>
    </div>

    <!--total likes block-->
    <div class="total-like-block ms-2 me-3">
      <div class="dropdown">
        <!-- <span
          class="dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          role="button"
        > -->

        <span aria-haspopup="true" aria-expanded="false" role="button">
          {{ post.reactions_count }}
        </span>
        <!-- <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Max Emum</a>
          <a class="dropdown-item" href="#">Bill Yerds</a>
          <a class="dropdown-item" href="#">Hap E. Birthday</a>
          <a class="dropdown-item" href="#">Tara Misu</a>
          <a class="dropdown-item" href="#">Midge Itz</a>
          <a class="dropdown-item" href="#">Sal Vidge</a>
          <a class="dropdown-item" href="#">Other</a> 
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TotalLikes",
  props: {
    post: { type: Object, required: true },
  },
  data() {
    return {
      reactions: [],
    };
  },
};
</script>

<style lang="scss" scoped></style>
