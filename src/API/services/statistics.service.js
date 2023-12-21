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
  async leadersStatistics(supervisor_id) {
    try {
      const response = await api.get(
        `/${this.prefix}/leaders-statistics/${supervisor_id}`,
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async supervisorsStatistics(advisor_id) {
    try {
      const response = await api.get(
        `/${this.prefix}/supervisors-statistics/${advisor_id}`,
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async advisorsStatistics(consultant_id) {
    try {
      const response = await api.get(
        `/${this.prefix}/advisors-statistics/${consultant_id}`,
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async consultantsStatistics(admin_id) {
    try {
      const response = await api.get(
        `/${this.prefix}/consultant-statistics/${admin_id}`,
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
}
export default new StatisticsService();
