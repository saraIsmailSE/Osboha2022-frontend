<template>
  <div>
    <vue-advanced-chat
      dir="ltr"
      height="calc(100vh - 20px)"
      :current-user-id="currentUserId"
      :rooms="rooms"
      :loading-rooms="roomsLoading"
      :rooms-loaded="roomsLoaded"
      :messages="messages"
      :messages-loaded="messagesLoaded"
      :show-audio="false"
      :show-add-room="false"
      :message-actions="JSON.stringify(messageActions)"
      @fetch-more-rooms="fetchMoreRooms"
      @fetch-messages="fetchMessages($event.detail[0])"
      @send-message="sendMessage($event.detail[0])"
      @delete-message="deleteMessage($event.detail[0])"
    />
  </div>
</template>

<script>
import { register } from "vue-advanced-chat";
import helper from "@/utilities/helper";
import MessageService from "@/API/services/messages.service";

register();

export default {
  mounted() {
    this.loadRooms();
  },
  data() {
    return {
      roomsLoading: false,
      roomsLoaded: false,
      rooms: [],
      roomsPerPage: 15,
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
    };
  },
  computed: {
    currentUserId() {
      return this.$store.getters.getUser.id.toString();
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
      if (this.roomsPage > this.lastRoomPage) {
        this.roomsLoaded = true;
        return;
      }

      this.roomsLoading = true;
      try {
        const response = await MessageService.listRooms(this.roomsPage);
        this.totalRooms = response.data?.total;
        this.lastRoomPage = response.data?.last_page;
        this.roomsPage++;
        this.roomsLoaded =
          response.data?.rooms?.length === 0 ||
          response.data?.rooms?.length < this.roomsPerPage;
        this.rooms = this.rooms.concat(response.data?.rooms);
      } catch (error) {
        helper.toggleToast("حدث خطأ ما, حاول مرة أخرى", "error");
      } finally {
        this.roomsLoading = false;
      }
    },

    fetchMessages({ room, options = {} }) {
      if (options.reset) {
        this.resetMessages();
      }

      if (this.messagesPage > this.lastMessagePage) {
        this.messagesLoaded = true;
        return;
      }

      this.selectedRoom = room.roomId;

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

          const newMessages = [];
          response.data?.messages?.forEach((message) => {
            newMessages.unshift(message);
          });

          this.messages = newMessages.concat(this.messages);

          this.lastMessagePage = response.data?.last_page;
          this.messagesPage++;

          //mark messages as read
          MessageService.markMessagesAsRead(room.roomId).then((response) => {
            const selected = this.rooms.find(
              (room) => room.roomId === this.selectedRoom
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
        const response = await MessageService.create(message);
        this.messages = [...this.messages, response.data];
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
  },
};
</script>
