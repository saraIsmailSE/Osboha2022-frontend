import { api } from "../Intercepter";

class QuestionsServices {
    constructor() {
        this.prefix = "ramadan-question";
    }

    async getQuestionsByDay(ramadan_day_id){
        try {
            const response = await api.get(`${this.prefix}/day/${ramadan_day_id}`);
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
export default new QuestionsServices();
