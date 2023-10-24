import { handleError } from "vue";
import { api } from "../Intercepter";

class GeneralConversation {
  constructor() {
    this.prefix = "general-conversations";
  }

  async addQuestion(question) {
    const formData = new FormData();
    formData.append("question", question.question);

    if (question.media && question.media.length > 0) {
      for (let i = 0; i < question.media.length; i++) {
        formData.append("media[]", question.media[i]);
      }
    }

    try {
      const response = await api.post(`${this.prefix}/questions`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async addAnswer(answer) {
    const formData = new FormData();
    formData.append("answer", answer.answer);
    formData.append("question_id", answer.question_id);
    if (answer.image) formData.append("image", answer.image);

    try {
      const response = await api.post(`${this.prefix}/answers`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getQuestions(paeg) {
    try {
      const questions = await api.get(`${this.prefix}/questions?page=${paeg}`);
      return questions.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getQuestionById(questionId) {
    try {
      const question = await api.get(`${this.prefix}/questions/${questionId}`);
      return question.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getMyQuestions(page) {
    try {
      const questions = await api.get(
        `${this.prefix}/questions/my-questions?page=${page}`,
      );
      return questions.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getAssignedToMeQuestions(page) {
    try {
      const questions = await api.get(
        `${this.prefix}/questions/assigned-to-me?page=${page}`,
      );
      return questions.data;
    } catch (error) {
      handleError(error);
    }
  }

  async solveQuestion(questionId) {
    try {
      const response = await api.put(
        `${this.prefix}/questions/${questionId}/solve`,
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async closeQuestion(questionId) {
    try {
      const response = await api.put(
        `${this.prefix}/questions/${questionId}/close`,
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async assignToParent(questionId) {
    try {
      const response = await api.put(
        `${this.prefix}/questions/${questionId}/assign-to-parent`,
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getStatistics() {
    try {
      const response = await api.get(`${this.prefix}/questions/statistics`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async closeOverdueQuestions() {
    try {
      const response = await api.put(`${this.prefix}/questions/close-overdue`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async addWorkingHours(date, minutes) {
    try {
      const response = await api.post(`${this.prefix}/working-hours`, {
        date,
        minutes,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getWorkingHours() {
    try {
      const response = await api.get(`${this.prefix}/working-hours`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getWorkingHoursStatistics(selectedDate = "") {
    try {
      const response = await api.get(
        `${this.prefix}/working-hours/statistics?date=${selectedDate}`,
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new GeneralConversation();
