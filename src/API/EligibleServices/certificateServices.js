import { eligibleApi } from "../Intercepter"
import userInfoService from "@/Services/userInfoService";
export default {


  async getUserCertificates(){
      const response = await eligibleApi.get('certificates/user');
      return response.data.data;
  }
,
 async  createCertificate(id){
 
      const response = await eligibleApi.post("certificates", {user_book_id:id})
      console.log(response)
      return response.data.data
   
  },
  checkCertificate: async (id) => {
    const response = await eligibleApi.get(`userbook/certificate/${id}`);

    return response.data.data;
  },
  fullCretificate: async (id) => {
    try {
      const response = await eligibleApi.get(`certificates/full-certificate/${id}`);
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  },
};
