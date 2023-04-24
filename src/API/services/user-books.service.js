import { api } from "../Intercepter";

class UserBooks {

  //Finished
  async getUserBooks(user_id) {
    try {
      const books = await api.get(`user-books/show/${user_id}`);
      return books.data.data;
    } catch (error) {
      return error;
    }
  }
  //All Later
  async laterBooks(user_id) {
    try {
      const books = await api.get(`user-books/later-books/${user_id}`);
      return books.data.data;
    } catch (error) {
      return error;
    }
  }
}

export default new UserBooks();