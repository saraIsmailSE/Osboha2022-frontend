import { api } from "../Intercepter";

class QuestionAnswersServices {
    constructor() {
        this.prefix = "ramadan-question-answer";
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
    async correct(form)
    {
        try {
            const response = await api.post(`${this.prefix}/correct`, form, {
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
    async show(ramadan_day_id) {
        try {
            const response = await api.get(`${this.prefix}/show/${ramadan_day_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

    async getPending(category) {
        try {
            const response = await api.get(`${this.prefix}/get-pending-questions/${category}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
}
export default new QuestionAnswersServices();
