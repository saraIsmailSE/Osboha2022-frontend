import { api } from "../Intercepter";
import { handleError } from "vue";

class ThesisService {
  async getThesisById(thesis_id) {
    try {
      const thesis = await api.get(`/theses/${thesis_id}`);
      return thesis.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getThesesByBookId(id, page) {
    try {
      const theses = await api.get(`/theses/book/${id}?page=${page}`);
      return theses.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getThesisByUser(id) {
    try {
      const thesis = await api.get(`/theses/user/${id}`);
      return thesis.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getThesisByWeek(id) {
    try {
      const thesis = await api.get(`/theses/week/${id}`);
      return thesis.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new ThesisService();
