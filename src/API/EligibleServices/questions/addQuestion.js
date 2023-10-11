
import { api } from "../../Intercepter";

export const addQuestion = async (data) => {
let error = null;
  const res = await api.post("questions", data)
    .catch((e) => {
        console.log(e)
             
    }).then( );
     return {data:res.data,error}
};
