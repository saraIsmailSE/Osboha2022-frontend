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
    if (answer.is_discussion)
      formData.append("is_discussion", parseInt(answer.is_discussion));
    else formData.append("is_discussion", 0);
    if (answer.discussion_type)
      formData.append("discussion_type", answer.discussion_type);

    if (answer.media && answer.media.length > 0) {
      answer.media.forEach((element) => {
        formData.append("media[]", element);
      });
    }

    try {
      const response = await api.post(`${this.prefix}/answers`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getAllQuestions(page) {
    try {
      const questions = await api.get(`${this.prefix}/questions?page=${page}`);
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

  async getMyActiveQuestions(page) {
    try {
      const questions = await api.get(
        `${this.prefix}/questions/my-active-questions?page=${page}`,
      );
      return questions.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getMyLateQuestions(page) {
    try {
      const questions = await api.get(
        `${this.prefix}/questions/my-late-questions?page=${page}`,
      );
      return questions.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getDiscussionQuestions(page, type = "") {
    try {
      const questions = await api.get(
        `${this.prefix}/questions/discussion-questions?page=${page}${
          type ? `&type=${type}` : ""
        }`,
      );
      return questions.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getMyAssignedToParentQuestions(page) {
    try {
      const questions = await api.get(
        `${this.prefix}/questions/my-assigned-to-parent-questions?page=${page}`,
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

  async moveToDiscussion(questionId, type) {
    try {
      const response = await api.put(
        `${this.prefix}/questions/${questionId}/move-to-discussion?type=${type}`,
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async moveToQuestions(questionId) {
    try {
      const response = await api.put(
        `${this.prefix}/questions/${questionId}/move-to-questions`,
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getStatistics(type = "week", selectedDate = "") {
    try {
      const response = await api.get(
        `${this.prefix}/questions/statistics?type=${type}&date=${selectedDate}`,
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async checkQuestionLate(questionId) {
    try {
      const response = await api.get(
        `${this.prefix}/questions/${questionId}/check-late`,
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new GeneralConversation();
