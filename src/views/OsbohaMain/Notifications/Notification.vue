<template>
  <div class="row" ref="listContainer">
    <div class="col-sm-12">
      <h4 class="card-title">الاشعارات</h4>
      <span role="button" class="btn btn-primary mb-3" v-if="unRead" style="direction: rtl !important;"
        @click="markAllAsRead()">
        <i role="button" class="material-symbols-outlined align-middle">
          done
        </i>

        تحديد قراءة الكل
      </span>
    </div>
    <div class="col-sm-12" v-for="(notification, index) in notifications" :key="index">
      <iq-card :class="seenClass(notification.read_at)">
        <template v-slot:body>
          <div class="notification-list m-0 p-0">
            <div class="d-flex align-items-center justify-content-between">
              <div class="user-img img-fluid">
                <img v-if="notification.data.sender.user_profile.profile_picture"
                  :src="resolve_porfile_img('60x60', notification.data.sender.user_profile.profile_picture, notification.data.sender.user_profile.id)"
                  alt="profile-img" class="rounded-circle avatar-40" :title="notification.data.sender.name" />

                <img v-else
                  :src="resolve_porfile_img('60x60', 'ananimous_' + notification.data.sender.gender + '.png', 'ananimous')"
                  alt="profile-img" :title="notification.data.sender.name" class="rounded-circle avatar-40">

              </div>
              <div class="w-100">
                <div class="d-flex justify-content-between">
                  <div class=" ms-3">
                    <h6>{{ notification.data.message }}</h6>
                    <tooltip tag="span" class="text-muted small" tooltipPlacement="bottom" data-bs-toggle="tooltip"
                      :title="formatFullDate(notification.created_at)">{{ formatDateToWritten(notification.created_at) }}
                    </tooltip>
                  </div>

                  <div class="d-flex align-items-center">
                    <router-link class="me-1"
                    :to="{ name: notification_route[notification.data.type], params: { user_id: 1 } }">

                      عرض
                    </router-link>
                    <i role="button" class="material-symbols-outlined md-18 me-3" v-if="!notification.read_at"
                      @click="markAsRead(notification.id)">
                      done
                    </i>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </template>
      </iq-card>
    </div>
  </div>
</template>
<script>
import helper from "@/utilities/helper";
import notificationsServices from "@/API/services/notifications.service";
import profileImagesService from '@/API/services/profile.images.service'

export default {
  name: 'Notification',
  created() {
    this.loadNotifications();

  },
  async mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      notifications: [],
      notifications_route: [

      ],
      notification_route: 
        {
          friends_requests: "user.friendsRequests",
        },       
      
      page: 1,
      totalPages: 1,
      loading: false,
      pendingRequest: false,
      hasMore: true,
      unRead: false,

    }
  },
  computed: {
    hasMoreToLoad() {
      return this.page <= this.totalPages && this.hasMore;
    },
  },
  methods: {
    ...helper,
    /**
* get profile picture or cover.
*  @param  image size, image name, profile id
* @return image url
*/
    resolve_porfile_img(size, imageName, profile_id) {
      return profileImagesService.resolve_porfile_img(size, imageName, profile_id);
    },
    async loadNotifications() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;
      this.loading = true;
      try {

        let response = await notificationsServices.listAllNotification(this.page);
        this.notifications = response.data;
        console.log(this.notifications)

        this.checkUnread()

        this.totalPages = response.data?.last_page ?? 1;
        this.page++;

        if (response.statusCode === 200 && !response.data) {
          this.hasMore = false;
          return;
        }

      } catch (error) {
        console.log(error);
        helper.toggleToast(
          "حدث خطأ أثناء تحميل المنشورات, حاول مرة أخرى",
          "error"
        );
      } finally {
        this.loading = false;
        this.pendingRequest = false;
      }
    },
    /**
     * Check if the user has scrolled to the bottom of the page
     * @returns {boolean}
     */
    isAtBottomOfPage() {
      const containerRect = this.$refs.listContainer.getBoundingClientRect();
      const containerBottom = containerRect.bottom;
      const windowHeight = window.innerHeight;
      return containerBottom <= windowHeight;
    },
    /*
     * Load more posts when the user scrolls to the bottom of the page
     */
    handleScroll() {
      if (this.hasMoreToLoad && this.isAtBottomOfPage()) {
        this.loadNotifications();
      }
    },

    /**
    * return bg color class.
    *  @param  read_at
    * @return class
    */
    seenClass(read_at) {
      if (read_at) {
        return 'seen'
      }
      else {
        return 'un-seen'
      }
    },
    /**
    * mark one notification as read.
    *  @param  notification_id
    */
    async markAsRead(notification_id) {
      const response = await notificationsServices.markAsRead(notification_id);
      this.notifications = response.data;
      this.checkUnread()
    },

    /**
    * mark ALL notification as read.
   */
    async markAllAsRead() {
      console.log('tet')
      const response = await notificationsServices.markAllAsRead();
      this.notifications = response.data;
      this.checkUnread()
    },
    checkUnread() {
      function there_is_unread(notification) {
        return (notification.read_at === null);
      }
      // check unread
      if (this.notifications.find(there_is_unread)) {
        this.unRead = true;
      }

    },
  },
}
</script>

<style scoped>
.seen {
  --bs-bg-opacity: 1;
  background-color: white;
}

.un-seen {
  --bs-bg-opacity: 1;
  background-color: #e2e2e2;
}
</style>
  