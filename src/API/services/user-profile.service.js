import { api } from "../Intercepter";

class UserProfile {
  async getUserProfileById(user_id) {
    try {
      const profile = await api.get(`user-profile/show/${user_id}`);
      return profile.data.data;
    } catch (error) {
      return error;
    }
  }
  async getUserProfileToUpdate(user_id) {
    try {
      const profile = await api.get(`user-profile/showToUpdate/${user_id}`);
      return profile.data.data;
    } catch (error) {
      return error;
    }
  }

  async update(updateInfoForm) {
    try {
      const response = await api.post(`/user-profile/update`, updateInfoForm, {
        headers: { "Content-type": "multipart/form-data" },
    });

      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  async getProfileStatistics(user_id) {
    try {
      const statistics = await api.get(`user-profile/statistics/${user_id}`);
      return statistics.data.data;
    } catch (error) {
      return error;
    }
  }


}

export default new UserProfile();