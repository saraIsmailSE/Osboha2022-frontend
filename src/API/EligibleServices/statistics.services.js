import { api } from "../Intercepter";

class statisticsServices {
  constructor() {
    this.prefix = "eligible-statistics";
  }

  async myTeam(week_id) {
    try {
      const response = await api.get(`${this.prefix}/my-team/${week_id}`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
}
export default new statisticsServices();
