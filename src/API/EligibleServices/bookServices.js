import { api } from "../Intercepter";
import userInfoService from "@/Services/userInfoService";

class bookServices {
  constructor() {
    this.prefix = "eligible-general-informations";
  }

  async getGeneralStatistics(id) {
    const response = await api.get(`userbook/general-statistics/`);

    return response.data.data;
  }
  async checkAchievement(id) {
    const response = await api.get(`books/check-achievement/${id}`);
    return response.data.data;
  }

  async updateBook(book, id) {
    const res = await api.patch(`books/${id}`, book);
    return res.data.data;
  }
  async getBookByName(name) {
    const books = await api.get(`books/by-name/${name}`);
    return books.data.data;
  }

  async getStatistics(id) {
    const response = await api.get(`userbook/statistics/${id}`);
    return response.data.data;
  }
  async getBook(id) {
    const books = await api.get(`books/${id}`);
    return books.data.data;
  }
  async getUserBook(id) {
    const books = await api.get(`books/user-book/${id}`);

    return books.data.data;
  }
  async getAllUserBooks(id) {
    const books = await api.get(`books/user`);

    return books.data.data;
  }
  async acceptThesis(id) {
    const response = api.post("/thesises/audit", {
      id: id,
      status: "review",
      auditor_id: userInfoService.getUser().id,
    });
    return response;
  }
  async rejectThesis(id, note) {
    const response = api.post("/thesises/audit", {
      id: id,
      status: "rejected",
      auditor_id: userInfoService.getUser().id,
      reviews: note,
    });
    return response;
  }

  async addBook(book) {
    const response = await api.post("books", book);
    return response;
  }
  async deleteBook(id) {
    const res = await api.delete(`books/${id}`);
    return res;
  }
}

export default new bookServices();
