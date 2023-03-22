import { api } from "../Intercepter";

class SocialMedia {
  async getByUserId(user_id) {
    try {
      const socialMedia = await api.get(`socialMedia/show/${user_id}`);
      return socialMedia.data.data;
    } catch (error) {
      return error;
    }
  }
  async add(socialMediaForm) {
    try {
      const response = await api.post(`/socialMedia/add-social-media`, socialMediaForm, {
        headers: { "Content-type": "multipart/form-data" },
    });

      return response.data.data;
    } catch (error) {
      return error;
    }
  }

}

export default new SocialMedia();