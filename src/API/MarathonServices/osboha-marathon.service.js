import { api } from "../Intercepter";

class GoldenDaysServices {
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
            const response = await api.get(`${this.prefix}/end-marathon/${marathon_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
}
export default new GoldenDaysServices();
