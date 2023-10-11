import { api } from "../../Intercepter";

export const getGeneralInformations = async (id) => {
  const generalInformations = await api.get(`general-informations/user_book_id/${id}`);
     (generalInformations.data.data)
  return generalInformations.data.data;
};
