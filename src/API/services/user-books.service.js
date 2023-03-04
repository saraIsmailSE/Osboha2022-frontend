import { api } from "../Intercepter";

class UserBooks {


  async getUserBooks(user_id) {
    try {
      const books = await api.get(`user-books/show/${user_id}`);
      return books.data.data;
    } catch (error) {
      return error;
    }
  }
}

export default new UserBooks();