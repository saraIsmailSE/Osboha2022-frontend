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
  async supervisorsSwap(formData) {
    try {
      const response = await api.post(`${this.prefix}/supervisors-swap`, formData);
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }

  
  async newSupervisor_currentToAmbassador(formData) {
    try {
      const response = await api.post(`${this.prefix}/new-supervisor-current-to-ambassador`, formData);
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }

  
  async newSupervisor_currentToLeader(formData) {
    try {
      const response = await api.post(`${this.prefix}/new-supervisor-current-to-leader`, formData);
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }

  
  async newSupervisor_currentTo_is_hold(formData) {
    try {
      const response = await api.post(`${this.prefix}/new-supervisor-current-to-is-hold`, formData);
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }
ld
  async transferAmbassador(formData) {
    try {
      const response = await api.post(`${this.prefix}/transfer-ambassador`, formData);
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }

  

  

  
  
  
}

export default new RolesService();
