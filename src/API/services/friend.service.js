import { api } from "../Intercepter";

class FriendService {
    async getAllFriends(user_id) {
        try {
            const friends = await api.get(`/friend/accepted/${user_id}`);
            return friends.data.data;
        } catch (error) {
            return error;
        }
    }
    async getFriendsRequests() {
        try {
            const requests = await api.get(`/friend/un-accepted`);
            return requests.data.data;
        } catch (error) {
            return error;
        }
    }
  }

    async create(friend_id) {
        try {
            return await api.post('/friend/create', { friend_id })
        } catch (error) {
            return error;
        }
    }
  }

    async getFriendshipById(friendship_id) {
        try {
            const friendship = await api.post('/friend/show', { friendship_id })
            return friendship.data;
        } catch (error) {
            return error;
        }
    }
    async accept(pivotData) {
        const pivot = new FormData();
        pivot.append("user_id", pivotData.user_id);
        pivot.append("friend_id", pivotData.friend_id);
        try {
            const response = await api.post(`/friend/accept`, pivot);
            return response.data;
        } catch (error) {
            return error;
        }
    }
  }


    async delete(pivotData) {
        const pivot = new FormData();
        pivot.append("user_id", pivotData.user_id);
        pivot.append("friend_id", pivotData.friend_id);
        try {
            const response = await api.post(`/friend/delete`, pivot);
            return response.data;
        } catch (error) {
            return error;
        }
    }
  }
}

export default new FriendService();
