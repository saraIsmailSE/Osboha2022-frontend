import { handleError } from "vue";
import { api } from "../Intercepter";

class RoomService {
  async create(receiver_id) {
    try {
      const response = await api.post("/rooms", { receiver_id });
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async addUserToGroup(user_id, group_id) {
    try {
      return api.post("/group/addUserToRoom", { user_id, group_id });
    } catch (error) {
      return error;
    }
  }
}

export default new RoomService();
