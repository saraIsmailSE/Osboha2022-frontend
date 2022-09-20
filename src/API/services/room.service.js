import { api } from "../Intercepter"

class RoomService {
    async create(name, type, messages_status, creator_id){
        try{
            return api.post('/room/create', {name, type, messages_status, creator_id});
        }catch(error){
            return error;
        }
    }

    async addUserToGroup(user_id, group_id){
        try{
            return api.post('/group/addUserToRoom', {user_id, group_id})
        }catch(error){
            return error;
        }
    }
}