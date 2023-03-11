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

    async getAllExceptionTypes() {
        try {
            const exceptionTypes = await api.get('/userexception');
            return exceptionTypes.data.data;
        } catch (error) {
            return error
        }
    }

    async getExceptionTypeById(id) {
        try {
            const exceptionType = await api.post('/userexception/show', { id });
            return exceptionType.data;
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