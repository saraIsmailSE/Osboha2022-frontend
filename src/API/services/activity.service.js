import { api } from "../Intercepter";

class ActivityService {
    async getAllActivities(){
        try{
            const activities = await api.get('/activity');
            return activities.data;
        }catch(error){
            return error;
        }
    }

    async create(name, version) {
        try{
            return await api.post('/activity/create', {name, version});
        }catch(error){
            return error;
        }
    }

    async getActivityById(activity_id) {
        try {
            const activity = await api.post('/activity/show', {activity_id});
            return activity.data;
        }catch(error){
            return error;
        }
    }

    async updateActivityById(activity_id, name, version){
        try{
            const activity = await api.post('/activity/update', {activity_id, name, version});
            return activity.data;
        }catch(error){
            return error;
        }
    }

    async deleteActivityById(activity_id){
        try{
            const activity = await api.post('/activity/delete', {activity_id});
            return activity.data;
        }catch(error){
            return error;
        }
    }
}

export default new ActivityService();