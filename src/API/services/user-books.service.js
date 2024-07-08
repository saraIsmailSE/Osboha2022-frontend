import { handleError } from "vue";
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

  //All Free
  async getAllFree(page, user_id) {
    try {
      const books = await api.get(
        `user-books/free-books/${user_id}?page=` + page,
      );
      return books.data.data;
    } catch (error) {
      return error;
    }
  }

  //All Normal And Ramadan
  async getOsbohaUserBooks(page, user_id, name) {
    try {
      const books = await api.get(
        `user-books/osboha-user-books/${user_id}/${name}?page=` + page,
      );
      return books.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * Check rules for free book.
   *
   * @param user_id
   * @return jsonResponse[eligible_to_write_thesis boolean]
   */
  async eligibleToWriteThesis(user_id) {
    try {
      const response = await api.get(
        `user-books/eligible-to-write-thesis/${user_id}`,
      );
      return response.data.data;
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
  //delete for later book
  async deleteForLeater(id) {
    try {
      const books = await api.get(`user-books/delete-for-later-book/${id}`);
      return books.data.data;
    } catch (error) {
      return error;
    }
  }

  async saveBookForLater(bookId) {
    try {
      const book = await api.patch(`/user-books/${bookId}/save-for-later`);
      return book.data;
    } catch (error) {
      handleError(error);
    }
  }

  async markAsFinished(book_id) {
    try {
      const response = await api.post(`/user-books/mark-as-finished`, {
        book_id,
      });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
}

export default new UserBooks();
