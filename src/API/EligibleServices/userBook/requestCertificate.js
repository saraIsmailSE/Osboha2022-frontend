
import { api } from "../../Intercepter";

export const requestCertificateApi = async (id) => {
 
  const res = await api
    .post("userbook", {book_id:id})
    .catch((e) => {
        // error = e.response.data.message;
            (e)
    }).then(e =>    (e));
    // return {data:res.data,error}
};
