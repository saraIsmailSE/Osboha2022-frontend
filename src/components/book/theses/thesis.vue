<template>
  <div class="col-lg-12">
    <div class="card card-block card-stretch card-height blog">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="user-image mb-3">
            <img
              class="avatar-50 rounded-circle"
              :src="
                resolve_img_url(thesis.comment?.user.profile.profile_picture)
              "
              alt="profile picture"
              data-original-title=""
              title=""
            />
          </div>
          <div class="ms-3">
            <h5>{{ thesis.comment?.user.name }}</h5>
            <span
              class="badge bg-primary rounded-pill"
              v-for="role in thesis.comment?.user.roles"
              :key="role"
            >
              &nbsp; {{ role }} &nbsp;</span
            >
            &nbsp;
            <!-- <span class="badge bg-success rounded-pill">
              &nbsp; جودة الكتب &nbsp;</span
            > -->
          </div>
        </div>
        <div class="blog-description">
          <h6>
            الصفحات المنجزة: {{ totalThesisPages }}
            <rate :rate="thesis.rate" />
          </h6>
          <!-- display the body if existed or the first media of the thesis (in case it is a screenshots' thesis)-->
          <p v-if="thesis.comment?.body">{{ thesis.comment?.body }}</p>
          <div class="image-block mt-3 mb-3" v-if="thesis.comment?.media">
            <img
              :src="thesis.comment?.media.path"
              class="img-fluid rounded w-25 comment-image"
              alt="blog-img"
            />
          </div>
          <div class="d-flex flex-wrap align-items-center comment-activity">
            <span class="text-muted small">
              {{ formatDate(thesis.comment?.created_at) }}
            </span>
            &nbsp;&nbsp;
            <a href="javascript:void();">أعجبني</a>
            <a href="javascript:void();">رد</a>
          </div>
          <!--display a button to hide replies-->
          <a class="load-btn" v-on:click="toggleShowReplies" v-if="hasReplies">
            {{
              showReplies
                ? `إخفاء ${totalReplies} من الردود`
                : `عرض ${totalReplies} من الردود`
            }}
          </a>
          <Comment
            v-if="thesis.comment?.replies && showReplies"
            :comments="thesis.comment?.replies"
          />
          <CreateComment />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import rate from "../rate/rate.vue";
import Comment from "../../post/Comment.vue";
import CreateComment from "../../post/CreateComment.vue";
import moment from "moment";
import { formatDistanceToNow } from "date-fns";
import ar from "date-fns/locale/ar-SA";
export default {
  name: "ListTesis",
  components: {
    rate,
    Comment,
    CreateComment,
  },
  props: {
    thesis: { type: Object },
  },
  data() {
    return {
      rate: 5,
      showReplies: false,
    };
  },
  methods: {
    resolve_img_url: function (path) {
      if (path) {
        return path;
      }
      let images = require.context(
        "../../../assets/images/avatar",
        false,
        /\.png$|\.jpg$/
      );
      return images("./avatar-01.jpg");
    },
    formatDate(date) {
      // return moment(date).format("YYYY-MM-DD");
      return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: ar,
      });
    },
    toggleShowReplies() {
      this.showReplies = !this.showReplies;
    },
  },
  computed: {
    hasReplies() {
      return (
        this.thesis.comment?.replies && this.thesis.comment?.replies.length > 0
      );
    },
    totalThesisPages() {
      return this.thesis.end_page - this.thesis.start_page + 1;
    },
    totalReplies() {
      let total = this.thesis.comment?.replies?.length;

      this.thesis.comment?.replies.forEach((reply) => {
        total += reply.replies?.length;
      });

      return total;
    },
  },
};
</script>
<style>
.comment-image {
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 20px !important;
}
</style>
