<template>
  <div class="col-sm-12">
    <div class="card card-block card-stretch card-height">
      <div class="card-body">
        <div class="user-post-data">
          <div class="d-flex justify-content-between">
            <div class="me-3">
              <img
                class="rounded-circle img-fluid"
                :src="resolve_img_url(post.author_image)"
                alt=""
              />
            </div>
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <div class="">
                  <h5 class="mb-0 d-inline-block">{{ post.author }}</h5>
                  <p class="mb-0 text-primary">{{ post.created_at }}</p>
                </div>
                <div class="card-post-toolbar">
                  <div
                    class="dropdown-toggle"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    role="button"
                    @click="show = !show"
                  >
                    <span class="material-symbols-outlined"> more_horiz </span>
                  </div>
                  <div
                    :class="`dropdown-menu dropdown-menu-right ${
                      show ? 'show' : ''
                    }`"
                    aria-labelledby="dropdownMenuButton"
                    style=""
                  >
                    <a class="dropdown-item d-flex align-items-center" href="#"
                      ><span class="material-symbols-outlined me-2 md-18">
                        visibility </span
                      >View</a
                    >
                    <a class="dropdown-item d-flex align-items-center" href="#"
                      ><span class="material-symbols-outlined me-2 md-18">
                        delete </span
                      >Delete</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <p>{{ post.body }}</p>
        </div>
        <div class="user-post" v-if="post.images">
          <div class="d-grid grid-rows-2 grid-flow-col gap-3">
            <div
              class="row-span-2 row-span-md-1"
              v-for="image in post.images"
              :key="image.id"
            >
              <img
                :src="resolve_img_url(image)"
                alt="post-image"
                class="img-fluid rounded w-100"
              />
            </div>
          </div>
        </div>

        <div class="comment-area mt-3">
          <div
            class="d-flex justify-content-between align-items-center flex-wrap"
          >
            <div class="like-block position-relative d-flex align-items-center">
              <div class="d-flex align-items-center">
                <div class="like-data">
                  <div class="dropdown">
                    <span
                      class="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      role="button"
                    >
                      <img
                        src="../../assets/images/icon/01.png"
                        class="img-fluid"
                        alt=""
                      />
                    </span>
                    <div class="dropdown-menu py-2">
                      <a
                        class="ms-2 me-2"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Like"
                        ><img
                          src="../../assets/images/icon/01.png"
                          class="img-fluid"
                          alt=""
                      /></a>
                      <a
                        class="me-2"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Love"
                        ><img
                          src="../../assets/images/icon/02.png"
                          class="img-fluid"
                          alt=""
                      /></a>
                      <a
                        class="me-2"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Happy"
                        ><img
                          src="../../assets/images/icon/03.png"
                          class="img-fluid"
                          alt=""
                      /></a>
                      <a
                        class="me-2"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="HaHa"
                        ><img
                          src="../../assets/images/icon/04.png"
                          class="img-fluid"
                          alt=""
                      /></a>
                      <a
                        class="me-2"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Think"
                        ><img
                          src="../../assets/images/icon/05.png"
                          class="img-fluid"
                          alt=""
                      /></a>
                      <a
                        class="me-2"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Sade"
                        ><img
                          src="../../assets/images/icon/06.png"
                          class="img-fluid"
                          alt=""
                      /></a>
                      <a
                        class="me-2"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Lovely"
                        ><img
                          src="../../assets/images/icon/07.png"
                          class="img-fluid"
                          alt=""
                      /></a>
                    </div>
                  </div>
                </div>
                <div class="total-like-block ms-2 me-3">
                  <div class="dropdown">
                    <span
                      class="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      role="button"
                    >
                      140 Likes
                    </span>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Max Emum</a>
                      <a class="dropdown-item" href="#">Bill Yerds</a>
                      <a class="dropdown-item" href="#">Hap E. Birthday</a>
                      <a class="dropdown-item" href="#">Tara Misu</a>
                      <a class="dropdown-item" href="#">Midge Itz</a>
                      <a class="dropdown-item" href="#">Sal Vidge</a>
                      <a class="dropdown-item" href="#">Other</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="total-comment-block">
                <div class="dropdown">
                  <span
                    class="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    role="button"
                  >
                    20 Comment
                  </span>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Max Emum</a>
                    <a class="dropdown-item" href="#">Bill Yerds</a>
                    <a class="dropdown-item" href="#">Hap E. Birthday</a>
                    <a class="dropdown-item" href="#">Tara Misu</a>
                    <a class="dropdown-item" href="#">Midge Itz</a>
                    <a class="dropdown-item" href="#">Sal Vidge</a>
                    <a class="dropdown-item" href="#">Other</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <Comment
            v-for="comment in post.comments"
            :comment="comment"
            :key="comment.id"
          />

          <!-- <Comment v-else :no_comments="true" /> -->
          <CreateComment />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import CreateComment from "../post/CreateComment.vue";
export default {
  name: "Post",
  components: {
    Comment,
    CreateComment,
  },
  props: {
    post: { type: Object },
  },
  data() {
    return {
      commentMessage: "",
      show: false,
    };
  },
  methods: {
    resolve_img_url: function (path) {
      let images = require.context(
        "../../assets/images/",
        false,
        /\.png$|\.jpg$/
      );
      return images("./" + path);
    },
  },
  mounted() {
    console.log(this.post);
  },
};

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
