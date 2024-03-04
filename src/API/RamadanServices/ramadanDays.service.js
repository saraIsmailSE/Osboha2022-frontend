import { api } from "../Intercepter";

class RamadanServices {
    constructor() {
        this.prefix = "ramadan-day";
    }

    async all() {
        try {
            const response = await api.get(`${this.prefix}/all`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
    async current() {
        try {
            const response = await api.get(`${this.prefix}/current`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
    async previous() {
        try {
            const response = await api.get(`${this.prefix}/previous`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
}

export default new RamadanServices();
