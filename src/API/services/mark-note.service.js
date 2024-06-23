import { api } from "../Intercepter";

class MarkNote {
    constructor() {
        this.prefix = "mark-notes";
    }

    async create(note) {
        try {
            const response = await api.post(`${this.prefix}/create`, note, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

    async getNotes(mark_id) {
        try {
            const notes = await api.get(
            `${this.prefix}/get-notes/${mark_id}`,
            );
            return await notes.data.data;
        } catch (error) {
            return error;
        }
    }


}

export default new MarkNote()