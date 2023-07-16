import { handleError } from "vue";
import { api } from "../Intercepter";

class MessageService {
  async create(message) {
    const formData = new FormData();
    if (message.content) formData.append("body", message.content);
    if (message.roomId) formData.append("room_id", message.roomId);
    if (message.receiver_id)
      formData.append("receiver_id", message.receiver_id);
    if (message.files) {
      message.files.forEach((file) => {
        //convert to file object
        const blob = file.blob;
        const name = file.name;
        const type = file.type;
        const size = file.size;

        const newFile = new File([blob], name, { type, size });
        formData.append("media[]", newFile);
      });
    }
    if (message.replyMessage)
      formData.append("message_id", message.replyMessage._id);

    try {
      const message = await api.post("/messages", formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return message.data;
    } catch (error) {
      console.log(
        "🚀 ~ file: messages.service.js:25 ~ MessageService ~ create ~ error:",
        error
      );
      handleError();
    }
  }

  async listRooms(page) {
    try {
      const rooms = await api.get(`/rooms?page=${page}`);
      return rooms.data;
    } catch (error) {
      handleError();
    }
  }

  async listRoomMessages(roomId, page) {
    try {
      const messages = await api.get(`/messages/room/${roomId}?page=${page}`);
      return messages.data;
    } catch (error) {
      handleError();
    }
  }

  async markMessagesAsRead(roomId) {
    try {
      await api.post(`/messages/room/${roomId}`);
    } catch (error) {
      handleError();
    }
  }

  async delete(messageId) {
    try {
      await api.delete(`/messages/${messageId}`);
    } catch (error) {
      handleError();
    }
  }
}

export default new MessageService();
