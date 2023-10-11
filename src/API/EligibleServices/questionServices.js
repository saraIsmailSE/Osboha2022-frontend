import { api } from "../Intercepter"
import userInfoService from "@/Services/userInfoService";
export default {
  addQuestion: async (question) => {
  
    const response = await api.post("questions", question)
    return response.data.data
  },


  getQuestions: async (id) => {

    const questions = await api.get(`questions/user-book/${id}`);

    return questions.data.data;
  },

  addDegree(id, note, mark) {
    const response = api.patch(`/questions/add-degree/${id}`, {
      auditor_id: userInfoService.getUser().id,
      reviews: note,
      degree: mark
    })
    console.log(response)
    return response;

  },
  deleteQuestion(id) {
    const response = api.delete(`/questions/${id}`)
    return response;
  },
  getByStatus: async (status) => {

    const response = await api.get(`questions/status/${status}`);
    (response.data)
    return response.data.data;
  },
  getByUserBook: async (user_book_id) => {

    const response = await api.get(`questions/user_book_id/${user_book_id}`);
    (response.data)
    return response.data.data;
  },
  acceptQuestion(id,status) {
    let questionId, user_book_id=null
    if(status == 'accept'){
      questionId=id

    }
    else if(status == 'audit'){
      user_book_id=id
    }

    const response = api.post("/questions/review", {
      id: questionId,
      user_book_id: user_book_id,
      status: status,
      reviewer_id: userInfoService.getUser().id
    })
    return response;
  },
  rejectRetardThesis(id, note,status) {
    const response = api.post("/questions/review", {
      id: id,
      status: status,
      reviewer_id: userInfoService.getUser().id,
      reviews: note
    })
    return response;
  },

  updateQuestion: async (question, id) => {
    const response = await api.patch(`/questions/${id}`, question, {
    }).catch(error => {

      console.log(error)
    }
    )
    return response.data.data;
    },
    reviewQuestion: async (id) => {
    const res = await api
      .patch(`/questions/review-question/${id}`)
      .catch((e) => {
        // error = e.response.data.message;
        (e)
      }).then(e => (e));
    // return {data:res.data,error}
  },
  getById: async (id) => {
    const response = await api.get(`questions/${id}`);
    (response.data)
    return response.data.data;
  },
  getByBook: async (bookID) => {
    const response = await api.get(`questions/book/${bookID}`);
    (response.data)
    return response.data.data;
  },

}

