import { api } from "../Intercepter";

class GroupTypeService {
    async getAllGroupTypes() {
        try{
            const groupTypes = await api.get('/group-type');
            return groupTypes.data;
        }catch(error){
            return error;
        }
    }

    async create(type){
        try{
            const groupType = await api.post('/group-type/create', {type});
            return groupType.data;
        }catch(error){
            return error;
        }
    }

    async getGroupTypeById(id){
        try{
            const groupType = await api.post('/group-type/show', {id});
            return groupType.data;
        }catch(error){
            return error;
        }
    }

    async updateGroupTypeById(id, type){
        try{
            const groupType = await api.post('/group-type/update', {id, type});
            return groupType.data;
        }catch(error){
            return error;
        }
    }

    async deleteGroupTypeById(id){
        try{
            const groupType = await api.post('/group-type/delete', {id});
            return groupType.data;
        }catch(error){
            return error;
        }
    }
}

export default new GroupTypeService()