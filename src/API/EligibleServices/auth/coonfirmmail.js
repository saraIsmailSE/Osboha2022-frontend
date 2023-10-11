import { api } from "../../Intercepter";

export const sendEmail = async () => {
  let error = null;
  const res = await api
    .post("email/verification-notification")
    .catch((error) => {
        error = error.response.data.message;
         (error)
    });
    return {data:res.data,error}
};
