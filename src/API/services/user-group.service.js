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
      const response = await api
        .post(`${this.prefix}/add-member`, memberInfo, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .catch((error) => {
          // error is handled in catch block
          if (error.response) {
            handelErrors(error.response.status);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Error on setting up the request
            console.log("Error", error.message);
          }
        });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
}

export default new UserGroup();
