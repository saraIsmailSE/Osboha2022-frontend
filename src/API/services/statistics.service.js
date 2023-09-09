import { handleError } from "vue";
import { api } from "../Intercepter";

class StatisticsService {
  async byWeek(week_id = 0) {
    try {
      const response = await api.get(`/statistics/by-week/${week_id}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  async lastWeek() {
    try {
      const response = await api.get(`/statistics/last-week/`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new StatisticsService();
