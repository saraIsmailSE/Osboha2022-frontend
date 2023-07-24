import { api } from "../Intercepter";

class BookLevel {
  async getAll() {
    try {
      const sections = await api.get(`book-level`);
      return sections.data.data;
    } catch (error) {
      return error;
    }
  }
}

export default new BookLevel
