import { api } from "../Intercepter";
import store from '../../store';

class questionServices {
  constructor() {
    this.prefix = "eligible-questions";
  }

  async addQuestion(question) {
    const response = await api.post(`${this.prefix}`, question);
    return response.data.data;
  }

  async getQuestions(id) {
    const questions = await api.get(`${this.prefix}/user-book/${id}`);

    return questions.data.data;
  }

  async addDegree(id, note, mark) {
    const response = await api.patch(`${this.prefix}/add-degree/${id}`, {
      auditor_id: store.getters.getUser.id,
      reviews: note,
      degree: mark,
    });
    console.log(response);
    return response;
  }
  async deleteQuestion(id) {
    const response = await api.delete(`${this.prefix}/${id}`);
    return response;
  }
  async getByStatus(status) {
    const response = await api.get(`${this.prefix}/status/${status}`);
    response.data;
    return response.data.data;
  }
  async getByUserBook(user_book_id) {
    const response = await api.get(
      `${this.prefix}/user_book_id/${user_book_id}`,
    );
    response.data;
    return response.data.data;
  }
  async acceptQuestion(id, status) {
    let questionId,
      user_book_id = null;
    if (status == "accept") {
      questionId = id;
    } else if (status == "audit") {
      user_book_id = id;
    }

    const response = api.post(`${this.prefix}/review`, {
      id: questionId,
      user_book_id: user_book_id,
      status: status,
      reviewer_id: store.getters.getUser.id,
    });
    return response;
  }
  rejectRetardThesis(id, note, status) {
    const response = api.post(`${this.prefix}/review`, {
      id: id,
      status: status,
      reviewer_id: store.getters.getUser.id,
      reviews: note,
    });
    return response;
  }

  async updateQuestion(question, id) {
    const response = await api
      .patch(`${this.prefix}/${id}`, question, {})
      .catch((error) => {
        console.log(error);
      });
    return response.data.data;
  }
  async reviewQuestion(id) {
    const res = await api
      .patch(`${this.prefix}/review-question/${id}`)
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
  async getByBook(bookID) {
    const response = await api.get(`${this.prefix}/book/${bookID}`);
    response.data;
    return response.data.data;
  }
}
export default new questionServices();
