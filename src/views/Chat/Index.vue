<template>
  <div>
    <div class="iq-top-navbar mt-2">
      <nav
        class="nmt-4 av navbar navbar-expand-lg navbar-light iq-navbar p-lg-0"
      >
        <div class="container-fluid p-auto">
          <router-link :to="{ name: 'osboha.list' }" class="navbar-brand p-0">
            <img
              src="@/assets/images/main/osboha-logo.png"
              alt="logo"
              class=""
            />
          </router-link>
          <div class="social-media">
            <p class="mb-0 d-flex">
              <i
                class="d-flex align-items-center justify-content-center ms-2 me-3 position-relative"
              >
                <i class="material-symbols-outlined">chat_bubble</i>
                <span
                  v-if="unreadMessages"
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info"
                >
                  {{ unreadMessages }}
                </span>
              </i>
              <i
                class="d-flex align-items-center justify-content-center ms-2 me-1 position-relative"
              >
                <router-link
                  :to="{ name: 'osboha.list' }"
                  class="material-symbols-outlined"
                  >home</router-link
                >
              </i>
            </p>
          </div>
        </div>
      </nav>
    </div>
    <div class="new-room" v-if="addNewRoom">
      <form class="add-room-form" @submit.prevent="createRoom">
        <div class="searchable-dropdown" :class="{ active: showDropdown }">
          <div class="search-input" :class="{ active: showCloseBtn }">
            <input
              v-model="addRoomUsername"
              type="text"
              placeholder="البحث عن اسم"
              @focus="showCloseBtn = true"
              @input="searchUsers"
            />
            <button class="button-cancel" @click="closeSearch">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="dropdown-list">
            <div v-if="showEmpty" class="dropdown-list-item">
              <span>لا يوجد نتائج</span>
            </div>
            <div
              class="dropdown-list-item text-center justify-content-center"
              v-if="fetchingUsers"
            >
              <img
                src="@/assets/images/gif/page-load-loader.gif"
                alt="loader"
                style="height: 50px"
              />
            </div>
            <div
              class="dropdown-list-item"
              v-for="user in users"
              :key="user.id"
              @click="openNewRoom(user)"
            >
              <!-- <div class="user-avatar">
                {{ user.name?.charAt(0).toUpperCase() }}
              </div> -->
              <BaseAvatar
                :profileImg="user?.profile.profile_picture"
                :profile_id="user?.profile.id"
                :title="user?.name"
                :gender="user?.gender"
                avatarClass="rounded-circle avatar-40"
              />

              <!-- <img :src="user.profilePicture" alt="profile-img" /> -->
              <span class="me-2">{{ user.name }}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
    <vue-advanced-chat
      dir="ltr"
      height="calc(100vh - 20px)"
      :current-user-id="currentUserId"
      :rooms="rooms"
      :room-id="currentRoomId"
      :loading-rooms="roomsLoading"
      :rooms-loaded="roomsLoaded"
      :messages="messages"
      :messages-loaded="messagesLoaded"
      :show-audio="false"
      :show-reaction-emojis="false"
      :message-actions="JSON.stringify(messageActions)"
      @fetch-messages="fetchMessages($event.detail[0])"
      @send-message="sendMessage($event.detail[0])"
      @delete-message="deleteMessage($event.detail[0])"
      @add-room="addRoom($event.detail[0])"
      @open-file="openFile($event.detail[0])"
    />
    <!-- @fetch-more-rooms="fetchMoreRooms" -->
  </div>
</template>

<script>
import { register } from "vue-advanced-chat";
import helper from "@/utilities/helper";
import MessageService from "@/API/services/messages.service";
import UserService from "@/API/services/user.service";
import { watchEffect } from "vue";

register();

