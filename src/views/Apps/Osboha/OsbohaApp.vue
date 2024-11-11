<template>
  <div class="row">
    <span class="material-symbols-outlined story-next" role="button" @click="prevStory" v-if="currentStoryIndex != 0">
      arrow_circle_right
    </span>

    <router-link :to="{ name: story.route }" class="story" :style="`background-image: url(${story.backgroundImg});`"
      v-for="story in stories.slice(currentStoryIndex, currentStoryIndex + 2)" :key="story.route" id="stories">
    </router-link>
    <span class="material-symbols-outlined story-next" role="button" @click="nextStory"
      v-if="currentStoryIndex + 2 < totalStories">
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

    <v-tour name="osbohaTour" :steps="steps" :options="tourOptions"></v-tour>

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
  mounted() {
    if (this.$route.params.tour) {
      window.tours["osbohaTour"].start();
    }
  },
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
      currentStoryIndex: 0,
      tourOptions: {
        useKeyboardNavigation: false,
        enabledButtons: {
          buttonSkip: false
        },
        enableScrolling: false,
        labels: {
          buttonPrevious: 'السابق',
          buttonNext: 'التالي',
          buttonStop: 'انهاء'
        },
      },
      steps: [
        {
          target: "#LeftSidebar",
          step: {
            offset: 100,
          },
          header: {
            title: "قائمة الوصول السريع",
          },
          content: `<strong>الكتب الأخيرة:</strong> تجد هنا في الأيقونة الأولى آخر الكتب التي قرأتها.
          <br/>
          <strong>فريق المتابعة: </strong> في الأيقونة الثانية فريق المتابعة الذي يشرف على قراءتك.
          <br/>
          <strong>مؤقت الأسبوع: </strong> في الأيقونة الثالثة مؤقت الأسبوع.`,
          params: {
            highlight: true,
          },
        },
        {
          target: "#header",
          step: {
            offset: 100,
          },
          header: {
            title: "الشريط الرئيسي",
          },
          content: `تجد هنا أيقونة الإشعارات، حيث يمكنك متابعة التنبيهات الجديدة.
          <br/>
          تحتوي الأيقونة بجانب الإشعارات على خيار تفعيل الوضع الليلي لتغيير خلفية الموقع إلى اللون الداكن.`,
        },
        {
          target: "#sidebar-toggle",
          step: {
            offset: 100,
          },
          header: {
            title: "القائمة الرئيسية",
          },
          content: `هذه القائمة تحتوي على مجموعة من الخيارات التي تتيح للمستخدم التنقل والوصول السريع إلى مختلف أقسام الموقع`,
        },
        {
          target: "#stories",
          step: {
            offset: 100,
          },
          header: {
            title: "صفحات مميزة",
          },
          content: `هنا يمكنك مشاهدة اخر اخبار المشروع وعرض الأعضاء المتميزين بإنجازاتهم ومساهماتهم، بالاضافة الى الكتب التي تم إضافتها مؤخراً
          <br/>
          يمكنك التنقل بسهولة بين البطاقات المختلفة باستخدام أزرار التنقل الجانبية`,
          params: {
            highlight: true,
          }

        },
      ],



    };
  },
  async created() {
    this.knowAboutOsboha = this.knowAboutOsboha2;
    const response = await postService.getCurrentWeekSupportPost();
    if (response) {
      if (response.userVote || response.userComment) {
        this.knowAboutOsboha = this.knowAboutOsboha0;
      }
      else {
        this.knowAboutOsboha = this.knowAboutOsboha1;
      }
    }

    this.fireAlert()
  },
  methods: {
    addPost(post) {
      this.$refs.lazyLoadedPostsRef.addNewPost(post);
    },
    nextStory() {
      this.currentStoryIndex = (this.currentStoryIndex + 1);
    },
    prevStory() {
      this.currentStoryIndex = (this.currentStoryIndex - 1);
    },
    fireAlert() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          cancelButton: "btn btn-outline-primary btn-lg ms-2",
          confirmButton: "btn btn-outline-primary btn-lg ms-2 text-white",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "نظام الحُزَم المعرفية تاج التميز في مشروع أصبوحة 180",
          text: `انضم للحُزَم المعرفية لخوض تجربة استثنائية في أصبوحة 180`,
          imageUrl: require('@/assets/images/main/alertMsg.png'),
          imageAlt: 'A tall image',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "المزيد من التفاصيل ",
          cancelButtonText: "تجاهل ",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push({
              name: "osboha.post", params: {
                post_id: 46609
              }
            });
          }
        });
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
    totalStories() {
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