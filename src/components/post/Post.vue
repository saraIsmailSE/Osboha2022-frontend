<template>
  <div class="col-sm-12">
    <div class="card card-block card-stretch card-height">
      <div class="card-body">
        <div class="user-post-data">
          <div class="d-flex justify-content-between">
            <div class="user-image me-3">
              <img
                class="avatar-50 rounded-circle"
                :src="
                  post.user.profile.profile_picture ??
                  require('@/assets/images/avatar/avatar-01.jpg')
                "
                alt=""
              />
            </div>
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <div class="">
                  <h5 class="mb-0 d-inline-block">{{ post.user.name }}</h5>
                  <p
                    class="mb-0 text-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottomleft"
                    :title="formatFullDate(post.created_at)"
                  >
                    {{ formatDateToWritten(post.created_at) }}
                  </p>
                </div>
                <div class="card-post-toolbar" v-if="byAuth">
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
                    <a
                      class="dropdown-item d-flex align-items-center text-primary"
                      href="#"
                      ><span class="material-symbols-outlined me-2 md-18">
                        edit </span
                      >تعديل</a
                    >
                    <a class="dropdown-item d-flex align-items-center" href="#"
                      ><span class="material-symbols-outlined me-2 md-18">
                        delete </span
                      >حذف</a
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
        <div class="user-post" v-if="slicedMedia">
          <div class="row g-2">
            <div
              class="position-relative"
              :class="col"
              v-for="(image, index) in slicedMedia"
              :key="image.path"
            >
              <img
                :src="image.path"
                alt="post-image"
                class="rounded w-100 h-100 post-image"
                style="object-fit: cover"
              />

              <!--overlay over last image-->
              <div
                class="overlay"
                v-if="
                  post.media?.length > slicedMedia.length &&
                  index === slicedMedia.length - 1
                "
                role="button"
                data-bs-toggle="modal"
                :data-bs-target="`#galleryModal-${post.id}`"
              >
                <span class="material-symbols-outlined"> add </span>
                <span> {{ post.media?.length - slicedMedia.length }} </span>
                <span class="ms-1"> المزيد</span>
              </div>
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
                <div
                  :class="{
                    dropdown: post.comments_count > 0,
                  }"
                >
                  <span
                    class="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    role="button"
                    @mouseover="getCommentsUsers"
                    @click.prevent="showCommentModel"
                  >
                    {{ commentsCount }}
                  </span>
                  <div class="dropdown-menu">
                    <div
                      class="dropdown-item text-center"
                      v-if="commentsUsersLoading"
                    >
                      <img
                        :src="
                          require('@/assets/images/page-img/page-load-loader.gif')
                        "
                        alt="loader"
                        style="height: 50px"
                      />
                    </div>
                    <router-link
                      v-for="user in commentsUsers"
                      :key="user.id"
                      class="dropdown-item"
                      :to="{
                        name: 'user.profile',
                        params: {
                          user_id: user.id,
                        },
                      }"
                      >{{ user.name }}</router-link
                    >
                    <p
                      class="dropdown-item p-0 m-0 ms-2 mb-2"
                      v-if="moreCommentsUsersText"
                    >
                      {{ moreCommentsUsersText }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <!--Action buttons-->
          <div class="d-flex justify-content-between align-items-center">
            <button
              type="button"
              class="btn flex-grow-1"
              :class="isLiked ? 'text-primary' : 'text-gray-600'"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="إعجاب"
              @click.prevent="isLiked = !isLiked"
            >
              <span class="me-1 bold-600"> إعجاب </span>
              <font-awesome-icon
                :icon="[`${isLiked ? 'fas' : 'far'}`, 'thumbs-up']"
                size="xl"
              />
            </button>
            <button
              type="button"
              class="btn flex-grow-1 text-gray-600"
              title="تعليق"
              @click.prevent="showCommentModel"
            >
              <span class="me-1 bold-600"> تعليق </span>
              <font-awesome-icon :icon="['far', 'comment']" size="xl" />
            </button>
            <button
              type="button"
              class="btn flex-grow-1 text-gray-600"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="مشاركة"
            >
              <span class="me-1 bold-600"> مشاركة </span>
              <font-awesome-icon :icon="['fas', 'share']" size="xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <modal
    ref="galleryModalRef"
    :id="`galleryModal-${post.id}`"
    title="Gallery"
    dialogClass="modal-lg modal-dialog-centered modal-dialog-scrollable"
    tabindex="-1"
    :aria-labelledby="`galleryModalLabel-${post.id}`"
    :aria-hidden="true"
  >
    <model-header>
      <h4>Gallery {{ post.id }}</h4>
      <a
        href="javascript:void(0);"
        class="lh-1"
        data-bs-dismiss="modal"
        ref="galleryModalCloseBtn"
      >
        <span class="material-symbols-outlined">close</span>
      </a>
    </model-header>
    <model-body>
      <!-- <div v-for="image in post.media" :key="image.id">
        <img
          :src="image.path"
          alt="post-image"
          class="rounded w-100 h-100 post-image"
          style="object-fit: cover"
        />
      </div> -->
    </model-body>
  </modal>

  <modal
    ref="commentModalRef"
    :id="`commentModal-${post.id}`"
    tabindex="-1"
    :aria-labelledby="`commentModalLabel-${post.id}`"
    :aria-hidden="true"
    dialogClass="modal-lg modal-dialog-centered modal-dialog-scrollable"
  >
    <model-header>
      <h4>التعليقات</h4>
      <a
        href="javascript:void(0);"
        class="lh-1"
        data-bs-dismiss="modal"
        ref="commentModalCloseBtn"
      >
        <span class="material-symbols-outlined">close</span>
      </a>
    </model-header>

    <model-body>
      <div class="row">
        <!--if no comments found-->
        <div class="cols" v-if="commentEmptyMessage && !comments.length">
          <div class="text-center text-primary m-auto">
            <font-awesome-icon :icon="['fas', 'pen']" size="sm" />
            <span class="ms-1">{{ commentEmptyMessage }}</span>
          </div>
        </div>

        <!--If error occured during fetching the comments-->
        <div class="cols" v-if="errorMessage">
          <div class="text-center m-auto" style="color: red">
            <font-awesome-icon
              :icon="['fas', 'circle-exclamation']"
              size="sm"
            />
            <span class="ms-1">{{ errorMessage }}</span>
          </div>
        </div>

        <div>
          <div class="cols" v-for="comment in comments" :key="comment.id">
            <div class="card card-block card-stretch card-height blog">
              <div class="card-body">
                <Comment :comment="comment" @addComment="addComment" />
              </div>
            </div>
          </div>
        </div>
        <div class="cols text-center" v-if="commentsLoading">
          <img
            :src="require('@/assets/images/page-img/page-load-loader.gif')"
            alt="loader"
            style="height: 100px"
          />
        </div>

        <button
          v-if="
            hasMoreComments &&
            !commentsLoading &&
            commentsTotalPages > commentsPage
          "
          class="w-100 p-2 bold-600 text-primary border-0 bg-transparent my-2"
          @click.prevent="loadComments"
        >
          تحميل المزيد من التعليقات
        </button>
      </div>
    </model-body>
    <model-footer>
      <CreateComment
        type="comment"
        class="flex-grow-1"
        :post_id="post.id"
        @addComment="addComment"
      />
    </model-footer>
  </modal>
</template>

<script>
import Comment from "./Comment.vue";
import CreateComment from "../post/CreateComment.vue";
import helper from "@/utilities/helper";
import { Modal } from "bootstrap";
import commentService from "@/API/services/comment.service";
import UserInfo from "@/Services/userInfoService";

export default {
  name: "Post",
  components: {
    Comment,
    CreateComment,
  },
  props: {
    post: { type: Object },
    byAuth: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["incrementCommentsCount"],
  data() {
    return {
      userRole: "",
      commentEmptyMessage: "",
      commentModal: null,
      show: false,
      isLiked: false,
      commentsLoading: false,
      comments: [],
      commentsPage: 1,
      commentsTotalPages: 1,
      errorMessage: "",
      commentsUsers: [],
      totalCommentsUsers: 0,
      commentsUsersLoading: false,
    };
  },
  computed: {
    /**
     * @description returns the comments count with the correct plural form
     * @returns {string}
     */
    commentsCount() {
      return this.post.comments_count == 0
        ? "لا يوجد تعليقات"
        : this.post.comments_count +
            " " +
            (this.post.comments_count <= 10 ? "تعليقات" : "تعليق");
    },
    /**
     * @description returns the sliced media array to show only 4 images
     * @returns {Array}
     */
    slicedMedia() {
      return this.post.media ? this.post.media.slice(0, 4) : [];
    },
    /**
     * @description checks if the post has more comments to load
     * @returns {boolean}
     */
    hasMoreComments() {
      return this.commentsPage <= this.commentsTotalPages;
    },
    /**
     * @description returns the rest comments users count text
     * @returns {string}
     */
    moreCommentsUsersText() {
      const remainder = this.totalCommentsUsers - this.commentsUsers.length;
      const moreText = remainder === 1 ? "آخر" : "آخرين";
      return remainder > 0 ? `و +${remainder} ${moreText}` : "";
    },
    col() {
      return this.post.media.length > 1 ? "col-6" : "col-12";
    },
  },
  mounted() {
    this.commentModal = new Modal(this.$refs.commentModalRef.$el);
  },
  methods: {
    /**
     * helper functions to use in the template
     */
    ...helper,
    resolve_img_url: function (path) {
      let images = require.context(
        "../../assets/images/",
        false,
        /\.png$|\.jpg$/
      );
      return images("./" + path);
    },
    /**
     * @description: show the comment modal
     * reset the commentsPage to 1
     * reset the commentsTotalPages to 1
     * reset the comments array
     * reset the commentEmptyMessage to empty string
     * reset the errorMessage to empty string
     * show the comment modal
     * load the comments
     * @returns {void}
     */
    showCommentModel() {
      this.commentsPage = 1;
      this.commentsTotalPages = 1;
      this.comments = [];
      this.commentEmptyMessage = "";
      this.errorMessage = "";
      this.commentModal.show();
      this.loadComments();
    },
    /**
     * @description: Load the comments of the post
     * 1- check if the comments are already loading
     * 2- set the commentsLoading to true
     * 3- try to get the comments
     * 4- if the comments are found
     * 4.1- add the comments to the comments array
     * 4.2- set the commentsTotalPages to the last_page
     * 4.3- increment the commentsPage
     * 5- if the comments are not found
     * 5.1- set the commentEmptyMessage to "قم بكتابة تعليقك الأول"
     * 6- if there is an error
     * 6.1- set the errorMessage to "حدث خطأ ما، حاول مرة أخرى"
     * 7- set the commentsLoading to false
     * @returns {void}
     */
    async loadComments() {
      if (this.commentsLoading) {
        return;
      }
      this.commentsLoading = true;
      try {
        const response = await commentService.getPostComments(
          this.post.id,
          this.commentsPage
        );

        if (response.data.comments) {
          this.comments = [...this.comments, ...response.data.comments];
          this.commentsTotalPages = response.data.last_page;
          this.commentsPage++;
        } else {
          this.commentEmptyMessage = "قم بكتابة تعليقك الأول";
        }
      } catch (error) {
        console.log(error);
        this.errorMessage = "حدث خطأ ما، حاول مرة أخرى";
      }
      this.commentsLoading = false;
    },
    /**
     * @description: find the comment by the comment_id among the comments and replies recursively
     * @param comments: array of comments
     * @param comment_id: the id of the comment
     * @returns {Object} the comment if found, otherwise return null
     */
    findComment(comments, comment_id) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === comment_id) {
          return comments[i];
        } else if (comments[i].replies.length > 0) {
          const comment = this.findComment(comments[i].replies, comment_id);
          if (comment) {
            return comment;
          }
        }
      }
    },
    /**
     * @description: add the comment to the comments array
     * if the comment_id is not provided, add the comment to the comments array
     * otherwise, add the comment to the replies array of the comment
     * emit the incrementCommentsCount event to increment the comments count of the post
     * scroll to the bottom of the modal body
     * @param comment: the comment object
     * @param comment_id: the id of the comment
     */
    addComment(comment, comment_id) {
      if (!comment_id) {
        this.comments.push(comment);
      } else {
        const comment = this.findComment(this.comments, comment_id);
        comment.replies.push(comment);
      }
      this.$emit("incrementCommentsCount", this.post.id);
      this.$nextTick(() => {
        const commentModal = this.$refs.commentModalRef.$el;
        const modalBody = commentModal.querySelector(".modal-body");
        modalBody.scrollTop = modalBody.scrollHeight;
      });
    },
    /**
     * @description: get comments users to display them in the comment dropdown
     * @returns {void}
     */
    async getCommentsUsers() {
      if (this.post.comments_count <= 0) {
        return;
      }

      this.commentsUsersLoading = true;
      try {
        const response = await commentService.getPostCommentsUsers(
          this.post.id
        );
        this.commentsUsers = response.data.users;
        this.totalCommentsUsers = response.data.count;
      } catch (error) {
        console.log(error);
      }

      this.commentsUsersLoading = false;
    },
  },
};
</script>

<style>
.dropdown-item {
  color: #ddd !important;
}

.dropdown-menu {
  background-color: rgba(25, 24, 24, 0.8) !important;
}

.dropdown-menu .dropdown-item:focus,
.dropdown-menu .dropdown-item:hover {
  background-color: transparent !important;
  color: #fff !important;
}

.card-post-toolbar .dropdown-menu {
  background-color: #fff !important;
}

.card-post-toolbar .dropdown-menu .dropdown-item,
.card-post-toolbar .dropdown-menu .dropdown-item:focus,
.card-post-toolbar .dropdown-menu .dropdown-item:hover {
  color: #000 !important;
}

.bold-600 {
  font-weight: 600;
}

/*overlay on last image*/
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: all 0.3s ease-in-out;
}
</style>
