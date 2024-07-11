import { api } from "../Intercepter";
import { handleError } from "vue";

class RateService {
  constructor() {
    this.prefix = "rates";
  }

  async create(data) {
    const formData = new FormData();
    formData.append("rate", data.rate);
    if (data.post_id) formData.append("post_id", data.post_id);
    if (data.book_id) formData.append("book_id", data.book_id);
    if (data.comment_id) formData.append("comment_id", data.comment_id);
    if (data.body) formData.append("body", data.body);

    try {
      const response = await api.post(`/${this.prefix}`, formData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async update(data) {
    const formData = new FormData();
    formData.append("rate", data.rate);
    if (data.body) formData.append("body", data.body);

    try {
      const response = await api.post(
        `/${this.prefix}/${data.rate_id}`,
        formData,
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getBookRates(book_id, page) {
    try {
      const response = await api.get(
        `${this.prefix}/book/${book_id}?page=${page}`,
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getRateById(rate_id) {
    try {
      const response = await api.get(`${this.prefix}/${rate_id}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new RateService();
