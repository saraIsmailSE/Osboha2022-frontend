import { api } from "../Intercepter"

class ArticlesService {
  async getAll() {
    try{
      const articles = await api.get("article/");
      return articles.data.data;
    }catch(error){
      return error;
    }
  }
  async getOne(id) {
    try {
      const article = await api.get(`/article/${id}`);
      return article.data.data
    }catch(error){
      return error;
    }

  }
  updateArticle(id) {
    return true;
  }

}

export default new ArticlesService()