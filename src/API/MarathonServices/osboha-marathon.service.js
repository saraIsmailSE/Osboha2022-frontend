import { api } from "../Intercepter";

class OsbohaMarathonServices {
    constructor() {
        this.prefix = "osboha-marathon";
    }

    async getCurrentMarathon() {
        try {
            const response = await api.get(`${this.prefix}/current-marathon`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
    async show(marathon_id) {
        try {
            const response = await api.get(`${this.prefix}/show/${marathon_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
    async createMarthon(form) {
        try {
            let formData = new FormData();
            formData.append('marathon_title', form.marathon_title);
            formData.append('marathon_id', form.marathon_id);
            form.weeks_key.forEach((weekKey, index) => {
                formData.append(`weeks_key[${index}]`, weekKey);
            });

            const response = await api.post(`${this.prefix}/create_marthon`, formData, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
    async endMarathon(marathon_id) {
        try {
            const response = await api.get(`${this.prefix}/end-marathon/${marathon_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
}
export default new OsbohaMarathonServices();
