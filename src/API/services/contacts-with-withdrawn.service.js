import { api } from "../Intercepter";

class ContactsWithWithdrawn {
    constructor() {
        this.prefix = "Contacts-with-withdrawn";
    }

    async sendEmail(emailForm) {
        try {
            const response = await api.post(`${this.prefix}/send-email`, emailForm, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

    async updateContactStatus(contactForm) {
        try {
            const response = await api.post(`${this.prefix}/update-contact-status`, contactForm, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data.data;
        } catch (error) {
            return error;
        }
    }

    async showByUserID(user_id) {
        try {
            const response = await api.get(
            `${this.prefix}/contact_has_been_made/${user_id}`,
            );
            return await response.data.data;
        } catch (error) {
            return error;
        }
    }

}

export default new ContactsWithWithdrawn()