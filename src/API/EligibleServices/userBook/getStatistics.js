 

import { api } from "../../Intercepter";

export const getStatistics = async (id) => {
 
  const res = await api
    .get(`userbook/statistics/${id}`);
 
    return res.data.data;
};
