
import { api } from "../../Intercepter";

export const checkCertificate = async (id) => {
 
  const res = await api
    .get(`userbook/certificate/${id}`);

    return res.data.data;
};
