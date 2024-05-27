import { handleError } from "vue";
import { customHandleError } from "../../utilities/errors";
import { api } from "../Intercepter";

class UserService {
  constructor() {
    this.prefix = "users";
  }

  async getUnactive() {
    const users = await api.get(`users/list/un-active`);
    return users;
  }

  async searchByEmail(email) {
    const response = await api.get(`users/search-by-email/${email}`);
    return response.data.data;
  }

  async searchByName(name) {
    const response = await api.get(`users/search-by-name/${name}`);
    return response.data.data;
  }

  async getUsersOnHoldByMonthAndGender(page, month, gender) {
    const response = await api.get(
      `users/get-users-on-hold/${month}/${gender}?page=${page}`,
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
}

export default new UserService();
