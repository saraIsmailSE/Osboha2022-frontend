import { api } from "../Intercepter";

class ReactionService {
  async getAllReactionTypes() {
    try {
      const reactions = await api.get("/reactions/types");
      return reactions.data;
    } catch (error) {
      return error;
    }
  }

  getStoredReactions() {
    return JSON.parse(localStorage.getItem("reactions"));
  }
}

export default new ReactionService();
