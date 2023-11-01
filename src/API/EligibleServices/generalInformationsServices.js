import { api } from "../Intercepter";
import userInfoService from "@/Services/userInfoService";

class generalInformationsServices {
  constructor() {
    this.prefix = "eligible-general-informations";
  }
  async getByStatus(status) {
    const general_informations = await api.get(
      `${this.prefix}/status/${status}`,
    );
    return general_informations.data.data;
  }
  async getByUserBook(user_book_id) {
    const general_informations = await api.get(
      `${this.prefix}/user_book_id/${user_book_id}`,
    );
    general_informations.data;
    return general_informations.data.data;
  }
  async getByBook(bookID) {
    const general_informations = await api.get(`${this.prefix}/book/${bookID}`);
    general_informations.data;
    return general_informations.data.data;
  }

  async addDegree(id, note, mark) {
    const response = await api.patch(`${this.prefix}/add-degree/${id}`, {
      auditor_id: userInfoService.getUser().id,
      reviews: note,
      degree: mark,
    });
    return response;
  }
  async getGeneralInformations(id) {
    const generalInformations = await api.get(
      `${this.prefix}/user_book_id/${id}`,
    );
    return generalInformations.data.data;
  }
  async addGeneralInformations(data) {
    const response = await api.post(`${this.prefix}/`, data);
    return response.data.data;
  }
  async updateGeneralInformations(data, id) {
    const response = await api.patch(`${this.prefix}/${id}`, data);
    return response.data.data;
  }
  async acceptGeneralInformations(id) {
    const response = await api.post(`${this.prefix}/review`, {
      id: id,
      status: "audit",
      reviewer_id: userInfoService.getUser().id,
    });
    return response;
  }
  async rejectRetardGeneralInformations(id, note, status) {
    const response = await api.post(`${this.prefix}/review`, {
      id: id,
      status: status,
      reviewer_id: userInfoService.getUser().id,
      reviews: note,
    });
    return response;
  }
  async deleteGeneralInformation(id) {
    const response = await api.delete(`${this.prefix}/${id}`);
    return response;
  }
  async reviewGeneralInformation(id) {
    const res = await api
      .patch(`${this.prefix}/review-general-informations/${id}`)
      .catch((e) => {
        // error = e.response.data.message;
        e;
      })
      .then((e) => e);
    // return {data:res.data,error}
  }
  async getById(id) {
    const response = await api.get(`${this.prefix}/${id}`);
    response.data;
    return response.data.data;
  }
}
export default new generalInformationsServices();
