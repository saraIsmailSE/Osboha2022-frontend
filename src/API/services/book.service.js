import { api } from "../Intercepter";
import { handleError } from "vue";
import { customHandleError } from "../../utilities/errors";

class BookService {
  async create(
    name,
    writer,
    publisher,
    brief,
    startPage,
    endPage,
    link,
    sectionId,
    image,
    level,
    type_id
  ) {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("writer", writer);
    formData.append("start_page", startPage);
    formData.append("end_page", endPage);
    formData.append("publisher", publisher);
    formData.append("brief", brief);
    formData.append("link", link);
    formData.append("type_id", type_id);
    formData.append("section_id", sectionId);
    formData.append("level", level);
    formData.append("image", image);
    try {
      const response = await api.post("/books", formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getAll(page) {
    try {
      const books = await api.get(`books?page=` + page);
      return books.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getById(id) {
    try {
      const book = await api.get(`/books/${id}`);
      return book.data;
    } catch (error) {
      customHandleError(error, "BookService.getById");
    }
  }

  async deleteById(id) {
    try {
      return await api.delete(`/books/${id}`);
    } catch (error) {
      return error;
    }
  }

  async getBooksByType(typeId) {
    try {
      const books = await api.get(`/books/type/${typeId}`);
      return books.data;
    } catch (error) {
      return error;
    }
  }

  async getBooksByLevel(level, page) {
    try {
      const books = await api.get(`/books/level/${level}?page=${page}`);
      return books.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getBooksByName(name, page) {
    try {
      const books = await api.post(`/books/name?page=${page}`, {
        name,
      });
      return books.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getBooksByLanguage(language, page) {
    try {
      const books = await api.get(`/books/language/${language}?page=${page}`);
      return books.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getBooksBySection(sectionId) {
    try {
      const books = await api.get(`/books/section/${sectionId}`);
      return books.data;
    } catch (error) {
      return error;
    }
  }

  async getRecentAddedBooks() {
    try {
      const books = await api.get(`/books/recent-added-books`);
      return books.data.data;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async getMostReadableBooks() {
    try {
      const books = await api.get(`/books/most-readable-books`);
      return books.data.data;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async getRandomBook() {
    try {
      const book = await api.get(`/books/random-book`);
      return book.data.data;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async latestBooks() {
    try {
      const book = await api.get(`/books/latest`);
      return book.data.data;
    } catch (error) {
      console.log(error);
      return "";
    }
  }
  /**
   * Find an existing book by its id and display its basic information.
   *
   * @param  book_id
   * @return book info;
   */

  async showBasicInfo(book_id) {
    try {
      const book = await api.get(`books/${book_id}`);
      return book.data.data;
    } catch (error) {
      return error;
    }
  }
  /**
   * update book.
   *
   * @param   book data,book id
   * @return book info;
   */

  async update(book, id) {
    console.log("🚀 ~  ~ book form:", book)
    try {
      
      const response = await api.post(`/books/update`, book, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
}

export default new BookService();
