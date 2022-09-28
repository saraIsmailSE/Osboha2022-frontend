import { api } from "../Intercepter";

class HighPriorityRequest {
    async getAllHighPriorityRequests(){
        try{
            const highPriorities = await api.get('/high-priority-request');
            return highPriorities.data;
        }catch(error){
            return error;
        }
    }

    async create(request_id){
        try{
            const highPriorities = await api.post('/high-priority-request/create', {request_id});
            return highPriorities.data;
        }catch(error){
            return error;
        }
    }

    async getHightPriorityByRequestId(request_id){
        try{
            const highPriorities = await api.post('/high-priority-request/show', {request_id});
            return highPriorities.data;
        }catch(error){
            return error;
        }
    }
}

export default new HighPriorityRequest()