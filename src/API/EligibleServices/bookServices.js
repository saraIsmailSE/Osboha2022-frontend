import { eligibleApi } from "../Intercepter"
import userInfoService from "@/Services/userInfoService";
export default {
  getGeneralStatistics: async (id) => {
    const response = await eligibleApi.get(`userbook/general-statistics/`)  
     
    return response.data.data;
  },
  checkAchievement: async (id) => {
    const response = await eligibleApi.get(`books/check-achievement/${id}`)  
    return response.data.data;

  },

  async updateBook(book,id){
    const res = await eligibleApi.patch(`books/${id}`,book);
    return res.data.data;
  },
  getBookByName : async (name) => {
    const books = await eligibleApi.get(`books/by-name/${name}`);
    return books.data.data;

  },

  getStatistics: async (id) => {
    const response = await eligibleApi.get(`userbook/statistics/${id}`)  
    return response.data.data;

  },
  getBook : async (id) => {
    const books = await eligibleApi.get(`books/${id}`);
    return books.data.data;

  },
  getUserBook : async (id) => {
      const books = await eligibleApi.get(`books/user-book/${id}`);
    
      return books.data.data;
  
    },
    getAllUserBooks : async (id) => {
      const books = await eligibleApi.get(`books/user`);
    
      return books.data.data;
  
    },
    getAllBooks : async (page) => {
      const books = await eligibleApi.get(`books?page=` + page);
    
      return books.data.data;
  
    },
    acceptThesis(id) {
    const response = eligibleApi.post("/thesises/audit", {
      id: id,
      status: 'review',
      auditor_id:userInfoService.getUser().id
    })  
    return response;
  },
  rejectThesis(id,note) {
    const response = eligibleApi.post("/thesises/audit", {
      id: id,
      status: 'rejected',
      auditor_id:userInfoService.getUser().id,
      reviews:note
    })  
    return response;
  },


  async addBook(book){
    const response = await eligibleApi.post('books',book);
    return response;
  }
,
  async deleteBook(id){
    const res = await eligibleApi.delete(`books/${id}`);
    return res;
  }
}

