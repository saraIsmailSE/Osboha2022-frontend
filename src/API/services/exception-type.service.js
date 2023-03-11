import { api } from "../Intercepter";

class ExceptionTypeService {
    async create(type) {
        try{
            return await api.post('/exception-type/create', {type})
        }catch(error){
            throw error(error);
        }
    }

    async getAllExceptionTypes(){
        try {
            const exceptionTypes = await api.get('/exception-type');
            return exceptionTypes.data.data;
        }catch(error){
            return error
        }
    }

    async getExceptionTypeById(id){
        try{
            const exceptionType = await api.post('/exception-type/show', {id});
            return exceptionType.data;
        }catch(error){
            return error;
        }
    }

    async updateExceptionTypeById(id, type){
        try{
            return await api.post('/exception-type/update', {id, type});
        }catch(error){
            return error;
        }
    }

    async deleteExceptionTypeById(id){
        try{
            return await api.post('/exception-type/delete', {id});
        }catch(error){
            return error;
        }
    }
}

export default new ExceptionTypeService()