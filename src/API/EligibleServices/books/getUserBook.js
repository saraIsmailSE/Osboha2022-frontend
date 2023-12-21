import { api } from "../../Intercepter";

export const getUserBook = async (id) => {
  const books = await api.get(`books/user/${id}`);
  books.data;
  return books.data.data;
};
