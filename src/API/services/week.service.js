import { handleError } from "vue";
import { api } from "../Intercepter";

class Week {
  constructor() {
    this.prefix = "weeks";
  }

  async getWeeks(limit) {
    try {
      const response = await api.get(`${this.prefix}/get-weeks/${limit}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  async getNextWeekTitles(limit) {
    try {
      const response = await api.get(`${this.prefix}/get-next-weeks-title/${limit}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new Week();
