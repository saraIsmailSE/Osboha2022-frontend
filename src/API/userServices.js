import { api } from "./Intercepter"

export default {
  getUnactive() {
    const users = api.get(`users/list/un-active`);
    return users;

  },

  getUnactiveReviwers() {
    const users = api.get(`users/list/un-active-reviwers-auditors`);
    return users;

  },
  deleteUser(id) {
    const user = api.delete(`users/${id}`);
    return user;

  },
  acceptUser(id) {
    const user = api.patch(`users/activate/${id}`);
    return user;

  },

  acceptThesis(id) {
    return true;

  }
}

