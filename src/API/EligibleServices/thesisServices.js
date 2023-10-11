import { api } from "../Intercepter"
import userInfoService from "@/Services/userInfoService";
export default {
  createThesis: async (thesis, userbook_id) => {
    let formData = new FormData();
    formData.append("thesis_text", thesis.text);
    formData.append("ending_page", thesis.pageEnd);
    formData.append("starting_page", thesis.pageStart);
    formData.append("user_book_id", userbook_id);
    formData.append("images[]", thesis.image_1);
    const response = await api.post("/thesises", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch(error => {

      console.log(error)
    }
    )
    return response;
  },


  updatePicture: async (image, path) => {
    let formData = new FormData();
    formData.append("path", path);
    formData.append("image", image);

    const response = await api.post("/thesises/update-photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch(error => {

      console.log(error)
    }
    )
    return response.data.data;
  },
  reviewThesis: async (id) => {
    const res = await api
      .patch(`/thesises/review-thesis/${id}`)
 
  },
  deleteThesis(id) {
    const response = api.delete(`/thesises/${id}`)
    return response;
  },
  acceptThesis(id,status) {
    let thesisId, user_book_id=null
    if(status == 'accept'){
      thesisId=id

    }
    else if(status == 'audit'){
      user_book_id=id
    }
    const response = api.post("/thesises/review", {
      id: thesisId,
      user_book_id: user_book_id,
      status: status,
      reviewer_id: userInfoService.getUser().id
    })
    return response;
  },
  rejectRetardThesis(id, note,status) {
    const response = api.post("/thesises/review", {
      id: id,
      status: status,
      reviewer_id: userInfoService.getUser().id,
      reviews: note
    })
    return response;
  },
  addDegree(id, note, mark) {
    const response = api.patch(`/thesises/add-degree/${id}`, {
      auditor_id: userInfoService.getUser().id,
      reviews: note,
      degree: mark
      
    })
    return response;

  },
  updateThesis: async (thesis, id) => {
    const response = await api.patch(`thesises/${id}`, thesis).catch(error => {


      console.log(error)
    }
    )
    return response;
  },
  getById: async (id) => {
    const response = await api.get(`thesises/${id}`);
 
    return response.data.data;
  },
  getByBook: async (bookID) => {
    const thesis = await api.get(`thesises/book/${bookID}`);
 
    return thesis.data.data;
  },
  getByUserBookStatus: async (status) => {

    const thesis = await api.get(`thesises/by-status/${status}`);
    (thesis.data)
    return thesis.data.data;
  },
  getByUserBook : async (user_book_id ,status) => {
 
    const thesis = await api.get(`thesises/user_book_id/${user_book_id}&${status}`);
    (thesis.data)
    return thesis.data.data;
},
  deletePhoto: async (id) => {
    const response = await api.delete(`thesises/photo/${id}`);
  },

  getPhotosCount: async (user_book_id) => {
    const response = await api.get(`thesises/photo-count/${user_book_id}`);
    return response.data.data;
   
  },


  uploadPhoto: async (image, id) => {
    let formData = new FormData();
   
    formData.append("image", image);
    const response = await api.post(`/thesises/upload/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch(error => {

      console.log(error)
    }
    ) 
    return response;
  },

 }

