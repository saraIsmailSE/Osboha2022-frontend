import { handleError } from "vue";
import { customHandleError } from "../../utilities/errors";
import { api, handelErrors } from "../Intercepter";

class ExceptionService {
  async create(exception) {
    try {
      const response = await api.post(`/userexception/create`, exception, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async setExceptionalFreez(exception) {
    try {
      const response = await api.post(
        `/userexception/set-exceptional-freez`,
        exception,
        {
          headers: { "Content-type": "multipart/form-data" },
        },
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async setNewUser(exception) {
    try {
      const response = await api.post(
        `/userexception/set-new-user`,
        exception,
        {
          headers: { "Content-type": "multipart/form-data" },
        },
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  async getExceptionById(exception_id) {
    try {
      const response = await api.get(`userexception/show/${exception_id}`);
      return response.data.data;
    } catch (error) {
      customHandleError(error);
    }
  }
  async update(exception_id, exception) {
    try {
      const response = await api.patch(
        `userexception/${exception_id}`,
        exception,
        {
          headers: { "Content-type": "multipart/form-data" },
        },
      );
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  async updateStatus(exception_id, decision) {
    try {
      const response = await api.patch(
        `userexception/update-status/${exception_id}`,
        {
          decision: decision.decision,
          note: decision.note,
          week_id: decision.week_id,
        },
      );

      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  async updateExceptionTypeById(id, type) {
    try {
      return await api.post("/userexception/update", { id, type });
    } catch (error) {
      return error;
    }
  }

  async cancelException(exception_id) {
    try {
      return await api.get(`userexception/cancel/${exception_id}`);
    } catch (error) {
      return error;
    }
  }

  async getAllUserExceptions(user_id) {
    try {
      const userExceptions = await api.get(
        `userexception/user-exceptions/${user_id}`,
      );
      return userExceptions.data.data;
    } catch (error) {
      return error;
    }
  }
  async searchByEmail(email) {
    const response = await api.get(`userexception/search-by-email/${email}`);
    return response.data.data;
  }
  async exceptionsFilter(filter, user_id) {
    try {
      const exceptions = await api.get(
        `userexception/exceptions-filter/${filter}/${user_id}`,
      );
      return exceptions.data.data;
    } catch (error) {
      return error;
    }
  }
  async ListByAdvisor(exception_type, advisor_id) {
    const response = await api.get(
      `userexception/list-by-advisor/${exception_type}/${advisor_id}`,
    );
    return response.data.data;
  }

  async assignToParent(exception_id) {
    try {
      const response = await api.put(
        `userexception/${exception_id}/assign-to-parent`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  /**
   * Add Note.
   *  @param  noteForm
   * @return response
   */
  async addNote(noteForm) {
    try {
      const response = await api
        .post(`userexception/add-note`, noteForm, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .catch((error) => {
          if (error.response) {
            handelErrors(error.response.status);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * get notes for specific audit.
   * @return response
   */
  async getNotes(user_exception_id) {
    try {
      const response = await api
        .get(`userexception/get-notes/${user_exception_id}`)
        .catch((error) => {
          if (error.response) {
            handelErrors(error.response.status);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
}

export default new ExceptionService();
