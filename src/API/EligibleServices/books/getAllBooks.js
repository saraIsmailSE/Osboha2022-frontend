import { api } from "../../Intercepter"


export const getAllBooks = async () => {
    const token = JSON.parse(localStorage.getItem('user')).token;
   
const books = await api.get('books/user');
 (books.data)
  return books.data.data;
}