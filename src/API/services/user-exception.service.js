import { api } from "../Intercepter";

class ExceptionService {
    async create(exception) {
        try {
            const response = await api.post(`/userexception/create`, exception, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data.data
        } catch (error) {
            return error;
        }
    }

    async getExceptionById(exception_id) {
        try {
            const exception = await api.get(`userexception/show/${exception_id}`);
            return exception.data.data;
        } catch (error) {
            return error;
        }
    }

    async updateExceptionTypeById(id, type) {
        try {
            return await api.post('/userexception/update', { id, type });
        } catch (error) {
            return error;
        }
    }

    async deleteExceptionTypeById(id) {
        try {
            return await api.post('/userexception/delete', { id });
        } catch (error) {
            return error;
        }
    }
}

export default new ExceptionService()