
import { api } from "../../Intercepter";

export const  reviewThesis = async (id) => {
   
  const res = await api
    .patch(`/thesises/audit-thesis/${id}`)
    .catch((e) => {
        // error = e.response.data.message;
            (e)
    }).then(e =>    (e));
    // return {data:res.data,error}
};
