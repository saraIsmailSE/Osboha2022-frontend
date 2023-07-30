import { api } from "../Intercepter";
import { handleError } from "vue";

class RolesService {

  constructor() {
    this.prefix = "roles";
  }

  async assignRole(formData) {
    try {
      const response = await api.post(`${this.prefix}/assign-role`, formData);
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }
  

  async ChangeAdvisingTeam(formData) {
    try {
      const response = await api.post(`${this.prefix}/change-advising-team`, formData);
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }
  
  
}

export default new RolesService();
