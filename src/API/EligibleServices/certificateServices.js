import { api } from "../Intercepter"
import userInfoService from "@/Services/userInfoService";
export default {


  async getUserCertificates(){
      const response = await api.get('certificates/user');
      return response.data.data;
  }
,
 async  createCertificate(id){
 
      const response = await api.post("certificates", {user_book_id:id})
      console.log(response)
      return response.data.data
   
  },
  checkCertificate: async (id) => {
    const response = await api.get(`userbook/certificate/${id}`);

    return response.data.data;
  },
  fullCretificate: async (id) => {
    try {
      const response = await api.get(`certificates/full-certificate/${id}`);
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  },
};
