<template>
  <div class="row">
    <span class="material-symbols-outlined story-next" role="button" @click="prevStory" v-if="currentStoryIndex !=0">
      arrow_circle_right
    </span>

    <router-link :to="{ name: story.route}" class="story" :style="`background-image: url(${story.backgroundImg});`"
      v-for="story in stories.slice(currentStoryIndex, currentStoryIndex+2)" :key="story.route">
    </router-link>
    <span class="material-symbols-outlined story-next" role="button" @click="nextStory" v-if="currentStoryIndex+2 < totalStories">
      arrow_circle_left
    </span>

    <div class="col-12 row m-0 p-0 mt-2">
      <div class="col-sm-12">
        <tab-content id="pills-tabContent-2">
          <tab-content-item :active="true" id="profile-feed" aria-labelled-by="pills-feed-tab">
            <!-- ##### <AddPost> ##### -->
            <AddPost @add-post="addPost" type="normal" :timeline_id="timeline_id" />
            <!-- ##### <AddPost /> ##### -->
          </tab-content-item>
        </tab-content>
      </div>
      <tab-content id="pills-tabContent-2">
        <tab-content-item :active="true" id="profile-feed" aria-labelled-by="pills-feed-tab">
          <LazyLoadedPosts :isMain="true" ref="lazyLoadedPostsRef" />
        </tab-content-item>
      </tab-content>
    </div>
  </div>
</template>
<script>
import AddPost from "@/components/post/add/AddPost";
import LazyLoadedPosts from "@/components/post/LazyLoadedPosts.vue";
import bookService from "@/API/services/book.service";
import postService from "@/API/services/post.service";
import knowAboutOsboha0 from '@/assets/images/main/know-about-osboha-0.png'
import knowAboutOsboha1 from '@/assets/images/main/know-about-osboha-1.png'
import knowAboutOsboha2 from '@/assets/images/main/know-about-osboha-2.png'
import latestBook from '@/assets/images/main/latest-book.png'
import latestAnnouncement from '@/assets/images/main/latest-announcement.png'
import topUsers from '@/assets/images/main/top-users.png'

export default {
  name: "Osboha App",
  components: { AddPost, LazyLoadedPosts },
  data() {
    return {
      knowAboutOsboha: '',
      knowAboutOsboha0,
      knowAboutOsboha1,
      knowAboutOsboha2,
      latestBook,
      topUsers,
      latestAnnouncement,
      currentStoryIndex: 0


    };
  },
  async created() {
    this.knowAboutOsboha = this.knowAboutOsboha2;
    const response = await postService.getCurrentWeekSupportPost();
    if (response) {
      if (response.userVote) {
        this.knowAboutOsboha = this.knowAboutOsboha0;
      }
      else {
        this.knowAboutOsboha = this.knowAboutOsboha1;
      }
    }
  },
  methods: {
    addPost(post) {
      this.$refs.lazyLoadedPostsRef.addNewPost(post);
    },
    nextStory() {
      this.currentStoryIndex = (this.currentStoryIndex + 1) ;
    },
    prevStory() {
      this.currentStoryIndex = (this.currentStoryIndex - 1);
    }

  },
  computed: {
    timeline_id() {
      return this.$store.getters.getUserProfile.timeline_id;
    },
    stories() {
      return [
        {
          route: 'osboha.support',
          backgroundImg: this.knowAboutOsboha
        },
        {
          route: 'statistics.top-users',
          backgroundImg: this.topUsers
        },
        {
          route: 'book.latest',
          backgroundImg: this.latestBook
        }

      ]
    },
    totalStories(){
      return this.stories.length
    }
  },
};
</script>


<style scoped>
/* story */
.story {
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100px;
  height: 200px;
  box-shadow: 0px 5px 17px -7px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  margin-right: 5px;
  transition: transform 100ms ease-in;
  cursor: pointer;
}

.story:hover {
  transform: scale(1.07);
}

.story h5 {
  position: absolute;
  top: 35%;
  color: #192e35;
  font-size: small;
}

.carousel {
  width: 300px;
  overflow: hidden;
  position: relative;
  height: 200px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 1s;
}

.slide-fade-enter,
.story-next {
  width: auto;
  font-size: 31pt;
  margin-right: 0;
  align-items: baseline;
  height: fit-content;
  display: block;
  align-self: self-end;
}
</style>