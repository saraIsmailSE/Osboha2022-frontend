import { api } from "../Intercepter"
import tokenService from "./token.service";

class RoomService {
    async create(name, type, messages_status){
        try{
            const creator_id = tokenService.getUser().id;
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