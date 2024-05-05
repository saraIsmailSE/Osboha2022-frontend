import { api } from "../Intercepter";

class AmbassadorsRequest {
    constructor() {
        this.prefix = "ambassadors-request";
    }

    async checkAmbassador(user_id) {
        try {
            const response = await api.get(`${this.prefix}/check-ambassador/${user_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }


    async create(ambassador_request) {
        try {
            const response = await api.post(`${this.prefix}/create`, ambassador_request, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

    async show(id) {
        try {
            const response = await api.get(`${this.prefix}/show/${id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

    async latestGroupRequest(group_id){
        try {
            const response = await api.get(`${this.prefix}/latest-group-request/${group_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

    async allocateAmbassador(leader_gender,user_id=''){
        try {
            const response = await api.get(`${this.prefix}/allocate-ambassador/${leader_gender}/${user_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

    async getRequests(name, page, retrieveType,is_done) {
        try {
            const groups = await api.get(
            `${this.prefix}/list-requests/${retrieveType}/${is_done}/${name}?page=${page}`,
            );
            return await groups.data;
        } catch (error) {
            return error;
        }
    }

}

export default new AmbassadorsRequest()