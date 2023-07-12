import { handleError } from "vue";
import { api } from "../Intercepter";

class FriendService {
  /**
   * list all friends for specific user.
   * @param user id
   */

  async getAllFriends(user_id) {
    try {
      const friends = await api.get(`friends/user/${user_id}`);
      return friends.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * get all friend requests for auth user.
   */

  async getFriendsRequests() {
    try {
      const requests = await api.get(`/friends/un-accepted`);
      return requests.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * create Friendship between auth and another user.
   *  @param friend id
   */

  async create(friend_id) {
    try {
      return await api.post("/friends/create", { friend_id });
    } catch (error) {
      handleError(error);
    }
  }

  async getFriendshipById(friendship_id) {
    try {
      const friendship = await api.post("/friends/show", { friendship_id });
      return friendship.data;
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * accept Friendship.
   *  @param  Friendship id
   */

  async accept(friendship_id) {
    try {
      const friendship = await api.get(`/friends/accept/${friendship_id}`);
      return friendship.data;
    } catch (error) {
      handleError(error);
    }
  }
  /**
   * accept All.
   */
  async acceptAll() {
    try {
      const friends = await api.get(`/friends/accept-all`);
      return friends.data;
    } catch (error) {
      handleError(error);
    }
  }

  /**
s   */
  async deleteAllUnAccepted() {
    try {
      const friends = await api.get(`/friends/delete-all-unaccepted`);
      return friends.data;
    } catch (error) {
      handleError(error);
    }
  }
  /**
   * delete Friendship between 2 users.
   *  @param  user id, friend id
   */

  async delete(user_id, friend_id) {
    const pivot = new FormData();
    pivot.append("user_id", user_id);
    pivot.append("friend_id", friend_id);
    try {
      const response = await api.post(`/friends/delete`, pivot);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new FriendService();
