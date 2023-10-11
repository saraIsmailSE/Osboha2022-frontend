import { api } from "../Intercepter"
import userInfoService from "@/Services/userInfoService";
export default {
  acceptUserBook(id) {
    const response = api.post("/userbook/review", {
      id: id,
      status: 'audit',
      reviewer_id: userInfoService.getUser().id
    })
    return response;
  },
  rejectRetardUserBook(id, note,status) {
    const response = api.post("/userbook/review", {
      id: id,
      status: status,
      reviewer_id: userInfoService.getUser().id,
      reviews: note
    })
    return response;
  },
  getById: async (id) => {
    const response = await api.get(`userbook/${id}`);

    return response.data.data;
  },
  getReadyToAudit: async () => {
    const response = await api.get(`userbook/ready/to`);

    return response.data.data;
  },
  getByBookID: async (id) => {
    const response = await api.get(`userbook/by-book-id/${id}`);
    return response.data.data;
  },

  updateUserBook: async (status, id) => {
    const response = await api.patch(`userbook/${id}`,  { status: status }).catch(error => {

      console.log(error)
    }
    )
    console.log(response)
    return response;
  },
  requestCertificate: async (id) => {
    try {
      const response = await api.post("userbook", { book_id: id });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  getByStatus: async (status) => {
    try {
      const response = await api.get(`userbook/status/${status}`);
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  },
  
  
  lastAchievement: async () => {
    try {
      const response = await api.get(`userbook/last-achievement/`);
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  },

  finishedAchievement: async () => {
    try {
      const response = await api.get(`userbook/finished-achievement/`);
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  },

  changeStatus: async (status,id) => {
    try {
      const response = await api.patch(`userbook/status/${id}`,{status});
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  },

  cancel: async (id) => {
    console.log(id)
    try {
      const response = await api.delete(`userbook/${id}`);
      return response.data.data;
    } catch (e) {
      return e.response.data.data
    }
  },


  
  getFullUserBook: async (id) => {
    try {
      const response = await api.get(`userbook/${id}`);
      return response.data
    } catch (e) {
      return e.response.data.data
    }
  },

  
}

