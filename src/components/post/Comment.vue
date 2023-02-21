<template>
  <div class="comment">
    <ul class="post-comments list-inline p-0 m-0">
      <li class="mb-2" v-for="comment in comments" :key="comment.id">
        <div class="d-flex align-items-center">
          <div class="user-image mb-3">
            <img
              class="avatar-50 rounded-circle"
              :src="resolve_img_url(comment.user?.profile.profile_picture)"
              alt="profile picture"
              data-original-title=""
              title=""
            />
          </div>
          <div class="ms-3">
            <h5>{{ comment.user?.name }}</h5>
            <span
              class="badge bg-primary rounded-pill"
              v-for="role in comment.user?.roles"
              :key="role"
            >
              &nbsp; {{ role }} &nbsp;</span
            >
          </div>
        </div>
        <div class="blog-description">
          <p v-if="comment.body">{{ comment.body }}</p>
          <div class="image-block mt-3 mb-3">
            <img
              v-if="comment.media"
              :src="comment.media.path"
              class="img-fluid rounded w-25 comment-image"
              alt="blog-img"
            />
          </div>
          <div class="d-flex flex-wrap align-items-center comment-activity">
            <span class="text-muted small">
              {{ formatDate(comment.created_at) }}
            </span>
            &nbsp;&nbsp;
            <a href="javascript:void();">أعجبني</a>
            <a href="javascript:void();">رد</a>
          </div>
        </div>
        <Comment v-if="comment.replies" :comments="comment.replies" />
      </li>
    </ul>
  </div>
</template>
<script>
import moment from "moment";
import { formatDistanceToNow } from "date-fns";
import ar from "date-fns/locale/ar-SA";
export default {
  name: "Comment",
  components: {},
  props: {
    comments: { type: Object },
  },
  methods: {
    resolve_img_url: function (path) {
      if (path) {
        return path;
      }
      let images = require.context(
        "../../assets/images/avatar",
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
  },
};
</script>
<style scoped>
.reply-container {
  margin-right: 30px;
}

.comment {
  margin-top: 15px;
}
.post-comments > li {
  border-right: 2px solid #ddd;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 15px;
  padding-right: 15px;
}
</style>
