import { api } from "../Intercepter";

class HadithServices {
    constructor() {
        this.prefix = "ramadan-hadith";
    }

    async get() {
        try {
            const response = await api.get(`${this.prefix}/`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
    async getHadithByDay(day_id) {
        try {
            const response = await api.get(`${this.prefix}/days/${day_id}`);
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
}
export default new HadithServices();
