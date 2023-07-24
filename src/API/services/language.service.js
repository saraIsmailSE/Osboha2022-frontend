import { api } from "../Intercepter";

class LanguageService {
  async getAll() {
    try {
      const sections = await api.get(`language`);
      return sections.data.data;
    } catch (error) {
      return error;
    }
  }
}

export default new LanguageService
