import { api } from "../../Intercepter"
export default {
    resetPassword: async (password, email, token) => {
        let resetData = new FormData();
        resetData.append("password", password);
        resetData.append("email", email);
        resetData.append("token", token);
        try {
            const response = await api.post("password/reset", resetData)
            return response.data
        }
        catch (error) {
            return error.response;
        }

    },
    forgetPassword: async (email) => {
        try {
            const response = await api.post("password/forgot-password", {
                email: email
            })
            return response.data

        } catch (error) {
            return error.response;
        }
    },


}

