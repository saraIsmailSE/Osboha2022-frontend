import { api } from "../Intercepter";

class SectionService {
  async getAll() {
    try {
      const sections = await api.get(`section`);
      return sections.data;
    } catch (error) {
      return error;
    }
  }
}

export default new SectionService
