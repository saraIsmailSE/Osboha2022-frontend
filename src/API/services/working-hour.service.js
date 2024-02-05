import { handleError } from "vue";
import { api } from "../Intercepter";

class WorkingHour {
  constructor() {
    this.prefix = "working-hours";
  }

  async addWorkingHours(working_hours) {
    try {
      const response = await api.post(`${this.prefix}`, {
        working_hours,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getWorkingHours() {
    try {
      const response = await api.get(`${this.prefix}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getWorkingHoursStatistics(type = "", selectedDate = "") {
    try {
      const response = await api.get(
        `${this.prefix}/statistics?type=${type}&date=${selectedDate}`,
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new WorkingHour();
