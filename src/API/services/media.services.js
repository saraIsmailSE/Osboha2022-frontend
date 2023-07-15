import { baseURL } from "../Intercepter";

class MediaService {
  show(id) {
    const url = `${baseURL}/media/show/${id}`;
    return url;
  }
}

export default new MediaService();