export default {
  async mounted() {
    await this.loadRooms();

    //open a new room if user_id is passed in the query params
    const queryParams = this.$route.query;
    if (queryParams.user_id) {
      this.loadUserRoom(queryParams.user_id);
    } else {
      this.selectedRoom = this.rooms[0];
    }
  },

  async created() {
    this.unreadMessages = await MessageService.unreadMessages();

    const channel = this.Echo.channel("rooms-channel." + this.user.id);
    channel.listen(".new-messages", (response) => {
      if (response) {
        this.rooms = response.rooms;
        this.roomsLoaded = true;
        this.unreadMessages = response.unreadMessages;
      }
    });

    watchEffect(() => {
      // Subscribe to the 'chat' channel
      if (this.selectedRoom) {
        if (this.selectedRoom.roomId != this.currentRoomId) {
          this.Echo.leaveChannel("single-room-channel." + this.currentRoomId);
          this.currentRoomId = this.selectedRoom.roomId;
        }
        const channel = this.Echo.channel(
          "single-room-channel." + this.currentRoomId,
        );
        // Listen for 'new-message' events
        channel.listen(".new-message", (response) => {
          if (!this.displayedMessageIds.includes(response.message._id)) {
            this.messages = [...this.messages, response.message];
            this.displayedMessageIds.push(response.message._id);
          }
        });
      }
    });
  },

  data() {
    return {
      unreadMessages: 0,
      pusher: null,
      addNewRoom: false,
      currentRoomId: 0,
      displayedMessageIds: [],
      addRoomUsername: "",
      roomsLoading: false,
      roomsLoaded: false,
      rooms: [],
      roomsPerPage: 4,
      roomsPage: 1,
      totalRooms: 0,
      lastRoomPage: 1,
      selectedRoom: null,
      messages: [],
      messagesLoaded: false,
      lastMessagePage: 1,
      messagesPerPage: 20,
      messagesPage: 1,
      messageActions: [
        {
          name: "replyMessage",
          title: "Reply",
        },
        // {
        //   name: "deleteMessage",
        //   title: "Delete Message",
        //   onlyMe: true,
        // },
      ],
      users: [],
      delayTimer: null,
      showDropdown: false,
      showCloseBtn: false,
      showEmpty: false,
      fetchingUsers: false,
      options: null,
    };
  },
  computed: {
    currentUserId() {
      return this.$store.getters.getUser.id.toString();
    },
    user() {
      return this.$store.getters.getUser;
    },
    Echo() {
      return this.$store.getters.getEcho;
    },
  },
  methods: {
    resetRooms() {
      this.loadingRooms = true;
      this.roomsLoaded = true;
      this.rooms = [];
      this.roomsPage = 1;
      this.totalRooms = 0;
      this.lastRoomPage = 1;
      //reset messages
    },

    resetMessages() {
      this.messages = [];
      this.messagesLoaded = false;
      this.messagesPage = 1;
      this.lastMessagePage = 1;
    },

    async loadRooms() {
      this.resetRooms();
      await this.fetchMoreRooms();
    },

    async fetchMoreRooms() {
      // if (this.roomsPage > this.lastRoomPage) {
      //   this.roomsLoaded = true;
      //   return;
      // }

      this.roomsLoading = true;
      try {
        const response = await MessageService.listRooms(this.roomsPage);
        // this.totalRooms = response.data?.total;
        // this.lastRoomPage = response.data?.last_page;
        // this.roomsPage++;
        // this.roomsLoaded =
        //   response.data?.rooms?.length === 0 ||
        //   response.data?.rooms?.length < this.roomsPerPage;
        // this.rooms =
        //   response.data?.rooms?.length &&
        //   this.rooms?.concat(response.data?.rooms);

        this.rooms = response.data?.rooms;
        this.roomsLoaded = true;
      } catch (error) {
        helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
      } finally {
        this.roomsLoading = false;
      }
    },

    fetchMessages({ room, options = {} }) {
      if (Object.keys(room).length === 0) return;

      this.options = options;
      if (options.reset) {
        this.resetMessages();
      }

      if (this.messagesPage > this.lastMessagePage) {
        this.messagesLoaded = true;
        return;
      }

      this.selectedRoom = room;

      if (room?.isFake) {
        this.messagesLoaded = true;
        return;
      }

      MessageService.listRoomMessages(room.roomId, this.messagesPage)
        .then((response) => {
          if (
            response.data?.messages?.length === 0 ||
            response.data?.messages?.length < this.messagesPerPage
          ) {
            setTimeout(() => {
              this.messagesLoaded = true;
            }, 0);
          }

          if (options.reset) this.messages = [];

          response.data?.messages?.forEach((message) => {
            this.displayedMessageIds.push(message._id);
            this.messages.unshift(message);
          });

          this.lastMessagePage = response.data?.last_page;
          this.messagesPage++;

          //mark messages as read
          MessageService.markMessagesAsRead(room.roomId).then((response) => {
            const selected = this.rooms.find(
              (room) => room.roomId === this.selectedRoom?.roomId,
            );

            if (selected) {
              selected.unreadCount = 0;
              this.rooms = [...this.rooms];
            }
          });
        })
        .catch((error) => {
          helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
        });
    },

    async sendMessage(message) {
      try {
        const newMessage = this.selectedRoom.isFake
          ? {
              ...message,
              roomId: null,
              receiver_id: this.selectedRoom.users[1]._id,
            }
          : message;

        const response = await MessageService.create(newMessage);

        //replace the selected fake room with the created one
        if (this.selectedRoom.isFake) {
          const fakeRoomIndex = this.rooms.findIndex(
            (room) => room.roomId === this.selectedRoom.roomId,
          );
          this.rooms[fakeRoomIndex] = response.data?.room;
          this.rooms = [...this.rooms];
          this.selectedRoom = response.data?.room;

          this.loadRooms();

          return;
        }
        //this.messages = [...this.messages, response.data?.message];
        if (!this.displayedMessageIds.includes(response.data?.message._id)) {
          this.messages = [...this.messages, response.data?.message];
          this.displayedMessageIds.push(response.data?.message._id);
        }

        //update last message in rooms
        const roomIndex = this.rooms.findIndex(
          (room) => room.roomId === response.data?.room.roomId,
        );
        const newRoom = {
          ...this.rooms[roomIndex],
          lastMessage: response.data?.message,
          index: response.data?.message?.indexId,
        };

        this.rooms[roomIndex] = newRoom;
        this.rooms = [...this.rooms];
        this.selectedRoom = newRoom;
      } catch (error) {
        helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
      }
    },

    async deleteMessage({ message }) {
      try {
        await MessageService.delete(message._id);
        this.messages = this.messages.filter((m) => m._id !== message._id);
      } catch (error) {
        helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
      }
    },

    addRoom() {
      this.addNewRoom = true;
      //remove fake rooms
      const filteredRooms = this.rooms?.filter((room) => !room.isFake);
      this.rooms = filteredRooms;
    },

    closeSearch() {
      this.addNewRoom = false;
      this.addRoomUsername = "";
      this.showDropdown = false;
      this.showCloseBtn = false;
    },

    async searchUsers() {
      clearTimeout(this.delayTimer);

      this.delayTimer = setTimeout(() => {
        this.fetchUsers();
      }, 1000);
    },

    async fetchUsers() {
      if (this.addRoomUsername === "") {
        this.showDropdown = false;
        return;
      }

      if (this.fetchingUsers) return;

      this.showDropdown = true;
      this.fetchingUsers = true;

      try {
        const response = await UserService.searchUsers(this.addRoomUsername);
        this.users = response.data;
      } catch (error) {
        helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
      } finally {
        if (this.users.length === 0 && this.addRoomUsername !== "") {
          this.showEmpty = true;
        } else if (this.users.length > 0 && this.addRoomUsername !== "") {
          this.showEmpty = false;
        } else if (this.users.length === 0 && this.addRoomUsername === "") {
          this.showEmpty = false;
          this.showDropdown = false;
        }

        this.fetchingUsers = false;
      }
    },

    openNewRoom(user) {
      this.addRoomUsername = user?.name;
      this.showDropdown = false;

      //check room if exists
      const room =
        this.rooms?.length > 0
          ? this.rooms.find((room) => {
              //check first user
              if (parseInt(room.users[0]._id) === parseInt(user.id)) {
                return true;
              }

              //check second user
              if (parseInt(room.users[1]._id) === parseInt(user.id)) {
                return true;
              }

              return false;
            })
          : null;

      this.addNewRoom = false;
      this.addRoomUsername = "";
      if (room) {
        this.selectedRoom = room;
        this.fetchMessages({ room });
        return;
      } else {
        this.selectedRoom = null;
        this.createFakeRoom(user);
        return;
      }
    },

    createFakeRoom(user) {
      //create a room object
      const room = {
        roomId: helper.generateRandomId(),
        roomName: user.name,
        index: new Date().toISOString(),
        users: [
          {
            _id: this.currentUserId,
            name: this.$store.getters.getUser.name,
            profilePicture:
              this.$store.getters.getUser.user_profile.profile_picture,
          },
          {
            _id: user.id.toString(),
            name: user.name,
            profilePicture: user.profile?.profile_picture,
          },
        ],
        unreadCount: 0,
        lastMessage: null,
        lastMessageDate: null,
        isFake: true,
      };
      this.rooms = [...(this.rooms || []), room];
      this.selectedRoom = room;
    },

    openFile({ file }) {
      window.open(file.file.url, "_blank");
    },

    async loadUserRoom(user_id) {
      this.roomsLoading = true;
      this.roomsLoaded = false;
      try {
        const user = await UserService.getInfo(user_id);
        this.openNewRoom(user);
      } catch (error) {
        helper.toggleErrorToast();
      } finally {
        this.roomsLoading = false;
        this.roomsLoaded = true;
      }
    },
  },
};
</script>

<style>
.new-room {
  direction: ltr;
  padding: 10px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s ease-in-out;
}

.add-room-form {
  width: 300px;
}

.searchable-dropdown {
  position: relative;
  width: 100%;
}

.search-input {
  position: relative;
  width: 100%;
}

.search-input input {
  width: 100%;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
}

.search-input .button-cancel {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: none;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 1000;
  box-shadow: 0 0 5px #ccc;
  display: none;
}

.dropdown-list-item {
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.dropdown-list-item img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.dropdown-list-item span {
  font-size: 16px;
  font-weight: 600;
}

.dropdown-list-item .user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  background: #278036;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.dropdown-list-item:hover {
  background: #eee;
}

.dropdown-list-item:not(:last-child) {
  border-bottom: 1px solid #ccc;
}

.dropdown-list-item:last-child {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.searchable-dropdown.active .dropdown-list {
  display: block;
}

.search-input.active .button-cancel {
  display: block;
}
</style>
