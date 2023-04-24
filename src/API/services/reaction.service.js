import { handleError } from "vue";
import { api } from "../Intercepter";

class ReactionService {
  async getAllReactionTypes() {
    try {
      const reactions = await api.get("/reactions/types");
      return reactions.data;
    } catch (error) {
      handleError(error);
    }
  }

  getStoredReactions() {
    return JSON.parse(localStorage.getItem("reactions"));
  }

  async reactOnPost(post_id, type_id) {
    try {
      const response = await api.get(
        `/reactions/posts/${post_id}/types/${type_id}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async reactOnComment(comment_id, type_id) {
    try {
      const response = await api.get(
        `/reactions/comments/${comment_id}/types/${type_id}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new ReactionService();
