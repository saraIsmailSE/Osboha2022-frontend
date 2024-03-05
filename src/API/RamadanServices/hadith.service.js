import { api } from "../Intercepter";

class HadithServices {
    constructor() {
        this.prefix = "ramadan-hadith";
    }

    async store(form, submit_type)
    {
        try {
            let hadith = "";
            const formData = new FormData();


            if(submit_type == 'redo'){
                hadith = form.hadith_redo
            }
            else{
                hadith = form.hadith_1
            }
            formData.append("hadith", hadith);

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
    async show(ramadan_day_id) {
        try {
            const response = await api.get(`${this.prefix}/show/${ramadan_day_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
}
export default new HadithServices();
