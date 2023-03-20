import {api} from '../Intercepter'
class GroupService  {
    async createGroup(name, description, typeId, image){
        let formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('typeId', typeId);
        formData.append('image', image);
        try {
            const response = await api.post('/group/create', formData, {
                headers: {"Content-type": "multipart/form-data"},
            })
            return response.data
        }catch(error){
            return error;
        }
    }
    async getAll() {
        try{
            const groups =  await api.get('/group');
            return await groups.data;
        }catch(error){
            return error
        }
    }

    async getById(group_id) {
        try{
            const group = await api.get(`group/show/${group_id}`);
            return group.data.data;
        }catch(error){
            return error;
        }
    }

    async getBooks(group_id) {
        try{
            const books = await api.get(`group/books/${group_id}`);
            return books.data.data;
        }catch(error){
            return error;
        }
    }

    async getAllGroupExceptions(group_id) {
        try {
            const groupExceptions = await api.get(`group/groupExceptions/${group_id}`);
            return groupExceptions.data.data;
        } catch (error) {
            return error
        }
    }

    async deleteById(id) {
        try{
            return await api.post(`/group/delete`, {group_id: id});
        }catch(error){
            return error;
        }
    }

    async update(id) {
        // try{
        //     return await api.post(`/group/update`, id);
        // }catch(error){
        //     return error;
        // }
    }

    async getGroupByType(typeId){
        try{
            const groups =  await api.post('/group/GroupByType', {type_id: typeId});
            return groups.data
        }catch(error){
            return error
        }
    }
}

export default new GroupService()