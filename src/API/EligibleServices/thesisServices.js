import { api } from "../Intercepter";
import userInfoService from "@/Services/userInfoService";
class ThesesServices {
  constructor() {
    this.prefix = "eligible-theses";
  }

  async createThesis(thesis, userbook_id) {
    let formData = new FormData();
    formData.append("thesis_text", thesis.text);
    formData.append("ending_page", thesis.pageEnd);
    formData.append("starting_page", thesis.pageStart);
    formData.append("eligible_user_books_id", userbook_id);
    formData.append("images[]", thesis.image_1);
    const response = await api
      .post(`${this.prefix}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }


  async reviewThesis(id) {
    const res = await api.patch(`${this.prefix}/review-thesis/${id}`);
  }
  async deleteThesis(id) {
    const response = api.delete(`${this.prefix}/${id}`);
    return response;
  }
  async acceptThesis(id, status) {
    let thesisId,
      eligible_user_books_id = null;
    if (status == "accept") {
      thesisId = id;
    } else if (status == "audit") {
      eligible_user_books_id = id;
    }
    const response = api.post("${this.prefix}/review", {
      id: thesisId,
      eligible_user_books_id: eligible_user_books_id,
      status: status,
      reviewer_id: userInfoService.getUser().id,
    });
    return response;
  }
  async rejectRetardThesis(id, note, status) {
    const response = api.post("${this.prefix}/review", {
      id: id,
      status: status,
      reviewer_id: userInfoService.getUser().id,
      reviews: note,
    });
    return response;
  }
  async addDegree(id, note, mark) {
    const response = api.patch(`${this.prefix}/add-degree/${id}`, {
      auditor_id: userInfoService.getUser().id,
      reviews: note,
      degree: mark,
    });
    return response;
  }
  async updateThesis(thesis, id) {
    const response = await api
      .patch(`${this.prefix}/${id}`, thesis)
      .catch((error) => {
        console.log(error);
      });
    return response;
  }
  async getById(id) {
    const response = await api.get(`${this.prefix}/${id}`);

    return response.data.data;
  }
  async getByBook(bookID) {
    const thesis = await api.get(`${this.prefix}/book/${bookID}`);
    return thesis.data.data;
  }
  async getByUserBookStatus(status) {
    const thesis = await api.get(`${this.prefix}/by-status/${status}`);
    thesis.data;
    return thesis.data.data;
  }
  async getByUserBook(eligible_user_books_id, status) {
    const thesis = await api.get(
      `${this.prefix}/eligible_user_books_id/${eligible_user_books_id}&${status}`,
    );
    thesis.data;
    return thesis.data.data;
  }
  async deletePhoto(id) {
    const response = await api.delete(`${this.prefix}/photo/${id}`);
  }

  async getPhotosCount(eligible_user_books_id) {
    const response = await api.get(
      `${this.prefix}/photo-count/${eligible_user_books_id}`,
    );
    return response.data.data;
  }

  async uploadPhoto(image, id) {
    let formData = new FormData();

    formData.append("image", image);
    const response = await api
      .post(`${this.prefix}/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }
}
export default new ThesesServices();
