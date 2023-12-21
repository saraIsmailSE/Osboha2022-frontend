import { api } from "../../Intercepter"

export const getByUserBook = async (user_book_id) => {
 
    const thesis = await api.get(`thesises/user_book_id/${user_book_id}`);
    (   thesis.data)
    return    thesis.data.data;
}


