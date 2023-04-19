import { handleError } from "vue";
import { api } from "../Intercepter";

class ReasonSerivce {
  async getReasonsForLeader() {
    try {
      const response = await api.get("modification-reasons/leader");
      return response.data.data;
    } catch (e) {
      handleError(e);
    }
  }
}

export default new ReasonSerivce();
