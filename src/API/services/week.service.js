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
}

export default new Week();
