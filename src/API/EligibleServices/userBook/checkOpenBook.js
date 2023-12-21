
import { api } from "../../Intercepter";

export const checkOpenBooks = async () => {
 
  const res = await api
    .get("userbook/count");

    return res.data.data;
};
