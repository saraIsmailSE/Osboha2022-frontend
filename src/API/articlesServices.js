import { api } from "./Intercepter";

//asmaa 220909
export default {
  getAllArticles() {
    const articles = api.get("article/");
    return articles;
  },
};
