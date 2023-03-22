import { api } from "../Intercepter";

class UserGroup {
  async usersByGroupId(group_id) {
    try {
      const response = await api.get(`user-group/users/${group_id}`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

}

export default new UserGroup();