import { api } from "../Intercepter";

class FriendService {
  async getAllFriends(user_id) {
    try {
      const friends = await api.get(`friends/user/${user_id}`);
      return friends.data.data;
    } catch (error) {
      return error;
    }
  }

  async getFriendsRequests() {
    try {
      const requests = await api.get(`/friends/un-accepted`);
      return requests.data.data;
    } catch (error) {
      return error;

    }
  }


  async create(friend_id) {
    try {
      return await api.post("/friends/create", { friend_id });
    } catch (error) {
      return error;
    }
  }

  async getFriendshipById(friendship_id) {
    try {
      const friendship = await api.post("/friends/show", { friendship_id });
      return friendship.data;
    } catch (error) {
      return error;
    }
  }


  async accept(friendship_id) {
    try {
      const friendship = await api.get(`/friends/accept/${friendship_id}`);
      return friendship.data;
    } catch (error) {
      return error;
    }
  }

  async delete(user_id, friend_id) {
    const pivot = new FormData();
    pivot.append("user_id", user_id);
    pivot.append("friend_id", friend_id);
    try {
      const response = await api.post(`/friends/delete`, pivot);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default new FriendService();
