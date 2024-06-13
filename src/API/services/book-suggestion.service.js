import { api } from "../Intercepter";

class BookSuggestion {
    constructor() {
        this.prefix = "book-suggestion";
    }

    async suggest(suggestionForm) {
        try {
            const response = await api.post(`${this.prefix}/create`, suggestionForm, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

    async updateStatus(bookForm) {
        try {
            const response = await api.post(`${this.prefix}/update-status`, bookForm, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

    async show(suggestion_id) {
        try {
            const response = await api.get(
            `${this.prefix}/show/${suggestion_id}`,
            );
            return await response.data.data;
        } catch (error) {
            return error;
        }
    }

    async listByStatus(page,status) {
        try {
            const response = await api.get(`${this.prefix}/list-by-status/${status}?page=` + page);
            return await response.data;
        } catch (error) {
            return error;
        }
    }

    async isAllowedToSuggest() {
        try {
            const response = await api.get(
            `${this.prefix}/is-allowed-to-suggest`,
            );
            return await response.data.data;
        } catch (error) {
            return error;
        }
    }
}

export default new BookSuggestion()