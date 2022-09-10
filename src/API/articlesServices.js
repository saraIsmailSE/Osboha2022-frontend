import { api } from "./Intercepter"

export default {
  getAll: async () => {

    const articles = await api.get("article/");
    (articles.data)
    return articles.data.data;
  },
  getOne() {
    return true;

  },
  updateArticle(id) {
    return true;

  },

}

