import { handleError } from "vue";
import { customHandleError } from "../../utilities/errors";
import { api } from "../Intercepter";

class UserService {
  async getUnactive() {
    const users = await api.get(`users/list/un-active`);
    return users;
  }

  async searchByEmail(email) {
    const response = await api.get(`users/search-by-email/${email}`);
    return response.data.data;
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
}

export default new UserService();
