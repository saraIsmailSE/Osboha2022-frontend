import { handleError } from "vue";
import { customHandleError } from "../../utilities/errors";
import { api } from "../Intercepter";

class UserService {
  constructor() {
    this.prefix = "users";
  }

  async show(user_id) {
    const users = await api.get(`users/show/${user_id}`);
    return users.data.data;
  }
  async getUnactive() {
    const users = await api.get(`users/list/un-active`);
    return users;
  }

  async searchByEmail(email) {
    const response = await api.get(`users/search-by-email/${email}`);
    return response.data.data;
  }
  async inChargeOfSearch(email, page) {
    const response = await api.get(
      `users/in-charge-of-search/${email}?page=${page}`,
    );
    return response.data;
  }

  async searchByName(name) {
    const response = await api.get(`users/search-by-name/${name}`);
    return response.data.data;
  }

  async getUsersOnHoldByMonthAndGender(page, contact_status, month, gender) {
    const response = await api.get(
      `users/get-users-on-hold/${contact_status}/${month}/${gender}?page=${page}`,
    );
    return response.data;
  }

  async listInChargeOf() {
    try {
      const response = await api.get("users/list-in-charge-of");
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getUnactiveReviwers() {
    const users = await api.get(`users/list/un-active-reviwers-auditors`);
    return users;
  }
  async deleteUser(id) {
    const user = await api.delete(`users/${id}`);
    return user;
  }
  async acceptUser(id) {
    const user = await api.patch(`users/activate/${id}`);
    return user;
  }

  acceptThesis(id) {
    return true;
  }

  async searchUsers(searchQuery) {
    try {
      const users = await api.get(`users/search?search=${searchQuery}`);
      return users.data;
    } catch (error) {
      handleError(error);
    }
  }
  async assignToParent(user) {
    try {
      const response = await api.post(`users/assign-to-parent`, user, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      customHandleError(error, "UserGroupService.AddMember");
    }
  }

  async updateInfo(info) {
    try {
      const response = await api.post(`users/update-info`, info, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      customHandleError(error, "UserGroupService.AddMember");
    }
  }
  async updateUserName(UserName) {
    try {
      const response = await api.post(`users/update-user-name`, UserName, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      customHandleError(error, "UserGroupService.AddMember");
    }
  }

  async getInfo(id) {
    try {
      const users = await api.get(`users/info/${id}`);
      return users.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async listUnAllowedToEligible() {
    try {
      const users = await api.get(`users/list-un-allowed-to-eligible`);
      return users.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async deActiveUser(id, rejectNote) {
    try {
      const response = await api.post("users/deactive-user", {
        id: id,
        rejectNote: rejectNote,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async acceptEligibleUser(id) {
    const user = api.patch(`users/allow-to-eligible/${id}`);
    return user;
  }

  async retrieveNestedUsers(parent_id) {
    try {
      const response = await api.get(
        `${this.prefix}/retrieve-nested-users/${parent_id}`,
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  async withdrawnAmbassadorDetails(user_id) {
    try {
      const response = await api.get(
        `${this.prefix}/withdrawn-ambassador-details/${user_id}`,
      );
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
  async sendEmail(emailForm) {
    try {
      const response = await api.post(`${this.prefix}/send-email`, emailForm, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      customHandleError(error, "UserGroupService.AddMember");
    }
  }
}

export default new UserService();
