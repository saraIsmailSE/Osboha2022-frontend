import { handleError } from "vue";
import { api } from "../Intercepter";

class StatisticsService {
  constructor() {
    this.prefix = "statistics";
  }

  async byWeek(week_id = 0) {
    try {
      const response = await api.get(`/${this.prefix}/by-week/${week_id}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  async lastWeek() {
    try {
      const response = await api.get(`/${this.prefix}/last-week/`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  async supervisingStatistics(supervisingGroupID) {
    try {
      const response = await api.get(`/${this.prefix}/supervising-statistics/${supervisingGroupID}`);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new StatisticsService();
