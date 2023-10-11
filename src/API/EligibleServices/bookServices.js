import { api } from "../Intercepter"
import userInfoService from "@/Services/userInfoService";
export default {
  getGeneralStatistics: async (id) => {
    const response = await api.get(`userbook/general-statistics/`)  
     
    return response.data.data;
  },
  checkAchievement: async (id) => {
    const response = await api.get(`books/check-achievement/${id}`)  
    return response.data.data;

  },

  async updateBook(book,id){
    const res = await api.patch(`books/${id}`,book);
    return res.data.data;
  },
  getBookByName : async (name) => {
    const books = await api.get(`books/by-name/${name}`);
    return books.data.data;

  },

  getStatistics: async (id) => {
    const response = await api.get(`userbook/statistics/${id}`)  
    return response.data.data;

  },
  getBook : async (id) => {
    const books = await api.get(`books/${id}`);
    return books.data.data;

  },
  getUserBook : async (id) => {
      const books = await api.get(`books/user-book/${id}`);
    
      return books.data.data;
  
    },
    getAllUserBooks : async (id) => {
      const books = await api.get(`books/user`);
    
      return books.data.data;
  
    },
    getAllBooks : async (page) => {
      const books = await api.get(`books?page=` + page);
    
      return books.data.data;
  
    },
    acceptThesis(id) {
    const response = api.post("/thesises/audit", {
      id: id,
      status: 'review',
      auditor_id:userInfoService.getUser().id
    })  
    return response;
  },
  rejectThesis(id,note) {
    const response = api.post("/thesises/audit", {
      id: id,
      status: 'rejected',
      auditor_id:userInfoService.getUser().id,
      reviews:note
    })  
    return response;
  },


  async addBook(book){
    const response = await api.post('books',book);
    return response;
  }
,
  async deleteBook(id){
    const res = await api.delete(`books/${id}`);
    return res;
  }
}

