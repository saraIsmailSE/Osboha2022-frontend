import { api } from "../Intercepter";

class FriendService {
    async getAllFriends(user_id){
        try{
            const friends = await api.get(`/friend/${user_id}`);
            return friends.data.data; 
        }catch(error){
            return error;
        }
    }
    async getFriendsRequests(user_id){
        try{
            const requests = await api.get(`/friend/un-accepted/${user_id}`);
            return requests.data.data; 
        }catch(error){
            return error;
        }
    }

    async create(friend_id){
        try {
            return await api.post('/friend/create', {friend_id})
        }catch(error){
            return error;
        }
    }

    async getFriendshipById(friendship_id){
        try{
            const friendship = await api.post('/friend/show', {friendship_id})
            return friendship.data;
        }catch(error){
            return error;
        }
    }

    async acceptFriendshipById(friendship_id){
        try{
            const friendship = await api.post('/friend/accept', {friendship_id})
            return friendship.data;
        }catch(error){
            return error;
        }
    }

    async deleteFriendshipById(friendship_id){
        try{
            const friendship = await api.post('/friend/delete', {friendship_id})
            return friendship.data;
        }catch(error){
            return error;
        }
    }
}

export default new FriendService();