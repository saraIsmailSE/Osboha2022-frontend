<template>
  <div class="row" ref="listContainer">
    <div class="col-sm-12">
      <h4 class="card-title">الاشعارات</h4>

      <div class="col-sm-12" v-if="notifications.length == 0">
        <iq-card class="iq-card">
          <div class="iq-card-body p-0">
            <div class="image-block text-center">
              <img
                src="@/assets/images/main/no-notifications.png"
                class="img-fluid rounded w-50"
                alt="blog-img"
              />
            </div>

            <h4 class="text-center mt-3 mb-3">لا يوجد اشعارات</h4>
          </div>
        </iq-card>
      </div>

      <span
        role="button"
        class="btn btn-primary mb-3"
        v-if="unreadCount > 0"
        style="direction: rtl !important"
        @click="markAllAsRead()"
      >
        <i role="button" class="material-symbols-outlined align-middle">
          done
        </i>

        تحديد قراءة الكل
      </span>
    </div>
    <div
      class="col-sm-12"
      v-for="(notification, index) in notifications"
      :key="index"
    >
      <iq-card
        :class="[seenClass(notification.read_at), notification.data.type]"
      >
        <template v-slot:body>
          <div class="notification-list m-0 p-0">
            <div class="d-flex align-items-center justify-content-between">
              <base-avatar
                :profileImg="
                  notification.data.sender.user_profile.profile_picture
                "
                :profile_id="notification.data.sender.user_profile.id"
                :title="notification.data.sender.name"
                :gender="notification.data.sender.gender"
                avatarClass="rounded-circle avatar-40"
              />
              <div class="w-100">
                <div class="d-flex justify-content-between">
                  <div class="ms-3">
                    <h6
                      style="direction: rtl"
                      :class="{
                        'text-white': notification.data.type === 'announcement',
                      }"
                    >
                      {{ notification.data.message }}
                    </h6>
                    <tooltip
                      tag="span"
                      class="text-muted small"
                      :class="{
                        'text-white-50':
                          notification.data.type === 'announcement',
                      }"
                      tooltipPlacement="bottom"
                      data-bs-toggle="tooltip"
                      :title="formatFullDate(notification.created_at)"
                      >{{ formatDateToWritten(notification.created_at) }}
                    </tooltip>
                  </div>

                  <div class="d-flex align-items-center">
                    <span
                      role="button"
                      class="me-1"
                      :class="{
                        'text-white': notification.data.type === 'announcement',
                      }"
                      @click.prevent="
                        sendToPage(notification.data.path, notification.id)
                      "
                      v-if="notification.data.path"
                    >
                      عرض
                    </span>
                    <i
                      role="button"
                      class="material-symbols-outlined md-18 me-3"
                      :class="{
                        'text-white': notification.data.type === 'announcement',
                      }"
                      v-if="!notification.read_at"
                      @click="markAsRead(notification.id)"
                    >
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

export default {
  name: "Notification",
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
      notifications_route: [],
      notification_route: {
        friends_requests: "user.friendsRequests",
      },

      page: 1,
      totalPages: 1,
      loading: false,
      pendingRequest: false,
      hasMore: true,
      unRead: false,
    };
  },
  computed: {
    hasMoreToLoad() {
      return this.page <= this.totalPages && this.hasMore;
    },
    unreadCount() {
      return this.notifications.length;
    },
  },
  methods: {
    ...helper,
    async loadNotifications() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;
      this.loading = true;
      try {
        let response = await notificationsServices.listAllNotification(
          this.page,
        );
        this.notifications = response.data;
        console.log(response.data[0].data.type);
        this.checkUnread();

        this.totalPages = response.data?.last_page ?? 1;
        this.page++;

        if (response.statusCode === 200 && !response.data) {
          this.hasMore = false;
          return;
        }
      } catch (error) {
        console.log(error);
        // helper.toggleToast(
        //   "حدث خطأ أثناء تحميل الإشعارات, حاول مرة أخرى",
        //   "error"
        // );
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
        return "seen";
      } else {
        return "un-seen";
      }
    },
    /**
     * mark one notification as read.
     *  @param  notification_id
     */
    async markAsRead(notification_id) {
      const response = await notificationsServices.markAsRead(notification_id);
      this.notifications = response.data;
      this.checkUnread();
      if (this.unreadCount > 0) {
        this.$store.commit("SET_UNREAD_NOTIFICATIONS", this.unreadCount - 1);
      }
    },

    /**
     * mark ALL notification as read.
     */
    async markAllAsRead() {
      const response = await notificationsServices.markAllAsRead();
      this.notifications = response.data;
      this.checkUnread();
      this.$store.commit("SET_UNREAD_NOTIFICATIONS", 0);
    },
    checkUnread() {
      function there_is_unread(notification) {
        return notification.read_at === null;
      }
      // check unread
      if (this.notifications.find(there_is_unread)) {
        this.unRead = true;
      }
    },

    sendToPage(path, id) {
      if (path) {
        this.$router.push({ path });
      }
      this.markAsRead(id);
    },
  },
};
</script>

<style scoped lang="scss">
.seen:not(.announcement) {
  --bs-bg-opacity: 1;
  background-color: white;
}

.un-seen:not(.announcement) {
  --bs-bg-opacity: 1;
  background-color: #e2e2e2;
}

.announcement {
  $primary: #1f662b;
  $secondary: #237330;
  --bs-bg-opacity: 1;
  background-color: $primary;

  &.seen {
    background-color: $secondary;
  }
}
</style>
