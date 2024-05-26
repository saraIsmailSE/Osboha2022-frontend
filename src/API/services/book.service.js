import { api } from "../Intercepter";
import { handleError } from "vue";
import { customHandleError } from "../../utilities/errors";

class BookService {
  async create(book) {
    try {
      const response = await api.post(`/books`, book, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async report(reportData) {
    try {
      const formData = new FormData();
      formData.append("book_id", reportData.book_id);
      formData.append("violation_type", reportData.violation_type);
      formData.append("description", reportData.description);
      formData.append("report_media", reportData.report_media);

      // Append violated pages
      reportData.violated_pages.forEach((page, index) => {
        formData.append(`violated_pages[${index}][number]`, page.number);
      });

      const response = await api.post(`/books/report`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  async listReportsByStatus(page, status) {
    try {
      const reports = await api.get(`books/reports/${status}?page=` + page);
      return reports.data;
    } catch (error) {
      handleError(error);
    }
  }
  async getReport(report_id) {
    try {
      const reports = await api.get(`books/report/${report_id}`);
      return reports.data.data;
    } catch (error) {
      handleError(error);
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
  async getAllForEligible(page, name) {
    try {
      const books = await api.get(`/books/eligible/?page=${page}&name=${name}`);
      return books.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  async getAllRamadan(page, name) {
    try {
      const books = await api.get(`/books/ramadan/?page=${page}&name=${name}`);
      return books.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  async getBooksByNameForEligible(name, page) {
    try {
      const books = await api.get(
        `/books/eligible/name?page=${page}&name=${name}`,
      );
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
      const books = await api.get(`/books/name?page=${page}&name=${name}`);
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

  async update(book) {
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
