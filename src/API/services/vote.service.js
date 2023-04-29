import { handleError } from "vue";
import { api } from "../Intercepter";

class VoteService {
  async create(voteData) {
    try {
      const vote = await api.post("/poll-votes", voteData);
      return vote.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getPostVotesUsers(post_id, user_id = "") {
    try {
      const response = await api.get(
        `/poll-votes/posts/${post_id}/users/${user_id}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new VoteService();
