import { api } from "../Intercepter";

class goldenDaysServices {
    constructor() {
        this.prefix = "ramadan-golden-day";
    }

    async store(form) {
        try {
            const response = await api.post(`${this.prefix}/store`, form, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
    async statistics(ramadan_day_id) {
        try {
            const response = await api.get(`${this.prefix}/statistics/${ramadan_day_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
}
export default new goldenDaysServices();
