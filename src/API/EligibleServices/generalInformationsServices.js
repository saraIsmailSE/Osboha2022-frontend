import { api } from "../Intercepter"
import userInfoService from "@/Services/userInfoService";

export default {
  getByStatus: async (status) => {

    const general_informations = await api.get(`general-informations/status/${status}`);
    return general_informations.data.data;
  },
  getByUserBook: async (user_book_id) => {

    const general_informations = await api.get(`general-informations/user_book_id/${user_book_id}`);
    (general_informations.data)
    return general_informations.data.data;
  },
  getByBook: async (bookID) => {

    const general_informations = await api.get(`general-informations/book/${bookID}`);
    (general_informations.data)
    return general_informations.data.data;
  },

  addDegree(id, note, mark) {
    const response = api.patch(`/general-informations/add-degree/${id}`, {
      auditor_id: userInfoService.getUser().id,
      reviews: note,
      degree: mark
    })
    return response;
  },

  getGeneralInformations: async (id) => {
    const generalInformations = await api.get(`general-informations/user_book_id/${id}`);
    return generalInformations.data.data;
  },
  addGeneralInformations: async (data) => {
    const response = await api.post("general-informations/", data)
    return response.data.data
      
  },
  updateGeneralInformations: async (data,id) => {
    const response = await api.patch(`general-informations/${id}`, data)
    return response.data.data
      
  },
  acceptGeneralInformations(id) {
    const response = api.post("/general-informations/review", {
      id: id,
      status: 'audit',
      reviewer_id: userInfoService.getUser().id
    })
    return response;
  },
  rejectRetardGeneralInformations(id, note , status) {
    const response = api.post("/general-informations/review", {
      id: id,
      status: status,
      reviewer_id: userInfoService.getUser().id,
      reviews: note
    })
    return response;
  }, 
  deleteGeneralInformation(id) {
    const response = api.delete(`/general-informations/${id}`)
    return response;
  },
  reviewGeneralInformation: async (id) => {
    const res = await api
      .patch(`/general-informations/review-general-informations/${id}`)
      .catch((e) => {
        // error = e.response.data.message;
        (e)
      }).then(e => (e));
    // return {data:res.data,error}
  },
  getById: async (id) => {
    const response = await api.get(`general-informations/${id}`);
    (response.data)
    return response.data.data;
  },




}