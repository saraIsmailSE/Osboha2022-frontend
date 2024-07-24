import { api } from "../Intercepter";

class MarathonPointsServices {
    constructor() {
        this.prefix = "marathon-points";
    }

    async getMarathonPoints(user_id, osboha_marthon_id) {
        try {
            const response = await api.get(`${this.prefix}/get-marathon-points/${user_id}/${osboha_marthon_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

    async getSpecificMarathonWeekPoints(user_id, osboha_marthon_id,week_id) {
        try {
            const response = await api.get(`${this.prefix}/get-specific-marathon-week-points/${user_id}/${osboha_marthon_id}/${week_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
    async addBonus(form) {
        try {

            let formData = new FormData();
            formData.append('user_id', form.user_id);
            formData.append('osboha_marthon_id', form.osboha_marthon_id);
            formData.append('bonus_type', form.bonus_type);
            formData.append('amount', form.amount);
            formData.append('eligible_book_avg', form.eligible_book_avg);

            const response = await api.post(`${this.prefix}/add-bonus`, formData, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
    async subtractPoints(form) {
        try {

            let formData = new FormData();
            formData.append('user_id', form.user_id);
            formData.append('osboha_marthon_id', form.osboha_marthon_id);
            formData.append('bonus_type', form.bonus_type);
            const response = await api.post(`${this.prefix}/subtract-bonus`, formData, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

    async getBonusPoints(user_id, osboha_marthon_id) {
        try {
            const response = await api.get(`${this.prefix}/get-points-bonus/${user_id}/${osboha_marthon_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
}
export default new MarathonPointsServices();
