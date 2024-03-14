import { api } from "../Intercepter";

class HadithMemorizationServices {
    constructor() {
        this.prefix = "ramadan-hadith-memorization";
    }

    async store(form, submit_type)
    {
        try {
            let hadith = "";
            let hadith_2 = "";
            let redo= 0;
            const formData = new FormData();


            if(submit_type == 'redo'){
                hadith = form.hadith_redo
                hadith_2 = form.hadith_redo
                redo=1;
            }
            else{
                hadith = form.hadith_1
                hadith_2 = form.hadith_2
            }
            formData.append("ramadan_hadiths_id", form.ramadan_hadiths_id);
            formData.append("hadith_memorize", hadith);
            formData.append("hadith_memorize_2", hadith_2);
            formData.append("redo", redo);

            const response = await api.post(`${this.prefix}`, formData, {
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
    async show(hadith_memorization_id) {
        try {
            const response = await api.get(`${this.prefix}/show/${hadith_memorization_id}`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }
    async getMemorizedHadiths() {
        try {
            const response = await api.get(`${this.prefix}/pending`);
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

}
export default new HadithMemorizationServices();
