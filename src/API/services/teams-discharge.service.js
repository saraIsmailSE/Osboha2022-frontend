import { api } from "../Intercepter";

class TeamsDischarge {
    constructor() {
        this.prefix = "teams-discharge";
    }

    async discharge(dischargeForm) {
        try {
            const response = await api.post(`${this.prefix}/discharge`, dischargeForm, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            return error;
        }
    }


}

export default new TeamsDischarge()