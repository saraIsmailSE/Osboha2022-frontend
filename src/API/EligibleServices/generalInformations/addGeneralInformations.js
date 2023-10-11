
import { api } from "../../Intercepter";

export const addGeneralInformations = async (data) => {
  (data)
  const res = await api
    .post("general-informations", data)
    .catch((e) => {
        // error = e.response.data.message;
         (e)
    }).then();
    // return {data:res.data,error}
};
