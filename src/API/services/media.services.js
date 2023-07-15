import { baseURL } from "../Intercepter";

class MediaService {
  show(id) {
    const url = `${baseURL}/media/show/${id}`;
    console.log(url)
    return url;
  }
}

export default new MediaService();
