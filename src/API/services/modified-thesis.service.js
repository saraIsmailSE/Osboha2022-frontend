import { api } from "../Intercepter";
import { handleError } from "vue";

class ModifiedThesisService {
  async create(data) {
    const formData = new FormData();
    if (data.reason_id !== null)
      formData.append("modifier_reason_id", data.reason_id);
    formData.append("thesis_id", data.thesis_id);
    formData.append("status", data.status);
    formData.append("week_id", data.week_id);
    if (data.modified_thesis_id) {
      formData.append("modified_thesis_id", data.modified_thesis_id);
    }
    try {
      const response = await api.post("/modified-theses", formData);
      return response.data;
    } catch (e) {
      handleError(e);
    }
  }
}

export default new ModifiedThesisService();
