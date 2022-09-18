import { api } from "../Intercepter"

class ArticlesService {
  async create(title, postId, section){
    try{
      return api.post('/article/create', {title, post_id: postId, section});
    }catch(error){
      return error
    }
  }
  async getAll() {
    try{
      const articles = await api.get("/article");
      return articles.data;
    }catch(error){
      return error;
    }
  }
  async getOne(id) {
    try {
      const article = await api.post(`/article/show`, {article_id: id});
      return article.data
    }catch(error){
      return error;
    }
  }

  async deleteById(id) {
    try {
      return await api.post(`/article/delete`, {article_id: id});
    }catch(error){
      return error;
    }
  }

  async getArticlesByUserId(id) {
    try {
      const articles = await api.post(`/article/articles-by-user`, {user_id: id});
      return articles.data;
    }catch(error){
      return error;
    }
  }
  
  updateArticle(id) {
    return true;
  }

}

export default new ArticlesService()