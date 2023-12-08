import { handleError } from "vue";
import { customHandleError } from "../../utilities/errors";
import { api, handelErrors } from "../Intercepter";

class UserGroup {
  constructor() {
    this.prefix = "user-group";
  }

  async usersByGroupId(group_id) {
    try {
      const response = await api.get(`${this.prefix}/users/${group_id}`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  async AddMember(memberInfo) {
    try {
      const response = await api.post(`${this.prefix}/add-member`, memberInfo, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      customHandleError(error, "UserGroupService.AddMember");
    }
  }
  async delete(user_group_id) {
    try {
      return await api.delete(`${this.prefix}/delete/${user_group_id}`);
    } catch (error) {
      handleError(error);
    }
  }
  async withdrawnMember(user_group_id) {
    const formData = new FormData();
    formData.append("user_group_id", user_group_id);

    try {
      return await api.post(`${this.prefix}/withdrawn`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
    } catch (error) {
      handleError(error);
    }
  }
}

export default new UserGroup();
