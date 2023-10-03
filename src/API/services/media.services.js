import { baseURL } from "../Intercepter";
import { api } from "../Intercepter";

class MediaService {
  show(id) {
    const url = `${baseURL}/media/show/${id}`;
    return url;
  }
  async upload(data) {
    const formData = new FormData();
    if (data.image) formData.append("image", data.image);

    try {
      const response = await api.post("/media/upload", formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MediaService();
