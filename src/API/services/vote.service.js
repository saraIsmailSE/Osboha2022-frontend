import { api } from "../Intercepter";

class VoteService {
  async create(voteData) {
    try {
      const vote = await api.post("/poll-votes", voteData);
      return vote.data;
    } catch (error) {
      return error;
    }
  }
}

export default new VoteService();
